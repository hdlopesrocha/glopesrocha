import { PROJECTS } from './projects.js'

const projectsFor = (employer) =>
  PROJECTS.filter((project) => project.employer === employer).map((project) => project.id)

/**
 * Timeline record.
 *
 * Employment dates are copied from the CV and are not extended. The CV does
 * not explicitly call every early role an “employment”; each record below is
 * labelled according to the wording that is actually present in the document.
 */
export const EMPLOYMENTS = [
  {
    id: 'facit-homes',
    type: 'employment',
    role: 'Architect',
    organisation: 'FACIT-HOMES',
    location: 'London, United Kingdom',
    start: 'February 2015',
    end: 'December 2015',
    periodLabel: 'Feb — Dec 2015',
    sortYear: 2015,
    sortOrder: 50,
    summary: 'Housing, Residential.',
    responsibilities: ['Residential architecture', 'Housing'],
    relatedProjectIds: projectsFor('FACIT-HOMES'),
    externalUrl: 'https://www.facit-homes.com/',
    sourceId: 'cv-2015',
  },
  {
    id: 'amb-arquitectos',
    type: 'employment',
    role: 'Architect',
    organisation: 'Amb-arquitectos',
    location: 'Lisbon, Portugal',
    start: 'March 2013',
    end: 'October 2014',
    periodLabel: 'Mar 2013 — Oct 2014',
    sortYear: 2014,
    sortOrder: 45,
    summary:
      'Work in Preparation, Concept Design, Developed Design and Technical Design across housing, residential, offices, hotels and refurbishments.',
    responsibilities: [
      'Preparation',
      'Concept Design',
      'Developed Design',
      'Technical Design',
      'Housing, Residential, Offices, Hotels and Refurbishments',
    ],
    relatedProjectIds: projectsFor('Amb-arquitectos'),
    externalUrl: 'https://amb-arquitectos.com/pt/',
    sourceId: 'cv-2015',
  },
  {
    id: 'ressano-garcia-arquitectos',
    type: 'employment',
    role: 'Architect — practice',
    organisation: 'Ressano Garcia Arquitectos',
    location: 'Lisbon, Portugal',
    start: 'April 2012',
    end: 'February 2013',
    periodLabel: 'Apr 2012 — Feb 2013',
    sortYear: 2013,
    sortOrder: 40,
    summary: 'Project design, recorded as an architectural practice role.',
    responsibilities: ['Project design'],
    relatedProjectIds: projectsFor('Ressano Garcia Arquitectos'),
    externalUrl: 'https://ressanogarcia.com/',
    sourceId: 'cv-2015',
  },
  {
    id: 'andaluga',
    type: 'employment',
    role: 'Project design',
    organisation: 'Andaluga',
    location: 'Pinhal de Frades, Portugal',
    start: 'March 2011',
    end: 'August 2011',
    periodLabel: 'Mar — Aug 2011',
    sortYear: 2011,
    sortOrder: 30,
    summary: 'Project design, as recorded beneath the Andaluga entry.',
    responsibilities: ['Project design'],
    relatedProjectIds: [],
    externalUrl: 'https://www.andaluga.pt/',
    sourceId: 'cv-2015',
  },
  {
    id: 'phyd-arquitectura',
    type: 'employment',
    role: 'Assistant Architect',
    organisation: 'Phyd Arquitectura',
    location: 'Algés, Portugal',
    start: 'July 2007',
    end: 'December 2007',
    periodLabel: 'Jul — Dec 2007',
    sortYear: 2007,
    sortOrder: 20,
    summary: 'Assistant Architect.',
    responsibilities: ['Assistant Architect'],
    relatedProjectIds: [],
    externalUrl: 'https://www.phydarquitectura.com/',
    sourceId: 'cv-2015',
  },
]

export const EDUCATION = [
  {
    id: 'lusiada-masters',
    type: 'education',
    title: 'Master’s Degree, Architecture',
    organisation: 'Universidade Lusíada de Lisboa',
    location: 'Lisbon, Portugal',
    year: '2011',
    periodLabel: '2011',
    sortYear: 2011,
    sortOrder: 35,
    summary:
      'Master’s degree in Architecture completed in 2011 at Universidade Lusíada de Lisboa.',
    sourceId: 'cv-2015',
  },
]

