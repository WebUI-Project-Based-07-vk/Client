import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

export const MobileImgContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    textAlign: 'center'
  }
}))
