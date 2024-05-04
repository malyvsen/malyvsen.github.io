import Groq from "groq-sdk";

import { decrypt } from "../encryption";

export interface Clients {
  groq: Groq;
}

export async function decryptClients(key: CryptoKey) {
  const decryptedGroqKey = await decrypt({
    key,
    encryptedData: encryptedKeys.groq,
  });
  return {
    groq: new Groq({ dangerouslyAllowBrowser: true, apiKey: decryptedGroqKey }),
  };
}

const encryptedKeys = {
  groq: new Uint8Array([
    185, 49, 77, 231, 222, 82, 206, 134, 132, 50, 123, 100, 200, 242, 71, 107,
    95, 111, 4, 10, 198, 112, 59, 248, 14, 249, 236, 63, 80, 219, 236, 83, 97,
    198, 63, 114, 111, 202, 8, 44, 168, 187, 180, 62, 93, 195, 213, 154, 244,
    58, 253, 105, 110, 129, 29, 218, 171, 21, 37, 40, 67, 170, 65, 208, 52, 152,
    163, 183, 198, 168, 28, 128,
  ]),
};
