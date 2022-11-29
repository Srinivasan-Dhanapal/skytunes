import ArchiveIcon from '@mui/icons-material/Archive';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import styles from './Footer.module.css';

export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> { }

const Footer: React.FC<IFooter> = () => {
  const [value, setValue] = React.useState(0);
  return (
    <Paper component="footer" className={styles.glassy} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1300, background: 'none' }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        className={styles.transparent_bg}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>

  );
};

export default Footer;