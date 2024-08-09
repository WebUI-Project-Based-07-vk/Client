import { createContext, FC, ReactNode, useContext } from 'react'
import { StepDataType } from '~/types/components/step-context/step-context.types'
import useForm, { UseFormOutput } from '~/hooks/use-form'
import { stepDataValidations } from '~/containers/tutor-home-page/constants'

type CtxType = UseFormOutput<StepDataType>

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

  return (
    <StepContext.Provider value={useStepForm}>{children}</StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
