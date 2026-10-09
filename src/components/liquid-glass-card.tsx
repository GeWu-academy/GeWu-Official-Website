import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glowColor?: string
  enableTilt?: boolean
  elevated?: boolean
  tiltMaxAngle?: number
}

export function LiquidGlassCard({
  children,
  className,
  glowColor = 'rgba(56, 189, 248, 0.15)',
  enableTilt = true,
  elevated = false,
  tiltMaxAngle = 7,
  ...props
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, opacity: 0 })

  useEffect(() => {
    const card = cardRef.current
    if (!card || !enableTilt) return

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const percentX = (x / rect.width) * 100
      const percentY = (y / rect.height) * 100
      setMousePos({ x: percentX, y: percentY, opacity: 1 })

      // 计算 3D 旋转角度
      const rotateX = ((y / rect.height) - 0.5) * -tiltMaxAngle * 2
      const rotateY = ((x / rect.width) - 0.5) * tiltMaxAngle * 2

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      setMousePos((prev) => ({ ...prev, opacity: 0 }))
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enableTilt, tiltMaxAngle])

  return (
    <div
      ref={cardRef}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'group relative overflow-hidden rounded-2xl transition-all duration-300',
        elevated ? 'liquid-glass-prominent' : 'liquid-glass',
        className
      )}
      {...props}
    >
      {/* 动态折射光斑跟随层 */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, ${glowColor}, transparent 70%)`,
        }}
      />

      {/* 边缘超细高光线 */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.22), transparent 70%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* 卡片真实内容 */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
