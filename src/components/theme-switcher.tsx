import { Sun, Moon, Feather } from 'lucide-react'
import { useThemeStore, type Theme } from '@/store/use-theme-store'
import { useI18n } from '@/i18n'

interface ThemeSwitcherProps {
  variant?: 'segmented' | 'compact' | 'drawer' | 'toggle'
  className?: string
}

export function ThemeSwitcher({ variant = 'segmented', className = '' }: ThemeSwitcherProps) {
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)
  const { t } = useI18n()

  const options: Array<{
    id: Theme
    label: string
    shortLabel: string
    icon: typeof Sun
    hint: string
    activeColor: string
  }> = [
    {
      id: 'white',
      label: t.theme.white,
      shortLabel: t.theme.white,
      icon: Sun,
      hint: t.theme.whiteHint,
      activeColor: 'text-amber-500',
    },
    {
      id: 'cream',
      label: t.theme.cream,
      shortLabel: t.theme.cream,
      icon: Feather,
      hint: t.theme.creamHint,
      activeColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'dark',
      label: t.theme.dark,
      shortLabel: t.theme.dark,
      icon: Moon,
      hint: t.theme.darkHint,
      activeColor: 'text-amber-400',
    },
  ]

  // 单按钮循环切换（移动端顶栏专用，极小占位）
  if (variant === 'toggle') {
    const activeOpt = options.find((o) => o.id === theme) || options[0]
    const Icon = activeOpt.icon
    const nextThemeMap: Record<Theme, Theme> = {
      white: 'cream',
      cream: 'dark',
      dark: 'white',
    }

    return (
      <button
        type="button"
        onClick={() => setTheme(nextThemeMap[theme])}
        className={`p-1.5 rounded-lg bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] border border-[var(--border)] transition-all cursor-pointer active:scale-95 shadow-2xs ${className}`}
        title={`${activeOpt.label} (${activeOpt.hint}) · 点击切换`}
        aria-label={activeOpt.label}
      >
        <Icon className={`w-3.5 h-3.5 ${activeOpt.activeColor}`} />
      </button>
    )
  }

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
                    ? 'bg-[var(--card-elevated)] text-[var(--text-heading)] shadow-xs font-semibold border border-[var(--border)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-hover-bg)]'
                }`}
                title={opt.hint}
              >
                <Icon className={`w-4 h-4 mb-1 ${isActive ? opt.activeColor : 'opacity-70'}`} />
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // 紧凑图标分段控制（桌面端导航栏推荐，仅占约 76px）
  if (variant === 'compact') {
    return (
      <div
        role="group"
        aria-label={t.theme.title}
        className={`inline-flex items-center p-0.5 rounded-lg bg-[var(--theme-tab-bg)] border border-[var(--border)] shadow-2xs ${className}`}
      >
        {options.map((opt) => {
          const Icon = opt.icon
          const isActive = theme === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={`p-1 sm:p-1.5 rounded-md transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--card-elevated)] text-[var(--text-heading)] shadow-2xs border border-[var(--border)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-hover-bg)]'
              }`}
              title={`${opt.label} · ${opt.hint}`}
              aria-label={opt.label}
            >
              <Icon
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  isActive ? `scale-105 ${opt.activeColor}` : 'opacity-70'
                }`}
              />
            </button>
          )
        })}
      </div>
    )
  }

  // 精简文字分段切换器 (Segmented Control)
  return (
    <div
      role="group"
      aria-label={t.theme.title}
      className={`relative inline-flex items-center p-0.5 rounded-xl bg-[var(--theme-tab-bg)] border border-[var(--border)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm ${className}`}
    >
      {options.map((opt) => {
        const Icon = opt.icon
        const isActive = theme === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            className={`relative z-10 flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-serif transition-all cursor-pointer ${
              isActive
                ? 'bg-[var(--card-elevated)] text-[var(--text-heading)] font-semibold shadow-2xs border border-[var(--border)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-hover-bg)]'
            }`}
            title={`${opt.label} - ${opt.hint}`}
          >
            <Icon
              className={`w-3 h-3 transition-transform duration-150 ${
                isActive ? `scale-105 ${opt.activeColor}` : 'opacity-70'
              }`}
            />
            <span className="tracking-wide">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
