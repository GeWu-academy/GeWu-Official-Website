import { Languages, Check } from 'lucide-react'
import { useI18n, type Language } from '@/i18n'

export interface LanguageSwitcherProps {
  variant?: 'segmented' | 'compact' | 'drawer' | 'button'
  className?: string
  showIcon?: boolean
}

export function LanguageSwitcher({
  variant = 'segmented',
  className = '',
  showIcon = true,
}: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage, t } = useI18n()

  const languageOptions: Array<{
    code: Language
    label: string
    shortLabel: string
    sublabel: string
  }> = [
    {
      code: 'zh',
      label: t.lang.zh || '中文',
      shortLabel: '中',
      sublabel: '华夏宋韵',
    },
    {
      code: 'en',
      label: t.lang.en || 'English',
      shortLabel: 'EN',
      sublabel: 'International',
    },
  ]

  // 1. 移动端抽屉菜单样式 (Drawer)
  if (variant === 'drawer') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex items-center justify-between text-xs px-1 text-[var(--text-muted)] font-serif">
          <span className="flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-[var(--accent-seal)]" />
            <span>{t.lang.name}</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider font-mono">
            {language === 'zh' ? 'ZH-CN' : 'EN-US'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[var(--theme-tab-bg)] border border-[var(--border)]">
          {languageOptions.map((opt) => {
            const isActive = language === opt.code
            return (
              <button
                key={opt.code}
                onClick={() => setLanguage(opt.code)}
                className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-serif transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--card-elevated)] text-[var(--text-heading)] shadow-xs font-semibold border border-[var(--border)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-hover-bg)]'
                }`}
                title={opt.label}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <span>{opt.label}</span>
                  {isActive && <Check className="w-3 h-3 text-[var(--accent-seal)]" />}
                </div>
                <span className="text-[10px] opacity-70 tracking-wide">{opt.sublabel}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // 2. 紧凑单键切换样式 (Compact - 适用于移动端顶栏或空间紧张处)
  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] border border-[var(--border)] text-[var(--text-heading)] text-xs font-serif transition-all cursor-pointer active:scale-95 shadow-2xs ${className}`}
        title={t.lang.switchTip}
        aria-label={t.lang.switchTip}
      >
        <Languages className="w-3.5 h-3.5 text-[var(--accent-seal)]" />
        <span className="font-semibold tracking-wider">
          {language === 'zh' ? '中' : 'EN'}
        </span>
      </button>
    )
  }

  // 3. 极简轻量按钮 (Button)
  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-serif text-[var(--text-body)] hover:text-[var(--text-heading)] rounded-lg bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] border border-[var(--border)] transition-all cursor-pointer ${className}`}
        title={t.lang.switchTip}
      >
        <Languages className="w-3 h-3 text-[var(--text-muted)]" />
        <span>{language === 'zh' ? 'EN' : '中'}</span>
      </button>
    )
  }

  // 4. 默认双段分段切换器 (Segmented Control - 与 ThemeSwitcher 风格高度一致)
  return (
    <div
      role="group"
      aria-label={t.lang.name}
      className={`relative inline-flex items-center p-1 rounded-2xl bg-[var(--theme-tab-bg)] border border-[var(--border)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] ${className}`}
    >
      {showIcon && (
        <span className="pl-1.5 pr-0.5 text-[var(--text-muted)] hidden md:inline-flex items-center">
          <Languages className="w-3.5 h-3.5 opacity-70" />
        </span>
      )}
      {languageOptions.map((opt) => {
        const isActive = language === opt.code
        return (
          <button
            key={opt.code}
            onClick={() => setLanguage(opt.code)}
            className={`relative z-10 flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-serif transition-all cursor-pointer ${
              isActive
                ? 'bg-[var(--card-elevated)] text-[var(--text-heading)] font-semibold shadow-xs border border-[var(--border)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-hover-bg)]'
            }`}
            title={`${t.lang.name}: ${opt.label}`}
          >
            <span className="tracking-wide hidden sm:inline">{opt.label}</span>
            <span className="tracking-wide sm:hidden">{opt.shortLabel}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[var(--accent-seal)] inline-block" />
            )}
          </button>
        )
      })}
    </div>
  )
}
