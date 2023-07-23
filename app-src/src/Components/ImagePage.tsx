import {
    Link,
    useLocation,
    useMatch,
    useNavigate,
    useRouter,
    useSearch,
} from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useUserCollection } from './useUserCollection'
import { ImagePlayerControls } from './ImagePlayerControls'
import { spliceNoMutate } from './spliceNoMutate'
import { SlideshowSettings } from './SlideshowSettings'
import { GridOverlay } from './GridOverlay'
import { CenterLineOverlay } from './CenterLineOverlay'

export function RotateButton({ setRotation }) {
    const [shouldReset, setShouldReset] = useState(false)

    const [timeoutId, setTimeoutId] = useState<number>()

    return (
        <button
            onClick={(ev) => {
                ev.preventDefault()
                const newTimeoutId = setTimeout(
                    () => setShouldReset(true),
                    9000
                )
                setTimeoutId(newTimeoutId)
                if (shouldReset) {
                    setRotation((old) => (old == 0 ? 1 : 0))
                } else {
                    setRotation((old) => (old + 1) % 4)
                }
                setShouldReset(false)
                timeoutId && clearTimeout(timeoutId)
            }}
            style={{
                height: '50px',
                zIndex: 5,
            }}
            className="material-icons"
        >
            rotate_right
        </button>
    )
}

