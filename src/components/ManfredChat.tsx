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
      .map((message) => message.polishText)
      .join("\n");
    const translationResult = await clients.deepl.translate({
      text: wipMessage,
      context: translationContext,
      sourceLanguage: "PL",
      targetLanguage: "EN",
    });

    setMessages([
      ...messages,
      {
        role: "user",
        polishText: wipMessage,
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
  );
}
