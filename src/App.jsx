import { useEffect, useState } from 'react'
import { ArrowIcon, ProjectCard, Section, SocialLink } from './components.jsx'
import { experience, projects, skillGroups } from './data.js'

const navItems = ['About', 'Projects', 'Skills', 'Experience', 'Contact']

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a className="logo" href="#home" aria-label="Go to home">R<span>.</span></a>
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
      <nav id="main-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-kicker">Software engineer · creative problem solver</p>
        <h1>Welcome <em className="hero-welcome-ar" lang="ar" dir="rtl">مرحباً</em></h1>
        <p className="hero-intro">
          I’m Raneem, a software engineering student who enjoys turning complex ideas into useful, human-centered products.
        </p>
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
