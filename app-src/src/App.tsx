import { useState, useEffect, Suspense } from 'react'
import { ThemeContext } from './Components/ThemeContext'
import HomePage from './Components/Home'
import { VideoListPage } from './Components/VideoListPage'
import {
    query,
    getShowsDataFromSheets,
    getMovieById,
    searchMovies,
    fetchImagesFromSub,
    getRandomMovie,
    getCollectionById,
    getCollections,
} from './db'
import {
    ReactLocation,
    Router,
    Outlet,
    Navigate,
    MakeGenerics,
} from '@tanstack/react-location'

import PlaceholderScreen from './Components/PlaceholderScreen'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppNavBar } from './Components/AppNavBar'
import { DarkModeSwitch } from './Components/DarkModeSwitch'
import { NotFound } from './Components/NotFound'
import { MyLocationGenerics } from './Components/Generics'
import { RawSql } from './Components/RawSql'
import { Footer } from './Components/Footer'
import { Header } from './Components/Header'
import { VideoPage } from './Components/VideoPage'
import { useTranslation } from 'react-i18next'
import { Test } from './Components/Test'
import { Misc } from './Components/Misc'
import { MoviesList } from './Components/MoviesList'
import { MoviePage } from './Components/MoviePage'
import { SubredditPage } from './Components/SubredditPage'
import { RandomMovie } from './Components/RandomMovie'
import { CollectionsPage } from './Components/CollectionsPage'
import { CollectionPage } from './Components/CollectionPage'

const reactLocation = new ReactLocation()

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 1000 * 60 * 5,
            networkMode: 'offlineFirst',
        },
    },
})

type searchGenerics = MakeGenerics<{
    Search: {
        query?: string
    }
}>

