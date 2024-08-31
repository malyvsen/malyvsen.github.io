import Clients from "@utils/clients";

import getOpenAiResponse from "../ai/getOpenAiResponse";
import Message from "../ai/message";

export default async function preprocessText({
  clients,
  text,
}: {
  clients: Clients;
  text: string;
}): Promise<string> {
  // if there are no digits in the text, return straight away
  if (!/\d/.test(text)) {
    return text;
  }

  const spelledOutText = await getOpenAiResponse({
    openai: clients.openai,
    systemPrompt:
      "Powtórz podany tekst, ale wyraź liczby w formie słownej, jeśli jakieś się pojawiają.",
    messages: [new Message("user", text)],
    modelName: "gpt-4o-2024-08-06",
  });
  return spelledOutText;
}
