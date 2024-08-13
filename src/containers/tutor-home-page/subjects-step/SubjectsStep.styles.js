import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  img: {
    width: '100%'
  },
  imgContainer: {
    display: { md: 'block', sm: 'none', xs: 'none' }
  },
  mobileImgContainer: {
    display: { md: 'none', sm: 'block' },
    maxWidth: { sm: '250px', xs: '200px' },
    m: { sm: '0 auto', xs: '0 auto' }
  },
  typography: {
    fontSize: { md: '16px', xs: '14px' }
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  initialChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px'
  },
  chipPopup: {
    width: '100%',
    height: '100%'
  },
  btnsBlock: {
    mt: 'auto'
  }
}
