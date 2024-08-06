export const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "'Rubik', sans-serif",
    color: '#29313D'
  },
  box: {
    margin: { xs: '0 auto', sm: 0 },
    padding: { xs: 4, md: 11 },
    width: '744px',
    height: '396px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      width: '90%',
      height: 'auto',
      margin: '100px auto'
    },
    '@media (max-width: 480px)': {
      width: '95%',
      margin: '50px auto'
    }
  },
  img: {
    maxWidth: '75px',
    maxHeight: '75px',
    margin: '95px auto 30px',
    '@media (max-width: 768px)': {
      maxWidth: '50px',
      maxHeight: '50px',
      margin: '50px auto 20px'
    },
    '@media (max-width: 480px)': {
      maxWidth: '40px',
      maxHeight: '40px',
      margin: '30px auto 15px'
    }
  },
  title: {
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '29px',
    textAlign: 'center',
    marginBottom: '30px',
    '@media (max-width: 768px)': {
      fontSize: '20px',
      lineHeight: '26px',
      marginBottom: '20px'
    },
    '@media (max-width: 480px)': {
      fontSize: '18px',
      lineHeight: '24px',
      marginBottom: '15px'
    }
  },
  description: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '21px',
    textAlign: 'center',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      fontSize: '16px',
      lineHeight: '20px'
    },
    '@media (max-width: 480px)': {
      fontSize: '14px',
      lineHeight: '18px'
    }
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '32px',
    backgroundColor: '#262738',
    color: '#ffff',
    width: '152px',
    height: '56px',
    borderRadius: '4px',
    padding: '16px 32px',
    gap: '8px',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    margin: '30px auto',
    '@media (max-width: 768px)': {
      width: '130px',
      height: '48px',
      padding: '14px 28px',
      fontSize: '14px',
      lineHeight: '20px'
    },
    '@media (max-width: 480px)': {
      width: '120px',
      height: '40px',
      padding: '12px 24px',
      fontSize: '12px',
      lineHeight: '18px'
    },
    '&:hover': {
      color: '#e9e3e3',
      backgroundColor: '#36374b'
    }
  },

  titleWithDescription: {
    title: {
      typography: 'h6',
      color: 'primary.900',
      my: '14px',
      width: '100%',
      maxWidth: '422px',
      height: 'auto',
      fontSize: '24px',
      lineHeight: '28px',
      fontFamily: 'Rubik',
      marginBottom: '10px',
      textAlign: 'center',
      '@media (max-width: 768px)': {
        fontSize: '20px',
        lineHeight: '24px'
      },
      '@media (max-width: 480px)': {
        fontSize: '18px',
        lineHeight: '20px'
      }
    }
  }
}
