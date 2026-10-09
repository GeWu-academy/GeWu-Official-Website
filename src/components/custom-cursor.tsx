import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 移动端或无鼠标设备不挂载
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50, opacity: 0 })

    const moveCursor = (e: MouseEvent) => {
      // 首次移动时淡入
      gsap.to([cursor, dot], { opacity: 1, duration: 0.3 })

      // 小圆点几乎无延迟跟随
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'none',
      })

      // 外圈光晕带柔和物理阻尼跟随
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.85, duration: 0.2 })
      gsap.to(dot, { scale: 1.4, duration: 0.2 })
    }

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* 外圈微光透镜光晕 */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-cyan-400/40 bg-cyan-400/[0.04] backdrop-blur-[2px] transition-transform duration-75"
        style={{
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)',
        }}
      />
      {/* 中心高亮微光点 */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#38bdf8]"
      />
    </div>
  )
}
