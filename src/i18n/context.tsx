import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Language, TranslationsSchema } from './types'
import { zh } from './locales/zh'
import { en } from './locales/en'

export interface LanguageOption {
  code: Language
  label: string
  shortLabel: string
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'zh', label: '中文', shortLabel: '中' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
]

interface I18nContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: TranslationsSchema
  languages: LanguageOption[]
  currentLanguageOption: LanguageOption
}

const STORAGE_KEY = 'gewu-locale'

const translationsMap: Record<Language, TranslationsSchema> = {
  zh,
  en,
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'zh'
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null
      if (saved === 'zh' || saved === 'en') {
        return saved
      }
      if (navigator.language) {
        return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
      }
    } catch {
      // ignore
    }
    return 'zh'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'zh' ? 'en' : 'zh'))
  }

  const t = translationsMap[language] || zh
  const currentLanguageOption =
    AVAILABLE_LANGUAGES.find((l) => l.code === language) || AVAILABLE_LANGUAGES[0]

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        languages: AVAILABLE_LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return ctx
}
