import { useCallback, useState } from 'react'

import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'

import { useModalContext } from '~/context/modal-context'
import { useStepContext } from '~/context/step-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { snackbarVariants } from '~/constants'
import { stepDataCleanup } from '~/containers/tutor-home-page/constants'

const useSteps = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0)
  const { closeModal } = useModalContext()
  const { useStepForm, stepErrors } = useStepContext()
  const { data: stepData } = useStepForm
  const { setAlert } = useSnackBarContext()
  const { userId } = useAppSelector((state) => state.appMain)

  const updateUser = useCallback(
    (data) => userService.updateUser(userId, data),
    [userId]
  )

  const handleResponseError = (error) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'becomeTutor.successMessage'
    })
    closeModal()
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const hasErrors = Object.values(stepErrors).find((error) => error)

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const isLastStep = activeStep === steps.length - 1

  const handleSubmit = () => {
    const cleanData = stepDataCleanup(stepData)

    !hasErrors && fetchData(cleanData)
  }

  const stepOperation = {
    next,
    back,
    handleSubmit,
    setActiveStep
  }

  return { activeStep, hasErrors, isLastStep, stepOperation, loading }
}

export default useSteps
