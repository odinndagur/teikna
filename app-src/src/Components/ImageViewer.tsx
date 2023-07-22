import { useEffect, useRef, useState } from 'react'
import { Grid } from './Grid'
import './MoviePage.css'
import { ImageElement } from './ImageElement'
import { useSearch } from '@tanstack/react-location'
import { useVirtualizer } from '@tanstack/react-virtual'

export function ImageViewer({
    images,
    movieId,
    collectionId,
}: {
    images: string[]
    movieId?: number | string
    collectionId?: number | string
}) {
    const { idx: currentImageIdx } = useSearch()
    useEffect(() => {
        setTimeout(() => {
            if (currentImageIdx) {
                const gridEl = document.getElementById('images-grid')
                gridEl?.children[Number(currentImageIdx)]?.scrollIntoView()
            }
        }, 200)
    }, [currentImageIdx, images])
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

    const [lanes, setLanes] = useState<number>()
    useEffect(() => {
        setLanes(Math.floor((window.innerWidth - 200) / 300))
    }, [window.innerWidth])

    const imageListRef = useRef(null)
    const rowVirtualizer = useVirtualizer({
        count: Number(images.length),
        getScrollElement: () => imageListRef.current,
        estimateSize: () => 50,
        overscan: 60,
        debug: import.meta.env.MODE == 'development',
        lanes: lanes,

        // scrollToFn
    })

    return (
        <Grid id={'images-grid'} divRef={imageListRef}>
            {/* <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 10000,
                    fontSize: '20rem',
                }}
            >
                {Math.floor((window.innerWidth - 200) / 300)}
            </div> */}
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                const idx = virtualItem.index
                const img = images[idx]
                return (
                    // <div
                    //     style={{
                    //         // position: 'absolute',
                    //         // top: 0,
                    //         // left: 0,
                    //         // width: '100%',
                    //         // height: `${virtualItem.size}px`,
                    //         transform: `translateY(${Math.floor(
                    //             virtualItem.index / lanes
                    //         )}px)`,
                    //         // boxShadow: 'var(--card-box-shadow)',
                    //         // borderBottom:
                    //         //     '1px solid var(--main-text-color)',
                    //         // padding: '1rem',
                    //         // boxSizing: 'border-box',
                    //     }}
                    // >
                    //     <p>{virtualItem.lane}</p>

                    <ImageElement
                        // key={img + idx}
                        key={virtualItem.key}
                        img={img}
                        selectImage={() => setSelectedIndex(idx)}
                        idx={idx}
                        movieId={movieId}
                        collectionId={collectionId}
                        style={{
                            transform: `translateY(${Math.floor(
                                virtualItem.index / lanes
                            )}px)`,
                        }}
                    />
                    // </div>
                )
            })}
            {/* {images?.map((img, idx) => {
                return (
                    <ImageElement
                        key={img + idx}
                        img={img}
                        selectImage={() => setSelectedIndex(idx)}
                        idx={idx}
                        movieId={movieId}
                        collectionId={collectionId}
                    />
                )
            })} */}
            {/* <ImageModal
                images={images}
                idx={selectedIndex}
                selectImage={(idx: number) => setSelectedIndex(idx)}
                // img={img}
            /> */}
        </Grid>
    )
}
