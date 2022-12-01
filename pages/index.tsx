
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import * as React from 'react'
import useSWR, { SWRConfig } from 'swr'
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import CollasiblePanel from '../components/ui-components/CollapsiblePanel'
import { NextPageWithLayout } from './page'

const fetcher = (arg: any, ...args: any) => fetch(arg, ...args).then((res) => res.json())
const ALBUMS_API = '/api/albums';

export async function getServerSideProps(context: any) {
  const NextRequestMetaSymbol = Reflect.ownKeys(context.req).find(key => key.toString() === 'Symbol(NextRequestMeta)');
  const serverURL = NextRequestMetaSymbol && context.req[NextRequestMetaSymbol].__NEXT_INIT_URL;
  const albumsInfo = await fetcher(serverURL + ALBUMS_API);
  return {
    props: {
      fallback: {
        [ALBUMS_API]: albumsInfo
      }
    }
  };
}

function HomeTemplate() {
  const { data, error } = useSWR(ALBUMS_API)

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
                <Card sx={{ width: 340 }} className='glassy' elevation={2}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        {album.title.trim().charAt(0)}
                      </Avatar>
                    }
                    title={album.title.trim()}
                    subheader={album.releaseDate}
                  />
                  <Box sx={{ position: 'relative', height: '170px' }}>
                    <Image
                      className="album-thumbnail"
                      src={album.thumbnail}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt="Music Cover"
                    />
                  </Box>
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
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

const Home: NextPageWithLayout = ({ ...props }) => {
  const { fallback }: { fallback?: any } = props;
  return (
    <SWRConfig value={{ fallback }}>
      <HomeTemplate />
    </SWRConfig>
  )
}

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

export default Home