import OpenAI from "openai";

import { useCallback, useEffect, useMemo } from "react";

export default function useReader(openai: OpenAI) {
  const audioElement = useMemo(() => {
    return new Audio();
  }, []);

  useEffect(() => {
    return () => audioElement.remove();
  }, [audioElement]);

  const readText = useCallback(
    async (text: string) => {
      const response = await openai.audio.speech.create({
        model: "tts-1",
        voice: "echo",
        input: text,
      });
      const audioBlob = await response.blob();
      audioElement.src = URL.createObjectURL(audioBlob); // TODO: revokeObjectURL
      audioElement.play();
    },
    [openai, audioElement]
  );
  return readText;
}
