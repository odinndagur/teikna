import { useNavigate } from '@tanstack/react-location'
import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

import { useLocalStorage } from 'usehooks-ts'
import { SubredditPage } from './SubredditPage'
import { ImageViewer } from './ImageViewer'
import { fetchImagesFromSub } from '../db'

export function Misc() {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()

    const [lol, setLol] = useState('')
    const [myStorage, setMyStorage] = useLocalStorage('misc', [])

    const [moreImages, setMoreImages] = useState([])
    const [after, setAfter] = useState('')

    const [images, setImages] = useState([])
    const [subreddits, setSubreddits] = useState('')
    useEffect(() => {
        setSubreddits(myStorage.join('+'))
    }, [myStorage])
    useEffect(() => {
        fetchImagesFromSub(subreddits ?? 'cute', after).then((res) => {
            setMoreImages((old) => [...old, ...res.images])
            setAfter(res.after)
        })
    }, [subreddits])

    return (
        <div>
            <Header></Header>
            <form
                onSubmit={(ev) => {
                    ev.preventDefault()
                    navigate({ to: `/${searchValue}` })
                }}
            >
                <input
                    type="text"
                    onChange={(ev) => setSearchValue(ev.target.value)}
                />
                <button type="submit">Go to /{searchValue}</button>
            </form>

            <form
                onSubmit={(ev) => {
                    ev.preventDefault()
                    setMyStorage((old) => [...old, ev.currentTarget[0].value])
                }}
            >
                <input type="text" name="" id="lol" />
                <button type="submit">testa add 2 local storage</button>
                {myStorage.map((val, idx) => (
                    <div key={idx}>{val}</div>
                ))}
            </form>

            <ImageViewer images={[...images!, ...moreImages]} />
            <button
                style={{ maxWidth: '8rem', margin: 'auto' }}
                onClick={() => {
                    fetchImagesFromSub(subreddits ?? 'cute', after).then(
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
        </div>
    )
}
