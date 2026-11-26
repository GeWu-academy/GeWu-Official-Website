import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { useCountUp } from '../src/animation/hooks/use-count-up'

export function Counter({ value, name }: { value: string; name: string }) {
  const { displayValue, elementRef } = useCountUp(value, { duration: 0 })
  return <span role="status" aria-label={name} ref={elementRef}>{displayValue}</span>
}

export function Fixture() {
  const [ready, setReady] = useState(false)
  const [value, setValue] = useState('10+')
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(frame)
  }, [])
  return <>
    <div role="status" aria-label="ready">{ready ? 'ready' : 'starting'}</div>
    {['OSS', '开源', 'Flexible', '不定时', 'Direct', '500+', '98%', '98.5%', '200h+'].map(value =>
      <div key={value}><Counter value={value} name={value} /></div>
    )}
    <Counter value={value} name="changing" />
    <button onClick={() => setValue('完成')}>Change to text</button>
  </>
}

createRoot(document.getElementById('root')!).render(<Fixture />)
