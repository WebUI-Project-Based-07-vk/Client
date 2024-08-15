import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box
} from '@mui/material'
import { styled } from '@mui/system'

const CategoryIconWrapper = styled(Box)(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  marginLeft: '30px',
  borderRadius: '8px'
}))

const CategoryContent = styled(Box)({
  display: 'flex',
  alignItems: 'center'
})

const CategoryCard = ({
  icon: Icon,
  title,
  offers,
  iconColor,
  backgroundColor
}) => {
  return (
    <Card>
      <CardActionArea href='categories/subjects'>
        <CategoryContent>
          <CategoryIconWrapper backgroundColor={backgroundColor}>
            <Icon style={{ color: iconColor, fontSize: '2rem' }} />
          </CategoryIconWrapper>

          <CardContent>
            <Typography
              component='div'
              gutterBottom
              style={{ fontSize: '20px' }}
              variant='h5'
            >
              {title}
            </Typography>
            <Typography
              color='text.secondary'
              style={{ fontSize: '14px' }}
              variant='h6'
            >
              {offers} Offers
            </Typography>
          </CardContent>
        </CategoryContent>
      </CardActionArea>
    </Card>
  )
}

export default CategoryCard