export function ImagePage() {
    // const [imgContainerScale, setImgContainerScale] = useState(1.7)
    const [touchPosition, setTouchPosition] = useState<{
        touchDownX: number
        touchDownY: number
    }>(null)

    const handleTouchStart = (e: TouchEvent) => {
        const touchDownX = e.touches[0].clientX
        const touchDownY = e.touches[0].clientY
        setTouchPosition({ touchDownX, touchDownY })
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition
        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0]
        const diffX = touchDown.touchDownX - currentTouch.clientX
        const diffY = touchDown.touchDownY - currentTouch.clientY

        // alert(JSON.stringify({ rotation, diffX, diffY }))
        switch (rotation) {
            case 0:
                if (diffX > 5) {
                    nextImage()
                }

                if (diffX < -5) {
                    prevImage()
                }
                break
            case 1:
                if (diffY > 5) {
                    nextImage()
                }

                if (diffY < -5) {
                    prevImage()
                }
                break
            case 2:
                if (diffX > 5) {
                    prevImage()
                }

                if (diffX < -5) {
                    nextImage()
                }
                break
            case 3:
                if (diffY > 5) {
                    prevImage()
                }

                if (diffY < -5) {
                    nextImage()
                }
                break
        }
        if (rotation == 0) {
            if (diffX > 5) {
                nextImage()
            }

            if (diffX < -5) {
                prevImage()
            }
        }

        setTouchPosition(null)
    }

    const [img, setImg] = useState('')
    const [showImageTimer, setShowImageTimer] = useState(true)
    const [timeLeft, setTimeLeft] = useState('')
    // const {
    //     data: { currentImage },
    // } = useMatch()
    const { collectionId, idx, subredditImages } = useSearch()
    const {
        data: { movie },
    } = useMatch()
    // const imageUrl = 'https://i.redd.it/t48gxtvudf8b1.jpg'
    // const [mirrored, setMirrored] = useState(false)
    // const [showControls, setShowControls] = useState(true)
    const navigate = useNavigate()

    // const img = images && images[idx]
    // const img = imageUrl
    const modalId = 'image-viewer-modal'
    const [mirroredHorizontal, setMirroredHorizontal] = useState(false)
    const [mirroredVertical, setMirroredVertical] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const [showGrid, setShowGrid] = useState(false)
    const [showCenterLine, setShowCenterLine] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [currentImageSize, setCurrentImageSize] = useState()
    const [userCollections, setUserCollections] = useUserCollection()
    const currentCollection = collectionId
        ? userCollections.find((c) => c.id == collectionId)
        : userCollections.find((c) => c.id == 1)
    const [images, setImages] = useState<string[]>([])
    useEffect(() => {
        // const images = collectionId ? currentCollection?.images : movie?.images ?? 1
        if (collectionId) {
            setImages(currentCollection?.images)
        }
        if (movie) {
            setImages(movie?.images)
        }
        if (subredditImages) {
            setImages(subredditImages)
        }
    })
    const [rotation, setRotation] = useState(0)
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
        'portrait'
    )
    const imgTest = new Image()
    const [imgSize, setImgSize] = useState<{ w: number; h: number }>(null)

    const [imgCount, setImgCount] = useState()
    useEffect(() => {
        if (movie.images_source == 'animationscreencaps') {
            setImgCount(movie.images.image_count)
        } else {
            setImgCount(images.length)
        }
    }, [])

    useEffect(() => {
        if (movie.images_source == 'animationscreencaps') {
            setImg(`${movie.image_prefix}${idx}${movie.image_suffix}`)
        } else {
            setImg(images[idx])
        }
        console.log({ idx })
        console.log(img)
        setTimeout(() => {
            imgTest.src = img
            imgTest.onload = () => {
                setOrientation(
                    imgTest.width > imgTest.height ? 'landscape' : 'portrait'
                )
                setImgSize({ w: imgTest.width, h: imgTest.height })
                console.log({ imgTest })
            }
        }, 50)
    }, [idx, images, img])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
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
                // if (images && selectedIndex < imgCount - 1) {
                //     setSelectedIndex((old) => Math.min(imgCount, old + 1))
                // }
            }

            // if (e.key == 'R') {
            //     setRotation((old) => (old - 1) % 4)
            // }
            // if (e.key == 'r') {
            //     setRotation((old) => (old + 1) % 4)
            // }
            if (e.code == 'KeyR') {
                if (e.altKey) {
                    setRotation(0)
                } else if (e.shiftKey) {
                    setRotation((old) => (old - 1) % 4)
                } else {
                    setRotation((old) => (old + 1) % 4)
                }
            }
            if (e.key.toLocaleLowerCase() == 'g') {
                setShowGrid((old) => !old)
            }
            if (e.key.toLocaleLowerCase() == 'c') {
                setShowControls((old) => !old)
            }
            if (e.key == '?') {
                alert(`
                r til að snúa mynd réttsælis
                shift-r til að snúa mynd rangsælis
                alt-r til að resetta snúning
                c sýnir 'controls'
                g sýnir 'grid'
                escape fer til baka í myndasafn
                space byrjar slideshow
                örvar skipta á milli mynda
                `)
            }
            if (e.key.toLocaleLowerCase() == 'f') {
                setFullScreen((old) => !old)
            }
            if (e.code == 'Escape') {
                exitViewer()
            }
        },
        [idx, images]
    )
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

    const nextImage = useCallback(() => {
        navigate({
            search: (old) => ({
                ...old,
                idx: Math.min(idx + 1, imgCount - 1),
            }),
            replace: true,
        })
    }, [idx, images])
    const prevImage = useCallback(() => {
        navigate({
            search: (old) => ({
                ...old,
                idx: Math.max(idx - 1, 0),
            }),
            replace: true,
        })
    }, [idx, images])

    const exitViewer = () => {
        let targetRoute
        if (collectionId) {
            targetRoute = `/collections/${collectionId}`
        }
        if (movie) {
            targetRoute = `/movies/${movie?.id}`
        }
        if (subredditImages) {
            targetRoute = `/subreddit/`
        }
        navigate({
            to: targetRoute,
            search: (old) => ({
                ...old,
                movieId: undefined,
                collectionId: undefined,
                subredditImages: undefined,
            }),
        })
    }

    const [imgMaxWidth, setImgMaxWidth] = useState<string>('')
    const [imgMaxHeight, setImgMaxHeight] = useState<string>('')

    const [imgContainerMaxWidth, setImgContainerMaxWidth] =
        useState<string>('auto')
    const [imgContainerMaxHeight, setImgContainerMaxHeight] =
        useState<string>('auto')

    useEffect(() => {
        setImgMaxHeight(rotation % 2 == 0 ? '100vh' : '100vw')
        setImgMaxWidth(rotation % 2 == 0 ? '100vw' : '100vh')

        setImgContainerMaxHeight(
            orientation == 'portrait'
                ? rotation % 2 == 0
                    ? imgMaxHeight // portrait snyr rett
                    : imgMaxWidth // portrait a hlid
                : rotation % 2 == 0 //orientation == 'landscape'
                ? 'auto' // landscape snyr rett
                : 'auto' //landscape snyr a hlid
        )
        // setImgContainerMaxHeight(
        //     orientation == 'portrait' ? imgMaxHeight : 'auto'
        // )
        // setImgContainerMaxWidth(
        //     orientation == 'landscape' ? imgMaxWidth : 'auto'
        // )
        setImgContainerMaxWidth(
            orientation == 'portrait'
                ? rotation % 2 == 0
                    ? 'auto'
                    : 'auto'
                : rotation % 2 == 0
                ? 'auto'
                : '100vh'
        )
    }, [orientation, rotation])
    const imgContainerScale = useMemo(() => {
        if (imgSize) {
            const { w, h } = imgSize
            // const smallerSide =
            //     orientation == 'portrait'
            //         ? rotation % 2 == 0
            //             ? 'h' // portrait snyr rett
            //             : 'w' // portrait a hlid
            //         : rotation % 2 == 0 //orientation == 'landscape'
            //         ? 'h' // landscape snyr rett
            //         : 'h' //landscape snyr a hlid
            const smallerSide = orientation == 'portrait' ? 'w' : 'h'
            if (fullScreen) {
                if (
                    (window.innerWidth < window.innerHeight &&
                        // w > window.innerWidth ||
                        (h > window.innerHeight ||
                            (rotation % 2 != 0 &&
                                (w > window.innerHeight ||
                                    h > window.innerWidth)))) ||
                    (window.innerWidth > window.innerHeight &&
                        h > window.innerWidth) ||
                    // w > window.innerHeight ||
                    (rotation % 2 != 0 &&
                        (h > window.innerWidth || w > window.innerHeight)) ||
                    (rotation % 2 == 0 &&
                        (h > window.innerHeight || w > window.innerWidth))
                ) {
                    // alert('what')
                    return 1
                }

                // alert(
                //     JSON.stringify({
                //         smallerSide,
                //         windowWidth: window.innerWidth,
                //         windowHeight: window.innerHeight,
                //         w,
                //         h,
                //     })
                // )
                if (window.innerWidth > window.innerHeight) {
                    return smallerSide == 'w'
                        ? rotation % 2 == 0
                            ? window.innerHeight / h
                            : window.innerHeight / w
                        : rotation % 2 == 0
                        ? window.innerWidth / w
                        : window.innerHeight / w
                } else {
                    return smallerSide == 'w'
                        ? rotation % 2 == 0
                            ? window.innerWidth / w
                            : window.innerWidth / h
                        : rotation % 2 == 0
                        ? window.innerWidth / w
                        : window.innerHeight / w
                }
            } else {
                // alert('what')
                return 1
            }
            console.log({
                imgContainerScale,
                windowWidth: window.innerWidth,
                w,
                h,
            })
        }
        return 1
    }, [
        imgSize?.w,
        imgSize?.h,
        imgSize,
        rotation,
        orientation,
        String(fullScreen),
        img,
        window.innerWidth,
        window.innerHeight,
    ])
    // useEffect(() => {
    //     if (imgSize) {
    //         const { w, h } = imgSize
    //         const smallerSide =
    //             orientation == 'portrait'
    //                 ? rotation % 2 == 0
    //                     ? 'w' // portrait snyr rett
    //                     : 'h' // portrait a hlid
    //                 : rotation % 2 == 0 //orientation == 'landscape'
    //                 ? 'h' // landscape snyr rett
    //                 : 'w' //landscape snyr a hlid
    //         if (fullScreen) {
    //             setImgContainerScale(
    //                 smallerSide == 'w'
    //                     ? window.innerWidth / w
    //                     : window.innerHeight / h
    //             )
    //         } else {
    //             setImgContainerScale(1)
    //         }
    //         console.log({
    //             imgContainerScale,
    //             windowWidth: window.innerWidth,
    //             w,
    //             h,
    //         })
    //     }
    // }, [imgSize?.w, imgSize?.h, rotation, fullScreen])
    // const ios = () => {
    //     if (typeof window === `undefined` || typeof navigator === `undefined`) return false;

    //     return /iPhone|iPad|iPod/i.test(navigator.userAgent || navigator.vendor || (window.opera && opera.toString() === `[object Opera]`));
    // };

    const ios =
        !(typeof window === `undefined`) &&
        !(typeof navigator === `undefined`) &&
        /iPhone|iPad|iPod/i.test(
            navigator.userAgent ||
                navigator.vendor ||
                (window.opera && opera.toString() === `[object Opera]`)
        )

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{
                maxWidth: '100vw',
                maxHeight: '100vh',
                boxSizing: 'border-box',
                overflow: 'hidden',
                position: 'fixed',
                inset: 0,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: '1rem',
                    fontSize: '1.5rem',
                    margin: '1rem',
                    boxSizing: 'border-box',
                    zIndex: 999999,
                    pointerEvents: 'none',
                    display: 'none',
                }}
            >
                <div>imgcontainerscale: {imgContainerScale}</div>

                <div>orientation: {orientation}</div>
                <div>smallerside: {orientation == 'portrait' ? 'w' : 'h'}</div>

                <div>rotation: {rotation}</div>

                <div>fullscreen: {JSON.stringify(fullScreen)}</div>
                <div>window.innerHeight {window.innerHeight}</div>
                <div>window.innerWidth {window.innerWidth}</div>
                <div>imgSize {JSON.stringify(imgSize)}</div>
            </div>
            <div
                className="no-scrollbar"
                id={img}
                style={{
                    // maxWidth: '100vw',
                    // maxHeight: '100vh',

                    width: '100vw',
                    height: '100vh',
                    maxHeight: imgMaxHeight,
                    maxWidth: imgMaxWidth,
                    boxSizing: 'border-box',
                    // overflow: 'hidden',
                    inset: 0,
                    margin: 'auto',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: `${[0, 3, 2, 1]
                        .map((val) => {
                            return rotation === val
                                ? // ? '10rem'
                                  'env(safe-area-inset-top)'
                                : '0px'
                        })
                        .join(' ')}
                        `,

                    // padding:
                    //     'env(safe-area-border-top),env(safe-area-border-right),env(safe-area-border-bottom),env(safe-area-border-left)',
                    rotate: `${rotation * 90}deg`,
                    // backgroundColor: 'red',
                }}
                onClick={(ev) => {
                    const target = ev.target as HTMLElement

                    if (
                        target.tagName.toLocaleLowerCase() != 'button' &&
                        target.tagName.toLocaleLowerCase() != 'a'
                    ) {
                        console.log(target.tagName)
                        setShowControls((old) => !old)
                    }
                }}
                key={String(mirroredHorizontal)}
            >
                <div
                    key={img}
                    style={{
                        position: 'absolute',
                        scale: String(imgContainerScale),
                    }}
                >
                    <img
                        className="no-scrollbar"
                        src={img}
                        key={img + idx}
                        // onClick={() => setShowControls((old) => !old)}
                        alt=""
                        style={{
                            display: 'block',
                            padding: `${[0, 3, 2, 1]
                                .map((val) => {
                                    return rotation === val
                                        ? // ? '10rem'
                                          'env(safe-area-inset-top)'
                                        : '0px'
                                })
                                .join(' ')}
                                `,
                            // placeSelf: 'center',
                            objectFit: 'contain',
                            // padding: 0,
                            // width: '100%',
                            // height: '100%',
                            // border: '5px solid green',
                            // padding: `${[0, 3, 2, 1]
                            //     .map((val) => {
                            //         return rotation === val
                            //             ? // ? '10rem'
                            //               '10rem' //  'env(safe-area-inset-top)'
                            //             : '0px'
                            //     })
                            //     .join(' ')}
                            //     `,
                            // padding: '0 0 0 10px',
                            // outline: '1px solid white',
                            // width: '100%',
                            // rotate: `-${rotation * 90}deg`,
                            // maxHeight: '100%',
                            // maxWidth: '100%',
                            boxSizing: 'border-box',
                            margin: 'auto',
                            // height: fullScreen ? imgMaxHeight : 'auto',
                            // width: fullScreen ? imgMaxWidth : 'auto',
                            // height: imgMaxHeight,
                            // width: imgMaxWidth,
                            // height: 'auto',
                            // width: 'auto',
                            // height: imgContainerMaxHeight,
                            // width: imgContainerMaxWidth,
                            // height: imgContainerMaxHeight,
                            // width: imgContainerMaxWidth,
                            // height: `calc(min(100%,${imgContainerMaxHeight}))`,
                            // width: `calc(min(100%,${imgContainerMaxWidth}))`,
                            maxHeight: imgMaxHeight,
                            maxWidth: imgMaxWidth,
                            // maxHeight:
                            //     orientation == 'portrait'
                            //         ? rotation % 2 == 0
                            //             ? '100vh'
                            //             : '100vw'
                            //         : rotation % 2 == 0
                            //         ? '100vh'
                            //         : '100vw',
                            // maxWidth:
                            //     orientation == 'portrait'
                            //         ? rotation % 2 == 0
                            //             ? '100vw'
                            //             : '100vh'
                            //         : rotation % 2 == 0
                            //         ? '100vw'
                            //         : '100vh',

                            // maxHeight: 'min(100vh,100%)',
                            // maxWidth: 'min(100vw,100%)',
                            zIndex: 5,
                            // transform: mirroredHorizontal ? 'scaleX(-1)' : undefined,
                            transform:
                                mirroredHorizontal || mirroredVertical
                                    ? `${
                                          mirroredHorizontal ? 'scaleX(-1)' : ''
                                      } ${mirroredVertical ? 'scaleY(-1)' : ''}`
                                    : undefined,
                            // backgroundColor: 'red',
                        }}
                        // ref={currentImageRef}
                    />
                    <GridOverlay
                        rotation={rotation}
                        // height={imgContainerMaxHeight}
                        // width={imgContainerMaxWidth}
                        key={img}
                        innerKey={img}
                        showGrid={showGrid}
                    />
                    <CenterLineOverlay
                        rotation={rotation}
                        key={img}
                        innerKey={img}
                        showCenterLine={showCenterLine}
                        horizontal
                        vertical
                    />
                    <div
                        style={{
                            visibility: showImageTimer ? 'visible' : 'hidden',
                            inset: 0,
                            position: 'absolute',
                            textAlign: 'center',
                        }}
                    >
                        {timeLeft}
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            <div
                style={{
                    padding: '1rem',
                    position: 'absolute',
                    display: 'grid',
                    justifyContent: 'center',
                    // gridTemplateColumns:
                    //     rotation % 2 == 0
                    //         ? 'repeat(auto-fill, minmax(50px, 1fr))'
                    //         : '1fr',
                    // gridTemplateRows:
                    //     rotation % 2 != 0
                    //         ? 'repeat(auto-fill, minmax(50px, 1fr))'
                    //         : '1fr',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
                    gridTemplateRows: '1fr',

                    // gridTemplateRows: '1fr',
                    // justifyContent: 'center',
                    gap: '1rem',
                    width: '80%',
                    translate: '10% 0',
                    // maxWidth: rotation % 2 == 0 ? '100%' : undefined,
                    // maxHeight: rotation % 2 != 0 ? '100%' : undefined,
                    // maxHeight: '50px',
                    // height: '100%',
                    bottom: 0,
                    boxSizing: 'border-box',
                    // backgroundColor: 'red',
                    // bottom: rotation % 2 == 0 ? '1rem' : undefined,

                    visibility: showControls ? 'visible' : 'hidden',
                    // rotate: `${rotation * 90}deg`,
                }}
            >
                <button
                    onClick={() => exitViewer()}
                    style={{
                        height: '50px',
                        width: '50px',
                        // flexShrink: 1,
                        zIndex: 5,
                    }}
                    className="material-icons"
                >
                    {/* arrow_back */}
                    clear
                </button>

                <RotateButton setRotation={setRotation} />
                <button
                    style={{
                        height: '50px',
                        width: '50px',
                        rotate: `${rotation * 90}deg`,
                        zIndex: 5,
                        transform: mirroredHorizontal
                            ? 'scaleX(-1)'
                            : undefined,
                        color: fullScreen ? 'var(--main-text-color)' : 'gray',
                    }}
                    // className="material-icons"
                    onClick={(ev) => {
                        ev.preventDefault()
                        setFullScreen((old) => !old)
                    }}
                >
                    <span
                        style={{
                            color: fullScreen
                                ? 'var(--main-text-color)'
                                : 'gray',
                        }}
                        className="material-icons"
                    >
                        fullscreen
                    </span>
                </button>
                <button
                    style={{
                        height: '50px',
                        width: '50px',
                        rotate: `${rotation * 90}deg`,
                        zIndex: 5,
                        transform: mirroredHorizontal
                            ? 'scaleX(-1)'
                            : undefined,
                    }}
                    // className="material-icons"
                    onClick={(ev) => {
                        ev.preventDefault()
                        setMirroredHorizontal((old) => !old)
                    }}
                >
                    <span className="material-icons">flip</span>
                </button>
                <button
                    style={{
                        height: '50px',
                        width: '50px',
                        rotate: `${(rotation + 1) * 90}deg`,
                        zIndex: 5,
                        // backgroundColor: mirroredVertical ? 'red' : 'green',
                    }}
                    // className="material-icons"
                    onClick={(ev) => {
                        ev.preventDefault()
                        setMirroredVertical((old) => !old)
                    }}
                >
                    <span
                        style={{
                            transform: mirroredVertical
                                ? 'scaleX(-1)' //meikar engan sens því er að rotatea um 90 gráður svo x er y
                                : undefined,
                        }}
                        className="material-icons"
                    >
                        flip
                    </span>
                </button>
                <button
                    style={{
                        rotate: `${rotation * 90}deg`,
                        height: '50px',
                        width: '50px',
                        zIndex: 5,
                        color: showGrid ? 'var(--main-text-color)' : 'gray',
                    }}
                    onClick={(ev) => {
                        ev.preventDefault()
                        setShowGrid((old) => !old)
                    }}
                >
                    <span
                        style={{
                            color: showGrid ? 'var(--main-text-color)' : 'gray',
                        }}
                        className="material-icons"
                    >
                        grid_3x3
                    </span>
                </button>

                <button
                    style={{
                        rotate: `${rotation * 90}deg`,
                        height: '50px',
                        width: '50px',
                        zIndex: 5,
                        color: showCenterLine
                            ? 'var(--main-text-color)'
                            : 'gray',
                    }}
                    onClick={(ev) => {
                        ev.preventDefault()
                        setShowCenterLine((old) => !old)
                    }}
                >
                    <span
                        style={{
                            color: showCenterLine
                                ? 'var(--main-text-color)'
                                : 'gray',
                        }}
                        className="material-icons"
                    >
                        align_horizontal_center
                    </span>
                </button>
                {/* <button
                    style={{
                        zIndex: 5,
                        color: showControls ? 'var(--main-text-color)' : 'gray',
                    }}
                    className="material-icons"
                    onClick={(ev) => {
                        ev.preventDefault()
                        setShowControls((old) => !old)
                    }}
                    >
                    menu
                </button> */}
                <button
                    style={{
                        rotate: `${rotation * 90}deg`,
                        height: '50px',
                        width: '50px',
                        zIndex: 5,
                        transform: mirroredHorizontal
                            ? 'scaleX(-1)'
                            : undefined,
                    }}
                    onClick={(ev) => {
                        if (currentCollection?.images.includes(img)) {
                            setUserCollections((old: any) => [
                                ...old.filter(
                                    (c) => c.id != (collectionId ?? 1)
                                ),
                                {
                                    ...currentCollection,
                                    images: spliceNoMutate(
                                        currentCollection.images,
                                        idx
                                    ),
                                },
                            ])
                            if (collectionId) {
                                prevImage()
                            }
                        } else {
                            setUserCollections((old: any) => [
                                ...old.filter(
                                    (c) => c.id != (collectionId ?? 1)
                                ),
                                {
                                    ...currentCollection,
                                    images: [...currentCollection.images, img],
                                },
                            ])
                        }
                    }}
                >
                    <span className="material-icons">
                        {currentCollection?.images.includes(img)
                            ? 'delete'
                            : 'add'}
                    </span>
                    {/* add */}
                </button>
                <ImagePlayerControls
                    // seconds={60}
                    // key={images[idx]}
                    rotation={rotation}
                    currentImage={images[idx]}
                    setShowImageTimer={setShowImageTimer}
                    setTimeLeft={setTimeLeft}
                    nextImage={nextImage}
                    prevImage={prevImage}
                />
            </div>
            <div
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: rotation % 2 == 0 ? 'row' : 'column',
                    transformOrigin: 'center',
                    alignItems: 'center',
                    // height: '100%',
                    inset: 0,
                    // rotate: `${rotation * 90}deg`,
                    scale: `${['1 1', '1 1', '-1 1', '1 -1'][rotation]}`, //'-1 1',
                    // left: 0,
                    // backgroundColor: 'red',
                    // maxWidth:
                    //     rotation % 2 == 0 ? '100%' : undefined,
                    // maxHeight:
                    //     rotation % 2 != 0 ? '100%' : undefined,
                    // width: rotation % 2 == 0 ? '100%' : undefined,
                    // height: rotation % 2 != 0 ? '100%' : undefined,
                    // top: '50%',
                    // top: 0,
                    // height: '100%',
                    padding: '2rem',
                    boxSizing: 'border-box',
                    // transform: 'translate(0,-50%)',
                    zIndex: 4,
                    visibility: showControls ? 'visible' : 'hidden',
                }}
            >
                <Link
                    style={{
                        rotate: `${(rotation % 2) * 90}deg`,
                        pointerEvents: 'auto',
                        zIndex: 5,
                        textDecoration: 'none',
                        // color:
                        //     images && idx <= 0 ? 'gray' : undefined,
                        color:
                            images && idx <= 0 ? 'gray' : 'rgba(127,127,127,1)',
                        visibility: images && idx <= 0 ? 'hidden' : 'visible',

                        width: '2rem',
                        // padding: '5rem 1rem',
                        textAlign: 'center',
                        // backgroundColor: 'red',
                    }}
                    search={(old) => ({
                        ...old,
                        idx: Math.max(idx - 1, 0),
                    })}
                    replace
                    className="material-icons"
                    disabled={idx >= (images && imgCount)}
                    // onClick={(ev) => {
                    //     ev.preventDefault()
                    //     // prevImage()

                    //     // selectImage(Math.max(idx - 1, 0))
                    // }}
                >
                    arrow_back_ios
                </Link>

                <Link
                    style={{
                        rotate: `${(rotation % 2) * 90}deg`,
                        zIndex: 5,
                        pointerEvents: 'auto',

                        textDecoration: 'none',
                        color:
                            images && idx >= imgCount - 1
                                ? 'gray'
                                : 'rgba(127,127,127,1)',
                        visibility:
                            images && idx >= imgCount - 1
                                ? 'hidden'
                                : 'visible',
                        width: '2rem',
                        // padding: '5rem 1rem',
                        textAlign: 'center',
                        // backgroundColor: 'red',
                        // backgroundColor: 'red',
                    }}
                    className="material-icons"
                    search={(old) => ({
                        ...old,
                        idx: Math.min(idx + 1, imgCount - 1),
                    })}

                    // onClick={(ev) => {
                    //     ev.preventDefault()
                    //     // nextImage()

                    //     // selectImage(Math.min(idx + 1, imgCount))
                    // }}
                >
                    arrow_forward_ios
                </Link>
            </div>
        </div>
    )
}
