import React from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import './CategoryCard.css'

const CategoryCard = ({
  icon: Icon,
  title,
  offers,
  iconColor,
  backgroundColor
}) => {
  return (
    <Card className='category-card'>
      <CardActionArea href='#'>
        <div className='category-content'>
          <div
            className='category-icon'
            style={{ backgroundColor: backgroundColor }}
          >
            <Icon style={{ color: iconColor }} />
          </div>

          <CardContent className='category-card__content'>
            <Typography
              className='category-card__title'
              component='div'
              gutterBottom
              variant='h5'
            >
              {title}
            </Typography>
            <Typography
              className='category-card__offers'
              color='text.secondary'
              variant='h6'
            >
              {offers} Offers
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  )
}

export default CategoryCard
