import React, { useState, useEffect } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const SERVER_URL = "http://10.177.30.88:5000";

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await fetch(`${SERVER_URL}/api/files`);
    const data = await res.json();
    setFiles(data.files || []);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choisis un PDF");
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`${SERVER_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });
    setFile(null);
    fetchFiles();
  };

  const handleDelete = async (filename) => {
    await fetch(`${SERVER_URL}/api/delete/${filename}`, { method: "DELETE" });
    fetchFiles();
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#007bff" }}>📄 Gestion des PDF</h1>

      <form
        onSubmit={handleUpload}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#fff",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          ➕ Ajouter PDF
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {files.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 12px",
              backgroundColor: "#fff",
              borderRadius: "6px",
              marginBottom: "8px",
              border: "1px solid #e0e0e0",
            }}
          >
            <a
              href={`${SERVER_URL}/uploads/${f}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              {f}
            </a>
            <button
              onClick={() => handleDelete(f)}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              ❌ Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
