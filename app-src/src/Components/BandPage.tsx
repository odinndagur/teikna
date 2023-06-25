import { MakeGenerics, useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { Carousel } from './Carousel'
import { ShowCard } from './ShowCard'
import { getBandByName } from '../db'
import { YoutubeLinkItem } from './YoutubeLinkItem'

type bandType = Awaited<ReturnType<typeof getBandByName>>
type bandGenerics = MakeGenerics<{
    LoaderData: { band: bandType }
}>

export function BandPage() {
    const {
        data: { band },
    } = useMatch<bandGenerics>()
    return (
        <>
            <Header>
                <h1>{band.name}</h1>
            </Header>
            {/* <div>{JSON.stringify(band)}</div> */}
            <Carousel>
                {band?.shows?.map((show) => (
                    <ShowCard show={show} />
                ))}
            </Carousel>
            <Carousel>
                {band?.videos?.map((video) => {
                    return (
                        <div
                            key={video.video_id}
                            style={{ display: 'block', width: '300px' }}
                        >
                            <YoutubeLinkItem video={video} />
                        </div>
                    )
                })}
            </Carousel>
            <Footer></Footer>
        </>
    )
}
