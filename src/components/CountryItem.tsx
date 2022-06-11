import { PropsWithChildren } from "react";
import { Country } from "../App";
import { Link } from "react-router-dom";

export default function CountryItem({
  country,
}: PropsWithChildren<{ country: Country }>) {
  return (
    <Link replace={false} to={"detail/123"} className="country__item">
      <img
        loading="lazy"
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
    </Link>
  );
}
