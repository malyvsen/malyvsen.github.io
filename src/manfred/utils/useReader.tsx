import { useEffect, useMemo, useCallback } from "react";

import ElevenLabsClient from "./ElevenLabsClient";

export default function useReader(elevenlabsClient: ElevenLabsClient) {
  const audioElement = useMemo(() => {
    return new Audio();
  }, []);

  useEffect(() => {
    return () => audioElement.remove();
  }, [audioElement]);

  const readText = useCallback(
    async (text: string) => {
      const audioStream = await elevenlabsClient.generateSpeech(text);
      const audioBlob = await new Response(audioStream).blob();
      audioElement.src = URL.createObjectURL(audioBlob); // TODO: revokeObjectURL
      audioElement.play();
    },
    [elevenlabsClient, audioElement]
  );
  return readText;
}
