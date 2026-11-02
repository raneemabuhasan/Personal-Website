import MagicBento from './MagicBento.jsx'
import { projects } from '../data.js'
import './ProjectShowcase.css'

const items = projects.map((project, index) => ({
  id: project.id,
  colSpan: index === 0 ? 3 : 2,
  rowSpan: index === 0 ? 3 : 2,
  content: (
    <article className="showcase-project" aria-labelledby={`${project.id}-title`}>
      <div className="showcase-project__copy">
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p className="showcase-project__date">{project.date}</p>
        <p className="showcase-project__summary">{project.description}</p>
      </div>
      <p className="showcase-project__details">{project.details}</p>
      <ul className="showcase-project__tags" aria-label="Technologies used">
        {project.tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
      {(project.links.demo || project.links.code) && (
        <div className="showcase-project__links">
          {project.links.demo && <a href={project.links.demo} target="_blank" rel="noreferrer">View demo <span aria-hidden="true">↗</span></a>}
          {project.links.code && <a href={project.links.code} target="_blank" rel="noreferrer">Code <span aria-hidden="true">↗</span></a>}
        </div>
      )}
    </article>
  ),
}))

export default function ProjectShowcase() {
  return (
    <MagicBento
      items={items}
      columns={5}
      rowHeight={160}
      gap={12}
      radius={20}
      theme="light"
      glowColor="#91623e"
      enableBorderGlow
      enableSpotlight
      spotlightRadius={300}
      clickEffect
      enableStars={false}
      enableTilt={false}
      enableMagnetism={false}
      textAutoHide={false}
      intro={false}
      className="project-bento"
    />
  )
}
