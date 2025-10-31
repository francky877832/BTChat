// controllers/chatController.js
const axios = require('axios');

exports.queryAI = async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        status: "error",
        message: "Missing 'question' field",
      });
    }

    // 🔹 Appel vers le service Python
    const response = await axios.post("http://ml-service:5000/query", {
      message: question,
    });

    // 🔹 Succès — réponse du modèle IA
    return res.status(200).json({
      status: "success",
      answer: response.data.response,
    });

  } catch (error) {
    console.error("AI Service Error:", error.message);

    // 🔹 Erreur côté Node ou ML
    return res.status(500).json({
      status: "error",
      message: "Failed to get response from AI model",
      details: error.message,
    });
  }
};
