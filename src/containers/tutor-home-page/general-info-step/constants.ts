import { emptyField, nameField, textField } from '~/utils/validations/common'
import { GeneralInfoForm } from '~/types'

export const initialValues: GeneralInfoForm = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: ''
}

export const textAreaMaxLength = 200

export const validations = {
  firstName: (value: GeneralInfoForm['firstName']) => nameField(value),
  lastName: (value: GeneralInfoForm['lastName']) => nameField(value),
  country: (value: GeneralInfoForm['country']) =>
    emptyField<GeneralInfoForm['country']>(value),
  city: (value: GeneralInfoForm['city']) =>
    emptyField<GeneralInfoForm['city']>(value),
  professionalSummary: (value: GeneralInfoForm['professionalSummary']) =>
    textField(0, textAreaMaxLength)(value)
}

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
