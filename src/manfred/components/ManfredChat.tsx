import { useCallback, useState } from "react";

import { Message, getManfredResponse } from "../utils/chat";
import { Clients } from "../utils/clients";
import useReader from "../utils/useReader";

import MessageList from "./MessageList";
import TextMessageInput from "./TextMessageInput";
import VoiceMessageInput from "./VoiceMessageInput";

export default function ManfredChat({ clients }: { clients: Clients }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [interactionMode, setInteractionMode] = useState<"voice" | "text">(
    "text"
  );
  const readText = useReader(clients.openai);

  const sendMessage = useCallback(
    async (messageText: string) => {
      const messagesWithUser: Message[] = [
        ...messages,
        {
          role: "user",
          text: messageText,
        },
      ];
      setMessages(messagesWithUser);

      const manfredResponse = await getManfredResponse({
        openai: clients.openai,
        messages: messagesWithUser,
      });
      setMessages([...messagesWithUser, manfredResponse]);
      if (interactionMode === "voice") {
        await readText(manfredResponse.text);
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
