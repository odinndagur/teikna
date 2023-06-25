import { useQuery } from '@tanstack/react-query'
import { getAllMovies, getSomeMovies, searchMovies } from '../db'
import { Header } from './Header'
import { Footer } from './Footer'
import { Link } from '@tanstack/react-location'
import { useState } from 'react'

export function MoviesList() {
    // const { data: movies } = useQuery({
    //     queryFn: () => getAllMovies(),
    //     queryKey: ['movies'],
    // })
    const [searchValue, setSearchValue] = useState('')
    const { data: movies } = useQuery({
        queryFn: () => searchMovies(searchValue),
        queryKey: ['movies', searchValue],
    })
    const handleInput = (val: string) => {
        console.log(val)
        setSearchValue(val)
    }
    return (
        <>
            <Header>
                <input
                    type="search"
                    onChange={(ev) => handleInput(ev.target.value)}
                ></input>
            </Header>
            {movies?.map((movie) => {
                return (
                    <Link
                        to={`/movies/${movie.id}`}
                        className=""
                        style={{
                            boxShadow: 'var(--card-box-shadow)',
                            padding: '1rem',
                            // width: '100%',
                            // boxSizing: 'border-box',
                        }}
                    >
                        <div>
                            <b>{movie.title}</b>
                        </div>
                        <div>
                            <i>{movie.year}</i>
                        </div>
                        {/* <img src={movie.images[0]}></img> */}
                    </Link>
                )
            })}
            <Footer></Footer>
        </>
    )
}
