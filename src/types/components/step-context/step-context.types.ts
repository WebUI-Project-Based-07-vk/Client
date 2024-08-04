import { GeneralInfoForm } from '~/types'

type stepDataType = {
  generalInfo: {
    data: GeneralInfoForm
    errors: { [key: string]: never }
  }
  subjects: []
  language: []
  photo: string
}

export type useStepContextType = () => {
  handleStepData: (label: string, data: string | GeneralInfoForm) => void
  stepData: stepDataType
}
