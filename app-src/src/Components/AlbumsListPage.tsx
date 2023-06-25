import { useMatch } from '@tanstack/react-location'

export function AlbumsListPage() {
    const {
        data: { albums },
    } = useMatch()
    return (
        <div>
            {albums.map((album) => {
                return (
                    <>
                        <h1>{album.band}</h1>
                        <i>{album.year}</i>
                        <hr />
                        <img src={album.artwork} alt="" />
                    </>
                )
            })}
        </div>
    )
}
