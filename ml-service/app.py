from flask import Flask, request, jsonify
from models.rag_model import query_rag


app = Flask(__name__)

@app.route("/query", methods=["POST"])
def predict():
    data = request.get_json()
    prompt = data.get("message", "")
    if not prompt:
        return jsonify({"error": "Missing 'message' field"}), 400

    response = query_rag(prompt)
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
