import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Link } from '@tanstack/react-location'

export function ImageElement({
    img,
    selectImage,
    idx,
    collectionId,
    movieId,
    images,
    style,
}: {
    img: string
    selectImage: any
    idx?: number
    collectionId?: number
    movieId?: string | number
    images?: string[]
    style?: any
}) {
    const modalId = 'image-viewer-modal'

    const [mirrored, setMirrored] = useState(false)
    const [showGrid, setShowGrid] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [currentImageSize, setCurrentImageSize] = useState()
    const [userCollections, setUserCollections] = useLocalStorage<
        { id: number | string; name: string; images: string[] }[]
    >('user-collections', [{ name: 'Base', id: 1, images: [] }])
    const [rotation, setRotation] = useState(0)
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
        'portrait'
    )
    const [imageVisible, setImageVisible] = useState(false)
    const imgTest = new Image()
    useEffect(() => {
        setTimeout(() => {
            imgTest.src = img
            imgTest.onload = () => {
                setOrientation(
                    imgTest.width > imgTest.height ? 'landscape' : 'portrait'
                )
                setImageVisible(true)
                // console.log({ imgTest })
            }
        }, 50)
    }, [img])

    return (
        <div
            key={img}
            style={{
                ...style,
                scrollSnapType: 'y mandatory',
                minHeight: '200px',
            }}
        >
            {/* <button> */}
            <Link
                to={`/imageViewer`}
                search={(old) => ({
                    ...old,
                    collectionId,
                    movieId,
                    // images,
                    idx,
                    subredditImages: images ?? undefined,
                })}
            >
                <img
                    className="button"
                    src={`${img}?w=400`}
                    key={img}
                    style={{
                        visibility:
                            imageVisible || img.includes('gif')
                                ? undefined
                                : 'hidden',
                        cursor: 'pointer',
                        maxWidth:
                            orientation == 'landscape'
                                ? 'var(--max-image-size)'
                                : undefined,
                        maxHeight:
                            orientation == 'portrait'
                                ? 'var(--max-image-size)'
                                : undefined,
                        padding: 0,
                    }}
                />
            </Link>
        </div>
    )
}
