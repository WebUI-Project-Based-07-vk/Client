import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Autocomplete, TextField } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/subjects.svg'
import { useStepContext } from '~/context/step-context'
import AppPopover from '~/components/app-popover/AppPopover'
import AppChip from '~/components/app-chip/AppChip'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const [categoryInputValue, setCategoryInputValue] = useState('')
  const [categoryValue, setCategoryValue] = useState(null)
  const [subjectInputValue, setSubjectInputValue] = useState('')
  const [subjectValue, setSubjectValue] = useState(null)
  const {
    handleStepData,
    stepData: { subjects }
  } = useStepContext()
  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current
      setContainerSize({ width: offsetWidth, height: offsetHeight })
    }
  }, [])

  const handleClick = () => {
    subjectValue && handleStepData('subjects', [...subjects, subjectValue])
  }

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
          onChange={(event, newValue) => {
            setCategoryValue(newValue)
            setSubjectValue(null)
          }}
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
          disabled={!categoryValue}
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
        <AppButton onClick={handleClick} size='large' variant='tonal'>
          {t('Add one more subject')}
        </AppButton>

        <Box ref={containerRef} sx={styles.chipPopup}>
          {subjects.length > 0 && (
            <AppPopover
              initialItems={subjects.slice(0, 4).map((e) => (
                <AppChip key={e}>{e}</AppChip>
              ))}
              initialItemsWrapperStyle={styles.initialChips}
              showMoreElem={
                subjects.slice(4).length > 0 && (
                  <AppChip>{`+${subjects.slice(4).length}`}</AppChip>
                )
              }
            >
              <Box
                sx={{
                  ...styles.initialChips,
                  width: containerSize.width,
                  maxHeight: containerSize.height,
                  p: '3px'
                }}
              >
                {subjects.slice(4).map((e) => (
                  <AppChip key={e}>{e}</AppChip>
                ))}
              </Box>
            </AppPopover>
          )}
        </Box>
        <Box sx={styles.btnsBlock}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
