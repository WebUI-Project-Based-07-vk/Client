import React, { useEffect, useRef, useState } from 'react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoryCard from './CategoryCard'
import { Box, Button, Grid, Typography } from '@mui/material'
import CategoriesHeader from './CategoriesHeader'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { Container } from '~/components/shared'
import Loader from '~/components/loader/Loader'
import { useSnackBarContext } from '~/context/snackbar-context'
import {
  CategoriesParams,
  CategoriesResponse,
  CategoryInterface,
  SortEnum
} from '~/types'
import { snackbarVariants } from '~/constants'
import { mappedIcons } from '~/pages/categories/constants'
import { styles } from '~/pages/categories/Categories.styles'

const Categories: React.FC = () => {
  const { setAlert } = useSnackBarContext()

  const itemsPerRequest = 3
  const requestParams: CategoriesParams = {
    skip: 0,
    limit: 6,
    sort: { order: SortEnum.Asc }
  }
  const [categories, setCategories] = useState<CategoryInterface[]>([])

  const {
    response: categoriesResponse,
    loading,
    error,
    fetchData
  } = useAxios<CategoriesResponse, CategoriesParams>({
    service: (params) => categoryService.getCategories(params),
    defaultResponse: {
      count: 0,
      categories: []
    },
    fetchOnMount: false
  })

  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) return
    isMounted.current = true

    void fetchCategoriesData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!error) return

    setAlert({
      severity: snackbarVariants.error,
      message: `errors.${error.code}`
    })
  }, [error, setAlert])

  async function fetchCategoriesData() {
    console.log(categories)

    const newRequestParams = {
      ...requestParams,
      skip: categories.length,
      limit: itemsPerRequest
    }

    const res = await fetchData(
      categories.length === 0 ? requestParams : newRequestParams
    )
    if (!res) return

    console.log(res)
    setCategories((prev) => [...prev, ...res.categories])
  }

  const handleViewMore = () => {
    void fetchCategoriesData()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSearch = (searchQuery: string) => {
    // if (searchQuery.trim()) {
    //   const filtered = categoriesData.filter((category) =>
    //     category.name.toLowerCase().includes(searchQuery.toLowerCase())
    //   )
    //   setCategories(filtered)
    // } else {
    //   setCategories(categoriesData)
    // }
  }

  if (loading)
    return (
      <Container>
        <Loader pageLoad />
      </Container>
    )

  return (
    <PageWrapper>
      <CategoriesHeader onSearch={handleSearch} />
      {categories.length > 0 ? (
        <>
          <Grid container justifyContent='center' spacing={4}>
            {categories.map((category, index) => (
              <Grid item key={index} md={4} sm={6} xs={12}>
                <CategoryCard
                  backgroundColor={category.appearance.backgroundColor}
                  icon={mappedIcons[category.appearance.icon]}
                  iconColor={category.appearance.iconColor}
                  title={category.name}
                  totalOffers={category.totalOffers}
                />
              </Grid>
            ))}
          </Grid>
          {categories.length < categoriesResponse.count && (
            <Box display='flex' justifyContent='center' mt={3}>
              <Button
                onClick={handleViewMore}
                sx={styles.viewMore}
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
