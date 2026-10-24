/**
 * Research and provenance ledger.
 *
 * Every external fact surfaced in the portfolio should be traceable to an
 * entry here. The CV and its project images remain the primary source.
 * External links are contextual; photographs are not republished from them.
 */
export const SOURCES = [
  {
    id: 'cv-2015',
    title: 'GONÇALO LOPES ROCHA — CV / WORK EXPERIENCE',
    publisher: 'Supplied two-page PDF (A3_CV_WORK_EN_2015_1.pdf)',
    type: 'Primary document',
    year: '2015',
    url: null,
    accessed: '2026-10-24',
    claims: [
      'Employment history, education, qualifications, skills and contact details.',
      'Project titles, dates, locations, short descriptions and portfolio grouping.',
      'The CV describes a three-storey plywood-component house with a basement pool in the Highgate entry.',
    ],
    note: 'Project images used on this site are reproduced from this supplied document. Photographers are not identified in the PDF.',
  },
  {
    id: 'facit-highgate',
    title: 'Highgate House',
    publisher: 'FACIT Homes',
    type: 'Official practice website',
    url: 'https://www.facit-homes.com/highgatehouse',
    accessed: '2026-10-24',
    claims: [
      'The project is a house in North London.',
      'The design adds a third floor within the roof and a basement swimming pool.',
      'The house uses gable-end pitched roofs and digitally manufactured Facit Chassis components.',
    ],
    note: 'Used to contextualise the CV entry. The page does not identify individual architects.',
  },
  {
    id: 'facit-maryon',
    title: 'Build It Awards 2016 Shortlist',
    publisher: 'FACIT Homes',
    type: 'Official practice website',
    url: 'https://www.facit-homes.com/post/build-it-awards-2016-shortlist',
    accessed: '2026-10-24',
    claims: [
      'FACIT Homes records a project at Maryon Road for clients Terry and Mickey, shortlisted for a Build It Award in 2016.',
    ],
    note: 'Used only to corroborate the Maryon Road address and practice context; the CV date remains the date shown on this site.',
  },
  {
    id: 'amb-comporta',
    title: 'Casa na Comporta',
    publisher: 'AMB Arquitectos — Mafalda Batalha Arquitectos',
    type: 'Official practice website',
    url: 'https://amb-arquitectos.com/pt/text-0-2-5-13-casa-na-comporta',
    accessed: '2026-10-24',
    claims: [
      'The studio records Casa na Comporta with dates 2013–2015.',
      'The record names Mafalda Batalha as architect and lists Cláudia Henriques, Bruno Prazeres, Gonçalo Rocha and Maria Ferreira as collaborators.',
      'The project is located in Comporta.',
    ],
    note: 'The studio record names a “Gonçalo Rocha”. Its project context and dates align with the CV entry, but the public record alone cannot prove the identity of the collaborator.',
  },
  {
    id: 'amb-restelo',
    title: 'Casa no Restelo',
    publisher: 'AMB Arquitectos — Mafalda Batalha Arquitectos',
    type: 'Official practice website',
    url: 'https://amb-arquitectos.com/pt/text-0-2-5-12-casa-no-restelo',
    accessed: '2026-10-24',
    claims: [
      'The studio records Casa no Restelo in Lisbon with dates 2008–2015.',
      'The record names Mafalda Batalha as architect and lists Cláudia Henriques, Lucas Campos and Bruno Prazeres as collaborators.',
      'The page credits Gonçalo Rocha, Maria Costa and Rita Burmester for photography. It does not identify Gonçalo Lopes Rocha as an architectural collaborator.',
    ],
    note: 'The CV gives 2014. Both dates are retained in the project record and the discrepancy is flagged. No authorship or individual role is inferred.',
  },
  {
    id: 'amb-hotel',
    title: 'Hotel Memória',
    publisher: 'AMB Arquitectos — Mafalda Batalha Arquitectos',
    type: 'Official practice website',
    url: 'https://amb-arquitectos.com/pt/text-0-2-5-14-hotel-memoria',
    accessed: '2026-10-24',
    claims: [
      'The studio records Hotel Memória at Memória, Lisbon, with a start date of 2014.',
      'The record names Mafalda Batalha as architect and does not list Gonçalo Lopes Rocha among the named collaborators.',
    ],
    note: 'The CV lists the hotel under its Calçada da Memória, Belém location and gives 2014. The project is contextualised, not attributed.',
  },
  {
    id: 'rga-voz',
    title: 'Voice of the Sea',
    publisher: 'Ressano Garcia Arquitectos',
    type: 'Official practice website',
    url: 'https://ressanogarcia.com/project/a-voz-do-mar/',
    accessed: '2026-10-24',
    claims: [
      'The original temporary installation was designed by Pancho Guedes and commissioned by Pedro Ressano Garcia.',
      'The project was initially planned as a temporary intervention in 2010.',
      'Ressano Garcia Arquitectos was hired in 2015 to upgrade the intervention from temporary to permanent.',
    ],
    note: 'Essential attribution context. The site makes no claim that Gonçalo Lopes Rocha was the original author.',
  },
  {
    id: 'archdaily-voz',
    title: 'A voz do Mar Chamber of Sound Installation / Ressano Garcia',
    publisher: 'ArchDaily',
    type: 'Architecture publication',
    url: 'https://www.archdaily.com/980220/a-voz-do-mar-chamber-of-sound-installation-ressano-garcia',
    accessed: '2026-10-24',
    claims: [
      'ArchDaily credits lead architects Pancho Guedes and João Magala, with Pedro Ressano Garcia as architect/commissioner.',
      'The publication dates the permanent project to 2015 and identifies the location as Sagres, Portugal.',
    ],
    note: 'Corroborates the attribution recorded on the studio website.',
  },
  {
    id: 'rga-habitar',
    title: 'Inhabiting the ruins',
    publisher: 'Ressano Garcia Arquitectos',
    type: 'Official practice website',
    url: 'https://ressanogarcia.com/project/habitar-entre-ruinas/',
    accessed: '2026-10-24',
    claims: [
      'The project had a first phase inaugurated in 2007 and a second phase in 2014.',
    ],
    note: 'Used to contextualise the CV date of 2013 for Companhia das Culturas.',
  },
  {
    id: 'divisare-companhia',
    title: 'Companhia das Culturas — Monte de Cima',
    publisher: 'Divisare',
    type: 'Architecture publication',
    url: 'https://divisare.com/projects/327485-ressano-garcia-arquitectos-companhia-das-culturas-monte-de-cima',
    accessed: '2026-10-24',
    claims: [
      'The project is located at São Bartolomeu, Castro Marim, Portugal.',
      'The designer is Ressano Garcia Arquitectos and the project year is recorded as 2007.',
      'Existing ruined walls were retained and two courtyards are formed within the former construction.',
    ],
    note: 'Used to describe the project and flag the difference from the CV year of 2013. It does not name Gonçalo Lopes Rocha as a collaborator.',
  },
  {
    id: 'rga-about',
    title: 'About / Collaborators',
    publisher: 'Ressano Garcia Arquitectos',
    type: 'Official practice website',
    url: 'https://ressanogarcia.com/studio/about/',
    accessed: '2026-10-24',
    claims: [
      'The studio lists “Gonçalo Rocha” among its collaborators.',
    ],
    note: 'General practice context only. The page does not assign a date or specific project to that collaborator.',
  },
  {
    id: 'original-portfolio',
    title: 'Original Wix portfolio URL from the CV',
    publisher: 'glopesrocha.wix.com',
    type: 'Historical web record',
    url: 'http://glopesrocha.wix.com/arquitecto',
    accessed: '2026-10-24',
    claims: [
      'The URL listed in the CV returned HTTP 404 when checked on 24 October 2026.',
    ],
    note: 'It is recorded for provenance but is not presented as a working link.',
  },
  {
    id: 'arb',
    title: 'Architects Registration Board',
    publisher: 'ARB',
    type: 'Official register',
    url: 'https://www.arb.org.uk/',
    accessed: '2026-10-24',
    claims: [
      'The current public register can be checked at the Architects Registration Board website.',
    ],
    note: 'The registration number in the CV has not been checked against the current register. No current registration status is asserted on this site.',
  },
]

export const SOURCE_MAP = Object.fromEntries(SOURCES.map((source) => [source.id, source]))

export const CREDITS = {
  images:
    'All project images are low-resolution reproductions extracted from the two-page CV and portfolio PDF supplied for this project. Photographers are not identified in the source document. They are shown here as portfolio material provided by the architect, not as openly licensed images.',
  drawing:
    'The Lisbon skyline drawing is reproduced from the supplied CV dossier. Its author is not identified in the PDF.',
  map: 'Coastline outlines are derived from Natural Earth 1:110m country data (public domain), simplified for a schematic, not-to-scale field map.',
  type:
    'Newsreader and Archivo are used under the SIL Open Font License. Font files are self-hosted for reliable local use; license texts are included in /fonts/licenses.',
  code: 'Designed and built as a bespoke Vue 3 / Vite portfolio. No project photography was generated or substituted.',
}
