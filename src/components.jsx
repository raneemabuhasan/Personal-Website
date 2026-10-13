import { useInView } from './hooks/useInView.js'

export function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

export function Section({ id, sectionTitle, title, headingMedia = null, children, className = '' }) {
  const { ref, isVisible } = useInView()
  return (
    <section id={id} ref={ref} className={`section reveal ${isVisible ? 'is-visible' : ''} ${className}`}>
      <div className={`section-heading ${title || headingMedia ? '' : 'section-heading--compact'}`}>
        <div className="section-marker">
          <h2 className="section-label">{sectionTitle}</h2>
          {headingMedia}
        </div>
        {title && <h2>{title}</h2>}
      </div>
      {children}
    </section>
  )
}

export function SocialLink({ href, children }) {
  return (
    <a className="text-link" href={href} target="_blank" rel="noreferrer">
      {children} <ArrowIcon />
    </a>
  )
}

export function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-topline">
        <span className="project-number">{project.number}</span>
        <span>{project.type}</span>
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-footer">
        <ul className="tag-list" aria-label="Technologies used">
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <div className="project-links">
          <a href={project.links.demo} aria-label={`View ${project.title} live`}>Live <ArrowIcon /></a>
          <a href={project.links.code} aria-label={`View ${project.title} source code`}>Code <ArrowIcon /></a>
        </div>
      </div>
    </article>
  )
}
