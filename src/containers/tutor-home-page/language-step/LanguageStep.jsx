import React, { useState, useEffect } from 'react'
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

const LanguageStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState(stepData.language)
  const { t } = useTranslation()

  const { response: languages } = useAxios({
    service: fetchLanguages,
    defaultResponse: [],
    fetchOnMount: true
  })

  useEffect(() => {
    setInputValue(value ? value : '')
  }, [value])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    handleStepData('language', newValue)
  }

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue)
  }

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
          inputValue={inputValue}
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={languages}
          renderInput={(params) => (
            <TextField {...params} label={t('Your native language')} />
          )}
          sx={styles.autocomplete}
          value={value}
        />
        {btnsBox}
      </RightBox>
    </Container>
  )
}

export default LanguageStep
