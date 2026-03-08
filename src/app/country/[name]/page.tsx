import Link from "next/link";
import styles from "./CountryPage.module.css";

type CountryDetail = {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    alt?: string;
  };
  capital?: string[];
  region: string;
  population: number;
  languages?: Record<string, string>;
};

interface Props {
  params: Promise<{
    name: string;
  }>;
}

export default async function CountryPage({ params }: Props) {
  const { name } = await params;

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${name}`
  );

  if (!res.ok) {
    return <h2 className={styles.error}>País no encontrado</h2>;
  }

  const data: CountryDetail[] = await res.json();
  const country = data[0];

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.back}>
        ← Volver
      </Link>

      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={country.flags.png}
            alt={country.flags.alt || country.name.common}
          />
        </div>

        <div className={styles.info}>
          <h1>{country.name.official}</h1>

          <p><strong>Capital:</strong> {country.capital?.[0] ?? "N/A"}</p>
          <p><strong>Región:</strong> {country.region}</p>
          <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
          <p>
            <strong>Idiomas:</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}