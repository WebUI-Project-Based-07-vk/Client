import React, { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import {
  Container,
  ImgContainer,
  Img,
  RightBox,
  Title,
  AutocompleteStyled,
  MobileImgContainer
} from '~/components/shared'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { useTranslation } from 'react-i18next'
import {
  countriesMock,
  textAreaMaxLength
} from '~/containers/tutor-home-page/general-info-step/constants'
import { AutocompleteProps } from '@mui/material/Autocomplete'
import { CityType, CountryType } from '~/types'
import { SxProps, Theme } from '@mui/material'
import { useStepContext } from '~/context/step-context'
import { stepDataInitialValues } from '~/containers/tutor-home-page/constants'

const AutocompleteStyledTyped = AutocompleteStyled as <T>(
  props: AutocompleteProps<T, false, false, false>
) => JSX.Element

interface GeneralInfoStepProps {
  btnsBox: JSX.Element | null
}

const GeneralInfoStep: FC<GeneralInfoStepProps> = ({ btnsBox }) => {
  const { t } = useTranslation()
  const {
    data: stepData,
    errors,
    handleInputChange,
    handleDataChange,
    handleBlur,
    handleNonInputValueChange,
    resetData
  } = useStepContext()
  const countries = countriesMock
  const [cities, setCities] = useState<CityType[]>(
    stepData !== stepDataInitialValues && stepData.country
      ? stepData.country.cities
      : []
  )

  const handleCountryChange = (
    _e: React.SyntheticEvent,
    newVal: CountryType | null
  ) => {
    setCities(newVal?.cities || [])
    handleNonInputValueChange('country', newVal)
    resetData(['city'])
  }

  useEffect(() => {
    if (stepData !== stepDataInitialValues) handleDataChange(stepData)
  }, [handleDataChange, stepData])

  return (
    <Container>
      <ImgContainer>
        <Img src={img} />
      </ImgContainer>
      <RightBox>
        <Box component='form'>
          <Title>{t('becomeTutor.generalInfo.title')}</Title>
          <MobileImgContainer>
            <Img src={img} />
          </MobileImgContainer>
          <Box sx={styles.inputsWrapper}>
            <AppTextField
              autoFocus
              errorMsg={t(errors.firstName)}
              label={t('common.labels.firstName')}
              onBlur={handleBlur('firstName')}
              onChange={handleInputChange('firstName')}
              required
              sx={styles.input as SxProps<Theme>}
              type='text'
              value={stepData.firstName}
            />
            <AppTextField
              errorMsg={t(errors.lastName)}
              label={t('common.labels.lastName')}
              onBlur={handleBlur('lastName')}
              onChange={handleInputChange('lastName')}
              required
              sx={styles.input as SxProps<Theme>}
              type='text'
              value={stepData.lastName}
            />
          </Box>
          <Box sx={styles.inputsWrapper}>
            <AutocompleteStyledTyped<CountryType>
              onChange={handleCountryChange}
              options={countries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t('becomeTutor.generalInfo.countryLabel')}
                />
              )}
              value={stepData.country}
            />
            <AutocompleteStyledTyped<CityType>
              onChange={(_e, newVal) => {
                handleNonInputValueChange('city', newVal)
              }}
              options={cities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t('becomeTutor.generalInfo.cityLabel')}
                />
              )}
              value={stepData.city}
            />
          </Box>
          <AppTextArea
            fullWidth
            maxLength={textAreaMaxLength}
            onChange={handleInputChange('professionalSummary')}
            placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
            textFieldStyles={{ style: styles.textArea }}
            type='text'
            value={stepData.professionalSummary}
          />
          <Typography sx={styles.helperText}>
            {t('becomeTutor.generalInfo.helperText')}
          </Typography>
        </Box>
        {btnsBox}
      </RightBox>
    </Container>
  )
}

export default GeneralInfoStep
