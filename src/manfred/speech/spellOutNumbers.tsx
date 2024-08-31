import Clients from "@utils/clients";

import getOpenAiResponse from "../ai/getOpenAiResponse";
import Message from "../ai/message";

/**
 * Spells out any numbers in the given text.
 */
export default async function spellOutNumbers({
  clients,
  text,
}: {
  clients: Clients;
  text: string;
}): Promise<string> {
  const spelledOutText = await getOpenAiResponse({
    openai: clients.openai,
    systemPrompt:
      "Powtórz podany tekst, ale wyraź liczby w formie słownej, jeśli jakieś się pojawiają.",
    messages: [new Message("user", text)],
    modelName: "gpt-4o-mini",
  });
  return spelledOutText;
}
