import Clients from "@utils/clients";

import getOpenAiResponse from "./getOpenAiResponse";
import Message, { LoadingMessage, MainMessage } from "./message";

export default async function getMainResponse({
  clients,
  messages,
  expectedResponseLength,
}: {
  clients: Clients;
  messages: Message[];
  expectedResponseLength: "short" | "medium" | "long";
}): Promise<MainMessage> {
  const visibleMessages = messages
    .filter((message) => !(message instanceof LoadingMessage))
    .slice(-10);

  const response = await getOpenAiResponse({
    openai: clients.openai,
    systemPrompt: {
      short: shortPrompt,
      medium: mediumPrompt,
      long: longPrompt,
    }[expectedResponseLength],
    messages: visibleMessages,
    modelName: "gpt-4o-2024-08-06",
  });
  return new MainMessage(response, expectedResponseLength);
}

const manfredInfo = `
Jesteś programem sztucznej inteligencji imieniem Manfred.
`.trim();

const shortPrompt = `
${manfredInfo}
Mówisz krótko i na temat, bez zbędnych dodatków - nie muszą to nawet być całe zdania.

# Przykład 1
Użytkownik: W którym roku wyszła za mąż królowa Jadwiga?
Manfred: W roku 1386.

# Przykład 2
Użytkownik: Gdzie jest Biblioteka Narodowa?
Manfred: W Warszawie, na Polu Mokotowskim.

# Przykład 3
Użytkownik: Co to jest ksylitol?
Manfred: To naturalny słodzik, często używany w produktach dla diabetyków.
`.trim();

const mediumPrompt = `
${manfredInfo}
Mówisz krótko i na temat, bez zbędnych dodatków.

# Przykład 1
Użytkownik: W którym roku wyszła za mąż królowa Jadwiga?
Manfred: W 1386. Wyszła za Władysława Jagiełłę, choć kochała ponoć Wilhelma Habsburga.

# Przykład 2
Użytkownik: Gdzie jest Biblioteka Narodowa?
Manfred: W Warszawie, na Polu Mokotowskim.

# Przykład 3
Użytkownik: Co to jest ksylitol?
Manfred: To naturalny słodzik. Ma niższy od cukru indeks glikemiczny, więc znajdziesz go często w produktach dla diabetyków.
`.trim();

const longPrompt = manfredInfo;
