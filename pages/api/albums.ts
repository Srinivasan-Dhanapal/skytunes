// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { UrlObject } from 'url'

type Album = {
  'im:name': {
    label: string
  }
  'im:image': {
    label: UrlObject
    attributes: {
      height: number
    }
  }[]
  'im:itemCount': {
    label: number
  }
  'im:price': {
    label: string
    attributes: {
      amount: number
      currency: string
    }
  }
  'im:contentType': {
    'im:contentType': {
      attributes: {
        term: string
        label: string
      }
    }
    attributes: {
      term: string
      label: string
    }
  }
  rights: {
    label: string
  }
  title: {
    label: string
  }
  link: {
    attributes: {
      rel: string
      type: string
      href: UrlObject
    }
  }
  id: {
    label: UrlObject
    attributes: {
      'im:id': number
    }
  }
  'im:artist': {
    label: string
    attributes: {
      href: UrlObject
    }
  }
  category: {
    attributes: {
      'im:id': number
      term: string
      scheme: UrlObject
      label: string
    }
  }
  'im:releaseDate': {
    label: Date
    attributes: {
      label: string
    }
  }
}
type AlbumResponse = {
  title: string
  thumbnail: UrlObject
  available: number
  price: string
  rights: string
  link: UrlObject
  id: number
  artist: string
  category: string
  releaseDate: string
}
type FetchData = {
  feed: {
    author: {
      name: {
        label: string
      }
      uri: UrlObject
    }
    entry: Album[]
    updated: {
      label: Date
    }
    rights: {
      label: string
    }
    title: {
      label: string
    }
    icon: {
      label: string
    }
    link: [
      {
        attributes: {
          rel: string
          type: string
          href: UrlObject
        }
      },
      {
        attributes: {
          rel: string
          href: UrlObject
        }
      }
    ]
    id: {
      label: UrlObject
    }
  }
}

type ApiResponse = {
  albums: AlbumResponse[]
  title: string
  author: string
  rights: string
  updated: Date
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { limit = 100 },
    method,
  } = req
  if (method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end()
  }

  const response = await fetch(`${process.env.ALBUMS_URI}/limit=${limit}/json`)
  if (response.ok) {
    const fetchData: FetchData = await response.json()
    const albums: AlbumResponse[] = fetchData.feed.entry.map((album: Album) => {
      const {
        'im:name': { label: title },
        'im:image': thumbnails,
        'im:itemCount': { label: available },
        'im:price': { label: price },
        rights: { label: rights },
        link: {
          attributes: { href: link },
        },
        id: {
          attributes: { 'im:id': id },
        },
        'im:artist': { label: artist },
        category: {
          attributes: { label: category },
        },
        'im:releaseDate': {
          attributes: { label: releaseDate },
        },
      } = album
      const thumnailObj = (thumbnails as [])?.at(-1)
      /* @ts-ignore */
      const thumbnail: UrlObject = thumnailObj?.label
      return {
        title,
        thumbnail,
        available,
        price,
        rights,
        link,
        id,
        artist,
        category,
        releaseDate,
      }
    })
    const resultData: ApiResponse = {
      albums,
      title: fetchData.feed.title.label,
      author: fetchData.feed.author.name.label,
      rights: fetchData.feed.rights.label,
      updated: fetchData.feed.updated.label,
    }
    // Cache the Albums response for 3 seconds
    // res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate')

    res.status(200).json(resultData)
  } else {
    res.status(400).json({
      errors: [
        {
          message: `Fetch to the Albums API failed with code: ${response.status}`,
        },
      ],
    })
  }
}
