import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export const FocusableLink = ({ isFocused, href, onPress, children }) => {
  return (
    <Link href={href} asChild>
      <Pressable
        style={[styles.link, isFocused && styles.focused]}
        onPress={onPress}
        accessibilityRole="link"
        accessibilityState={{ selected: isFocused }}
      >
        <Text style={[styles.text, isFocused && styles.focusedText]}>
          {children}
        </Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  link: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  focused: {
    backgroundColor: "#e0e0e0",
    borderWidth: 2,
    borderColor: "#007bff",
  },
  text: {
    fontSize: 16,
  },
  focusedText: {
    fontWeight: "bold",
  },
});
