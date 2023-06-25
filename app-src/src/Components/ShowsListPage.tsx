import { useEffect, useState } from 'react'
import { Header } from './Header'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getShowsDataFromSheets, searchBands, searchVideos } from '../db'
import {
  Link,
  useMatch,
  useNavigate,
  useSearch,
} from '@tanstack/react-location'
import { YoutubePlayer } from './YoutubePlayer'
import { VideoListItem } from './VideoListItem'
import { Footer } from './Footer'
import './VideoListPage.css'
import { YoutubeThumbnail } from './YoutubeThumbnail'
import { YoutubeLinkItem } from './YoutubeLinkItem'
import { useTranslation } from 'react-i18next'
import { Grid } from './Grid'
import { ShowCard } from './ShowCard'
import { ShowCardAlternate } from './ShowCardAlternate'

export function ShowsListPage() {
  const navigate = useNavigate()
  const searchParams = useSearch()
  const [searchValue, setSearchValue] = useState('')
  const { t, i18n, ready } = useTranslation()

  useEffect(() => {
    setTimeout(() => {
      setSearchValue(searchParams.query ?? '')
    }, 50)
  }, [])
  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue)
    navigate({
      search: (old) => ({ ...old, query: searchValue }),
      replace: true,
    })
  }
  const {
    data: { shows },
  } = useMatch()

  // const { data: shows, isLoading } = useQuery({
  //     queryFn: () => getShowsDataFromSheets(),
  //     queryKey: ['shows'],
  // })
  // if (isLoading) {
  //     return
  // }
  return (
    <>
      <Header>
        <div
          className="search"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <input
            onChange={(event) => handleSearch(event.target.value)}
            type="search"
            placeholder={t('search_for_a_show')}
            value={searchValue}
          // style={{ height: '100%' }}
          // ref={inputRef}
          />
        </div>
      </Header>
      {shows && (
        <Grid>
          {/* <div className="video-grid"> */}
          {shows
            .filter((show) =>
              JSON.stringify(show)
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase())
            )
            .sort((a, b) => b.date - a.date)
            .map((show) => {
              return <ShowCardAlternate show={show} />
            })}
          {/* </div> */}
        </Grid>
      )}
      <Footer />
    </>
  )
}
