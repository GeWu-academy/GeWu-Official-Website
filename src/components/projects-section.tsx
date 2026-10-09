import { GitFork, Star, Users, ExternalLink, GitPullRequest } from 'lucide-react'
import { INCUBATOR_PROJECTS } from '@/data/community-data'
import { ScholarSeal } from '@/components/scholar-seal'

interface ProjectsSectionProps {
  onOpenMaintainer: () => void
}

export function ProjectsSection({ onOpenMaintainer }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部标题栏 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <ScholarSeal text="经世" subtext="实作" size="sm" variant="cinnabar" />
              <span className="font-serif text-xs tracking-widest text-stone-500 uppercase">
                OPEN SOURCE ARTIFACTS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
              经世实作 · 开源矩阵
            </h2>
            <p className="font-serif text-sm sm:text-base text-stone-600 leading-relaxed">
              书院孵化项目均源于真实工业级生产需求，主张「代码说话」，开放 Issue 与 PR 协同。
            </p>
          </div>

          <a
            href="https://github.com/gewu-academy"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 font-serif text-xs sm:text-sm font-medium shadow-2xs transition-all"
          >
            <GitPullRequest className="w-4 h-4 text-stone-600" />
            <span>浏览 GitHub 全部开源仓库</span>
          </a>
        </div>

        {/* 项目卡片网格（素白宣纸卡片，留白舒适） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {INCUBATOR_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="scholar-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* 顶栏类别与状态 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-serif px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-serif text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    ● {proj.status}
                  </span>
                </div>

                {/* 标题与副标 */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-1.5">
                  {proj.title}
                </h3>
                <p className="font-serif text-xs sm:text-sm text-stone-500 mb-4">
                  {proj.tagline}
                </p>

                {/* 描述文案 */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5 font-sans">
                  {proj.description}
                </p>

                {/* 核心亮点 */}
                <div className="space-y-1.5 mb-6">
                  {proj.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-800/80 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 底栏技术标签与统计 */}
              <div className="pt-4 border-t border-stone-200/80 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techs.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-stone-100 text-stone-600 border border-stone-200/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3.5 text-xs font-mono text-stone-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-600" />
                      {proj.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-stone-400" />
                      {proj.forks}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {proj.contributors} 贡者
                    </span>
                  </div>

                  <button
                    onClick={onOpenMaintainer}
                    className="flex items-center gap-1 text-xs font-serif font-bold text-stone-900 hover:text-red-800 transition-colors cursor-pointer"
                  >
                    <span>认领 Issue</span>
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
