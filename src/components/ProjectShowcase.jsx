import MagicBento from './MagicBento.jsx'
import { useState } from 'react'
import ProjectMediaModal from './ProjectMediaModal.jsx'
import { HugeiconsIcon } from '@hugeicons/react'
import { StarAward01Icon, ComputerVideoIcon } from '@hugeicons/core-free-icons'
import githubLogo from '../assets/images/projects/github-icon-mono.svg'
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

const showcaseProjects = [
  ...projects.filter(project => project.id === 'sync'),
  ...projects.filter(project => project.id !== 'sync'),
]

function SyncLinks({ links }) {
  const [media, setMedia] = useState(null)
  const sources = [
    { key: 'code', label: 'View Code', icon: <span className="sync-source__github" aria-hidden="true" /> },
    { key: 'award', label: 'View Award', icon: <HugeiconsIcon icon={StarAward01Icon} size={22} aria-hidden="true" /> },
    { key: 'slides', label: 'View Slides', icon: <HugeiconsIcon icon={ComputerVideoIcon} size={22} aria-hidden="true" /> },
  ]
  return <><div className="showcase-project__links sync-sources" style={{ '--github-logo': `url("${githubLogo}")` }}>
    {sources.map(({ key, label, icon }) => links[key]
      ? <a key={key} href={links[key]} target="_blank" rel="noreferrer"
          onClick={event => {
            if (key !== 'code') { event.preventDefault(); setMedia({ key, label: key === 'slides' ? 'Sync — Presentation' : 'Sync — Award', src: links[key] }) }
          }}>{icon}{label}</a>
      : <button key={key} type="button" disabled title={`${label}: source not yet added`}>{icon}{label}</button>)}
  </div>
    {media && <ProjectMediaModal media={media} onClose={() => setMedia(null)} />}
  </>
}

const items = showcaseProjects.map((project) => ({
  id: project.id,
  colSpan: 1,
  rowSpan: 1,
  content: (
    <article className="showcase-project" aria-labelledby={`${project.id}-title`}>
      <div className="showcase-project__copy">
        <div className="showcase-project__title-row">
          <h3 id={`${project.id}-title`}>{project.title}</h3>
          {project.logo && project.id !== 'sync' && <span className="showcase-project__logo"><img src={project.logo} alt="" /></span>}
        </div>
        <p className="showcase-project__date">{project.date}</p>
        <p className="showcase-project__summary">{project.description}</p>
      </div>
      <p className="showcase-project__details"><ProjectDetails project={project} /></p>
      {project.id === 'sync' ? <SyncLinks links={project.links} /> : (project.links.demo || project.links.code) && (
        <div className="showcase-project__links sync-sources" style={{ '--github-logo': `url("${githubLogo}")` }}>
          {project.links.demo && <a href={project.links.demo} target="_blank" rel="noreferrer">View demo <span aria-hidden="true">↗</span></a>}
          {project.links.code && <a href={project.links.code} target="_blank" rel="noreferrer"><span className="sync-source__github" aria-hidden="true" />View Code</a>}
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
