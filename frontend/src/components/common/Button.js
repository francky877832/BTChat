import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

import { appColors } from "../../styles/commonStyles";

export default function Button({
  title = "Button",
  onPress = () => {},
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
  color = appColors.mainColor,
}) {
  return (
    <TouchableOpacity
      onPress={!disabled && !loading ? onPress : null}
      style={[
        styles.button,
        { backgroundColor: disabled ?   appColors.secondaryColor2 : color },
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={appColors.mainColor} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
