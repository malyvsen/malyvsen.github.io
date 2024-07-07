import { Message } from "./chat";

export const testMessages: Message[] = [
  {
    role: "user",
    text: "Cześć, jak się masz?",
  },
  {
    role: "assistant",
    text: "Dzień dobry, dziękuję, jestem dobrze. A ty?",
  },
  {
    role: "user",
    text: "Dziękuję, jestem dobrze. Możesz mi pomóc z moim zadaniem?",
  },
  {
    role: "assistant",
    text: "Oczywiście, w jakim zakresie potrzebujesz pomocy?",
  },
  {
    role: "user",
    text: "Potrzebuję pomocy z matematyką. Nie mogę rozwiązać tego równania.",
  },
  {
    role: "assistant",
    text: "Nie martw się, pomogę ci. Jak wygląda twoje równanie?",
  },
  {
    role: "user",
    text: "Mam równanie kwadratowe 2x^2 + 3x - 5 = 0",
  },
  {
    role: "assistant",
    text: "Rozumiem. Możesz użyć wzoru kwadratowego, aby rozwiązać to równanie. Ax^2 + Bx + C = 0, gdzie A = 2, B = 3, C = -5. Spróbuj obliczyć delta i x1, x2.",
  },
  {
    role: "user",
    text: "OK, dziękuję. Spróbuję obliczyć.",
  },
  {
    role: "assistant",
    text: "Dobrze, jeśli potrzebujesz pomocy, napisz. Będę tutaj.",
  },
  {
    role: "user",
    text: "Mam problem z obliczeniem delty. Możesz mi pomóc?",
  },
  {
    role: "assistant",
    text: "Oczywiście. Delta to B^2 - 4AC. W twoim przypadku B to 3, A to 2, a C to -5. Podstawmy te wartości do wzoru.",
  },
  {
    role: "assistant",
    text: "Delta = (3)^2 - 4*2*(-5) = 9 + 40 = 49.",
  },
  {
    role: "user",
    text: "Dziękuję, teraz rozumiem. Teraz obliczę x1 i x2.",
  },
  {
    role: "assistant",
    text: "Dobrze. Jeśli potrzebujesz pomocy, napisz. Będę tutaj.",
  },
];
