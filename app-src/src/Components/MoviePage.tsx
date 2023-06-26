import { MakeGenerics, useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'
import { getMovieById } from '../db'
import { Grid } from './Grid'

import './MoviePage.css'
import { Carousel } from './Carousel'
import { ImageViewer } from './ImageViewer'

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
            <ImageViewer images={movie?.images!} />
            <Footer></Footer>
        </>
    )
}
