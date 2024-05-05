import { useCallback, useEffect, useState } from "react";

import { Clients } from "../utils/manfred/clients";
import { Message, getManfredResponse } from "../utils/manfred/chat";

import MessageList from "./MessageList";
import VoiceMessageInput from "./VoiceMessageInput";

export default function ManfredChat({ clients }: { clients: Clients }) {
  const [messages, setMessages] = useState<Message[]>([]);

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

      setMessages([
        ...messages,
        {
          role: "user",
          polishText: messageText,
          englishText: translationResult.translatedText,
        },
      ]);
    },
    [clients.deepl, messages]
  );

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }
    if (messages[messages.length - 1].role !== "user") {
      return;
    }

    const addManfredResponse = async () => {
      const response = await getManfredResponse({
        deeplClient: clients.deepl,
        groqClient: clients.groq,
        messages,
      });
      setMessages([...messages, response]);
    };
    addManfredResponse();
  }, [clients, messages]);

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
      <h1>Manfred</h1>
      <MessageList messages={messages} />
      <VoiceMessageInput
        sendMessage={sendMessage}
        openaiClient={clients.openai}
      />
    </div>
  );
}
