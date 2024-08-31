import Clients from "@utils/clients";

import getExpectedResponseLength from "./getExpectedResponseLength";
import getLoadingResponse from "./getLoadingResponse";
import getMainResponse from "./getMainResponse";
import Message from "./message";

export default async function* getManfredResponses({
  clients,
  messages,
}: {
  clients: Clients;
  messages: Message[];
}): AsyncGenerator<Message> {
  const expectedResponseLength = await getExpectedResponseLength({
    clients,
    messages,
  });
  console.log(`Expected response length: ${expectedResponseLength}`);

  const mainPromise = getMainResponse({
    clients,
    messages,
    expectedResponseLength,
  });

  if (expectedResponseLength === "long") {
    yield await getLoadingResponse({ clients, messages });
  }
  yield await mainPromise;
}
