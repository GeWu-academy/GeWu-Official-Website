import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isInitialized = false

/**
 * 确保 GSAP 插件在浏览器环境下只注册一次
 */
export function initGsap() {
  if (typeof window === 'undefined') return
  if (!isInitialized) {
    gsap.registerPlugin(ScrollTrigger)
    
    // 设置全局默认缓动
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.8,
    })

    // 配置 ScrollTrigger 默认参数
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    })

    isInitialized = true
  }
}

// 立即初始化
initGsap()

export { gsap, ScrollTrigger }
export default gsap
