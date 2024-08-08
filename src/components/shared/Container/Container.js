import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '30px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: '485px'
  }
}))
