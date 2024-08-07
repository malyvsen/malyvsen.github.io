import Groq from "groq-sdk";
import OpenAI from "openai";

import { decrypt } from "@utils/encryption";

export default interface Clients {
  groq: Groq;
  openai: OpenAI;
}

export async function decryptClients(key: CryptoKey) {
  const groqKey = await decrypt({
    key,
    encryptedData: encryptedKeys.groq,
  });

  const openaiKey = await decrypt({
    key,
    encryptedData: encryptedKeys.openai,
  });

  return {
    groq: new Groq({
      dangerouslyAllowBrowser: true,
      apiKey: groqKey,
    }),
    openai: new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: openaiKey,
    }),
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
  openai: new Uint8Array([
    173, 41, 11, 200, 255, 121, 157, 249, 134, 26, 25, 68, 170, 250, 83, 25, 65,
    71, 0, 45, 212, 116, 34, 187, 9, 134, 241, 52, 127, 139, 152, 85, 2, 141,
    11, 37, 90, 156, 19, 83, 165, 225, 132, 24, 14, 222, 137, 167, 213, 94, 242,
    115, 79, 139, 59, 197, 3, 105, 6, 135, 21, 234, 31, 109, 79, 38, 183, 254,
    15, 8, 116, 148, 225, 170, 115, 222, 54, 109, 60, 208, 31, 179, 134, 203,
    140, 146, 22, 57, 224, 122, 129, 149, 245, 225, 173, 199, 136, 70, 210, 181,
    127, 93, 147, 120, 86, 116, 126, 239, 192, 65, 202, 82, 13, 40, 28, 18, 174,
    181, 250, 93, 247, 168, 244, 149, 67, 6, 220, 119, 77, 190, 45, 73, 239,
    175, 15, 44, 212, 167, 42, 91, 169, 226, 55, 5, 209, 181, 244, 46,
  ]),
};
