import { useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { SlideshowSettings } from './SlideshowSettings'

export function ImagePlayerControls({
    nextImage,
    prevImage,
    seconds,
    rotation,
    setTimeLeft,
}: {
    nextImage: any
    prevImage: any
    seconds?: number
    rotation?: number
    setTimeLeft: any
}) {
    const [totalSeconds, setTotalSeconds] = useLocalStorage(
        'seconds-per-image',
        30
    )
    const [isPlaying, setIsPlaying] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(seconds ?? totalSeconds)
    function togglePlayer() {
        setIsPlaying((old) => !old)
        setSecondsLeft(totalSeconds ?? seconds)
    }
    useEffect(() => {
        // setTotalSeconds(15)
        if (isPlaying) {
            if (secondsLeft <= 0) {
                setSecondsLeft(totalSeconds ?? seconds)
                setTimeLeft(totalSeconds ?? seconds)
                nextImage()
            }
            const timer =
                secondsLeft > 0 &&
                setInterval(() => {
                    setTimeLeft((old) => old - 1)

                    setSecondsLeft((old) => old - 1)
                }, 1000)
            return () => clearInterval(timer)
        }
    }, [secondsLeft, isPlaying, totalSeconds])

    const formattedTimeLeft = useMemo(() => {
        const minutes = Math.floor(secondsLeft / 60)
        const seconds = secondsLeft - minutes * 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
            2,
            '0'
        )}`
    }, [secondsLeft])
    return (
        <>
            <SlideshowSettings />
            <button
                style={{
                    height: '50px',
                    zIndex: 5,
                    minWidth: isPlaying ? '8rem' : undefined,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
                onClick={() => {
                    togglePlayer()
                }}
            >
                {' '}
                <span className="material-icons">
                    {!isPlaying ? 'play_arrow' : 'pause'}
                </span>
                {isPlaying && <span>{formattedTimeLeft}</span>}
            </button>
        </>
    )
}
