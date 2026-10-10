import { ScholarSeal } from '@/components/scholar-seal'

interface ArmillarySphereSkeletonProps {
  className?: string
}

export function ArmillarySphereSkeleton({ className = '' }: ArmillarySphereSkeletonProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[380px] flex items-center justify-center overflow-hidden rounded-2xl bg-[var(--card-bg)]/40 border border-[var(--border)] backdrop-blur-xs ${className}`}
      aria-label="格物乾坤仪加载中"
    >
      {/* 水墨晕染底光 */}
      <div className="absolute inset-0 bg-radial from-[var(--accent-seal)]/8 via-transparent to-transparent pointer-events-none" />

      {/* 浑天仪同心环模拟结构 */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* 外环：六合仪环 */}
        <div className="absolute inset-0 rounded-full border border-dashed border-[var(--accent-gold)]/40 animate-[spin_24s_linear_infinite]" />

        {/* 次外环：三辰仪黄道斜环 */}
        <div
          className="absolute w-[86%] h-[86%] rounded-full border border-[var(--accent-seal)]/30 animate-[spin_16s_linear_infinite_reverse]"
          style={{ transform: 'rotateX(55deg) rotateY(20deg)' }}
        />

        {/* 中环：四游仪赤道环 */}
        <div
          className="absolute w-[72%] h-[72%] rounded-full border border-[var(--text-muted)]/30 animate-[spin_12s_linear_infinite]"
          style={{ transform: 'rotateX(30deg) rotateZ(45deg)' }}
        />

        {/* 内环：窥管子午环 */}
        <div
          className="absolute w-[56%] h-[56%] rounded-full border border-dashed border-[var(--accent-gold)]/50 animate-[spin_8s_linear_infinite_reverse]"
        />

        {/* 中心珠：太极玄珠微光 */}
        <div className="relative flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-radial from-[var(--accent-seal)] to-[var(--accent-seal)]/40 shadow-[0_0_16px_var(--accent-seal)] animate-pulse" />
          <div className="absolute w-10 h-10 rounded-full border border-[var(--accent-seal)]/40 animate-ping opacity-60" />
        </div>
      </div>

      {/* 底部宋韵加载提示徽标 */}
      <div className="absolute bottom-5 inset-x-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--card-elevated)]/80 border border-[var(--border)] shadow-xs">
          <ScholarSeal text="浑仪" size="sm" variant="cinnabar" />
          <span className="font-serif text-[11px] text-[var(--text-muted)] tracking-wider">
            格物乾坤仪 · 调校周天宿度中...
          </span>
        </div>
      </div>
    </div>
  )
}
