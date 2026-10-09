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
      {/* 墨韵外圈 */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 h-8 w-8 rounded-full border border-stone-400/40 bg-stone-500/[0.03] transition-transform duration-75 pointer-events-none"
      />
      {/* 朱砂笔意中心小点 */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-red-800 pointer-events-none shadow-[0_0_6px_rgba(185,28,28,0.4)]"
      />
    </div>
  )
}
