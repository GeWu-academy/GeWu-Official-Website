import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50, opacity: 0 })

    const moveCursor = (e: MouseEvent) => {
      gsap.to([cursor, dot], { opacity: 1, duration: 0.3 })

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'none',
      })

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.28,
        ease: 'power2.out',
      })
    }

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 0.75, duration: 0.15 })
      gsap.to(dot, { scale: 1.5, duration: 0.15 })
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
      {/* 笔意光晕外圈 */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 h-8 w-8 rounded-full border border-[var(--cursor-ring)] bg-[var(--cursor-ring)]/[0.04] transition-transform duration-75 pointer-events-none"
      />
      {/* 笔意中心小点 */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-[var(--cursor-dot)] pointer-events-none shadow-[0_0_8px_var(--cursor-dot)]"
      />
    </div>
  )
}
