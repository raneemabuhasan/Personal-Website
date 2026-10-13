import weslLogo from './assets/images/resume/wesl-logo.png'
import umassBostonLogo from './assets/images/resume/umass-boston-logo.png'
import westonHighSchoolLogo from './assets/images/resume/weston-high-school-logo.png'

export const projects = [
  {
    
    title: 'Intelligent Study Companion',
    description: 'A focused learning platform that turns complex material into personalized study sessions and useful progress insights.',
    tags: ['React', 'Node.js', 'OpenAI API'],
    type: 'Full-stack application',
    links: { demo: '#', code: '#' },
  },
  {
   
    title: 'Community Resource Map',
    description: 'An accessible, location-aware experience helping people discover verified community services when they need them.',
    tags: ['JavaScript', 'Mapbox', 'Firebase'],
    type: 'Civic technology',
    links: { demo: '#', code: '#' },
  },
  {
   
    title: 'Research Data Explorer',
    description: 'An interactive visualization tool that makes large research datasets easier to explore, compare, and communicate.',
    tags: ['Python', 'React', 'D3.js'],
    type: 'Data visualization',
    links: { demo: '#', code: '#' },
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

