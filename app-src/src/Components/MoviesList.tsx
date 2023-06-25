import { useQuery } from '@tanstack/react-query'
import { getAllMovies, getSomeMovies } from '../db'

export function MoviesList() {
    const { data: movies } = useQuery({
        queryFn: () => getSomeMovies(),
        queryKey: ['movies'],
    })
    return (
        <>
            {movies?.map((movie) => {
                return (
                    <div>
                        <b>{movie.title}</b>
                        <i>{movie.year}</i>
                        <img src={movie.images[0]}></img>
                    </div>
                )
            })}
        </>
    )
}
