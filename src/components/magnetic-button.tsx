import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'glass' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  strength?: number
  onClick?: () => void
}

export function MagneticButton({
  children,
  variant = 'glass',
  size = 'md',
  className,
  strength = 0.35,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const content = contentRef.current
    if (!button || !content) return

    // 移动端不启用磁性物理位移以保证触摸体验
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      gsap.to(button, {
        x: distanceX * strength,
        y: distanceY * strength,
        duration: 0.4,
        ease: 'power2.out',
      })

      gsap.to(content, {
        x: distanceX * (strength * 0.4),
        y: distanceY * (strength * 0.4),
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1.1, 0.3)',
      })

      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1.1, 0.3)',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs rounded-full',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-base rounded-2xl',
  }[size]

  const variantClasses = {
    primary:
      'bg-cyan-500/90 hover:bg-cyan-400 text-zinc-950 font-semibold shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-300/40 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]',
    glass:
      'bg-white/[0.06] hover:bg-white/[0.12] text-zinc-100 backdrop-blur-xl border border-white/15 hover:border-cyan-400/50 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_32px_rgba(6,182,212,0.2),inset_0_1px_2px_rgba(255,255,255,0.4)]',
    outline:
      'bg-transparent hover:bg-white/[0.04] text-zinc-300 hover:text-white border border-white/20 hover:border-white/40',
    ghost:
      'bg-transparent hover:bg-white/[0.06] text-zinc-300 hover:text-white border-transparent',
  }[variant]

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cn(
        'group relative inline-flex items-center justify-center cursor-pointer select-none overflow-hidden transition-colors active:scale-95',
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      {/* 边缘微光反射层 */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span ref={contentRef} className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}
