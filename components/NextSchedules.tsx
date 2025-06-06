import dayjs from "dayjs";

import { ScheduleItem } from "@/@types/Schedule";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  schedules: ScheduleItem[];
}

export const NextSchedules = ({ schedules }: Props) => {
  return (
    <ThemedView style={styles.container}>
      {schedules.length === 0 ? (
        <ThemedText>Não há agendamentos para hoje.</ThemedText>
      ) : (
        schedules.map((schedule) => (
          <ThemedView key={schedule.id} style={styles.content}>
            <ThemedView>
              <ThemedText>HOJE</ThemedText>
              <ThemedText>
                {dayjs(schedule.scheduleAt).format("HH:mm")}
              </ThemedText>
            </ThemedView>
            <ThemedView>
              <ThemedText style={{ fontWeight: "bold" }}>
                {schedule?.shortName?.trim() || schedule?.user?.name.trim()}
              </ThemedText>
              <ThemedText style={{ maxWidth: 280 }}>
                {schedule.services.map((item) => item.name).join(" + ")}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#c1c1c1",
    paddingBottom: 32,
    paddingHorizontal: 32,
    paddingTop: 8,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#c1c1c1",
  },
});
