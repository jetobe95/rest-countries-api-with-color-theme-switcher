import CountryItem from "../components/CountryItem";
import useCountries from "../hooks/useCountries";

export default function Main() {
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
