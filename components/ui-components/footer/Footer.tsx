import DownloadIcon from '@mui/icons-material/Download'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import { useRouter } from "next/router"
import * as React from 'react'
import { UrlObject } from 'url'
import styles from './Footer.module.css'
export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> { }

const Footer: React.FC<IFooter> = () => {
  const router = useRouter();
  const onLink = (href: string | UrlObject) => {
    router.push(href);
  };
  const toolbarConfigs = [
    { label: "Home", pathname: '/', icon: <HomeIcon /> },
    { label: "Favorites", pathname: '/favourites', icon: <FavoriteIcon /> },
    { label: "Downloads", pathname: '/downloads', icon: <DownloadIcon /> }
  ];
  const pathIndex = toolbarConfigs.findIndex((item) => item.pathname === router.pathname);
  return (
    <Paper component="footer" className={styles.glassy} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1300 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={pathIndex}
        className={styles.transparent_bg}
      >
        {
          toolbarConfigs.map((item, index) => (
            <BottomNavigationAction label={item.label} onClick={() => onLink(item.pathname)} icon={item.icon} key={index} />
          ))
        }
      </BottomNavigation>
    </Paper>

  );
};

export default Footer;