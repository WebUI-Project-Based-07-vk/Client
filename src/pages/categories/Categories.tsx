import React, { useState } from 'react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoryCard from './CategoryCard'
import { categoriesData } from './categoriesData'
import { Grid, Button, Box, Typography } from '@mui/material'
import CategoriesHeader from './CategoriesHeader'

const Categories: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState<number>(6)
  const [filteredCategories, setFilteredCategories] = useState(categoriesData)

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 3)
  }

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      const filtered = categoriesData.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredCategories(filtered)
    } else {
      setFilteredCategories(categoriesData)
    }
  }

  return (
    <PageWrapper>
      <CategoriesHeader onSearch={handleSearch} />
      {filteredCategories.length > 0 ? (
        <>
          <Grid container justifyContent='center' spacing={4}>
            {filteredCategories
              .slice(0, visibleCount)
              .map((category, index) => (
                <Grid item key={index} md={4} sm={6} xs={12}>
                  <CategoryCard
                    backgroundColor={category.backgroundColor}
                    icon={category.icon}
                    iconColor={category.iconColor}
                    offers={category.offers}
                    title={category.name}
                  />
                </Grid>
              ))}
          </Grid>
          {visibleCount < filteredCategories.length && (
            <Box display='flex' justifyContent='center' mt={3}>
              <Button
                onClick={handleViewMore}
                sx={{
                  backgroundColor: '#E0E0E0',
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: '#BDBDBD'
                  }
                }}
                variant='contained'
              >
                View more
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box mt={4} textAlign='center'>
          <Typography color='textSecondary' variant='h6'>
            Sorry, no results found.
          </Typography>
        </Box>
      )}
    </PageWrapper>
  )
}

export default Categories
