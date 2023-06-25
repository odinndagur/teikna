import { useEffect, useState } from 'react'
import { YoutubePlayer } from './YoutubePlayer'

export function VideoListItem({ video }) {
    const [dateString, setDateString] = useState('')
    useEffect(() => {
        const date = new Date(video.date)
        // console.log(video.date, date)
        setDateString(date.toLocaleDateString('is', { dateStyle: 'medium' }))
    }, [])
    return (
        <div
            style={{
                padding: '2rem',
                margin: '1rem',
                boxShadow: 'var(--card-box-shadow)',
            }}
        >
            <h2>
                {video.band} @ {video.venue}
            </h2>
            <i>{dateString}</i>
            <YoutubePlayer videoId={video.url} />
        </div>
    )
}
