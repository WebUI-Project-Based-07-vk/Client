import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import StudentRegistrationForm from '../registration-form/RegistrationForm'
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
import styles from '~/containers/guest-home-page/registration-dialog/RegistrationDialog.styles'
import { useCallback, useContext, useEffect } from 'react'
import { ConfirmationDialogContext } from '~/context/confirm-context'
import { UserRoleEnum } from '~/types'
import { useSignUpMutation } from '~/services/auth-service'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import infoSvg from '~/assets/img/guest-home-page/info.svg'

export interface formData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const RegistrationDialog = ({ role }: { role: UserRoleEnum }) => {
  const { t } = useTranslation()
  const { openModal, closeModal, setCloseCallback } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const { openDialog } = useContext(ConfirmationDialogContext)
  const [signupUser] = useSignUpMutation()
  const { handleSubmit, handleInputChange, handleBlur, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await signupUser({
            ...data,
            role: role
          })
          closeModal()
          openModal({
            component: (
              <ImgTitleDescription
                description={
                  t('signup.confirmEmailMessage') +
                  data.email +
                  t('signup.confirmEmailDesc')
                }
                img={infoSvg}
                title={t('signup.confirmEmailTitle')}
              />
            )
          })
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
      ? openDialog({
          sendConfirm: (state: boolean) => {
            state ? closeModal() : {}
            return state
          },
          message: 'questions.discardChanges',
          title: 'titles.confirmTitle'
        })
      : closeModal()
  }, [data, closeModal, openDialog])

  useEffect(
    () => setCloseCallback(() => onCloseAction),
    [setCloseCallback, onCloseAction]
  )

  return (
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
          {t(`signup.head.${role}`)}
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
  )
}

export default RegistrationDialog
