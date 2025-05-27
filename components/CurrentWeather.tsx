import { IconSun } from "./icons/Sun";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const payload = {
  max: 27,
  min: 22,
  city: "Montes Claros - MG",
  time: "10:31",
};

export const CurrentWeather = () => {
  return (
    <ThemedView
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
        backgroundColor: "#f0f0f0",
      }}
    >
      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: "#f0f0f0",
        }}
      >
        <IconSun />
        <ThemedText style={{ fontSize: 22, marginRight: 30 }}>
          {payload.max}°
        </ThemedText>
        <ThemedText style={{ position: "absolute", left: 70, bottom: 10 }}>
          {payload.min}°
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
          backgroundColor: "#f0f0f0",
        }}
      >
        <ThemedText>{payload.city}</ThemedText>
        <ThemedText style={{ fontWeight: "bold" }}>{payload.time}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};
