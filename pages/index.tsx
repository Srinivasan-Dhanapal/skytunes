
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import useSWR from 'swr'
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import CollasiblePanel from '../components/ui-components/CollapsiblePanel'
import { NextPageWithLayout } from './page'

const fetcher = (arg: any, ...args: any) => fetch(arg, ...args).then((res) => res.json())

const Home: NextPageWithLayout = () => {

  const ElevatedCard = styled(Card)`
  ${({ theme }) => `
  transition: ${theme.transitions.create(['transform'], {
    duration: 500,
  })};
  &:hover {
    transform: scale(1.05);
  }
  `}
`;
  const { data, error } = useSWR('/api/albums', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom align="center">
        {`${data.title} Welcomes you!!!`}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {`Author: ${data.author}`}
      </Typography>
      <Typography gutterBottom paragraph>
        {`Terms: ${data.rights}`}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {data.albums.map((album: {
            category: string; rights: string; artist: string; link: string; title: string; releaseDate: string; thumbnail: string; price: string; available: number
          }, index: React.Key) => (
            <Grid key={index} item >
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <ElevatedCard sx={{ width: 340 }} className='glassy' elevation={2}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        {album.title.trim().charAt(0)}
                      </Avatar>
                    }
                    title={album.title.trim()}
                    subheader={album.releaseDate}
                  />
                  <CardMedia
                    component="img"
                    height="170"
                    image={album.thumbnail}
                    alt="Music Cover"
                  />
                  <CardContent>
                    <Typography variant="h4" color="text.success" gutterBottom>
                      {album.price}
                    </Typography>
                    <Typography variant="caption" paragraph>
                      {album.available ? `Only ${album.available} available` : 'Sold out'}
                    </Typography>
                    <Typography variant="subtitle2">
                      {album.artist}
                    </Typography>
                  </CardContent>
                  <CollasiblePanel link={album.link} category={album.category} rights={album.rights} />
                </ElevatedCard>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Home

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
