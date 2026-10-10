import { lazy, Suspense, useEffect } from 'react'
import { InkRippleCanvas } from '@/components/three/ink-ripple-canvas'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { TechDirectionsSection } from '@/components/tech-directions-section'
import { Footer } from '@/components/footer'
import { MobileDock } from '@/components/mobile-dock'
import { ScholarSeal } from '@/components/scholar-seal'
import { I18nProvider, useI18n } from '@/i18n'
import { useUIStore } from '@/store/use-ui-store'
import { LazySection } from '@/components/ui/lazy-section'
import { idlePreload, preloadMaintainerAssets } from '@/lib/preload'

// 动态代码分割与组件懒加载
const GewuOracleLot = lazy(() =>
  import('@/components/gewu-oracle-lot').then((m) => ({ default: m.GewuOracleLot }))
)
const ProjectsSection = lazy(() =>
  import('@/components/projects-section').then((m) => ({ default: m.ProjectsSection }))
)
const CareerPathwaySection = lazy(() =>
  import('@/components/career-pathway-section').then((m) => ({ default: m.CareerPathwaySection }))
)
const CollaborationSection = lazy(() =>
  import('@/components/collaboration-section').then((m) => ({ default: m.CollaborationSection }))
)
const FAQSection = lazy(() =>
  import('@/components/faq-section').then((m) => ({ default: m.FAQSection }))
)
const MaintainerDialog = lazy(() =>
  import('@/components/maintainer-dialog').then((m) => ({ default: m.MaintainerDialog }))
)

function AppContent() {
  const { t } = useI18n()
  const isMaintainerOpen = useUIStore((s) => s.isMaintainerOpen)
  const openMaintainerModal = useUIStore((s) => s.openMaintainerModal)
  const closeMaintainerModal = useUIStore((s) => s.closeMaintainerModal)

  // 页面首屏渲染完成后，利用空闲时间静默预加载弹窗及二维码资源
  useEffect(() => {
    idlePreload(() => {
      preloadMaintainerAssets()
    })
  }, [])

  const handleExploreDirections = () => {
    const el = document.getElementById('tech-directions')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen text-[var(--text-body)] bg-[var(--background)] selection:bg-[var(--accent-seal)]/15 selection:text-[var(--text-heading)] overflow-x-hidden font-sans transition-colors duration-300">
      {/* 水墨微澜互动画布（自适应白色、米白与暗色主题） */}
      <InkRippleCanvas opacity={0.12} />

      {/* 顶部雅集导航（含语言切换与三段式主题切换器） */}
      <Navbar onOpenMaintainer={openMaintainerModal} />

      {/* 核心板块内容流 */}
      <main className="relative z-10 flex flex-col">
        {/* 首屏：宋韵山门与 Three.js 格物乾坤仪（乾坤仪内部已异步懒加载） */}
        <HeroSection
          onOpenMaintainer={openMaintainerModal}
          onExploreDirections={handleExploreDirections}
        />

        {/* 书院之志：四立与初心 */}
        <PhilosophySection />

        {/* 格物四修：研习方向折屏 */}
        <TechDirectionsSection onOpenMaintainer={openMaintainerModal} />

        {/* 格物问策博古案：趣味书院省察体验（视口感知懒加载） */}
        <LazySection
          id="oracle-lot"
          minHeight="480px"
          className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--section-alt-bg)] border-y border-[var(--border)] transition-colors duration-300"
          fallback={
            <div className="max-w-4xl mx-auto flex items-center justify-center py-20 text-[var(--text-muted)] font-serif text-xs tracking-wider animate-pulse">
              格物博古案 · 布局罗列中...
            </div>
          }
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <ScholarSeal text={t.oracle.sealText} subtext={t.oracle.sealSubtext} size="sm" variant="cinnabar" />
                <span className="font-serif text-xs tracking-widest text-[var(--text-muted)] uppercase">
                  {t.oracle.subtitle}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-heading)] tracking-tight mb-2">
                {t.oracle.title}
              </h2>
              <p className="font-serif text-sm text-[var(--text-muted)]">
                {t.oracle.desc}
              </p>
            </div>

            {/* 灵签交互组件 */}
            <Suspense
              fallback={
                <div className="h-64 flex items-center justify-center font-serif text-xs text-[var(--text-muted)]">
                  灵签案具载入中...
                </div>
              }
            >
              <GewuOracleLot />
            </Suspense>
          </div>
        </LazySection>

        {/* 经世实作：实战孵化开源矩阵（视口感知懒加载） */}
        <LazySection id="projects" minHeight="550px">
          <Suspense fallback={null}>
            <ProjectsSection onOpenMaintainer={openMaintainerModal} />
          </Suspense>
        </LazySection>

        {/* 修己致远：消除信息差与职涯赋能（视口感知懒加载） */}
        <LazySection id="pathway" minHeight="500px">
          <Suspense fallback={null}>
            <CareerPathwaySection onOpenMaintainer={openMaintainerModal} />
          </Suspense>
        </LazySection>

        {/* 同窗雅集：协作与加入（视口感知懒加载） */}
        <LazySection id="collaboration" minHeight="450px">
          <Suspense fallback={null}>
            <CollaborationSection onOpenMaintainer={openMaintainerModal} />
          </Suspense>
        </LazySection>

        {/* 问道答疑：常见问题（视口感知懒加载） */}
        <LazySection id="faq" minHeight="400px">
          <Suspense fallback={null}>
            <FAQSection />
          </Suspense>
        </LazySection>
      </main>

      {/* 网站底栏 */}
      <Footer />

      {/* 移动端固定底部便携栏 */}
      <MobileDock
        onOpenMaintainer={openMaintainerModal}
        onExploreDirections={handleExploreDirections}
      />

      {/* 山长拜帖弹窗模态框（按需懒加载并结合预取） */}
      {isMaintainerOpen && (
        <Suspense fallback={null}>
          <MaintainerDialog
            isOpen={isMaintainerOpen}
            onClose={closeMaintainerModal}
          />
        </Suspense>
      )}
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}
