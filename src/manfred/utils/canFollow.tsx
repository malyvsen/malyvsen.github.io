import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

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
    .map((response) => response.trim())
    .join("\n");

  const response = await openai.beta.chat.completions.parse({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessageText },
    ],
    model: "gpt-4o-mini",
    temperature: 0.0,
    response_format: zodResponseFormat(Judgement, "judgement"),
    max_tokens: 32,
  });

  if (response.choices[0].message.refusal !== null) {
    return false;
  }

  const relationship = response.choices[0].message.parsed!;
  return relationship.flowsNaturally;
}

const Judgement = z.object({
  flowsNaturally: z.boolean(),
});

const systemPrompt = `
Determine if the user's message flows naturally.

# Example 1

Input:
A co, planujesz ślub i szukasz historycznych inspiracji?
Królowa Jadwiga miała 12 lat, gdy wyszła za mąż za Władysława Jagiełłę w 1386 roku.

Output:
{"flowsNaturally": true}

# Example 2

Input:
Miała 12 lat.
Królowa Jadwiga miała 12 lat, gdy wyszła za mąż za Władysława Jagiełłę w 1386 roku.

Output:
{"flowsNaturally": false} // the message repeats the same statement twice

# Example 3

Input:
Jestem gotowy do pomocy. Jak mogę Ci pomóc?
Bywało lepiej. A ty, jak się trzymasz w tym świecie pełnym ludzi?

Output:
{"flowsNaturally": false} // the message sounds weirdly concatenated
`.trim();
