import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Autocomplete, TextField } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/subjects.svg'
import { useStepContext } from '~/context/step-context'
import AppPopover from '~/components/app-popover/AppPopover'
import AppChip from '~/components/app-chip/AppChip'
import { categories, subjectsMock } from './mocks'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

const SubjectsStep = ({ btnsBox }) => {
  const { useStepForm } = useStepContext()
  const {
    data: { subjects },
    handleNonInputValueChange
  } = useStepForm

  const { t } = useTranslation()
  const [categoryInputValue, setCategoryInputValue] = useState('')
  const [categoryValue, setCategoryValue] = useState(null)
  const [subjectInputValue, setSubjectInputValue] = useState('')
  const [subjectValue, setSubjectValue] = useState(null)

  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current
      setContainerSize({ width: offsetWidth, height: offsetHeight })
    }
  }, [])

  const handleClick = () => {
    if (!subjects.find((e) => e.id === subjectValue.id)) {
      subjectValue &&
        handleNonInputValueChange('subjects', [...subjects, subjectValue])
    }
    setSubjectValue(null)
    setCategoryValue(null)
  }

  const removeSubject = (id) => {
    handleNonInputValueChange(
      'subjects',
      subjects.filter((subject) => subject.id !== id)
    )
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
          getOptionLabel={(option) => (option.text ? option.text : '')}
          inputValue={categoryInputValue}
          onChange={(event, newValue) => {
            setCategoryValue(newValue)
            setSubjectValue(null)
          }}
          onInputChange={(event, newInputValue) =>
            setCategoryInputValue(newInputValue)
          }
          options={categories}
          renderInput={(params) => (
            <TextField {...params} label={t('Main Tutoring Category')} />
          )}
          value={categoryValue}
        />

        <Autocomplete
          disabled={!categoryValue}
          getOptionLabel={(option) => (option.text ? option.text : '')}
          inputValue={subjectInputValue}
          onChange={(event, newValue) => {
            setSubjectValue(newValue)
          }}
          onInputChange={(event, newInputValue) =>
            setSubjectInputValue(newInputValue)
          }
          options={categoryValue ? subjectsMock[categoryValue.id] : []}
          renderInput={(params) => (
            <TextField {...params} label={t('Subject')} />
          )}
          value={subjectValue}
        />
        <AppButton onClick={handleClick} size='large' variant='tonal'>
          {t('Add one more subject')}
        </AppButton>

        <Box ref={containerRef} sx={styles.chipPopup}>
          {subjects && subjects.length > 0 && (
            <AppPopover
              initialItems={subjects.slice(0, 4).map((e) => (
                <AppChip
                  icon={
                    <CloseRoundedIcon onClick={() => removeSubject(e.id)} />
                  }
                  key={e.id}
                >
                  {e.text}
                </AppChip>
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
                  width: containerSize.width,
                  maxHeight: containerSize.height,
                  p: '3px'
                }}
              >
                <Box sx={styles.initialChips}>
                  {subjects.map((e) => (
                    <AppChip
                      icon={
                        <CloseRoundedIcon onClick={() => removeSubject(e.id)} />
                      }
                      key={e.id}
                    >
                      {e.text}
                    </AppChip>
                  ))}
                </Box>
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
