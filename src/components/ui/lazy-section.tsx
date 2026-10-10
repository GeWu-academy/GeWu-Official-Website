import { useState, useEffect, useRef, type ReactNode } from 'react'

interface LazySectionProps {
  id?: string
  className?: string
  minHeight?: string
  fallback?: ReactNode
  rootMargin?: string
  children: ReactNode
}

/**
 * 视口感知懒加载容器 (Viewport-based Lazy Loader)
 * 在用户滚动接近目标区域（默认提前 350px）时才渲染组件内容，
 * 搭配 React.lazy 可实现分包动态下载与极大降低首屏渲染负载。
 */
export function LazySection({
  id,
  className = '',
  minHeight = '300px',
  fallback,
  rootMargin = '350px',
  children,
}: LazySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(() => {
    // 若当前 URL Hash 与该区域匹配，则首屏直接可见，防止滚动锚点失效
    if (typeof window !== 'undefined' && id && window.location.hash === `#${id}`) {
      return true
    }
    return false
  })

  useEffect(() => {
    if (isVisible) return

    // 监听 hash 变化，若点击锚点跳转到该区块则立即呈现
    const handleHashChange = () => {
      if (id && window.location.hash === `#${id}`) {
        setIsVisible(true)
      }
    }
    window.addEventListener('hashchange', handleHashChange)

    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return () => window.removeEventListener('hashchange', handleHashChange)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [id, isVisible, rootMargin])

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={{ minHeight: isVisible ? undefined : minHeight }}
    >
      {isVisible ? children : (fallback ?? null)}
    </div>
  )
}
