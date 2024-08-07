import Groq from "groq-sdk";
import { useEffect, useRef } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

import speechToText from "../utils/speechToText";

import "./MessageInput.css";

export default function VoiceMessageInput({
  sendMessage,
  groq,
}: {
  sendMessage: (message: string) => Promise<void>;
  groq: Groq;
}) {
  const { startRecording, stopRecording, recordingBlob, isRecording } =
    useAudioRecorder();

  useEffect(() => {
    // get user's permission to access the microphone
    navigator.mediaDevices.getUserMedia({ audio: true });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        startRecording();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") {
        stopRecording();
      }
    };
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [startRecording, stopRecording]);

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

      const transcription = await speechToText({
        groq: groq,
        audioBlob: recordingBlob,
      });
      sendMessage(transcription);
    };
    sendTranscription();
  }, [sendMessage, groq, recordingBlob]);

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
