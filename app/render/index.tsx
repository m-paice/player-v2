import axios from "axios";
import dayjs from "dayjs";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Image, StyleSheet } from "react-native";

import { ScheduleItem } from "@/@types/Schedule";
import { CurrentMusic } from "@/components/CurrentMusic";
import { CurrentNews } from "@/components/CurrentNews";
import { CurrentSchedule } from "@/components/CurrentSchedule";
import { CurrentTime } from "@/components/CurrentTime";
import { CurrentWeather } from "@/components/CurrentWeather";
import { NextSchedules } from "@/components/NextSchedules";
import { Schedules } from "@/components/Schedules";
import { ThemedView } from "@/components/ThemedView";
import { cleanString } from "@/utils/cleanString";

import logo from "../../assets/images/logo.jpeg";

const components = [
  "Schedules",
  "CurrentSchedule",
  "CurrentNews",
  "CurrentTime",
];

const URL_PLAYER = "https://player.meupetrecho.com.br";
const URL_API = "https://api.meupetrecho.com.br/api/v1";
const ACCOUNT_ID = "85b71750-b509-4e2a-8727-0a79df94ab83";

interface Config {
  days: Record<string, boolean>;
  weekHours: Record<string, string[][]>;
}

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

const fetchSchedules = async (start: string, end: string) => {
  console.log("fetching schedules", start, end);

  const response = await axios.get<ScheduleItem[]>(
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

  return response.data.sort(
    (a, b) => dayjs(a.scheduleAt).valueOf() - dayjs(b.scheduleAt).valueOf()
  );
};

export default function Render() {
  const { playlist } = useLocalSearchParams<{ playlist: string }>();

  const [currentItem, setCurrentItem] = useState("Schedules");
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [urls, setUrls] = useState<PlaylistItem[]>([]);
  const [openToDay, setOpenToDay] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [nextSchedules, setNextSchedules] = useState<ScheduleItem[]>([]);
  const [nextDay, setNextDay] = useState("");
  const [hours, setHours] = useState<string[][]>([]);
  const [nextHours, setNextHours] = useState<string[][]>([]);
  const [config, setConfig] = useState<Config | null>(null);
  const [amountNextOpenDay, setAmountNextOpenDay] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      console.log("Fetching account info...");
      const response = await axios.get(
        `${URL_API}/public/account/${ACCOUNT_ID}/info`
      );
      setConfig(response.data.config);
    };

    fetch().catch((error) => {
      console.error("Error fetching account:", error);
    });
  }, []);

  useEffect(() => {
    if (!config) return;

    const currentDay = dayjs().format("dddd");
    setOpenToDay(
      config.days[cleanString(currentDay).toLowerCase().slice(0, 3)]
    );
    setHours(config.weekHours[cleanString(currentDay).toUpperCase()]);

    const searchingAmountNextOpenDay = (amount: number) => {
      const nextDay = dayjs().add(amount, "day").format("dddd");
      if (!config.days[cleanString(nextDay).toLowerCase().slice(0, 3)]) {
        return searchingAmountNextOpenDay(amount + 1);
      }

      return amount;
    };

    const daysToNextService = searchingAmountNextOpenDay(1);
    setAmountNextOpenDay(daysToNextService);

    const nextOpenDay = dayjs().add(daysToNextService, "day").format("dddd");
    setNextDay(nextOpenDay);
    setNextHours(config.weekHours[cleanString(nextOpenDay).toUpperCase()]);
  }, [config]);

  useEffect(() => {
    if (currentItem !== "Schedules") return;

    const fetch = async () => {
      const response = await Promise.all([
        fetchSchedules(
          dayjs().startOf("day").toISOString(),
          dayjs().endOf("day").toISOString()
        ),
        fetchSchedules(
          dayjs().add(amountNextOpenDay, "day").startOf("day").toISOString(),
          dayjs().add(amountNextOpenDay, "day").endOf("day").toISOString()
        ),
      ]);

      setSchedules(response[0]);
      setNextSchedules(response[1]);
    };

    fetch().catch((error) => {
      console.error("Error fetching schedules:", error);
    });
  }, [currentItem]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${URL_PLAYER}/playlist/${playlist.toLowerCase()}`
        );

        setUrls(response.data.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.log("error fetching media", error);
      }
    };

    fetch();
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

  const scheduleCurrent = useMemo(() => {
    const lastSchedules = schedules
      .filter((item) => dayjs(item.scheduleAt).isBefore(dayjs()))
      .sort(
        (a, b) => dayjs(b.scheduleAt).valueOf() - dayjs(a.scheduleAt).valueOf()
      );

    if (lastSchedules.length === 0) return null;

    return lastSchedules[0];
  }, [schedules]);

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
        <ThemedView style={styles.header}>
          <CurrentMusic urls={urls} />
          <CurrentWeather />
        </ThemedView>
        <Animated.View style={[styles.main, { opacity: fadeAnim }]}>
          <Image source={logo} style={styles.image} />
          <Component
            schedules={schedulesWithAddicionals}
            nextSchedules={schedulesNextWithAddicionals}
            schedule={scheduleCurrent}
            openToDay={openToDay}
            nextDay={nextDay}
            hours={hours}
            nextHours={nextHours}
          />
        </Animated.View>
        <ThemedView>
          <NextSchedules schedules={schedulesCurrentNext} />
        </ThemedView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingTop: 32,
    backgroundColor: "#c1c1c1",
    paddingBottom: 8,
  },
  main: {
    flex: 1,
    paddingHorizontal: 32,
  },
  image: {
    // full screen width
    flex: 1,
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
    position: "absolute",
    opacity: 0.1,
  },
});
