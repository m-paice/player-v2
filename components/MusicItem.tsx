import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  music: string;
  image: ImageSourcePropType;
}

export function MusicItem({ music, image }: Props) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.image}>
        <Image source={image} style={{ width: 80, height: 80 }} />
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

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#c1c1c1",

    display: "flex",
    justifyContent: "center",

    width: 130,
  },
});
