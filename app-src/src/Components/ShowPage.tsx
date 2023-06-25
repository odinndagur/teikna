import { MakeGenerics, useMatch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { getShowsDataFromSheets } from '../db'
import { useTranslation } from 'react-i18next'
import { Carousel } from './Carousel'
import { YoutubeLinkItem } from './YoutubeLinkItem'
type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type showType = ArrayElement<Awaited<ReturnType<typeof getShowsDataFromSheets>>>
type showGenerics = MakeGenerics<{
    LoaderData: { show: showType }
}>
export function ShowPage() {
    const { t, i18n, ready } = useTranslation()
    const {
        data: { show, showVideos },
    } = useMatch()
    return (
        <>
            <Header></Header>
            <div
                key={show?.id}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>{show?.name}</h1>
                <p>{show?.bands.join(', ')}</p>
                <p>
                    {show?.date.toLocaleDateString(i18n.language, {
                        dateStyle: 'medium',
                    })}
                </p>
                <div style={{ maxWidth: '80%' }}>
                    <img
                        src={show?.image}
                        alt=""
                        style={{ objectFit: 'scale-down', maxWidth: '100%' }}
                    />
                </div>
            </div>
            {showVideos && (
                <Carousel>
                    {showVideos?.map((row) => {
                        return (
                            <div
                                key={row.video_id}
                                style={{ display: 'block', width: '300px' }}
                            >
                                <YoutubeLinkItem video={row.sets[0]} />
                            </div>
                        )
                    })}
                </Carousel>
            )}
            <Footer></Footer>
        </>
    )
}
