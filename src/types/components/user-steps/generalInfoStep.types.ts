type CityType = { label: string }
type CountryType = { label: string; cities: CityType[] }

interface GeneralInfoForm {
  firstName: string
  lastName: string
  country: CountryType | null
  city: CityType | null
  professionalSummary: string
}

interface GeneralInfoFinal {
  firstName: GeneralInfoForm['firstName']
  lastName: GeneralInfoForm['lastName']
  country: string | null
  city: string | null
  professionalSummary: string | null
}

export type { CityType, CountryType, GeneralInfoForm, GeneralInfoFinal }
