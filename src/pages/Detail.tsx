import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TitleValue from "../components/TitleValue";
import Country from "../models/country";

function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>();

  async function makeRequest() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await globalThis.fetch(url);
      setData(await response.json());
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    makeRequest();
  }, []);

  return {
    data,
    hasData: data != null,
    error,
    isLoading,
    makeRequest,
    hasError: error != null,
  };
}

class CountryDetail {
  public nativeName: string;
  public subregion: string;
  public topLevelDomain?: string;
  public currencies: string[];
  public languages: string[];
  public borders?: string[];

  constructor(
    public countryBase: Country,
    {
      nativeName,
      subregion,
      topLevelDomain,
      currencies,
      languages,
      borders,
    }: any
  ) {
    this.nativeName = nativeName;
    this.nativeName = nativeName;
    this.subregion = subregion;
    this.topLevelDomain = topLevelDomain;
    this.currencies = currencies;
    this.languages = languages;
    this.borders = borders;
  }
  static fromJson(json: any): CountryDetail {
    const { translations, subregion, tld, currencies, languages, borders } =
      json;
    return new CountryDetail(Country.fromJson(json), {
      nativeName: translations.nld.common,
      subregion,
      topLevelDomain: Array.isArray(tld) ? tld[0] : null,
      currencies: Object.values(currencies).map(({ name }: any) => name),
      languages: Object.values(languages),
      borders,
    });
  }
}

export default function Detail() {
  const { countryName } = useParams();

  const { data, hasError, error, hasData, isLoading } = useFetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );

  if (isLoading) {
    return <h2>Loading Country....</h2>;
  }

  if (hasError) {
    return <p>{error}</p>;
  }
  if (!hasData) return <h1></h1>;

  const countryDetail = CountryDetail.fromJson(data[0]);

  return (
    <main className="detail">
      <Link to="/" className="detail__back__btn">
        <i className="detail__back__btn__icon"></i>Back
      </Link>
      <div className="detail__content">
        <img
          src={countryDetail.countryBase.flag}
          alt="flag_image"
          className="detail__flag"
        />
        <div className="country__info">
          <h1 className="detail__title">{countryName}</h1>
          <section>
            <TitleValue title="Native Name" value={countryDetail.nativeName} />
            <TitleValue
              title="Population"
              value={countryDetail.countryBase.presentablePopulation}
            />
            <TitleValue
              title="Region"
              value={countryDetail.countryBase.region}
            />
            <TitleValue title="Sub Region" value={countryDetail.subregion} />
            <TitleValue
              title="Capital"
              value={countryDetail.countryBase.capital}
            />
          </section>
          {/* <div className="detail__vspace-32" /> */}
          <section>
            <TitleValue
              title="Top Level Domain"
              value={countryDetail.topLevelDomain ?? "-"}
            />
            <TitleValue
              title="Currencies"
              value={countryDetail.currencies.join(", ")}
            />
            <TitleValue
              title="Languages"
              value={countryDetail.languages.join(", ")}
            />
          </section>
          {/* <div className="detail__vspace-34" /> */}
          <section className="bordercountries__container">
            <h2 className="detail__bordercountries">Border Countries:</h2>
            <footer className="actions">
              {countryDetail.borders?.map((borderName) => (
                <button
                  key={borderName}
                  className="detail__bordercountries__btn"
                >
                  {borderName}
                </button>
              ))}
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}
