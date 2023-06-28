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
    >('user-collections', [])
    return (
        <>
            <Header></Header>
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

            <div key={userCollections.length}>
                <div>
                    <Link to={`/collections/1`}>Base</Link>
                </div>

                {userCollections.map((c) => (
                    <div>
                        <Link to={`/collections/${c.id}`} key={c.id}>
                            {c.name}
                        </Link>
                    </div>
                ))}
            </div>
            <Footer></Footer>
        </>
    )
}
