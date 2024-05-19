import { useCallback, useState } from "react";

import { Clients } from "../utils/clients";
import { Message, getManfredResponse } from "../utils/chat";
import useReader from "../utils/useReader";

import MessageList from "./MessageList";
import TextMessageInput from "./TextMessageInput";
import VoiceMessageInput from "./VoiceMessageInput";

export default function ManfredChat({ clients }: { clients: Clients }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [interactionMode, setInteractionMode] = useState<"voice" | "text">(
    "text"
  );
  const readText = useReader(clients.elevenlabs);

  const sendMessage = useCallback(
    async (messageText: string) => {
      const translationContext = messages
        .slice(-3, messages.length)
        .map((message) => message.polishText)
        .join("\n");
      const translationResult = await clients.deepl.translate({
        text: messageText,
        context: translationContext,
        sourceLanguage: "PL",
        targetLanguage: "EN",
      });

      const messagesWithUser: Message[] = [
        ...messages,
        {
          role: "user",
          polishText: messageText,
          englishText: translationResult.translatedText,
        },
      ];
      setMessages(messagesWithUser);

      const manfredResponse = await getManfredResponse({
        deeplClient: clients.deepl,
        groqClient: clients.groq,
        messages: messagesWithUser,
      });
      setMessages([...messagesWithUser, manfredResponse]);
      if (interactionMode === "voice") {
        await readText(manfredResponse.polishText);
      }
    },
    [clients, messages, interactionMode, readText]
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
