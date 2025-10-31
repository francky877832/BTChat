from flask import Flask, request, jsonify, send_from_directory
import os

from models.rag_model import query_rag, build_or_load_index

from flask_cors import CORS


app = Flask(__name__)
CORS(app)

import requests

N8N_WEBHOOK = "http://10.177.30.88:5678/webhook/reindex-trigger"

def trigger_n8n(action, filename):
    """Appelle le webhook n8n après ajout/suppression d’un PDF"""
    try:
        payload = {"action": action, "filename": filename}
        r = requests.post(N8N_WEBHOOK, json=payload, timeout=5)
        print("✅ Signal envoyé à n8n :", r.status_code)
    except Exception as e:
        print("⚠️ Erreur envoi webhook n8n :", e)



@app.route("/query", methods=["POST"])
def predict():
    data = request.get_json()
    prompt = data.get("message", "")
    if not prompt:
        return jsonify({"error": "Missing 'message' field"}), 400

    response = query_rag(prompt)
    return jsonify({"response": response})





UPLOAD_FOLDER = "db"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    if file.filename.endswith(".pdf"):
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))

        trigger_n8n("added", file.filename)

        return jsonify({"message": "Fichier ajouté avec succès"})
    
    return jsonify({"error": "Uniquement les PDF"}), 400

@app.route("/api/files", methods=["GET"])
def list_files():
    print("Listing files in upload folder")
    files = os.listdir(UPLOAD_FOLDER)
    return jsonify({"files": files})

@app.route("/api/delete/<filename>", methods=["DELETE"])
def delete_file(filename):
    path = os.path.join(UPLOAD_FOLDER, filename)
    if os.path.exists(path):
        os.remove(path)

        trigger_n8n("deleted", filename)
        return jsonify({"message": "Supprimé"})
    return jsonify({"error": "Fichier introuvable"}), 404

@app.route("/uploads/<filename>")
def serve_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)





@app.route("/rebuild_index", methods=["POST"])
def rebuild_index():
    """
    Cette route est appelée par n8n pour relancer l'indexation IA.
    """
    try:
        data = request.get_json(force=True)
        action = data.get("action")
        filename = data.get("filename")

        print(f"🧠 Reindex triggered by n8n: action={action}, file={filename}")

        build_or_load_index(reindex=True)
        return jsonify({
            "message": "Index rebuilt successfully",
        }), 200

    except Exception as e:
        print("Error while rebuilding index:", e)
        return jsonify({"error": str(e)}), 500





if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
