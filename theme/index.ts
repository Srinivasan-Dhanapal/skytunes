import { Roboto } from '@next/font/google'
export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

const commonDefault = {
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
}

const lightDefault = {
  ...commonDefault,
  palette: {
    background: {
      default: '#00CDAC',
    },
    primary: {
      main: '#3d5afe',
    },
    secondary: {
      main: '#7e57c2',
    },
    error: {
      main: '#ff4081',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#000000de',
          height: '100vh',
          background: 'linear-gradient(to right, #FAFAFA, #FAFAFA)',
        },
      },
    },
  },
}

const glassyDefault = {
  ...commonDefault,
  palette: {
    background: {
      default: '#ebf4f5',
    },
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#000000de',
    },
    error: {
      main: '#ff4081',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#FAFAFA',
          height: '100vh',
          background: 'linear-gradient(to right, #02AAB0, #00CDAC)',
        },
      },
    },
  },
}

export { lightDefault, glassyDefault }
