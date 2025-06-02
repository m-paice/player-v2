import { useTime } from "@/hooks/useTime";
import { StyleSheet } from "react-native";
import { IconSun } from "./icons/Sun";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const payload = {
  max: 27,
  min: 22,
  city: "Montes Claros - MG",
  time: "10:31",
};

export const CurrentWeather = () => {
  const { time } = useTime();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <IconSun />
        <ThemedText style={{ fontSize: 22, marginRight: 30 }}>
          {payload.max}°
        </ThemedText>
        <ThemedText style={{ position: "absolute", left: 70, bottom: 10 }}>
          {payload.min}°
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <ThemedText>{payload.city}</ThemedText>
        <ThemedText style={{ fontWeight: "bold" }}>{time}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    width: "32%",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
