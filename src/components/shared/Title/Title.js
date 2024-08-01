import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '8px'
  }
}))
