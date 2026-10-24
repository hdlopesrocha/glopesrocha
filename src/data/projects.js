import { assetUrl } from '../utils/assets.js'

const IMAGE_CREDIT = 'Supplied 2015 CV portfolio PDF. Photographer not identified.'

const images = (id, leadAlt, detailAlt) => [
  {
    src: assetUrl(`/images/projects/${id}-1280.webp`),
    srcset: `${assetUrl(`/images/projects/${id}-640.webp`)} 640w, ${assetUrl(`/images/projects/${id}-1280.webp`)} 1280w`,
    sizes: '(min-width: 1100px) 55vw, (min-width: 700px) 70vw, 100vw',
    alt: leadAlt,
    caption: 'Portfolio image.',
    credit: IMAGE_CREDIT,
    sourceId: 'cv-2015',
  },
  {
    src: assetUrl(`/images/projects/${id}-detail-1000.webp`),
    srcset: `${assetUrl(`/images/projects/${id}-detail-560.webp`)} 560w, ${assetUrl(`/images/projects/${id}-detail-1000.webp`)} 1000w`,
    sizes: '(min-width: 1100px) 58vw, (min-width: 700px) 80vw, 100vw',
    alt: detailAlt,
    caption: 'Detail crop of the supplied portfolio image; not a separate view.',
    credit: IMAGE_CREDIT,
    sourceId: 'cv-2015',
  },
]

export const CATEGORIES = [
  { id: 'all', label: 'All projects', shortLabel: 'All' },
  { id: 'residential', label: 'Residential', shortLabel: 'Residential' },
  { id: 'commercial', label: 'Commercial & hospitality', shortLabel: 'Commercial' },
  { id: 'refurbishment', label: 'Refurbishment & rehabilitation', shortLabel: 'Refurbishment' },
  { id: 'conceptual', label: 'Conceptual & experimental', shortLabel: 'Conceptual' },
  { id: 'objects', label: 'Objects & other work', shortLabel: 'Objects' },
]

export const REGIONS = [
  {
    id: 'london',
    label: 'London',
    detail: 'United Kingdom',
    shortLabel: 'London',
    mapLabel: 'London',
    approximate: true,
  },
  {
    id: 'lisbon',
    label: 'Lisbon',
    detail: 'Lisbon and its urban centre',
    shortLabel: 'Lisbon',
    mapLabel: 'Lisbon',
    approximate: true,
  },
  {
    id: 'cascais',
    label: 'Cascais & Estoril',
    detail: 'Portuguese Atlantic coast',
    shortLabel: 'Cascais',
    mapLabel: 'Cascais',
    approximate: true,
  },
  {
    id: 'comporta-algarve',
    label: 'Comporta & the Algarve',
    detail: 'Carvalhal, Sagres, Castro Marim, Altura and Aldeia da Muda',
    shortLabel: 'Comporta / Algarve',
    mapLabel: 'Comporta & Algarve',
    approximate: true,
  },
  {
    id: 'fundao',
    label: 'Mata da Rainha & Fundão',
    detail: 'Inland Portugal',
    shortLabel: 'Fundão',
    mapLabel: 'Fundão',
    approximate: true,
  },
  {
    id: 'pacific',
    label: 'Pacific Ocean',
    detail: 'An offshore conceptual project',
    shortLabel: 'Pacific Ocean',
    mapLabel: 'Pacific',
    approximate: true,
    offMap: true,
  },
]

export const REGION_MAP = Object.fromEntries(REGIONS.map((region) => [region.id, region]))
export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((category) => [category.id, category]))

/**
 * PROJECT RECORD
 *
 * Fields are intentionally nullable where the CV does not give an answer.
 * `cvText` is a faithful transcription of the short portfolio caption.
 * `description` is editorial synthesis; `visualReading` describes only what
 * the supplied image shows. `researchNote` records external verification and
 * discrepancies. Nothing here assigns authorship without support.
 */
