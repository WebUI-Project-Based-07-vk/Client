import React, { useState } from 'react'
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

const languages = [
  'English',
  'Ukrainian',
  'Polish',
  'German',
  'French',
  'Spanish',
  'Arabic'
]

const LanguageStep = ({ btnsBox }) => {
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState(null)
  const { t } = useTranslation()

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
          onChange={(event, newValue) => setValue(newValue)}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
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
