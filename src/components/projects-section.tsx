import { GitFork, Star, Users, ExternalLink, GitPullRequest, FolderGit2 } from 'lucide-react'
import { LiquidGlassCard } from '@/components/liquid-glass-card'
import { INCUBATOR_PROJECTS } from '@/data/community-data'
import { MagneticButton } from '@/components/magnetic-button'

interface ProjectsSectionProps {
  onOpenMaintainer: () => void
}

export function ProjectsSection({ onOpenMaintainer }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono text-cyan-300 mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>INCUBATOR & OPEN SOURCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              实战孵化与开源矩阵
            </h2>
            <p className="text-base sm:text-lg text-zinc-300">
              拒绝纸上谈兵。书院孵化项目均以真实企业级应用为基准，开放 Issue 与 PR 协作，共建硬核作品集。
            </p>
          </div>

          <a
            href="https://github.com/gewu-academy"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <MagneticButton size="md" variant="glass" className="gap-2">
              <GitPullRequest className="w-4 h-4 text-cyan-400" />
              <span>浏览 GitHub 全部开源仓库</span>
            </MagneticButton>
          </a>
        </div>

        {/* 项目卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {INCUBATOR_PROJECTS.map((proj) => (
            <LiquidGlassCard
              key={proj.id}
              className="p-7 sm:p-8 flex flex-col justify-between"
              glowColor="rgba(56, 189, 248, 0.15)"
            >
              <div>
                {/* 顶栏信息 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {proj.category}
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                      proj.status === '生产实战中'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                    }`}
                  >
                    ● {proj.status}
                  </span>
                </div>

                {/* 标题与一句话 */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-300/90 font-mono mb-4">
                  {proj.tagline}
                </p>

                {/* 描述 */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {proj.description}
                </p>

                {/* 核心亮点 */}
                <div className="space-y-2 mb-6">
                  {proj.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 底部：技术栈与数据统计 */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                {/* 技术标签 */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.techs.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-zinc-400 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* 统计指标与参与按钮 */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      {proj.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                      {proj.forks}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      {proj.contributors} 成员
                    </span>
                  </div>

                  <button
                    onClick={onOpenMaintainer}
                    className="flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
                  >
                    <span>认领 Issue</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
