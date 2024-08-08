import PageWrapper from '~/components/page-wrapper/PageWrapper'
import React from 'react'
import CategoryCard from './categoryCard/CategoryCard'
import { categoriesData } from './categoriesData'
import './Categories.css'

const Categories = () => {
  return (
    <PageWrapper>
      <div className='categories'>
        {categoriesData.map((category, index) => (
          <CategoryCard
            backgroundColor={category.backgroundColor}
            icon={category.icon}
            iconColor={category.iconColor}
            key={index}
            offers={category.offers}
            title={category.title}
          />
        ))}
      </div>
    </PageWrapper>
  )
}

export default Categories
