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
      default: 'white',
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
}

const glassyDefault = {
  ...commonDefault,
  palette: {
    background: {
      default: '#02AAB0',
    },
    primary: {
      main: '#0288d1',
    },
    secondary: {
      main: '#FAFAFA',
    },
    error: {
      main: '#ff4081',
    },
  },
}

export { lightDefault, glassyDefault }
