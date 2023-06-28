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
import { useLocalStorage } from 'usehooks-ts'

export function SubredditPage() {
    const [myStorage, setMyStorage] = useLocalStorage('subreddits', [])
    const original_after = ''
    const {
        data: {
            // images, after: original_after,
            subreddit,
        },
    } = useMatch<imageGenerics>()
    const { data } = useQuery({
        queryFn: () =>
            fetchImagesFromSub(
                // myStorage.join('+') ?? 'gonewild',
                subreddit ?? 'cute',
                undefined,
                true
            ),
        queryKey: ['sub', subreddit, myStorage.join('+') ?? 'gonewild'],
    })

    const navigate = useNavigate()

    const [inputState, setInputState] = useState('')
    type imageGenerics = MakeGenerics<{
        LoaderData: {
            images: string[]
            after: string
            subreddit: string
        }
    }>

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
                        setMyStorage((old) => [
                            ...old,
                            ev.currentTarget[0].value,
                        ])
                    }}
                >
                    <input type="text" name="" id="lol" />
                    <button type="submit">testa add 2 local storage</button>
                    <button
                        onClick={(ev) => {
                            ev.preventDefault()
                            setMyStorage([])
                        }}
                    >
                        delete
                    </button>
                </form>

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
            {data?.images && (
                <ImageViewer
                    key={subreddit}
                    images={[...data?.images, ...moreImages]}
                />
            )}
            <button
                style={{ maxWidth: '8rem', margin: 'auto' }}
                onClick={() => {
                    fetchImagesFromSub(subreddit ?? 'cute', after).then(
                        (res) => {
                            setMoreImages(res.images)
                            setAfter(data?.after)
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
