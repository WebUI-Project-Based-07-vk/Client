import { createContext, useCallback, useContext, useState } from 'react'
import { initialValues } from '~/containers/tutor-home-page/general-info-step/constants'

const StepContext = createContext()

const StepProvider = ({ children }) => {
  const [generalData, setGeneralData] = useState({
    data: initialValues,
    errors: {}
  })
  const [subject, setSubject] = useState([])
  const [language, setLanguage] = useState(null)
  const [photo, setPhoto] = useState([])

  const stepData = {
    generalInfo: generalData,
    subjects: subject,
    language: language,
    photo: photo
  }

  const handleStepData = useCallback((stepLabel, data, errors) => {
    switch (stepLabel) {
      case 'generalInfo':
        setGeneralData({ data, errors })
        break
      case 'subjects':
        setSubject(data)
        break
      case 'language':
        setLanguage(data)
        break
      case 'photo':
        setPhoto(data)
        break
      default:
        return
    }
  }, [])

  return (
    <StepContext.Provider value={{ stepData, handleStepData }}>
      {children}
    </StepContext.Provider>
  )
}

const useStepContext = () => useContext(StepContext)

export { StepProvider, useStepContext }
