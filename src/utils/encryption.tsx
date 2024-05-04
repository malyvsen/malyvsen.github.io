export async function encrypt({ key, data }: { key: CryptoKey; data: string }) {
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: initializationVector },
    key,
    textEncoder.encode(data)
  );

  return new Uint8Array(encryptedData);
}

export async function decrypt({
  key,
  encryptedData,
}: {
  key: CryptoKey;
  encryptedData: Uint8Array;
}) {
  const decryptedData = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: initializationVector },
    key,
    encryptedData
  );

  return textDecoder.decode(decryptedData);
}

export async function passwordToKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = textEncoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new Uint8Array([
        12, 12, 225, 1, 149, 230, 122, 103, 243, 211, 40, 176,
      ]),
      iterations: 1000000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const initializationVector = new Uint8Array([
  207, 135, 15, 169, 75, 41, 3, 154, 88, 138, 122, 188,
]);
