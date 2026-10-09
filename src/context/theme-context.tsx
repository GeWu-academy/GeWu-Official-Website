import type { ReactNode } from 'react'
import {
  useThemeStore,
  useTheme,
  type Theme,
  type ThemeOption,
  THEME_OPTIONS,
} from '@/store/use-theme-store'

export type { Theme, ThemeOption }
export { THEME_OPTIONS, useTheme }

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Theme state and DOM sync is initialized and handled via Zustand in useThemeStore.
  return <>{children}</>
}
