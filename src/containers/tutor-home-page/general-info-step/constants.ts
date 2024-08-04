import { emptyField, textField } from '~/utils/validations/common'
import { GeneralInfoFinal, GeneralInfoForm } from '~/types'
import { firstName, lastName } from '~/utils/validations/login'

export const initialValues: GeneralInfoForm = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: ''
}

export const textAreaMaxLength = 200

export const validations = {
  firstName: (value: GeneralInfoForm['firstName']) => firstName(value),
  lastName: (value: GeneralInfoForm['lastName']) => lastName(value),
  country: (value: GeneralInfoForm['country'] | string) =>
    emptyField<GeneralInfoForm['country']>(value as GeneralInfoForm['country']),
  city: (value: GeneralInfoForm['city'] | string) =>
    emptyField<GeneralInfoForm['city']>(value as GeneralInfoForm['city']),
  professionalSummary: (value: GeneralInfoForm['professionalSummary']) =>
    textField(0, textAreaMaxLength)(value)
}

// ! should be used when sending data to backend
export const GeneralInfoFormDataTransfer = (
  data: GeneralInfoForm
): GeneralInfoFinal => ({
  ...data,
  country: data.country?.label || null,
  city: data.city?.label || null,
  professionalSummary:
    data.professionalSummary.trim().length === 0
      ? null
      : data.professionalSummary
})

export const countriesMock = [
  {
    label: 'China',
    cities: [
      { label: 'City 1' },
      { label: 'City 2' },
      { label: 'City 3' },
      { label: 'City 4' },
      { label: 'City 5' },
      { label: 'City 6' },
      { label: 'City 7' },
      { label: 'City 8' }
    ]
  },
  {
    label: 'USA',
    cities: [
      { label: 'City 21' },
      { label: 'City 22' },
      { label: 'City 23' },
      { label: 'City 24' },
      { label: 'City 25' },
      { label: 'City 26' },
      { label: 'City 27' },
      { label: 'City 28' }
    ]
  },
  {
    label: 'Poland',
    cities: [
      { label: 'City 31' },
      { label: 'City 32' },
      { label: 'City 33' },
      { label: 'City 34' },
      { label: 'City 35' },
      { label: 'City 36' },
      { label: 'City 37' },
      { label: 'City 38' }
    ]
  },
  {
    label: 'Ukraine',
    cities: [
      { label: 'City 41' },
      { label: 'City 42' },
      { label: 'City 43' },
      { label: 'City 44' },
      { label: 'City 45' },
      { label: 'City 46' },
      { label: 'City 47' },
      { label: 'City 48' }
    ]
  }
]
