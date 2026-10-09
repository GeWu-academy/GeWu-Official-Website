// GSAP 全局实例与配置
export { gsap, ScrollTrigger, initGsap } from './gsap-setup'

// 核心动效 Hooks
export { useScrollReveal, type UseScrollRevealOptions } from './hooks/use-scroll-reveal'
export { useCountUp, type UseCountUpOptions } from './hooks/use-count-up'
export { useCardTilt, type UseCardTiltOptions } from './hooks/use-card-tilt'
export { useMagnetic, type UseMagneticOptions } from './hooks/use-magnetic'

// 核心过渡与时间线函数
export {
  animateTextReveal,
  animateSealStamp,
  type TextRevealOptions,
} from './transitions/text-reveal'
export {
  createSectionScrollReveal,
  type SectionRevealOptions,
} from './transitions/section-reveal'
export { animateTabSwitch } from './transitions/tab-transition'
export { animateOracleCast } from './transitions/oracle-cast'

// 动效组件封装
export { AnimatedCounter } from './components/animated-counter'
export { AnimatedSection } from './components/animated-section'
