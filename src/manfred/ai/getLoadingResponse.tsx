import Clients from "@utils/clients";

import getOpenAiResponse from "./getOpenAiResponse";
import Message, { LoadingMessage } from "./message";

export default async function getLoadingResponse({
  clients,
  messages,
}: {
  clients: Clients;
  messages: Message[];
}): Promise<LoadingMessage> {
  const userMessages = messages.filter((message) => message.author === "user");
  const lastUserMessage = userMessages[userMessages.length - 1];

  const response = await getOpenAiResponse({
    openai: clients.openai,
    systemPrompt: systemPrompt,
    messages: [lastUserMessage],
    modelName: "gpt-4o-2024-08-06",
    temperature: 1.0,
  });
  return new LoadingMessage(response);
}

const systemPrompt = `
Nie odpowiadaj jeszcze użytkownikowi - zamiast tego poinformuj go pokrótce, że pracujesz nad odpowiedzią i zaraz będzie ona gotowa.
Powiedz mu też, że (w przeciwieństwie do tego, co robisz zazwyczaj) nie będziesz jej czytał na głos, bo będzie za długa.
Możesz zawrzeć w swojej wypowiedzi nieco sarkastycznego humoru, jeśli jest ku temu dobra okazja.
`.trim();
