import { useNavigate } from '@tanstack/react-location'
import { useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Misc() {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    return (
        <div>
            <Header></Header>
            <form
                onSubmit={(ev) => {
                    ev.preventDefault()
                    navigate({ to: `/${searchValue}` })
                }}
            >
                <input
                    type="text"
                    onChange={(ev) => setSearchValue(ev.target.value)}
                />
                <button type="submit">Go to /{searchValue}</button>
            </form>
            <Footer></Footer>
        </div>
    )
}
