import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Autocomplete, TextField } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/subjects.svg'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [categoryInputValue, setCategoryInputValue] = useState('')
  const [categoryValue, setCategoryValue] = useState(null)
  const [subjectInputValue, setSubjectInputValue] = useState('')
  const [subjectValue, setSubjectValue] = useState(null)

  const handleClick = () => {}

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <Typography sx={styles.typography}>
          {t(
            'Please choose the main subjects based on the category. You can add others later.'
          )}
        </Typography>
        <Box sx={styles.mobileImgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
        <Autocomplete
          inputValue={categoryInputValue}
          onChange={(event, newValue) => setCategoryValue(newValue)}
          onInputChange={(event, newInputValue) =>
            setCategoryInputValue(newInputValue)
          }
          options={['cat1', 'cat2', 'cat3', 'cat4']}
          renderInput={(params) => (
            <TextField {...params} label={t('Main Tutoring Category')} />
          )}
          value={categoryValue}
        />

        <Autocomplete
          inputValue={subjectInputValue}
          onChange={(event, newValue) => setSubjectValue(newValue)}
          onInputChange={(event, newInputValue) =>
            setSubjectInputValue(newInputValue)
          }
          options={['subject1', 'subject2', 'subject3', 'subject4']}
          renderInput={(params) => (
            <TextField {...params} label={t('Subject')} />
          )}
          value={subjectValue}
        />

        <AppButton
          onClick={handleClick}
          size='large'
          sx={styles.appButton}
          variant='tonal'
        >
          {t('Add one more subject')}
        </AppButton>
        <Box sx={styles.btnsBlock}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
