import { useState } from 'react'
import {
  GitPullRequest,
  MessageCircle,
  Copy,
  Check,
  Mail,
  Users2,
  Calendar,
  Sparkles,
  ArrowRight,
  Terminal,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { LiquidGlassCard } from '@/components/liquid-glass-card'
import { MagneticButton } from '@/components/magnetic-button'
import { COMMUNITY_INFO } from '@/data/community-data'

interface CollaborationSectionProps {
  onOpenMaintainer: () => void
}

export function CollaborationSection({ onOpenMaintainer }: CollaborationSectionProps) {
  const [copiedWechat, setCopiedWechat] = useState(false)
  const [copiedGit, setCopiedGit] = useState(false)

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(COMMUNITY_INFO.maintainerContact.wechat)
    setCopiedWechat(true)
    setTimeout(() => setCopiedWechat(false), 2000)
  }

  const handleCopyGit = () => {
    navigator.clipboard.writeText('git clone https://github.com/gewu-academy/gewu-starter.git')
    setCopiedGit(true)
    setTimeout(() => setCopiedGit(false), 2000)
  }

  return (
    <section id="collaboration" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 标头 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-mono text-cyan-300 mb-4">
            <Users2 className="w-3.5 h-3.5" />
            <span>JOIN & COLLABORATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            协作与加入 · 与优秀者同行
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            欢迎提交 Issue 与 Pull Request。加入书院或共同协作，联系组织 Maintainer。
          </p>
        </div>

        {/* 双翼核心协作卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 左侧通道：GitHub 开源协作 */}
          <LiquidGlassCard
            className="p-8 sm:p-10 flex flex-col justify-between"
            glowColor="rgba(56, 189, 248, 0.18)"
            elevated
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <GitPullRequest className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-cyan-300">
                  OPEN SOURCE
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                提交 Issue 与 Pull Request
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                无论是一个细小的 Bug 修复、文档校对，还是全新 Agent 架构组件的实现，我们珍视每一次开源贡献。
              </p>

              {/* 4 步参与流程 */}
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3 text-xs text-zinc-300">
                  <span className="font-mono text-cyan-400 font-bold">01</span>
                  <span>浏览项目仓库，认领标记有「good first issue」的任务</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3 text-xs text-zinc-300">
                  <span className="font-mono text-cyan-400 font-bold">02</span>
                  <span>Fork 仓库并在本地分支进行规范化编码与单元测试</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3 text-xs text-zinc-300">
                  <span className="font-mono text-cyan-400 font-bold">03</span>
                  <span>提交 Pull Request，Maintainer 展开详细 Code Review 并合并</span>
                </div>
              </div>

              {/* 代码片段与复制 */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between text-xs font-mono text-zinc-300 mb-6">
                <div className="flex items-center gap-2 truncate">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">git clone gewu-academy/gewu-starter.git</span>
                </div>
                <button
                  onClick={handleCopyGit}
                  className="flex items-center gap-1 text-[11px] text-cyan-300 hover:text-cyan-200 shrink-0 ml-2"
                >
                  {copiedGit ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedGit ? '已复制' : '复制'}</span>
                </button>
              </div>
            </div>

            <a
              href="https://github.com/gewu-academy"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <MagneticButton size="lg" variant="primary" className="w-full gap-2">
                <GithubIcon className="w-4 h-4" />
                <span>前往 GitHub 组织提交 PR / Issue</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </a>
          </LiquidGlassCard>

          {/* 右侧通道：加入书院与联系 Maintainer */}
          <LiquidGlassCard
            className="p-8 sm:p-10 flex flex-col justify-between"
            glowColor="rgba(52, 211, 153, 0.18)"
            elevated
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-emerald-300">
                  COMMUNITY ACCESS
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                联系组织 Maintainer
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                加入书院深度实践梯队，参与内部周会答辩，获取专属导师代码审查与精准内推机会。
              </p>

              {/* 联系方式展示列表 */}
              <div className="space-y-3 mb-6">
                <div className="p-4 rounded-xl liquid-glass bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400">Maintainer 微信</div>
                      <div className="text-sm font-semibold font-mono text-white">
                        {COMMUNITY_INFO.maintainerContact.wechat}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyWechat}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedWechat ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>复制微信号</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl liquid-glass bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400">官方联络邮箱</div>
                      <div className="text-sm font-semibold font-mono text-white">
                        {COMMUNITY_INFO.maintainerContact.email}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`mailto:${COMMUNITY_INFO.maintainerContact.email}`}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-zinc-200 transition-colors"
                  >
                    发送邮件
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200/90 leading-relaxed mb-6">
                💡 {COMMUNITY_INFO.maintainerContact.wechatGroupNote}
                ，请附带简短自我介绍或 GitHub 主页，便于快速匹配研讨梯队。
              </div>
            </div>

            <MagneticButton
              size="lg"
              variant="glass"
              onClick={onOpenMaintainer}
              className="w-full gap-2 border-emerald-400/40 text-emerald-200 hover:text-white"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>呼出加入向导与二维码</span>
            </MagneticButton>
          </LiquidGlassCard>
        </div>

        {/* 拓展设计：共建者守则与每周研讨机制 */}
        <div className="rounded-3xl liquid-glass-prominent p-8 sm:p-10 border border-white/15">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                COMMUNITY PROTOCOL & SYNC
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                格物书院共建公约
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 bg-white/[0.04] px-4 py-2 rounded-xl border border-white/10">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{COMMUNITY_INFO.maintainerContact.weeklySync}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {COMMUNITY_INFO.maintainerContact.rules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
