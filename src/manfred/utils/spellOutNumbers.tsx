import Clients from "@utils/clients";

import getOpenAiResponse from "./getOpenAiResponse";
import Message from "./message";

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
      "Repeat the given text, but spell out numbers, if there are any.",
    messages: [new Message("user", text)],
    modelName: "gpt-4o-mini",
  });
  return spelledOutText;
}
