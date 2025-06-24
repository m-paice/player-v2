import dayjs from "dayjs";
import { StyleSheet } from "react-native";

import { monthLabel, weekDayLabel } from "@/utils/labelNames";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  openToDay: boolean;
  nextDay: string;
  schedules: string[];
  nextSchedules: string[];
}

export const Schedules = ({
  openToDay,
  nextDay,
  schedules,
  nextSchedules,
}: Props) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ width: "50%", padding: 16 }}>
        <ThemedText style={styles.title}>
          Hoje - {dayjs().format("D")}
          {" de "}
          {
            monthLabel[
              dayjs().format("MMMM").toLowerCase() as keyof typeof monthLabel
            ]
          }
        </ThemedText>
        <ThemedView style={styles.content}>
          {!openToDay ? (
            <ThemedView
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ThemedText type="title">Fechado!</ThemedText>
            </ThemedView>
          ) : schedules.length === 0 ? (
            <ThemedText
              type="subtitle"
              style={{ width: "100%", textAlign: "center" }}
            >
              Não há horários disponíveis para hoje.
            </ThemedText>
          ) : (
            schedules.map((time) => {
              return (
                <ThemedView key={time} style={styles.item}>
                  <ThemedText style={styles.text}>{time}</ThemedText>
                </ThemedView>
              );
            })
          )}
        </ThemedView>
      </ThemedView>
      <ThemedView style={{ width: "50%", padding: 16 }}>
        <ThemedText style={styles.title}>
          {weekDayLabel[nextDay as keyof typeof weekDayLabel]} -{" "}
          {dayjs().add(1, "day").format("D")}
          {" de "}
          {
            monthLabel[
              dayjs()
                .add(1, "day")
                .format("MMMM")
                .toLowerCase() as keyof typeof monthLabel
            ]
          }
        </ThemedText>
        <ThemedView style={styles.content}>
          {nextSchedules.length === 0 ? (
            <ThemedText
              type="subtitle"
              style={{ width: "100%", textAlign: "center" }}
            >
              Não há horários disponíveis para{" "}
              {weekDayLabel[nextDay as keyof typeof weekDayLabel]}.
            </ThemedText>
          ) : (
            nextSchedules.map((time) => {
              return (
                <ThemedView key={time} style={styles.item}>
                  <ThemedText style={styles.text}>{time}</ThemedText>
                </ThemedView>
              );
            })
          )}
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
    padding: 16,
    borderWidth: 1,
    borderColor: "#B2D3D0",
    backgroundColor: "#1A3D3B",
    marginVertical: 2,
    borderRadius: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 16,
    lineHeight: 30,
  },
  text: { textAlign: "center", color: "#ffffff", fontSize: 32 },
});
