export default class Weather {
  constructor(
    public apparentTemperature: number,
    public precipitationProbability: number,
    public rain: number,
    public showers: number,
    public snowfall: number,
    public weatherCode: number,
    public cloudCover: number
  ) {}

  get name(): string {
    return weatherCodeNames[this.weatherCode];
  }

  static worst(weathers: Weather[]): Weather {
    if (weathers.length === 0) {
      throw new Error("weathers must not be empty");
    }

    const worst = weathers.reduce(
      (worst, weather) =>
        weather.weatherCode > worst.weatherCode ? weather : worst,
      weathers[0]
    );
    return worst;
  }
}

export class HourlyWeather {
  constructor(public endHour: Date, public weather: Weather) {}

  get startHour() {
    return new Date(this.endHour.getTime() - 1000 * 60 * 60);
  }

  static inRange(
    hourlyWeathers: HourlyWeather[],
    startHour: Date,
    endHour: Date
  ) {
    return hourlyWeathers.filter(
      (hourlyWeather) =>
        startHour <= hourlyWeather.startHour && hourlyWeather.endHour <= endHour
    );
  }

  static worst(hourlyWeathers: HourlyWeather[]): HourlyWeather {
    if (hourlyWeathers.length === 0) {
      throw new Error("hourlyWeathers must not be empty");
    }

    const worst = hourlyWeathers.reduce(
      (worst, hourlyWeather) =>
        hourlyWeather.weather.weatherCode > worst.weather.weatherCode
          ? hourlyWeather
          : worst,
      hourlyWeathers[0]
    );
    return worst;
  }
}

const weatherCodeNames: Record<number, string> = {
  0: "pogodnie",
  1: "parę chmur",
  2: "sporo chmur",
  3: "szare niebo",
  45: "mgła",
  48: "szadź",
  51: "kapuśniaczek",
  53: "mżawka",
  55: "siąpawica",
  56: "mżawka",
  57: "plucha",
  61: "deszczyk",
  63: "deszcz",
  65: "ulewa",
  66: "deszcz ze śniegiem",
  67: "deszcz ze śniegiem",
  71: "prószy śnieg",
  73: "pada śnieg",
  75: "sypie śnieg",
  77: "ziarnisty śnieg",
  78: "ziarnisty śnieg",
  80: "przelotny deszczyk",
  81: "przelotny deszcz",
  82: "oberwanie chmury",
  85: "przelotny śnieg",
  86: "przelotny śnieg",
  95: "burza",
  96: "gradobicie",
  99: "ratuj się kto może",
};
