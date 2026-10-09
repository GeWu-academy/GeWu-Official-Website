import { Users, Cpu, Compass, TrendingUp, CheckCircle2 } from 'lucide-react'
import { LiquidGlassCard } from '@/components/liquid-glass-card'
import { MUTUAL_AID_PILLARS, COMMUNITY_INFO } from '@/data/community-data'

export function PhilosophySection() {
  const iconMap: Record<string, React.ElementType> = {
    Users,
    Cpu,
    Compass,
    TrendingUp,
  }

  return (
    <section id="philosophy" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题与标语引言 */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono text-cyan-300 mb-4">
            <span>OUR MISSION & VALUES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            以实战破局 · 同行致远
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            {COMMUNITY_INFO.originStory}
          </p>
        </div>

        {/* 四维初衷矩阵卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {MUTUAL_AID_PILLARS.map((pillar) => {
            const Icon = iconMap[pillar.iconName] || Users
            return (
              <LiquidGlassCard
                key={pillar.number}
                className="p-7 sm:p-9 flex flex-col justify-between"
                glowColor="rgba(56, 189, 248, 0.12)"
              >
                <div>
                  {/* 顶栏：编号与标签 */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-400/80">
                      {pillar.number}
                    </span>
                    <span className="text-[11px] font-mono tracking-wider px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-zinc-400">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* 图标与标题 */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-cyan-300/80 font-mono">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* 核心描述 */}
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* 落地清单 */}
                <div className="pt-5 border-t border-white/10 space-y-2.5">
                  {pillar.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </LiquidGlassCard>
            )
          })}
        </div>

        {/* 典籍哲学与现代极客呼应条 */}
        <div className="relative rounded-2xl liquid-glass-prominent p-8 sm:p-10 border border-white/15 overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                PHILOSOPHY BEHIND GEWU
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                穷理而格物，知行以致远
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                “格物”并非坐而论道，而是通过深度解构事物机理，探究软硬件与系统运转的本质；“知行”则是将所悟化为健壮的代码、精妙的交互与经得起考验的生产工程。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <div className="px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-center w-full sm:w-auto">
                <span className="text-xs text-zinc-400 block">社区信条</span>
                <span className="text-sm font-semibold text-white">用代码与实战说话</span>
              </div>
              <div className="px-5 py-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-center w-full sm:w-auto">
                <span className="text-xs text-cyan-300 block">协同机制</span>
                <span className="text-sm font-semibold text-cyan-200">开源互助 · 资源互通</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