export const PROJECTS = [
  {
    id: 'house-in-highgate',
    title: 'House in Highgate',
    subtitle: 'A three-storey London house and a basement pool.',
    year: '2015',
    yearNumeric: 2015,
    location: 'Stanhope Road, London',
    shortLocation: 'London',
    regionId: 'london',
    category: 'residential',
    employer: 'FACIT-HOMES',
    role: 'Architect in residential work at FACIT-HOMES. The CV does not itemise a project-specific scope.',
    contextNote:
      'The CV groups this house under “Work with: FACIT-HOMES” and records the employment as February–December 2015.',
    status: 'Cross-referenced',
    featured: true,
    curationRank: 1,
    excerpt:
      'A double-gabled London house documented as a three-storey composition of plywood components, with a pool in the basement.',
    description: [
      'The CV places this house at Stanhope Road in London, dated 2015, within the FACIT-HOMES portfolio. It describes a three-storey house built from plywood components, with a swimming pool in the basement.',
      'FACIT Homes’ public project page for Highgate House records a house in North London with a third floor set within the roof and a basement pool. It describes a double-fronted elevation that pairs gable-end pitched roofs with a contemporary reinterpretation of bay windows.',
    ],
    cvText:
      'Three story house made with plywood components and a swimming pool in basement',
    visualReading:
      'The supplied image shows a pale, double-gabled house from the street: two steep roof forms, tall windows and a restrained palette of render and glass. This is a photographic reading of the public elevation, not verified construction information.',
    researchNote:
      'The public FACIT page corroborates the house type, the additional floor within the roof and the basement pool. It does not identify individual architects.',
    sourceIds: ['cv-2015', 'facit-highgate'],
    images: images(
      'highgate',
      'A pale, double-gabled London house with tall windows and a low boundary wall, seen from the street.',
      'A closer view of the House in Highgate’s street elevation, showing the paired gables, vertical windows and pale rendered facade.',
    ),
  },
  {
    id: 'rehabilitation-rua-da-fe',
    title: 'Rehabilitation of a Building',
    subtitle: 'Historic facade retention and a programme of flats and a studio.',
    year: '2014',
    yearNumeric: 2014,
    location: 'Rua da Fé, Lisbon',
    shortLocation: 'Lisbon',
    regionId: 'lisbon',
    category: 'refurbishment',
    employer: 'Amb-arquitectos',
    role: 'Project listed within the Amb-arquitectos portfolio. The CV does not specify an individual project role.',
    contextNote:
      'The entry falls within the CV period at Amb-arquitectos (March 2013–October 2014) and is grouped with the studio’s rehabilitation work.',
    status: 'CV record',
    featured: true,
    curationRank: 2,
    excerpt:
      'A historic-centre building with its facade preserved and reordered internally into three flats and one studio.',
    description: [
      'The CV records a building in a historic centre where the existing facade was preserved. The programme is described as three flats and one studio.',
      'No plans, section or construction narrative are included in the supplied dossier. The project is presented here through its urban premise — retaining a historic frontage while adapting the space behind it — and through the white study model that accompanies the entry.',
    ],
    cvText:
      'Building in a historic center, preserving facade. Three flats and one studio',
    visualReading:
      'The portfolio image is a white cutaway architectural model. It exposes stacked floor plates, stair flights and openings behind what appears to be a deep frontage. The model communicates the internal reorganisation, not the finished historic facade.',
    researchNote:
      'A public 2017–19 rehabilitation at Rua da Fé 31–35 by Pardal Monteiro Arquitectos is a separate project and is not conflated with this 2014 CV entry.',
    sourceIds: ['cv-2015'],
    images: images(
      'rua-da-fe',
      'A white cutaway architectural model of a narrow building, showing stacked floors, stairs and openings.',
      'Detail of the Rua da Fé study model, revealing the layered floor plates and stair circulation within the retained urban envelope.',
    ),
  },
  {
    id: 'holidays-house-carvalhal',
    title: 'Holidays House',
    subtitle: 'Sand-coloured concrete and wood, set into the Comporta landscape.',
    year: '2013',
    yearNumeric: 2013,
    location: 'Carvalhal, Comporta',
    shortLocation: 'Comporta',
    regionId: 'comporta-algarve',
    category: 'residential',
    employer: 'Amb-arquitectos',
    role: 'The studio’s public project record names “Gonçalo Rocha” among the collaborators. The CV does not itemise his scope.',
    contextNote:
      'The CV dates the project 2013 and places it within the Amb-arquitectos body of work. The corresponding studio record, Casa na Comporta, gives 2013–2015.',
    status: 'Cross-referenced',
    featured: true,
    curationRank: 3,
    excerpt:
      'A holiday house conceived as sand-coloured concrete and wood, integrated into the landscape around Carvalhal, Comporta.',
    description: [
      'The CV describes a holiday house built of sand-coloured concrete and wood, integrated into the landscape at Carvalhal, Comporta.',
      'The pivot from the landscape to the object is held in the supplied model: several dark pitched volumes sit on a pale platform, their spaces assembled as a small settlement rather than a single block.',
      'AMB Arquitectos publishes the project as Casa na Comporta. Its record dates the project 2013–2015 and lists Gonçalo Rocha among the collaborators. The supplied model and the studio’s gabled house forms are consistent with one another.',
    ],
    cvText:
      'House built of sand colour concrete and wood, integrated in the landscape',
    visualReading:
      'The supplied image is a physical site model, not a photograph of the completed house. A cluster of dark pitched roofs is arranged across a white base, with slender model trees emphasising the relationship to a wooded plot.',
    researchNote:
      'The public studio page corroborates the location, dates and a collaborator named “Gonçalo Rocha”. The public record alone does not prove the identity of that collaborator. This CV entry and the studio record appear to describe the same project; the CV year remains the date displayed.',
    sourceIds: ['cv-2015', 'amb-comporta'],
    images: images(
      'carvalhal',
      'A physical architectural model of several dark pitched volumes arranged around a pale landscape base, with thin model trees.',
      'Detail of the Carvalhal holiday house model, showing the cluster of dark pitched roofs and the landscape platform between them.',
    ),
  },
  {
    id: 'hotel-belem',
    title: 'Hotel',
    subtitle: 'A hotel in the historic centre of Belém.',
    year: '2014',
    yearNumeric: 2014,
    location: 'Calçada da Memória, Belém, Lisbon',
    shortLocation: 'Belém, Lisbon',
    regionId: 'lisbon',
    category: 'commercial',
    employer: 'Amb-arquitectos',
    role: 'Project listed within the Amb-arquitectos portfolio. The studio’s public record does not name Gonçalo Lopes Rocha among the listed collaborators.',
    contextNote:
      'The CV dates the hotel 2014 and locates it on Calçada da Memória, Belém. AMB Arquitectos publishes Hotel Memória at Memória, Lisbon, with a start date of 2014 and Mafalda Batalha as architect.',
    status: 'Cross-referenced',
    featured: true,
    curationRank: 4,
    excerpt:
      'A hotel in the historic centre of Belém, shown in the portfolio through its relationship to the surrounding street and church.',
    description: [
      'The CV documents a hotel in a historic centre on Calçada da Memória in Belém, dated 2014. The accompanying portfolio image places a new, dark-panelled building in a street shared with older masonry facades and the dome of a church.',
      'AMB Arquitectos’ public record for Hotel Memória gives the location as Memória, Lisbon and the start date as 2014. It names Mafalda Batalha as the architect and does not list Gonçalo Lopes Rocha among the named collaborators.',
    ],
    cvText: 'Hotel in a historic centre',
    visualReading:
      'The photograph is a streetscape. The new hotel volume — horizontal bands, dark panels and a pale lower storey — sits opposite older buildings, with the church dome holding the skyline. It is a record of urban adjacencies rather than a detailed architectural view.',
    researchNote:
      'The studio page supports the hotel’s identity and 2014 start date. It does not support an authorship claim for this portfolio’s subject. The project is included as documented professional context.',
    sourceIds: ['cv-2015', 'amb-hotel'],
    images: images(
      'hotel-belem',
      'A street view of a contemporary hotel with dark facade panels and a pale base, opposite older buildings and a church dome in Lisbon.',
      'Detail of the Hotel Memória streetscape, focusing on the new building’s dark facade panels and its position opposite the church.',
    ),
  },
  {
    id: 'pen-design-argentaria',
    title: 'Pen Design — Argentália',
    subtitle: 'A pen developed for collectors.',
    year: '2013',
    yearNumeric: 2013,
    location: 'Lisbon',
    shortLocation: 'Lisbon',
    regionId: 'lisbon',
    category: 'objects',
    employer: 'Ressano Garcia Arquitectos',
    role: 'Portfolio grouping only. The CV does not state a project-specific role or describe the design team.',
    contextNote:
      'The CV places this object within the group headed “Work with: Ressano Garcia Arquitectos”. The entry is dated 2013.',
    status: 'CV record',
    featured: true,
    curationRank: 5,
    excerpt:
      'Object design within the architectural portfolio: a pen developed for collectors, explored across its component parts.',
    description: [
      'The CV records the development of a pen for collectors in Lisbon, dated 2013. It sits at the smallest end of the portfolio’s scale, alongside houses, public interiors and landscape structures.',
      'The accompanying image is not a presentation photograph or a finished product shot. It shows the object as a set of separated components, emphasising construction and assembly over branding.',
    ],
    cvText: 'Development of a pen for collectors',
    visualReading:
      'A black pen is disassembled into distinct pieces across a white study surface. A folded white triangular form sits beside the components, suggesting a presentation or packaging study. No manufacturer or production information is visible.',
    researchNote:
      'No public project page was located. The entry remains a CV record; the object’s production status is not known and is not asserted.',
    sourceIds: ['cv-2015'],
    images: images(
      'pen-design',
      'A black pen disassembled into separate components on a white surface, with a folded white triangular form nearby.',
      'Detail of the Argentália pen study, showing the separated black components and the folded white presentation form.',
    ),
  },
  {
    id: 'pacific-new-ocean-prison',
    title: 'Pacific New Ocean Prison',
    subtitle: 'A conceptual prison designed on an oil platform.',
    year: '2013',
    yearNumeric: 2013,
    location: 'Pacific Ocean',
    shortLocation: 'Pacific Ocean',
    regionId: 'pacific',
    category: 'conceptual',
    employer: 'Ressano Garcia Arquitectos',
    role: 'Portfolio grouping only. The CV does not state the author, collaborators or the nature of the original brief.',
    contextNote:
      'The CV places this project within the group headed “Work with: Ressano Garcia Arquitectos”. It is explicitly presented here as a conceptual project, not a built facility.',
    status: 'Conceptual',
    featured: true,
    curationRank: 6,
    excerpt:
      'A speculative prison on an oil platform, investigated in the Pacific Ocean and presented here as a conceptual study.',
    description: [
      'The CV describes a project designed on an oil platform in the Pacific Ocean, dated 2013. It is a single, terse entry: no client, brief, site or construction claim accompanies it.',
      'The portfolio image turns the project into a spatial collage. A dense structural frame sits above water, inhabited by small figures and pierced by circular openings. The project is treated here as a conceptual exploration of infrastructure, enclosure and horizon — not as a confirmed proposal or facility.',
    ],
    cvText: 'Project designed in an oil platform.',
    visualReading:
      'The supplied image is an architectural collage or perspective. It combines an industrial platform structure, a large circular aperture, water and figures at an exaggerated scale. The scene is clearly representational rather than photographic.',
    researchNote:
      'No verified project page was found. A similarly titled student project by another designer exists online; no connection to this entry is asserted.',
    sourceIds: ['cv-2015'],
    images: images(
      'pacific-new-ocean-prison',
      'An architectural collage of a large structure on an oil platform above the water, with circular openings and small human figures.',
      'Detail of the Pacific New Ocean Prison collage, showing the platform structure, circular aperture and figures against the ocean.',
    ),
  },
  {
    id: 'house-in-south-woodford',
    title: 'House in South Woodford',
    subtitle: 'A London house on Cleveland Road.',
    year: '2015',
    yearNumeric: 2015,
    location: 'Cleveland Road, London',
    shortLocation: 'London',
    regionId: 'london',
    category: 'residential',
    employer: 'FACIT-HOMES',
    role: 'Architect in residential work at FACIT-HOMES. No project-specific scope is stated.',
    contextNote: 'The CV groups the entry under “Work with: FACIT-HOMES” and dates it 2015.',
    status: 'CV record',
    featured: false,
    curationRank: 7,
    excerpt:
      'A timber-clad London house documented at Cleveland Road in South Woodford, 2015.',
    description: [
      'The CV documents a house at Cleveland Road, South Woodford, London, dated 2015. No project description, status or individual role is given in the supplied dossier.',
      'The portfolio image is the primary visual record. It shows a timber-clad house with a tall, asymmetrical composition and large windows. Any reading of the plan or construction must wait for further documentation.',
    ],
    cvText: null,
    visualReading:
      'A two-storey house clad in narrow timber boards, with a tall central entrance recess and large glazed openings. The photograph is taken close to the elevation, so the wider street and garden context remain outside the frame.',
    researchNote: null,
    sourceIds: ['cv-2015'],
    images: images(
      'south-woodford',
      'A two-storey timber-clad London house with a tall entrance recess and large windows.',
      'Detail of the South Woodford house elevation, showing the vertical timber cladding and window surrounds.',
    ),
  },
  {
    id: 'house-in-woolwich',
    title: 'House in Woolwich',
    subtitle: 'Kitchen, plant room and staircase drawings for a London house.',
    year: '2015',
    yearNumeric: 2015,
    location: 'Maryon Road, London',
    shortLocation: 'London',
    regionId: 'london',
    category: 'residential',
    employer: 'FACIT-HOMES',
    role: 'Architectural drawings package covering the kitchen, plant room and staircase, as listed in the CV.',
    contextNote: 'The CV groups the entry under “Work with: FACIT-HOMES”.',
    status: 'Cross-referenced',
    featured: false,
    curationRank: 8,
    excerpt:
      'A drawings package for a kitchen, plant room and staircase at a London house on Maryon Road.',
    description: [
      'The CV documents work on a kitchen, plant room and staircase drawings package at Maryon Road, Woolwich, dated 2015.',
      'FACIT Homes’ public journal also records a Maryon Road project, shortlisted for a Build It Award in 2016. That note corroborates the practice and address context; it does not describe the drawings package. The CV date remains the date displayed here.',
    ],
    cvText: 'Kitchen, Plant Room and staircase Drawings package',
    visualReading:
      'The portfolio image is an interior detail: dark timber panelling forms a deep opening, with a window framing trees and daylight. The photograph documents an atmosphere and finish rather than the drawings named in the CV.',
    researchNote:
      'The public reference does not verify the completion date or the specific drawing scope. It is used only as contextual corroboration.',
    sourceIds: ['cv-2015', 'facit-maryon'],
    images: images(
      'woolwich',
      'A dark timber-lined interior with a window framing green trees and daylight.',
      'Detail of the Woolwich interior, focusing on the dark timber opening and the trees visible beyond the window.',
    ),
  },
  {
    id: 'house-in-chesham',
    title: 'House in Chesham',
    subtitle: 'Site works and facade maintenance.',
    year: '2015',
    yearNumeric: 2015,
    location: 'Chesham Road, London',
    shortLocation: 'London',
    regionId: 'london',
    category: 'residential',
    employer: 'FACIT-HOMES',
    role: 'Scope documented as site works and facade maintenance; the CV does not detail the individual role.',
    contextNote: 'The CV groups the entry under “Work with: FACIT-HOMES”.',
    status: 'CV record',
    featured: false,
    curationRank: 9,
    excerpt:
      'Site works and facade maintenance at a house on Chesham Road, London, documented in 2015.',
    description: [
      'The CV records site works and facade maintenance at a house on Chesham Road, London, dated 2015.',
      'The supplied image places the house beneath mature trees. It shows a low, horizontal roof, dark timber cladding and a deep terrace. The image is a visual record of the setting; the extent of the site works is not described in the source.',
    ],
    cvText: 'Site works - Facade maintenance',
    visualReading:
      'A single-storey timber and glass building sits under a canopy of trees, with a paved terrace in the foreground. The image is taken in low, warm light and stresses the relationship between the facade and the garden.',
    researchNote:
      'No matching public project page was located for a Chesham Road, London project dated 2015. FACIT’s separately named Chesham Lodge is in Hertfordshire and dated 2010; it is not conflated with this entry.',
    sourceIds: ['cv-2015'],
    images: images(
      'chesham',
      'A low timber and glass house beneath mature trees, with a paved terrace in the foreground.',
      'Detail of the Chesham house facade and terrace, showing the timber cladding, glazing and canopy of trees.',
    ),
  },
  {
    id: 'house-restelo',
    title: 'House',
    subtitle: 'A house in Restelo, looking toward the Tagus.',
    year: '2014',
    yearNumeric: 2014,
    location: 'Restelo, Lisbon',
    shortLocation: 'Restelo, Lisbon',
    regionId: 'lisbon',
    category: 'residential',
    employer: 'Amb-arquitectos',
    role: 'Project listed within the Amb-arquitectos portfolio. The studio record does not name Gonçalo Lopes Rocha among the architectural collaborators.',
    contextNote:
      'The CV describes a house in a prime district of the city with views to the Tagus River and the Monastery of Jerónimos, dated 2014.',
    yearNote:
      'The CV gives 2014. AMB Arquitectos’ public record dates Casa no Restelo 2008–2015. The CV date is retained as the portfolio date; the discrepancy is recorded.',
    status: 'Discrepancy noted',
    featured: false,
    curationRank: 10,
    excerpt:
      'A house in a prime Lisbon district, documented through its relationship to the Tagus and the Jerónimos Monastery.',
    description: [
      'The CV describes a house in a prime district of Lisbon, with a view to the Tagus River and the Monastery of Jerónimos. It dates the entry 2014.',
      'The supplied photograph shows a white, horizontally composed house behind a rust-coloured timber fence. The building steps around a mature tree, with a large glazed corner opening toward the street. The view toward the river is described in the CV, not visible in this image.',
      'AMB Arquitectos publishes Casa no Restelo with dates 2008–2015 and Mafalda Batalha as architect. The page does not list Gonçalo Lopes Rocha among the architectural collaborators, though it credits a “Gonçalo Rocha” for photography.',
    ],
    cvText:
      'Built in a prime district of the city, with the view to Tagus river and the Monastery of Jerónimos',
    visualReading:
      'A white cubic house is partially screened by a rust-toned timber fence and a pine tree. The composition is horizontal, with a deep glazed opening at the corner and a setback upper volume.',
    researchNote:
      'The public studio record conflicts with the CV on project dates and does not resolve individual roles. Both dates are shown. No authorship claim is made.',
    sourceIds: ['cv-2015', 'amb-restelo'],
    images: images(
      'restelo',
      'A white modern house behind a rust-toned timber fence and a pine tree in Restelo, Lisbon.',
      'Detail of the Restelo house, showing the white volumes, glazed corner and timber screen behind the tree.',
    ),
  },
  {
    id: 'terraced-house-altura',
    title: 'Terrace House',
    subtitle: 'A terrace house facing the Atlantic.',
    year: '2012',
    yearNumeric: 2012,
    location: 'Altura, Algarve',
    shortLocation: 'Algarve',
    regionId: 'comporta-algarve',
    category: 'residential',
    employer: 'Ressano Garcia Arquitectos',
    role: 'Portfolio grouping only. The CV does not state an individual project role.',
    contextNote:
      'The CV places the project within the group headed “Work with: Ressano Garcia Arquitectos”.',
    status: 'CV record',
    featured: false,
    curationRank: 11,
    excerpt:
      'A terrace house in Altura, Algarve, described by the CV as having a view to the Atlantic Ocean.',
    description: [
      'The CV records a terrace house at Altura in the Algarve, dated 2012, with a view toward the Atlantic Ocean.',
      'The supplied portfolio image is a white study model. It shows a courtyard cut into a compact block, with an internal room open to the sky. The model concentrates on privacy and the section rather than the ocean view described in the text.',
    ],
    cvText: 'The terrace house with a view to The Atlantic Ocean',
    visualReading:
      'A white card model photographed from above. A deep courtyard is carved from the centre of the plan, with volumes arranged around it. The model’s edges are simple and unrendered, emphasising spatial organisation.',
    researchNote: null,
    sourceIds: ['cv-2015'],
    images: images(
      'altura',
      'A white architectural model with a central courtyard carved into a compact block, photographed from above.',
      'Detail of the Altura terrace house model, showing the central outdoor room and the volumes enclosing it.',
    ),
  },
  {
    id: 'lawyers-office-ava',
    title: 'Lawyers Office — AVA',
    subtitle: 'A space for a law office in central Lisbon.',
    year: '2014',
    yearNumeric: 2014,
    location: 'Rua Barata Salgueiro, Lisbon',
    shortLocation: 'Lisbon',
    regionId: 'lisbon',
    category: 'commercial',
    employer: 'Amb-arquitectos',
    role: 'Project listed within the CV’s Amb-arquitectos period. No individual role is stated.',
    contextNote:
      'The CV dates the project 2014, during the Amb-arquitectos period, and describes it as a “Space for law office”.',
    status: 'CV record',
    featured: false,
    curationRank: 12,
    excerpt:
      'A fit-out for a law office on Rua Barata Salgueiro, characterised by concentration and linear light.',
    description: [
      'The CV records a space for a law office on Rua Barata Salgueiro in Lisbon, dated 2014. It provides no further programme, area or role information.',
      'The supplied image shows a long meeting room defined by a dark table, pale shelving and continuous lines of light. The composition is restrained and corporate, with a limited material palette.',
    ],
    cvText: 'Space for law office',
    visualReading:
      'A bright, deep meeting room. Black chairs and a long dark table sit beneath white ceiling strips. Full-height shelving lines one wall, and a glazed partition draws the eye toward the back of the space.',
    researchNote: null,
    sourceIds: ['cv-2015'],
    images: images(
      'lawyers-office-ava',
      'A bright law office interior with a long dark meeting table, black chairs, white shelves and linear ceiling lights.',
      'Detail of the AVA lawyers office, showing the meeting table, black chairs and linear lighting above.',
    ),
  },
  {
    id: 'office-capital-criativo',
    title: 'Office — Capital Criativo',
    subtitle: 'An expansion of an existing office in Lisbon.',
    year: '2013',
    yearNumeric: 2013,
    location: 'Avenida Alexandre Herculano, Lisbon',
    shortLocation: 'Lisbon',
    regionId: 'lisbon',
    category: 'commercial',
    employer: 'Amb-arquitectos',
    role: 'Project listed within the Amb-arquitectos portfolio. No individual role is stated.',
    contextNote:
      'The CV dates the project 2013, during the Amb-arquitectos period, and describes it as the expansion of an existing office.',
    status: 'CV record',
    featured: false,
    curationRank: 13,
    excerpt:
      'An office expansion on Avenida Alexandre Herculano, documented through its workspaces and long interior axis.',
    description: [
      'The CV records an expansion of an existing office on Avenida Alexandre Herculano in Lisbon, dated 2013. The entry gives no project area, client detail or individual role.',
      'The photograph looks along a working office rather than a staged reception. Desks, monitors and a long pale circulation route define the image, with light collected at the far end.',
    ],
    cvText: 'Expansion of existing office',
    visualReading:
      'A pale, narrow office interior with desks and monitors on the left and a long corridor edge on the right. Ceiling lights remain switched on, and daylight enters from the far end.',
    researchNote:
      'A later office conversion at the same avenue, published by another practice, is not identified with this CV entry.',
    sourceIds: ['cv-2015'],
    images: images(
      'capital-criativo',
      'A pale Lisbon office interior with desks, monitors and a long corridor leading toward daylight.',
      'Detail of the Capital Criativo office, focusing on the workstations and the deep interior perspective.',
    ),
  },
  {
    id: 'refurbishment-flat-avenida-republica',
    title: 'Refurbishment of a Flat',
    subtitle: 'An apartment refurbishment on Avenida da República.',
    year: '2014',
    yearNumeric: 2014,
    location: 'Avenida da República, Lisbon',
    shortLocation: 'Lisbon',
    regionId: 'lisbon',
    category: 'refurbishment',
    employer: 'Amb-arquitectos',
    role: 'Project listed within the Amb-arquitectos portfolio. No individual role is stated.',
    contextNote:
      'The CV dates the project 2014, during the Amb-arquitectos period.',
    status: 'CV record',
    featured: false,
    curationRank: 14,
    excerpt:
      'An apartment refurbishment in Lisbon, recorded through warm timber surfaces and a sequence of connected rooms.',
    description: [
      'The CV records the refurbishment of a flat on Avenida da República in Lisbon, dated 2014. It does not record the plan or scope of the refurbishment.',
      'The supplied interior photograph shows a warm, continuous floor of timber boards and a low white kitchen. The image is an inhabited view: light, joinery and circulation matter more than a display of finishes.',
    ],
    cvText: null,
    visualReading:
      'A bright flat interior with a continuous timber floor. A low white kitchen island occupies the foreground, and a line of joinery leads toward a window and a warmer rear room.',
    researchNote: null,
    sourceIds: ['cv-2015'],
    images: images(
      'flat-avenida-republica',
      'A warm refurbished flat interior with timber floors, a low white kitchen and a bright opening toward another room.',
      'Detail of the Avenida da República flat, showing the timber floor, kitchen counter and storage joinery.',
    ),
  },
  {
    id: 'refurbishment-house-sao-pedro-estoril',
    title: 'Refurbishment of a House',
    subtitle: 'A house refurbishment in São Pedro do Estoril.',
    year: '2013',
    yearNumeric: 2013,
    location: 'São Pedro do Estoril, Cascais',
    shortLocation: 'Cascais',
    regionId: 'cascais',
    category: 'refurbishment',
    employer: 'Amb-arquitectos',
    role: 'Project listed within the Amb-arquitectos portfolio. No individual role is stated.',
    contextNote:
      'The CV dates the project 2013, during the Amb-arquitectos period.',
    status: 'CV record',
    featured: false,
    curationRank: 15,
    excerpt:
      'A 2013 house refurbishment in São Pedro do Estoril, shown through the threshold between living space and stair.',
    description: [
      'The CV records the refurbishment of a house at São Pedro do Estoril, Cascais, dated 2013. No further project description is supplied.',
      'The accompanying image focuses on an interior threshold: a low, warm room opens toward a staircase, with a library wall and a single armchair defining the space.',
    ],
    cvText: null,
    visualReading:
      'A room with a pale timber floor, a white ceiling and a wall of bookshelves. An armchair sits near the centre, and an opening on the right reveals a staircase rising through the house.',
    researchNote: null,
    sourceIds: ['cv-2015'],
    images: images(
      'sao-pedro-estoril',
      'An interior with timber flooring, white bookshelves, an armchair and a stair rising on the right.',
      'Detail of the São Pedro do Estoril refurbishment, focusing on the library wall, armchair and stair opening.',
    ),
  },
  {
    id: 'voz-do-mar',
    title: 'Voz do Mar',
    subtitle: 'A labyrinth and sound chamber on the Sagres promontory.',
    year: '2012',
    yearNumeric: 2012,
    location: 'Sagres promontory, Algarve',
    shortLocation: 'Sagres',
    regionId: 'comporta-algarve',
    category: 'conceptual',
    employer: 'Ressano Garcia Arquitectos',
    role: 'The CV does not state Gonçalo Lopes Rocha’s specific role. No authorship claim is made.',
    contextNote:
      'The project is listed in the CV’s portfolio and associated with the Ressano Garcia Arquitectos group. Its public record credits Pancho Guedes with the original installation and Ressano Garcia Arquitectos with the later permanent rehabilitation.',
    status: 'Attribution note',
    attributionNote:
      'Original installation: Pancho Guedes, with João Magala, commissioned by Pedro Ressano Garcia (2010). Permanent rehabilitation: Ressano Garcia Arquitectos (2015). The CV lists this project with a 2012 date and places it in the architect’s portfolio, but does not claim original authorship. Gonçalo Lopes Rocha is not presented here as the author of Voz do Mar.',
    featured: false,
    curationRank: 16,
    excerpt:
      'A sound chamber on the Sagres coast, publicly credited to Pancho Guedes, with later work by Ressano Garcia Arquitectos.',
    description: [
      'The CV describes a labyrinth where the inner chamber works as a resonance box, with sound activated by the ocean waves. It locates the project on the Sagres promontory and dates it 2012.',
      'The project requires careful attribution. Ressano Garcia Arquitectos and ArchDaily record the original temporary installation as the work of architect Pancho Guedes, commissioned by Pedro Ressano Garcia for 2010. Ressano Garcia Arquitectos was subsequently commissioned in 2015 to convert the intervention into a permanent structure.',
      'The CV includes Voz do Mar in this architect’s 2015 work portfolio. The precise contribution made by Gonçalo Lopes Rocha is not documented in that source, so the site records the professional context without assigning authorship.',
    ],
    cvText:
      'A labyrinth where the inner chamber works as a resonance box. The sound is activated by the ocean waves',
    visualReading:
      'The image shows a low circular stone structure on a rocky plateau. Its stepped wall follows the topography, and the Atlantic horizon sits beyond. The photograph documents the completed structure and its exposed landscape setting.',
    researchNote:
      'Public sources establish the original designer and the later rehabilitation architect. They do not name Gonçalo Lopes Rocha on the project. The CV date and portfolio association are retained while authorship is explicitly excluded.',
    sourceIds: ['cv-2015', 'rga-voz', 'archdaily-voz'],
    images: images(
      'voz-do-mar',
      'A low circular stone chamber in a rocky coastal landscape under a clear sky at Sagres.',
      'Detail of the Voz do Mar stone form on the Sagres promontory, showing the circular wall meeting the rocky ground.',
    ),
  },
  {
    id: 'companhia-das-culturas',
    title: 'Companhia das Culturas',
    subtitle: 'Ruins transformed for tourism and an artist’s residency.',
    year: '2013',
    yearNumeric: 2013,
    location: 'Castro Marim, Algarve',
    shortLocation: 'Algarve',
    regionId: 'comporta-algarve',
    category: 'commercial',
    employer: 'Ressano Garcia Arquitectos',
    role: 'Project listed within the CV’s Ressano Garcia Arquitectos group. No individual role is stated.',
    contextNote:
      'The CV describes ruins transformed for tourism and artist residency around two new courtyards carved inside previous constructions. It dates the project 2013.',
    yearNote:
      'The CV gives 2013. Public project records give a 2007 project year, with a first phase inaugurated in 2007 and a second in 2014. The CV date is retained; the discrepancy is recorded.',
    status: 'Discrepancy noted',
    featured: false,
    curationRank: 17,
    excerpt:
      'Rural ruins reworked as a place for tourism and artists, organised around two new courtyards.',
    description: [
      'The CV describes ruins transformed for tourism and an artist’s residency, organised around two new courtyards carved inside the previous constructions. It dates the project 2013.',
      'Divisare records the project as Companhia das Culturas — Monte de Cima, in São Bartolomeu, Castro Marim, with Ressano Garcia Arquitectos as designer and a project year of 2007. The studio records a first phase inaugurated in 2007 and a second phase in 2014.',
      'The supplied image is quiet and internal: a whitewashed room with a chair, a bowl and a doorway opening onto a blue-green surface. It gives little away about the larger plan, but holds the material atmosphere of the converted agricultural buildings.',
    ],
    cvText:
      'Ruins were transformed to be used by tourism and artist´s residency, around two new courtyards carved inside previous constructions.',
    visualReading:
      'A spare white room with a timber chair and a dark bowl on a stone floor. A plain rectangular opening reveals a turquoise surface and pale walls. The image is made by the contrast between rough stone, whitewash and a single saturated colour.',
    researchNote:
      'The public record dates the project earlier than the CV and lists collaborators that do not include Gonçalo Lopes Rocha. The project is presented as professional context, not as his authored work.',
    sourceIds: ['cv-2015', 'divisare-companhia', 'rga-habitar'],
    images: images(
      'companhia-das-culturas',
      'A whitewashed room with a wooden chair, a dark bowl and a doorway opening to a turquoise surface.',
      'Detail of Companhia das Culturas, focusing on the whitewashed walls, simple chair and turquoise opening.',
    ),
  },
  {
    id: 'competition-aldeia-da-muda',
    title: 'Competition — Aldeia da Muda',
    subtitle: 'A proposal for an ecological village in Comporta.',
    year: '2012',
    yearNumeric: 2012,
    location: 'Aldeia da Muda, Comporta',
    shortLocation: 'Comporta',
    regionId: 'comporta-algarve',
    category: 'conceptual',
    employer: 'Ressano Garcia Arquitectos',
    role: 'Competition entry listed in the portfolio. The CV does not state the design team or individual contribution.',
    contextNote:
      'The CV describes the entry as an allotment for an ecological village and places it in the group headed “Work with: Ressano Garcia Arquitectos”.',
    status: 'Competition entry',
    featured: false,
    curationRank: 18,
    excerpt:
      'A competition proposal for an ecological village at Aldeia da Muda, Comporta, presented as a landscape-led site strategy.',
    description: [
      'The CV records a competition entry for Aldeia da Muda, Comporta, described as an allotment for an ecological village. It dates the entry 2012.',
      'The supplied image is a composite landscape drawing. Trees, faint site structures and a fragment of paving appear over a washed ground. It is not a conventional rendered view; its emphasis falls on the site, the canopy and the lines of occupation.',
      'No verified competition result or detailed brief was located. The entry is presented as a proposal, not a built scheme.',
    ],
    cvText: 'Allotment for an ecological village',
    visualReading:
      'A layered image of umbrella pines, scrub, faint ground markings and fragments of path or structure. A group of figures and a small building edge suggest scale. The drawing works more as a landscape atmosphere than a precise site plan.',
    researchNote:
      'Later and unrelated Aldeia da Muda development projects exist publicly. No link to this 2012 competition entry is asserted.',
    sourceIds: ['cv-2015'],
    images: images(
      'aldeia-da-muda',
      'A layered landscape drawing of pine trees, scrub and faint ground structures for Aldeia da Muda, Comporta.',
      'Detail of the Aldeia da Muda competition drawing, showing the pine canopy, ground and fragmentary traces of occupation.',
    ),
  },
  {
    id: 'water-tank-mata-da-rainha',
    title: 'Water Tank',
    subtitle: 'A water tank and irrigation system for a farm.',
    year: '2014',
    yearNumeric: 2014,
    location: 'Mata da Rainha, Fundão',
    shortLocation: 'Fundão',
    regionId: 'fundao',
    category: 'objects',
    employer: 'GR Architecture (independent work)',
    role: 'The portfolio labels this “Independent work: GR Architecture”. No individual role or authorship statement accompanies it.',
    contextNote:
      'The CV groups the water tank and irrigation system under “Independent work: GR Architecture”.',
    status: 'CV record',
    featured: false,
    curationRank: 19,
    excerpt:
      'A concrete water tank and irrigation system for a farm, set among cork oaks at Mata da Rainha.',
    description: [
      'The CV records a water tank and irrigation system for a farm at Mata da Rainha, Fundão, dated 2014. It is one of two rural works grouped as independent work with GR Architecture.',
      'The supplied image shows a long, low concrete structure occupying a clearing beneath mature cork oaks. A metal outlet at one end and a dark reflecting surface identify it as water infrastructure rather than a building.',
    ],
    cvText: 'Water tank and irrigation system for a farm',
    visualReading:
      'A shallow rectangular concrete tank sits in reddish soil under a canopy of cork oaks. A metal spout and ladder-like detail are visible at its far end. The landscape is more present than the object itself.',
    researchNote: null,
    sourceIds: ['cv-2015'],
    images: images(
      'water-tank',
      'A low rectangular concrete water tank in a clearing beneath cork oaks at Mata da Rainha.',
      'Detail of the farm water tank, showing the concrete edge, dark water and metal outlet in the trees.',
    ),
  },
  {
    id: 'funeral-stone-mata-da-rainha',
    title: 'Funeral Stone',
    subtitle: 'A tombstone made from a granite block.',
    year: '2013',
    yearNumeric: 2013,
    location: 'Mata da Rainha, Fundão',
    shortLocation: 'Fundão',
    regionId: 'fundao',
    category: 'objects',
    employer: 'GR Architecture (independent work)',
    role: 'The portfolio labels this “Independent work: GR Architecture”. No individual role or authorship statement accompanies it.',
    contextNote:
      'The CV groups the funeral stone under “Independent work: GR Architecture”.',
    status: 'CV record',
    featured: false,
    curationRank: 20,
    excerpt:
      'A tombstone made from a granite block, documented at Mata da Rainha in 2013.',
    description: [
      'The CV records a tombstone made from a granite block at Mata da Rainha, Fundão, dated 2013. It is the second of two rural and object works grouped under GR Architecture.',
      'The supplied image is a close, flat-on view of the stone. The coarse speckled granite and the deep cross-shaped joints are the entire subject; scale and setting are deliberately withheld.',
    ],
    cvText: 'Tombstone made of granite block',
    visualReading:
      'A buff-toned granite surface with dark mineral flecks, divided by deep cross-shaped joints. A recessed rectangular element is set into one quadrant. The image reads almost as a material study.',
    researchNote: null,
    sourceIds: ['cv-2015'],
    images: images(
      'funeral-stone',
      'A close view of a speckled granite tombstone divided by a deep cross-shaped joint.',
      'Detail of the granite funeral stone, showing the coarse mineral texture and recessed rectangular element.',
    ),
  },
  {
    id: 'maquettes-miniatures-models',
    title: 'Maquettes, Miniatures and Models',
    subtitle: 'An exhibition of physical models at Megarim Space, Alvalade.',
    year: '2012',
    yearNumeric: 2012,
    location: 'Megarim Space, Alvalade, Lisbon',
    shortLocation: 'Lisbon',
    regionId: 'lisbon',
    category: 'objects',
    employer: 'Ressano Garcia Arquitectos',
    role: 'Exhibition record only. The CV does not state curatorship, authorship or individual contribution.',
    contextNote:
      'The CV places the exhibition within the group headed “Work with: Ressano Garcia Arquitectos”.',
    status: 'CV record',
    featured: false,
    curationRank: 21,
    excerpt:
      'An exhibition of architectural models, miniatures and small works at Megarim Space in Alvalade.',
    description: [
      'The CV records an exhibition of models at Megarim Space, Alvalade, Lisbon, dated 2012. It gives no curator, exhibition design or individual authorship.',
      'The supplied photograph shows a dark gallery with models resting on plinths under cool, uneven light. The exhibition itself is the subject; it is not presented here as a single authored building or object.',
    ],
    cvText: 'Exhibition of models at Megarim Space',
    visualReading:
      'A dim exhibition room with violet-toned light. White and black architectural models sit on simple plinths, with visitors or shadows at the edge of the frame. The photograph documents atmosphere and display more than individual exhibits.',
    researchNote: null,
    sourceIds: ['cv-2015'],
    images: images(
      'maquettes-megarim',
      'An exhibition room with architectural models on plinths under dim violet-toned light.',
      'Detail of the Maquettes, Miniatures and Models exhibition, showing models on plinths in low light.',
    ),
  },
]

