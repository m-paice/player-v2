import { Link, RelativePathString } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";

interface Props {
  href: RelativePathString;
  isFocused: boolean;
  children: React.ReactNode;
  nextFocusRight: number;

  onFocus?: () => void;
}

export const FocusableLink = ({
  isFocused,
  href,
  children,
  nextFocusRight,
  onFocus,
}: Props) => {
  return (
    <ThemedView style={[styles.link, isFocused && styles.focused]}>
      <Link href={href} asChild>
        <TouchableOpacity
          accessibilityRole="link"
          accessibilityState={{ selected: isFocused }}
          onFocus={onFocus}
          hasTVPreferredFocus
          nextFocusRight={nextFocusRight}
        >
          {children}
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  link: {
    // padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  focused: {
    borderWidth: 2,
    borderColor: "#007bff",
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
  },
  focusedText: {
    fontWeight: "bold",
  },
});
