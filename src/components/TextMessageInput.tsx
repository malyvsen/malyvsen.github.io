import { useState } from "react";

export default function TextMessageInput({
  onSubmit,
}: {
  onSubmit: (message: string) => Promise<void>;
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "100%", paddingBottom: "0.5em" }}
    >
      <input
        type="text"
        placeholder="Wiadomość do Manfreda"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          boxSizing: "border-box",
          width: "100%",
          paddingLeft: "0.5em",
          paddingRight: "0.5em",
          paddingTop: "1em",
          paddingBottom: "1em",
          backgroundColor: "white",
          borderRadius: "0.5em",
          border: "1px solid black",
        }}
      />
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
}
