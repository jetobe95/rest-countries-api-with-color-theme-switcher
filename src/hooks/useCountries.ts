import { useEffect, useState } from "react";
import Country from "../models/country";

export default function useCountries() {
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
