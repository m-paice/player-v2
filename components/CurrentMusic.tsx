import { Audio, AVPlaybackStatus } from "expo-av";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";

import { IconMusic } from "./icons/Music";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Props {
  urls: {
    name: string;
    album: string;
    artist: string;
    url: string;
  }[];
}

export const CurrentMusic = ({ urls }: Props) => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Configurar o áudio para reprodução
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % urls.length;
      return nextIndex;
    });
  }, [urls.length]);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      // @ts-ignore
      if (status.didJustFinish) {
        console.log("Música finalizada, tocando próxima");
        playNext();
      }

      // @ts-ignore
      if (status.error) {
        // @ts-ignore
        console.log("Erro na reprodução:", status.error);
        playNext();
      }
    },
    [playNext]
  );

  const loadAndPlaySound = useCallback(async () => {
    try {
      // Parar música atual se existir
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const currentUrl = urls[currentIndex].url;
      console.log(
        `Carregando música ${currentIndex + 1}/${urls.length}: ${currentUrl}`
      );

      // Carregar nova música
      const { sound } = await Audio.Sound.createAsync(
        { uri: currentUrl },
        { shouldPlay: true }, // Tocar automaticamente
        onPlaybackStatusUpdate
      );

      soundRef.current = sound;
    } catch (error) {
      console.log("Erro ao carregar áudio:", error);
      // Tentar próxima música em caso de erro
      playNext();
    }
  }, [currentIndex, urls, onPlaybackStatusUpdate, playNext]);

  useEffect(() => {
    if (!urls || urls.length === 0) return;

    loadAndPlaySound();
  }, [currentIndex, urls, loadAndPlaySound]);

  const currentMusic = useMemo(() => {
    if (urls.length === 0) return null;

    return urls[currentIndex];
  }, [urls, currentIndex]);

  return (
    <ThemedView style={styles.container}>
      {!currentMusic ? (
        <ThemedText>Carregando músicas</ThemedText>
      ) : (
        <ThemedView style={styles.container}>
          <IconMusic />
          <ThemedText
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {currentMusic?.name} - {currentMusic?.artist}
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#c1c1c1",
  },
});
