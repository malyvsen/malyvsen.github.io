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
  const score =
    0.7526595745 +
    ratings.humour * -0.3005319149 +
    ratings.sarcasm * 0.3085106383 +
    ratings.subtlety * -0.1090425532;

  console.log(`Comeback score: ${score}`, ratings);
  return score > 0.5;
}

const Ratings = z.object({
  humour: z.number(),
  sarcasm: z.number(),
  subtlety: z.number(),
});
