import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Message from "../ai/message";

import "./MessageComponent.css";

export default function MessageComponent({ message }: { message: Message }) {
  const textAlign = message.author === "user" ? "right" : "left";
  const alignSelf = message.author === "user" ? "flex-end" : "flex-start";

  return (
    <div
      className="message"
      style={{ textAlign: textAlign, alignSelf: alignSelf }}
    >
      <Markdown remarkPlugins={[remarkGfm]}>{message.text}</Markdown>
    </div>
  );
}
