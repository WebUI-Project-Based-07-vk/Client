type GeneralInfoType = []
type SubjectsType = string[]
type LanguageType = []

type PhotoType = {
  fileName: string
  image: string
}

type StepDataType = {
  generalInfo: GeneralInfoType
  subjects: SubjectsType
  language: LanguageType
  photo: PhotoType
}

type AllTypes = GeneralInfoType | PhotoType | SubjectsType

export type useStepContextType = () => {
  handleStepData: (label: string, data: AllTypes) => void
  stepData: StepDataType
}
