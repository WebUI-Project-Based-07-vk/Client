import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const ImgContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))
