import { Users, Cpu, Compass, TrendingUp, CheckCircle2 } from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'
import { MUTUAL_AID_PILLARS, COMMUNITY_INFO } from '@/data/community-data'

export function PhilosophySection() {
  const iconMap: Record<string, React.ElementType> = {
    Users,
    Cpu,
    Compass,
    TrendingUp,
  }

  const classicalTitles = [
    { prefix: '壹 · 同窗砥砺', theme: '同行互帮互助' },
    { prefix: '贰 · 格物实作', theme: '打磨硬核实战' },
    { prefix: '叁 · 开物洞见', theme: '消除信息壁垒' },
    { prefix: '肆 · 经世致用', theme: '赋能成员就业' },
  ]

  return (
    <section id="philosophy" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 顶部标题区：极简宋体留白 */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <ScholarSeal text="书院" subtext="四立" size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-widest text-stone-500 uppercase">
              ACADEMY PHILOSOPHY
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            以实作破局 · 与良友同行
          </h2>
          <p className="font-serif text-sm sm:text-base text-stone-600 leading-relaxed">
            {COMMUNITY_INFO.originStory}
          </p>
        </div>

        {/* 四大支柱卡片（宣纸质感，低信息密度，间距开阔） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
          {MUTUAL_AID_PILLARS.map((pillar, index) => {
            const Icon = iconMap[pillar.iconName] || Users
            const meta = classicalTitles[index]

            return (
              <div
                key={pillar.number}
                className="scholar-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* 顶栏序号与宋风题签 */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-xs font-semibold text-red-800 tracking-wider">
                      {meta.prefix}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* 核心主标题 */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="p-2.5 rounded-xl bg-stone-100 text-stone-800 shrink-0 border border-stone-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-900">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-serif mt-0.5">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* 简要说明 */}
                  <p className="text-sm text-stone-600 leading-relaxed mb-6 font-serif">
                    {pillar.description}
                  </p>
                </div>

                {/* 落地清单：极简 3 条 */}
                <div className="pt-4 border-t border-stone-200/80 space-y-2">
                  {pillar.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm text-stone-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-sans">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* 底部文人雅句横幅 */}
        <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <ScholarSeal text="知行" subtext="合一" size="md" variant="outline" />
            <div>
              <h4 className="font-serif font-bold text-base text-stone-900">
                代码为凭 · 经世致用
              </h4>
              <p className="text-xs text-stone-500 font-serif mt-0.5">
                拒绝纸上谈兵与空心套壳，以真实系统架构沉淀个人终身技术资产
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-serif text-stone-600">
            <span className="px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200">
              每周研讨研习会
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200">
              一对一实战 Review
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
