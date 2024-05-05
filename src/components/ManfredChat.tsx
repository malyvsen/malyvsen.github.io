import { useCallback, useState } from "react";

import { Clients } from "../utils/manfred/clients";
import { Message, getManfredResponse } from "../utils/manfred/chat";
import useReader from "../utils/manfred/useReader";

import MessageList from "./MessageList";
import VoiceMessageInput from "./VoiceMessageInput";

export default function ManfredChat({ clients }: { clients: Clients }) {
  const [messages, setMessages] = useState<Message[]>([]);
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
      await readText(manfredResponse.polishText);
    },
    [clients, messages, readText]
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
      <h1>Manfred</h1>
      <MessageList messages={messages} />
      <VoiceMessageInput
        sendMessage={sendMessage}
        openaiClient={clients.openai}
      />
    </div>
  );
}
