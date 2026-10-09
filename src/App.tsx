import { useState } from 'react'
import { LiquidOrbBackground } from '@/components/liquid-orb-background'
import { CustomCursor } from '@/components/custom-cursor'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { TechDirectionsSection } from '@/components/tech-directions-section'
import { LiquidGlassLab } from '@/components/liquid-glass-lab'
import { ProjectsSection } from '@/components/projects-section'
import { CareerPathwaySection } from '@/components/career-pathway-section'
import { CollaborationSection } from '@/components/collaboration-section'
import { FAQSection } from '@/components/faq-section'
import { Footer } from '@/components/footer'
import { MaintainerDialog } from '@/components/maintainer-dialog'
import { MobileDock } from '@/components/mobile-dock'

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
    <div className="relative min-h-screen text-zinc-100 bg-[#07090e] selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* 动态 GSAP 流体光斑背景 */}
      <LiquidOrbBackground />

      {/* 桌面端液态光晕鼠标跟随 */}
      <CustomCursor />

      {/* 顶部悬浮毛玻璃导航 */}
      <Navbar onOpenMaintainer={handleOpenMaintainer} />

      {/* 核心板块内容流 */}
      <main className="relative z-10 flex flex-col">
        {/* 首屏英雄区：名言与核心定位 */}
        <HeroSection
          onOpenMaintainer={handleOpenMaintainer}
          onExploreDirections={handleExploreDirections}
        />

        {/* 初衷与初心理念：四维互助矩阵 */}
        <PhilosophySection />

        {/* 技术栈与实践方向：4 大核心领域深度视窗 */}
        <TechDirectionsSection onOpenMaintainer={handleOpenMaintainer} />

        {/* 亮点：透明液态玻璃交互实验室 */}
        <LiquidGlassLab />

        {/* 实战孵化与开源项目矩阵 */}
        <ProjectsSection onOpenMaintainer={handleOpenMaintainer} />

        {/* 求职赋能与闭环机制：消除信息差 */}
        <CareerPathwaySection onOpenMaintainer={handleOpenMaintainer} />

        {/* 协作与加入：Issue / PR / Maintainer */}
        <CollaborationSection onOpenMaintainer={handleOpenMaintainer} />

        {/* 常见疑问解答 */}
        <FAQSection />
      </main>

      {/* 网站底栏 */}
      <Footer />

      {/* 移动端快捷悬浮动作坞 */}
      <MobileDock
        onOpenMaintainer={handleOpenMaintainer}
        onExploreDirections={handleExploreDirections}
      />

      {/* 联系 Maintainer 弹窗模态框 */}
      <MaintainerDialog
        isOpen={isMaintainerOpen}
        onClose={handleCloseMaintainer}
      />
    </div>
  )
}
