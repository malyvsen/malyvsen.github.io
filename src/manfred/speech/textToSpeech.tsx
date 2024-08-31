import Clients from "@utils/clients";

import preprocessText from "./preprocessText";

export default async function textToSpeech({
  clients,
  text,
}: {
  clients: Clients;
  text: string;
}): Promise<Blob> {
  const spelledOutText = await preprocessText({ clients, text });
  const response = await clients.openai.audio.speech.create({
    model: "tts-1",
    voice: "echo",
    input: spelledOutText,
    speed: 1.125,
  });
  const audioBlob = await response.blob();
  return audioBlob;
}
