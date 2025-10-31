# ==============================
# rag-agent.py (compatible latest llama_index)
# ==============================

import os
import time
from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.llms.groq import Groq
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core import Settings

# ---------------------------
# 🔹 Environment Setup
# ---------------------------
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY not found in environment variables")

# ---------------------------
# 🔹 LLM & Embedding Setup
# ---------------------------
Settings.llm = Groq(model="llama-3.3-70b-versatile", api_key=api_key)
Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")

# ---------------------------
# 🔹 Load or Build Index
# ---------------------------
index_path = "storage"
documents_folder = "db"

def build_or_load_index():
    from glob import glob

    def should_rebuild_index(index_path, documents_folder):
        index_mtime = os.path.getmtime(index_path) if os.path.exists(index_path) else 0
        for pdf in glob(f"{documents_folder}/*.pdf"):
            if os.path.getmtime(pdf) > index_mtime:
                return False #True
        return False

    if os.path.exists(index_path) and os.listdir(index_path) : #and not should_rebuild_index(index_path, documents_folder):
        start = time.time()
        storage_context = StorageContext.from_defaults(persist_dir=index_path)
        index = load_index_from_storage(storage_context)
        print(f"Index loaded in {time.time() - start:.2f} sec")
    else:
        print("Rebuilding index (new or updated PDFs detected)...")

        # Build new index
        start = time.time()
        if not os.path.exists(documents_folder):
            os.makedirs(documents_folder)
            print(f"Created '{documents_folder}' folder. Add PDFs here.")
            return None
        
        pdf_files = [f for f in os.listdir(documents_folder) if f.lower().endswith(".pdf")]
        if not pdf_files:
            print(f"No PDF documents found in '{documents_folder}'")
            return None

        reader = SimpleDirectoryReader(input_dir=documents_folder, required_exts=[".pdf"])
        documents = reader.load_data()
        if not documents:
            print("No documents could be loaded from PDFs.")
            return None

        print(f"Loaded {len(documents)} document chunks")
        index = VectorStoreIndex.from_documents(documents)
        index.storage_context.persist(persist_dir=index_path)
        print(f"Index built and saved in {time.time() - start:.2f} sec")
    return index



print("Initializing index with local embeddings...\n")
index = build_or_load_index()
if not index:
    print("Failed to initialize index. Exiting.")
    exit(1)

# ---------------------------
# 🔹 Query Engine
# ---------------------------
query_engine = index.as_query_engine(similarity_top_k=3)


def query_rag(prompt: str) -> str:
    """Interroger le moteur RAG"""
    start = time.time()
    try:
        result = query_engine.query(prompt)
        print(f"Query processed in {time.time() - start:.2f}s")
        return str(result)
    except Exception as e:
        print(f"Error during query: {e}")
        return f"Error: {e}"