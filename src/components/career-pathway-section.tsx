import { Target, Award, Check, ArrowRight } from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'

interface CareerPathwaySectionProps {
  onOpenMaintainer: () => void
}

export function CareerPathwaySection({ onOpenMaintainer }: CareerPathwaySectionProps) {
  const steps = [
    {
      num: '壹',
      title: '技能标杆对齐',
      desc: '深入一线名企与出海团队真实岗位标准，明确硬核技术评级体系，告别盲目自学。',
    },
    {
      num: '贰',
      title: '生产级开源实作',
      desc: '拒绝千篇一律的玩具 Demo。参与书院孵化工程，沉淀真实高并发与智能体的代码 Commit。',
    },
    {
      num: '叁',
      title: '简历复盘与答辩',
      desc: '资深工程师与 Maintainer 针对简历逐行打磨，模拟真实架构答辩与系统设计深挖。',
    },
    {
      num: '肆',
      title: '精准内推直达',
      desc: '直接推向用人团队业务 Leader，消除 HR 盲盒初筛信息差，全程陪伴技术立身。',
    },
  ]

  const differences = [
    {
      traditional: '自学盲刷，简历仅有套壳玩具 Demo',
      gewu: '深入生产级开源项目，代码与架构有据可查',
    },
    {
      traditional: '技术信息闭塞，不了解企业真实考核深度',
      gewu: '资深导师实时同步技术雷达与面试重点',
    },
    {
      traditional: '海投简历石沉大海，被 HR 初筛过滤',
      gewu: '精准直达业务 Leader，作品集硬核背书',
    },
  ]

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <ScholarSeal text="修己" subtext="致远" size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-widest text-stone-500 uppercase">
              CAREER EMPOWERMENT
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
            修己致远 · 职涯赋能
          </h2>
          <p className="font-serif text-sm sm:text-base text-stone-600 leading-relaxed">
            用真实可验证的工程代码代替空洞的技术名词，让每一次投入都能转化为立身的核心底气。
          </p>
        </div>

        {/* 阶梯路径卡片（素白宣纸质感） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {steps.map((step) => (
            <div
              key={step.num}
              className="scholar-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-xl font-bold text-red-800 block mb-2">
                  {step.num}
                </span>
                <h3 className="font-serif text-base font-bold text-stone-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-stone-200/80 flex items-center gap-1.5 text-xs text-stone-400 font-serif">
                <Target className="w-3.5 h-3.5 text-stone-400" />
                <span>知行闭环</span>
              </div>
            </div>
          ))}
        </div>

        {/* 对比视窗：传统困境 vs 格物破局 */}
        <div className="scholar-card rounded-3xl p-6 sm:p-8">
          <div className="text-center max-w-lg mx-auto mb-6">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mb-1">
              消除技术信息差 · 建立笃定竞争力
            </h3>
            <p className="text-xs text-stone-500 font-serif">
              通过真实开源工程协作，构建经得起时间考验的个人技术护城河
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
            {differences.map((diff, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-2.5"
              >
                <div className="text-xs text-stone-400 line-through pb-1.5 border-b border-stone-200/60 flex items-start gap-1.5">
                  <span className="text-[10px] font-serif px-1 rounded bg-stone-200/70 text-stone-600 shrink-0">
                    困境
                  </span>
                  <span>{diff.traditional}</span>
                </div>
                <div className="text-xs sm:text-sm text-stone-800 flex items-start gap-2 pt-0.5">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="font-serif">{diff.gewu}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-serif">
              <Award className="w-4 h-4 text-stone-400" />
              <span>同行者互助共进 · 长期成长陪伴网络</span>
            </div>
            <button
              onClick={onOpenMaintainer}
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-stone-900 hover:text-red-800 transition-colors cursor-pointer"
            >
              <span>预约导师一对一简历指导</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
