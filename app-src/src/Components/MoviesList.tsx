import { useQuery } from '@tanstack/react-query'
import { getAllMovies, getSomeMovies } from '../db'
import { Header } from './Header'
import { Footer } from './Footer'

export function MoviesList() {
    const { data: movies } = useQuery({
        queryFn: () => getAllMovies(),
        queryKey: ['movies'],
    })
    return (
        <>
            <Header></Header>
            {movies?.map((movie) => {
                return (
                    <div className="card">
                        <div>
                            <b>{movie.title}</b>
                        </div>
                        <div>
                            <i>{movie.year}</i>
                        </div>
                        {/* <img src={movie.images[0]}></img> */}
                    </div>
                )
            })}
            <Footer></Footer>
        </>
    )
}
