import { Link } from '@tanstack/react-location'
import { YoutubeThumbnail } from './YoutubeThumbnail'
import { useTranslation } from 'react-i18next'

export function YoutubeLinkItem({ video }) {
    const { t, i18n, ready } = useTranslation()

    return (
        <Link
            className="button"
            to={`/videos/${video.video_id}`}
            style={{ scrollSnapAlign: 'center', padding: 0, margin: 0 }}
        >
            <div>
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <YoutubeThumbnail youtubeId={video.url} showThumbnail />
                    <div
                        className="thumbnail-info"
                        style={{
                            backgroundColor:
                                'var(--background-color-dark-alpha)',
                            width: 'calc(100% - 2rem)',
                            backdropFilter: 'blur(3px)',
                            borderRadius: '10px',
                            WebkitBackdropFilter: 'blur(3px)',
                            position: 'absolute',
                            bottom: 0,
                            color: 'var(--main-text-color-dark)',
                            padding: '1rem',
                            textAlign: 'left',
                        }}
                    >
                        <h2
                            style={{
                                padding: 0,
                                margin: '0.3rem 0',
                            }}
                        >
                            {video.band}
                        </h2>
                        <div>
                            <div>
                                {new Date(video.date).toLocaleDateString(
                                    i18n.language,
                                    {
                                        dateStyle: 'long',
                                    }
                                )}
                            </div>
                            <div>{video.venue}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <VideoListItem
    key={video.video_id}
    video={video}
/> */}
        </Link>
    )
}
