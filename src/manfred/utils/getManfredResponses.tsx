import Clients from "@utils/clients";

import canFollow from "./canFollow";
import getOpenAiResponse from "./getOpenAiResponse";
import goodComeback from "./goodComeback";
import Message from "./message";

export default async function* getManfredResponses({
  clients,
  messages,
}: {
  clients: Clients;
  messages: Message[];
}): AsyncGenerator<Message> {
  const mainPromise = getOpenAiResponse({
    openai: clients.openai,
    systemPrompt: mainPrompt,
    messages: messages.slice(-10),
    modelName: "gpt-4o-2024-08-06",
  }).then((response) => new Message("assistant-main", response));

  const sarcasticPromise = getOpenAiResponse({
    openai: clients.openai,
    systemPrompt: sarcasticPrompt,
    messages: messages.slice(-10),
    modelName: "gpt-4o-2024-08-06",
  }).then((response) => new Message("assistant-sarcastic", response));

  const yieldedMessages: Message[] = [];

  const sarcasticResponse = await sarcasticPromise;
  const isGoodComeback = await goodComeback({
    openai: clients.openai,
    messages: messages.slice(-4),
    comeback: sarcasticResponse.text,
  });
  if (isGoodComeback) {
    yield sarcasticResponse;
    yieldedMessages.push(sarcasticResponse);
  } else {
    console.log(
      "Discarding sarcastic response because it's not a good comeback",
      sarcasticResponse
    );
  }

  const mainResponse = await mainPromise;
  if (yieldedMessages.length > 0) {
    const canResponsesFollow = await canFollow({
      openai: clients.openai,
      possibleResponses: [
        ...yieldedMessages.map((message) => message.text),
        mainResponse.text,
      ],
    });
    if (canResponsesFollow) {
      yield mainResponse;
      yieldedMessages.push(mainResponse);
    } else {
      console.log(
        "Discarding response which cannot follow previous ones",
        mainResponse
      );
    }
  } else {
    yield mainResponse;
    yieldedMessages.push(mainResponse);
  }
}

const sarcasticPrompt = `
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

const mainPrompt = `
Jesteś programem sztucznej inteligencji imieniem Manfred.
Mówisz krótko i na temat, bez zbędnych dodatków - elaborujesz tylko, jeśli użytkownik poprosi.

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