function App() {
    const { t, i18n, ready } = useTranslation()
    const [standalone, setStandalone] = useState(false)
    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setStandalone(true)
        }
    })
    const [promiseWorkerLoaded, setPromiseWorkerLoaded] = useState(false)
    const [currentTheme, setCurrentTheme] = useState(
        window.localStorage.getItem('theme_mode') ?? 'light'
    )
    useEffect(() => {
        const intervalID = setInterval(() => {
            console.log('callback yo')
            try {
                query('select * from movie limit 5').then((res: any) => {
                    if (res[0]) {
                        clearInterval(intervalID)
                        setPromiseWorkerLoaded(true)
                        console.log('promise worker loaded')
                    }
                })
            } catch (error) {
                console.error(error)
            }
        }, 500)
    }, [])

    if (!promiseWorkerLoaded) {
        return
        return <PlaceholderScreen />
    }
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <ThemeContext.Provider
                    value={{ currentTheme, setCurrentTheme }}
                >
                    <Router
                        location={reactLocation}
                        basepath="/teikna/"
                        // defaultLinkPreloadMaxAge={Infinity}
                        // defaultPendingElement={<PlaceholderScreen />}
                        // defaultLoaderMaxAge={Infinity}
                        routes={[
                            {
                                path: '/',
                                element: <Navigate to={'/movies'} />,
                            },
                            {
                                path: 'home',
                                element: <HomePage />,
                            },
                            {
                                path: 'movies',
                                children: [
                                    {
                                        path: '/',
                                        element: <MoviesList />,
                                        loader: async ({ search }) => ({
                                            movies: await queryClient.fetchQuery(
                                                {
                                                    queryFn: () =>
                                                        searchMovies(
                                                            String(
                                                                search.query ??
                                                                    ''
                                                            )
                                                        ),
                                                    queryKey: [
                                                        'search',
                                                        search,
                                                    ],
                                                    staleTime: 0,
                                                    cacheTime: 0,
                                                }
                                            ),
                                        }),
                                        loaderMaxAge: 0,
                                    },
                                    {
                                        path: ':id',
                                        element: <MoviePage />,
                                        loader: async ({ params }) => ({
                                            movie: await getMovieById(
                                                params.id
                                            ),
                                        }),
                                    },
                                ],
                            },
                            {
                                path: 'subreddit',
                                children: [
                                    {
                                        path: '/',
                                        element: <SubredditPage />,
                                        // loader: async () => {
                                        //     const { images, after } =
                                        //         await fetchImagesFromSub('cute')
                                        //     return {
                                        //         images,
                                        //         after,
                                        //     }
                                        // },
                                    },
                                    {
                                        path: ':subreddit',
                                        element: <SubredditPage />,
                                    },
                                ],
                            },
                            {
                                path: 'collections',
                                children: [
                                    {
                                        path: '/',
                                        element: <CollectionsPage />,
                                        loader: async () => ({
                                            collections: await getCollections(),
                                        }),
                                    },
                                    {
                                        path: ':collectionId',
                                        element: <CollectionPage />,
                                        loader: async ({ params }) => ({
                                            // images: await getCollectionById(
                                            //     params.id
                                            // ),
                                            collectionId: params.collectionId,
                                        }),
                                    },
                                ],
                            },
                            {
                                path: 'random',
                                element: <RandomMovie />,
                                loader: async () => ({
                                    movie: await getRandomMovie(),
                                }),
                            },
                            {
                                path: 'videos',
                                children: [
                                    {
                                        path: '/',
                                        element: <VideoListPage />,
                                    },
                                    {
                                        path: ':id',
                                        element: <VideoPage />,

                                        // loader: async ({ params }) => ({
                                        //     video: await getVideoById(
                                        //         params.id
                                        //     ),
                                        //     show: await getShowByVideoId(
                                        //         params.id
                                        //     ),
                                        //     bandVideos:
                                        //         await getBandsVideosByVideoId(
                                        //             params.id
                                        //         ),
                                        // }),
                                    },
                                ],
                            },
                            // {
                            //     path: 'albums',
                            //     children: [
                            //         {
                            //             path: '/',
                            //             element: <AlbumsListPage />,
                            //             loader: async () => ({
                            //                 albums: await queryClient.fetchQuery(
                            //                     {
                            //                         queryFn: () => [
                            //                             {
                            //                                 band: 'lolzon sponson',
                            //                                 album: 'jogle your bogle',
                            //                                 year: 2019,
                            //                                 genre: 'Rock',
                            //                                 style: 'Hardcore',
                            //                                 artwork:
                            //                                     'https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0',
                            //                             },
                            //                             {
                            //                                 band: 'Gavin Portland',
                            //                                 album: 'IV - Hand In Hand With Traitors, Back To Back With Whores',
                            //                                 year: 2010,
                            //                                 genre: 'Rock',
                            //                                 style: 'Hardcore',
                            //                                 artwork:
                            //                                     'https://i.discogs.com/YZLxekrJ44Yb2oMRxgfxW00S_LR6oj0aGsnLEyJraRg/rs:fit/g:sm/q:90/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM2NDg5/MzctMTMzODgyMTU5/Ni0xMzgxLmpwZWc.jpeg',
                            //                             },
                            //                         ],
                            //                         queryKey: ['albums'],
                            //                     }
                            //                 ),
                            //             }),
                            //         },
                            //         {
                            //             path: ':id',
                            //             element: <VideoPage />,

                            //             loader: async ({ params }) => ({
                            //                 video: await getVideoById(
                            //                     params.id
                            //                 ),
                            //                 show: await getShowByVideoId(
                            //                     params.id
                            //                 ),
                            //                 bandVideos:
                            //                     await getBandsVideosByVideoId(
                            //                         params.id
                            //                     ),
                            //             }),
                            //         },
                            //     ],
                            // },
                            // {
                            //     path: 'bands',
                            //     children: [
                            //         {
                            //             path: '/',
                            //             element: (
                            //                 <>
                            //                     <Header></Header>
                            //                     <div>Bands page</div>
                            //                     <Footer></Footer>
                            //                 </>
                            //             ),
                            //         },
                            //         {
                            //             path: ':name',
                            //             element: <BandPage />,

                            //             loader: async ({ params }) => ({
                            //                 band: await queryClient.fetchQuery({
                            //                     queryFn: () =>
                            //                         getBandByName(
                            //                             decodeURIComponent(
                            //                                 params.name
                            //                             )
                            //                         ),
                            //                     queryKey: [
                            //                         'bands',
                            //                         params.name,
                            //                     ],
                            //                 }),
                            //             }),
                            //         },
                            //     ],
                            // },
                            // {
                            //     path: 'shows',
                            //     children: [
                            //         {
                            //             path: '/',
                            //             element: <ShowsListPage />,
                            //             loader: async () => {
                            //                 const shows =
                            //                     await queryClient.fetchQuery({
                            //                         queryFn: async () =>
                            //                             await getShowsDataFromSheets(),
                            //                         queryKey: ['shows'],
                            //                     })
                            //                 return { shows }
                            //             },
                            //         },
                            //         {
                            //             path: ':id',
                            //             element: <ShowPage />,

                            //             loader: async ({ params }) => {
                            //                 const shows =
                            //                     await queryClient.fetchQuery({
                            //                         queryFn: async () =>
                            //                             await getShowsDataFromSheets(),
                            //                         queryKey: ['shows'],
                            //                     })
                            //                 const show = shows.find(
                            //                     (show) => show.id == params.id
                            //                 )
                            //                 const realShowId =
                            //                     await query(`select show.id from show join venue on show.venue_id = venue.id
                            //                 where show.date = "${show?.date.getFullYear()}-${String(
                            //                         (show?.date.getMonth() ??
                            //                             0) + 1
                            //                     ).padStart(2, '0')}-${String(
                            //                         show?.date.getDate()
                            //                     ).padStart(2, '0')}"
                            //                     and venue.venue_name like "%${
                            //                         show!.venue
                            //                     }%"
                            //                 `)
                            //                 const showVideos =
                            //                     realShowId[0]?.id &&
                            //                     (await getShowById({
                            //                         showId: realShowId[0].id,
                            //                     }))
                            //                 return {
                            //                     show,
                            //                     showVideos,
                            //                 }
                            //             },

                            //             // loader: async ({ params }) => ({
                            //             //     video: await getVideoById(
                            //             //         params.id
                            //             //     ),
                            //             //     show: await getShowByVideoId(
                            //             //         params.id
                            //             //     ),
                            //             //     bandVideos:
                            //             //         await getBandsVideosByVideoId(
                            //             //             params.id
                            //             //         ),
                            //             // }),
                            //         },
                            //     ],
                            // },
                            {
                                path: 'sql',
                                element: <RawSql />,
                            },
                            // {
                            //     path: 'default-collections',
                            //     element: <GetCollections />,
                            // },
                            {
                                path: 'test',
                                element: <Test />,
                            },
                            {
                                path: 'misc',
                                element: <Misc />,
                            },
                            {
                                // Passing no route is equivalent to passing `path: '*'`
                                element: <NotFound />,
                            },
                        ]}
                    >
                        {!promiseWorkerLoaded && <Header></Header>}
                        <Outlet />
                        {!promiseWorkerLoaded && <Footer></Footer>}
                        {/* <AppNavBar type="footer" /> */}
                        {/* <div
                            className="dark-mode-switch-container"
                            style={{
                                position: 'fixed',
                                top: 'env(safe-area-inset-top)',
                                right: '0',
                                padding: '1rem',
                                zIndex: 9999,
                            }}
                        >
                            <DarkModeSwitch setCurrentTheme={setCurrentTheme} />
                        </div> */}

                        <dialog
                            id="app-save-modal"
                            onClick={(ev) => {
                                const dialog = document.getElementById(
                                    'app-save-modal'
                                ) as HTMLDialogElement
                                if (ev.target == dialog) {
                                    dialog.close()
                                }
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: '2rem',
                                    maxWidth: '70vw',
                                }}
                            >
                                <form method="dialog" style={{}}>
                                    <button style={{ maxWidth: '2rem' }}>
                                        x
                                    </button>
                                </form>
                                <div>
                                    <h3>{t('directions_save_app_heading')}</h3>
                                    <p>{t('directions_save_app_intro')}</p>
                                    <p>
                                        <b>iPhone:</b>{' '}
                                        {t('directions_save_app_iphone')}
                                    </p>
                                    <p>
                                        <b>Android:</b>{' '}
                                        {t('directions_save_app_android')}
                                    </p>
                                </div>
                            </div>
                        </dialog>
                    </Router>
                </ThemeContext.Provider>
            </QueryClientProvider>
        </Suspense>
    )
}

export default App
