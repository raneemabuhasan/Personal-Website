import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Section reveal using the selected React Bits Animated Content settings.
export default function AnimatedContent({
  children,
  distance = 24,
  direction = 'vertical',
  duration = 0.65,
  ease = 'power3.out',
  blur = 0,
  stagger = 0.1,
  threshold = 0.1,
}) {
  const ref = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Animate layout items individually without moving their grid containers.
      const groups = '.about-grid, .skills-grid, .resume-timeline, .contact-grid'
      const targets = stagger > 0 && el.children.length
        ? Array.from(el.children).flatMap(child => child.matches(groups) ? Array.from(child.children) : [child])
        : [el]
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

      targets.forEach((target, index) => {
        gsap.fromTo(target, from, {
          ...to,
          stagger: 0,
          delay: Math.min(index, 3) * stagger,
          scrollTrigger: {
            trigger: target,
            start: `clamp(top ${(1 - threshold) * 100}%)`,
            once: true,
          },
        })
      })
    }, el)

    return () => mm.revert()
  }, [distance, direction, duration, ease, blur, stagger, threshold])

  return <div ref={ref}>{children}</div>
}
