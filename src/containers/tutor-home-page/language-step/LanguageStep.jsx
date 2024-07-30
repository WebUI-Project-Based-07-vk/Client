import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'

const languages = [
  'English',
  'Ukrainian',
  'Polish',
  'German',
  'French',
  'Spanish',
  'Arabic'
]

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  padding: '16px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const ImgContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const Img = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '300px'
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    marginBottom: '16px'
  }
}))

const RightBox = styled(Box)(({ theme }) => ({
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  //padding: '16px',
  [theme.breakpoints.down('md')]: {
    padding: '0'
  }
}))

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '8px'
  }
}))

const AutocompleteStyled = styled(Autocomplete)({
  width: '100%',
  marginBottom: '16px'
})

const MobileImgContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    textAlign: 'center'
  }
}))

const LanguageStep = ({ btnsBox }) => {
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState(null)

  return (
    <Container sx={styles.container}>
      <ImgContainer>
        <Img src={img} sx={styles.img} />
      </ImgContainer>
      <RightBox sx={styles.rigthBox}>
        <Title variant='h6'>
          Please select the language in which you would like to study and
          cooperate.
        </Title>
        <MobileImgContainer>
          <Img src={img} />
        </MobileImgContainer>
        <AutocompleteStyled
          inputValue={inputValue}
          onChange={(event, newValue) => setValue(newValue)}
          onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
          options={languages}
          renderInput={(params) => (
            <TextField {...params} label='Your native language' />
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
