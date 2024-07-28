import Clients from "@utils/clients";

export default async function textToSpeech({
  clients,
  text,
}: {
  clients: Clients;
  text: string;
}): Promise<Blob> {
  const response = await clients.openai.audio.speech.create({
    model: "tts-1",
    voice: "echo",
    input: text,
  });
  const audioBlob = await response.blob();
  return audioBlob;
}
