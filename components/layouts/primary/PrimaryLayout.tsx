import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import * as React from 'react'
import Footer from '../../ui-components/footer/Footer'
import Header from '../../ui-components/header/Header'
import Sidebar from '../../ui-components/sidebar/Sidebar'


export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> { }

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, ...divProps }) => {

  return (
    <Box {...divProps} sx={{ display: 'flex', flexDirection: 'column', }}>
      <Header />
      <Box component="main" sx={{ display: 'flex', flexDirection: 'row', width: '100%', position: 'absolute' }}>
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {children}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>

  )
}

export default PrimaryLayout
