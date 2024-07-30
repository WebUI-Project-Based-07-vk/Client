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
import useUpload from '~/hooks/use-upload'

const AddPhotoStep = ({ btnsBox }: { btnsBox: JSX.Element }) => {
  const { t } = useTranslation()
  const { handleStepData } = (useStepContext as useStepContextType)()
  const { setAlert } = useSnackBarContext()
  const [image, setImage] = useState<string>()
  const [file, setFile] = useState<File>()

  const emitter = ({ files, error }: { files: File[]; error: string }) => {
    if (error) {
      setAlert({ severity: 'error', message: error })
    } else {
      if (files.length > 0) {
        setFile(files[0])
        const fileReader = new FileReader()
        fileReader.onload = () => {
          setImage(fileReader.result as string)
          handleStepData('photo', image as string)
        }
        fileReader.readAsDataURL(files[0])
      } else {
        setFile(undefined)
        setImage('')
      }
    }
  }

  const { dragDrop } = useUpload({
    files: [],
    emitter,
    validationData
  })

  return (
    <Box sx={style.root}>
      <PhotoPreview dragDrop={dragDrop} image={image} />
      <Box sx={style.rightBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          <FileUploader
            buttonText={t('becomeTutor.photo.button')}
            emitter={emitter}
            initialState={file && [file]}
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
