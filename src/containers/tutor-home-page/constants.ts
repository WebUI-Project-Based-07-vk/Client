import {
  StepDataType,
  StepDataTypeClean
} from '~/types/components/step-context/step-context.types'
import { firstName, lastName } from '~/utils/validations/login'
import { textField } from '~/utils/validations/common'
import { textAreaMaxLength } from '~/containers/tutor-home-page/general-info-step/constants'
import { isSubjectDuplicate } from '~/containers/tutor-home-page/subjects-step/constants'

export const stepDataInitialValues: StepDataType = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: '',
  category: null,
  subject: null,
  chips: [],
  language: null,
  photo: {
    fileName: null,
    image: null
  }
}

export const stepDataValidations = {
  firstName: (value: StepDataType['firstName']) => firstName(value),
  lastName: (value: StepDataType['lastName']) => lastName(value),
  professionalSummary: (value: StepDataType['professionalSummary']) =>
    textField(0, textAreaMaxLength)(value)
}

export const stepDataCleanup = (data: StepDataType): StepDataTypeClean => ({
  firstName: data.firstName,
  lastName: data.lastName,
  nativeLanguage: data.language ?? '',
  mainSubjects: (() => {
    const subjects: string[] = []
    subjects.push(...data.chips.map((elem) => elem._id))
    data.subject && !isSubjectDuplicate(data) && subjects.push(data.subject._id)
    return subjects
  })(),
  address: {
    country: data.country?.label ?? '',
    city: data.city?.label ?? ''
  },
  professionalSummary:
    data.professionalSummary.trim().length === 0
      ? ''
      : data.professionalSummary,
  photo: data.photo.image ?? ''
})
