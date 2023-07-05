import { useEffect, useRef, useState } from 'react'
import { Grid } from './Grid'
import './MoviePage.css'
import { ImageElement } from './ImageElement'

export function ImageViewerSubreddit({
    images,
    movieId,
    collectionId,
}: {
    images: string[]
    movieId?: number | string
    collectionId?: number | string
}) {
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const prevImage = () => {
        if (images && selectedIndex > 0) {
            setSelectedIndex((old) => Math.max(0, old - 1))
        }
    }
    const nextImage = () => {
        if (images && selectedIndex < images.length - 1) {
            setSelectedIndex((old) => Math.min(images.length - 1, old + 1))
        }
    }
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.code == 'ArrowLeft') {
                e.preventDefault()
                prevImage()
                // console.log('back arrow', selectedIndex)
                // if (images && selectedIndex > 0) {
                //     setSelectedIndex((old) => Math.max(0, old - 1))
                // }
            }
            if (e.code == 'ArrowRight') {
                e.preventDefault()
                nextImage()
                // console.log('front arrow', selectedIndex)
                // if (images && selectedIndex < images.length - 1) {
                //     setSelectedIndex((old) => Math.min(images.length, old + 1))
                // }
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    return (
        <Grid>
            {images?.map((img, idx) => {
                return (
                    <ImageElement
                        images={images}
                        key={img + idx}
                        img={img}
                        selectImage={() => setSelectedIndex(idx)}
                        idx={idx}
                    />
                )
            })}
            {/* <ImageModal
                images={images}
                idx={selectedIndex}
                selectImage={(idx: number) => setSelectedIndex(idx)}
                // img={img}
            /> */}
        </Grid>
    )
}
