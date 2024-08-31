import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

import Message from "./message";

export default async function getExpectedResponseLength({
  openai,
  messages,
}: {
  openai: OpenAI;
  messages: Message[];
}): Promise<"short" | "medium" | "long"> {
  const visibleMessages = messages.filter((message) =>
    ["user", "assistant-main"].includes(message.role)
  );

  const response = await openai.beta.chat.completions.parse({
    messages: [
      {
        role: "system",
        content:
          "Will a short response to the user's last message in this conversation be enough, or does it need to be longer?",
      },
      ...visibleMessages.map((message) => message.openAiMessage),
    ],
    model: "gpt-4o-mini",
    temperature: 0.0,
    response_format: zodResponseFormat(
      z.object({
        expectedResponseLength: z.union([
          z.literal("short"),
          z.literal("medium"),
          z.literal("long"),
        ]),
      }),
      "expectedResponseLength"
    ),
    max_tokens: 64,
  });

  const result = response.choices[0].message.parsed;
  if (result === null) {
    return "medium";
  }
  return result.expectedResponseLength;
}
