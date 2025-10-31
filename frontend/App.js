import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/components/pages/Home';
import { ChatProvider } from './src/context/ChatContext';

export default function App() {
  return (
    <ChatProvider>
      <View style={styles.container}>
        <Home />
        <StatusBar style="auto" />
      </View>
    </ChatProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
