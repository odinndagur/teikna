import { MakeGenerics, useMatch, useNavigate } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useQuery } from '@tanstack/react-query'
import { fetchImagesFromSub, getMovieById } from '../db'
import { Grid } from './Grid'

import './MoviePage.css'
import { Carousel } from './Carousel'
import { ImageViewer } from './ImageViewer'
import { useState } from 'react'

export function SubredditPage() {
    const { data } = useQuery({
        queryFn: () => fetchImagesFromSub('gonewild'),
        queryKey: ['sub', 'gonewild'],
    })

    const navigate = useNavigate()

    const [inputState, setInputState] = useState('')

    const {
        data: { images },
    } = useMatch()
    return (
        <>
            <Header>
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
                    />{' '}
                    <button type="submit">Go</button>
                </form>
            </Header>
            {/* {JSON.stringify(movie)} */}
            <ImageViewer images={images} />
            <Footer></Footer>
        </>
    )
}
