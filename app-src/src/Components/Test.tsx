import { useQuery } from '@tanstack/react-query'
import { Carousel } from './Carousel'
import { Footer } from './Footer'
import { Header } from './Header'
import { getDataFromSheets } from '../db'
import { Grid } from './Grid'
import './test.css'

export function Test() {
    const { data: albums } = useQuery({
        queryFn: () => getDataFromSheets({ table: 'albums' }),
        queryKey: ['test'],
    })
    return (
        <>
            <Header></Header>

            <Grid>
                {albums
                    ?.sort((a, b) => b.year - a.year)
                    .map((album) => {
                        return (
                            <div
                                className="album"
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    // border: '1px solid black',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    boxShadow: 'var(--card-box-shadow)',
                                    // borderRadius: '10px',
                                }}
                            >
                                <img
                                    src={album.artwork}
                                    style={{ objectFit: 'cover' }}
                                    width={'100%'}
                                    alt=""
                                />
                                <div className="album-info">
                                    <p>
                                        <b>{album.artist}</b>
                                        <br />
                                        {album.title}
                                        <br />
                                        <i>{album.year}</i>
                                    </p>
                                </div>
                                {/* {JSON.stringify(album)} */}
                            </div>
                        )
                    })}
            </Grid>

            <Footer></Footer>
        </>
    )
}
