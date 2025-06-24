// icons
import { IconArchive } from "./icons/Archive";
import { IconCalendar } from "./icons/Calendar";
import { IconScissors } from "./icons/Scissors";
// components
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  schedule: {
    count: number;
    lastSchedule: string;
    name: string;
    services: {
      name: string;
    }[];
  } | null;
}

export const CurrentSchedule = ({ schedule }: Props) => {
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
      <ThemedText style={{ fontSize: 60, lineHeight: 70, textAlign: "center" }}>
        Bem-vindo {schedule?.name || ""}!
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
        <ThemedText type="subtitle">
          {schedule?.services.map((item) => item.name).join(" + ")}
        </ThemedText>
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
          <ThemedText
            style={{
              lineHeight: 32,
            }}
          >
            Agendamentos: {schedule?.count}
          </ThemedText>
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
          <ThemedText>Última vez: {schedule?.lastSchedule}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};
