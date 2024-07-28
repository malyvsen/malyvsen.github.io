import asCompleted from "@utils/asCompleted";
import Clients from "@utils/clients";

import canFollow from "./canFollow";
import getOpenAiResponse from "./getOpenAiResponse";
import Message from "./message";

export default async function* getManfredResponses({
  clients,
  messages,
}: {
  clients: Clients;
  messages: Message[];
}): AsyncGenerator<Message> {
  const messagePromises = [
    getOpenAiResponse({
      openai: clients.openai,
      systemPrompt: mainPrompt,
      messages: messages.slice(-10),
      modelName: "gpt-4o",
    }).then((response) => new Message("assistant-main", response)),
  ];

  const feelingSarcastic = Math.random() < 0.5;
  if (feelingSarcastic) {
    messagePromises.push(
      getOpenAiResponse({
        openai: clients.openai,
        systemPrompt: sarcasticPrompt,
        messages: messages.slice(-10),
        modelName: "gpt-4o",
      }).then((response) => new Message("assistant-sarcastic", response))
    );
  }
  const yieldedMessages: Message[] = [];
  for await (const message of asCompleted(messagePromises)) {
    if (yieldedMessages.length === 0) {
      yield message;
    } else {
      const canResponsesFollow = await canFollow({
        openai: clients.openai,
        possibleResponses: [
          ...yieldedMessages.map((message) => message.text),
          message.text,
        ],
      });
      if (canResponsesFollow) {
        yield message;
      } else {
        console.log(
          "Discarding response which cannot follow previous ones",
          message
        );
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
