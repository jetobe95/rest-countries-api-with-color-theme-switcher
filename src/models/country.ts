export default class Country {
  constructor(
    public name: string,
    public flag: string,
    public capital: string,
    public population: number,
    public region: string
  ) {}

  get presentablePopulation() {
    return Intl.NumberFormat().format(this.population);
  }
  static fromJson(json: any): Country {
    const { name, capital, flags, population, region } = json;
    const hasCapital = Array.isArray(capital);
    return new Country(
      name.common,
      flags.svg,
      hasCapital ? capital[0] : "",
      population,
      region
    );
  }
}
