export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage: string;
}

export default class DeeplClient {
  constructor(private key: string) {}

  async translate({
    text,
    context,
    sourceLanguage,
    targetLanguage,
  }: {
    text: string;
    context?: string;
    sourceLanguage: string;
    targetLanguage: string;
  }): Promise<TranslationResult> {
    const params = new URLSearchParams({
      auth_key: this.key,
      text: text,
      ...(context !== undefined ? { context } : {}),
      source_lang: sourceLanguage,
      target_lang: targetLanguage,
    });

    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
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
