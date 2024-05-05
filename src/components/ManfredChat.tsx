import { useState, useEffect } from "react";

import { Clients } from "../utils/manfred/clients";
import { Message, getManfredResponse } from "../utils/manfred/chat";
import { testMessages } from "../utils/manfred/testMessages";

import MessageList from "./MessageList";

import "./ManfredChat.css";

export default function ManfredChat({ clients }: { clients: Clients }) {
  const [wipMessage, setWipMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(testMessages);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const translationContext = messages
      .slice(-3, messages.length)
      .map((message) => message.foreignText)
      .join("\n");
    const translationParams = {
      text: wipMessage,
      context: translationContext,
      targetLanguage: "EN",
    };
    let translationResult = await clients.deepl.translate(translationParams);
    if (!["PL", "EN"].includes(translationResult.detectedSourceLanguage)) {
      // it's probably Polish :)
      translationResult = await clients.deepl.translate({
        ...translationParams,
        sourceLanguage: "PL",
      });
    }

    setMessages([
      ...messages,
      {
        role: "user",
        foreignLanguage: translationResult.detectedSourceLanguage,
        foreignText: wipMessage,
        englishText: translationResult.translatedText,
      },
    ]);
    setWipMessage("");
  };

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

  const height = messages.length === 0 ? "10vh" : "100vh";
  return (
    <div className="manfred-container-outer">
      <div className="manfred-container-inner" style={{ height }}>
        <h1>Manfred</h1>
        <MessageList messages={messages} />
        <form className="message-input-container" onSubmit={handleSendMessage}>
          <input
            className="message-input"
            type="text"
            placeholder="Wiadomość do Manfreda"
            value={wipMessage}
            onChange={(e) => setWipMessage(e.target.value)}
          />
          <button type="submit" style={{ display: "none" }} />
        </form>
      </div>
    </div>
  );
}
