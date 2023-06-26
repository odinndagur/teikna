import { MakeGenerics, useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'
import { getMovieById } from '../db'
import { Grid } from './Grid'

import './MoviePage.css'
import { Carousel } from './Carousel'

export function MoviePage() {
    type movieGenerics = MakeGenerics<{
        LoaderData: {
            movie?: {
                title: string
                director: string
                director_of_photography: string
                production_designer: string
                costume_designer: string
                year: number
                images: string[]
            }
        }
    }>
    const {
        data: { movie },
    } = useMatch<movieGenerics>()

    return (
        <>
            <Header></Header>
            {/* {JSON.stringify(movie)} */}
            <h1>{movie?.title}</h1>
            <Grid>
                {movie?.images?.map((img, idx) => {
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
                                    maxWidth: '100%',
                                    maxHeight: '100%',
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
                                <form method="dialog">
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
                                <img
                                    src={img}
                                    alt=""
                                    style={{
                                        objectFit: 'cover',
                                        //     transform: 'rotate(90deg)',
                                        width: '100%',
                                        height: '100%',

                                        //     aspectRatio: 'auto',
                                    }}
                                />
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
            <Footer></Footer>
        </>
    )
}
