import OpenAI from "openai";

import Message from "./message";

export default async function getOpenAiResponse({
  openai,
  systemPrompt,
  messages,
  modelName,
}: {
  openai: OpenAI;
  systemPrompt: string;
  messages: Message[];
  modelName: "gpt-4o" | "gpt-4o-mini";
}): Promise<string> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.slice(-10).map((message) => message.openAiMessage),
    ],
    model: modelName,
    temperature: 0.0,
  });
  if (chatCompletion.choices[0].message.content === null) {
    throw new Error("OpenAI returned null message content");
  }
  return chatCompletion.choices[0].message.content;
}
