import { ArrowUp, Heart } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { ScholarSeal } from '@/components/scholar-seal'
import logoImg from '@/assets/329871518.png'
import { COMMUNITY_INFO } from '@/data/community-data'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-stone-200/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-[#f5f4ee]/70">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-200/80">
          {/* 左侧：Logo 与使命 */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl overflow-hidden p-0.5 border border-stone-200 bg-white shadow-2xs">
                <img
                  src={logoImg}
                  alt="格物书院"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-900 text-lg tracking-wide">
                  格物书院
                </span>
                <ScholarSeal text="格物" subtext="致知" size="sm" variant="cinnabar" />
              </div>
            </div>

            <p className="font-serif text-lg text-stone-800 tracking-wider">
              {COMMUNITY_INFO.motto}
            </p>

            <p className="text-xs sm:text-sm text-stone-500 font-serif max-w-md leading-relaxed">
              面向开发者与设计师的实践学社。同行互帮互助，打磨硬核实战能力，消除求职与技术信息差，助力成员更好就业与立身。
            </p>
          </div>

          {/* 中间：研习方向 */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-stone-800 tracking-wider">
              研习方向
            </h4>
            <ul className="space-y-1.5 text-xs font-serif text-stone-600">
              <li>
                <a href="#tech-directions" className="hover:text-stone-950 transition-colors">
                  AI & Agent 开发
                </a>
              </li>
              <li>
                <a href="#tech-directions" className="hover:text-stone-950 transition-colors">
                  TypeScript 全栈架构
                </a>
              </li>
              <li>
                <a href="#tech-directions" className="hover:text-stone-950 transition-colors">
                  系统工程与高并发
                </a>
              </li>
              <li>
                <a href="#tech-directions" className="hover:text-stone-950 transition-colors">
                  UI/UX 设计与体验架构
                </a>
              </li>
            </ul>
          </div>

          {/* 右侧：社区与开源 */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-serif text-xs font-bold text-stone-800 tracking-wider">
              书院雅集
            </h4>
            <ul className="space-y-1.5 text-xs font-serif text-stone-600">
              <li>
                <a
                  href="https://github.com/gewu-academy"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-stone-950 transition-colors"
                >
                  <GithubIcon className="w-3 h-3" />
                  <span>GitHub 组织主页</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-stone-950 transition-colors">
                  经世实作 · 开源矩阵
                </a>
              </li>
              <li>
                <a href="#oracle-lot" className="hover:text-stone-950 transition-colors">
                  格物灵签 · 修己箴言
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-stone-950 transition-colors">
                  同窗答疑 · 常见问题
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底栏版权与返回顶部 */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-stone-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} 格物书院 (Gewu Academy). All rights reserved.</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              以开源求真之道共筑 <Heart className="w-3 h-3 text-red-800 fill-red-800" />
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors cursor-pointer shadow-2xs"
          >
            <span>返回顶部</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
