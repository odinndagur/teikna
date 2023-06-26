import { MakeGenerics, useMatch, useNavigate } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'
import { fetchImagesFromSub, getMovieById } from '../db'
import { Grid } from './Grid'

import './MoviePage.css'
import { Carousel } from './Carousel'
import { ImageViewer } from './ImageViewer'
import { useEffect, useState } from 'react'

export function SubredditPage() {
    // const { data } = useQuery({
    //     queryFn: () => fetchImagesFromSub('gonewild'),
    //     queryKey: ['sub', 'gonewild'],
    // })

    const navigate = useNavigate()

    const [inputState, setInputState] = useState('')
    type imageGenerics = MakeGenerics<{
        LoaderData: {
            images: string[]
            after: string
            subreddit: string
        }
    }>
    const {
        data: { images, after: original_after, subreddit },
    } = useMatch<imageGenerics>()

    useEffect(() => {
        setAfter(original_after)
    }, [])

    const [moreImages, setMoreImages] = useState([])
    const [after, setAfter] = useState('')

    // const { data } = useQuery({
    //     queryFn: () => fetchImagesFromSub(subreddit ?? 'cute', after),
    //     queryKey: [subreddit, after],
    // })

    return (
        <>
            <Header>
                <datalist id="subreddits"></datalist>
                <form
                    onSubmit={(ev) => {
                        ev.preventDefault()
                        navigate({ to: `/subreddit/${inputState}` })
                    }}
                >
                    <input
                        onChange={(ev) => setInputState(ev.currentTarget.value)}
                        type="text"
                        name=""
                        id=""
                        placeholder="Go to subreddit..."
                        list="subreddits"
                    />{' '}
                    <button type="submit">Go</button>
                </form>
            </Header>
            {/* {JSON.stringify(movie)} */}
            <ImageViewer images={[...images!, ...moreImages]} />
            <button
                style={{ maxWidth: '8rem', margin: 'auto' }}
                onClick={() => {
                    fetchImagesFromSub(subreddit ?? 'cute', after).then(
                        (res) => {
                            setMoreImages(res.images)
                            setAfter(res.after)
                        }
                    )
                }}
            >
                Load more
            </button>
            <Footer></Footer>
        </>
    )
}
