import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Section reveal using the selected React Bits Animated Content settings.
export default function AnimatedContent({
  children,
  distance = 16,
  direction = 'vertical',
  duration = 0.45,
  ease = 'power3.out',
  blur = 0,
  stagger = 0,
  threshold = 0.1,
}) {
  const ref = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = stagger > 0 && el.children.length ? Array.from(el.children) : [el]
      const axis = direction === 'horizontal' ? 'x' : 'y'
      const from = { [axis]: distance, opacity: 0 }
      const to = {
        [axis]: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        clearProps: 'filter,transform',
      }
      if (blur > 0) {
        from.filter = `blur(${blur}px)`
        to.filter = 'blur(0px)'
      }

      const timeline = gsap.timeline({ paused: true }).fromTo(targets, from, to)
      ScrollTrigger.create({
        trigger: el,
        start: `clamp(top ${(1 - threshold) * 100}%)`,
        once: true,
        onEnter: () => timeline.play(),
      })
    }, el)

    return () => mm.revert()
  }, [distance, direction, duration, ease, blur, stagger, threshold])

  return <div ref={ref}>{children}</div>
}
