export default class ElevenLabsClient {
  constructor(private key: string) {}

  async generateSpeech(text: string) {
    const voiceId = "bvTG3uFtJT2LxDu21Stx";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", "xi-api-key": this.key },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    };

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      options
    );
    if (!response.ok || response.body === null) {
      throw new Error(`ElevenLabs returned unexpected response: ${response}`);
    }
    console.log(response);
    return response.body;
  }
}
