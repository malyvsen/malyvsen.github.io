import { useEffect, useMemo } from "react";

export default function useAudioPlayer() {
  const audioElement = useMemo(() => {
    return new Audio();
  }, []);

  useEffect(() => {
    return () => audioElement.remove();
  }, [audioElement]);

  async function playAudio(audio: Blob): Promise<void> {
    const audioUrl = URL.createObjectURL(audio);
    audioElement.src = audioUrl;

    const playPromise = new Promise<void>((resolve) => {
      audioElement.addEventListener(
        "ended",
        () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        },
        { once: true }
      );
    });

    await audioElement.play();
    await playPromise;
  }
  return playAudio;
}
