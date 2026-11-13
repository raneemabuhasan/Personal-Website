import { useEffect, useState } from 'react'
import ProjectShowcase from './components/ProjectShowcase.jsx'
import ArabicNameWatermark from './components/ArabicNameWatermark.jsx'
import ResumeModal from './components/ResumeModal.jsx'
import { Icon } from './components/ui/icon.jsx'
import { ArrowIcon, ProjectCard, Section, SocialLink } from './components.jsx'
import { projects, resumeSections, skillGroups } from './data.js'
import aboutPortrait from './assets/images/about-portrait.jpg'

const navGroups = {
  left: [
    { label: 'About', href: '#about', section: 'about' },
    { label: 'Projects', href: '#projects', section: 'projects' },
  ],
  right: [
    { label: 'Experience', href: '#experience', section: 'experience' },
    { label: 'Contact', href: '#contact', section: 'contact' },
  ],
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const heroActions = document.querySelector('#home .hero-actions')
    if (!heroActions) return undefined

    const sectionIds = ['about', 'projects', 'skills', 'experience', 'contact']
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    const navbar = document.querySelector('.navbar')

    const updateNavigation = () => {
      const show = heroActions.getBoundingClientRect().bottom <= 0
      setScrolled(show)
      if (!show) {
        setActiveSection('')
        setMenuOpen(false)
        return
      }

      // Activate a section as its start reaches the bottom of the fixed navbar.
      // Recompute on every scroll so hiding the navbar cannot erase observer state.
      const activationLine = navbar?.getBoundingClientRect().height ?? 90
      const currentSection = sections.reduce((current, section) => (
        section.getBoundingClientRect().top <= activationLine + 1 ? section.id : current
      ), '')
      setActiveSection(currentSection)
    }

    updateNavigation()
    window.addEventListener('scroll', updateNavigation, { passive: true })
    window.addEventListener('resize', updateNavigation)
    return () => {
      window.removeEventListener('scroll', updateNavigation)
      window.removeEventListener('resize', updateNavigation)
    }
  }, [])

  const renderLink = ({ label, href, section }) => (
    <a
      key={label}
      href={href}
      aria-current={activeSection === section ? 'location' : undefined}
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </a>
  )

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      inert={!scrolled}
      aria-hidden={!scrolled}
    >
      <nav className="nav-group nav-group--left" aria-label="Primary navigation">
        {navGroups.left.map(renderLink)}
      </nav>

      <a className="nav-identity" href="#home" aria-label="Raneem Abuhasan, Software Engineer — back to home">
        <ArabicNameWatermark variant="nav" />
        <span className="nav-name"><span>Raneem</span><span>Abuhasan</span></span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span /> <span />
        <span className="sr-only">Toggle navigation</span>
      </button>

      <nav className="nav-group nav-group--right" aria-label="Secondary navigation">
        {navGroups.right.map(renderLink)}
      </nav>

      <nav id="main-navigation" className={`mobile-navigation ${menuOpen ? 'nav-open' : ''}`} aria-label="Mobile navigation">
        {[...navGroups.left, ...navGroups.right].map(renderLink)}
      </nav>
    </header>
  )
}
// This is the default deskstop appearance of the hero section. The mobile version is handled in the CSS.
function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false)
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-welcome">
          <span className="hero-welcome-en">Welcome I’m</span>
          <span className="hero-welcome-divider" aria-hidden="true">◆</span>
          <span className="hero-welcome-ar" lang="ar" dir="rtl">مرحباً أنا</span>
        </p>
        <h1><ArabicNameWatermark /><span>Raneem</span><span>Abuhasan</span></h1>
        <p className="hero-role">Software Engineer</p>
        <div className="hero-actions">
          <button className="button button--primary" type="button" onClick={() => setResumeOpen(true)}>
            View Resume <Icon name="download" className="hero-work-icon" style={{ color: 'var(--v-olive-ink)' }} feedbackDuration={1.4} feedbackEase="gentle" />
          </button>
          <a className="hero-text-link" href="#projects">Explore my work <Icon name="arrow-down" className="hero-work-icon" style={{ color: 'var(--v-olive-ink)' }} feedbackDuration={0.7} feedbackEase="gentle" /></a>
        </div>
      </div>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
   { /*  <div className="scroll-note" aria-hidden="true"><span /> Scroll to discover</div> */}
    </section>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <Section
          id="about"
          sectionTitle="About Me"
          className="about-section"
          headingInContent
        >
          <div className="about-grid">
            <div className="about-heading section-heading section-heading--compact">
              <div className="section-marker"><h2 className="section-label"><span className="section-title-accent">About Me</span></h2></div>
            </div>
            <figure className="about-photo-block">
              <div className="about-photo-frame">
                <img className="about-photo" src={aboutPortrait} alt="Raneem Abuhasan, smiling and holding an iced coffee" />
              </div>
              <figcaption className="about-photo-caption">Coffee in hand, always.</figcaption>
            </figure>
            <div className="about-story">
            <p className="about-lead">
              I’m a Computer Science student at <a className="about-university-link" href="https://www.umb.edu/" target="_blank" rel="noopener noreferrer">UMass Boston</a> with a passion for full-stack development, building AI-powered systems, and creating applications that are useful and meaningful in everyday life.
            </p>
            <div className="about-copy">
              <p>
                Recently, I founded and led a 7-women development team building <a className="about-university-link" href="#projects">Sync</a>, an AI-powered menstrual health app offering personalized nutrition and movement guidance tailored to each phase of the womens menstrual cycle. In January 2027, I’ll join <a className="about-university-link" href="https://www.mks.com/" target="_blank" rel="noopener noreferrer">MKS Inc.</a> as an Enterprise Systems Technology intern, exploring the systems that support complex business operations.
              </p>
              <p className="about-personal">
                On a personal level, I enjoy content creation, discovering new coffee spots, and learning new sports like snowboarding, skiing and pickle ball.
              </p>
            </div>
            </div>
          </div>
        </Section>


        <Section id="projects" className="projects-section" headingContent={
          <div className="projects-heading">
            <h2>My <span className="section-title-accent">Projects</span></h2>
            <p>A collection of apps and web experiences I've built,
              combining thoughtful design, innovative problem-solving,
              and full-stack development.
              </p>
          </div>
        }>
          <ProjectShowcase />
          <div className="projects-github">
            <a href="https://github.com/raneemabuhasan" target="_blank" rel="noopener noreferrer">
              View all projects on GitHub <span aria-hidden="true">→</span>
            </a>
          </div>
        </Section>

        <Section id="skills" sectionTitle="Technical Skills" className="skills-section">
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>

        </Section>

        <Section id="experience" sectionTitle={<>Experience & <span className="section-title-accent">Education</span></>} className="experience-section">
          <div className="resume-timeline">
            {resumeSections.filter((section) => section.category !== 'Projects').flatMap((section) => section.entries).map((item) => (
              <article className="timeline-item" key={`${item.organization}-${item.period}`}>
                <p className="timeline-period">{item.period}</p>
                <div className="timeline-marker" aria-hidden="true">
                  {item.logo && (
                    <span className="timeline-logo">
                      <img src={item.logo} alt="" />
                    </span>
                  )}
                </div>
                <div className="timeline-details">
                  <h3>{item.role}</h3>
                  <p className="timeline-organization">
                    {item.organizationUrl ? <a href={item.organizationUrl} target="_blank" rel="noopener noreferrer">{item.organization}</a> : item.organization}
                  </p>
                  <p className="timeline-location">{item.affiliation}</p>
                  {item.description && <p className="project-description">{item.description}</p>}
                  {item.details.length > 0 && (
                    <ul>
                      {item.details.map((detail) => (
                        <li key={typeof detail === 'string' ? detail : detail.label}>
                          {typeof detail === 'string' ? detail : <><a href={detail.href} target="_blank" rel="noopener noreferrer">{detail.label}</a>{detail.suffix}</>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" className="contact-section" headingContent={
          <div className="contact-heading">
            <p className="contact-eyebrow">Get in touch</p>
            <h2>Let's <span>Connect</span></h2>
          </div>
        }>

          <div className="contact-grid">
            <dl className="contact-details">
              <div className="contact-detail contact-detail--email">
                <dt className="sr-only">Email</dt>
                <dd>
                  <a className="contact-email-label" href="mailto:raneem.abuhasan1@gmail.com">
                    <Icon name="mail" className="contact-icon" feedbackDuration={0.7} feedbackEase="gentle" />
                    <span>raneem.abuhasan1@gmail.com</span>
                  </a>
                </dd>
              </div>
              <div className="contact-detail">
                <dt className="sr-only">Location</dt>
                <dd>
                  <a className="contact-email-label contact-location-link" href="https://www.google.com/maps/search/?api=1&query=Boston%2C%20MA" target="_blank" rel="noreferrer">
                    <Icon name="map-pin" className="contact-icon" feedbackDuration={1.4} feedbackEase="gentle" />
                    <span>Boston, MA</span>
                  </a>
                </dd>
              </div>
            </dl>
            <div className="contact-aside">
              <SocialLink href="https://www.linkedin.com/in/raneem-abuhasan246/"><Icon name="linkedin" className="contact-icon" feedbackDuration={1.4} feedbackEase="gentle" />LinkedIn</SocialLink>
              <SocialLink href="https://github.com/raneemabuhasan"><Icon name="github" className="contact-icon" feedbackDuration={0.7} feedbackEase="gentle" />GitHub</SocialLink>
            </div>
          </div>
        </Section>
      </main>

    </>
  )
}

export default App
