import { Grid } from './Grid'
import './MoviePage.css'

export function ImageViewer({ images }: { images: string[] }) {
    return (
        <Grid>
            {images?.map((img, idx) => {
                return (
                    <div key={img}>
                        <button>
                            <img
                                src={img}
                                key={img}
                                onClick={() => {
                                    const el = document.getElementById(
                                        img
                                    ) as HTMLDialogElement
                                    el.showModal()
                                }}
                            />
                        </button>
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
                                    height: '100%',
                                    width: '100%',
                                }}
                            >
                                <form method="dialog" className="no-scrollbar">
                                    <button
                                        style={{
                                            position: 'absolute',
                                            top: '1rem',
                                            left: '1rem',
                                        }}
                                        className="material-icons"
                                    >
                                        arrow_back
                                    </button>
                                </form>
                                {/* <div> */}
                                <img
                                    src={img}
                                    alt=""
                                    style={{
                                        placeSelf: 'center',
                                        objectFit: 'contain',
                                        width: '100%',
                                        height: '100%',
                                        maxHeight: '100vh',
                                        maxWidth: '100vw',
                                    }}
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
