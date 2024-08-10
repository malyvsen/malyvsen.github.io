export default class WeatherCode {
  constructor(public numericCode: number) {}

  get name(): string {
    return weatherCodeNames[this.numericCode];
  }

  /**
   * Codes in the same group represent a similar category of weather conditions,
   * e.g. codes 50-59 all have group 50 and represent kinds of light rain.
   */
  get group(): number {
    return this.numericCode - (this.numericCode % 10);
  }

  static aggregate(codes: Array<WeatherCode>): WeatherCode {
    if (codes.length === 0) {
      throw new Error("weathers must not be empty");
    }

    const numericCodes = codes.map((code) => code.numericCode);
    const maxCode = Math.max(...numericCodes);

    if (60 <= maxCode && maxCode <= 65) {
      // it's raining and we want to pick the worst rain code
      return new WeatherCode(maxCode);
    }
    if (80 <= maxCode) {
      // it's storming and we want to pick the worst storm code
      return new WeatherCode(maxCode);
    }

    const maxDecimal = maxCode - (maxCode % 10);

    // pick all codes with the same first digit, i.e. in the worst range
    const codesInWorstRange = numericCodes.filter(
      (code) => code - (code % 10) === maxDecimal
    );
    const codesAboveFreezing = codesInWorstRange.filter(
      (code) => code <= maxDecimal + 5
    );
    const codesBelowFreezing = codesInWorstRange.filter(
      (code) => code > maxDecimal + 5
    );

    const mostPopularGroup =
      codesAboveFreezing.length > codesBelowFreezing.length
        ? codesAboveFreezing
        : codesBelowFreezing;

    const meanCode =
      mostPopularGroup.reduce((sum, code) => sum + code, 0) /
      mostPopularGroup.length;
    return WeatherCode.nearest(meanCode);
  }

  static nearest(numericCode: number): WeatherCode {
    const nearestExistingCode = Object.keys(weatherCodeNames)
      .map(Number)
      .reduce((nearest, candidate) =>
        Math.abs(candidate - numericCode) < Math.abs(nearest - numericCode)
          ? candidate
          : nearest
      );
    return new WeatherCode(nearestExistingCode);
  }
}

const weatherCodeNames: Record<number, string> = {
  0: "pogodnie",
  1: "parę chmur",
  2: "chmurzaście",
  3: "pochmurnie",
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
