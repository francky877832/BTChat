import React, { createContext, useState, useContext } from "react";
import { server } from "../remote/server";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); // état de chargement

  // 🔹 Envoie une question au backend et retourne directement la réponse
  const sendMessage = async (question) => {
    if (!question.trim()) return null;

    setLoading(true);
    console.log("Sending question to server:", question);
    try {
      const res = await fetch(`${server}/api/chat/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question : question }),
      });

      const data = await res.json();
      return data.answer || data.response || "No response received.";
    } catch (error) {
      console.error("Error sending message:", error);
      return "Error communicating with server.";
    } finally {
      setLoading(false);
    }
  };

  const setters = { loading };
  const vars = {};
  const functions = { sendMessage, setLoading };

  return (
    <ChatContext.Provider value={{ ...setters, ...vars, ...functions }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
