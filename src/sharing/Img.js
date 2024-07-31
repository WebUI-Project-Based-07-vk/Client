import { styled } from '@mui/material/styles'

export const Img = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '300px'
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    marginBottom: '16px'
  }
}))
