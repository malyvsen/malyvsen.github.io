import { useCallback, useState } from "react";

import Clients from "@utils/clients";

import getManfredResponses from "../ai/getManfredResponses";
import Message, { MainMessage } from "../ai/message";

import textToSpeech from "../speech/textToSpeech";
import useAudioPlayer from "../speech/useAudioPlayer";

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
      async function scheduleSpeech(text: string) {
        const speech = await textToSpeech({ clients, text });
        if (lastAudioPromise === null) {
          lastAudioPromise = playAudio(speech);
        } else {
          lastAudioPromise = playAfter(lastAudioPromise, speech);
        }
      }

      for await (const response of responseGenerator) {
        extendedMessages.push(response);
        setMessages([...extendedMessages]);

        if (interactionMode === "voice") {
          const isLongMessage =
            response instanceof MainMessage && response.length === "long";
          if (!isLongMessage) {
            scheduleSpeech(response.text);
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
        <VoiceMessageInput sendMessage={sendMessage} groq={clients.groq} />
      )}
    </div>
  );
}
