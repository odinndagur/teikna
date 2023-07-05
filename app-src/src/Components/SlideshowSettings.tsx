import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { TimeField } from './TimeField'

export function SlideshowSettings() {
    const modalId = 'slideshow-settings-modal'
    const [totalSeconds, setTotalSeconds] = useLocalStorage(
        'seconds-per-image',
        30
    )

    return (
        <>
            <button
                style={{ zindex: 5, height: '50px' }}
                onClick={() => {
                    const el = document.getElementById(
                        modalId
                    ) as HTMLDialogElement
                    el.showModal()
                }}
            >
                <span className="material-icons">settings</span>
            </button>

            <dialog
                onKeyDown={(ev) => {
                    if (ev.code == 'Escape') {
                        console.log('escape a modal')
                        ev.stopPropagation()
                    }
                }}
                style={{
                    border: 0,
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    minWidth: '20vmin',
                    // minHeight: '20vmin',
                }}
                id={modalId}
                onClick={(ev) => {
                    const dialog = document.getElementById(
                        modalId
                    ) as HTMLDialogElement
                    if (ev.target == dialog) {
                        dialog.close()
                        return
                    }
                }}
            >
                <form
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // alignContent: 'center',
                        // justifyItems: 'center',
                    }}
                    onSubmit={(ev) => {
                        ev.preventDefault()
                        const val = ev.target.secondsInput.value
                        const [minutes, seconds] = val.split(':')
                        setTotalSeconds(60 * Number(minutes) + Number(seconds))
                        const dialog = document.getElementById(
                            modalId
                        ) as HTMLDialogElement
                        dialog.close()
                    }}
                >
                    <label htmlFor="">
                        Time per image
                        <input
                            style={{ margin: '1rem' }}
                            type="time"
                            id="secondsInput"
                            defaultValue="00:30"
                        />
                    </label>
                    <button type="submit">
                        <span className="material-icons">check</span>
                    </button>
                </form>

                {/* <form
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // alignContent: 'center',
                        // justifyItems: 'center',
                    }}
                    onSubmit={(ev) => {
                        ev.preventDefault()
                        const val = ev.target.secondsInput.value
                        const [minutes, seconds] = val.split(':')
                        setTotalSeconds(60 * Number(minutes) + Number(seconds))
                        const dialog = document.getElementById(
                            modalId
                        ) as HTMLDialogElement
                        dialog.close()
                    }}
                >
                    <label htmlFor="">
                        Time per image
                        <input style={{ margin: '1rem' }} type="range" />
                    </label>
                    <button type="submit">
                        <span className="material-icons">check</span>
                    </button>
                </form> */}
                {/* <TimeField /> */}
            </dialog>
        </>
    )
}
