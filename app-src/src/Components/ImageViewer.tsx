import { useEffect, useRef, useState } from 'react'
import { Grid } from './Grid'
import './MoviePage.css'
import { useLocalStorage } from 'usehooks-ts'

export function ImageWithModal({ img }: { img: string }) {
    const [mirrored, setMirrored] = useState(false)
    const [showGrid, setShowGrid] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [currentImageSize, setCurrentImageSize] = useState()
    const [userCollections, setUserCollections] = useLocalStorage<
        { id: number | string; name: string; images: string[] }[]
    >('user-collections', [{ name: 'Base', id: 1, images: [] }])
    const [rotation, setRotation] = useState(0)
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
        'portrait'
    )
    const imgTest = new Image()
    useEffect(() => {
        setTimeout(() => {
            imgTest.src = img
            setOrientation(
                imgTest.width > imgTest.height ? 'landscape' : 'portrait'
            )
            console.log({ imgTest })
        }, 50)
    }, [])

    return (
        <div key={img} style={{ scrollSnapType: 'y mandatory' }}>
            {/* <button> */}
            <img
                className="button"
                src={img}
                key={img}
                onClick={() => {
                    setMirrored(false)
                    const el = document.getElementById(img) as HTMLDialogElement
                    el.showModal()
                }}
                style={{
                    cursor: 'pointer',
                    maxWidth:
                        orientation == 'landscape'
                            ? 'var(--max-image-size)'
                            : undefined,
                    maxHeight:
                        orientation == 'portrait'
                            ? 'var(--max-image-size)'
                            : undefined,
                    padding: 0,
                }}
            />
            {/* </button> */}
            <dialog
                className="dialog-screenshot no-scrollbar"
                id={img}
                style={{
                    border: 'none',
                    // minWidth: '80%',
                    // maxWidth: '100%',
                    // maxHeight: '100%',
                    maxWidth: rotation % 2 == 0 ? '100vw' : '100vh',
                    maxHeight: rotation % 2 != 0 ? '100vh' : '100vw',
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

                    // orientation == 'landscape'
                    //     ? rotation % 2 != 0
                    //         ? '100vh'
                    //         : '100vw'
                    //     : undefined,

                    // width: '100vw',
                    // height: '100vh',
                    boxSizing: 'border-box',
                    padding:
                        'env(safe-area-border-top),env(safe-area-border-right),env(safe-area-border-bottom),env(safe-area-border-left)',
                    // minHeight: '80%',
                    // boxSizing: 'border-box',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    rotate: `${rotation * 90}deg`,
                    // transform: `translate(0,${
                    //     ['0', '25%', '0', '-25%'][rotation]
                    // })`,
                    // WebkitTransform: `translate(0,${
                    //     ['0', '50%', '0', '-50%'][rotation]
                    // })`,

                    // backgroundImage: `url(${movie.images[9]})`,
                }}
                onClick={(ev) => {
                    const dialog = document.getElementById(
                        img
                    ) as HTMLDialogElement
                    if (ev.target == dialog) {
                        dialog.close()
                    }
                }}
            >
                {/* <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                    }}
                >
                    lol
                </div> */}

                <div
                    // style={{
                    //     display: 'flex',
                    //     justifyContent: 'center',
                    //     alignContent: 'center',
                    //     maxHeight: '100%',
                    //     width: '100%',
                    // }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // rotate: `${rotation * 90}deg`,
                        // transform: 'rotate(90deg)',
                        // maxHeight: '100%',
                        // maxWidth: '100%',
                        // padding: '1rem',
                        // backgroundColor: 'blue',
                    }}
                    key={String(mirrored)}
                >
                    {/* <div> */}
                    <div
                        style={{
                            // position: 'relative',
                            alignSelf: 'center',
                            placeSelf: 'center',
                            // maxHeight:
                            //     // orientation == 'portrait' ?
                            //     rotation % 2 == 0
                            //         ? '95vw'
                            //         : // : '95vh'
                            //           undefined,
                            // maxWidth:
                            //     // orientation == 'landscape' ?
                            //     rotation % 2 != 0
                            //         ? '95vh'
                            //         : // : '95vw'
                            //           undefined,
                            height: '100%',
                            width: '100%',
                            padding: 0,
                            boxSizing: 'border-box',
                            // backgroundColor: 'red',
                            // maxHeight: '95%',
                            // maxWidth: '95%',
                            // padding: '1rem',
                            margin: 'auto',
                            // maxWidth: '95%',
                            // maxHeight: '95%',
                        }}
                    >
                        <div
                            style={{
                                padding: '1rem',
                                position: 'absolute',
                                display: 'flex',
                                // gridTemplateColumns:
                                //     'repeat(auto-fill, minmax(50px, 1fr))',

                                justifyContent: 'center',
                                gap: '1rem',
                                width: '100%',
                                maxHeight: '50px',
                                height: '100%',
                                bottom: 0,
                                // width: rotation % 2 == 0 ? '100%' : undefined,
                                // placeSelf: 'center',
                                // height: rotation % 2 != 0 ? '100%' : undefined,
                                // height: '100%',
                                // left: rotation % 2 != 0 ? 0 : '100%',
                                // left: rotation % 2 != 0 ? 0 : undefined,
                                visibility: showControls ? 'visible' : 'hidden',
                                // rotate: `${rotation * 90}deg`,
                                // backgroundColor:
                                //     rotation % 2 == 0 ? 'red' : 'green',
                            }}
                        >
                            <form
                                method="dialog"
                                className="no-scrollbar"
                                // style={{ backgroundColor: 'red' }}
                            >
                                <button
                                    style={{
                                        height: '50px',
                                        flexShrink: 1,
                                        rotate: `-${rotation * 90}deg`,
                                        // height: 'auto',
                                        // position: 'absolute',
                                        // transform: 'translate(-000%,00%)',
                                        // top: '1rem',
                                        // left: '1rem',
                                        zIndex: 5,
                                    }}
                                    className="material-icons"
                                >
                                    {/* arrow_back */}
                                    clear
                                </button>
                            </form>
                            {/* <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '2rem',
                                    flexGrow: 1,
                                }}
                            > */}
                            <button
                                onClick={(ev) => ev.preventDefault()}
                                style={{
                                    height: '50px',
                                    flexShrink: 1,
                                    rotate: `-${rotation * 90}deg`,
                                    // height: 'auto',
                                    // position: 'absolute',
                                    // transform: 'translate(-000%,00%)',
                                    // top: '1rem',
                                    // left: '1rem',
                                    zIndex: 5,
                                }}
                                className="material-icons"
                            >
                                {/* arrow_back */}
                                {orientation}
                            </button>

                            <button
                                onClick={(ev) => {
                                    ev.preventDefault()
                                    setRotation((old) => (old + 1) % 4)
                                }}
                                style={{
                                    rotate: `-${rotation * 90}deg`,
                                    // position: 'absolute',
                                    // transform: 'translate(0%,300%)',
                                    // top: '1rem',
                                    // left: '1rem',
                                    zIndex: 5,
                                }}
                                className="material-icons"
                            >
                                {/* {orientation} */}
                                rotate_right
                            </button>
                            <button
                                style={{
                                    rotate: `-${rotation * 90}deg`,
                                    // position: 'absolute',
                                    // top: '1rem',
                                    // right: '1rem',
                                    zIndex: 5,
                                    transform: mirrored
                                        ? 'scaleX(-1)'
                                        : undefined,
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
                                    rotate: `-${rotation * 90}deg`,
                                    // position: 'absolute',
                                    // top: '1rem',
                                    // right: '1rem',
                                    zIndex: 5,
                                    // translate: '0 150%',
                                    color: showGrid
                                        ? 'var(--main-text-color)'
                                        : 'gray',
                                    // transform: mirrored
                                    //     ? 'scaleX(-1)'
                                    //     : undefined,
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
                                    rotate: `-${rotation * 90}deg`,
                                    // position: 'absolute',
                                    // top: '1rem',
                                    // left: '1rem',
                                    zIndex: 5,
                                    // translate: '0 150%',
                                    transform: mirrored
                                        ? 'scaleX(-1)'
                                        : undefined,
                                }}
                                className="material-icons"
                                onClick={(ev) => {
                                    ev.preventDefault()
                                    setUserCollections((old: any) => {
                                        const currentCollection = old.find(
                                            (c: any) => c.id == 1
                                        )
                                        return [
                                            ...old.filter(
                                                (c: any) => c.id != 1
                                            ),
                                            {
                                                ...currentCollection,
                                                images: [
                                                    ...currentCollection.images,
                                                    img,
                                                ],
                                            },
                                        ]
                                    })
                                    // setMirrored((old) => !old)
                                }}
                            >
                                add
                            </button>
                            {/* </div> */}
                        </div>

                        <img
                            className="no-scrollbar"
                            src={img}
                            onClick={() => setShowControls((old) => !old)}
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
                                            ? '100vh'
                                            : '100vw'
                                        : rotation % 2 == 0
                                        ? '100vh'
                                        : '100vw',
                                maxWidth:
                                    orientation == 'portrait'
                                        ? rotation % 2 == 0
                                            ? '100vw'
                                            : '100vh'
                                        : rotation % 2 == 0
                                        ? '100vw'
                                        : '100vh',

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
                    {/* </div> */}
                </div>
            </dialog>
            {/* {false && (
<dialog
className="dialog-screenshot"
id={img}
style={{
    border: 'none',
    minWidth: '80%',
    height: '',
    // boxSizing: 'border-box',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    // backgroundImage: `url(${movie.images[9]})`,
}}
onClick={(ev) => {
    const dialog = document.getElementById(
        img
    ) as HTMLDialogElement
    if (ev.target == dialog) {
        dialog.close()
    }
}}
>
<div
    style={{
        display: 'grid',
        // justifyContent: 'center',
        // alignItems: 'center',
    }}
>
    <img
        src={img}
        alt=""
        width={'100%'}
        // height={'100%'}
        style={{
            placeSelf: 'center',
        }}
    />
</div>
<div
    style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '0.5rem 0',
    }}
>
    {movie.title}
</div>
<div
// style={{ backgroundColor: 'green' }}
>
    <Carousel>
        {movie?.images?.map((image) => {
            return (
                <button
                    onClick={() => {
                        const currentDialog =
                            document.getElementById(
                                img
                            ) as HTMLDialogElement
                        currentDialog.close()
                        const newDialog =
                            document.getElementById(
                                image
                            ) as HTMLDialogElement
                        newDialog.showModal()
                    }}
                    style={{
                        minWidth: '300px',
                        // padding: 0,
                    }}
                >
                    <img
                        style={{
                            // backgroundColor: 'red',
                            outline:
                                '1px solid black',
                        }}
                        key={image}
                        src={image}
                    />
                </button>
            )
        })}
    </Carousel>
</div>
</dialog>
)} */}
        </div>
    )
}

export function ImageViewer({ images }: { images: string[] }) {
    return (
        <Grid>
            {images?.map((img, idx) => {
                return <ImageWithModal img={img} />
            })}
        </Grid>
    )
}
