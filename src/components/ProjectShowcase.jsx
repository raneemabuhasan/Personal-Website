import MagicBento from './MagicBento.jsx'
import { projects } from '../data.js'
import './ProjectShowcase.css'

function ProjectDetails({ project }) {
  const phrases = project.highlights ?? []
  if (!phrases.length) return project.details
  const pattern = new RegExp(`(${phrases.map(phrase => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  return project.details.split(pattern).map((part, index) =>
    phrases.includes(part) ? <strong key={index}>{part}</strong> : part,
  )
}

const items = projects.map((project) => ({
  id: project.id,
  colSpan: 1,
  rowSpan: 1,
  content: (
    <article className="showcase-project" aria-labelledby={`${project.id}-title`}>
      <div className="showcase-project__copy">
        <div className="showcase-project__title-row">
          <h3 id={`${project.id}-title`}>{project.title}</h3>
          {project.logo && <span className="showcase-project__logo"><img src={project.logo} alt="" /></span>}
        </div>
        <p className="showcase-project__date">{project.date}</p>
        <p className="showcase-project__summary">{project.description}</p>
      </div>
      <p className="showcase-project__details"><ProjectDetails project={project} /></p>
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
      columns={2}
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
