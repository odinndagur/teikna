import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

function PlaceholderScreen() {
    const { currentTheme, setCurrentTheme } = useContext(ThemeContext)
    const [img, setImg] = useState(
        '/assets/teikna-icons/manifest-icon-512.maskable.png'
    )
    // useEffect(() => {
    //     setImg(
    //         currentTheme == 'light'
    //             ? '/assets/images/manifest-icon-512.maskable.png'
    //             : '/assets/images/manifest-icon-dark-512.maskable.png'
    //     )
    // }, [currentTheme])
    return (
        <div className="placeholder-image-container">
            <img className="placeholder-image" src={img} />
        </div>
    )
}

export default PlaceholderScreen
