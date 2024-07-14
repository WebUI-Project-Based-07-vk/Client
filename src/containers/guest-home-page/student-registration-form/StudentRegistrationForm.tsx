import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import { useSelector } from 'react-redux'
import { FC } from 'react'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { useModalContext } from '~/context/modal-context'
import ForgotPassword from '~/containers/guest-home-page/forgot-password/ForgotPassword'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/containers/guest-home-page/student-registration-form/StudentRegistrationForm.styles'
import { RootState } from '~/redux/store'
import { formData } from '../student-registration-dialog/StudentRegistrationDialog'

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    large: true
  }
}

interface StudentRegistrationFormProps {
  handleSubmit: (event: React.FormEvent<HTMLDivElement>) => void
  handleChange: (
    key: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword'
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (
    key: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword'
  ) => (event: React.FocusEvent<HTMLInputElement>) => void
  data: formData
  errors: formData
}

const StudentRegistrationForm: FC<StudentRegistrationFormProps> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  const { authLoading } = useSelector((state: RootState) => state.appMain)

  const { openModal } = useModalContext()

  const { t } = useTranslation()

  const openForgotPassword = () => {
    openModal({ component: <ForgotPassword /> })
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.nameFields}>
        <AppTextField
          autoFocus
          data-testid={'firstName'}
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          size={'large'}
          sx={{ mb: '5px' }}
          type='text'
          value={data.firstName}
        />
        <AppTextField
          autoFocus
          data-testid={'lastName'}
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          size={'large'}
          sx={{ mb: '5px' }}
          type='text'
          value={data.lastName}
        />
      </Box>

      <AppTextField
        autoFocus
        data-testid={'email'}
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='large'
        sx={{ mb: '5px' }}
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <Typography
        component={ButtonBase}
        onClick={openForgotPassword}
        sx={styles.forgotPass}
        variant='subtitle2'
      >
        {t('login.forgotPassword')}
      </Typography>

      <AppButton
        disabled={!Object.values(errors).every((value) => !value)}
        loading={authLoading}
        sx={styles.loginButton}
        type='submit'
      >
        {t('common.labels.login')}
      </AppButton>
    </Box>
  )
}

export default StudentRegistrationForm
