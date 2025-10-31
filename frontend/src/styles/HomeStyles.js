import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  chatContainer: {
    padding: 16,
  },

  messageBubble: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    maxWidth: "80%",
  },

  // 💬 Message utilisateur (bleu, à droite)
  userBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },

  // 🤖 Message IA (gris, à gauche)
  aiBubble: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },

  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },

  userText: {
    color: "#fff",
  },

  aiText: {
    color: "#000",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxHeight: 120,
  },

  sendButton: {
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
});
