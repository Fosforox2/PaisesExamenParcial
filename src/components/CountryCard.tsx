"use client";

import Link from "next/link";
import { CountryComprar } from "@/app/page";

export type Country = {
  cca3: string;
  name: {
    common: string;
  };
  flags: {
    png: string;
    alt?: string;
  };
};

type CountryCardProps = {
  country: Country;
  lista: CountryComprar[];
  setLista: React.Dispatch<React.SetStateAction<CountryComprar[]>>;
};

export default function CountryCard({
  country,
  lista,
  setLista,
}: CountryCardProps) {
  const slug = encodeURIComponent(country.name.common.toLowerCase());

  return (
    <div
      style={{
        background: "white",
        padding: "16px",
        borderRadius: "12px",
      }}
    >
      <Link
        href={`/country/${slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={country.flags.png}
          alt={country.flags.alt || country.name.common}
          style={{
            width: "100%",
            height: "120px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        <h3 style={{ marginTop: "12px" }}>
          {country.name.common}
        </h3>
      </Link>

      <button
        style={{ marginTop: "10px" }}
        onClick={(e) => {
          e.preventDefault();

          if (lista.find((x) => x.id === country.cca3)) return;

          setLista([
            ...lista,
            {
              name: country.name.common,
              id: country.cca3,
            },
          ]);
        }}
      >
        Buy
      </button>
    </div>
  );
}