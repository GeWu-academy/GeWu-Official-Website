import { gsap } from '../gsap-setup'

/**
 * 灵签抽签仪式动效：晃动 -> 展平翻出 -> 朱砂印落定
 */
export function animateOracleCast(
  cardEl: HTMLElement,
  sealEl?: HTMLElement | null,
  onMidpoint?: () => void
) {
  const tl = gsap.timeline()

  // 1. 摇签动作：轻微左右角度摇摆与上下微颤
  tl.to(cardEl, {
    rotation: -2,
    y: -6,
    duration: 0.1,
    ease: 'power1.inOut',
  })
    .to(cardEl, {
      rotation: 2.5,
      y: -8,
      duration: 0.12,
      ease: 'power1.inOut',
    })
    .to(cardEl, {
      rotation: -1.5,
      y: -4,
      duration: 0.1,
      ease: 'power1.inOut',
    })
    .to(cardEl, {
      rotation: 0,
      y: 0,
      duration: 0.12,
      ease: 'power2.out',
    })
    // 2. 签纸微缩并翻面过渡
    .to(cardEl, {
      scale: 0.96,
      opacity: 0.6,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        if (onMidpoint) onMidpoint()
      },
    })
    // 3. 展签呈现：宣纸舒展
    .to(cardEl, {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      ease: 'back.out(1.4)',
    })

  // 4. 印章落定盖印
  if (sealEl) {
    tl.fromTo(
      sealEl,
      {
        scale: 1.5,
        opacity: 0,
        rotation: -10,
      },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'back.out(2.5)',
      },
      '-=0.2'
    )
  }

  return tl
}
