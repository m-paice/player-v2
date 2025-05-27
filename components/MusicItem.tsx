import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  music: string;
}

export function MusicItem({ music }: Props) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.image}>
        <ThemedText>image</ThemedText>
      </View>
      <View style={styles.text}>
        <ThemedText>{music}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },

  image: {
    width: 80,
    height: 80,
    backgroundColor: "#ccc",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#eee",

    display: "flex",
    justifyContent: "center",

    width: 120,
  },
});
