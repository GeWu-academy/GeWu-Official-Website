import { useState, useEffect } from 'react'
import { X, Copy, Check, MessageCircle, Mail, Sparkles, QrCode } from 'lucide-react'
import { COMMUNITY_INFO } from '@/data/community-data'
import logoImg from '@/assets/329871518.png'
import maintainerQrImg from '@/assets/maintainer-qr.jpg'

interface MaintainerDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function MaintainerDialog({ isOpen, onClose }: MaintainerDialogProps) {
  const [copiedWechat, setCopiedWechat] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const copyWechat = () => {
    navigator.clipboard.writeText(COMMUNITY_INFO.maintainerContact.wechat)
    setCopiedWechat(true)
    setTimeout(() => setCopiedWechat(false), 2000)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(COMMUNITY_INFO.maintainerContact.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* 遮罩 */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 模态框主体 */}
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl liquid-glass-prominent bg-[#0c1017]/95 border border-white/20 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 顶部标题与 Logo */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl p-1 bg-white border border-white/20 overflow-hidden shadow-lg shadow-cyan-500/10">
            <img src={logoImg} alt="格物书院" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>联系组织 Maintainer</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <p className="text-xs text-zinc-400 font-mono">
              格物书院 · 穷理而格物，知行以致远
            </p>
          </div>
        </div>

        {/* 核心指引 */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 mb-6 text-xs text-cyan-200 leading-relaxed">
          👋 欢迎加入书院！请在添加 Maintainer 微信时附带备注：
          <span className="font-semibold text-cyan-300">
            「格物加入 + 你的专注方向（如 AI Agent / 全栈 / 系统 / 设计）」
          </span>
          ，我们将在 24 小时内邀请你进入核心开发者协同群。
        </div>

        {/* 联系方式条目 */}
        <div className="space-y-3 mb-6">
          {/* 微信 */}
          <div className="p-4 rounded-xl liquid-glass bg-white/[0.02] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 block font-mono">
                  WECHAT ID
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {COMMUNITY_INFO.maintainerContact.wechat}
                </span>
              </div>
            </div>
            <button
              onClick={copyWechat}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedWechat ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制</span>
                </>
              )}
            </button>
          </div>

          {/* 邮箱 */}
          <div className="p-4 rounded-xl liquid-glass bg-white/[0.02] border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 block font-mono">
                  CONTACT EMAIL
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {COMMUNITY_INFO.maintainerContact.email}
                </span>
              </div>
            </div>
            <button
              onClick={copyEmail}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 拟物二维码卡片区域 */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center flex flex-col items-center">
          <div className="p-3 bg-white rounded-2xl shadow-xl mb-2 flex items-center justify-center relative">
            {/* SVG 艺术二维码预览 */}
            <div className="w-32 h-32 flex flex-col items-center justify-center border border-zinc-200 rounded-xl relative p-2 bg-zinc-50">
              <QrCode className="w-24 h-24 text-zinc-900" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-lg bg-white p-0.5 shadow-md border border-zinc-300">
                  <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            扫码或搜索微信号直接添加 Maintainer
          </span>
        </div>

        {/* 底部按钮 */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 font-medium text-xs transition-colors cursor-pointer"
          >
            关闭视窗
          </button>
        </div>
      </div>
    </div>
  )
}
