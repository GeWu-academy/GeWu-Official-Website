import { gsap } from '../gsap-setup'

export interface TextRevealOptions {
  delay?: number
  duration?: number
  stagger?: number
  yOffset?: number
}

/**
 * 文本/标题平滑上升揭示动画
 */
export function animateTextReveal(
  target: gsap.DOMTarget,
  options: TextRevealOptions = {}
) {
  const {
    delay = 0,
    duration = 1,
    stagger = 0.1,
    yOffset = 24,
  } = options

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: yOffset,
      filter: 'blur(4px)',
    },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration,
      delay,
      stagger,
      ease: 'power3.out',
    }
  )
}

/**
 * 宋韵书法印章微盖印动效（微缩放并回弹）
 */
export function animateSealStamp(
  target: gsap.DOMTarget,
  delay: number = 0
) {
  const tl = gsap.timeline({ delay })

  tl.fromTo(
    target,
    {
      scale: 1.35,
      opacity: 0,
      rotation: -6,
    },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.5,
      ease: 'back.out(2)',
    }
  ).to(target, {
    scale: 1.04,
    duration: 0.15,
    yoyo: true,
    repeat: 1,
    ease: 'power1.inOut',
  })

  return tl
}
