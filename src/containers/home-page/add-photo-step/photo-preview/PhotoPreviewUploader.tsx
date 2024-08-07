import useUpload from '~/hooks/use-upload'
import { AddDocuments, Emitter, InputEnum } from '~/types'
import { Box, Typography } from '@mui/material'
import { style } from '../AddPhotoStep.style'
import { useTranslation } from 'react-i18next'

interface PhotoPreviewUploaderProps {
  validationData: AddDocuments
  emitter: Emitter
  image?: string
}

export default function PhotoPreviewUploader({
  emitter,
  image,
  validationData
}: PhotoPreviewUploaderProps) {
  const { addFiles } = useUpload({
    validationData,
    emitter,
    files: []
  })

  const { t } = useTranslation()

  return (
    <Box component={'label'} sx={style.imgContainer}>
      <Box sx={style.uploadBox}>
        {image ? (
          <Box component={'img'} src={image} sx={style.img}></Box>
        ) : (
          <Box
            sx={{
              ...style.img,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography>{t('becomeTutor.photo.placeholder')}</Typography>
          </Box>
        )}
      </Box>
      <input hidden multiple onChange={addFiles} type={InputEnum.File}></input>
    </Box>
  )
}
