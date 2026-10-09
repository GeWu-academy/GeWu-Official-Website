import type { ReactNode } from 'react'
import {
  useI18n,
  useI18nStore,
  AVAILABLE_LANGUAGES,
  type LanguageOption,
} from '@/store/use-i18n-store'

export type { LanguageOption }
// oxlint-disable-next-line react/only-export-components
export { AVAILABLE_LANGUAGES, useI18n, useI18nStore }

export function I18nProvider({ children }: { children: ReactNode }) {
  // i18n state and DOM sync is initialized and handled via Zustand in useI18nStore.
  return <>{children}</>
}
