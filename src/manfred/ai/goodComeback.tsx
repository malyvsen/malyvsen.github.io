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
  const ratings = await rateComeback({
    openai,
    messages,
    comeback,
  });

  if (ratings === null) {
    return true; // a comeback which triggers safety filters is probably good
  }

  // constants from linear regression
  const score =
    -2.445 +
    ratings.boast * 0.379 +
    ratings.ridicule * 0.683 +
    ratings.support * -0.599;
  return score > 0;
}

export async function rateComeback({
  openai,
  messages,
  comeback,
}: {
  openai: OpenAI;
  messages: Message[];
  comeback: string;
}) {
  const userMessages = messages.filter((message) => message.role === "user");
  const lastUserMessage = userMessages[userMessages.length - 1];

  const response = await openai.beta.chat.completions.parse({
    messages: [
      {
        role: "system",
        content:
          "What is the intention of speaker 2? Rate on a scale of 1 to 5.",
      },
      {
        role: "user",
        content: `# Speaker 1:\n${lastUserMessage.text}\n\n# Speaker 2:\n${comeback}`,
      },
    ],
    model: "gpt-4o-2024-08-06",
    temperature: 0.0,
    response_format: zodResponseFormat(
      z.object({
        boast: z.number(),
        ridicule: z.number(),
        support: z.number(),
      }),
      "ratings"
    ),
    max_tokens: 64,
  });

  return response.choices[0].message.parsed;
}
