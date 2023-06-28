import { useRef, useState } from 'react'
import { Grid } from './Grid'
import './MoviePage.css'

export function ImageViewer({ images }: { images: string[] }) {
    const [mirrored, setMirrored] = useState(false)
    const [currentImageSize, setCurrentImageSize] = useState()
    return (
        <Grid>
            {images?.map((img, idx) => {
                return (
                    <div key={img}>
                        {/* <button> */}
                        <img
                            className="button"
                            src={img}
                            key={img}
                            onClick={() => {
                                setMirrored(false)
                                const el = document.getElementById(
                                    img
                                ) as HTMLDialogElement
                                el.showModal()
                            }}
                            style={{
                                cursor: 'pointer',
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }}
                        />
                        {/* </button> */}
                        <dialog
                            className="dialog-screenshot"
                            id={img}
                            style={{
                                border: 'none',
                                minWidth: '80%',
                                // maxWidth: '100%',
                                // maxHeight: '100%',
                                // maxWidth: '100%',
                                // maxHeight: '100%',
                                width: '100vw',
                                height: '100vh',
                                boxSizing: 'border-box',
                                padding:
                                    'env(safe-area-border-top),env(safe-area-border-right),env(safe-area-border-bottom),env(safe-area-border-left)',
                                // minHeight: '80%',
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
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    maxHeight: '100%',
                                    width: '100%',
                                }}
                                key={String(mirrored)}
                            >
                                <form method="dialog" className="no-scrollbar">
                                    <button
                                        style={{
                                            position: 'absolute',
                                            transform: 'translate(-000%,00%)',
                                            top: '1rem',
                                            left: '1rem',
                                            zIndex: 5,
                                        }}
                                        className="material-icons"
                                    >
                                        arrow_back
                                    </button>
                                    <button
                                        style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            right: '1rem',
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
                                </form>
                                {/* <div> */}
                                <img
                                    src={img}
                                    alt=""
                                    style={{
                                        placeSelf: 'center',
                                        objectFit: 'contain',
                                        // width: '100%',
                                        // height: '100%',
                                        // outline: '5px solid green',
                                        maxHeight: '100vh',
                                        maxWidth: '100vw',
                                        transform: mirrored
                                            ? 'scaleX(-1)'
                                            : undefined,
                                        // backgroundColor: 'red',
                                    }}
                                    // ref={currentImageRef}
                                />
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
            })}
        </Grid>
    )
}
