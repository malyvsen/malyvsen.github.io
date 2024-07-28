import asCompleted from "@utils/asCompleted";
import Clients from "@utils/clients";

import getOpenAiResponse from "./getOpenAiResponse";
import Message from "./message";
import mustPick from "./mustPick";

export default async function* getManfredResponses({
  clients,
  messages,
}: {
  clients: Clients;
  messages: Message[];
}): AsyncGenerator<Message> {
  const sarcasticResponsePromise = getOpenAiResponse({
    openai: clients.openai,
    systemPrompt: sarcasticPrompt,
    messages: messages
      .filter((message) =>
        ["user", "assistant-sarcastic"].includes(message.author)
      )
      .slice(-10),
  }).then((response) => new Message("assistant-sarcastic", response));

  const mainResponsePromise = getOpenAiResponse({
    openai: clients.openai,
    systemPrompt: mainPrompt,
    messages: messages.slice(-10),
  }).then((response) => new Message("assistant-main", response));

  const yieldedMessages: Message[] = [];

  for await (const message of asCompleted([
    sarcasticResponsePromise,
    mainResponsePromise,
  ])) {
    if (yieldedMessages.length === 0) {
      yield message;
    } else {
      const mustPickResponse = await mustPick({
        openai: clients.openai,
        input: messages[-1].text,
        possibleResponses: yieldedMessages.map((message) => message.text),
      });
      if (!mustPickResponse) {
        yield message;
      }
    }
    yieldedMessages.push(message);
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
