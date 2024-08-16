import { StepDataType } from '~/types/components/step-context/step-context.types'

export const isSubjectDuplicate = (data: StepDataType) =>
  data.chips.find((elem) => elem?._id === data.subject?._id)
