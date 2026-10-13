import { useEffect, useState } from 'react'
import { ArrowIcon, ProjectCard, Section, SocialLink } from './components.jsx'
import { projects, resumeSections, skillGroups } from './data.js'
import oliveBranch from './assets/images/palestinian-olive-branch.png'
import aboutPortrait from './assets/images/about-portrait.jpg'

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
        <p className="hero-welcome">
          <span className="hero-welcome-en">Welcome</span>
          <span className="hero-welcome-ar" lang="ar" dir="rtl">مرحباً</span>
        </p>
        <h1>I'm Raneem Abuhasan</h1>
        <p className="hero-role">Software Engineer</p>
        <div className="hero-actions">
          <a className="button button--primary" href="#projects">Explore my work <span aria-hidden="true">↓</span></a>
          <a className="button button--ghost" href="#contact">Let’s connect <ArrowIcon /></a>
        </div>
      </div>
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
        >
          <div className="about-grid">
            <figure className="about-photo-block">
              <div className="about-photo-frame">
                <img className="about-photo" src={aboutPortrait} alt="Raneem Abuhasan, smiling and holding an iced coffee" />
              </div>
              <figcaption className="about-photo-caption">Coffee in hand, always.</figcaption>
            </figure>
            <p className="about-lead">I’m an undergraduate computer science student with a passion for 
              full-stack product development — building software with <em> purpose </em>, <em> personality </em>, and a place in <em> everday life</em>.  </p>
            <div className="about-copy">
            <p> My Arabic heritage has shaped my perspective, inspiring a creativity that stems from experiencing more than one cultural lens. </p>
              <p> From the Arabic welcome to the olive branch, I've woven little pieces of my heritage throughout this space. 
                Small details that reflect my roots and the identity I proudly carry into every space I enter. </p>
              <p> Through research, collaborative technical projects, and independent product development,
                I’ve gained different perspectives on how ideas take shape and come to life. </p>
              <a className="inline-link" href="#experience">More about my work <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </Section>


        <Section id="experience" sectionTitle="My Resume" className="experience-section">
          <div className="resume-timeline">
            {resumeSections.map((section) => (
              <section id={section.category === 'Projects' ? 'projects' : undefined} className="resume-group" key={section.category} aria-labelledby={`resume-${section.category.toLowerCase().replaceAll(' ', '-')}`}>
                <h2 id={`resume-${section.category.toLowerCase().replaceAll(' ', '-')}`} className="resume-group-title">{section.category}</h2>
                <div className="resume-list">
                  {section.entries.map((item) => (
                    <article className="timeline-item" key={`${item.organization}-${item.period}`}>
                      <div className="timeline-summary">
                        <h3>{item.role}</h3>
                        <p className="timeline-period">{item.period}</p>
                        
                     
                      </div>
                      <div className="timeline-marker" aria-hidden="true">
                        {item.logo && (
                          <span className="timeline-logo" style={{ '--logo-inset': item.logoInset ?? '12%' }}>
                            <img src={item.logo} alt="" />
                          </span>
                        )}
                      </div>
                      <div className="timeline-details">
                        {item.description && (
                          <p className="project-description">{item.description}</p>
                        )}
                        <h3>{item.organization}</h3>
                        <p className="timeline-affiliation">{item.affiliation}</p>
                        {item.details.length > 0 && (
                          <ul>
                            {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                          </ul>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Section>

        <Section id="Skills" sectionTitle="Technical Skills" className="skills-section">
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
    
          <div className="resume-actions">
            <a className="button button--outline" href="/resume.pdf">View my resume </a>
          </div>
        </Section>

        <Section id="contact" sectionTitle="Contact" className="contact-section">
          
          <div className="contact-grid">
            <dl className="contact-details">
              <div className="contact-detail">
                <dt>
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 6 9 7 9-7" />
                  </svg>
                  <span>Email</span>
                </dt>
                <dd><a href="mailto:raneem.abuhasan1@gmail.com">raneem.abuhasan1@gmail.com</a></dd>
              </div>
              <div className="contact-detail">
                <dt>
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>Location</span>
                </dt>
                <dd>Waltham, MA</dd>
              </div>
            </dl>
            <div className="contact-aside">
              <p>Find me elsewhere</p>
              <SocialLink href="https://github.com/raneemabuhasan">GitHub</SocialLink>
              <SocialLink href="https://www.linkedin.com/in/raneem-abuhasan246/">LinkedIn</SocialLink>
            </div>
          </div>
        </Section>
      </main>
      
    </>
  )
}

export default App
