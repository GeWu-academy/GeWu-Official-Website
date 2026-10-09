import { useState } from 'react'
import { Sparkles, RefreshCw, BookmarkCheck, Check, Feather } from 'lucide-react'
import { ScholarSeal } from '@/components/scholar-seal'

interface LotItem {
  id: number
  tier: '上上签' | '吉' | '修省'
  motto: string
  source: string
  principle: string
  dos: string
  donts: string
  direction: string
}

const SCHOLAR_LOTS: LotItem[] = [
  {
    id: 1,
    tier: '上上签',
    motto: '致知在格物，物格而后知至。',
    source: '《礼记·大学》',
    principle: '求真务实，直面生产级代码真相。',
    dos: '亲笔撰写测试用例，推演高并发边界',
    donts: '浮躁套壳，浅尝辄止',
    direction: '系统工程 · 核心架构',
  },
  {
    id: 2,
    tier: '吉',
    motto: '知之真切笃实处，即是行。',
    source: '王阳明《传习录》',
    principle: '代码说话，用可运行的系统验证认知。',
    dos: '向组织发起首个 Pull Request',
    donts: '纸上谈兵，空谈理论',
    direction: '开源协作 · 实战共建',
  },
  {
    id: 3,
    tier: '上上签',
    motto: '博学之，审问之，慎思之，明辨之，笃行之。',
    source: '《中庸》',
    principle: '在多智能体与大模型潮涌中保有清醒洞察。',
    dos: '深研 Agent 拓扑调度与状态机自愈',
    donts: '无批判盲信通用 Prompt',
    direction: 'AI & Agent · 智能系统',
  },
  {
    id: 4,
    tier: '吉',
    motto: '工欲善其事，必先利其器。',
    source: '《论语·卫灵公》',
    principle: '磨砺端到端工程工法与类型安全契约。',
    dos: '落地全栈强类型约束与毫秒级流式渲染',
    donts: '放任 Any 类型蔓延',
    direction: 'TypeScript · 现代全栈',
  },
  {
    id: 5,
    tier: '上上签',
    motto: '大巧若拙，大美不言。',
    source: '《庄子·知北游》',
    principle: '极简克制，删繁就简，留白成境。',
    dos: '优化用户界面信息密度与微交互阻尼',
    donts: '堆砌无意义的视觉噪点',
    direction: 'UI/UX · 体验架构',
  },
  {
    id: 6,
    tier: '吉',
    motto: '独学而无友，则孤陋而寡闻。',
    source: '《礼记·学记》',
    principle: '同行互助，打破信息茧房与求职孤岛。',
    dos: '参与周日晚技术圆桌，互相 Review 简历',
    donts: '独自焦虑，闭门造车',
    direction: '同行互助 · 职涯加速',
  },
]

export function GewuOracleLot() {
  const [currentLotIndex, setCurrentLotIndex] = useState(0)
  const [isCasting, setIsCasting] = useState(false)
  const [copied, setCopied] = useState(false)

  const lot = SCHOLAR_LOTS[currentLotIndex]

  const handleCastLot = () => {
    setIsCasting(true)
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * SCHOLAR_LOTS.length)
      if (nextIndex === currentLotIndex) {
        nextIndex = (currentLotIndex + 1) % SCHOLAR_LOTS.length
      }
      setCurrentLotIndex(nextIndex)
      setIsCasting(false)
    }, 600)
  }

  const handleCopyMotto = () => {
    const text = `【格物书院·${lot.tier}】「${lot.motto}」—— ${lot.principle} (宜: ${lot.dos} / 忌: ${lot.donts})`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 宣纸竹简卡片主体 */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#fbfbfa] to-[#f4f2ea] border border-stone-200/90 p-6 sm:p-8 shadow-[0_12px_40px_rgba(28,25,23,0.05)] overflow-hidden transition-all duration-500">
        {/* 背景素淡花窗水墨晕边 */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-stone-200/40 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-gradient-to-tr from-amber-100/30 to-transparent rounded-tr-full pointer-events-none" />

        {/* 顶部标题栏：印章与签次 */}
        <div className="relative z-10 flex items-center justify-between pb-5 border-b border-stone-200/80 mb-6">
          <div className="flex items-center gap-3">
            <ScholarSeal text="格物" subtext="灵签" size="md" variant="cinnabar" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-stone-900 tracking-wide">
                  格物修身签
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-serif font-medium bg-red-50 text-red-800 border border-red-200/70">
                  {lot.tier}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-serif">
                今日研习箴言 · 审己度物
              </p>
            </div>
          </div>

          <button
            onClick={handleCastLot}
            disabled={isCasting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-xs font-serif text-stone-700 border border-stone-200 hover:border-stone-400 hover:text-stone-900 shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            title="重新摇签"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 text-stone-500 ${isCasting ? 'animate-spin' : ''}`}
            />
            <span>{isCasting ? '摇签中...' : '再探一签'}</span>
          </button>
        </div>

        {/* 核心竹简签文区（带有典雅的翻折动效体验） */}
        <div
          className={`relative z-10 transition-all duration-500 ${
            isCasting ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'
          }`}
        >
          {/* 经典名言金句 */}
          <div className="p-5 rounded-2xl bg-white/80 border border-stone-200/70 mb-5 relative shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]">
            <Feather className="absolute top-3.5 right-3.5 w-4 h-4 text-stone-300 pointer-events-none" />
            <blockquote className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-wide leading-relaxed mb-2">
              「{lot.motto}」
            </blockquote>
            <div className="flex items-center justify-between text-xs text-stone-400 font-serif">
              <span>出自 {lot.source}</span>
              <span className="text-stone-600 font-medium">
                研习宗要：{lot.direction}
              </span>
            </div>
          </div>

          {/* 宜忌研析 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs font-serif">
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex flex-col gap-1">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                宜 · 笃行致远
              </span>
              <span className="text-stone-700 leading-relaxed font-sans text-[13px]">
                {lot.dos}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex flex-col gap-1">
              <span className="font-bold text-amber-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                忌 · 浮游纸上
              </span>
              <span className="text-stone-700 leading-relaxed font-sans text-[13px]">
                {lot.donts}
              </span>
            </div>
          </div>

          {/* 底部操作与书院印印记 */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200/80">
            <button
              onClick={handleCopyMotto}
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 font-serif transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-sans">箴言已录入剪贴板</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-stone-400" />
                  <span>收存今日箴言</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 text-[11px] text-stone-400 font-serif">
              <span className="italic">格物致知 · 知行合一</span>
              <ScholarSeal text="知行" subtext="致远" size="sm" variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
