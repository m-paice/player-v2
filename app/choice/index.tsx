import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

// components
import { FocusableLink } from "@/components/FocusableLink";
import { MusicItem } from "@/components/MusicItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const navItems = [
  { id: 1, path: "/render?playlist=Variadas", label: "Variadas" },
  { id: 2, path: "/render?playlist=Sertanejo", label: "Sertanejo" },
  { id: 3, path: "/render?playlist=Pagode", label: "Pagode" },
  { id: 4, path: "/render?playlist=Funk", label: "Funk" },
  { id: 5, path: "/render?playlist=Gospel", label: "Gospel" },
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
