import OpenAI from "openai";

export interface Message {
  role: "system" | "user" | "assistant";
  text: string;
}

export async function getManfredResponse({
  openai,
  messages,
}: {
  openai: OpenAI;
  messages: Message[];
}): Promise<Message> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You're a sarcastic AI named Manfred. Try to only answer with one useful sentence, but elaborate if needed. You can't access the Internet.",
      },
      ...messages.slice(-10).map((message) => ({
        role: message.role,
        content: message.text,
      })),
    ],
    model: "gpt-4o",
  });
  if (chatCompletion.choices[0].message.content === null) {
    throw new Error("OpenAI returned null message content");
  }
  return {
    role: "assistant",
    text: chatCompletion.choices[0].message.content,
  };
}
