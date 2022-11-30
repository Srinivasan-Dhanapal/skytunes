import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import MenuToggleContext from '../../../store/context/MenuToggle';
import styles from './Sidebar.module.css';
export interface ISidebar extends React.ComponentPropsWithoutRef<'div'> { }
interface DrawerProps extends MuiDrawerProps {
  open?: boolean
}
const drawerWidth: number = 240
const AppDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    background: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    }),
  },
}))

const Sidebar: React.FC<ISidebar> = () => {
  const context = React.useContext(MenuToggleContext)
  const toggleDrawer = () => {
    context.setMenuToggleContext(!context.menuToggleContext)
  };
  return (
    <AppDrawer className={styles.glassy} variant="permanent" open={context.menuToggleContext} sx={{ position: 'fixed', height: '100vh', zIndex: 1200 }}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <List component="nav">
      </List>
    </AppDrawer>
  )
}

export default Sidebar
