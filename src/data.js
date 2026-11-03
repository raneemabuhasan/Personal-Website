import weslLogo from './assets/images/resume/wesl-logo.png'
import umassBostonLogo from './assets/images/resume/umass-boston-logo.png'
import westonHighSchoolLogo from './assets/images/resume/weston-high-school-logo.png'
import syncLogo from './assets/images/projects/sync-logo.png'

export const projects = [
  {
    id: 'sync',
    title: 'Sync',
    logo: syncLogo,
    highlights: ['seven-member team', 'Gemini-powered companion', 'People’s Choice Award', '282 votes'],
    date: 'October 2026 — Present',
    description: 'An AI-powered iOS menstrual cycle companion with history-adaptive predictions and personalized wellness support.',
    details: 'Founded Sync and led a seven-member team to build an iOS app with SwiftUI and Firebase, featuring symptom tracking and phase-specific nutrition and movement suggestions. Led development of a Gemini-powered companion through Firebase AI Logic that uses logged cycle and symptom data, with guardrails against unsupported medical advice and fabricated history. Won the People’s Choice Award at the UMass Boston AI Symposium with 282 votes.',
    tags: ['SwiftUI', 'Firebase', 'Gemini', 'Firebase AI Logic'],
    type: 'Founder & Team Lead',
    links: { demo: null, code: null },
  },
  {
    id: 'sip-and-swoon',
    title: 'Sip & Swoon',
    highlights: ['eight-table database', '20 API endpoints'],
    date: 'January 2026 — Present',
    description: 'A café discovery and review platform that helps coffee lovers find their next favorite spot.',
    details: 'Built with React, Express, PostgreSQL, and Supabase Auth, with location-based café results powered by Google Places. Designed an eight-table database and 20 API endpoints for cafés, drinks, reviews, and user preferences, with caching to reduce repeated requests.',
    tags: ['React', 'Express', 'PostgreSQL', 'Supabase Auth'],
    type: 'Full-stack application',
    links: { demo: null, code: null },
  },
  {
    id: 'green-thumb',
    title: 'Green Thumb',
    highlights: ['team of six engineers and designers', 'randomized plant discovery feature'],
    date: 'April — May 2026',
    description: 'A sustainable shopping platform for discovering plants and eco-conscious products.',
    details: 'Led a team of six engineers and designers to build a responsive e-commerce platform around client requirements. Developed interactive interfaces with HTML, CSS, and JavaScript, including a randomized plant discovery feature.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    type: 'Team project · E-commerce',
    links: { demo: null, code: null },
  },
]

export const skillGroups = [
  { title: 'Languages', skills: ['Java','JavaScript', 'Python', 'C++', 'SQL', 'Racket'] },
  { title: 'Web & UI', skills: ['React', 'HTML', 'CSS', 'Node.js', 'REST APIs', 'WebGL', 'WebGPU'] },
  { title: 'Tools', skills: ['Git', 'GitHub', 'VS Code', 'Codex', 'Cursor'] },
]

export const resumeSections = [
  {
    category: 'Projects',
    entries: [
      {
        period: 'January 2026 — Present',
        role: 'Sip & Swoon',
        description: 'A platform for coffee lovers to discover cafés and share reviews.',
        details:  [' Developed a full-stack café discovery and review application with React, Express, PostgreSQL, and Supabase Auth.',
          'Integrated Google Places API to provide location-based café results while protecting API credentials and reducing repeated requests through caching.',
          'Designed an 8-table relational PostgreSQL tables database and connected it to 20 API endpoints supporting café and drink data, reviews, and user preferences.'
          
        ],
      },
      {
        period: 'April 2026 — May 2026',
        role: 'Green Thumb',
        description: 'Sustainable E-commerce Web Platform.',
        details:  [' Led an agile team of 6 engineers and designers to develop a responsive e-commerce platform for plants and sustainable products based on client requirements.',
          'Designed interactive UI elements using HTML/CSS and JavaScript, including responsive buttons and hover effects for a randomized plant discovery feature.'
          
        ],
      }
    ],
  },
  {
    category: 'Work Experience',
    entries: [
      {
        period: 'January 2025 — May 2025',
        role: 'Undergraduate Researcher',
        organization: 'Wind Energy Systems Lab',
        affiliation: 'Boston, MA',
        logo: weslLogo,
        logoInset: '13%',
        details: [
          'Collected and analyzed water-depth and turbine-location data across 14+ offshore wind farms, using Python, NumPy, SciPy, and Matplotlib.',
          'Developed water-depth maps and visualizations to compare turbine locations, ocean depth, and offshore site conditions',
          'Modeled offshore wind-farm layouts using PyWake and TopFarm to evaluate wake effects and improve annaul energy production (AEP).',
        ],
      },
    ],
  },
  {
    category: 'Education',
    entries: [
      {
        period: 'Expected Spring 2027',
        role: 'B.S. Computer Science',
        organization: 'University of Massachusetts Boston',
        affiliation: 'Boston, MA',
        logo: umassBostonLogo,
        logoInset: '12%',
        details: ['GPA: 3.6 / 4.0'],
      },
      {
        period: '2018 — 2022',
        role: 'High School Diploma',
        organization: 'Weston High School',
        affiliation: 'Weston, MA',
        logo: westonHighSchoolLogo,
        logoInset: '12%',
        details: [],
      },
    ],
  },
]

