import { useState } from "react";

import { encrypt } from "../encryption";

import "./ManfredChat.css";

interface Message {
  text: string;
}

function ManfredChat({ encryptionKey }: { encryptionKey: CryptoKey }) {
  const [wipMessage, setWipMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages([
      ...messages,
      {
        text: wipMessage,
      },
    ]);
    setWipMessage("");
  };

  return (
    <div className="container">
      <h1>Manfred</h1>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div className="message" key={index}>
            {message.text}
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
      </form>
    </div>
  );
}

export default ManfredChat;
