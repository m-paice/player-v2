import dayjs from "dayjs";
import { StyleSheet } from "react-native";

import { generateTimeSlots } from "@/utils/generateTimeSlots";
import { useMemo } from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  openToDay: boolean;
  nextDay: string;
  schedules: string[];
  nextSchedules: string[];
  hours: string[][];
  nextHours: string[][];
}

interface TimeSlotsParams {
  hours: string[][];
}

const timeSlots = ({ hours }: TimeSlotsParams) => {
  if (hours.length === 0) return [];

  const START_HOUR = hours[0][0];
  const END_HOUR = hours[1][1];

  const START_INTERVAL = hours[0][1];
  const END_INTERVAL = hours[1][0];

  const timeSlots = generateTimeSlots(START_HOUR, END_HOUR);
  const intervalSlots = generateTimeSlots(START_INTERVAL, END_INTERVAL);

  if (intervalSlots.indexOf(START_INTERVAL) !== -1) {
    intervalSlots.splice(intervalSlots.indexOf(START_INTERVAL), 1);
  }
  if (intervalSlots.indexOf(END_INTERVAL) !== -1) {
    intervalSlots.splice(intervalSlots.indexOf(END_INTERVAL), 1);
  }

  return timeSlots.filter((slot) => !intervalSlots.includes(slot));
};

interface FilteredSchedulesParams {
  schedules: string[];
  checkCurrentTime?: boolean;
  hours: string[][];
}

const filteredSchedules = ({
  schedules,
  checkCurrentTime,
  hours,
}: FilteredSchedulesParams) => {
  if (checkCurrentTime)
    return timeSlots({
      hours,
    }).filter(
      (time) =>
        dayjs()
          .set("hour", parseInt(time.split(":")[0], 10))
          .set("minute", parseInt(time.split(":")[1], 10))
          .isAfter(dayjs()) && !schedules.includes(time)
    );

  return timeSlots({
    hours,
  }).filter((time) => !schedules.includes(time));
};

export const Schedules = ({
  openToDay,
  nextDay,
  schedules,
  nextSchedules,
  hours,
  nextHours,
}: Props) => {
  const currentSchedulesData = useMemo(
    () =>
      filteredSchedules({
        schedules,
        checkCurrentTime: true,
        hours,
      }),
    [schedules]
  );
  const nextSchedulesData = useMemo(
    () =>
      filteredSchedules({
        schedules: nextSchedules,
        checkCurrentTime: false,
        hours: nextHours,
      }),
    [nextSchedules]
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ width: "50%", padding: 16 }}>
        <ThemedText style={styles.title}>
          Hoje - {dayjs().format("D [de] MMMM")}
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
          ) : currentSchedulesData.length === 0 ? (
            <ThemedText style={{ width: "100%", textAlign: "center" }}>
              Não há horários disponíveis para hoje.
            </ThemedText>
          ) : (
            currentSchedulesData.map((time) => {
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
          {nextDay} - {dayjs().add(1, "day").format("D [de] MMMM")}
        </ThemedText>
        <ThemedView style={styles.content}>
          {nextSchedulesData.length === 0 ? (
            <ThemedText style={{ width: "100%", textAlign: "center" }}>
              Não há horários disponíveis para {nextDay}.
            </ThemedText>
          ) : (
            nextSchedulesData.map((time) => {
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
