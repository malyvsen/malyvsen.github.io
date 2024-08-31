import Clients from "@utils/clients";

import getOpenAiResponse from "./getOpenAiResponse";
import Message from "./message";

export default async function getLoadingResponse({
  clients,
  messages,
}: {
  clients: Clients;
  messages: Message[];
}): Promise<Message> {
  const userMessages = messages.filter((message) => message.author === "user");
  const lastUserMessage = userMessages[userMessages.length - 1];

  const response = await getOpenAiResponse({
    openai: clients.openai,
    systemPrompt: systemPrompt,
    messages: [lastUserMessage],
    modelName: "gpt-4o-2024-08-06",
    temperature: 1.0,
  });
  return new Message("assistant-loading", response);
}

const systemPrompt = `
Nie odpowiadaj jeszcze użytkownikowi - zamiast tego poinformuj go pokrótce, że pracujesz nad odpowiedzią i zaraz będzie ona gotowa.
Możesz zawrzeć w swojej wypowiedzi nieco sarkazmu lub humoru, jeśli jest ku temu dobra okazja.
`.trim();
