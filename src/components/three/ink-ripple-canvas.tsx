import { useEffect, useRef } from 'react'
import { useTheme } from '@/context/theme-context'

interface InkRippleCanvasProps {
  className?: string
  opacity?: number
}

interface InkDrop {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
  decay: number
  color: string
}

export function InkRippleCanvas({
  className = '',
  opacity = 0.12,
}: InkRippleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const drops: InkDrop[] = []
    const mouse = { x: -100, y: -100 }
    let lastMoveTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const getThemeColors = () => {
      const cur = themeRef.current
      if (cur === 'dark') {
        return [
          'rgba(56, 189, 248, ', // cyan-400
          'rgba(129, 140, 248, ', // indigo-400
          'rgba(52, 211, 153, ', // emerald-400
        ]
      }
      if (cur === 'cream') {
        return [
          'rgba(41, 37, 36, ', // stone-800 松烟
          'rgba(71, 85, 105, ', // slate-600 黛青
          'rgba(15, 118, 110, ', // teal-700 翡翠竹青
        ]
      }
      // white 纯白科技
      return [
        'rgba(15, 23, 42, ', // slate-900 墨色
        'rgba(2, 132, 199, ', // sky-600 晴空青
        'rgba(71, 85, 105, ', // slate-600 黛蓝
      ]
    }

    const addDrop = (x: number, y: number, isMajor = false) => {
      const colors = getThemeColors()
      const color = colors[Math.floor(Math.random() * colors.length)]
      const isDark = themeRef.current === 'dark'
      drops.push({
        x: x + (Math.random() - 0.5) * 15,
        y: y + (Math.random() - 0.5) * 15,
        radius: isMajor ? 6 : 3,
        maxRadius: isMajor ? 48 + Math.random() * 35 : 24 + Math.random() * 20,
        alpha: isMajor ? (isDark ? 0.45 : 0.35) : (isDark ? 0.3 : 0.22),
        decay: isMajor ? 0.003 : 0.005,
        color,
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      const now = performance.now()
      if (now - lastMoveTime > 45) {
        addDrop(e.clientX, e.clientY, false)
        lastMoveTime = now
      }
    }

    const handleClick = (e: MouseEvent) => {
      addDrop(e.clientX, e.clientY, true)
      addDrop(e.clientX, e.clientY, false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })

    const render = () => {
      animationId = requestAnimationFrame(render)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i]
        drop.radius += (drop.maxRadius - drop.radius) * 0.04
        drop.alpha -= drop.decay

        if (drop.alpha <= 0.01) {
          drops.splice(i, 1)
          continue
        }

        const grad = ctx.createRadialGradient(
          drop.x,
          drop.y,
          drop.radius * 0.1,
          drop.x,
          drop.y,
          drop.radius
        )
        grad.addColorStop(0, `${drop.color}${drop.alpha * 1.2})`)
        grad.addColorStop(0.6, `${drop.color}${drop.alpha * 0.6})`)
        grad.addColorStop(1, `${drop.color}0)`)

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    animationId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{ opacity }}
    />
  )
}
