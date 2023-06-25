import { Header } from './Header'
import './Home.css'
import { Footer } from './Footer'
import './VideoPage.css'
import { YoutubeLinkItem } from './YoutubeLinkItem'
import { useTranslation } from 'react-i18next'
import { MakeGenerics, useMatch } from '@tanstack/react-location'
import { useEffect, useState } from 'react'
import { ShowCard } from './ShowCard'
import { Carousel } from './Carousel'
import { ShowCardAlternate } from './ShowCardAlternate'
type loaderGenerics = MakeGenerics<{
  LoaderData: {
    shows: {
      name: string
      date: Date
      bands: string[]
      venue: string
      image: string
    }[]
    recentVideos: {
      band: string
      members: { name: string; id: string | number }
      video_id: string | number
      show_id: string | number
      url: string
      band_id: string | number
      venue: string
      date: string | Date
    }[]
  }
}>

export function HomePage() {
  const {
    data: { shows, recentVideos },
  } = useMatch<loaderGenerics>()

  const { t, i18n, ready } = useTranslation()

  return (
    <div>
      <Header></Header>

      <div style={{ padding: '0 1rem' }}>
        <h3
          style={{
            padding: '0 1rem',
          }}
        >
          {t('upcoming_shows')}
        </h3>
        <Carousel>
          {shows
            ?.filter((show) => show.date > new Date())
            .map((show, idx) => {
              return (
                <ShowCardAlternate show={show} id={show.name} />
              )
            })}
        </Carousel>

        <div style={{ padding: '0 1rem' }}>
          <h3 style={{ padding: '0 1rem' }}>{t('recent_shows')}</h3>
          <Carousel>
            {/* {JSON.stringify(shows)} */}
            {shows
              ?.filter((show) => show.date < new Date())
              .sort((a, b) => b.date - a.date)
              .map((show, idx) => {
                return <ShowCardAlternate show={show} />
              })}
          </Carousel>
        </div>
      </div>
      <div style={{ padding: '0 1rem' }}>
        <h3>{t('recent_videos')}</h3>
        <Carousel>
          {recentVideos
            ?.filter(
              (video) =>
                ![
                  'Grit Teeth',
                  'Dulvitund',
                  'Une Misére',
                ].includes(video.band)
            )
            .map((video) => {
              return (
                <div
                  key={video.video_id}
                  style={{
                    display: 'block',
                    width: '300px',
                    scrollSnapAlign: 'center',
                  }}
                >
                  <YoutubeLinkItem video={video} />
                </div>
              )
            })}
        </Carousel>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
