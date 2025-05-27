import { IconMusic } from "./icons/Music";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const payload = {
  name: "Even Flow",
  artist: "Pearl Jam",
};

export const CurrentMusic = () => {
  return (
    <ThemedView
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#f0f0f0",
      }}
    >
      <IconMusic />
      <ThemedText
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {payload.name} - {payload.artist}
      </ThemedText>
    </ThemedView>
  );
};
