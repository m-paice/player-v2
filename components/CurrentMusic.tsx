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
  const playNextRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

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
      // Cleanup
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (playNextRef.current) {
        clearTimeout(playNextRef.current);
      }
    };
  }, []);

  const playNext = useCallback(() => {
    // Prevenir múltiplas chamadas simultâneas
    if (playNextRef.current) {
      clearTimeout(playNextRef.current);
    }

    playNextRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % urls.length;
        console.log(`Avançando para música ${nextIndex + 1}/${urls.length}`);
        return nextIndex;
      });
      setErrorCount(0); // Reset error count ao avançar
    }, 100); // Pequeno delay para evitar race conditions
  }, [urls.length]);

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;

      // Música finalizada naturalmente
      if (status.didJustFinish) {
        console.log("Música finalizada, tocando próxima");
        playNext();
        return;
      }

      // Erro na reprodução
      if (status.error) {
        console.error("Erro na reprodução:", status.error);
        setHasError(true);

        // Prevenir loop infinito - máximo 3 tentativas por música
        if (errorCount < 3) {
          setErrorCount((prev) => prev + 1);
          setTimeout(() => playNext(), 1000); // Delay antes de tentar próxima
        } else {
          console.error("Muitos erros consecutivos, pausando reprodução");
          setErrorCount(0);
        }
      } else {
        // Reset error state se música está tocando normalmente
        if (hasError) {
          setHasError(false);
        }
      }
    },
    [playNext, hasError, errorCount]
  );

  const loadAndPlaySound = useCallback(async () => {
    // Prevenir carregamentos simultâneos
    if (isLoadingRef.current) {
      console.log("Carregamento já em andamento, aguardando...");
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setHasError(false);

      // Parar e descarregar música atual
      if (soundRef.current) {
        console.log("Descarregando música anterior");
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const currentUrl = urls[currentIndex].url;
      console.log(
        `Carregando música ${currentIndex + 1}/${urls.length}: ${currentUrl}`
      );

      // Validar URL
      if (!currentUrl || currentUrl.trim() === "") {
        throw new Error("URL inválida ou vazia");
      }

      // Carregar nova música (sem tocar automaticamente)
      const { sound } = await Audio.Sound.createAsync(
        { uri: currentUrl },
        { shouldPlay: false }, // Não tocar automaticamente
        onPlaybackStatusUpdate
      );

      soundRef.current = sound;

      // Verificar se o áudio foi carregado corretamente
      const status = await sound.getStatusAsync();

      if (status.isLoaded) {
        console.log("Áudio carregado com sucesso, iniciando reprodução");
        await sound.playAsync();
      } else {
        throw new Error("Falha ao carregar o áudio");
      }
    } catch (error) {
      console.error("Erro ao carregar áudio:", error);
      setHasError(true);

      // Tentar próxima música após delay
      setTimeout(() => {
        if (errorCount < 3) {
          setErrorCount((prev) => prev + 1);
          playNext();
        }
      }, 1500);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [currentIndex, urls, onPlaybackStatusUpdate, playNext, errorCount]);

  // Effect principal para carregar música quando índice muda
  useEffect(() => {
    if (!urls || urls.length === 0) {
      console.log("Nenhuma URL disponível");
      return;
    }

    if (currentIndex >= urls.length) {
      console.log("Índice inválido, resetando para 0");
      setCurrentIndex(0);
      return;
    }

    loadAndPlaySound();
  }, [currentIndex, urls]); // Removido loadAndPlaySound das dependências

  const currentMusic = useMemo(() => {
    if (!urls || urls.length === 0) return null;
    return urls[currentIndex];
  }, [urls, currentIndex]);

  // Função para debug - pode ser removida em produção
  const debugInfo = useMemo(
    () => ({
      currentIndex,
      totalUrls: urls.length,
      isLoading,
      hasError,
      errorCount,
      currentUrl: currentMusic?.url,
    }),
    [currentIndex, urls.length, isLoading, hasError, errorCount, currentMusic]
  );

  // Log para debug - remover em produção
  useEffect(() => {
    console.log("Debug Info:", debugInfo);
  }, [debugInfo]);

  return (
    <ThemedView style={styles.container}>
      {!currentMusic ? (
        <ThemedText>
          {isLoading ? "Carregando música..." : "Carregando músicas"}
        </ThemedText>
      ) : (
        <ThemedView style={styles.content}>
          <IconMusic />
          <ThemedText
            style={styles.musicText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {hasError ? "⚠️ " : ""}
            {currentMusic.name} - {currentMusic.artist}
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
    width: "68%",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    width: "95%",
  },
  musicText: {
    display: "flex",
    flexDirection: "row",
  },
});
