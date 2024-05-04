import { useState } from "react";

import { encrypt } from "../encryption";

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
    <div style={{ textAlign: "center" }}>
      <h1>Manfred</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
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
