import { useState } from 'react'
import {
  GitPullRequest,
  MessageCircle,
  Copy,
  Check,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { ScholarSeal } from '@/components/scholar-seal'
import { COMMUNITY_INFO } from '@/data/community-data'

interface CollaborationSectionProps {
  onOpenMaintainer: () => void
}

export function CollaborationSection({ onOpenMaintainer }: CollaborationSectionProps) {
  const [copiedWechat, setCopiedWechat] = useState(false)

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(COMMUNITY_INFO.maintainerContact.wechat)
    setCopiedWechat(true)
    setTimeout(() => setCopiedWechat(false), 2000)
  }

  return (
    <section id="collaboration" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 标头 */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <ScholarSeal text="入阁" subtext="协同" size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-widest text-stone-500 uppercase">
              JOIN FELLOWSHIP
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
            同窗雅集 · 协同入阁
          </h2>
          <p className="font-serif text-sm sm:text-base text-stone-600 leading-relaxed">
            欢迎发起 Issue 与 Pull Request。加入书院或共同协作，随时拜谒组织山长。
          </p>
        </div>

        {/* 双翼核心协作卡片（素白宣纸卡片体系） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* 左侧通道：GitHub 开源协作 */}
          <div className="scholar-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-stone-100 text-stone-900 border border-stone-200">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <span className="text-xs font-serif px-2.5 py-1 rounded bg-stone-100 text-stone-600 border border-stone-200">
                  开源共建
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                发起 Issue & PR 提交通道
              </h3>
              <p className="font-serif text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                书院推崇「代码说话」。前往 GitHub 组织，挑选标有 good first issue 的任务，共同打磨生产级工程。
              </p>

              <div className="space-y-2 mb-6 text-xs sm:text-sm text-stone-700 font-serif">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-700 shrink-0" />
                  <span>严谨的 Code Review 与系统架构答辩</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-700 shrink-0" />
                  <span>所有合并代码永久保留贡献者学籍署名</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200/80">
              <a
                href="https://github.com/gewu-academy"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-serif text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <GitPullRequest className="w-4 h-4 text-amber-200" />
                <span>前往 GitHub 组织主页</span>
              </a>
            </div>
          </div>

          {/* 右侧通道：联系组织山长 Maintainer */}
          <div className="scholar-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-red-50 text-red-800 border border-red-200/70">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <ScholarSeal text="山长" subtext="拜帖" size="sm" variant="cinnabar" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-2">
                拜访山长 · 专属入群通道
              </h3>
              <p className="font-serif text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                添加 Maintainer 微信并注明「姓名 + 研习方向」，将在 24 小时内获得沟通并受邀加入书院同行交流群。
              </p>

              {/* 微信复制栏 */}
              <div className="p-3 rounded-xl bg-stone-100/80 border border-stone-200 flex items-center justify-between gap-3 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-serif text-stone-500">Maintainer 微信</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-200/80 text-stone-600 font-serif">
                      {COMMUNITY_INFO.maintainerContact.region}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-stone-900">
                    {COMMUNITY_INFO.maintainerContact.wechat}
                  </span>
                </div>
                <button
                  onClick={handleCopyWechat}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 text-xs font-serif text-stone-700 border border-stone-200 shadow-2xs transition-all cursor-pointer"
                >
                  {copiedWechat ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                      <span>复制</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200/80">
              <button
                onClick={onOpenMaintainer}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-serif text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <span>查看山长拜帖与微信二维码</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>
        </div>

        {/* 每周常例圆桌说明 */}
        <div className="rounded-2xl bg-stone-100/70 border border-stone-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-stone-700 shrink-0" />
            <div>
              <span className="font-serif font-bold text-sm text-stone-900 block">
                每周日晚 20:30 书院在线技术圆桌
              </span>
              <span className="text-xs text-stone-500 font-serif">
                同行结对编程、生产疑难 Bug 攻坚复盘、模拟面试答辩与求职动态分享
              </span>
            </div>
          </div>
          <span className="text-xs font-serif text-stone-600 px-3 py-1.5 rounded-lg bg-white border border-stone-200 shrink-0">
            全员公开研讨
          </span>
        </div>
      </div>
    </section>
  )
}
