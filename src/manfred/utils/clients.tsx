import Groq from "groq-sdk";
import OpenAI from "openai";

import { decrypt } from "@utils/encryption";
import DeeplClient from "./DeeplClient";
import ElevenLabsClient from "./ElevenLabsClient";

export interface Clients {
  groq: Groq;
  deepl: DeeplClient;
  openai: OpenAI;
  elevenlabs: ElevenLabsClient;
}

export async function decryptClients(key: CryptoKey) {
  const decryptedGroqKey = await decrypt({
    key,
    encryptedData: encryptedKeys.groq,
  });
  const decryptedDeeplKey = await decrypt({
    key,
    encryptedData: encryptedKeys.deepl,
  });
  const decryptedOpenAIKey = await decrypt({
    key,
    encryptedData: encryptedKeys.openai,
  });
  const decryptedElevenlabsKey = await decrypt({
    key,
    encryptedData: encryptedKeys.elevenlabs,
  });
  return {
    groq: new Groq({ dangerouslyAllowBrowser: true, apiKey: decryptedGroqKey }),
    deepl: new DeeplClient(decryptedDeeplKey),
    openai: new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: decryptedOpenAIKey,
    }),
    elevenlabs: new ElevenLabsClient(decryptedElevenlabsKey),
  };
}

const encryptedKeys = {
  deepl: new Uint8Array([
    187, 112, 19, 217, 181, 116, 197, 231, 202, 79, 17, 16, 158, 181, 56, 60,
    37, 80, 121, 93, 228, 93, 77, 160, 104, 142, 238, 126, 6, 221, 207, 110, 97,
    133, 44, 119, 54, 206, 41, 41, 91, 198, 41, 186, 137, 226, 185, 94, 174, 70,
    118, 141, 93, 90, 153,
  ]),
  groq: new Uint8Array([
    185, 49, 77, 231, 222, 82, 206, 134, 132, 50, 123, 100, 200, 242, 71, 107,
    95, 111, 4, 10, 198, 112, 59, 248, 14, 249, 236, 63, 80, 219, 236, 83, 97,
    198, 63, 114, 111, 202, 8, 44, 168, 187, 180, 62, 93, 195, 213, 154, 244,
    58, 253, 105, 110, 129, 29, 218, 171, 21, 37, 40, 67, 170, 65, 208, 52, 152,
    163, 183, 198, 168, 28, 128,
  ]),
  openai: new Uint8Array([
    173, 41, 11, 209, 218, 116, 130, 141, 128, 69, 66, 27, 181, 211, 117, 12,
    37, 89, 17, 49, 238, 83, 77, 217, 106, 252, 228, 36, 89, 174, 224, 112, 24,
    209, 37, 13, 101, 197, 38, 23, 184, 199, 216, 40, 67, 218, 209, 170, 233,
    126, 211, 39, 171, 144, 53, 59, 191, 105, 77, 95, 76, 151, 184, 45, 6, 44,
    61,
  ]),
  elevenlabs: new Uint8Array([
    189, 118, 71, 219, 235, 38, 206, 181, 213, 70, 24, 70, 158, 170, 62, 107,
    117, 6, 98, 80, 181, 13, 78, 181, 108, 216, 177, 35, 1, 218, 147, 63, 2, 79,
    250, 178, 65, 27, 155, 145, 208, 241, 214, 7, 203, 79, 78, 247,
  ]),
};
