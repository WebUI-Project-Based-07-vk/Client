import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import {
  Container,
  ImgContainer,
  Img,
  RightBox,
  Title,
  AutocompleteStyled,
  MobileImgContainer
} from '~/components/shared'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import { useTranslation } from 'react-i18next'
import { useStepContext } from '~/context/step-context'
import useAxios from '~/hooks/use-axios'
import { fetchLanguages } from '~/services/language-service'
import { stepDataInitialValues } from '~/containers/tutor-home-page/constants'

const LanguageStep = ({ btnsBox }) => {
  const { useStepForm } = useStepContext()
  const {
    data: stepData,
    handleNonInputValueChange,
    handleDataChange
  } = useStepForm
  const { t } = useTranslation()

  const { response: languages } = useAxios({
    service: fetchLanguages,
    defaultResponse: [],
    fetchOnMount: true
  })

  useEffect(() => {
    if (stepData !== stepDataInitialValues) handleDataChange(stepData)
  }, [handleDataChange, stepData])

  return (
    <Container sx={styles.container}>
      <ImgContainer>
        <Img src={img} sx={styles.img} />
      </ImgContainer>
      <RightBox sx={styles.rigthBox}>
        <Title sx={styles.title} variant='h6'>
          {t(
            'Please select the language in which you would like to study and cooperate.'
          )}
        </Title>
        <MobileImgContainer sx={styles.mobileImgContainer}>
          <Img src={img} />
        </MobileImgContainer>
        <AutocompleteStyled
          onChange={(_e, newVal) => {
            handleNonInputValueChange('language', newVal)
          }}
          options={languages}
          renderInput={(params) => (
            <TextField {...params} label={t('Your native language')} />
          )}
          sx={styles.autocomplete}
          value={stepData.language}
        />
        {btnsBox}
      </RightBox>
    </Container>
  )
}

export default LanguageStep
