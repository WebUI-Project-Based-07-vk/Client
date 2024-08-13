import { cloneElement, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import AppButton from '~/components/app-button/AppButton'
import useSteps from '~/hooks/use-steps'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'
import { useStepContext } from '~/context/step-context'
import Tooltip from '@mui/material/Tooltip'

const StepWrapper = ({ children, steps }) => {
  const { activeStep, hasErrors, isLastStep, loading, stepOperation } =
    useSteps({
      steps
    })
  const { stepErrors } = useStepContext()
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()

  const stepLabels = useMemo(
    () =>
      steps.map((step, index) => (
        <Box
          color={stepErrors[step] ? 'error.500' : 'primary.500'}
          key={step}
          onClick={() => setActiveStep(index)}
          sx={[styles.defaultTab, index === activeStep && styles.activeTab]}
          typography='caption'
        >
          {t(`step.stepLabels.${step}`)}
        </Box>
      )),
    [activeStep, setActiveStep, stepErrors, steps, t]
  )

  const finishButton = (
    <AppButton
      disabled={hasErrors}
      loading={loading}
      onClick={handleSubmit}
      size='small'
      sx={styles.finishBtn}
      variant='contained'
    >
      {t('common.finish')}
    </AppButton>
  )
  const finishButtonDisabled = (
    <Tooltip arrow placement='top-start' title={t('step.finishTip')}>
      <Box>{finishButton}</Box>
    </Tooltip>
  )

  const nextButton = isLastStep ? (
    hasErrors ? (
      finishButtonDisabled
    ) : (
      finishButton
    )
  ) : (
    <AppButton onClick={next} size='small' sx={styles.btn} variant='contained'>
      {t('common.next')}
      <EastIcon fontSize='small' />
    </AppButton>
  )

  const btnsBox = (
    <Box sx={styles.btnWrapper}>
      <AppButton
        disabled={activeStep === 0}
        onClick={back}
        size='small'
        sx={styles.btn}
        variant='outlined'
      >
        <WestIcon fontSize='small' />
        {t('common.back')}
      </AppButton>
      {nextButton}
    </Box>
  )

  return (
    <Container sx={styles.root}>
      <Box sx={styles.steps}>{stepLabels}</Box>
      <Box sx={styles.stepContent}>
        {cloneElement(children[activeStep], {
          btnsBox,
          stepLabel: steps[activeStep]
        })}
      </Box>
    </Container>
  )
}

export default StepWrapper
