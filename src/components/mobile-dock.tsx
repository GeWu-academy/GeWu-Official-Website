import { Sparkles, Compass, Github } from 'lucide-react'

interface MobileDockProps {
  onOpenMaintainer: () => void
  onExploreDirections: () => void
}

export function MobileDock({ onOpenMaintainer, onExploreDirections }: MobileDockProps) {
  return (
    <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden">
      <div className="liquid-glass-prominent bg-[#0b0e14]/90 backdrop-blur-2xl border border-white/20 rounded-2xl px-4 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3">
        <button
          onClick={onExploreDirections}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-zinc-200 border border-white/10"
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>实践方向</span>
        </button>

        <button
          onClick={onOpenMaintainer}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-semibold shadow-lg shadow-cyan-500/25"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>加入书院</span>
        </button>

        <a
          href="https://github.com/gewu-academy"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 border border-white/10"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
