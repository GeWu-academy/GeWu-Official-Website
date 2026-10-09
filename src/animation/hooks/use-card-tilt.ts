import { useEffect, useRef } from 'react'
import { gsap } from '../gsap-setup'

export interface UseCardTiltOptions {
  maxRotation?: number
  scale?: number
  perspective?: number
}

/**
 * 3D 微倾斜交互 Hook
 */
export function useCardTilt<T extends HTMLElement = HTMLDivElement>(
  options: UseCardTiltOptions = {}
) {
  const ref = useRef<T>(null)
  const { maxRotation = 5, scale = 1.015, perspective = 1000 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // 设置父级/自身透视
    gsap.set(el, { transformPerspective: perspective, transformStyle: 'preserve-3d' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxRotation
      const rotateY = ((x - centerX) / centerX) * maxRotation

      gsap.to(el, {
        rotateX,
        rotateY,
        scale,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxRotation, scale, perspective])

  return ref
}
