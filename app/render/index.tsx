import axios from "axios";
import dayjs from "dayjs";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Image, StyleSheet } from "react-native";

import { CurrentMusic } from "@/components/CurrentMusic";
import { CurrentNews } from "@/components/CurrentNews";
import { CurrentSchedule } from "@/components/CurrentSchedule";
import { CurrentTime } from "@/components/CurrentTime";
import { CurrentWeather } from "@/components/CurrentWeather";
import { NextSchedules } from "@/components/NextSchedules";
import { Schedules } from "@/components/Schedules";
import { ThemedView } from "@/components/ThemedView";

import logo from "../../assets/images/logo.jpeg";

const components = [
  "Schedules",
  "CurrentSchedule",
  "CurrentNews",
  "CurrentTime",
];

const URL_PLAYER = "https://player.meupetrecho.com.br";
const URL_API = "https://api.meupetrecho.com.br/app";
const ACCOUNT_ID = "684ff406970a3b1154e32b97";
const TIMEOUT = 15_000; // 15 seconds

interface WeekDay {
  open: boolean;
  start: string;
  end: string;
  breakStart: string;
  breakEnd: string;
}
interface Config {
  monday: WeekDay;
  tuesday: WeekDay;
  wednesday: WeekDay;
  thursday: WeekDay;
  friday: WeekDay;
  saturday: WeekDay;
  sunday: WeekDay;
}

interface PlaylistItem {
  name: string;
  album: string;
  artist: string;
  url: string;
}

const fetchCurrentSchedule = async () => {
  try {
    const response = await axios.get(`${URL_API}/schedules/current`, {
      params: {
        accountId: ACCOUNT_ID,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching current schedule:", error);
    return null;
  }
};

const fetchNextSchedules = async () => {
  try {
    const response = await axios.get(`${URL_API}/schedules/next`, {
      params: {
        accountId: ACCOUNT_ID,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching next schedules:", error);
    return [];
  }
};

const fetchSchedules = async (date: string) => {
  const response = await axios.get(`${URL_API}/schedules`, {
    params: {
      accountId: ACCOUNT_ID,
      date,
    },
  });

  return response.data.data;
};

export default function Render() {
  const { playlist } = useLocalSearchParams<{ playlist: string }>();

  const [currentItem, setCurrentItem] = useState("Schedules");
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [urls, setUrls] = useState<PlaylistItem[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [currentNews, setCurrentNews] = useState(0);
  const [openToDay, setOpenToDay] = useState(false);
  const [schedules, setSchedules] = useState<string[]>([]);
  const [nextSchedules, setNextSchedules] = useState<string[]>([]);
  const [nextDay, setNextDay] = useState("");
  const [config, setConfig] = useState<Config | null>(null);
  const [amountNextOpenDay, setAmountNextOpenDay] = useState(1);

  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [nextShortSchedules, setNextShortSchedules] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${URL_API}/accounts/${ACCOUNT_ID}`);
      setConfig(response.data.data.weekDays);
    };

    fetch().catch((error) => {
      console.error("Error fetching account:", error);
    });
  }, []);

  useEffect(() => {
    if (!config) return;

    const currentDay = dayjs().format("dddd").toLowerCase();
    const configDay = config[currentDay as keyof Config];

    setOpenToDay(configDay.open);

    const searchingAmountNextOpenDay = (amount: number) => {
      const nextDay = dayjs().add(amount, "day").format("dddd").toLowerCase();
      if (!config[nextDay as keyof Config].open) {
        return searchingAmountNextOpenDay(amount + 1);
      }

      return amount;
    };

    const daysToNextService = searchingAmountNextOpenDay(1);
    setAmountNextOpenDay(daysToNextService);

    const nextOpenDay = dayjs()
      .add(daysToNextService, "day")
      .format("dddd")
      .toLowerCase();
    setNextDay(nextOpenDay);
  }, [config]);

  useEffect(() => {
    if (currentItem === "CurrentNews" && news.length > 0) {
      setTimeout(() => {
        setCurrentNews((prev) => (prev + 1) % news.length);
      }, TIMEOUT);
    }

    if (currentItem === "Schedules") {
      const fetch = async () => {
        try {
          const response = await Promise.all([
            fetchSchedules(dayjs().startOf("day").toISOString()),
            fetchSchedules(
              dayjs().add(amountNextOpenDay, "day").startOf("day").toISOString()
            ),
            fetchCurrentSchedule(),
            fetchNextSchedules(),
          ]);

          setSchedules(response[0]);
          setNextSchedules(response[1]);
          setCurrentSchedule(response[2]);
          setNextShortSchedules(response[3]);
        } catch (error) {
          console.error("Error fetching schedules:", error);
        }
      };

      fetch();
    }
  }, [currentItem]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${URL_PLAYER}/playlist/${playlist.toLowerCase()}`
        );

        setUrls(response.data.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("error fetching media", error);
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
    }, TIMEOUT);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${URL_PLAYER}/rss/news.json`);

        setNews(response.data.sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("error fetching news", error);
      }
    };

    fetchNews();
  }, []);

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

  const newsCurrent = useMemo(() => {
    if (news.length === 0)
      return { title: "Carregando...", image: logo, nextNews: [] };

    return {
      title: news[currentNews]?.title,
      image: news[currentNews]?.media || logo,
      nextNews:
        news.slice(currentNews + 1, currentNews + 5).map((n) => n.title) || [],
    };
  }, [currentNews, news]);

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
            schedules={schedules}
            nextSchedules={nextSchedules}
            schedule={currentSchedule}
            openToDay={openToDay}
            nextDay={nextDay}
            news={newsCurrent}
          />
        </Animated.View>
        <ThemedView>
          <NextSchedules schedules={nextShortSchedules} />
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
    // borderRadius: 8,
    position: "absolute",
    left: 30,
    opacity: 0.2,
    width: "100%",
  },
});
