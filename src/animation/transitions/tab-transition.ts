import { gsap } from '../gsap-setup'

/**
 * 屏风展开/选项卡切换平滑动效
 */
export function animateTabSwitch(container: gsap.DOMTarget) {
  const tl = gsap.timeline()

  tl.fromTo(
    container,
    {
      opacity: 0,
      y: 16,
      scale: 0.99,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: 'power2.out',
    }
  )

  return tl
}
