import { useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'
import { getMovieById } from '../db'

export function MoviePage() {
    const {
        data: { movie },
    } = useMatch()

    return (
        <>
            <Header></Header>
            {/* {JSON.stringify(movie)} */}
            <h1>{image.title}</h1>
            {movie?.images?.map((img) => {
                return <img src={img} key={img} width={'50%'}></img>
            })}
            <Footer></Footer>
        </>
    )
}
