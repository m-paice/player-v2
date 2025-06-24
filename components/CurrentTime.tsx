import dayjs from "dayjs";

import { useTime } from "@/hooks/useTime";
import { monthLabel, weekDayLabel } from "@/utils/labelNames";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export const CurrentTime = () => {
  const { time } = useTime();

  return (
    <ThemedView
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <ThemedText style={{ fontSize: 100, lineHeight: 80 }}>{time}</ThemedText>
      <ThemedText type="subtitle">
        {
          weekDayLabel[
            dayjs().format("dddd").toLowerCase() as keyof typeof weekDayLabel
          ]
        }
        {", "}
        {dayjs().format("D")}
        {" de "}
        {
          monthLabel[
            dayjs().format("MMMM").toLowerCase() as keyof typeof monthLabel
          ]
        }
        {" de"}
        {dayjs().format(" YYYY")}
      </ThemedText>
    </ThemedView>
  );
};
