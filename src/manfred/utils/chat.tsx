import asCompleted from "@utils/asCompleted";
import Clients from "@utils/clients";
import OpenAI from "openai";

export class Message {
  constructor(
    public author: "user" | "assistant-sarcastic" | "assistant-main",
    public text: string
  ) {}

  get openAiMessage(): OpenAI.Chat.ChatCompletionMessageParam {
    return {
      role: this.role,
      content: this.text,
    };
  }

  get role(): "user" | "assistant" {
    return this.author === "user" ? "user" : "assistant";
  }
}

export async function* getManfredResponses({
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

  for await (const message of asCompleted([
    sarcasticResponsePromise,
    mainResponsePromise,
  ])) {
    yield message;
  }
}

export async function getOpenAiResponse({
  openai,
  systemPrompt,
  messages,
}: {
  openai: OpenAI;
  systemPrompt: string;
  messages: Message[];
}): Promise<string> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.slice(-10).map((message) => message.openAiMessage),
    ],
    model: "gpt-4o",
    temperature: 0.0,
  });
  if (chatCompletion.choices[0].message.content === null) {
    throw new Error("OpenAI returned null message content");
  }
  return chatCompletion.choices[0].message.content;
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
