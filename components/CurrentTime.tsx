import dayjs from "dayjs";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export const CurrentTime = () => {
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
      <ThemedText style={{ fontSize: 100, lineHeight: 80 }}>
        {dayjs().format("HH:mm")}
      </ThemedText>
      <ThemedText>{dayjs().format("dddd, D [de] MMMM [de] YYYY")}</ThemedText>
    </ThemedView>
  );
};
