import { Briefcase, Target, Award, Sparkles, Check } from 'lucide-react'
import { LiquidGlassCard } from '@/components/liquid-glass-card'
import { MagneticButton } from '@/components/magnetic-button'

interface CareerPathwaySectionProps {
  onOpenMaintainer: () => void
}

export function CareerPathwaySection({ onOpenMaintainer }: CareerPathwaySectionProps) {
  const steps = [
    {
      num: '01',
      title: '行业真实技能树对齐',
      desc: '打破求职信息差。深度剖析一线大厂与出海团队真实岗位 JD，明确硬核技术评级体系，告别盲目自学。',
    },
    {
      num: '02',
      title: '生产级开源工程共建',
      desc: '拒绝千篇一律的玩具 Demo。参与格物孵化项目，拥有真实高并发、Agent 编排与全栈架构的代码 Commit。',
    },
    {
      num: '03',
      title: '简历深度诊断与架构答辩',
      desc: '在职资深工程师与 Maintainer 针对简历进行逐行打磨与技术复盘，全仿真模拟技术深度考察。',
    },
    {
      num: '04',
      title: '精准直推与职场成长陪伴',
      desc: '直接推向用人部门业务 Leader，消除 HR 简历初筛信息差；入职后持续提供职场技术顾问支持。',
    },
  ]

  const differences = [
    {
      traditional: '自学刷题，简历上只有套壳仿站玩具 Demo',
      gewu: '深入真实生产级开源项目，代码与架构有据可查',
    },
    {
      traditional: '技术信息闭塞，不了解企业真实考核深度',
      gewu: '在职资深技术专家实时同步最新技术选型与考察重点',
    },
    {
      traditional: '海投简历石沉大海，被 HR 初筛无情过滤',
      gewu: '书院导师精准直推业务 Leader，作品集硬核背书',
    },
  ]

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono text-cyan-300 mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER EMPOWERMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            打破信息差 · 助力高质量就业
          </h2>
          <p className="text-base sm:text-lg text-zinc-300">
            用真实可验证的工程代码代替空洞的技术名词，让每一次投入都能转化为职场的核心竞争力。
          </p>
        </div>

        {/* 阶梯路径卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step) => (
            <LiquidGlassCard
              key={step.num}
              className="p-6 sm:p-7 flex flex-col justify-between"
              glowColor="rgba(56, 189, 248, 0.12)"
            >
              <div>
                <span className="font-mono text-3xl font-extrabold text-cyan-400/80 block mb-4">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-1.5 text-xs text-cyan-400/90 font-mono">
                <Target className="w-3.5 h-3.5" />
                <span>精准落地闭环</span>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* 对比视窗：传统盲目自学 vs 格物书院实战 */}
        <div className="rounded-3xl liquid-glass-prominent p-6 sm:p-10 border border-white/15">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              为什么格物书院的成员能获得更好就业机会？
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              通过真实工程协作消除信息差，形成高辨识度技术护城河
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {differences.map((diff, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl liquid-glass bg-white/[0.02] border border-white/10 space-y-3"
              >
                <div className="text-xs text-rose-300/80 line-through pb-2 border-b border-white/10 flex items-start gap-1.5">
                  <span className="text-[10px] uppercase font-mono px-1 rounded bg-rose-950/60 text-rose-300 shrink-0">
                    传统困境
                  </span>
                  <span>{diff.traditional}</span>
                </div>
                <div className="text-xs sm:text-sm text-emerald-300 flex items-start gap-2 pt-1">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-200">{diff.gewu}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>不仅是求职助手，更是一起终身成长的同行者网络</span>
            </div>
            <MagneticButton size="sm" variant="primary" onClick={onOpenMaintainer}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>预约导师一对一简历与实战指导</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
