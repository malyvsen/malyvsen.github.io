import Message from "../utils/message";

import "./MessageComponent.css";

export default function MessageComponent({ message }: { message: Message }) {
  const textAlign = message.role === "user" ? "right" : "left";
  const alignSelf = message.role === "user" ? "flex-end" : "flex-start";

  return (
    <div
      className="message"
      style={{ textAlign: textAlign, alignSelf: alignSelf }}
    >
      {message.text}
    </div>
  );
}
