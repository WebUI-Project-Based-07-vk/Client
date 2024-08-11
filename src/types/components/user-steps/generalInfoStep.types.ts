type CityType = {
  label: string
  id: string
}
type CountryType = {
  label: string
  iso2: string
  id: string
  cities?: CityType[]
}

export type { CityType, CountryType }
