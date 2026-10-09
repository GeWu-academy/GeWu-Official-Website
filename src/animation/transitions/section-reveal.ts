import { gsap } from '../gsap-setup'

export interface SectionRevealOptions {
  trigger?: gsap.DOMTarget
  items?: gsap.DOMTarget
  header?: gsap.DOMTarget
  start?: string
  yOffset?: number
  stagger?: number
  duration?: number
  once?: boolean
}

/**
 * 区块滚动入场动画（带 ScrollTrigger）
 */
export function createSectionScrollReveal({
  trigger,
  items,
  header,
  start = 'top 82%',
  yOffset = 30,
  stagger = 0.12,
  duration = 0.85,
  once = true,
}: SectionRevealOptions) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger as any,
      start,
      toggleActions: once ? 'play none none none' : 'play reverse play reverse',
    },
  })

  // 如果传入了标题区域，先播放标题淡入
  if (header) {
    tl.fromTo(
      header,
      {
        opacity: 0,
        y: yOffset * 0.7,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration * 0.8,
        ease: 'power3.out',
      }
    )
  }

  // 随后错落展示子项
  if (items) {
    tl.fromTo(
      items,
      {
        opacity: 0,
        y: yOffset,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        stagger,
        ease: 'power3.out',
      },
      header ? '-=0.4' : 0
    )
  }

  return tl
}
