import { useId, useLayoutEffect, useRef } from 'react'
import glyphs from '../assets/calligraphy/arabic-name.json'
import './ArabicNameWatermark.css'

// Amiri outlines shaped as a complete RTL phrase, with centerline pen masks.
// Outlining keeps joins and placement identical without waiting for a webfont.
export default function ArabicNameWatermark({ variant = 'hero' }) {
  const id = useId().replace(/:/g, '')
  const svgRef = useRef(null)

  useLayoutEffect(() => {
    // Use actual SVG units rather than pathLength normalization. Include cap
    // clearance so round endpoints cannot leak through a not-yet-drawn mask.
    svgRef.current.querySelectorAll('.arabic-name-watermark__pen').forEach(path => {
      const length = Math.max(1, Math.ceil(path.getTotalLength()))
      path.style.setProperty('--pen-dashes', `${length} ${length + 104}`)
      path.style.setProperty('--pen-offset', `${length + 52}`)
    })
  }, [])

  return (
    <svg
      ref={svgRef}
      className={`arabic-name-watermark${variant === 'nav' ? ' arabic-name-watermark--nav' : ''}`}
      viewBox="-10 -245 910 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {glyphs.map((glyph, index) => (
          <mask key={index} id={`${id}-pen-${index}`} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="-30" y="-270" width="960" height="450" style={{ maskType: 'alpha' }}>
            {glyph.strokes.map((stroke, strokeIndex) => (
              <path
                key={strokeIndex}
                className="arabic-name-watermark__pen"
                d={stroke.d}
                fill="none"
                stroke="white"
                strokeWidth="52"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ '--pen-delay': `${stroke.delay}s`, '--pen-duration': `${stroke.duration}s` }}
              />
            ))}
          </mask>
        ))}
      </defs>
      {glyphs.map((glyph, index) => (
        <path key={index} d={glyph.outline} fill="currentColor" mask={`url(#${id}-pen-${index})`} />
      ))}
    </svg>
  )
}
