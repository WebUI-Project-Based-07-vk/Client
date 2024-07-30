import { Box, Typography } from '@mui/material'
import { style } from '../AddPhotoStep.style'
import { useTranslation } from 'react-i18next'

export default function PhotoPreview({ image }) {
  const { t } = useTranslation()

  return (
    <Box sx={style.imgContainer}>
      {image ? (
        <Box
          alt={t('becomeTutor.photo.imageAlt')}
          component='img'
          src={image}
          sx={style.img}
        ></Box>
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
  )
}
