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
      'bg-red-800 dark:bg-red-700/90 text-amber-50 dark:text-amber-100 border border-red-700/60 dark:border-red-500/50 shadow-[0_2px_8px_rgba(185,28,28,0.25)] dark:shadow-[0_0_12px_rgba(239,68,68,0.35)]',
    ink: 'bg-stone-900 dark:bg-slate-800 text-stone-100 dark:text-slate-200 border border-stone-800 dark:border-slate-700 shadow-[0_2px_8px_rgba(28,25,23,0.15)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.5)]',
    outline:
      'bg-transparent text-red-800 dark:text-red-400 border-2 border-red-800/80 dark:border-red-500/80 dark:shadow-[0_0_8px_rgba(239,68,68,0.2)]',
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
