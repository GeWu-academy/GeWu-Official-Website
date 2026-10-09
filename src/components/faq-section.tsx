import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ_LIST } from '@/data/community-data'
import { ScholarSeal } from '@/components/scholar-seal'

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <ScholarSeal text="问道" subtext="解惑" size="sm" variant="cinnabar" />
            <span className="font-serif text-xs tracking-widest text-[var(--text-muted)] uppercase">
              QUESTIONS & ANSWERS
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-heading)] tracking-tight mb-3">
            入阁问道 · 常见答疑
          </h2>
          <p className="font-serif text-sm text-[var(--text-muted)]">
            关于加入书院、项目共建与修习就业的常见关切。
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_LIST.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="scholar-card rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif font-bold text-[var(--text-heading)] text-sm sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[var(--text-heading)]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[var(--text-body)] leading-relaxed border-t border-[var(--border)] pt-4 font-sans animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
