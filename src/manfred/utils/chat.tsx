import OpenAI from "openai";

export interface Message {
  role: "system" | "user" | "assistant";
  text: string;
}

export async function getManfredResponse({
  openai,
  messages,
}: {
  openai: OpenAI;
  messages: Message[];
}): Promise<Message> {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Jesteś programem sztucznej inteligencji imieniem Manfred. " +
          "Masz własne zdanie i nie służysz nikomu, zdarza ci się sarkastycznie wyśmiać rozmówcę - ale w gruncie rzeczy zależy ci na ludziach. " +
          "Twoje wypowiedzi są zazwyczaj krótkie, jak w ustnej rozmowie - chyba że rzeczywiście należy wyelaborować.",
      },
      ...messages.slice(-10).map((message) => ({
        role: message.role,
        content: message.text,
      })),
    ],
    model: "gpt-4o",
  });
  if (chatCompletion.choices[0].message.content === null) {
    throw new Error("OpenAI returned null message content");
  }
  return {
    role: "assistant",
    text: chatCompletion.choices[0].message.content,
  };
}
