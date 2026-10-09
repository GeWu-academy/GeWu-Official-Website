import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { type Theme, type ThemeOption, THEME_OPTIONS } from './theme-types'

export type { Theme, ThemeOption }
export { THEME_OPTIONS }

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleNextTheme: () => void
  themeOptions: ThemeOption[]
  currentOption: ThemeOption
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'gewu-theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'cream'
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (saved === 'white' || saved === 'cream' || saved === 'dark') {
        return saved
      }
    } catch {
      // fallback
    }
    // 默认米白书院风
    return 'cream'
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme)
  }

  const toggleNextTheme = () => {
    setThemeState((current) => {
      if (current === 'white') return 'cream'
      if (current === 'cream') return 'dark'
      return 'white'
    })
  }

  const currentOption = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[1]

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleNextTheme,
        themeOptions: THEME_OPTIONS,
        currentOption,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// oxlint-disable-next-line react/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
