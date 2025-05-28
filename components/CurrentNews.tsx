import { Image } from "react-native";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

import image from "../assets/images/capa-news.png";

const payload = {
  title:
    "Ancelotti confirma acerto com seleção, mas se nega dar detalhes até dia 26. ",
  image: "",
  nextNews: [
    "Seleção brasileira anuncia novo técnico",
    "Ancelotti fala sobre futuro",
    "Brasil se prepara para amistosos",
    "Ancelotti comenta sobre jogadores convocados",
    "Expectativa para a Copa do Mundo",
  ],
};

export const CurrentNews = () => {
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
          {payload.title}
        </ThemedText>
        <Image
          source={image}
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
        {payload.nextNews.map((news, index) => (
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
