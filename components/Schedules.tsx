import dayjs from "dayjs";
import { StyleSheet } from "react-native";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export const Schedules = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ width: "50%", padding: 16 }}>
        <ThemedText style={styles.title}>
          Hoje - {dayjs().format("D [de] MMMM")}
        </ThemedText>
        <ThemedView style={styles.content}>
          {Array.from({ length: 16 }, (_, i) => {
            return (
              <ThemedView key={i} style={styles.item}>
                <ThemedText style={styles.text}>
                  {i < 10 ? `0${i}:00` : `${i}:00`}
                </ThemedText>
              </ThemedView>
            );
          })}
        </ThemedView>
      </ThemedView>
      <ThemedView style={{ width: "50%", padding: 16 }}>
        <ThemedText style={styles.title}>
          Amanhã - {dayjs().add(1, "day").format("D [de] MMMM")}
        </ThemedText>
        <ThemedView style={styles.content}>
          {Array.from({ length: 24 }, (_, i) => {
            return (
              <ThemedView key={i} style={styles.item}>
                <ThemedText style={styles.text}>
                  {i < 10 ? `0${i}:00` : `${i}:00`}
                </ThemedText>
              </ThemedView>
            );
          })}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  item: {
    padding: 4,
    borderWidth: 1,
    borderColor: "#B2D3D0",
    backgroundColor: "#D2E4E1",
    marginVertical: 2,
    borderRadius: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 16,
    lineHeight: 30,
  },
  text: { textAlign: "center", color: "#1A3D3B" },
});
