type stepDataType = {
  generalInfo: []
  subjects: []
  language: []
  photo: string
}

export type useStepContextType = () => {
  handleStepData: (label: string, data: string) => void
  stepData: stepDataType
}
