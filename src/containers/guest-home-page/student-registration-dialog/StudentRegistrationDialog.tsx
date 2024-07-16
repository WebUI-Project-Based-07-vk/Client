import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import StudentRegistrationForm from '../student-registration-form/StudentRegistrationForm'
import useForm from '~/hooks/use-form'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import {
  email,
  password,
  firstName,
  lastName,
  confirmPassword
} from '~/utils/validations/login'
import signUpSvg from '~/assets/img/signup-dialog/student.svg'
import { signup, snackbarVariants } from '~/constants'
import styles from '~/containers/guest-home-page/student-registration-dialog/studentRegistrationDialog.styles'
import { useCallback, useEffect, useState } from 'react'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

export interface formData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const StudentRegistrationDialog = () => {
  const { t } = useTranslation()
  const { closeModal, setCloseCallback } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [showConfirm, setShowConfirm] = useState(false)
  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await Promise.resolve() //TODO Change for signup handle
          closeModal()
        } catch (e) {
          setAlert({
            severity: snackbarVariants.error,
            message: `errors.${(e as { data: { code: number } }).data.code}`
          })
        }
      },
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validations: { email, firstName, lastName, password, confirmPassword }
    }
  )

  const onCloseAction = useCallback(() => {
    Object.values(data).some((value) => Boolean(value))
      ? setShowConfirm(true)
      : closeModal()
  }, [data, closeModal])

  useEffect(
    () => setCloseCallback(() => onCloseAction),
    [setCloseCallback, onCloseAction]
  )

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={styles.imgContainer}>
          <Box
            alt='registration'
            component='img'
            src={signUpSvg}
            sx={styles.img}
          />
        </Box>

        <Box sx={styles.formContainer}>
          <Typography sx={styles.title} variant='h2'>
            {t('signup.head.student')}
          </Typography>
          <Box sx={styles.form}>
            <StudentRegistrationForm
              data={data}
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
            <GoogleLogin
              buttonWidth={styles.form.maxWidth}
              role={undefined}
              type={signup}
            />
          </Box>
        </Box>
      </Box>
      <ConfirmDialog
        message='questions.discardChanges'
        onConfirm={() => closeModal()}
        onDismiss={() => setShowConfirm(false)}
        open={showConfirm}
        title='titles.confirmTitle'
      />
    </>
  )
}

export default StudentRegistrationDialog
