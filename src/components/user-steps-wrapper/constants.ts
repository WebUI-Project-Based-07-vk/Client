import { nameField, textField } from '~/utils/validations/common'

export const validations = {
  firstName: nameField,
  lastName: nameField,
  professionalSummary: textField(0, 200)
}

export const tutorStepLabels = ['generalInfo', 'subjects', 'language', 'photo']
