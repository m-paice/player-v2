import dayjs from "dayjs";
import { IconArchive } from "./icons/Archive";
import { IconCalendar } from "./icons/Calendar";
import { IconScissors } from "./icons/Scissors";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const payload = {
  name: "João Pedro",
  services: ["Corte Degrade", "Barba"],
  schedules: 11,
  lastSchedule: new Date("2023-10-01T10:00:00Z"),
};

export const CurrentSchedule = () => {
  return (
    <ThemedView
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText style={{ fontSize: 60, lineHeight: 70 }}>
        Bem-vindo {payload.name}
      </ThemedText>
      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <IconScissors />
        <ThemedText>{payload.services.join(" + ")}</ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 32,
          marginTop: 64,
        }}
      >
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <IconCalendar />
          <ThemedText>Agendamentos: {payload.schedules}</ThemedText>
        </ThemedView>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <IconArchive />
          <ThemedText>
            Última vez: {dayjs(payload.lastSchedule).format("DD [de] MMMM")}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};
