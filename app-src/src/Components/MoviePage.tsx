import { useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'
import { getMovieById } from '../db'
import { Grid } from './Grid'

export function MoviePage() {
    const {
        data: { movie },
    } = useMatch()

    return (
        <>
            <Header></Header>
            {/* {JSON.stringify(movie)} */}
            <h1>{movie?.title}</h1>
            <Grid>
                {movie?.images?.map((img) => {
                    return <img src={img} key={img}></img>
                })}
            </Grid>
            <Footer></Footer>
        </>
    )
}
