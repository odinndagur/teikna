import { Link, useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useLocalStorage } from 'usehooks-ts'

export function CollectionsPage() {
    // const {
    //     data: { collections },
    // } = useMatch()
    const [userCollections, setUserCollections] = useLocalStorage<
        { id: number | string; name: string; images: string[] }[]
    >('user-collections', [{ name: 'User collection', id: 1, images: [] }])
    return (
        <>
            <Header>
                <form
                    style={{ margin: 'auto' }}
                    onSubmit={(ev) => {
                        ev.preventDefault()
                        console.log(
                            'adding collection ' + ev.currentTarget[0].value
                        )
                        setUserCollections((oldCollections) => [
                            ...oldCollections,
                            {
                                id: Math.floor(Math.random() * 999999),
                                name: ev.currentTarget[0].value,
                                images: [],
                            },
                        ])
                    }}
                >
                    <input type="text" name="" id="lol" />
                    <button type="submit">Add collection</button>
                    {/* <button
                    onClick={(ev) => {
                        ev.preventDefault()
                        // setMyStorage([])
                    }}
                >
                    delete
                </button> */}
                    {/* {myStorage.map((val, idx) => (
                    <div key={idx}>{val}</div>
                ))} */}
                </form>
            </Header>

            <div key={JSON.stringify(userCollections)}>
                {userCollections
                    .sort((a, b) => a.id - b.id)
                    .map((c) => (
                        <Link to={`/collections/${c.id}`} key={c.id}>
                            <div className="card">
                                <div style={{ padding: '1rem 0' }}>
                                    {c.name}
                                </div>
                                <div>{`${c.images.length} images`}</div>
                            </div>
                        </Link>
                    ))}
            </div>
            <Footer></Footer>
        </>
    )
}
