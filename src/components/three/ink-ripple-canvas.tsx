import { useEffect, useRef } from 'react'

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
  opacity = 0.08,
}: InkRippleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let drops: InkDrop[] = []
    let lastTime = 0
    let mouse = { x: -100, y: -100, isMoving: false }
    let lastMoveTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // 水墨雅色谱：松烟灰、黛青、天青微蓝
    const inkColors = [
      'rgba(41, 37, 36, ', // stone-800 松烟
      'rgba(71, 85, 105, ', // slate-600 黛青
      'rgba(15, 118, 110, ', // teal-700 翡翠竹青
    ]

    const addDrop = (x: number, y: number, isMajor = false) => {
      const color = inkColors[Math.floor(Math.random() * inkColors.length)]
      drops.push({
        x: x + (Math.random() - 0.5) * 15,
        y: y + (Math.random() - 0.5) * 15,
        radius: isMajor ? 6 : 3,
        maxRadius: isMajor ? 45 + Math.random() * 35 : 22 + Math.random() * 20,
        alpha: isMajor ? 0.35 : 0.22,
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
      // 点击时晕开一朵稍大的淡墨
      addDrop(e.clientX, e.clientY, true)
      addDrop(e.clientX, e.clientY, false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })

    const render = (time: number) => {
      animationId = requestAnimationFrame(render)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制并更新每朵墨迹
      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i]
        drop.radius += (drop.maxRadius - drop.radius) * 0.04
        drop.alpha -= drop.decay

        if (drop.alpha <= 0.01) {
          drops.splice(i, 1)
          continue
        }

        // 径向渐变模拟墨汁在宣纸纤维中散开的边缘晕染
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
