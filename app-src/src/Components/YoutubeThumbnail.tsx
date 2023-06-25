import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { useIsVisible } from './useIsVisible'

export function YoutubeThumbnail({
    youtubeId,
    showThumbnail = true,
    showPlayButton,
    onClick,
    playerReadyCount,
}: {
    youtubeId: string
    showThumbnail: boolean
    showPlayButton?: boolean
    onClick?: MouseEventHandler
    playerReadyCount?: number
}) {
    const hiResUrl = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
    const mdResUrl = `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`
    const altUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    const [thumbnailUrl, setThumbnailUrl] = useState(hiResUrl)

    const [thumbnailReady, setThumbnailReady] = useState(false)

    return (
        <>
            {/* // <div className="video-container"> */}
            {/* <div> */}
            <img
                className={showPlayButton ? '' : 'video-responsive'}
                src={thumbnailUrl}
                // src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                // alt={`Myndband sem sýnir táknið ${props.title}`}
                // onError={(ev) => (ev.target.src = altUrl)}

                onLoadCapture={(ev) => {
                    if (ev.currentTarget.naturalHeight <= 90) {
                        setThumbnailUrl(altUrl)
                    } else {
                        setThumbnailReady(true)
                    }
                    // console.log('naturalwidth', ev.target.naturalHeight)
                }}
                onClick={onClick}
                style={{
                    objectFit: 'cover',
                    width: '100%',
                    // display: playerReadyCount >= 2 ? 'none' : undefined,
                    display:
                        thumbnailReady && showThumbnail ? undefined : 'none',
                }}
            />
            {showPlayButton && showThumbnail && (
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <span
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%,-50%)',
                            msTransform: 'translate(-50%,-50%)',
                            textAlign: 'center',
                            fontSize: '8em',
                            color: `rgba(255,255,255,${
                                playerReadyCount > 1 ? '0.7' : '0.3'
                            })`,
                            cursor: 'pointer',
                        }}
                        tabIndex={0}
                        className="material-icons"
                        onClick={onClick}
                    >
                        play_circle
                    </span>
                    <span
                        className="spin"
                        style={{
                            display: playerReadyCount > 1 ? 'none' : undefined,
                            position: 'absolute',
                            textAlign: 'center',
                            fontSize: '8em',
                            color: 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                        }}
                    ></span>
                </span>
            )}
            {/* </div> */}
            {/* </div> */}
        </>
    )
}
