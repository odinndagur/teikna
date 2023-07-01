import {
    MakeGenerics,
    useLocation,
    useMatch,
    useNavigate,
    useSearch,
} from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchImagesFromSub, getMovieById } from '../db'
import { Grid } from './Grid'

import './MoviePage.css'
import { Carousel } from './Carousel'
import { ImageViewer } from './ImageViewer'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export function SubredditPage() {
    const queryClient = useQueryClient()
    const {
        data: { subreddit },
    } = useMatch()
    const [after, setAfter] = useState(undefined)
    const [myStorage, setMyStorage] = useLocalStorage('subreddits', [])
    // const [currentSubreddit, setCurrentSubreddit] = useLocalStorage(
    //     'current-subreddit',
    //     'cute'
    // )
    const [shouldGetMoreImages, setShouldGetMoreImages] = useState(0)
    const { data, refetch } = useQuery({
        queryFn: () =>
            fetchImagesFromSub({
                sub: subreddit ?? 'cute',
                after: after,
            }),
        // {
        //     const data = await fetchImagesFromSub({
        //         sub: currentSubreddit ?? 'cute',
        //         after: after,
        //     })

        //     console.log({ data }, 'DATA INNI I USE QUERY')
        //     setAfter(data.after)
        //     if (!data) {
        //         return { images: [], after: '' }
        //     }
        //     return data
        // },
        keepPreviousData: true,
        refetchOnMount: false,
        enabled: true,
        queryKey: [subreddit],
        // staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    useEffect(() => {
        setAfter(data?.after ?? '')
    }, [data?.images])

    const navigate = useNavigate()

    const [inputState, setInputState] = useState('')
    type imageGenerics = MakeGenerics<{
        LoaderData: {
            images: string[]
            after: string
            subreddit: string
        }
    }>

    // useEffect(() => {
    //     setAfter(original_after)
    // }, [])

    // const { data } = useQuery({
    //     queryFn: () => fetchImagesFromSub(subreddit ?? 'cute', after),
    //     queryKey: [subreddit, after],
    // })

    return (
        <div>
            {/* {currentSubreddit} */}
            <Header>
                <datalist id="subreddits" key={myStorage.join(',')}>
                    {myStorage.map((val, idx) => (
                        <option value={val} key={idx}>
                            {val}
                        </option>
                    ))}
                </datalist>

                <form
                    onSubmit={(ev) => {
                        ev.preventDefault()
                        // setCurrentSubreddit(inputState)
                        queryClient.invalidateQueries({
                            queryKey: [subreddit, shouldGetMoreImages],
                        })
                        setAfter('')
                        navigate({
                            to: `/subreddit/${inputState}`,
                        })
                    }}
                >
                    <input
                        style={{ margin: '1rem' }}
                        onChange={(ev) => setInputState(ev.currentTarget.value)}
                        type="text"
                        name=""
                        id=""
                        placeholder="Go to subreddit..."
                        list="subreddits"
                    />
                    <br />
                    <button type="submit">Go</button>
                    <button
                        onClick={(ev) => {
                            ev.preventDefault()
                            setMyStorage((old) => [...old, inputState])
                        }}
                    >
                        Add to list
                    </button>
                    <button
                        type="submit"
                        onClick={(ev) => {
                            ev.preventDefault()
                            setMyStorage([])
                        }}
                    >
                        Clear list
                    </button>
                </form>
            </Header>
            {/* {JSON.stringify(movie)} */}
            <ImageViewer
                // key={currentSubreddit}
                images={data?.images}
            />
            <button
                style={{ maxWidth: '8rem', margin: 'auto' }}
                onClick={(ev) => {
                    console.log(ev)
                    ev.preventDefault()
                    ev.stopPropagation()
                    refetch()
                    // setShouldGetMoreImages((old) => old + 1)
                    // refetch()
                }}
            >
                Load more
            </button>
            <Footer></Footer>
        </div>
    )
}
