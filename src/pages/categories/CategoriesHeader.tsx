import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'

interface CategoriesHeaderProps {
  onSearch: (searchQuery: string) => void
}

const CategoriesHeader: React.FC<CategoriesHeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleShowOffers = () => {
    navigate('/categories/subjects/find-offers')
  }

  const handleSearch = () => {
    onSearch(searchQuery.trim())
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '40px 0'
      }}
    >
      <Typography sx={{ fontWeight: 'bold' }} variant='h3'>
        Categories
      </Typography>
      <Typography sx={{ margin: '10px 0 40px 0' }} variant='subtitle1'>
        Explore categories you are passionate about.
      </Typography>
      <Button
        endIcon={<ArrowForwardIcon />}
        onClick={handleShowOffers}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          textTransform: 'none',
          marginBottom: '20px',
          color: '#757575',
          fontSize: '16px',
          fontWeight: 'normal',
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#000000'
          }
        }}
      >
        Show all offers
      </Button>
      <Box
        sx={{
          marginBottom: '20px'
        }}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon
                  sx={{
                    marginLeft: '45px'
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <Button
                  onClick={handleSearch}
                  sx={{
                    backgroundColor: '#757575',
                    borderRadius: '5px',
                    padding: '10px 24px',
                    marginRight: '45px',
                    color: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: '#607D8B'
                    }
                  }}
                  variant='contained'
                >
                  Search
                </Button>
              </InputAdornment>
            )
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='What would you like to learn?'
          sx={{
            width: '100%',
            backgroundColor: '#F5F5F5',
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '70px'
            },
            '& .MuiInputBase-input': {
              padding: '30px 14px'
            }
          }}
          value={searchQuery}
          variant='outlined'
        />
      </Box>
    </Box>
  )
}

export default CategoriesHeader
