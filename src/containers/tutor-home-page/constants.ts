import {
  StepDataType,
  StepDataTypeClean
} from '~/types/components/step-context/step-context.types'
import { firstName, lastName } from '~/utils/validations/login'
import { emptyField, textField } from '~/utils/validations/common'
import { textAreaMaxLength } from '~/containers/tutor-home-page/general-info-step/constants'

export const stepDataInitialValues: StepDataType = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: '',
  subjects: [],
  language: null,
  photo: {
    file: [],
    image: null
  }
}

export const stepDataValidations = {
  firstName: (value: StepDataType['firstName']) => firstName(value),
  lastName: (value: StepDataType['lastName']) => lastName(value),
  country: (value: StepDataType['country'] | string) =>
    emptyField<StepDataType['country']>(value as StepDataType['country']),
  city: (value: StepDataType['city'] | string) =>
    emptyField<StepDataType['city']>(value as StepDataType['city']),
  professionalSummary: (value: StepDataType['professionalSummary']) =>
    textField(0, textAreaMaxLength)(value)
}

export const stepDataCleanup = (data: StepDataType): StepDataTypeClean => ({
  ...data,
  country: data.country?.label || null,
  city: data.city?.label || null,
  professionalSummary:
    data.professionalSummary.trim().length === 0
      ? null
      : data.professionalSummary,
  photo: data.photo.image
})
