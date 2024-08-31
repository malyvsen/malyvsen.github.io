import Groq from "groq-sdk";

export default async function speechToText({
  groq,
  audioBlob,
}: {
  groq: Groq;
  audioBlob: Blob;
}): Promise<string> {
  const recordingFile = new File(
    [audioBlob],
    "recording." + audioBlob.type.split("/")[1].split(";")[0],
    {
      type: audioBlob.type,
    }
  );
  const transcription = await groq.audio.transcriptions.create({
    file: recordingFile,
    model: "whisper-large-v3",
    prompt: "Manfred",
    language: "pl",
    temperature: 0.0,
  });
  return transcription.text;
}
