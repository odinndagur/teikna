import { Link, MakeGenerics } from '@tanstack/react-location'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getShowsDataFromSheets } from '../db'
type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type showType = ArrayElement<Awaited<ReturnType<typeof getShowsDataFromSheets>>>
type showGenerics = MakeGenerics<{
    LoaderData: { show: showType }
}>

export function ShowCard({ show }: { show: showType }) {
    const { t, i18n, ready } = useTranslation()
    const [aspectRatio, setAspectRatio] = useState('')
    useEffect(() => {
        const img = new Image()
        img.src = show.image
        setAspectRatio(img.width > img.height ? 'landscape' : 'portrait')
    }, [])

    const [daysUntilShow, setDaysUntilShow] = useState(
        Number(((show.date - new Date()) / (1000 * 60 * 60 * 24)).toFixed(0))
    )
    const [showDatePassed, setShowDatePassed] = useState(daysUntilShow < 0)

    return (
        <>
            <Link
                to={`/shows/${show.id}`}
                // search={(old) => ({ ...old, showId: show.id })}
                // onClick={() => {
                //     const el = document.getElementById(
                //         show.name
                //     ) as HTMLDialogElement
                //     el.showModal()
                // }}
                className="card button"
                style={{
                    display: 'block',
                    minHeight: '200px',
                    minWidth: '300px',
                    // backgroundColor: 'var(--accent-color)',
                    flexGrow: 1,
                }}
                key={show.name}
            >
                <div style={{ maxWidth: '100%' }}>
                    <img
                        src={show.image}
                        alt=""
                        width={'200px'}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <h2>{show.bands.join(', ')}</h2>
                <h2>{show.venue}</h2>
                <i>
                    {show.date.toLocaleDateString(i18n.language, {
                        dateStyle: 'full',
                    })}
                    {/* {show.date.toLocaleDateString()} */}
                </i>
                <p>
                    {showDatePassed
                        ? t('days_since_show', {
                              count: Math.abs(daysUntilShow),
                          })
                        : t('days_until_show', { count: daysUntilShow })}
                    {/* Eftir{' '}
        {(
            (show.date - new Date()) /
            (1000 * 60 * 60 * 24)
        ).toFixed(0)}{' '}
        daga */}
                </p>
            </Link>
            <dialog
                id={`${show.name}`}
                onClick={(ev) => {
                    const dialog = document.getElementById(
                        show.name
                    ) as HTMLDialogElement
                    if (ev.target == dialog) {
                        dialog.close()
                    }
                }}
                style={{ maxHeight: '70vh', maxWidth: '70vw' }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection:
                            aspectRatio == 'landscape' ? 'column' : 'row',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '60%',
                            maxHeight: '60%',
                            display: 'grid',
                            placeItems: 'center',
                            margin: 'auto',
                        }}
                    >
                        <img
                            src={show.image}
                            alt=""
                            style={{
                                // maxWidth: '60%',
                                // maxHeight: '60%',
                                objectFit: 'scale-down',
                                maxWidth: '90%',
                                maxHeight: '90%',
                                outline: '1px solid black',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            // textAlign: 'center',
                            // marginLeft: 'auto',
                            // marginRight: 'auto',
                            padding: '1rem',
                        }}
                    >
                        <h2
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            {show.venue}
                        </h2>
                        <p>
                            {show.date.toLocaleDateString(i18n.language, {
                                dateStyle: 'medium',
                            })}
                        </p>
                        <p>
                            {show.bands.join(', ')} @ {show.venue}
                        </p>
                    </div>
                </div>
            </dialog>
        </>
    )
}
