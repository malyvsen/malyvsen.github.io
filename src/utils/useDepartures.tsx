import { useQuery } from "@tanstack/react-query";

export default function useDepartures({
  stop,
  direction,
}: {
  stop: string;
  direction: string;
}) {
  return useQuery({
    queryKey: ["departures", stop, direction],
    queryFn: async () => {
      const departures = await fetchDepartures({ stop, direction });
      return departures;
    },
  });
}

async function fetchDepartures({
  stop,
  direction,
}: {
  stop: string;
  direction: string;
}): Promise<Departure[]> {
  const response = await fetch(
    "http://91.223.13.70/internetservice/services/passageInfo/stopPassages/stop",
    {
      method: "POST",
      body: new URLSearchParams({
        language: "en",
        stop: stop,
        direction: direction,
        mode: "departure",
        startTime: new Date().getTime().toString(),
        timeFrame: "90",
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const passageResponses = data.actual as PassageResponse[];
  return passageResponses.map(passageResponseToDeparture);
}

function passageResponseToDeparture(passage: PassageResponse): Departure {
  return {
    line: passage.patternText,
    direction: passage.direction,
    scheduledTime: timeStringToDate(passage.plannedTime),
    actualTime: timeStringToDate(passage.actualTime),
  };
}

function timeStringToDate(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const now = new Date();
  const date = new Date(now);
  date.setHours(hours, minutes, 0, 0);
  if (date.getTime() < now.getTime() - 12 * 60 * 60 * 1000) {
    // date is 12h+ in the past - probably because it's around midnight
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  }
  return date;
}

export interface Departure {
  line: string;
  direction: string;
  scheduledTime: Date;
  actualTime: Date;
}

interface PassageResponse {
  actualRelativeTime: number;
  actualTime: string;
  direction: string;
  mixedTime: string;
  passageid: string;
  patternText: string;
  plannedTime: string;
  routeId: string;
  status: string;
  tripId: string;
  vehicleId: string;
}
