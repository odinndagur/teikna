import { Link, MakeGenerics, useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'
import { getMovieById } from '../db'
import { Grid } from './Grid'

import './MoviePage.css'
import { Carousel } from './Carousel'
import { ImageViewer } from './ImageViewer'

interface movie {
    id: string | number
    title: string
    director: string
    dop: string
    production_designer: string
    costume_designer: string
    year: number
    images: string[]
    filmgrab_url: string
    director_id: string | number
    dop_id: string | number
    production_designer_id: string | number
    costume_designer_id: string | number
}

export type movieGenerics = MakeGenerics<{
    LoaderData: {
        movie?: movie
        movies?: movie[]
        heading?: string
    }
}>
export function MoviePage() {
    const {
        data: { movie, heading },
    } = useMatch<movieGenerics>()

    return (
        <>
            <Header>
                <h2>{heading}</h2>
            </Header>
            {/* {JSON.stringify(movie)} */}
            <div key={movie?.id}>
                <h1>{movie?.title}</h1>
                {/* <h2>{movie?.dop}</h2> */}
                <ul>
                    <li>
                        <b>Year</b>
                        <Link to={`/year/${movie?.year}`}>{movie?.year}</Link>
                    </li>
                    <li>
                        <b>Director</b>
                        <Link to={`/director/${movie?.director_id}`}>
                            {movie?.director}
                        </Link>
                    </li>
                    <li>
                        <b>Director of Photography</b>
                        <Link to={`/dop/${movie?.dop_id}`}>{movie?.dop}</Link>
                    </li>
                    <li>
                        <b>Costume Designer</b>
                        <Link
                            to={`/costume_designer/${movie?.costume_designer_id}`}
                        >
                            {movie?.costume_designer}
                        </Link>
                    </li>
                    <li>
                        <b>Production Designer</b>
                        <Link
                            to={`/production_designer/${movie?.production_designer_id}`}
                        >
                            {movie?.production_designer}
                        </Link>
                    </li>
                </ul>
                <i>
                    All images from{' '}
                    <a href={movie?.filmgrab_url}>filmgrab.com</a>
                </i>
                <ImageViewer images={movie?.images!} movieId={movie?.id} />
            </div>
            <Footer></Footer>
        </>
    )
}
