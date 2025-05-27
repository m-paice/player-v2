import { Stack } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated } from "react-native";

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

export default function Render() {
  const [currentItem, setCurrentItem] = useState("Schedules");
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
    }, 10_000);

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
          <CurrentMusic />
          <CurrentWeather />
        </ThemedView>
        <Animated.View
          style={{
            flex: 1,
            paddingHorizontal: 32,
            opacity: fadeAnim,
          }}
        >
          <Component />
        </Animated.View>
        <ThemedView>
          <NextSchedules />
        </ThemedView>
      </ThemedView>
    </>
  );
}
