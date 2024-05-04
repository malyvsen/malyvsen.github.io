export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage: string;
}

export default class DeeplClient {
  constructor(private key: string) {}

  async translate(
    text: string,
    sourceLanguage: string | null,
    targetLanguage: string
  ): Promise<TranslationResult> {
    const response = await fetch("https://api.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `DeepL-Auth-Key ${this.key}`,
      },
      body: JSON.stringify({
        text: [text],
        ...(sourceLanguage === null ? {} : { source_lang: sourceLanguage }),
        target_lang: targetLanguage,
      }),
    });
    const data = await response.json();

    const translatedText = data.translations[0].text;
    if (typeof translatedText !== "string") {
      throw new Error(`Deepl returned unexpected response: ${data}`);
    }

    const detectedSourceLanguage =
      data.translations[0].detected_source_language;
    if (typeof detectedSourceLanguage !== "string") {
      throw new Error(`Deepl returned unexpected response: ${data}`);
    }

    return { translatedText, detectedSourceLanguage };
  }
}
