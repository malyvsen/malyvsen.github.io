import OpenAI from "openai";

export default class Message {
  constructor(
    public author: "user" | "assistant-main" | "assistant-loading",
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
