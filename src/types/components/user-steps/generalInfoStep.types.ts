type CityType = { label: string }
type CountryType = { label: string; cities: CityType[] }

interface GeneralInfoForm {
  firstName: string
  lastName: string
  country: CountryType | null
  city: CityType | null
  professionalSummary: string
}

export type { CityType, CountryType, GeneralInfoForm }
