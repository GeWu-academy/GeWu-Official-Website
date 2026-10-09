import { useCountUp } from '../hooks/use-count-up'

interface AnimatedCounterProps {
  value: string
  className?: string
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const { displayValue, elementRef } = useCountUp(value)

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  )
}
