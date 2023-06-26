import { MakeGenerics, useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'
import { getMovieById } from '../db'
import { Grid } from './Grid'

import './MoviePage.css'
import { Carousel } from './Carousel'
import { ImageViewer } from './ImageViewer'

export type movieGenerics = MakeGenerics<{
    LoaderData: {
        movie?: {
            id: string | number
            title: string
            director: string
            director_of_photography: string
            production_designer: string
            costume_designer: string
            year: number
            images: string[]
            filmgrab_url: string
        }
    }
}>
export function MoviePage() {
    const {
        data: { movie },
    } = useMatch<movieGenerics>()

    return (
        <>
            <Header></Header>
            {/* {JSON.stringify(movie)} */}
            <div key={movie?.id}>
                <h1>{movie?.title}</h1>
                <i>
                    All images from{' '}
                    <a href={movie?.filmgrab_url}>filmgrab.com</a>
                </i>
                <ImageViewer images={movie?.images!} />
            </div>
            <Footer></Footer>
        </>
    )
}
