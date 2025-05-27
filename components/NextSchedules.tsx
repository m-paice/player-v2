import dayjs from "dayjs";

import { ScheduleItem } from "@/@types/Schedule";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  schedules: ScheduleItem[];
}

export const NextSchedules = ({ schedules }: Props) => {
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
      {schedules.length === 0 ? (
        <ThemedText>Não há agendamentos para hoje.</ThemedText>
      ) : (
        schedules.map((schedule) => (
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
                {schedule.user.name}
              </ThemedText>
              <ThemedText style={{ maxWidth: 280 }}>
                {schedule.services.map((item) => item.name).join(" - ")}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))
      )}
    </ThemedView>
  );
};
