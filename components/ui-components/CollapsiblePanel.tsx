import Download from '@mui/icons-material/Download'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Collapse from '@mui/material/Collapse'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React from 'react'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))
export interface ICollapsible extends React.ComponentPropsWithoutRef<'div'> {
  category: string
  link: string
  rights: string
}

const CollapsiblePanel: React.FC<ICollapsible> = ({ ...divProps }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Download />
        </IconButton>
        <a target="_blank" href={divProps.link} rel="noopener noreferrer">
          <IconButton aria-label="share">
            <OpenInNewIcon />
          </IconButton>
        </a>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" gutterBottom>
            {divProps.category}
          </Typography>
          <Typography paragraph>
            {divProps.rights}
          </Typography>
        </CardContent>
      </Collapse>
    </>

  )

}
export default CollapsiblePanel