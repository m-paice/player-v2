import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

// components
import { FocusableLink } from "@/components/FocusableLink";
import { MusicItem } from "@/components/MusicItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// images
import funk from "../../assets/albums/funk.jpeg";
import gospel from "../../assets/albums/gospel.jpeg";
import pagode from "../../assets/albums/pagode.jpeg";
import sertanejo from "../../assets/albums/sertanejo.jpeg";
import variadas from "../../assets/albums/variadas.jpeg";

const navItems = [
  {
    id: 1,
    path: "/render?playlist=Variadas",
    label: "Variadas",
    image: variadas,
  },
  {
    id: 2,
    path: "/render?playlist=Sertanejo",
    label: "Sertanejo",
    image: sertanejo,
  },
  { id: 3, path: "/render?playlist=Pagode", label: "Pagode", image: pagode },
  { id: 4, path: "/render?playlist=Funk", label: "Funk", image: funk },
  { id: 5, path: "/render?playlist=Gospel", label: "Gospel", image: gospel },
];

export default function Choice() {
  const [currentFocus, setCurrentFocus] = useState(0);

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
              isFocused={currentFocus === index}
              onFocus={() => setCurrentFocus(index)}
              nextFocusRight={index + 1 < navItems.length ? index + 1 : 0}
            >
              <MusicItem music={item.label} image={item.image} />
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
