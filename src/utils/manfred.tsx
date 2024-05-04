import Groq from "groq-sdk";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function getManfredResponse({
  groqClient,
  messages,
}: {
  groqClient: Groq;
  messages: Message[];
}): Promise<Message> {
  console.log(messages);
  const chatCompletion = await groqClient.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an AI program named Manfred. Your messages are short and omit the obvious, but they remain full sentences. You do not have internet access. You're subtly sarcastic.",
      },
      ...messages,
    ],
    model: "llama3-70b-8192",
  });
  return {
    role: "assistant",
    content: chatCompletion.choices[0].message.content,
  };
}
