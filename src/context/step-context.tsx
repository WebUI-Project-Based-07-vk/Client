import { createContext, ReactNode, useContext } from 'react'
import { StepDataType } from '~/types/components/step-context/step-context.types'
import useForm, { UseFormOutput } from '~/hooks/use-form'
import {
  stepDataInitialValues,
  stepDataValidations
} from '~/containers/tutor-home-page/constants'

type CtxType = UseFormOutput<StepDataType>

const StepContext = createContext<CtxType>({} as CtxType)

const StepProvider = ({ children }: { children: ReactNode }) => {
  const useStepForm = useForm<StepDataType>({
    initialValues: stepDataInitialValues,
    validations: stepDataValidations
  })

  return (
    <StepContext.Provider value={useStepForm}>{children}</StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
