import { useLayoutEffect, useRef } from "react";

import Message from "../utils/message";

import MessageComponent from "./MessageComponent";

export default function MessageList({ messages }: { messages: Message[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current === null) {
      return;
    }
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
        overflow: "auto",
        marginTop: "auto",
        width: "100%",
      }}
    >
      {messages.map((message, index) => (
        <MessageComponent key={index} message={message} />
      ))}
    </div>
  );
}
