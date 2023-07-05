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
import { useEffect, useRef, useState } from 'react'
import { movieGenerics } from './MoviePage'
import { useVirtualizer } from '@tanstack/react-virtual'

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

    const { data } = useQuery({
        queryFn: () => searchMovies(String(search.query ?? '')),
        queryKey: ['search', search],
        staleTime: 0,
        cacheTime: 0,
    })
    // console.log(movies)
    useEffect(() => {}, [searchValue])

    const movieListRef = useRef(null)
    const rowVirtualizer = useVirtualizer({
        count: Number(data?.total_count),
        getScrollElement: () => movieListRef.current,
        estimateSize: () => 100,
        overscan: 150,
        debug: import.meta.env.MODE == 'development',
        // scrollToFn
    })

    useEffect(() => {
        rowVirtualizer.scrollToOffset(10000)
    }, [])

    return (
        <>
            <Header>
                <input
                    type="search"
                    onChange={(ev) => handleInput(ev.target.value)}
                ></input>
            </Header>
            <div
                className="movie-list"
                ref={movieListRef}
                style={{
                    height: `100%`,
                    overflow: 'auto', // Make it scroll!
                }}
            >
                {/* The large inner element to hold all of the items */}
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {/* Only the visible items in the virtualizer, manually positioned to be in view */}
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                        const movie = data?.movies[virtualItem.index]
                        if (movie) {
                            return (
                                <div
                                    key={virtualItem.key}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualItem.size}px`,
                                        transform: `translateY(${virtualItem.start}px)`,
                                        boxShadow: 'var(--card-box-shadow)',
                                        borderBottom:
                                            '1px solid var(--main-text-color)',
                                        padding: '1rem',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <Link
                                        key={searchValue + movie.id}
                                        to={`/movies/${movie.id}`}
                                        className=""
                                        style={
                                            {
                                                // boxShadow:
                                                //     'var(--card-box-shadow)',
                                                // borderBottom:
                                                //     '1px solid var(--main-text-color)',
                                                // padding: '1rem',
                                                // width: '100%',
                                                // boxSizing: 'border-box',
                                            }
                                        }
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <b>{movie.title}</b>{' '}
                                            <i>{movie.year}</i>
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
                                </div>
                            )
                        }
                    })}
                </div>

                {false &&
                    data?.movies?.map((movie) => {
                        return (
                            <Link
                                key={searchValue + movie.id}
                                to={`/movies/${movie.id}`}
                                className=""
                                style={{
                                    boxShadow: 'var(--card-box-shadow)',
                                    borderBottom:
                                        '1px solid var(--main-text-color)',
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
            </div>
            <Footer></Footer>
        </>
    )
}
