import { useMatch, useNavigate, useSearch } from '@tanstack/react-location'
import { Header } from './Header'
import { Footer } from './Footer'
import { useState } from 'react'

export function ImagePage() {
    const { imageUrl } = useSearch()
    console.log(imageUrl)
    // const imageUrl = 'https://i.redd.it/t48gxtvudf8b1.jpg'
    const [mirrored, setMirrored] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const navigate = useNavigate()

    return (
        <div style={{ overflow: 'hidden' }}>
            {/* <Header></Header> */}
            <div
                // className="dialog-screenshot"
                id={imageUrl}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    border: 'none',
                    minWidth: '80%',
                    // maxWidth: '100%',
                    // maxHeight: '100%',
                    // maxWidth: '100%',
                    // maxHeight: '100%',
                    width: '100vw',
                    height: '100vh',
                    boxSizing: 'border-box',
                    padding:
                        'env(safe-area-border-top),env(safe-area-border-right),env(safe-area-border-bottom),env(safe-area-border-left)',
                    // minHeight: '80%',
                    // boxSizing: 'border-box',
                    // backdropFilter: 'blur(10px)',
                    // WebkitBackdropFilter: 'blur(10px)',
                    // backgroundImage: `url(${movie.images[9]})`,
                    // backgroundColor: 'red',
                }}
            >
                <div
                    style={
                        {
                            // display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            // height: '100%',
                            // width: '100%',
                        }
                    }
                    key={String(mirrored)}
                >
                    <div
                        className="no-scrollbar"
                        style={{
                            display: 'flex',
                            position: 'absolute',
                            left: 0,
                            visibility: showControls ? 'visible' : 'hidden',
                            justifyContent: 'space-between',
                            width: '100%',
                            // margin: 'auto',
                            boxSizing: 'border-box',
                            padding: '1rem 2rem',
                            zIndex: 5,
                        }}
                    >
                        <button
                            style={
                                {
                                    // position: 'absolute',
                                    // transform: 'translate(-000%,00%)',
                                    // top: '1rem',
                                    // left: '1rem',
                                    // zIndex: 5,
                                }
                            }
                            className="material-icons"
                            onClick={() => history.back()}
                        >
                            arrow_back
                        </button>
                        <button
                            style={{
                                // position: 'absolute',
                                // top: '1rem',
                                // right: '1rem',
                                // zIndex: 5,
                                transform: mirrored ? 'scaleX(-1)' : undefined,
                            }}
                            className="material-icons"
                            onClick={(ev) => {
                                ev.preventDefault()
                                setMirrored((old) => !old)
                            }}
                        >
                            flip
                        </button>
                    </div>
                    {/* <div> */}
                    <img
                        src={imageUrl}
                        alt=""
                        onClick={() => setShowControls((old) => !old)}
                        style={{
                            placeSelf: 'center',
                            objectFit: 'contain',
                            // width: '100%',
                            // height: '100%',
                            // outline: '5px solid green',
                            maxHeight: '100%',
                            maxWidth: '100%',
                            transform: mirrored ? 'scaleX(-1)' : undefined,
                            // backgroundColor: 'red',
                        }}
                        // ref={currentImageRef}
                    />
                    {/* </div> */}
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    )
}
