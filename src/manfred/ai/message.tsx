import OpenAI from "openai";

export default class Message {
  constructor(public author: "user" | "assistant", public text: string) {}

  get openAiMessage(): OpenAI.Chat.ChatCompletionMessageParam {
    return {
      role: this.author,
      content: this.text,
    };
  }
}

export class LoadingMessage extends Message {
  constructor(text: string) {
    super("assistant", text);
  }
}

export class MainMessage extends Message {
  constructor(text: string, public length: "short" | "medium" | "long") {
    super("assistant", text);
  }
}
