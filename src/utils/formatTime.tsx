export function formatTime(time: Date) {
  const paddedHours = String(time.getHours()).padStart(2, "0");
  const paddedMinutes = String(time.getMinutes()).padStart(2, "0");
  return `${paddedHours}:${paddedMinutes}`;
}

export function formatDate(date: Date) {
  const lowercaseDayName = dayNames[date.getDay()].toLowerCase();
  const dayName =
    lowercaseDayName.charAt(0).toUpperCase() + lowercaseDayName.slice(1);
  const monthName = monthNamesGenitive[date.getMonth()];
  return `${dayName},  ${date.getDate()} ${monthName}`;
}

const dayNames = [
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
];

const monthNamesGenitive = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];
