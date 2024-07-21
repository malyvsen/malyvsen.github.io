import OpenAI from "openai";

import { decrypt } from "@utils/encryption";

export default interface Clients {
  openai: OpenAI;
}

export async function decryptClients(key: CryptoKey) {
  const decryptedOpenAIKey = await decrypt({
    key,
    encryptedData: encryptedKeys.openai,
  });
  return {
    openai: new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: decryptedOpenAIKey,
    }),
  };
}

const encryptedKeys = {
  openai: new Uint8Array([
    173, 41, 11, 209, 218, 116, 130, 141, 128, 69, 66, 27, 181, 211, 117, 12,
    37, 89, 17, 49, 238, 83, 77, 217, 106, 252, 228, 36, 89, 174, 224, 112, 24,
    209, 37, 13, 101, 197, 38, 23, 184, 199, 216, 40, 67, 218, 209, 170, 233,
    126, 211, 39, 171, 144, 53, 59, 191, 105, 77, 95, 76, 151, 184, 45, 6, 44,
    61,
  ]),
};
