import { useState } from "react";

import "./MessageInput.css";

export default function TextMessageInput({
  sendMessage,
}: {
  sendMessage: (message: string) => Promise<void>;
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-container">
      <input
        type="text"
        placeholder="Wiadomość do Manfreda"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="message-input"
      />
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
}