export const PROJECT_MAP = Object.fromEntries(PROJECTS.map((project) => [project.id, project]))

export const CURATED_PROJECTS = [...PROJECTS].sort((a, b) => a.curationRank - b.curationRank)

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured).sort(
  (a, b) => a.curationRank - b.curationRank,
)

export function getProject(id) {
  return PROJECT_MAP[id] ?? null
}

export function getAdjacentProjects(id) {
  const index = CURATED_PROJECTS.findIndex((project) => project.id === id)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: CURATED_PROJECTS[(index - 1 + CURATED_PROJECTS.length) % CURATED_PROJECTS.length],
    next: CURATED_PROJECTS[(index + 1) % CURATED_PROJECTS.length],
  }
}

export function getCategoryCounts(projects = PROJECTS) {
  const counts = { all: projects.length }
  for (const category of CATEGORIES) {
    if (category.id === 'all') continue
    counts[category.id] = projects.filter((project) => project.category === category.id).length
  }
  return counts
}

export function getRegionCounts(projects = PROJECTS) {
  return Object.fromEntries(
    REGIONS.map((region) => [
      region.id,
      projects.filter((project) => project.regionId === region.id).length,
    ]),
  )
}

export function filterAndSortProjects(projects, { category = 'all', region = 'all', sort = 'curated' } = {}) {
  const filtered = projects.filter((project) => {
    const categoryMatch = category === 'all' || project.category === category
    const regionMatch = region === 'all' || project.regionId === region
    return categoryMatch && regionMatch
  })

  return filtered.sort((a, b) => {
    if (sort === 'year-desc') return b.yearNumeric - a.yearNumeric || a.curationRank - b.curationRank
    if (sort === 'year-asc') return a.yearNumeric - b.yearNumeric || a.curationRank - b.curationRank
    if (sort === 'title') return a.title.localeCompare(b.title)
    return a.curationRank - b.curationRank
  })
}

export const SORT_OPTIONS = [
  { id: 'curated', label: 'Curated sequence' },
  { id: 'year-desc', label: 'Year — newest first' },
  { id: 'year-asc', label: 'Year — earliest first' },
  { id: 'title', label: 'Title — A to Z' },
]
