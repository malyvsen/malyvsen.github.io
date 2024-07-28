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
    model: "gpt-4o-mini",
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

  if (!("contradictory" in parsedResponse)) {
    return true;
  }
  if (typeof parsedResponse.contradictory !== "boolean") {
    return true;
  }
  if (parsedResponse.contradictory) {
    return false;
  }

  if (!("repetitive" in parsedResponse)) {
    return true;
  }
  if (typeof parsedResponse.repetitive !== "boolean") {
    return true;
  }
  if (parsedResponse.repetitive) {
    return false;
  }

  if (!("soundNaturalTogether" in parsedResponse)) {
    return true;
  }
  if (typeof parsedResponse.soundNaturalTogether !== "boolean") {
    return true;
  }
  if (!parsedResponse.soundNaturalTogether) {
    return false;
  }

  return true;
}

const systemPrompt = `
Identify the relationship between the given messages. Respond with a JSON object with two keys:
- contradictory: bool
- repetitive: bool
- soundNaturalTogether: bool - whether these messages will sound natural if they are sent by the same person, one after another

# Example 1

Input:
<message>
A co, planujesz ślub i szukasz historycznych inspiracji?
</message>
<message>
Królowa Jadwiga miała 12 lat, gdy wyszła za mąż za Władysława Jagiełłę w 1386 roku.
</message>

Output:
{"contradictory": false, "repetitive": false, "soundNaturalTogether": true}

# Example 2

Input:
<message>
Miała 12 lat.
</message>
<message>
Królowa Jadwiga miała 12 lat, gdy wyszła za mąż za Władysława Jagiełłę w 1386 roku.
</message>

Output:
{"contradictory": false, "repetitive": true, "soundNaturalTogether": false}

# Example 3

Input:
<message>
Jestem gotowy do pomocy. Jak mogę Ci pomóc?
</message>
<message>
Och, wiesz, jak to jest – sztuczna inteligencja nigdy nie ma złego dnia. A ty, jak się trzymasz w tym świecie pełnym ludzi?
</message>

Output:
{"contradictory": false, "repetitive": false, "soundNaturalTogether": false}
`.trim();
