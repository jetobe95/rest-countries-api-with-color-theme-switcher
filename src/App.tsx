import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import CountryItem from "./components/CountryItem";
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

export class Country {
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

function useCountries() {
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
  return {
    countriesList,
  };
}
// https://restcountries.com/v3.1/region/{region}
// https://restcountries.com/v3.1/name/{name}

function App() {
  return (
    <main className="main">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="detail/:country" element={<Detail />} />
      </Routes>
    </main>
  );
}

export default App;

function Main() {
  const { countriesList } = useCountries();

  return (
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
  );
}

function Detail() {
  return (
    <main className="detail">
      <Link to="/" className="detail__back__btn">
        <i className="detail__back__btn__icon"></i>Back
      </Link>
      <h1 className="detail__title">Belgium</h1>
      <TitleValue title="Native Name" value="België" />
      <TitleValue title="Population" value="11,319,511" />
      <TitleValue title="Region" value="Europe" />
      <TitleValue title="Sub Region" value="Western Europe" />
      <TitleValue title="Capital" value="Brussels" />
      <br />
      <TitleValue title="Top Level Domain" value=".be" />
      <TitleValue title="Currencies" value="Euro" />
      <TitleValue title="Languages" value="Dutch, French, German" />
      <br />
      <h2 className="detail__bordercountries">Border Countries:</h2>

      <button className="detail__bordercountries__btn">France</button>
      <button className="detail__bordercountries__btn">France</button>
      <button className="detail__bordercountries__btn">France</button>
    </main>
  );
}

function TitleValue({
  title,
  value,
}: PropsWithChildren<{ title: string; value: string }>) {
  return (
    <p className="title__value">
      <strong>{title}:</strong> {value}
    </p>
  );
}
