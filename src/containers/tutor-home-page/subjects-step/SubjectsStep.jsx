import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Autocomplete, TextField } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/subjects.svg'
import { useStepContext } from '~/context/step-context'
import AppPopover from '~/components/app-popover/AppPopover'
import AppChip from '~/components/app-chip/AppChip'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { isSubjectDuplicate } from '~/containers/tutor-home-page/subjects-step/constants'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

const SubjectsStep = ({ btnsBox }) => {
  const { useStepForm } = useStepContext()
  const { data: stepData, handleNonInputValueChange, resetData } = useStepForm
  const { t } = useTranslation()

  const containerRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const { response: categoriesResponse } = useAxios({
    service: categoryService.getCategoriesNames,
    defaultResponse: [],
    fetchOnMount: true
  })
  const { response: subjectsResponse, fetchData: fetchSubjectsNames } =
    useAxios({
      service: (categoryId) => subjectService.getSubjectsNames(categoryId),
      defaultResponse: [],
      fetchOnMount: false
    })

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current
      setContainerSize({ width: offsetWidth, height: offsetHeight })
    }
  }, [])

  function handleCategoryChange(_e, newVal) {
    handleNonInputValueChange('category', newVal)
    resetData(['subject'])
    newVal && void fetchSubjectsNames(newVal?._id ?? [])
  }

  const handleAddSubject = () => {
    if (!stepData.subject || isSubjectDuplicate(stepData)) return

    handleNonInputValueChange('chips', [...stepData.chips, stepData.subject])
    resetData(['subject', 'category'])
  }

  const handleRemoveSubject = (id) => {
    handleNonInputValueChange(
      'chips',
      stepData.chips.filter((elem) => elem._id !== id)
    )
  }

  useEffect(() => {
    stepData.category && void fetchSubjectsNames(stepData.category._id ?? [])
  }, [])

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
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option?._id === value?._id}
          onChange={handleCategoryChange}
          options={categoriesResponse.categoryNames ?? []}
          renderInput={(params) => (
            <TextField {...params} label={t('Main Tutoring Category')} />
          )}
          value={stepData.category}
        />

        <Autocomplete
          disabled={!stepData.category}
          getOptionLabel={(option) => option?.name || ''}
          isOptionEqualToValue={(option, value) => option?._id === value?._id}
          onChange={(_e, newVal) => {
            handleNonInputValueChange('subject', newVal)
          }}
          options={
            stepData.category && subjectsResponse.subjects
              ? subjectsResponse.subjects
              : []
          }
          renderInput={(params) => (
            <TextField {...params} label={t('Subject')} />
          )}
          value={stepData.subject}
        />
        <AppButton onClick={handleAddSubject} size='large' variant='tonal'>
          {t('Add one more subject')}
        </AppButton>

        <Box ref={containerRef} sx={styles.chipPopup}>
          {stepData.chips?.length > 0 && (
            <AppPopover
              initialItems={stepData.chips.slice(0, 4).map((elem) => (
                <AppChip
                  icon={
                    <CloseRoundedIcon
                      onClick={() => handleRemoveSubject(elem._id)}
                    />
                  }
                  key={elem._id}
                >
                  {elem.name}
                </AppChip>
              ))}
              initialItemsWrapperStyle={styles.initialChips}
              showMoreElem={
                stepData.chips.slice(4).length > 0 && (
                  <AppChip>{`+${stepData.chips.slice(4).length}`}</AppChip>
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
                  {stepData.chips.map((elem) => (
                    <AppChip
                      icon={
                        <CloseRoundedIcon
                          onClick={() => handleRemoveSubject(elem._id)}
                        />
                      }
                      key={elem._id}
                    >
                      {elem.label}
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
