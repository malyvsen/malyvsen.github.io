import { useCallback, useState } from "react";

import Clients from "@utils/clients";

import { Message, getManfredResponses } from "../utils/chat";
import textToSpeech from "../utils/textToSpeech";
import useAudioPlayer from "../utils/useAudioPlayer";

import MessageList from "./MessageList";
import TextMessageInput from "./TextMessageInput";
import VoiceMessageInput from "./VoiceMessageInput";

export default function ManfredChat({ clients }: { clients: Clients }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [interactionMode, setInteractionMode] = useState<"voice" | "text">(
    "text"
  );
  const playAudio = useAudioPlayer();

  const sendMessage = useCallback(
    async (messageText: string) => {
      const extendedMessages: Message[] = [...messages];
      extendedMessages.push(new Message("user", messageText));
      setMessages([...extendedMessages]);

      const responseGenerator = getManfredResponses({
        clients,
        messages: extendedMessages,
      });

      async function playAfter(previousPromise: Promise<void>, audio: Blob) {
        await previousPromise;
        await playAudio(audio);
      }

      let lastAudioPromise: Promise<void> | null = null;
      for await (const response of responseGenerator) {
        extendedMessages.push(response);
        setMessages([...extendedMessages]);

        if (interactionMode === "voice") {
          const speech = await textToSpeech({
            clients,
            text: response.text,
          });
          if (lastAudioPromise === null) {
            lastAudioPromise = playAudio(speech);
          } else {
            lastAudioPromise = playAfter(lastAudioPromise, speech);
          }
        }
      }

      if (lastAudioPromise !== null) {
        await lastAudioPromise;
      }
    },
    [clients, messages, interactionMode, playAudio]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "min(100%, 32em)",
        height: messages.length === 0 ? "10vh" : "100vh",
        transition: "height 0.5s ease-in-out",
      }}
    >
      <h1 style={{ marginBottom: "0" }}>Manfred</h1>
      <p
        onClick={() =>
          setInteractionMode(interactionMode === "voice" ? "text" : "voice")
        }
        style={{ marginTop: "0", userSelect: "none" }}
      >
        W trybie {interactionMode === "voice" ? "głosowym" : "tekstowym"}
      </p>
      <MessageList messages={messages} />
      {interactionMode === "text" ? (
        <TextMessageInput sendMessage={sendMessage} />
      ) : (
        <VoiceMessageInput
          sendMessage={sendMessage}
          openaiClient={clients.openai}
        />
      )}
    </div>
  );
}
