import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

// components
import { FocusableLink } from "@/components/FocusableLink";
import { MusicItem } from "@/components/MusicItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const navItems = [
  { id: 1, path: "/render", label: "Sertanejo" },
  { id: 2, path: "/render", label: "Pagode" },
  { id: 3, path: "/render", label: "Funk" },
  { id: 4, path: "/render", label: "Rock" },
  { id: 5, path: "/render", label: "MPB" },
  { id: 6, path: "/render", label: "Rap" },
  { id: 7, path: "/render", label: "Eletrônica" },
];

export default function Choice() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">
          Escolha um estilo de música que deseja ouvir
        </ThemedText>

        <View style={styles.musicsContainer}>
          {navItems.map((item, index) => (
            <FocusableLink
              key={item.id}
              href={item.path}
              // isFocused={currentFocus === index}
              isFocused={false}
              onPress={() => {}}
            >
              <MusicItem music={item.label} />
            </FocusableLink>
          ))}
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  musicsContainer: {
    marginTop: 20,
    display: "flex",
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
