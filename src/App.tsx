import { useState } from 'react'
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
import { MobileDock } from '@/components/mobile-dock'
import { ScholarSeal } from '@/components/scholar-seal'

export default function App() {
  const [isMaintainerOpen, setIsMaintainerOpen] = useState(false)

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
    <div className="relative min-h-screen text-stone-800 bg-[#faf9f5] selection:bg-red-800/10 selection:text-red-900 overflow-x-hidden font-sans">
      {/* 宣纸落墨 · 水墨晕染微澜互动画布 */}
      <InkRippleCanvas opacity={0.12} />

      {/* 墨韵游丝鼠标指针 */}
      <CustomCursor />

      {/* 顶部素白雅集导航 */}
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

        {/* 格物灵签互动博古案：趣味书院修己体验 */}
        <section
          id="oracle-lot"
          className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-stone-100/50 border-y border-stone-200/70"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <ScholarSeal text="问策" subtext="格物" size="sm" variant="cinnabar" />
                <span className="font-serif text-xs tracking-widest text-stone-500 uppercase">
                  ZEN LOT & ORACLE
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-2">
                格物问策 · 晨昏省察
              </h2>
              <p className="font-serif text-sm text-stone-500">
                探寻今日研习心境，在代码与工程之间体悟造物与笃行之妙
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

      {/* 移动端快捷浮动坞 */}
      <MobileDock
        onOpenMaintainer={handleOpenMaintainer}
        onExploreDirections={handleExploreDirections}
      />

      {/* 山长拜帖弹窗模态框 */}
      <MaintainerDialog
        isOpen={isMaintainerOpen}
        onClose={handleCloseMaintainer}
      />
    </div>
  )
}
