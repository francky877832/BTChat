import React, { useState } from "react";
import {
  TextInput,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {HomeStyles} from "../../styles/HomeStyles"; 

import { useChat } from "../../context/ChatContext";

const Home = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { sendMessage, loading } = useChat();

  const handleSend = async () => {
    setIsLoading(true);
    if (!message.trim()) return;
    const newMessage = { id: Date.now().toString(), text: message };
    setChat((prev) => [...prev, newMessage]);
    setMessage("");

    const answer = await sendMessage(newMessage.text);
    console.log(answer);
    setChat((prev) => [...prev, { id: Date.now().toString(), text: answer, answer: true }]);

    setIsLoading(false);
  };



  return (
    <SafeAreaView style={HomeStyles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        {/* Zone principale du chat */}
        <FlatList
          data={chat}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                HomeStyles.messageBubble,
                item.answer ? HomeStyles.aiBubble : HomeStyles.userBubble,
              ]}
            >
              <Text
                style={[
                  HomeStyles.messageText,
                  item.answer ? HomeStyles.aiText : HomeStyles.userText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={HomeStyles.chatContainer}
          keyboardShouldPersistTaps="handled" // ✅ évite le tremblement quand on clique
        />

        {/* Zone d’entrée du message */}
        <View style={HomeStyles.inputContainer}>
          <TextInput
            style={HomeStyles.input}
            placeholder="Écrivez un message..."
            value={message}
            onChangeText={setMessage}
            multiline
            blurOnSubmit={false} // ✅ évite que le clavier se ferme après chaque ligne
          />
          {!isLoading ?
            <TouchableOpacity style={HomeStyles.sendButton} onPress={handleSend}>
              <Ionicons name="arrow-up-circle" size={36} color="#007AFF" />
            </TouchableOpacity>
            :
            <ActivityIndicator size="large" color="#007AFF" style={{ marginLeft: 10 }} />
          }
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;
