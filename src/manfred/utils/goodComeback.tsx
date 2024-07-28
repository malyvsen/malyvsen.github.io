import OpenAI from "openai";

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
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Categorize your last response. Respond with a JSON object containing one boolean called goodComeback.",
      },
      ...messages.slice(-4).map((message) => message.openAiMessage),
      { role: "assistant", content: comeback },
    ],
    model: "gpt-4o-mini",
    temperature: 0.0,
    response_format: { type: "json_object" },
  });

  if (response.choices[0].message.content === null) {
    throw new Error("OpenAI returned null message content");
  }

  let parsedResponse;
  try {
    parsedResponse = JSON.parse(response.choices[0].message.content);
  } catch (e) {
    return true;
  }

  if (typeof parsedResponse !== "object" || parsedResponse === null) {
    return true;
  }

  if (!("goodComeback" in parsedResponse)) {
    return true;
  }
  if (typeof parsedResponse.goodComeback !== "boolean") {
    return true;
  }
  if (parsedResponse.goodComeback) {
    return true;
  }

  return false;
}
