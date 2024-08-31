import OpenAI from "openai";

import Message from "./message";

export default async function getOpenAiResponse({
  openai,
  systemPrompt,
  messages,
  modelName,
  temperature = 0.0,
}: {
  openai: OpenAI;
  systemPrompt: string;
  messages: Message[];
  modelName: "gpt-4o-2024-08-06" | "gpt-4o-mini";
  temperature?: number;
}): Promise<string> {
  const chatCompletion = await openai.beta.chat.completions.parse({
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.slice(-10).map((message) => message.openAiMessage),
    ],
    model: modelName,
    temperature,
  });
  if (chatCompletion.choices[0].message.content === null) {
    throw new Error("OpenAI returned null message content");
  }
  return chatCompletion.choices[0].message.content;
}
