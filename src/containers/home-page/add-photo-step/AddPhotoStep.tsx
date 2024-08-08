import { Box, Typography } from '@mui/material'
import { style } from '~/containers/home-page/add-photo-step/AddPhotoStep.style'
import PhotoPreview from './photo-preview/PhotoPreview'
import { useTranslation } from 'react-i18next'
import FileUploader from '~/components/file-uploader/FileUploader'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useStepContext } from '~/context/step-context'
import { validationData } from './constants'
import useUpload from '~/hooks/use-upload'
import useBreakpoints from '~/hooks/use-breakpoints'
import PhotoPreviewUploader from './photo-preview/PhotoPreviewUploader'

const AddPhotoStep = ({ btnsBox }: { btnsBox: JSX.Element }) => {
  const { t } = useTranslation()
  const {
    data: {
      photo: { image, fileName }
    },
    handleNonInputValueChange,
    resetData
  } = useStepContext()
  const { setAlert } = useSnackBarContext()
  const { isMobile, isTablet } = useBreakpoints()

  const emitter = ({ files, error }: { files: File[]; error: string }) => {
    if (error) {
      setAlert({ severity: 'error', message: error })
    } else {
      if (files.length > 0) {
        handleNonInputValueChange('photo', {
          image: image,
          fileName: files[0].name
        })
        const fileReader = new FileReader()
        fileReader.onload = () => {
          handleNonInputValueChange('photo', {
            image: fileReader.result as string,
            fileName: files[0].name
          })
        }
        fileReader.readAsDataURL(files[0])
      } else {
        resetData(['photo'])
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
      {(isMobile || isTablet) && <Box sx={style.buttonBox}>{btnsBox}</Box>}
      {!isMobile && !isTablet && (
        <PhotoPreview dragDrop={dragDrop} image={image} />
      )}
      {(isMobile || isTablet) && (
        <PhotoPreviewUploader
          emitter={emitter}
          image={image ? image : undefined}
          validationData={validationData}
        />
      )}
      <Box sx={style.rightBox}>
        <Box>
          <Typography sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>
          {!isMobile && !isTablet && (
            <FileUploader
              buttonText={t('becomeTutor.photo.button')}
              emitter={emitter}
              initialState={fileName ? [new File([], fileName)] : undefined}
              isImages
              sx={style.fileUploader}
              validationData={validationData}
            ></FileUploader>
          )}
        </Box>
        {!isMobile && !isTablet && btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
