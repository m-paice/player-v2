import dayjs from "dayjs";

import { useTime } from "@/hooks/useTime";
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
        {dayjs().format("dddd, D [de] MMMM [de] YYYY")}
      </ThemedText>
    </ThemedView>
  );
};
