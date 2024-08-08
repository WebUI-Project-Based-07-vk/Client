import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: { xs: 'center', md: 'start' },
    gap: { md: '40px' },
    height: { sm: '485px' },
    flexDirection: {
      xs: 'column-reverse',
      md: 'row'
    },
    ...fadeAnimation
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: '20px'
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '440px',
    maxHeight: { xs: '440px', md: '100%' },
    width: '100%',
    flex: 1,
    pb: { xs: '16px', sm: '26px', lg: '52px' }
  },
  uploadBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '440px',
    maxHeight: { xs: '440px', md: '100%' },
    height: { xs: '100%', sm: '310px', md: '100%' },
    width: { md: '100%' },
    aspectRatio: 1,
    border: '2px dashed',
    borderColor: 'primary.200',
    borderRadius: '20px',
    mt: { xs: '20px', sm: '0px' }
  },
  activeDrag: {
    border: '2px solid',
    borderColor: 'primary.900'
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '432px',
    width: '100%',
    height: { md: '100%' },
    m: { lg: 0, xs: '0 auto' },
    pt: 0,
    pb: { xs: '30px', md: '0' }
  },
  description: {
    mb: '20px'
  },
  fileUploader: {
    button: {
      textAlign: 'center'
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      border: '1px solid',
      borderColor: 'primary.200',
      borderRadius: '5px',
      maxWidth: '270px',
      overflow: 'auto'
    }
  },
  buttonBox: {
    width: '100%'
  }
}
