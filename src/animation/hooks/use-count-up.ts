import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../gsap-setup'

export interface UseCountUpOptions {
  duration?: number
  ease?: string
}

/**
 * 解析像 "500+", "98%", "200h+", "40+" 这样的字符串
 */
function parseNumberString(val: string): { prefix: string; num: number; suffix: string } {
  const match = val.match(/^([^0-9.]*)([0-9.]+)(.*)$/)
  if (!match) {
    return { prefix: '', num: 0, suffix: val }
  }
  return {
    prefix: match[1] || '',
    num: parseFloat(match[2]) || 0,
    suffix: match[3] || '',
  }
}

/**
 * 数字滚动递增 Hook
 */
export function useCountUp(targetValue: string, options: UseCountUpOptions = {}) {
  const { duration = 1.6, ease = 'power2.out' } = options
  const [displayValue, setDisplayValue] = useState(targetValue)
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    const { prefix, num, suffix } = parseNumberString(targetValue)
    if (isNaN(num)) return

    const counter = { val: 0 }

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: num,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => {
          const formatted = Math.floor(counter.val)
          setDisplayValue(`${prefix}${formatted}${suffix}`)
        },
      })
    }, el)

    return () => {
      ctx.revert()
    }
  }, [targetValue, duration, ease])

  return { displayValue, elementRef }
}
