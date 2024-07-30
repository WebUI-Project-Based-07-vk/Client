import { Box, Typography } from '@mui/material'
import { style } from '../AddPhotoStep.style'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function PhotoPreview({ image, dragDrop }) {
  const { t } = useTranslation()
  const [dragOver, setDragOver] = useState(false)

  return (
    <Box sx={style.imgContainer}>
      <Box
        onDragLeave={(e) => {
          e.preventDefault()
          setDragOver(false)
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDrop={(e) => {
          setDragOver(false)
          dragDrop(e)
        }}
        sx={
          dragOver
            ? {
                ...style.uploadBox,
                ...style.activeDrag
              }
            : style.uploadBox
        }
      >
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
    </Box>
  )
}
