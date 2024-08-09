import { useEffect, useState } from 'react'
import { stepDataInitialValues } from '~/containers/tutor-home-page/constants'
import { userService } from '~/services/user-service'
import { UserRoleEnum } from '~/types'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'

export const useStepsInitialValues = () => {
  const [initialValues, setInitialValues] = useState(stepDataInitialValues)
  const [isPending, setIsPending] = useState(true)
  const { setAlert } = useSnackBarContext()
  const { userId } = useAppSelector((state) => state.appMain)
  const { t } = useTranslation()

  useEffect(() => {
    userService
      .getUserById(userId, UserRoleEnum.Tutor)
      .then((user) => {
        const { firstName, lastName } = user.data
        setInitialValues((prevState) => ({
          ...prevState,
          firstName,
          lastName
        }))
      })
      .catch(() => {
        setAlert({
          severity: 'error',
          message: t('errorMessages.firstLastNamesNotRetrieved')
        })
      })
      .finally(() => {
        setIsPending(false)
      })
  }, [setAlert, t, userId])

  return { initialValues, isPending }
}

export default useStepsInitialValues
