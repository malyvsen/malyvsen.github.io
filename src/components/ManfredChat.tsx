import { useState, useEffect } from "react";

import { Clients } from "../utils/manfred/clients";
import { Message, getManfredResponse } from "../utils/manfred/chat";

import "./ManfredChat.css";

export default function ManfredChat({ clients }: { clients: Clients }) {
  const [wipMessage, setWipMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages([
      ...messages,
      {
        role: "user",
        content: wipMessage,
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
        groqClient: clients.groq,
        messages,
      });
      setMessages([...messages, response]);
    };
    addManfredResponse();
  }, [clients, messages]);

  return (
    <div className="container">
      <h1>Manfred</h1>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
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
