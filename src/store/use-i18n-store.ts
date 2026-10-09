import { create } from 'zustand'
import type { Language, TranslationsSchema } from '@/i18n/types'
import { zh } from '@/i18n/locales/zh'
import { en } from '@/i18n/locales/en'

export interface LanguageOption {
  code: Language
  label: string
  shortLabel: string
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'zh', label: '中文', shortLabel: '中' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
]

const STORAGE_KEY = 'gewu-locale'

const translationsMap: Record<Language, TranslationsSchema> = {
  zh,
  en,
}

const getInitialLanguage = (): Language => {
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
    // fallback
  }
  return 'zh'
}

const applyLanguageToDOM = (lang: Language) => {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // ignore
  }
}

export interface I18nStoreState {
  language: Language
  languages: LanguageOption[]
  currentLanguageOption: LanguageOption
  t: TranslationsSchema
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const initialLang = getInitialLanguage()
if (typeof window !== 'undefined') {
  applyLanguageToDOM(initialLang)
}

export const useI18nStore = create<I18nStoreState>((set) => ({
  language: initialLang,
  languages: AVAILABLE_LANGUAGES,
  currentLanguageOption:
    AVAILABLE_LANGUAGES.find((l) => l.code === initialLang) || AVAILABLE_LANGUAGES[0],
  t: translationsMap[initialLang] || zh,

  setLanguage: (lang: Language) => {
    applyLanguageToDOM(lang)
    set({
      language: lang,
      currentLanguageOption:
        AVAILABLE_LANGUAGES.find((l) => l.code === lang) || AVAILABLE_LANGUAGES[0],
      t: translationsMap[lang] || zh,
    })
  },

  toggleLanguage: () => {
    set((state) => {
      const nextLang: Language = state.language === 'zh' ? 'en' : 'zh'
      applyLanguageToDOM(nextLang)
      return {
        language: nextLang,
        currentLanguageOption:
          AVAILABLE_LANGUAGES.find((l) => l.code === nextLang) || AVAILABLE_LANGUAGES[0],
        t: translationsMap[nextLang] || zh,
      }
    })
  },
}))

/**
 * Compatible hook matching legacy useI18n() signature
 */
export function useI18n() {
  const language = useI18nStore((s) => s.language)
  const setLanguage = useI18nStore((s) => s.setLanguage)
  const toggleLanguage = useI18nStore((s) => s.toggleLanguage)
  const t = useI18nStore((s) => s.t)
  const languages = useI18nStore((s) => s.languages)
  const currentLanguageOption = useI18nStore((s) => s.currentLanguageOption)

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
    languages,
    currentLanguageOption,
  }
}