export const QUALIFICATIONS = [
  {
    id: 'autodesk-revit',
    type: 'qualification',
    title: 'Autodesk Revit Architecture certificates',
    organisation: 'Autodesk',
    year: '2014',
    periodLabel: '2014',
    sortYear: 2014,
    sortOrder: 47,
    summary: 'Advanced and beginner certificates in Revit Architecture, both dated 2014 in the CV.',
    detail:
      'The CV records two Revit Architecture courses: advanced and beginner. Certificate numbers are omitted here by editorial choice.',
    credentialIds: ['revit-advanced', 'revit-beginner'],
    sourceId: 'cv-2015',
  },
  {
    id: 'low-cost-rehabilitation',
    type: 'qualification',
    title: 'Low-cost rehabilitation for small-scale works',
    organisation: null,
    year: '2012',
    periodLabel: '2012',
    sortYear: 2012,
    sortOrder: 38,
    summary: 'A qualification recorded in the CV under certificates and memberships.',
    sourceId: 'cv-2015',
  },
  {
    id: 'faa-yearbook',
    type: 'qualification',
    title: 'Publication — Faculdade de Arquitectura e Artes Yearbook',
    organisation: 'Faculdade de Arquitectura e Artes',
    year: '2008/09',
    periodLabel: '2008/09',
    sortYear: 2009,
    sortOrder: 25,
    summary: 'A project publication recorded in the 2008/09 faculty yearbook.',
    sourceId: 'cv-2015',
  },
  {
    id: 'arts-and-crafts',
    type: 'qualification',
    title: 'Formation and practice in arts and crafts',
    organisation: null,
    year: '1992–2003',
    periodLabel: '1992–2003',
    sortYear: 2003,
    sortOrder: 10,
    summary: 'Eleven years of training and practice in arts and crafts, as recorded in the CV.',
    sourceId: 'cv-2015',
  },
]

export const CREDENTIALS = [
  {
    id: 'arb',
    year: 'Undated',
    label: 'ARB — Architects Registration Board',
    detail: 'Registration No. 083810A, as stated in the 2015 CV.',
    note: 'Current registration status not verified. The number is a historical CV claim.',
    caute: true,
  },
  {
    id: 'revit-advanced',
    year: '2014',
    label: 'Autodesk Revit Architecture — advanced',
    detail: 'Advanced certificate. Certificate number omitted.',
    note: null,
    caute: false,
  },
  {
    id: 'revit-beginner',
    year: '2014',
    label: 'Autodesk Revit Architecture — beginner',
    detail: 'Beginner certificate. Certificate number omitted.',
    note: null,
    caute: false,
  },
  {
    id: 'low-cost',
    year: '2012',
    label: 'Low-cost rehabilitation for small-scale works',
    detail: 'Certificate or training qualification recorded in the CV.',
    note: null,
    caute: false,
  },
  {
    id: 'publication',
    year: '2008/09',
    label: 'Publication — Faculdade de Arquitectura e Artes Yearbook',
    detail: 'Project publication in the faculty yearbook.',
    note: null,
    caute: false,
  },
  {
    id: 'crafts',
    year: '1992–2003',
    label: 'Formation and practice in arts and crafts',
    detail: 'Long-running training and practice prior to architectural education.',
    note: null,
    caute: false,
  },
]

export const TIMELINE = [
  ...EMPLOYMENTS,
  ...EDUCATION,
  ...QUALIFICATIONS,
].sort((a, b) => b.sortYear - a.sortYear || b.sortOrder - a.sortOrder)

export const TIMELINE_MAP = Object.fromEntries(TIMELINE.map((entry) => [entry.id, entry]))

export const TIMELINE_RELATED_PROJECTS = (entry) => {
  if (!entry?.relatedProjectIds?.length) return []
  return PROJECTS.filter((project) => entry.relatedProjectIds.includes(project.id))
}
