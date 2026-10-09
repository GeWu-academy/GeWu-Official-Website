interface ScholarSealProps {
  text?: string
  subtext?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'cinnabar' | 'ink' | 'outline'
  className?: string
}

export function ScholarSeal({
  text = '格物',
  subtext = '致知',
  size = 'md',
  variant = 'cinnabar',
  className = '',
}: ScholarSealProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
  }

  const variantClasses = {
    cinnabar:
      'bg-red-800 dark:bg-[#991b1b]/90 text-amber-50 dark:text-amber-100 border border-red-700/60 dark:border-red-500/40 shadow-[0_2px_8px_rgba(185,28,28,0.25)] dark:shadow-[0_2px_12px_rgba(153,27,27,0.35),inset_0_1px_1px_rgba(255,255,255,0.12)]',
    ink: 'bg-stone-900 dark:bg-[#121622] text-stone-100 dark:text-slate-200 border border-stone-800 dark:border-slate-700/60 shadow-[0_2px_8px_rgba(28,25,23,0.15)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.5)]',
    outline:
      'bg-transparent text-red-800 dark:text-red-400/90 border-2 border-red-800/80 dark:border-red-500/50 dark:shadow-[0_1px_6px_rgba(153,27,27,0.2)]',
  }

  return (
    <div
      className={`inline-flex flex-col items-center justify-center font-serif select-none tracking-tighter leading-none rounded-[3px] p-0.5 relative group transition-transform hover:scale-105 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      title={`${text}${subtext}`}
    >
      {/* 仿古印泥边框细纹 */}
      <span className="absolute inset-[1.5px] border border-current opacity-40 rounded-[2px] pointer-events-none" />
      <span className="font-bold">{text}</span>
      {subtext && <span className="font-bold mt-[-1px]">{subtext}</span>}
    </div>
  )
}
