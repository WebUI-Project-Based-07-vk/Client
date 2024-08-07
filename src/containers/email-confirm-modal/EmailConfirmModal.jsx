import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styles } from '~/containers/email-confirm-modal/EmailConfirmModal.styles'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import imgReject from '~/assets/img/email-confirmation-modals/not-success-icon.svg'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import useAxios from '~/hooks/use-axios'
import { AuthService } from '~/services/auth-service'
import Loader from '~/components/loader/Loader'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

const EmailConfirmModal = ({ confirmToken, openModal }) => {
  const { t } = useTranslation()

  const serviceFunction = useCallback(
    () => AuthService.confirmEmail(confirmToken),
    [confirmToken]
  )

  const { response, error, loading } = useAxios({
    service: serviceFunction,
    defaultResponse: null
  })

  const openLoginDialog = () => {
    openModal({ component: <LoginDialog /> })
  }

  if (loading) {
    return <Loader size={100} />
  }

  let title, description, img

  if (
    (error && error.code === 'BAD_CONFIRM_TOKEN') ||
    (error && error.code === 'DOCUMENT_NOT_FOUND' && response === null)
  ) {
    img = imgReject
    title = t('modals.emailNotConfirm')
    description = t('modals.emailReject.badToken')
  } else if (error && error.code === 'EMAIL_ALREADY_CONFIRMED') {
    img = imgReject
    title = t('modals.emailAlreadyConfirm')
    description = t('modals.emailReject.alreadyConfirmed')
  } else if (response) {
    img = imgSuccess
    title = t('modals.emailConfirm')
    description = ''
  }
  return (
    <Box sx={styles.box}>
      <ImgTitleDescription description={description} img={img} title={title} />
      <Button onClick={openLoginDialog} sx={styles.button} variant='contained'>
        {t('button.goToLogin')}
      </Button>
    </Box>
  )
}
export default EmailConfirmModal
