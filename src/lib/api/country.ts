import { Country } from "@/types";
import { api } from "./axios";

export const getAllCountries = async (): Promise<Country[]> => {
  const response = await api.get<Country[]>(
    "all?fields=name,flags,cca3,capital,region,population,languages"
  );

  return response.data;
};

export const getCountryByName = async (
  name: string
): Promise<Country | null> => {
  try {
    const response = await api.get<Country[]>(
      `name/${encodeURIComponent(name)}`
    );

    return response.data[0] ?? null;
  } catch {
    return null;
  }
};

export const getCountryByCode = async (
  code: string
): Promise<Country | null> => {
  try {
    const response = await api.get<Country[]>(
      `alpha/${code}`
    );

    return response.data[0] ?? null;
  } catch {
    return null;
  }
};