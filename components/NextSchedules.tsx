import dayjs from "dayjs";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const payload = [
  {
    id: 1,
    name: "João Pedro",
    services: ["Corte Degrade", "Barba"],
    scheduleAt: new Date("2023-10-01T10:00:00Z"),
  },
  {
    id: 2,
    name: "Maria Clara",
    services: ["Corte Feminino"],
    scheduleAt: new Date("2023-10-01T11:00:00Z"),
  },
  {
    id: 3,
    name: "Lucas Silva",
    services: ["Corte Militar"],
    scheduleAt: new Date("2023-10-01T12:00:00Z"),
  },
];

export const NextSchedules = () => {
  return (
    <ThemedView
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f0f0f0",
        paddingBottom: 32,
        paddingHorizontal: 32,
        paddingTop: 8,
      }}
    >
      {payload.map((schedule) => (
        <ThemedView
          key={schedule.id}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            backgroundColor: "#f0f0f0",
          }}
        >
          <ThemedView style={{ backgroundColor: "#f0f0f0" }}>
            <ThemedText>HOJE</ThemedText>
            <ThemedText>
              {dayjs(schedule.scheduleAt).format("HH:mm")}
            </ThemedText>
          </ThemedView>
          <ThemedView style={{ backgroundColor: "#f0f0f0" }}>
            <ThemedText style={{ fontWeight: "bold" }}>
              {schedule.name}
            </ThemedText>
            <ThemedText>{schedule.services.join(" ")}</ThemedText>
          </ThemedView>
        </ThemedView>
      ))}
    </ThemedView>
  );
};
