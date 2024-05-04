import { useState, useEffect } from "react";
import Groq from "groq-sdk";

import { decrypt } from "../utils/encryption";
import { Message, getManfredResponse } from "../utils/manfred";

import "./ManfredChat.css";

export default function ManfredChat({
  encryptionKey,
}: {
  encryptionKey: CryptoKey;
}) {
  const [groqClient, setGroqClient] = useState<Groq | null>(null);

  const [wipMessage, setWipMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const decryptKeys = async () => {
      const decryptedGroqKey = await decrypt({
        key: encryptionKey,
        encryptedData: encryptedGroqKey,
      });
      setGroqClient(
        new Groq({ dangerouslyAllowBrowser: true, apiKey: decryptedGroqKey })
      );
    };
    decryptKeys();
  }, [encryptionKey]);

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
    if (groqClient === null) {
      return; // TODO: handle this
    }
    if (messages.length === 0) {
      return;
    }
    if (messages[messages.length - 1].role !== "user") {
      return;
    }

    const addManfredResponse = async () => {
      const response = await getManfredResponse({
        groqClient,
        messages,
      });
      setMessages([...messages, response]);
    };
    addManfredResponse();
  }, [groqClient, messages]);

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

const encryptedGroqKey = new Uint8Array([
  185, 49, 77, 231, 222, 82, 206, 134, 132, 50, 123, 100, 200, 242, 71, 107, 95,
  111, 4, 10, 198, 112, 59, 248, 14, 249, 236, 63, 80, 219, 236, 83, 97, 198,
  63, 114, 111, 202, 8, 44, 168, 187, 180, 62, 93, 195, 213, 154, 244, 58, 253,
  105, 110, 129, 29, 218, 171, 21, 37, 40, 67, 170, 65, 208, 52, 152, 163, 183,
  198, 168, 28, 128,
]);
