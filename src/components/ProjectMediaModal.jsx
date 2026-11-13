import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './ResumeModal.css'

export default function ProjectMediaModal({ media, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const previousFocus = document.activeElement
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      previousFocus?.focus()
    }
  }, [])
  return createPortal(<dialog ref={ref} className="resume-modal project-media-modal" aria-labelledby="project-media-title" onCancel={onClose}
    onClick={event => {
      if (event.target !== event.currentTarget) return
      const rect = event.currentTarget.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
    }}>
    <header className="resume-modal__header">
      <h2 id="project-media-title">{media.label}</h2>
      <div className="resume-modal__actions">
        <a href={media.src} download>Download</a>
        <button type="button" autoFocus onClick={onClose} aria-label="Close preview">×</button>
      </div>
    </header>
    {media.key === 'slides'
      ? <video className="project-media-modal__content" src={media.src} controls playsInline autoPlay />
      : <img className="project-media-modal__content" src={media.src} alt="Sync’s People’s Choice Award" />}
  </dialog>, document.body)
}
