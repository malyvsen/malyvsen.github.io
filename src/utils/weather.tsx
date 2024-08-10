import WeatherCode from "./weatherCode";

export default class Weather {
  constructor(
    public apparentTemperature: number,
    public precipitationProbability: number,
    public rain: number,
    public showers: number,
    public snowfall: number,
    public code: WeatherCode,
    public cloudCover: number
  ) {}
}

export class HourlyWeather extends Weather {
  constructor(
    public endHour: Date,
    ...superArgs: ConstructorParameters<typeof Weather>
  ) {
    super(...superArgs);
  }

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
}
