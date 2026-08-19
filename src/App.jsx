import { useEffect, useState } from 'react'
import { ArrowIcon, ProjectCard, Section, SocialLink } from './components.jsx'
import { experience, projects, skillGroups } from './data.js'
import oliveBranch from './assets/images/palestinian-olive-branch.png'

const navGroups = {
  left: [
    { label: 'About', href: '#about', section: 'about' },
    { label: 'Resume', href: '#experience', section: 'experience' },
  ],
  right: [
    { label: 'Projects', href: '#projects', section: 'projects' },
    { label: 'Contact', href: '#contact', section: 'contact' },
  ],
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const hero = document.querySelector('#home')
    if (!hero) return undefined

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting)

        if (entry.isIntersecting) {
          setActiveSection('')
        }
      },
      { rootMargin: '-80px 0px 0px 0px', threshold: 0 },
    )

    heroObserver.observe(hero)
    return () => heroObserver.disconnect()
  }, [])

  useEffect(() => {
    const sectionIds = ['about', 'projects', 'skills', 'experience', 'contact']
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)
        if (visibleSection) setActiveSection(visibleSection.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px' },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) sectionObserver.observe(section)
    })

    return () => sectionObserver.disconnect()
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
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="nav-group nav-group--left" aria-label="Primary navigation">
        {navGroups.left.map(renderLink)}
      </nav>

      <a className="nav-identity" href="#home" aria-label="Raneem Abuhasan, Software Engineer — back to home">
        <span>Raneem Abuhasan</span>
        <small>Software Engineer</small>
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
  return (
    <section className="hero" id="home">
      <img className="hero-olive-branch" src={oliveBranch} alt="" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-kicker">Software engineer · creative problem solver</p>
        <h1>Welcome <em className="hero-welcome-ar" lang="ar" dir="rtl">مرحباً</em></h1>
        <h2 className="hero-subtitle">I'm Raneem Abuhasan</h2>
        <div className="hero-actions">
          <a className="button button--primary" href="#projects">Explore my work <span aria-hidden="true">↓</span></a>
          <a className="button button--ghost" href="#contact">Let’s connect <ArrowIcon /></a>
        </div>
      </div>
      <div className="scroll-note" aria-hidden="true"><span /> Scroll to discover</div>
    </section>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <Section id="about" eyebrow="01 / About" title="Curious by nature. Intentional by design." className="about-section">
          <div className="about-grid">
            <p className="about-lead">I’m a software engineering student interested in the place where <em>technology, design, and people</em> meet.</p>
            <div className="about-copy">
              <p>I’m drawn to problems that ask for both analytical thinking and creative care. Whether I’m building an interface, exploring data, or collaborating with a team, I care about making technology clear, inclusive, and genuinely useful.</p>
              <p>My Arabic heritage shapes the way I see the world: through multiple perspectives, close attention to context, and a belief that the best solutions begin with listening.</p>
              <a className="inline-link" href="#experience">More about my journey <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </Section>

        <Section id="projects" eyebrow="02 / Selected work" title="Projects built with curiosity and care." className="projects-section">
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
          <p className="section-note">More experiments and works in progress live on <SocialLink href="https://github.com/">GitHub</SocialLink></p>
        </Section>

        <Section id="skills" eyebrow="03 / Toolkit" title="Technologies I use to bring ideas to life." className="skills-section">
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-group" key={group.title}>
                <span className="skill-index">0{index + 1}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <p className="learning-note"><span aria-hidden="true">✦</span> Currently exploring cloud architecture and accessible design systems.</p>
        </Section>

        <Section id="experience" eyebrow="04 / Experience" title="Learning through building, research, and collaboration." className="experience-section">
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={`${item.period}-${item.role}`}>
                <p className="timeline-period">{item.period}</p>
                <div className="timeline-title"><h3>{item.role}</h3><p>{item.organization}</p></div>
                <p className="timeline-description">{item.description}</p>
              </article>
            ))}
          </div>
          <a className="button button--outline" href="/resume.pdf">View my résumé <ArrowIcon /></a>
        </Section>

        <Section id="contact" eyebrow="05 / Contact" title="Let’s make something meaningful." className="contact-section">
          <div className="contact-grid">
            <div>
              <p className="contact-intro">I’m currently looking for software engineering internships and opportunities to learn alongside thoughtful teams.</p>
              <a className="email-link" href="mailto:hello@example.com">hello@example.com <ArrowIcon /></a>
            </div>
            <div className="contact-aside">
              <p>Find me elsewhere</p>
              <SocialLink href="https://github.com/">GitHub</SocialLink>
              <SocialLink href="https://www.linkedin.com/">LinkedIn</SocialLink>
            </div>
          </div>
        </Section>
      </main>
      <footer>
        <p>Designed & built with intention.</p>
        <p>© {new Date().getFullYear()} Raneem</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  )
}

export default App
