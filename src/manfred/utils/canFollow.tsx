import OpenAI from "openai";

/**
 * Determines whether all responses can be given at the same time, or if one of them should be picked.
 */
export default async function canFollow({
  openai,
  possibleResponses,
}: {
  openai: OpenAI;
  possibleResponses: string[];
}): Promise<boolean> {
  const userMessageText = possibleResponses
    .map((response) => `<message>\n${response.trim()}\n</message>`)
    .join("\n");

  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessageText },
    ],
    model: "gpt-4o",
    temperature: 0.0,
    response_format: { type: "json_object" },
  });

  if (response.choices[0].message.content === null) {
    throw new Error("OpenAI returned null message content");
  }

  let parsedResponse;
  try {
    parsedResponse = JSON.parse(response.choices[0].message.content);
  } catch (e) {
    return true;
  }

  if (typeof parsedResponse !== "object" || parsedResponse === null) {
    return true;
  }

  if (!("mustPick" in parsedResponse)) {
    return true;
  }
  if (typeof parsedResponse.mustPick !== "boolean") {
    return true;
  }
  if (parsedResponse.mustPick) {
    return false;
  }

  return true;
}

const systemPrompt = `
Identify the relationship between the given messages. Respond with a JSON object with one key, mustPick: bool - whether these messages will sound natural if they are said by the same person, one after another, or whether one should be picked.

# Example 1

Input:
<message>
A co, planujesz ślub i szukasz historycznych inspiracji?
</message>
<message>
Królowa Jadwiga miała 12 lat, gdy wyszła za mąż za Władysława Jagiełłę w 1386 roku.
</message>

Output:
{"mustPick": false}

Explanation: The messages don't contradict and are not repetitive. Only one of them is asking something, so the natural response to them will be to answer the question or acknowledge the facts.

# Example 2

Input:
<message>
Miała 12 lat.
</message>
<message>
Królowa Jadwiga miała 12 lat, gdy wyszła za mąż za Władysława Jagiełłę w 1386 roku.
</message>

Output:
{"mustPick": true}

Explanation: The messages repeat the same information in a very obvious manner.

# Example 3

Input:
<message>
Jestem gotowy do pomocy. Jak mogę Ci pomóc?
</message>
<message>
Och, wiesz, jak to jest – sztuczna inteligencja nigdy nie ma złego dnia. A ty, jak się trzymasz w tym świecie pełnym ludzi?
</message>

Output:
{"mustPick": true}

Explanation: The latter messages sounds like it's the beginning of a monologue, not in the middle of it. What's more, both messages require a response, so the receiver is left not knowing which one to respond to.
`.trim();
