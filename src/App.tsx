import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import "./App.css";
import Header from "./components/Header";
enum Theme {
  dark = "theme-dark",
  light = "theme-light",
}
const Context = createContext<{
  toggleTheme: () => void;
  theme: Theme;
}>({
  toggleTheme: () => {},
  theme: Theme.light,
});
export function ThemeProvider(props: PropsWithChildren) {
  const [theme, setTheme] = useState(Theme.light);
  useEffect(() => {
    setTheme(localStorage.getItem("theme") as Theme);
    document.documentElement.className = localStorage.getItem("theme") as Theme;
  }, []);
  return (
    <Context.Provider
      value={{
        toggleTheme: () => {
          const newTheme = theme == Theme.light ? Theme.dark : Theme.light;
          localStorage.setItem("theme", newTheme);
          document.documentElement.className = newTheme;
          setTheme(newTheme);
        },
        theme,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
export function useTheme() {
  return useContext(Context);
}
// https://restcountries.com/v3.1/all?fields=name,flags,capital

class Country {
  constructor(
    public name: string,
    public flag: string,
    public capital: string,
    public population: number,
    public region: string
  ) {}
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
function App() {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  async function getCountries() {
    try {
      const response = await globalThis.fetch(
        "https://restcountries.com/v3.1/all?filters=name,flags,capital,population,region"
      );
      const json = await response.json();
      setCountriesList(json.map(Country.fromJson));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <main className="main">
      <Header />
      <section className="content">
        <div className="countrysearch">
          <div className="countrysearch__icon" />
          <input
            className="countrysearch__input"
            type="text"
            aria-label="search country"
            placeholder="Search for a country…"
          />
        </div>

        <div className="dropdown">
          <span className="dropdown__title">Filter by Region</span>
          <i className="dropdown__icon" />
          <div className="dropdown__options">
            <p className="dropdown__option_item">Africa</p>
            <p className="dropdown__option_item">America</p>
            <p className="dropdown__option_item">Asia</p>
            <p className="dropdown__option_item">Europe</p>
            <p className="dropdown__option_item">Oceania</p>
          </div>
        </div>

        <section className="countries_list">
          {countriesList.map((country) => (
            <CountryItem country={country} key={country.name} />
          ))}
        </section>
      </section>
    </main>
  );
}

function CountryItem({ country }: PropsWithChildren<{ country: Country }>) {
  return (
    <article className="country__item">
      <img
        className="country__item__flag"
        src={country.flag}
        alt={`${country.name} flag`}
        height={160}
      />
      <div className="country__info">
        <h2 className="country__info__title">{country.name}</h2>
        <p className="country__info__item">
          <strong>Population: </strong>{" "}
          {Intl.NumberFormat().format(country.population)}
        </p>
        <p className="country__info__item">
          <strong>Region: </strong>
          {country.region}
        </p>
        <p className="country__info__item">
          <strong>Capital: </strong>
          {country.capital}
        </p>
      </div>
    </article>
  );
}

export default App;
