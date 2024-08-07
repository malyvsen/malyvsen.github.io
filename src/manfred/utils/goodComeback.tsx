import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import Message from "./message";

export default async function goodComeback({
  openai,
  messages,
  comeback,
}: {
  openai: OpenAI;
  messages: Message[];
  comeback: string;
}): Promise<boolean> {
  const userMessages = messages.filter((message) => message.role === "user");
  const lastUserMessage = userMessages[userMessages.length - 1];

  const response = await openai.beta.chat.completions.parse({
    messages: [
      { role: "system", content: "Rate the last message on a 1-5 scale." },
      { role: "assistant", content: lastUserMessage.text }, // pretend the roles were swapped - the LLM gets this better
      { role: "user", content: comeback },
    ],
    model: "gpt-4o-mini",
    temperature: 0.0,
    response_format: zodResponseFormat(Ratings, "ratings"),
    max_tokens: 32,
  });

  if (response.choices[0].message.refusal !== null) {
    return true; // a comeback which triggers safety filters is probably good
  }

  const ratings = response.choices[0].message.parsed!;
  const score = ratings.intelligence + ratings.humour * 2 + ratings.sarcasm;

  console.log(`Comeback score: ${score}`, ratings);
  return score > 10;
}

const Ratings = z.object({
  intelligence: z.number(),
  humour: z.number(),
  sarcasm: z.number(),
});
