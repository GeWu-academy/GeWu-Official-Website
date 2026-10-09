/**
 * 资源预加载与空闲预取工具
 * 用于提升图片加载、关键弹窗与重型组件的感知性能
 */

const preloadedUrls = new Set<string>()

/**
 * 预加载单张图片并缓存到浏览器内存中
 */
export function preloadImage(src: string): Promise<void> {
  if (typeof window === 'undefined' || !src || preloadedUrls.has(src)) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      preloadedUrls.add(src)
      resolve()
    }
    img.onerror = () => {
      // 即使加载失败也不阻塞流程
      resolve()
    }
  })
}

/**
 * 批量预加载图片
 */
export function preloadImages(srcList: string[]): Promise<void[]> {
  return Promise.all(srcList.map(preloadImage))
}

/**
 * 利用浏览器空闲阶段 (requestIdleCallback) 进行低优先级预取
 * 避免争抢首屏关键帧渲染的主线程与网络带宽
 */
export function idlePreload(task: () => void, timeout = 2500): void {
  if (typeof window === 'undefined') return

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => task(), { timeout })
  } else {
    setTimeout(task, 600)
  }
}

/**
 * 预加载山长拜帖弹窗相关的脚本与微信二维码图片
 * 可在鼠标悬停、点击前置按钮或页面空闲时调用
 */
let maintainerPrefetched = false
export function preloadMaintainerAssets(): void {
  if (maintainerPrefetched) return
  maintainerPrefetched = true

  // 1. 预加载组件代码分包
  import('@/components/maintainer-dialog').catch(() => {})

  // 2. 预加载二维码高清图片
  import('@/assets/maintainer-qr.webp').then((mod) => {
    preloadImage(mod.default)
  }).catch(() => {})
}
