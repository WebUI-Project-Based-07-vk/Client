import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    ...fadeAnimation
  },
  inputsWrapper: {
    display: { xs: 'block', sm: 'flex' },
    gap: '16px'
  },
  input: {
    width: { xs: '100%', sm: 'auto' }
  },
  textArea: {
    width: '100%',
    height: '117px'
  },
  helperText: {
    fontSize: '12px',
    margin: { xs: '20px 0', sm: 'unset' }
  }
}
