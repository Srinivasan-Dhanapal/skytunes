import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
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
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const Sidebar: React.FC<ISidebar> = () => {
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <AppDrawer className={styles.glassy} variant="permanent" open={open}>
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
      <Divider />
      <List component="nav">
        <Divider sx={{ my: 1 }} />
      </List>
    </AppDrawer>
  )
}

export default Sidebar
