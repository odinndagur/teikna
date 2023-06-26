import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllMovies, getSomeMovies, searchMovies } from '../db'
import { Header } from './Header'
import { Footer } from './Footer'
import {
    Link,
    useMatch,
    useNavigate,
    useSearch,
} from '@tanstack/react-location'
import { useEffect, useState } from 'react'
import { movieGenerics } from './MoviePage'

export function MoviesList() {
    // const { data: movies } = useQuery({
    //     queryFn: () => getAllMovies(),
    //     queryKey: ['movies'],
    // })
    const [searchValue, setSearchValue] = useState('')
    // const { data: movies } = useQuery({
    //     queryFn: () => searchMovies(searchValue),
    //     queryKey: ['movies', searchValue],
    // })

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // const {
    //     data: { movies },
    // } = useMatch<movieGenerics>()
    const handleInput = (val: string) => {
        console.log(val)
        setSearchValue(val)
        queryClient.invalidateQueries(['search'])
        navigate({ search: (old) => ({ ...old, query: val }), replace: true })
    }

    const search = useSearch()

    const { data: movies } = useQuery({
        queryFn: () => searchMovies(String(search.query ?? '')),
        queryKey: ['search', search],
        staleTime: 0,
        cacheTime: 0,
    })
    console.log(movies)
    useEffect(() => {}, [searchValue])
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
                        key={searchValue + movie.id}
                        to={`/movies/${movie.id}`}
                        className=""
                        style={{
                            boxShadow: 'var(--card-box-shadow)',
                            borderBottom: '1px solid var(--main-text-color)',
                            padding: '1rem',
                            // width: '100%',
                            // boxSizing: 'border-box',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <b>{movie.title}</b> <i>{movie.year}</i>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <p>{movie.director}</p>
                        </div>
                        {/* <img src={movie.images[0]}></img> */}
                    </Link>
                )
            })}
            <Footer></Footer>
        </>
    )
}
