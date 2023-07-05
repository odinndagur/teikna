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
    const [mirrored, setMirrored] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const [showGrid, setShowGrid] = useState(false)
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

    useEffect(() => {
        setImg(images[idx])
        console.log({ idx })
        console.log(img)
        setTimeout(() => {
            imgTest.src = img
            imgTest.onload = () => {
                setOrientation(
                    imgTest.width > imgTest.height ? 'landscape' : 'portrait'
                )
                console.log({ imgTest })
            }
        }, 50)
    }, [idx, images])

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
                // if (images && selectedIndex < images.length - 1) {
                //     setSelectedIndex((old) => Math.min(images.length, old + 1))
                // }
            }

            if (e.key == 'R') {
                setRotation((old) => (old - 1) % 4)
            }
            if (e.key == 'r') {
                setRotation((old) => (old + 1) % 4)
            }
            if (e.key.toLocaleLowerCase() == 'g') {
                setShowGrid((old) => !old)
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
                idx: Math.min(idx + 1, images.length - 1),
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
        setImgMaxHeight(rotation % 2 == 0 ? '95vh' : '95vw')
        setImgMaxWidth(rotation % 2 == 0 ? '95vw' : '95vh')

        // setImgContainerMaxHeight(
        //     orientation == 'portrait'
        //         ? rotation % 2 == 0
        //             ? imgMaxHeight // portrait snyr rett
        //             : imgMaxWidth // portrait a hlid
        //         : rotation % 2 == 0 //orientation == 'landscape'
        //         ? 'auto' // landscape snyr rett
        //         : imgMaxHeight //landscape snyr a hlid
        // )
        setImgContainerMaxHeight(
            orientation == 'portrait' ? imgMaxHeight : 'auto'
        )
        setImgContainerMaxWidth(
            orientation == 'landscape' ? imgMaxWidth : 'auto'
        )
        // setImgContainerMaxWidth(
        //     orientation == 'portrait'
        //         ? rotation % 2 == 0
        //             ? 'auto'
        //             : 'auto'
        //         : rotation % 2 == 0
        //         ? 'auto'
        //         : imgMaxHeight
        // )
    }, [orientation, rotation])
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
            style={{
                maxWidth: '100vw',
                maxHeight: '100vh',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            <div
                className="no-scrollbar"
                id={img}
                style={{
                    // maxWidth: '100vw',
                    // maxHeight: '100vh',
                    width: '100%',
                    height: '100%',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    inset: 0,
                    margin: 0,
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:
                        'env(safe-area-border-top),env(safe-area-border-right),env(safe-area-border-bottom),env(safe-area-border-left)',
                    rotate: `${rotation * 90}deg`,
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
                key={String(mirrored)}
            >
                <div style={{ position: 'absolute' }}>
                    <img
                        className="no-scrollbar"
                        src={img}
                        key={img + idx}
                        // onClick={() => setShowControls((old) => !old)}
                        alt=""
                        style={{
                            // placeSelf: 'center',
                            objectFit: 'contain',
                            // width: '100%',
                            // height: '100%',
                            // border: '5px solid green',
                            padding: `${[0, 3, 2, 1]
                                .map((val) => {
                                    return rotation === val
                                        ? // ? '10rem'
                                          'env(safe-area-inset-top)'
                                        : '0px'
                                })
                                .join(' ')}
                                `,
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
                            height: imgContainerMaxHeight,
                            width: imgContainerMaxWidth,
                            // height: `calc(min(100%,${imgContainerMaxHeight}))`,
                            // width: `calc(min(100%,${imgContainerMaxWidth}))`,
                            maxHeight: imgMaxHeight,
                            maxWidth: imgMaxWidth,
                            // maxHeight:
                            //     orientation == 'portrait'
                            //         ? rotation % 2 == 0
                            //             ? '95vh'
                            //             : '95vw'
                            //         : rotation % 2 == 0
                            //         ? '95vh'
                            //         : '95vw',
                            // maxWidth:
                            //     orientation == 'portrait'
                            //         ? rotation % 2 == 0
                            //             ? '95vw'
                            //             : '95vh'
                            //         : rotation % 2 == 0
                            //         ? '95vw'
                            //         : '95vh',

                            // maxHeight: 'min(100vh,100%)',
                            // maxWidth: 'min(100vw,100%)',
                            zIndex: 5,
                            transform: mirrored ? 'scaleX(-1)' : undefined,
                            // backgroundColor: 'red',
                        }}
                        // ref={currentImageRef}
                    />
                    <GridOverlay
                        height={imgContainerMaxHeight}
                        width={imgContainerMaxWidth}
                        key={img}
                        showGrid={showGrid}
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
                    <div
                        style={{
                            pointerEvents: 'none',
                            position: 'absolute',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // height: '100%',
                            inset: 0,
                            // rotate: `${rotation * 90}deg`,
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
                                pointerEvents: 'auto',
                                zIndex: 5,
                                textDecoration: 'none',
                                // color:
                                //     images && idx <= 0 ? 'gray' : undefined,
                                color:
                                    images && idx <= 0
                                        ? 'gray'
                                        : 'rgba(127,127,127,1)',
                                visibility:
                                    images && idx <= 0 ? 'hidden' : 'visible',

                                width: '2rem',
                                padding: '5rem 1rem',
                                textAlign: 'center',
                                // backgroundColor: 'red',
                            }}
                            search={(old) => ({
                                ...old,
                                idx: Math.max(idx - 1, 0),
                            })}
                            replace
                            className="material-icons"
                            disabled={idx >= (images && images.length)}
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
                                zIndex: 5,
                                pointerEvents: 'auto',

                                textDecoration: 'none',
                                color:
                                    images && idx >= images.length - 1
                                        ? 'gray'
                                        : 'rgba(127,127,127,1)',
                                visibility:
                                    images && idx >= images.length - 1
                                        ? 'hidden'
                                        : 'visible',
                                width: '2rem',
                                padding: '5rem 1rem',
                                textAlign: 'center',
                                // backgroundColor: 'red',
                                // backgroundColor: 'red',
                            }}
                            className="material-icons"
                            search={(old) => ({
                                ...old,
                                idx: Math.min(idx + 1, images.length - 1),
                            })}

                            // onClick={(ev) => {
                            //     ev.preventDefault()
                            //     // nextImage()

                            //     // selectImage(Math.min(idx + 1, images.length))
                            // }}
                        >
                            arrow_forward_ios
                        </Link>
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
                    gridTemplateColumns:
                        rotation % 2 == 0
                            ? 'repeat(auto-fill, minmax(50px, 1fr))'
                            : '1fr',
                    gridTemplateRows:
                        rotation % 2 != 0
                            ? 'repeat(auto-fill, minmax(50px, 1fr))'
                            : '1fr',
                    // gridTemplateRows: '1fr',
                    // justifyContent: 'center',
                    gap: '1rem',
                    // width: '80%',
                    width: rotation % 2 == 0 ? '100%' : undefined,
                    height: rotation % 2 != 0 ? '100%' : undefined,
                    // maxHeight: '50px',
                    // height: '100%',
                    boxSizing: 'border-box',
                    // backgroundColor: 'red',
                    bottom: rotation % 2 == 0 ? '1rem' : undefined,

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
                        transform: mirrored ? 'scaleX(-1)' : undefined,
                    }}
                    // className="material-icons"
                    onClick={(ev) => {
                        ev.preventDefault()
                        setFullScreen((old) => !old)
                    }}
                >
                    <span className="material-icons">fullscreen</span>
                </button>
                <button
                    style={{
                        height: '50px',
                        width: '50px',
                        rotate: `${rotation * 90}deg`,
                        zIndex: 5,
                        transform: mirrored ? 'scaleX(-1)' : undefined,
                    }}
                    // className="material-icons"
                    onClick={(ev) => {
                        ev.preventDefault()
                        setMirrored((old) => !old)
                    }}
                >
                    <span className="material-icons">flip</span>
                </button>
                <button
                    style={{
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
                    <span className="material-icons">grid_3x3</span>
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
                        height: '50px',
                        width: '50px',
                        zIndex: 5,
                        transform: mirrored ? 'scaleX(-1)' : undefined,
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
                    currentImage={images[idx]}
                    setShowImageTimer={setShowImageTimer}
                    setTimeLeft={setTimeLeft}
                    nextImage={nextImage}
                    prevImage={prevImage}
                />
            </div>
        </div>
    )
}
