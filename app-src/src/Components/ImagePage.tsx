import { useMatch, useNavigate, useSearch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { useUserCollection } from './UseUserCollection'

export function ImagePage() {
    const [img, setImg] = useState('')
    // const {
    //     data: { currentImage },
    // } = useMatch()
    const { collectionId, idx } = useSearch()
    // const imageUrl = 'https://i.redd.it/t48gxtvudf8b1.jpg'
    // const [mirrored, setMirrored] = useState(false)
    // const [showControls, setShowControls] = useState(true)
    const navigate = useNavigate()

    // const img = images && images[idx]
    // const img = imageUrl
    const modalId = 'image-viewer-modal'
    const [mirrored, setMirrored] = useState(false)
    const [showGrid, setShowGrid] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [currentImageSize, setCurrentImageSize] = useState()
    const [userCollections, setUserCollections] = useUserCollection()
    const currentCollection = userCollections.find((c) => c.id == collectionId)
    const images = currentCollection?.images
    const [rotation, setRotation] = useState(0)
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
        'portrait'
    )
    const imgTest = new Image()
    useEffect(() => {
        setImg(currentCollection?.images[idx])
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
    }, [idx])

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
        <>
            <div
                className="no-scrollbar"
                id={img}
                style={{
                    // border: 'none',
                    // border: '10px solid red',
                    // backgroundColor: 'green',
                    inset: 0,
                    // overflowX: 'hidden',
                    // maxWidth: rotation % 2 == 0 ? '100vw' : '100vh',
                    // maxHeight: rotation % 2 == 0 ? '100vh' : '100vw',
                    // width: rotation % 2 == 0 ? '100vw' : '100vh',
                    // height: rotation % 2 == 0 ? '100vh' : '100vw',
                    // width: '100vmin',
                    // height: '100vmin',
                    // width: '100vw',
                    // height: '100vh',
                    // backgroundColor: 'blue',
                    margin: 0,
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // boxSizing: 'border-box',
                    padding:
                        'env(safe-area-border-top),env(safe-area-border-right),env(safe-area-border-bottom),env(safe-area-border-left)',
                    rotate: `${rotation * 90}deg`,
                }}
                onClick={(ev) => {
                    const target = ev.target as HTMLElement

                    if (ev.target.tagName.toLocaleLowerCase() != 'button') {
                        console.log(ev.target.tagName)
                        setShowControls((old) => !old)
                    }
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        // top: '50%',
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
                                padding: 0,
                                // width: '100%',
                                // rotate: `-${rotation * 90}deg`,
                                // maxHeight: '100%',
                                // maxWidth: '100%',
                                boxSizing: 'border-box',
                                height: 'auto',
                                margin: 'auto',
                                // maxHeight:
                                //     orientation == 'landscape'
                                //         ? rotation % 2 == 0
                                //             ? '95vh'
                                //             : undefined
                                //         : '95vw',
                                // maxWidth:
                                //     orientation == 'portrait'
                                //         ? rotation % 2 == 0
                                //             ? '95vw'
                                //             : undefined
                                //         : '95vh',
                                maxHeight:
                                    orientation == 'portrait'
                                        ? rotation % 2 == 0
                                            ? '95vh'
                                            : '95vw'
                                        : rotation % 2 == 0
                                        ? '95vh'
                                        : '95vw',
                                maxWidth:
                                    orientation == 'portrait'
                                        ? rotation % 2 == 0
                                            ? '95vw'
                                            : '95vh'
                                        : rotation % 2 == 0
                                        ? '95vw'
                                        : '95vh',

                                // maxHeight: 'min(100vh,100%)',
                                // maxWidth: 'min(100vw,100%)',
                                transform: mirrored ? 'scaleX(-1)' : undefined,
                                // backgroundColor: 'red',
                            }}
                            // ref={currentImageRef}
                        />
                        <div
                            style={{
                                pointerEvents: 'none',
                                boxSizing: 'border-box',
                                // outline: '1px solid pink',
                                position: 'absolute',
                                // padding: '1rem',
                                inset: 0,
                                // bottom: '4px',
                                // bottom: '-4px',
                                // maxHeight: '95%',
                                // height: 'calc(100% - 4px)',
                                // width: '95%',
                                // maxHeight: '95%',
                                // width: '95%',
                                height: 'auto',
                                width: 'auto',
                                margin: 'auto',
                                // backgroundColor:
                                //     'rgba(255,255,0,0.3)',

                                display: 'grid',
                                visibility: showGrid ? 'visible' : 'hidden',
                                gridTemplateColumns: '1fr 1fr 1fr',
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid var(--grid-color)',
                                    boxSizing: 'border-box',
                                }}
                            ></div>
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid var(--grid-color)',
                                    boxSizing: 'border-box',
                                }}
                            ></div>
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid var(--grid-color)',
                                    boxSizing: 'border-box',
                                }}
                            ></div>
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid var(--grid-color)',
                                    boxSizing: 'border-box',
                                }}
                            ></div>
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid var(--grid-color)',
                                    boxSizing: 'border-box',
                                }}
                            ></div>
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid var(--grid-color)',
                                    boxSizing: 'border-box',
                                }}
                            ></div>
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid var(--grid-color)',
                                    boxSizing: 'border-box',
                                }}
                            ></div>
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid var(--grid-color)',
                                    boxSizing: 'border-box',
                                }}
                            ></div>
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    border: '1px solid var(--grid-color)',
                                    boxSizing: 'border-box',
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <div
                style={{
                    padding: '1rem',
                    position: 'absolute',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',

                    justifyContent: 'center',
                    gap: '1rem',
                    width: '100%',
                    maxWidth: '100vw',
                    maxHeight: '50px',
                    height: '100%',
                    boxSizing: 'border-box',
                    bottom: '2rem',
                    visibility: showControls ? 'visible' : 'hidden',
                }}
            >
                <button
                    onClick={() =>
                        navigate({
                            to: `/collections/${collectionId}`,
                        })
                    }
                    style={{
                        height: '50px',
                        flexShrink: 1,
                        zIndex: 5,
                    }}
                    className="material-icons"
                >
                    {/* arrow_back */}
                    clear
                </button>

                <button
                    onClick={(ev) => {
                        ev.preventDefault()
                        setRotation((old) => (old + 1) % 4)
                    }}
                    style={{
                        zIndex: 5,
                    }}
                    className="material-icons"
                >
                    rotate_right
                </button>
                <button
                    style={{
                        zIndex: 5,
                        transform: mirrored ? 'scaleX(-1)' : undefined,
                    }}
                    className="material-icons"
                    onClick={(ev) => {
                        ev.preventDefault()
                        setMirrored((old) => !old)
                    }}
                >
                    flip
                </button>
                <button
                    style={{
                        zIndex: 5,
                        color: showGrid ? 'var(--main-text-color)' : 'gray',
                    }}
                    className="material-icons"
                    onClick={(ev) => {
                        ev.preventDefault()
                        setShowGrid((old) => !old)
                    }}
                >
                    grid_3x3
                </button>
                <button
                    style={{
                        zIndex: 5,
                        transform: mirrored ? 'scaleX(-1)' : undefined,
                    }}
                    className="material-icons"
                    onClick={(ev) => {
                        ev.preventDefault()
                        setUserCollections((old: any) => {
                            const currentCollection = old.find(
                                (c: any) => c.id == 1
                            )
                            return [
                                ...old.filter((c: any) => c.id != 1),
                                {
                                    ...currentCollection,
                                    images: [...currentCollection.images, img],
                                },
                            ]
                        })
                    }}
                >
                    add
                </button>
            </div>

            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    // rotate: `${rotation * 90}deg`,
                    width: '100%',
                    left: 0,
                    // backgroundColor: 'red',
                    maxWidth: '100%',
                    top: '50%',
                    padding: '1rem',
                    boxSizing: 'border-box',
                    transform: 'translate(0,-50%)',
                    zIndex: 99,
                    visibility: showControls ? 'visible' : 'hidden',
                }}
            >
                <button
                    style={{
                        zIndex: 5,
                    }}
                    className="material-icons"
                    disabled={idx >= (images && images.length)}
                    onClick={(ev) => {
                        ev.preventDefault()
                        navigate({
                            search: (old) => ({
                                ...old,
                                idx: Math.max(idx - 1, 0),
                            }),
                            replace: true,
                        })

                        // selectImage(Math.max(idx - 1, 0))
                    }}
                >
                    arrow_back_ios
                </button>

                <button
                    style={{
                        zIndex: 5,
                    }}
                    className="material-icons"
                    disabled={idx >= (images && images.length)}
                    onClick={(ev) => {
                        ev.preventDefault()
                        navigate({
                            search: (old) => ({
                                ...old,
                                idx: Math.min(idx + 1, images.length - 1),
                            }),
                            replace: true,
                        })

                        // selectImage(Math.min(idx + 1, images.length))
                    }}
                >
                    arrow_forward_ios
                </button>
            </div>
        </>
    )
}
