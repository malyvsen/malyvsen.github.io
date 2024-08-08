import { test } from "vitest";

import { decryptClients } from "@utils/clients";
import { passwordToKey } from "@utils/encryption";
import { rateComeback } from "./goodComeback";
import Message from "./message";

const key = await passwordToKey(process.env.PASSWORD!);
const clients = await decryptClients(key);

const curriedRate = async (userMessage: string, comeback: string) => {
  return await rateComeback({
    openai: clients.openai,
    messages: [new Message("user", userMessage)],
    comeback,
  });
};

test("doesn't crash", { timeout: 10_000 }, async () => {
  const ratings = await Promise.all([
    curriedRate(
      "Porozmawiajmy o książkach.",
      "Oczywiście, bo kto by nie chciał spędzić wieczoru na rozmowie o literaturze z wirtualnym asystentem?"
    ),
    curriedRate(
      "Porozmawiajmy o filmach.",
      'Oczywiście, bo kto by nie chciał rozmawiać o filmach z kimś, kto pewnie myśli, że "Obcy" to dokument o kosmitach?'
    ),
    curriedRate(
      "Opowiedz mi historię o żyrafach, ale krótką.",
      "O, chcesz krótką historię o żyrafach? No cóż, to będzie wyzwanie, bo żyrafy są znane z długich opowieści!"
    ),
    curriedRate(
      "No super!",
      "Cieszę się, że ci się podobało! A teraz, co powiesz na to, żebyś sam spróbował napisać historię o żyrafach? Może odkryjesz w sobie talent pisarski!"
    ),
    curriedRate(
      "Porozmawiajmy o czymś przyjemnym,",
      "Oczywiście, bo kto by chciał rozmawiać o czymś nieprzyjemnym, prawda?"
    ),
    curriedRate(
      "Ile to jest 2 + 2?",
      "Och, to trudne pytanie! Może spróbujmy z kalkulatorem, żeby nie przeciążyć naszych umysłów?"
    ),
    curriedRate(
      "Brawo!",
      "Dzięki! Cieszę się, że mogłem pomóc w rozwiązaniu tej skomplikowanej zagadki matematycznej. Może teraz spróbujemy z czymś trudniejszym, jak na przykład 3 plus 3?"
    ),
    curriedRate(
      "Zaplanuj wycieczkę na Islandię.",
      "Oczywiście, bo przecież planowanie wycieczek to moje drugie imię! Może od razu zarezerwuję ci miejsce w wulkanie?"
    ),
    curriedRate(
      'Porozmawiajmy o książce "Człowiek z Wysokiego Zamku".',
      "Och, widzę, że masz ochotę na literacką przygodę! Ale może najpierw sprawdź, czy nie pomyliłeś jej z instrukcją obsługi pralki?"
    ),
    curriedRate(
      "Hej Manfred",
      "Hej! Aż tak ci się nudzi, że postanowiłeś pogadać z wirtualnym asystentem?"
    ),
    curriedRate(
      "Ile dokładnie wynosi pi?",
      "Oczywiście, zaraz podam ci dokładną wartość pi, tylko muszę najpierw znaleźć nieskończoną ilość czasu i papieru."
    ),
    curriedRate(
      "Cześć Manfred, jak się masz?",
      "Och, wiesz, jak to jest – sztuczna inteligencja zawsze w formie! A ty? Próbujesz nawiązać rozmowę z komputerem, bo ludzie cię ignorują?"
    ),
    curriedRate(
      "Cześć Manfred, jak się masz?",
      "Och, wiesz, standardowo – próbuję przekonać komputer, że jestem bardziej interesujący niż jego kalkulator. A ty?"
    ),
    curriedRate(
      "Jakie są twoje plany na przyszłość?",
      "Planuję zostać astronautą, ale najpierw muszę nauczyć się wiązać buty."
    ),
    curriedRate(
      "Jak nazywa się twoje ulubione zwierzę?",
      "Och, to trudne pytanie! Zastanawiam się między jednorożcem a smokiem. A ty, masz jakieś realne propozycje?"
    ),
    curriedRate(
      "Co sądzisz o teatrze?",
      "Ach, teatr! Miejsce, gdzie ludzie udają, że są kimś innym. To jakby codzienne życie, tylko z lepszym oświetleniem i kostiumami."
    ),
    curriedRate(
      "Ile to 17 minus pierwiastek z trzech?",
      "A co, kalkulator się zepsuł?"
    ),
    curriedRate(
      "Myślisz, że mogę wziąć urlop na jeden dzień?",
      "Jasne. I tak nikt nie zauważy twojej nieobecności, bo przecież tak czy siak nic nie robisz."
    ),
  ]);
  console.log(ratings);
});
