import { FC, useEffect } from 'react'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

import { tutorStepLabels } from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'
import useStepsInitialValues from '~/hooks/use-steps-initial-values'
import Loader from '~/components/loader/Loader'
import { Container } from '~/components/shared'

interface UserStepsWrapperProps {
  userRole: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const dispatch = useAppDispatch()
  const { initialValues, isPending } = useStepsInitialValues()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const childrenArr = [
    <GeneralInfoStep btnsBox={null} key='1' />,
    <SubjectsStep btnsBox={null} key='2' />,
    <LanguageStep btnsBox={null} key='3' />,
    <AddPhotoStep btnsBox={null} key='4' />
  ]

  const stepLabels = userRole === student ? '' : tutorStepLabels

  if (isPending)
    return (
      <Container>
        <Loader pageLoad />
      </Container>
    )

  return (
    <StepProvider stepsInitialValues={initialValues}>
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
