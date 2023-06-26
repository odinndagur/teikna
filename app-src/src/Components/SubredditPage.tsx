import { MakeGenerics, useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'
import { fetchImagesFromSub, getMovieById } from '../db'
import { Grid } from './Grid'

import './MoviePage.css'
import { Carousel } from './Carousel'
import { ImageViewer } from './ImageViewer'

export function SubredditPage() {
    const { data } = useQuery({
        queryFn: () => fetchImagesFromSub('gonewild'),
        queryKey: ['sub', 'gonewild'],
    })
    return (
        <>
            <Header></Header>
            {/* {JSON.stringify(movie)} */}
            <ImageViewer images={data} />
            <Footer></Footer>
        </>
    )
}
