import { createContext, useState } from 'react'
type ThemeContextType = { currentTheme: string; setCurrentTheme: any | null }
export const ThemeContext = createContext<ThemeContextType>({
    currentTheme: window.localStorage.getItem('theme_mode') ?? 'dark',
    setCurrentTheme: undefined,
})

// export { ThemeContext }
