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
    >('user-collections', [{ name: 'Base', id: 1, images: [] }])

    const clearCurrentCollection = () => {
        const currentCollection = userCollections.find(
            (c) => c.id == collectionId
        )!
        setUserCollections((old) => [
            ...old.filter((c) => c.id != collectionId),
            { ...currentCollection, images: [] },
        ])
        const el = document.getElementById(
            'delete-current-collection-modal'
        ) as HTMLDialogElement
        el.close()
    }
    const showDeleteModal = () => {
        const el = document.getElementById(
            'delete-current-collection-modal'
        ) as HTMLDialogElement
        el.showModal()
    }
    return (
        <>
            <Header></Header>
            <dialog
                className="dialog-screenshot"
                style={{
                    border: 'none',
                    outline: '1px solid red',
                    padding: '2rem',
                    boxSizing: 'border-box',
                    borderRadius: '10px',
                }}
                id="delete-current-collection-modal"
                onClick={(ev) => {
                    const dialog = document.getElementById(
                        'delete-current-collection-modal'
                    ) as HTMLDialogElement
                    if (ev.target == dialog) {
                        dialog.close()
                        return
                    }
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        minWidth: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <h1>Delete collection</h1>
                    <p>
                        Are you sure you want to delete the collection{' '}
                        <span style={{ fontStyle: 'italic' }}>
                            {
                                userCollections?.find(
                                    (c: any) => c.id == collectionId
                                )?.name
                            }
                        </span>
                        ?
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            padding: '1rem',
                        }}
                    >
                        <button
                            onClick={() => {
                                clearCurrentCollection()
                            }}
                            style={{ backgroundColor: 'red' }}
                        >
                            Delete
                        </button>
                        <form method="dialog">
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: 'var(--accent-color)',
                                }}
                            >
                                Go back
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* {JSON.stringify(userCollections)}
            {collectionId} */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <h2>
                    {
                        userCollections?.find((c: any) => c.id == collectionId)
                            ?.name
                    }
                </h2>
                <button
                    style={{ height: '2rem' }}
                    onClick={() => {
                        showDeleteModal()
                    }}
                >
                    Clear collection{' '}
                    <span className="material-icons">clear</span>
                </button>
            </div>
            <ImageViewer
                key={Number(collectionId)}
                collectionId={collectionId}
                images={
                    userCollections?.find((c) => c.id == collectionId)
                        ?.images ?? []
                }
            />
            <Footer></Footer>
        </>
    )
}
