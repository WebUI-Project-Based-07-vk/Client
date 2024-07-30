import { Box, Typography } from '@mui/material'

import { style } from '~/containers/home-page/add-photo-step/AddPhotoStep.style'
import PhotoPreview from './photo-preview/PhotoPreview'
import { useTranslation } from 'react-i18next'
import FileUploader from '~/components/file-uploader/FileUploader'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useState } from 'react'
import { useStepContext } from '~/context/step-context'
import { validationData } from './constants'
import { useStepContextType } from '~/types/components/step-context/step-context.types'

const AddPhotoStep = ({ btnsBox }: { btnsBox: JSX.Element }) => {
  const { t } = useTranslation()
  const { handleStepData } = (useStepContext as useStepContextType)()
  const { setAlert } = useSnackBarContext()
  const [image, setImage] = useState<string>()

  return (
    <Box sx={style.root}>
      <PhotoPreview image={image} />
      <Box sx={style.rightBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            emitter={({ files, error }: { files: File[]; error: string }) => {
              if (error) {
                setAlert({ severity: 'error', message: error })
              } else {
                const fileReader = new FileReader()
                fileReader.onload = () => {
                  setImage(fileReader.result as string)
                }
                fileReader.readAsDataURL(files[0])
                handleStepData('photo', image as string)
              }
            }}
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
