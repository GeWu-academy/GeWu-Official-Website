import { useState } from 'react'
import { ThemeProvider } from '@/context/theme-context'
import { InkRippleCanvas } from '@/components/three/ink-ripple-canvas'
import { CustomCursor } from '@/components/custom-cursor'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { TechDirectionsSection } from '@/components/tech-directions-section'
import { ProjectsSection } from '@/components/projects-section'
import { GewuOracleLot } from '@/components/gewu-oracle-lot'
import { CareerPathwaySection } from '@/components/career-pathway-section'
import { CollaborationSection } from '@/components/collaboration-section'
import { FAQSection } from '@/components/faq-section'
import { Footer } from '@/components/footer'
import { MaintainerDialog } from '@/components/maintainer-dialog'
import { ScholarSeal } from '@/components/scholar-seal'
import { I18nProvider, useI18n } from '@/i18n'

function AppContent() {
  const [isMaintainerOpen, setIsMaintainerOpen] = useState(false)
  const { t } = useI18n()

  const handleOpenMaintainer = () => {
    setIsMaintainerOpen(true)
  }

  const handleCloseMaintainer = () => {
    setIsMaintainerOpen(false)
  }

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

      {/* 游丝微光鼠标指针 */}
      <CustomCursor />

      {/* 顶部雅集导航（含语言切换与三段式主题切换器） */}
      <Navbar onOpenMaintainer={handleOpenMaintainer} />

      {/* 核心板块内容流 */}
      <main className="relative z-10 flex flex-col">
        {/* 首屏：宋韵山门与 Three.js 格物乾坤仪 */}
        <HeroSection
          onOpenMaintainer={handleOpenMaintainer}
          onExploreDirections={handleExploreDirections}
        />

        {/* 书院之志：四立与初心 */}
        <PhilosophySection />

        {/* 格物四修：研习方向折屏 */}
        <TechDirectionsSection onOpenMaintainer={handleOpenMaintainer} />

        {/* 格物问策博古案：趣味书院省察体验 */}
        <section
          id="oracle-lot"
          className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--section-alt-bg)] border-y border-[var(--border)] transition-colors duration-300"
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
            <GewuOracleLot />
          </div>
        </section>

        {/* 经世实作：实战孵化开源矩阵 */}
        <ProjectsSection onOpenMaintainer={handleOpenMaintainer} />

        {/* 修己致远：消除信息差与职涯赋能 */}
        <CareerPathwaySection onOpenMaintainer={handleOpenMaintainer} />

        {/* 同窗雅集：协作与加入 */}
        <CollaborationSection onOpenMaintainer={handleOpenMaintainer} />

        {/* 问道答疑：常见问题 */}
        <FAQSection />
      </main>

      {/* 网站底栏 */}
      <Footer />

      {/* 山长拜帖弹窗模态框 */}
      <MaintainerDialog
        isOpen={isMaintainerOpen}
        onClose={handleCloseMaintainer}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </ThemeProvider>
  )
}
