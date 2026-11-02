import { useEffect, useRef } from 'react'
import './ResumeModal.css'

export default function ResumeModal({ onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="resume-modal"
      aria-labelledby="resume-modal-title"
      onCancel={onClose}
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
      }}
    >
      <header className="resume-modal__header">
        <h2 id="resume-modal-title">My Resume</h2>
        <div className="resume-modal__actions">
          <a href="/resume.pdf" download>Download PDF</a>
          <button type="button" autoFocus onClick={onClose} aria-label="Close resume">×</button>
        </div>
      </header>
      <iframe className="resume-modal__document" src="/resume.pdf" title="Raneem Abuhasan’s resume" />
      <p className="resume-modal__fallback">Can’t see the document? <a href="/resume.pdf" target="_blank" rel="noreferrer">Open the PDF</a> or use Download PDF.</p>
    </dialog>
  )
}
