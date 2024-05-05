import { useEffect, useRef } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

export default function VoiceMessageInput({
  onSubmit,
}: {
  onSubmit: (message: string) => Promise<void>;
}) {
  const { startRecording, stopRecording, recordingBlob, isRecording } =
    useAudioRecorder();

  const oldRecordingBlob = useRef<Blob | null>(null);
  useEffect(() => {
    if (recordingBlob === undefined) {
      return;
    }
    if (recordingBlob === oldRecordingBlob.current) {
      return;
    }
    oldRecordingBlob.current = recordingBlob;

    // TODO: transcribe
    onSubmit("Kotki małe dwa");
  }, [onSubmit, recordingBlob]);

  return (
    <div style={{ width: "100%", paddingBottom: "0.5em" }}>
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        style={{
          boxSizing: "border-box",
          width: "100%",
          paddingLeft: "0.5em",
          paddingRight: "0.5em",
          paddingTop: "1em",
          paddingBottom: "1em",
          backgroundColor: "white",
          borderRadius: "0.5em",
          border: "1px solid black",
        }}
      >
        {isRecording ? "Recording..." : "Start recordning"}
      </button>
    </div>
  );
}
