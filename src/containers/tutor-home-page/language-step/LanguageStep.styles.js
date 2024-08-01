import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  title: {
    marginBottom: '16px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '8px'
    }
  },
  autocomplete: {
    width: '100%',
    marginBottom: '16px'
  },
  mobileImgContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center'
    }
  }
})
