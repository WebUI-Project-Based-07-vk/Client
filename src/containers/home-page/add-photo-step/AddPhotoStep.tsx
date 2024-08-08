import { Box, Typography } from '@mui/material'

import { style } from '~/containers/home-page/add-photo-step/AddPhotoStep.style'
import PhotoPreview from './photo-preview/PhotoPreview'
import { useTranslation } from 'react-i18next'
import FileUploader from '~/components/file-uploader/FileUploader'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useStepContext } from '~/context/step-context'
import { validationData } from './constants'
import useUpload from '~/hooks/use-upload'

const AddPhotoStep = ({ btnsBox }: { btnsBox: JSX.Element }) => {
  const { t } = useTranslation()
  const {
    data: stepData,
    handleNonInputValueChange,
    resetData
  } = useStepContext()
  const { setAlert } = useSnackBarContext()

  const emitter = ({ files, error }: { files: File[]; error: string }) => {
    if (error) return setAlert({ severity: 'error', message: error })

    if (files.length > 0) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        handleNonInputValueChange('photo', {
          file: [files[0]],
          image: fileReader.result as string
        })
      }
      fileReader.readAsDataURL(files[0])
    } else {
      resetData(['photo'])
    }
  }

  const { dragDrop } = useUpload({
    files: [],
    emitter,
    validationData
  })

  return (
    <Box sx={style.root}>
      <PhotoPreview dragDrop={dragDrop} image={stepData.photo.image} />
      <Box sx={style.rightBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            emitter={emitter}
            initialState={stepData.photo.file}
            isImages
            sx={style.fileUploader}
            validationData={validationData}
          ></FileUploader>
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
