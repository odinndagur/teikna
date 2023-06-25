import { useEffect, useState } from 'react'
import { Header } from './Header'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useSearch } from '@tanstack/react-location'
import { YoutubePlayer } from './YoutubePlayer'
import { VideoListItem } from './VideoListItem'
import { Footer } from './Footer'
import './VideoListPage.css'
import { YoutubeThumbnail } from './YoutubeThumbnail'
import { YoutubeLinkItem } from './YoutubeLinkItem'
import { useTranslation } from 'react-i18next'
import { Grid } from './Grid'

export function VideoListPage() {
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

    const { data: videos, isLoading } = useQuery({
        queryFn: () => searchVideos({ searchQuery: searchValue }),
        queryKey: ['videos', searchValue],
    })
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
                        placeholder={t('search_for_a_video')}
                        value={searchValue}
                        // style={{ height: '100%' }}
                        // ref={inputRef}
                    />
                </div>
            </Header>
            {videos && (
                <Grid>
                    {/* <div className="video-grid"> */}
                    {videos
                        .filter(
                            (video) =>
                                ![
                                    'Grit Teeth',
                                    'Dulvitund',
                                    'Une Misére',
                                ].includes(video.band)
                        )
                        .map((video) => {
                            return (
                                <YoutubeLinkItem video={video} key={video.id} />
                            )
                        })}
                    {/* </div> */}
                </Grid>
            )}
            <Footer />
        </>
    )
}
