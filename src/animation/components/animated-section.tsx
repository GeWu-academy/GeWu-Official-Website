import { forwardRef, useImperativeHandle, type ReactNode } from 'react'
import { useScrollReveal, type UseScrollRevealOptions } from '../hooks/use-scroll-reveal'

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  animationOptions?: UseScrollRevealOptions
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, className = '', animationOptions, ...props }, forwardedRef) => {
    const internalRef = useScrollReveal<HTMLDivElement>(animationOptions)

    useImperativeHandle(forwardedRef, () => internalRef.current as HTMLDivElement, [internalRef])

    return (
      <div
        ref={internalRef}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AnimatedSection.displayName = 'AnimatedSection'
