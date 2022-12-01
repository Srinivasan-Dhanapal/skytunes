import { CacheProvider, EmotionCache } from '@emotion/react'
import FitbitIcon from '@mui/icons-material/Fitbit'
import LightModeIcon from '@mui/icons-material/LightMode'
import CssBaseline from '@mui/material/CssBaseline'

import {
  createTheme, IconButton,
  PaletteMode, ThemeProvider,
  Tooltip
} from '@mui/material'
import Fab from '@mui/material/Fab'
import { motion, useScroll, useSpring } from "framer-motion"

import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import ThemeSwitcherContext from '../store/context/ThemeSwitcher'
import '../styles/globals.css'
import { glassyDefault, lightDefault } from '../theme'
import createEmotionCache from '../theme/cache'
import { NextPageWithLayout } from './page'

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const PaletteModeReverse = (currentMode: PaletteMode) =>
  currentMode === 'light' ? 'dark' : 'light'

function ModeSwitcher() {
  const context = React.useContext(ThemeSwitcherContext)
  return (
    <Tooltip title={`${context.themeContext === 'light' ? 'Glassy' : 'Light'} Mode`}>
      <Fab
        component="div"
        onClick={() => { context.setThemeContext(PaletteModeReverse(context.themeContext)) }}
        size="medium"
        variant="circular"
        sx={{
          borderRadius: 0,
          borderTopLeftRadius: '50%',
          borderBottomLeftRadius: '50%',
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '4px',
          top: '25%',
          position: 'fixed',
          right: 10,
        }}
      >
        <IconButton color="inherit" size="large" disableRipple>
          {context.themeContext === 'dark' ? (
            <LightModeIcon />
          ) : (
              <FitbitIcon />
          )}
        </IconButton>
      </Fab>
    </Tooltip>
  )
}

function MyApp(props: AppPropsWithLayout) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  const [themeContext, setThemeContext] = React.useState<PaletteMode>('light');

  const theme = React.useMemo(() => {
    const themeChange = themeContext === 'light' ? lightDefault : glassyDefault
    return createTheme(themeChange)
  }, [themeContext])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <ThemeSwitcherContext.Provider value={{ themeContext, setThemeContext }}>
        <ThemeProvider theme={theme}>
          <motion.div className="progress-bar" style={{ scaleX }} />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ModeSwitcher />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </ThemeSwitcherContext.Provider>
    </CacheProvider>
  )
}

export default MyApp
