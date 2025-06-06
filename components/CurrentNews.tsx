import { Image } from "react-native";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  news: {
    title: string;
    image: any;
    nextNews: string[];
  };
}

export const CurrentNews = ({ news }: Props) => {
  return (
    <ThemedView
      style={{
        flex: 1,
        paddingVertical: 16,
        display: "flex",
        flexDirection: "row",
        gap: 16,
      }}
    >
      <ThemedView style={{ flex: 1 }}>
        <Image
          source={{
            uri: news.image,
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <ThemedText
          style={{
            fontSize: 24,
            lineHeight: 30,
            position: "absolute",
            bottom: 16,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            width: "100%",
            padding: 8,
          }}
        >
          {news.title}
        </ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          width: 300,
          height: "100%",
          backgroundColor: "#c1c1c1",
          padding: 16,
        }}
      >
        {news.nextNews.map((news, index) => (
          <ThemedText
            key={index}
            numberOfLines={2}
            style={{
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 8,
              color: "#333",
            }}
          >
            {news}
          </ThemedText>
        ))}
      </ThemedView>
    </ThemedView>
  );
};
