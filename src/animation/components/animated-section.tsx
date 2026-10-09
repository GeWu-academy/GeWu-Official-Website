import { forwardRef, type ReactNode } from 'react'
import { useScrollReveal, type UseScrollRevealOptions } from '../hooks/use-scroll-reveal'

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  animationOptions?: UseScrollRevealOptions
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, className = '', animationOptions, ...props }, forwardedRef) => {
    const internalRef = useScrollReveal<HTMLDivElement>(animationOptions)

    return (
      <div
        ref={(node) => {
          (internalRef as any).current = node
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AnimatedSection.displayName = 'AnimatedSection'
