import YouTube from 'react-youtube'
import './YoutubePlayer.css'
import { useEffect, useRef, useState } from 'react'
import { useIsVisible } from './useIsVisible'
import { YoutubeThumbnail } from './YoutubeThumbnail'

const isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') == -1 &&
    navigator.userAgent.indexOf('FxiOS') == -1

export function YoutubePlayer(props: any) {
    // const playVideo = () => {
    //     if (target) {
    //         target.playVideo()
    //     } else {
    //         setTimeout(() => {
    //             playVideo()
    //         }, 50)
    //     }
    // }

    const [playerReady, setPlayerReady] = useState(false)
    const [playerReadyCount, setPlayerReadyCount] = useState(0)
    const [showThumbnail, setShowThumbnail] = useState(true)
    const [target, setTarget] = useState()

    const playerRef = useRef()
    const visibleRef = useRef()
    const isVisible = useIsVisible(visibleRef)

    const hiResUrl = `https://i.ytimg.com/vi/${props.videoId}/maxresdefault.jpg`
    const mdResUrl = `https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg`
    const altUrl = `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`
    const [thumbnailUrl, setThumbnailUrl] = useState(hiResUrl)

    const playVideo = () => {
        if (!isVisible) {
            return
        }
        if (isSafari) {
            target.playVideo()
            setShowThumbnail(false)
        } else {
            setShowThumbnail(false)
            target.playVideo()
        }
        // playerRef?.focus()
        // document.getElementById(target.g).focus()
        // console.log(target)
    }

    // src={`https://i.ytimg.com/vi/${props.videoId}/maxresdefault.jpg`}
    // src={`https://img.youtube.com/vi/${props.videoId}/maxresdefault.jpg`}

    const opts = {
        // height: '390',
        // width: '640',
        width: '853',
        height: '480',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            // autoplay: isSafari ? 0 : 1,
            modestbranding: 1,
            mute: 0,
            rel: 0,
            loop: 1,
            playlist: props.videoId,
            // playsinline: isSafari ? 0 : 1,
            controls: 1,
            // fullscreen: 1,
            // origin: 'https://odinndagur.github.io/',
            origin: window.location.pathname,
        },
    }
    return (
        <>
            {/* {target && (
                <button onClick={() => target.playVideo()}>Play?</button>
            )}
            {target && (
                <button onClick={() => target.pauseVideo()}>Pause?</button>
            )} */}
            <div
                className="video-container"
                ref={visibleRef}
                // style={{ visibility: playerReady ? undefined : 'hidden' }}
            >
                <div className="video-responsive" style={{}}>
                    {isVisible && (
                        <YouTube
                            ref={playerRef}
                            // className="video-responsive"
                            iframeClassName="video-responsive"
                            {...props}
                            opts={opts}
                            onReady={(ev) => {
                                setTarget(ev.target)
                                setPlayerReady(true)
                                setPlayerReadyCount((count) => count + 1)
                            }}
                            onError={() => console.log('ERROR')}
                            style={{
                                visibility: showThumbnail
                                    ? 'hidden'
                                    : undefined,
                            }}
                            key={playerReady ? 'playerReady' : 'playerNotReady'}
                        />
                    )}
                    <YoutubeThumbnail
                        youtubeId={props.videoId}
                        showThumbnail={showThumbnail}
                        onClick={playVideo}
                        showPlayButton
                        playerReadyCount={playerReadyCount}
                    />
                </div>
            </div>
        </>
    )
}
// ?mute=1&rel=0&loop=1&playlist=${embedId}&controls=0&playsinline=0&modestbranding=1&origin=https://odinndagur.github.io/
