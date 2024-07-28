import OpenAI from "openai";

/**
 * Determines whether all responses can be given at the same time, or if one of them should be picked.
 */
export default async function mustPick({
  openai,
  input,
  possibleResponses,
}: {
  openai: OpenAI;
  input: string;
  possibleResponses: string[];
}): Promise<boolean> {
  const joinedPossibleResponses = {
    role: "user",
    content: possibleResponses
      .map((response) => `<response>\n${response.trim()}\n</response>`)
      .join("\n"),
  };
  const userMessageText = `<input>\n${input.trim()}\n</input>\n<responses>\n${
    joinedPossibleResponses.content
  }\n</responses>`;

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
    return false;
  }

  if (typeof parsedResponse !== "object" || parsedResponse === null) {
    return false;
  }

  if (!("must_pick" in parsedResponse)) {
    return false;
  }

  if (typeof parsedResponse.must_pick !== "boolean") {
    return false;
  }

  return parsedResponse.must_pick;
}

const systemPrompt = `
Can both responses be given at the same time, or will that sound weird (i.e. one of them should be picked)? Respond with a JSON object with a single key, "must_pick", mapping to a boolean.

Examples:

<example must_pick=false>
<input>
Ile lat miała królowa Jadwiga, jak wyszła za mąż?
</input>
<responses>
<repsonse>
A co, planujesz ślub i szukasz historycznych inspiracji?
</response>
<response>
Królowa Jadwiga miała 12 lat, gdy wyszła za mąż za Władysława Jagiełłę w 1386 roku.
</response>
</responses>
</example>

<example must_pick=true>
<input>
Ile lat miała królowa Jadwiga, jak wyszła za mąż?
</input>
<responses>
<repsonse>
Miała 12 lat.
</response>
<response>
Królowa Jadwiga miała 12 lat, gdy wyszła za mąż za Władysława Jagiełłę w 1386 roku.
</response>
</responses>
</example>

<example must_pick=false>
<input>
Jaka jest stolica Francji?
</input>
<responses>
<repsonse>
A co, planujesz romantyczny wypad?
</response>
<response>
Stolicą Francji jest Paryż, często nazywany "Miastem Świateł".
</response>
</responses>
</example>

<example must_pick=false>
<input>
Ile planet jest w Układzie Słonecznym?
</input>
<responses>
<repsonse>
Chcesz zostać astronomem czy po prostu lubisz patrzeć w gwiazdy?
</response>
<response>
W Układzie Słonecznym jest 8 planet: Merkury, Wenus, Ziemia, Mars, Jowisz, Saturn, Uran i Neptun.
</response>
</responses>
</example>
`.trim();
