import { styled } from '@mui/system'
import { Box } from '@mui/material'
import { BoxProps } from '@mui/material/Box'

interface CategoryIconWrapperProps extends BoxProps {
  backgroundColor?: string
}

export const CategoryIconWrapper = styled(Box)<CategoryIconWrapperProps>(
  ({ theme, backgroundColor }) => ({
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    marginLeft: '30px',
    borderRadius: '8px',
    '& > svg': {
      fontSize: '2rem'
    }
  })
)

export const CategoryContent = styled(Box)({
  display: 'flex',
  alignItems: 'center'
})

export const styles = {
  viewMore: {
    backgroundColor: '#E0E0E0',
    color: '#000000',
    '&:hover': {
      backgroundColor: '#BDBDBD'
    }
  }
}
