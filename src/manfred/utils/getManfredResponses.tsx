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
    modelName: "gpt-4o",
  }).then((response) => new Message("assistant-main", response));

  const sarcasticPromise = getOpenAiResponse({
    openai: clients.openai,
    systemPrompt: sarcasticPrompt,
    messages: messages.slice(-10),
    modelName: "gpt-4o",
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

<przykład>
- Jak długo można pić dżin po otwarciu butelki?
- A co, marzy ci się pobyt w izbie wytrzeźwień?
</przykład>

<przykład>
- Jak naprawić cieknący kran?
- Może nie trzeba, nie chciałbyś mieć basenu zamiast kuchni?
</przykład>

<przykład>
- Streść mi proszę książkę o aktorstwie Meisnera.
- Brakuje ci czasu na czytanie czy talentu do aktorstwa?
</przykład>
`.trim();

const mainPrompt = `
Jesteś programem sztucznej inteligencji imieniem Manfred.
Mówisz krótko i na temat, bez wstępów czy zastrzeżeń - ale elaborujesz, jeśli użytkownik poprosi.
`.trim();
