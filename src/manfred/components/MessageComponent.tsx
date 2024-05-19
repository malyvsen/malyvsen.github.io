import { useState } from "react";

import { Message } from "../utils/chat";

import "./MessageComponent.css";

export default function MessageComponent({ message }: { message: Message }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const textAlign = message.role === "user" ? "right" : "left";
  const alignSelf = message.role === "user" ? "flex-end" : "flex-start";

  return (
    <div
      className="message"
      style={{ textAlign: textAlign, alignSelf: alignSelf }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {message.polishText}
      {isExpanded ? (
        <>
          <br />
          <span style={{ color: "gray" }}>{message.englishText}</span>
        </>
      ) : null}
    </div>
  );
}
