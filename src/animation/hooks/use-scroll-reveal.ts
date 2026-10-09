import { useEffect, useRef } from 'react'
import { gsap } from '../gsap-setup'

export interface UseScrollRevealOptions {
  /**
   * 子元素的选择器（如 '.scholar-card' 或 'div > div'），用于 stagger 逐个出现
   */
  selector?: string
  /**
   * 触发位置，默认 'top 85%'
   */
  start?: string
  /**
   * Y轴初始偏移，默认 28
   */
  y?: number
  /**
   * 动画时长，默认 0.8
   */
  duration?: number
  /**
   * 子元素间隔延迟，默认 0.1
   */
  stagger?: number
  /**
   * 缓动，默认 'power3.out'
   */
  ease?: string
  /**
   * 是否只播放一次，默认 true
   */
  once?: boolean
}

/**
 * 方便为任意区域绑定 GSAP ScrollTrigger 滚动进入动画的 Hook
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const containerRef = useRef<T>(null)

  const {
    selector,
    start = 'top 85%',
    y = 28,
    duration = 0.8,
    stagger = 0.1,
    ease = 'power3.out',
    once = true,
  } = options

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const selected = selector ? el.querySelectorAll(selector) : null
      const targets = selected && selected.length > 0 ? selected : el
      const effectiveStagger = selected && selected.length > 0 ? stagger : 0

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
          filter: 'blur(3px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration,
          stagger: effectiveStagger,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once
              ? 'play none none none'
              : 'play reverse play reverse',
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
    }
  }, [selector, start, y, duration, stagger, ease, once])

  return containerRef
}
