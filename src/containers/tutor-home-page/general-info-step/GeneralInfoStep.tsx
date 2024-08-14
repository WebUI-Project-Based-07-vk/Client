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
import { textAreaMaxLength } from '~/containers/tutor-home-page/general-info-step/constants'
import { AutocompleteProps } from '@mui/material/Autocomplete'
import { CityType, CountryType } from '~/types'
import { SxProps, Theme } from '@mui/material'
import { useStepContext } from '~/context/step-context'
import { stepDataInitialValues } from '~/containers/tutor-home-page/constants'
import axios from 'axios'

const AutocompleteStyledTyped = AutocompleteStyled as <T>(
  props: AutocompleteProps<T, false, false, false>
) => JSX.Element

interface GeneralInfoStepProps {
  btnsBox: JSX.Element
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
  const [countries, setCountries] = useState<CountryType[]>([])
  const [cities, setCities] = useState<CityType[]>(
    stepData.country?.cities ?? []
  )

  const basePath = import.meta.env.VITE_API_BASE_PATH

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<CountryType[]>(
          `${basePath}/api/location/countries`
        )
        setCountries(response.data)
      } catch (error) {
        console.error('Failed to fetch countries', error)
      }
    }
    void fetchCountries()
  }, [basePath])

  useEffect(() => {
    const fetchCitiesForSelectedCountry = async () => {
      if (stepData !== stepDataInitialValues && stepData.country) {
        try {
          const response = await axios.get<{
            label: string
            cities: CityType[]
          }>(
            `${basePath}/api/location/countries/${stepData.country.iso2}/cities`,
            {
              params: { countryName: stepData.country.label }
            }
          )
          setCities(response.data.cities)
        } catch (error) {
          console.error('Failed to fetch cities for selected country:', error)
        }
      }
    }
    void fetchCitiesForSelectedCountry()
  }, [basePath, stepData.country])

  const handleCountryChange = async (
    _e: React.SyntheticEvent,
    newVal: CountryType | null
  ) => {
    try {
      if (newVal && newVal.iso2) {
        const response = await axios.get<{
          label: string
          cities: CityType[]
        }>(`${basePath}/api/location/countries/${newVal.iso2}/cities`, {
          params: { countryName: newVal.label }
        })
        setCities(response.data.cities)
      } else {
        setCities([])
      }
      handleNonInputValueChange('country', newVal)
      resetData(['city'])
    } catch (error) {
      console.error('Failed to fetch cities:', error)
    }
  }
  useEffect(() => {
    if (stepData !== stepDataInitialValues) {
      handleDataChange(stepData)
    }
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
              onChange={(_e, newVal) => {
                void handleCountryChange(_e, newVal)
              }}
              options={countries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={t('becomeTutor.generalInfo.countryLabel')}
                />
              )}
              value={stepData.country || null}
            />
            <AutocompleteStyledTyped<CityType>
              getOptionLabel={(option) => option.label}
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
              value={stepData.city || null}
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
