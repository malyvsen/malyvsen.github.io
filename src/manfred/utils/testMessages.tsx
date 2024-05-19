import { Message } from "./chat";

export const testMessages: Message[] = [
  {
    role: "user",
    polishText: "Cześć, jak się masz?",
    englishText: "Hello, how are you?",
  },
  {
    role: "assistant",
    polishText: "Dzień dobry, dziękuję, jestem dobrze. A ty?",
    englishText: "Good day, thank you, I'm fine. And you?",
  },
  {
    role: "user",
    polishText: "Dziękuję, jestem dobrze. Możesz mi pomóc z moim zadaniem?",
    englishText: "Thank you, I'm fine. Can you help me with my homework?",
  },
  {
    role: "assistant",
    polishText: "Oczywiście, w jakim zakresie potrzebujesz pomocy?",
    englishText: "Of course, in what area do you need help?",
  },
  {
    role: "user",
    polishText:
      "Potrzebuję pomocy z matematyką. Nie mogę rozwiązać tego równania.",
    englishText: "I need help with math. I can't solve this equation.",
  },
  {
    role: "assistant",
    polishText: "Nie martw się, pomogę ci. Jak wygląda twoje równanie?",
    englishText:
      "Don't worry, I'll help you. What does your equation look like?",
  },
  {
    role: "user",
    polishText: "Mam równanie kwadratowe 2x^2 + 3x - 5 = 0",
    englishText: "I have the quadratic equation 2x^2 + 3x - 5 = 0",
  },
  {
    role: "assistant",
    polishText:
      "Rozumiem. Możesz użyć wzoru kwadratowego, aby rozwiązać to równanie. Ax^2 + Bx + C = 0, gdzie A = 2, B = 3, C = -5. Spróbuj obliczyć delta i x1, x2.",
    englishText:
      "I see. You can use the quadratic formula to solve this equation. Ax^2 + Bx + C = 0, where A = 2, B = 3, C = -5. Try calculating delta and x1, x2.",
  },
  {
    role: "user",
    polishText: "OK, dziękuję. Spróbuję obliczyć.",
    englishText: "OK, thank you. I will try to calculate.",
  },
  {
    role: "assistant",
    polishText: "Dobrze, jeśli potrzebujesz pomocy, napisz. Będę tutaj.",
    englishText: "Alright, if you need help, let me know. I'll be here.",
  },
  {
    role: "user",
    polishText: "Mam problem z obliczeniem delty. Możesz mi pomóc?",
    englishText: "I'm having trouble calculating delta. Can you help me?",
  },
  {
    role: "assistant",
    polishText:
      "Oczywiście. Delta to B^2 - 4AC. W twoim przypadku B to 3, A to 2, a C to -5. Podstawmy te wartości do wzoru.",
    englishText:
      "Of course. Delta is B^2 - 4AC. In your case, B is 3, A is 2, and C is -5. Let's substitute these values into the formula.",
  },
  {
    role: "assistant",
    polishText: "Delta = (3)^2 - 4*2*(-5) = 9 + 40 = 49.",
    englishText: "Delta = (3)^2 - 4*2*(-5) = 9 + 40 = 49.",
  },
  {
    role: "user",
    polishText: "Dziękuję, teraz rozumiem. Teraz obliczę x1 i x2.",
    englishText: "Thank you, now I understand. Now I'll calculate x1 and x2.",
  },
  {
    role: "assistant",
    polishText: "Dobrze. Jeśli potrzebujesz pomocy, napisz. Będę tutaj.",
    englishText: "Alright. If you need help, let me know. I'll be here.",
  },
];
