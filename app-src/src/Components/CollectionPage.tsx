import { useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useLocalStorage } from 'usehooks-ts'
import { ImageViewer } from './ImageViewer'

export function CollectionPage() {
    const {
        data: { collectionId },
    } = useMatch()
    //const [userCollection, setUserCollection] = useLocalStorage<string[]>(
    //    'user-collection',
    //    []
    //)
    const [userCollections, setUserCollections] = useLocalStorage<
        { id: number | string; name: string; images: string[] }[]
    >('user-collections', [])
    return (
        <>
            <Header></Header>
            {/* {JSON.stringify(userCollections)}
            {collectionId} */}
            <h2>
                {userCollections?.find((c: any) => c.id == collectionId)?.name}
            </h2>
            <ImageViewer
                key={Number(collectionId)}
                images={
                    userCollections?.find((c) => c.id == collectionId)
                        ?.images ?? []
                }
            />
            <Footer></Footer>
        </>
    )
}
