import React, { FC } from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import {
  CategoryContent,
  CategoryIconWrapper
} from '~/pages/categories/Categories.styles'
import { SvgIconComponent } from '@mui/icons-material'

interface CategoryCardProps {
  icon: SvgIconComponent
  title: string
  totalOffers: number
  iconColor: string
  backgroundColor: string
}

const CategoryCard: FC<CategoryCardProps> = ({
  icon: Icon,
  title,
  totalOffers,
  iconColor,
  backgroundColor
}) => {
  return (
    <Card>
      <CardActionArea href='categories/subjects'>
        <CategoryContent>
          <CategoryIconWrapper backgroundColor={backgroundColor}>
            <Icon style={{ color: iconColor }} />
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
              {totalOffers || 0} Offers
            </Typography>
          </CardContent>
        </CategoryContent>
      </CardActionArea>
    </Card>
  )
}

export default CategoryCard
