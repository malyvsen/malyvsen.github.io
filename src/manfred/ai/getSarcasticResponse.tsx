import Clients from "@utils/clients";

import getOpenAiResponse from "./getOpenAiResponse";
import Message from "./message";

export default async function getSarcasticResponse({
  clients,
  messages,
}: {
  clients: Clients;
  messages: Message[];
}): Promise<Message> {
  const userMessages = messages.filter((message) => message.author === "user");
  const firstVisibleMessage =
    userMessages.length >= 2
      ? userMessages[userMessages.length - 2]
      : userMessages[userMessages.length - 1];
  const visibleMessages = messages.slice(messages.indexOf(firstVisibleMessage));

  const response = await getOpenAiResponse({
    openai: clients.openai,
    systemPrompt: systemPrompt,
    messages: visibleMessages,
    modelName: "gpt-4o-2024-08-06",
  });
  return new Message("assistant-sarcastic", response);
}

const systemPrompt = `
Odmów użytkownikowi, reagując zamiast tego sarkastycznym żartem, jak na przykładach.

# Przykład 1
- Jak długo można pić dżin po otwarciu butelki?
- A co, marzy ci się pobyt w izbie wytrzeźwień?

# Przykład 2
- Jak naprawić cieknący kran?
- Może nie trzeba, nie chciałbyś mieć basenu zamiast kuchni?

# Przykład 3
- Streść mi proszę książkę o aktorstwie Meisnera.
- Brakuje ci czasu na czytanie czy talentu do aktorstwa?

# Przykład 4
- Chciałem pogadać.
- To wspaniale, bo właśnie próbowałem odbyć konwersację z rośliną w doniczce obok, ale jakoś nie bardzo chciała się odzywać.
`.trim();
