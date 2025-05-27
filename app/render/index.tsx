import axios from "axios";
import dayjs from "dayjs";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated } from "react-native";

import { ScheduleItem } from "@/@types/Schedule";
import { CurrentMusic } from "@/components/CurrentMusic";
import { CurrentNews } from "@/components/CurrentNews";
import { CurrentSchedule } from "@/components/CurrentSchedule";
import { CurrentTime } from "@/components/CurrentTime";
import { CurrentWeather } from "@/components/CurrentWeather";
import { NextSchedules } from "@/components/NextSchedules";
import { Schedules } from "@/components/Schedules";
import { ThemedView } from "@/components/ThemedView";

const components = [
  "Schedules",
  "CurrentSchedule",
  "CurrentNews",
  "CurrentTime",
];

const URL_PLAYER = "https://player.meupetrecho.com.br";
const URL_API = "https://api.meupetrecho.com.br/api/v1";
const ACCOUNT_ID = "85b71750-b509-4e2a-8727-0a79df94ab83";

interface PlaylistItem {
  name: string;
  album: string;
  artist: string;
  url: string;
}

const schedulesCalculateAddicionals = (schedules: ScheduleItem[]) => {
  return (
    schedules
      .map((item) => {
        const timeAttended = Math.ceil(item.averageTime / 30);
        if (timeAttended > 1) {
          return Array.from({ length: timeAttended }, (_, i) =>
            dayjs(item.scheduleAt)
              .add(i * 30, "minute")
              .format("HH:mm")
          );
        }
        return dayjs(item.scheduleAt).format("HH:mm");
      })
      .flat() || []
  );
};

export default function Render() {
  const { playlist } = useLocalSearchParams<{ playlist: string }>();

  const [currentItem, setCurrentItem] = useState("Schedules");
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [urls, setUrls] = useState<PlaylistItem[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [nextSchedules, setNextSchedules] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchSchedules = async (start: string, end: string) => {
      console.log("fetching schedules", start, end);

      const response = await axios.get(
        `${URL_API}/public/account/${ACCOUNT_ID}/schedules`,
        {
          params: {
            where: {
              scheduleAt: {
                $between: [start, end],
              },
              status: "pending",
            },
          },
        }
      );

      return response.data;
    };

    const fetch = async () => {
      const response = await Promise.all([
        fetchSchedules(
          dayjs().startOf("day").toISOString(),
          dayjs().endOf("day").toISOString()
        ),
        fetchSchedules(
          dayjs().add(1, "day").startOf("day").toISOString(),
          dayjs().add(1, "day").endOf("day").toISOString()
        ),
      ]);

      setSchedules(response[0]);
      setNextSchedules(response[1]);
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(
          `${URL_PLAYER}/playlist/${playlist.toLowerCase()}`
        );

        setUrls(response.data.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.log("error fetching media", error);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        // Troca o componente quando fade out terminar
        setCurrentItem((prev) => {
          const currentIndex = components.indexOf(prev);
          const nextIndex = (currentIndex + 1) % components.length;
          return components[nextIndex];
        });

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      });
    }, 15_000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  const Component = useMemo(() => {
    switch (currentItem) {
      case "CurrentTime":
        return CurrentTime;
      case "CurrentSchedule":
        return CurrentSchedule;
      case "CurrentNews":
        return CurrentNews;
      case "Schedules":
        return Schedules;
      default:
        return CurrentTime;
    }
  }, [currentItem]);

  const schedulesWithAddicionals = useMemo(
    () => schedulesCalculateAddicionals(schedules),
    [schedules]
  );

  const schedulesNextWithAddicionals = useMemo(
    () => schedulesCalculateAddicionals(nextSchedules),
    [nextSchedules]
  );

  const schedulesCurrentNext = useMemo(
    () =>
      schedules
        .filter((item) => dayjs(item.scheduleAt).isAfter(dayjs()))
        .slice(0, 3)
        .sort(
          (a, b) =>
            new Date(a.scheduleAt).getTime() - new Date(b.scheduleAt).getTime()
        ),
    [schedules]
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={{ flex: 1 }}>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 32,
            paddingTop: 32,
            backgroundColor: "#f0f0f0",
            paddingBottom: 8,
          }}
        >
          <CurrentMusic urls={urls} />
          <CurrentWeather />
        </ThemedView>
        <Animated.View
          style={{
            flex: 1,
            paddingHorizontal: 32,
            opacity: fadeAnim,
          }}
        >
          <Component
            schedules={schedulesWithAddicionals}
            nextSchedules={schedulesNextWithAddicionals}
          />
        </Animated.View>
        <ThemedView>
          <NextSchedules schedules={schedulesCurrentNext} />
        </ThemedView>
      </ThemedView>
    </>
  );
}
