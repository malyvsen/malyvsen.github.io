import { useEffect, useRef } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import OpenAI from "openai";

import "./MessageInput.css";

export default function VoiceMessageInput({
  sendMessage: sendMessage,
  openaiClient,
}: {
  sendMessage: (message: string) => Promise<void>;
  openaiClient: OpenAI;
}) {
  const { startRecording, stopRecording, recordingBlob, isRecording } =
    useAudioRecorder();

  const oldRecordingBlob = useRef<Blob | null>(null);
  useEffect(() => {
    const sendTranscription = async () => {
      if (recordingBlob === undefined) {
        return;
      }
      if (recordingBlob === oldRecordingBlob.current) {
        return;
      }
      oldRecordingBlob.current = recordingBlob;

      const recordingFile = new File(
        [recordingBlob],
        "recording." + recordingBlob.type.split("/")[1].split(";")[0],
        {
          type: recordingBlob.type,
        }
      );
      const transcription = await openaiClient.audio.transcriptions.create({
        file: recordingFile,
        model: "whisper-1",
        language: "pl",
        prompt: "Manfred",
      });

      sendMessage(transcription.text);
    };
    sendTranscription();
  }, [sendMessage, openaiClient, recordingBlob]);

  return (
    <div className="message-input-container">
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        className="message-input"
      >
        {isRecording
          ? "Nagrywanie - puść, aby zakończyć"
          : "Przytrzymaj, aby nagrać głosówkę"}
      </button>
    </div>
  );
}
