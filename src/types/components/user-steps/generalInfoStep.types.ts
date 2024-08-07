type CityType = { label: string }
type CountryType = { label: string; cities: CityType[] }

export type { CityType, CountryType }
