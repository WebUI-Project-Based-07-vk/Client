import { createContext, FC, ReactNode, useContext, useState } from 'react'
import {
  StepDataType,
  StepErrors
} from '~/types/components/step-context/step-context.types'
import useForm, { UseFormOutput } from '~/hooks/use-form'
import { stepDataValidations } from '~/containers/tutor-home-page/constants'

interface CtxType {
  useStepForm: UseFormOutput<StepDataType>
  stepErrors: StepErrors
  stepErrorsToggle: (key: keyof StepErrors, value: boolean) => void
}

const StepContext = createContext<CtxType>({} as CtxType)

interface StepContextProps {
  stepsInitialValues: StepDataType
  children: ReactNode
}

const StepProvider: FC<StepContextProps> = ({
  children,
  stepsInitialValues
}) => {
  const useStepForm = useForm<StepDataType>({
    initialValues: stepsInitialValues,
    validations: stepDataValidations
  })

  const [stepErrors, setStepErrors] = useState<StepErrors>({
    generalInfo: false,
    subjects: false,
    language: false,
    photo: false
  })
  const stepErrorsToggle = (key: keyof StepErrors, value: boolean) => {
    setStepErrors((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <StepContext.Provider value={{ stepErrors, useStepForm, stepErrorsToggle }}>
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
