import { Feather, Compass } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'

interface MobileDockProps {
  onOpenMaintainer: () => void
  onExploreDirections: () => void
}

export function MobileDock({ onOpenMaintainer, onExploreDirections }: MobileDockProps) {
  return (
    <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden">
      <div className="bg-[var(--dock-bg)] backdrop-blur-xl border border-[var(--border)] rounded-2xl px-3.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center justify-between gap-2.5">
        <button
          onClick={onExploreDirections}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] text-xs font-serif text-[var(--text-body)] border border-[var(--border)]"
        >
          <Compass className="w-3.5 h-3.5 opacity-60" />
          <span>研习方向</span>
        </button>

        <button
          onClick={onOpenMaintainer}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-serif font-medium shadow-sm hover:opacity-90"
        >
          <Feather className="w-3.5 h-3.5 text-amber-300" />
          <span>拜谒山长</span>
        </button>

        <a
          href="https://github.com/gewu-academy"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-xl bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] text-[var(--text-body)] border border-[var(--border)]"
          aria-label="GitHub"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
