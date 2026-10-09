import { Sun, Moon, Feather } from 'lucide-react'
import { useTheme, type Theme } from '@/context/theme-context'
import { useI18n } from '@/i18n'

interface ThemeSwitcherProps {
  variant?: 'segmented' | 'compact' | 'drawer'
  className?: string
}

export function ThemeSwitcher({ variant = 'segmented', className = '' }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const { t } = useI18n()

  const options: Array<{
    id: Theme
    label: string
    shortLabel: string
    icon: typeof Sun
    hint: string
  }> = [
    {
      id: 'white',
      label: t.theme.white,
      shortLabel: t.theme.white,
      icon: Sun,
      hint: t.theme.whiteHint,
    },
    {
      id: 'cream',
      label: t.theme.cream,
      shortLabel: t.theme.cream,
      icon: Feather,
      hint: t.theme.creamHint,
    },
    {
      id: 'dark',
      label: t.theme.dark,
      shortLabel: t.theme.dark,
      icon: Moon,
      hint: t.theme.darkHint,
    },
  ]

  if (variant === 'drawer') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="flex items-center justify-between text-xs px-1 text-[var(--text-muted)] font-serif">
          <span>{t.theme.title}</span>
          <span className="text-[10px] uppercase tracking-wider font-mono">
            {theme === 'white' ? 'WHITE' : theme === 'cream' ? 'CREAM' : 'DARK'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[var(--theme-tab-bg)] border border-[var(--border)]">
          {options.map((opt) => {
            const Icon = opt.icon
            const isActive = theme === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => setTheme(opt.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-serif transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--card-bg)] text-[var(--text-heading)] shadow-sm font-semibold border border-[var(--border)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-hover-bg)]'
                }`}
                title={opt.hint}
              >
                <Icon className={`w-4 h-4 mb-1 ${isActive ? 'text-[var(--accent-seal)]' : 'opacity-70'}`} />
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center p-0.5 rounded-xl bg-[var(--theme-tab-bg)] border border-[var(--border)] ${className}`}>
        {options.map((opt) => {
          const Icon = opt.icon
          const isActive = theme === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--card-bg)] text-[var(--text-heading)] shadow-sm border border-[var(--border)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
              }`}
              title={`${opt.label} (${opt.hint})`}
              aria-label={opt.label}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          )
        })}
      </div>
    )
  }

  // 默认三段式分段切换器 (Segmented Control)
  return (
    <div
      role="group"
      aria-label={t.theme.title}
      className={`relative inline-flex items-center p-1 rounded-2xl bg-[var(--theme-tab-bg)] border border-[var(--border)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] ${className}`}
    >
      {options.map((opt) => {
        const Icon = opt.icon
        const isActive = theme === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            className={`relative z-10 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-xs font-serif transition-all cursor-pointer ${
              isActive
                ? 'bg-[var(--card-bg)] text-[var(--text-heading)] font-semibold shadow-sm border border-[var(--border)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-hover-bg)]'
            }`}
            title={`${opt.label} - ${opt.hint}`}
          >
            <Icon
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isActive ? 'scale-110 text-[var(--accent-seal)]' : 'opacity-70'
              }`}
            />
            <span className="tracking-wide">{opt.label}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[var(--accent-seal)] sm:hidden" />
            )}
          </button>
        )
      })}
    </div>
  )
}
