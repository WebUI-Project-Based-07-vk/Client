import { CityType, CountryType } from '~/types'
import { SubjectType } from '~/types/components/user-steps/subjectsStep.types'

export interface StepErrors {
  generalInfo: boolean
  subjects: boolean
  language: boolean
  photo: boolean
}

export interface StepDataType {
  firstName: string
  lastName: string
  country: CountryType | null
  city: CityType | null
  professionalSummary: string
  category: SubjectType | null
  subject: SubjectType | null
  chips: SubjectType[]
  language: string | null
  photo: {
    fileName: string | null
    image: string | null
  }
}

export interface StepDataTypeClean {
  firstName: string
  lastName: string
  address: {
    country: string
    city: string
  }
  professionalSummary: string
  mainSubjects: string[]
  nativeLanguage: string
  photo: string
}
