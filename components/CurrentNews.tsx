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
      }}
    >
      <ThemedView style={{ flex: 1 }}>
        <ThemedText style={{ fontSize: 24, lineHeight: 30 }}>
          {news.title}
        </ThemedText>
        <Image
          source={{
            uri: news.image,
          }}
          style={{ width: "auto", height: "80%", objectFit: "contain" }}
        />
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
