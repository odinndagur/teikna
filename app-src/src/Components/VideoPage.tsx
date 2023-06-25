import { useMatch, MakeGenerics, Link } from '@tanstack/react-location'
import { VideoListItem } from './VideoListItem'
import { useQuery } from '@tanstack/react-query'
import { getVideoById } from '../db'
import { Header } from './Header'
import { Footer } from './Footer'
import { YoutubePlayer } from './YoutubePlayer'
import { YoutubeLinkItem } from './YoutubeLinkItem'
import './VideoPage.css'
import { useTranslation } from 'react-i18next'

// select distinct json_object(
//     'sets', json_group_array(
//                 distinct json_object(
//                     'band',band.name,
//                     'video_id',video.id,
//                     'url',video.url,
//                 )),
//     'show_id',video.show_id,
//     'url',video.url,
//     'band_id',video.band_id,
//     'venue',venue.venue_name,
//     'date',show.date
//     ) AS show_json
export function VideoPage() {
    const { t, i18n, ready } = useTranslation()

    type videoGenerics = MakeGenerics<{
        LoaderData: {
            video: {
                band: string
                venue: string
                date: string
                url: string
                members: {
                    name: string
                    id: string | number
                }[]
                video_id: string | number
                show_id: string | number
                band_id: string | number
            }
            show: {
                sets: { band: string; video_id: string | number; url: string }[]
                show_id: string | number
                url: string
                band_id: string | number
                venue: string
                date: Date
            }
            bandVideos: {
                band: string
                venue: string
                date: string
                url: string
                members: {
                    name: string
                    id: string | number
                }[]
                video_id: string | number
                show_id: string | number
                band_id: string | number
            }[]
        }
    }>
    const {
        data: { video, show, bandVideos },
    } = useMatch<videoGenerics>()

    return (
        <>
            <Header></Header>
            {
                video && (
                    <div key={video.video_id}>
                        <div style={{ textAlign: 'center' }}>
                            <h2>
                                {video.band} @ {video.venue}
                            </h2>
                            <p>
                                {new Date(video.date).toLocaleDateString(
                                    i18n.language,
                                    {
                                        dateStyle: 'long',
                                    }
                                )}
                            </p>
                        </div>
                        <YoutubePlayer videoId={video.url} />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '350px',
                                padding: '1rem',
                                margin: 'auto',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Link>{video.band}</Link>
                                <Link>{video.venue}</Link>
                            </div>
                            {/* <ul style={{ padding: 0 }}>
                                <h3 style={{ margin: '0.5rem 0' }}>
                                    {t('band_members')}
                                </h3>
                                {video.members.map((member) => {
                                    return (
                                        <li style={{ padding: '0.2rem 0' }}>
                                            {member.name}
                                        </li>
                                    )
                                })}
                            </ul> */}
                        </div>
                    </div>
                )
                // <VideoListItem video={video} key={video.video_id} />
            }
            <div style={{ padding: '0 1rem' }}>
                <h3>
                    {t('more_sets_from_show', {
                        show: `${show?.venue} ${new Date(
                            show!.date
                        ).toLocaleDateString(i18n.language, {
                            dateStyle: 'long',
                        })}`,
                    })}
                </h3>
                <div
                    className="carousel"
                    // style={{
                    // }}
                >
                    {show?.sets
                        .filter(
                            (set) =>
                                ![
                                    'Grit Teeth',
                                    'Dulvitund',
                                    'Une Misére',
                                ].includes(set.band)
                        )
                        .map((set) => {
                            return (
                                <div
                                    key={set.video_id}
                                    style={{ display: 'block', width: '300px' }}
                                >
                                    <YoutubeLinkItem video={set} />
                                </div>
                            )
                        })}
                </div>
            </div>

            <div style={{ padding: '0 1rem' }}>
                <h3>{t('more_sets_from_band', { band: video?.band })} </h3>
                <div
                    className="carousel"
                    // style={{
                    //     display: 'grid',
                    //     gridTemplateColumns: 'repeat(1fr)',
                    //     // gridTemplateAreas: 'overlap',
                    //     gridAutoFlow: 'column',
                    //     // gridTemplateRows: '300px',
                    //     gap: '1rem',
                    //     width: '100%',
                    //     overflowX: 'scroll',
                    // }}
                >
                    {bandVideos
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
                                    style={{ display: 'block', width: '300px' }}
                                >
                                    <YoutubeLinkItem video={video} />
                                </div>
                            )
                        })}
                </div>
            </div>
            <Footer />
        </>
    )
}
