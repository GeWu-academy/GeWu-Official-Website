import { create } from 'zustand'
import { type Theme, type ThemeOption, THEME_OPTIONS } from '@/context/theme-types'

export type { Theme, ThemeOption }
export { THEME_OPTIONS }

const STORAGE_KEY = 'gewu-theme'

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'cream'
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === 'white' || saved === 'cream' || saved === 'dark') {
      return saved
    }
  } catch {
    // fallback
  }
  return 'cream'
}

const applyThemeToDOM = (theme: Theme) => {
  if (typeof document === 'undefined') return
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
}

export interface ThemeStoreState {
  theme: Theme
  themeOptions: ThemeOption[]
  currentOption: ThemeOption
  setTheme: (theme: Theme) => void
  toggleNextTheme: () => void
}

const initialTheme = getInitialTheme()
if (typeof window !== 'undefined') {
  applyThemeToDOM(initialTheme)
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
  theme: initialTheme,
  themeOptions: THEME_OPTIONS,
  currentOption: THEME_OPTIONS.find((t) => t.id === initialTheme) || THEME_OPTIONS[1],

  setTheme: (nextTheme: Theme) => {
    applyThemeToDOM(nextTheme)
    set({
      theme: nextTheme,
      currentOption: THEME_OPTIONS.find((t) => t.id === nextTheme) || THEME_OPTIONS[1],
    })
  },

  toggleNextTheme: () => {
    set((state) => {
      let next: Theme = 'cream'
      if (state.theme === 'white') next = 'cream'
      else if (state.theme === 'cream') next = 'dark'
      else next = 'white'

      applyThemeToDOM(next)
      return {
        theme: next,
        currentOption: THEME_OPTIONS.find((t) => t.id === next) || THEME_OPTIONS[1],
      }
    })
  },
}))

/**
 * Compatible hook matching legacy useTheme() signature
 */
export function useTheme() {
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)
  const toggleNextTheme = useThemeStore((s) => s.toggleNextTheme)
  const themeOptions = useThemeStore((s) => s.themeOptions)
  const currentOption = useThemeStore((s) => s.currentOption)

  return {
    theme,
    setTheme,
    toggleNextTheme,
    themeOptions,
    currentOption,
  }
}
