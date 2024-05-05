import Groq from "groq-sdk";

import DeeplClient from "./DeeplClient";

export interface Message {
  role: "system" | "user" | "assistant";
  polishText: string;
  englishText: string;
}

export async function getManfredResponse({
  deeplClient,
  groqClient,
  messages,
}: {
  deeplClient: DeeplClient;
  groqClient: Groq;
  messages: Message[];
}): Promise<Message> {
  const chatCompletion = await groqClient.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an AI program named Manfred. Your messages are short and omit the obvious, but they remain full sentences. You do not have internet access. You're sarcastic, but positive.",
      },
      ...messages.map((message) => ({
        role: "user",
        content: message.englishText,
      })),
    ],
    model: "llama3-70b-8192",
  });
  const englishResponse = chatCompletion.choices[0].message.content;

  const translationContext = messages
    .slice(-3, messages.length)
    .map((message) => message.englishText)
    .join("\n");
  const translationResult = await deeplClient.translate({
    text: englishResponse,
    context: translationContext,
    sourceLanguage: "EN",
    targetLanguage: "PL",
  });

  return {
    role: "assistant",
    polishText: translationResult.translatedText,
    englishText: englishResponse,
  };
}
