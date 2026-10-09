import { useState, useEffect } from 'react'
import { X, Copy, Check, MessageCircle, Mail } from 'lucide-react'
import { COMMUNITY_INFO } from '@/data/community-data'
import { ScholarSeal } from '@/components/scholar-seal'
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 拜帖模态框主体 */}
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-3xl bg-[var(--dialog-bg)] border border-[var(--border)] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--theme-tab-bg)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 顶部标题与拜帖印签 */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-[var(--border)]">
          <div className="w-11 h-11 rounded-2xl p-1 bg-white border border-[var(--border)] overflow-hidden shadow-2xs">
            <img src={logoImg} alt="格物书院" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-lg text-[var(--text-heading)]">
                山长拜帖 · 入阁指引
              </h3>
              <ScholarSeal text="格物" subtext="拜启" size="sm" variant="cinnabar" />
            </div>
            <p className="text-xs text-[var(--text-muted)] font-serif">
              格物书院 · 穷理致知 · 知行合一
            </p>
          </div>
        </div>

        {/* 核心指引 */}
        <div className="p-3.5 rounded-xl bg-[var(--theme-tab-bg)] border border-[var(--border)] mb-5 text-xs text-[var(--text-body)] font-serif leading-relaxed">
          欢迎同窗！添加 Maintainer 微信时请备注：
          <span className="font-bold text-[var(--text-heading)] font-sans block mt-0.5">
            「格物加入 + 研习方向（AI / 全栈 / 系统 / 设计）」
          </span>
          山长将在 24 小时内邀你进入研习交流群。
        </div>

        {/* 联系方式条目 */}
        <div className="space-y-2.5 mb-5">
          {/* 微信 */}
          <div className="p-3.5 rounded-xl bg-[var(--card-elevated)] border border-[var(--border)] flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--accent-seal)]/10 text-[var(--accent-seal)] border border-[var(--accent-seal)]/20">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block font-mono">
                  WECHAT
                </span>
                <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] font-mono">
                  {COMMUNITY_INFO.maintainerContact.wechat}
                </span>
              </div>
            </div>
            <button
              onClick={copyWechat}
              className="px-3 py-1 rounded-lg bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] text-xs font-serif text-[var(--text-body)] flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedWechat ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 opacity-60" />
                  <span>复制</span>
                </>
              )}
            </button>
          </div>

          {/* 邮箱 */}
          <div className="p-3.5 rounded-xl bg-[var(--card-elevated)] border border-[var(--border)] flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--theme-tab-bg)] text-[var(--text-body)] border border-[var(--border)]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block font-mono">
                  EMAIL
                </span>
                <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] font-mono">
                  {COMMUNITY_INFO.maintainerContact.email}
                </span>
              </div>
            </div>
            <button
              onClick={copyEmail}
              className="px-3 py-1 rounded-lg bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] text-xs font-serif text-[var(--text-body)] flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 opacity-60" />
                  <span>复制</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 二维码展示 */}
        <div className="p-4 rounded-2xl bg-[var(--card-elevated)] border border-[var(--border)] flex flex-col items-center shadow-2xs mb-5">
          <div className="p-1.5 bg-white rounded-xl border border-[var(--border)] mb-2.5">
            <img
              src={maintainerQrImg}
              alt="山长 Alkaid 微信二维码"
              className="w-52 sm:w-56 h-auto object-contain rounded-lg"
            />
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-serif font-bold text-[var(--text-heading)]">
              {COMMUNITY_INFO.maintainerContact.name} ({COMMUNITY_INFO.maintainerContact.region})
            </span>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] font-serif mb-2.5">
            打开微信扫一扫添加山长，沟通入阁事宜
          </span>
          <div className="flex items-center gap-2">
            <a
              href={maintainerQrImg}
              download="Alkaid-WeChat-QRCode.jpg"
              className="px-3 py-1 rounded-lg bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] text-[11px] font-serif text-[var(--text-body)] transition-colors"
            >
              保存名片
            </a>
            <a
              href={maintainerQrImg}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded-lg bg-[var(--theme-tab-bg)] hover:bg-[var(--theme-hover-bg)] text-[11px] font-serif text-[var(--text-body)] transition-colors"
            >
              查看大图
            </a>
          </div>
        </div>

        {/* 底部关闭按钮 */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 font-serif text-xs font-medium transition-colors cursor-pointer"
        >
          关闭拜帖
        </button>
      </div>
    </div>
  )
}
