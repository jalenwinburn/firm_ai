/* Canonical curated fixture; see docs/analysis-result.md. */
window.FIELDWORK_ANALYSIS = {
  schemaVersion: 1,
  id: "fieldwork-colorado-river-v1",
  kind: "curated-demo",
  firmSnapshotId: "2026-09-14",
  opportunity: {
    id: "DEMO-CRCW-2026-01",
    name: "Colorado River Civic Waterfront",
    titleLines: ["Colorado River", "Civic Waterfront"],
    eyebrow: "RFQ / 2026–01",
    client: "City of Austin",
    location: "Austin, Texas",
    disciplines: ["Landscape Architecture", "Urban Design"],
    due: "2026-10-16T14:00:00-05:00",
    dueLabel: "October 16, 2026 · 2:00 PM CDT",
    dueShort: "OCT 16",
    dueYearTime: "2026 · 2:00 PM CDT",
    issued: "2026-09-14",
    intervalLabel: "32 days from issue to deadline",
    constructionBudget: 72000000,
    budgetBasis: "RFQ · planning budget",
    area: "22 acres",
    areaContext: "public realm",
    anticipatedStart: "JAN 2027",
    primarySourceId: "rfq",
  },
  disclosure: {
    badge: "FIELDWORK DEMO",
    evaluation: "curated demo evaluation",
    match: "demo match",
    score:
      "Scores reproduce the agreed Product & UX demo. They are not a validated probability of winning and are not calculated from RFQ selection weights. Evidence and source facts are separately identified.",
    project:
      "Similarity is a curated demo judgment. Project facts and historical roles come from the supplied source records.",
    person:
      "Unallocated time is not a confirmed commitment. Match scores are the agreed demo scenario.",
    source:
      "Source precedence: RFQ for procurement facts; project workbook for project fees and roles; staffing workbook for dated capacity; strategic plan for firm priorities. The fixed scores and indicative fee range belong to the demo evaluation, not the source documents.",
    footer: "Fictional demo · Source snapshot September 12–14, 2026",
    run: "Prepared demo records · local evidence checks · no live AI or PDF ingestion. Scores follow the agreed demo scenario.",
  },
  recommendation: {
    id: "pursuit",
    label: "Pursuit recommendation",
    value: 87,
    confidence: "High",
    reason:
      "Fieldwork is exceptionally well positioned for this pursuit through relevant Austin public-realm work, municipal delivery and its 2027 priorities. Staffing and incomplete commercial information introduce manageable uncertainty. High confidence applies to this curated demo recommendation; individual financial and capacity signals remain moderate.",
    evidence: [
      "Lead with Waterloo Commons and Eastline Greenway.",
      "Resolve Noah’s capacity and retain Priya as the alternate PM.",
      "Confirm specialist coverage and obtain commercial terms during negotiations.",
    ],
    projects: ["FW-P001", "FW-P002", "FW-P003"],
    sources: [
      {
        sourceId: "projects",
        page: 1,
        label: "Fieldwork_Project_Database.xlsx",
      },
      {
        sourceId: "staffing",
        page: 1,
        label: "Fieldwork_Staffing_September_2026.xlsx",
      },
      {
        sourceId: "strategy",
        page: 2,
        label: "Fieldwork_2027_Strategic_Plan.pdf",
      },
      {
        sourceId: "rfq",
        page: 1,
        label: "Colorado_River_Civic_Waterfront_RFQ_2026.pdf",
      },
    ],
    decision: "PURSUE",
    summary: "Strong opportunity",
    statement: [
      "Exceptional Austin public-realm experience.",
      "Strong strategic fit. A team decision to resolve.",
    ],
    drivers: [
      {
        title: "Experience that directly translates",
        detail: "Waterloo Commons + Eastline Greenway",
        concern: false,
      },
      {
        title: "Austin credibility. Strategic alignment.",
        detail: "Municipal delivery + 2027 public-realm priorities",
        concern: false,
      },
      {
        title: "Preferred PM is 91% allocated",
        detail: "January availability requires confirmation",
        concern: true,
      },
      {
        title: "Design fee is not disclosed",
        detail: "Financial confidence remains moderate",
        concern: true,
      },
    ],
    people: [],
    components: [],
  },
  scores: [
    {
      id: "fit",
      label: "Project fit",
      short: "PROJECT FIT",
      value: 94,
      confidence: "High",
      reason:
        "The opportunity combines the markets, services and geography in which Fieldwork has its strongest source-backed experience. The $72M program is larger than the three lead precedents, but its public-realm scope is closely aligned.",
      evidence: [
        "Waterloo Commons: 14-acre Austin urban park; landscape architecture, urban design and engagement.",
        "Eastline Greenway: City of Austin client, trails, ecology and municipal coordination.",
        "Republic District Streetscape: Austin streetscape and accessible public-space experience.",
      ],
      projects: ["FW-P001", "FW-P002", "FW-P009"],
      sources: [
        {
          sourceId: "projects",
          page: 1,
          label: "Fieldwork_Project_Database.xlsx",
        },
        {
          sourceId: "qualifications",
          page: 1,
          label: "Fieldwork_Master_Qualifications_2026.pdf",
        },
        {
          sourceId: "rfq",
          page: 2,
          label: "Colorado_River_Civic_Waterfront_RFQ_2026.pdf",
        },
      ],
      components: [
        ["Market alignment", 98],
        ["Service alignment", 96],
        ["Geographic alignment", 100],
        ["Scale alignment", 88],
        ["Client alignment", 91],
      ],
      people: [],
    },
    {
      id: "experience",
      label: "Relevant experience",
      short: "EXPERIENCE",
      value: 92,
      confidence: "High",
      reason:
        "The recommended three-project sequence demonstrates Austin public realm, ecological trail delivery and civic gathering space. Evidence should describe Fieldwork’s actual roles, with hydraulic and specialist work clearly attributed to others.",
      evidence: [
        "Waterloo Commons — $48M delivered construction cost; completed 2023.",
        "Eastline Greenway — $32M delivered construction cost; completed 2024.",
        "Trinity Civic Plaza — $27M delivered construction cost; completed 2022.",
      ],
      projects: ["FW-P001", "FW-P002", "FW-P003"],
      sources: [
        {
          sourceId: "projects",
          page: 1,
          label: "Fieldwork_Project_Database.xlsx",
        },
        {
          sourceId: "qualifications",
          page: 1,
          label: "Fieldwork_Master_Qualifications_2026.pdf",
        },
        {
          sourceId: "rfq",
          page: 4,
          label: "Colorado_River_Civic_Waterfront_RFQ_2026.pdf",
        },
      ],
      people: [],
      components: [],
    },
    {
      id: "team",
      label: "Team strength",
      short: "TEAM",
      value: 88,
      confidence: "High",
      reason:
        "Elena Marquez and Noah Williams bring direct involvement in the strongest comparable projects. Priya Shah provides a credible alternative PM option, with more available capacity but a different delivery record.",
      evidence: [
        "Elena was principal-in-charge on Waterloo Commons and Trinity Civic Plaza, and stakeholder advisor on Eastline Greenway.",
        "Noah was project manager on Waterloo Commons and Eastline Greenway.",
        "Priya was project designer on Eastline Greenway; do not describe her as its PM.",
      ],
      people: ["FW-E001", "FW-E004", "FW-E005"],
      sources: [
        {
          sourceId: "resumes",
          page: 1,
          label: "Fieldwork_Staff_Resumes.pdf",
        },
        {
          sourceId: "projects",
          page: 1,
          label: "Fieldwork_Project_Database.xlsx",
        },
        {
          sourceId: "staffing",
          page: 1,
          label: "Fieldwork_Staffing_September_2026.xlsx",
        },
      ],
      projects: [],
      components: [],
    },
    {
      id: "capacity",
      label: "Capacity",
      short: "CAPACITY",
      value: 74,
      confidence: "Moderate",
      reason:
        "Fieldwork has room to pursue, but its preferred PM is heavily committed. Forecast availability improves at 60 days. The source forecast ends December 11, 2026; January 2027 capacity has not been confirmed.",
      evidence: [
        "Noah: 91% allocated at September 12; 63% at November 11. That is 9% and 37% unallocated capacity.",
        "Priya: 67% allocated currently; 54% at 60 days.",
        "Firmwide allocation: 82% current, 84% at 30 days, 73% at 60 days, 68% at 90 days.",
      ],
      people: ["FW-E004", "FW-E005"],
      sources: [
        {
          sourceId: "staffing",
          page: 1,
          label: "Fieldwork_Staffing_September_2026.xlsx",
        },
        {
          sourceId: "rfq",
          page: 6,
          label: "Colorado_River_Civic_Waterfront_RFQ_2026.pdf",
        },
      ],
      projects: [],
      components: [],
    },
    {
      id: "strategic",
      label: "Strategic alignment",
      short: "STRATEGIC",
      value: 96,
      confidence: "High",
      reason:
        "The pursuit supports Fieldwork’s explicit 2027 priorities: major public realm, higher education and urban resilience. A substantial Texas civic landscape offers a strong design role and multi-phase work.",
      evidence: [
        "2027 strategy: grow major public realm and urban resilience.",
        "Preferred pursuits: Texas/Southwest, strong design role, multi-phase work and fees above approximately $500K.",
        "The RFQ combines resilient landscape infrastructure, civic space, trails and ecological restoration.",
      ],
      sources: [
        {
          sourceId: "strategy",
          page: 2,
          label: "Fieldwork_2027_Strategic_Plan.pdf",
        },
        {
          sourceId: "rfq",
          page: 2,
          label: "Colorado_River_Civic_Waterfront_RFQ_2026.pdf",
        },
      ],
      projects: [],
      people: [],
      components: [],
    },
    {
      id: "financial",
      label: "Financial signals",
      short: "FINANCIAL",
      value: 71,
      confidence: "Moderate",
      reason:
        "Comparable fees establish useful context, but do not establish this opportunity’s fee, staffing cost or margin. The indicative $1.4M–$2.2M range is a Product & UX demo assumption, not an RFQ allowance or a validated estimate.",
      evidence: [
        "Waterloo Commons: $1.42M Fieldwork fee on $48M construction.",
        "Eastline Greenway: $980K fee on $32M construction. Trinity Civic Plaza: $740K on $27M.",
        "113 of 164 historical projects have fee data. The RFQ does not publish a design-fee budget.",
      ],
      projects: ["FW-P001", "FW-P002", "FW-P003"],
      sources: [
        {
          sourceId: "projects",
          page: 1,
          label: "Fieldwork_Project_Database.xlsx",
        },
        {
          sourceId: "rfq",
          page: 7,
          label: "Colorado_River_Civic_Waterfront_RFQ_2026.pdf",
        },
        {
          sourceId: "strategy",
          page: 2,
          label: "Fieldwork_2027_Strategic_Plan.pdf",
        },
      ],
      people: [],
      components: [],
    },
    {
      id: "risk",
      label: "Risk position",
      short: "RISK",
      value: 79,
      confidence: "Moderate",
      reason:
        "The demo risk score uses a favorable direction: higher means fewer concerns. No critical firm-level qualification gap is apparent, but specialist commitments, future staffing and contract terms remain unresolved.",
      evidence: [
        "No committed civil, hydraulic or other specialist consultants are recorded.",
        "No draft agreement, design-fee allowance, survey or geotechnical reports accompanied the RFQ.",
        "Confirm Noah’s availability before naming the final team.",
      ],
      sources: [
        {
          sourceId: "rfq",
          page: 7,
          label: "Colorado_River_Civic_Waterfront_RFQ_2026.pdf",
        },
        {
          sourceId: "staffing",
          page: 1,
          label: "Fieldwork_Staffing_September_2026.xlsx",
        },
      ],
      projects: [],
      people: [],
      components: [],
    },
  ],
  sources: [
    {
      id: "rfq",
      documentId: "Colorado_River_Civic_Waterfront_RFQ_2026.pdf",
      kind: "opportunity",
    },
    {
      id: "projects",
      documentId: "Fieldwork_Project_Database.xlsx",
      kind: "firm",
    },
    {
      id: "qualifications",
      documentId: "Fieldwork_Master_Qualifications_2026.pdf",
      kind: "firm",
    },
    {
      id: "resumes",
      documentId: "Fieldwork_Staff_Resumes.pdf",
      kind: "firm",
    },
    {
      id: "staffing",
      documentId: "Fieldwork_Staffing_September_2026.xlsx",
      kind: "firm",
    },
    {
      id: "strategy",
      documentId: "Fieldwork_2027_Strategic_Plan.pdf",
      kind: "firm",
    },
  ],
  overview: {
    title: ["A civic landscape.", "A strong Fieldwork opportunity."],
    paragraphs: [
      "The City of Austin is seeking a multidisciplinary design team for a $72 million transformation of approximately 22 acres of downtown riverfront. Civic open space, ecological restoration, trails and mobility connections form a major resilient public-realm initiative.",
      "Landscape architecture, urban design and community engagement lead a coordinated effort across civil, ecological, structural and architectural expertise. Comparable public-realm delivery and team qualifications account for 55% of the RFQ evaluation.",
      "Fieldwork’s Austin portfolio and 2027 priorities support the pursuit. Waterloo Commons and Eastline Greenway are the strongest precedents. Confirm project leadership availability and external discipline coverage before committing.",
    ],
    sources: [
      {
        sourceId: "rfq",
        page: 2,
        label: "RFQ · project & purpose, pp. 2–4",
      },
    ],
    requirementIds: ["REQ-02", "REQ-03", "REQ-05", "REQ-11"],
  },
  requirements: [
    {
      id: "REQ-01",
      title: "Prime identity",
      detail: "Identify the prime legal entity and authorized contact.",
      type: "Required",
      sources: [
        {
          sourceId: "rfq",
          page: 4,
          label: "p. 4",
        },
      ],
    },
    {
      id: "REQ-02",
      title: "Texas registration",
      detail:
        "Name the Texas-registered landscape architect responsible for landscape services.",
      type: "Required",
      sources: [
        {
          sourceId: "rfq",
          page: 4,
          label: "p. 4",
        },
      ],
    },
    {
      id: "REQ-03",
      title: "Three comparable projects",
      detail:
        "Provide exactly three comparable projects completed within the ten years before the response deadline.",
      type: "Required",
      sources: [
        {
          sourceId: "rfq",
          page: 4,
          label: "p. 4",
        },
      ],
    },
    {
      id: "REQ-04",
      title: "Public-sector coordination",
      detail:
        "At least one comparable project must demonstrate public-sector coordination.",
      type: "Required",
      sources: [
        {
          sourceId: "rfq",
          page: 4,
          label: "p. 4",
        },
      ],
    },
    {
      id: "REQ-05",
      title: "Complete discipline coverage",
      detail:
        "Landscape architecture, urban design, civil, hydrology/hydraulics, structural, ecology, lighting, cost estimating and engagement.",
      type: "Required",
      sources: [
        {
          sourceId: "rfq",
          page: 3,
          label: "p. 3",
        },
      ],
    },
    {
      id: "REQ-06",
      title: "Subconsultant structure",
      detail:
        "Disclose proposed subconsultants, responsibilities and discipline coverage.",
      type: "Required",
      sources: [
        {
          sourceId: "rfq",
          page: 4,
          label: "p. 4",
        },
      ],
    },
    {
      id: "REQ-07",
      title: "Cover letter",
      detail:
        "Identify prime and contact; accept the RFQ requirements. Maximum two pages.",
      type: "Submission",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-08",
      title: "Organization chart",
      detail:
        "Show the firm, team, discipline leads and consultant responsibilities.",
      type: "Submission",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-09",
      title: "Project sheets",
      detail:
        "Include scope, client, dates, construction-value basis and named team-member roles for the three projects.",
      type: "Submission",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-10",
      title: "Key-person resumes",
      detail:
        "Include principal-in-charge, project manager and discipline leads with current responsibilities and relevant work.",
      type: "Submission",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-11",
      title: "Project approach",
      detail:
        "Address public engagement, resilience, design coordination and cost control.",
      type: "Submission",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-12",
      title: "Schedule and availability",
      detail:
        "Provide milestones and January 2027 mobilization availability; identify competing commitments.",
      type: "Submission",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-13",
      title: "Disclosures and addenda",
      detail:
        "Provide conflicts, exceptions and acknowledgment of issued addenda. No addenda accompanied the initial issue.",
      type: "Submission",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-14",
      title: "Three client references",
      detail:
        "Give project connection and contact information for three client references.",
      type: "Submission",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-15",
      title: "Searchable PDF and page limit",
      detail:
        "One searchable PDF, maximum 30 counted pages. Only front cover, contents and addendum acknowledgments are excluded.",
      type: "Format",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-16",
      title: "File standards",
      detail:
        "US Letter, minimum 10-point body type, maximum 25 MB; filename CRCW_PrimeFirm_Qualifications.pdf.",
      type: "Format",
      sources: [
        {
          sourceId: "rfq",
          page: 5,
          label: "p. 5",
        },
      ],
    },
    {
      id: "REQ-17",
      title: "No pricing in qualifications",
      detail:
        "Do not include fees, hourly rates or pricing schedules. Compensation follows during negotiations.",
      type: "Restriction",
      sources: [
        {
          sourceId: "rfq",
          page: 4,
          label: "p. 4",
        },
      ],
    },
  ],
  procurement: {
    description:
      "17 grouped requirements traced to the original seven-page RFQ. These are requirements to address, not an assertion that a response is compliant.",
    callout: {
      title: "Do not include pricing.",
      detail:
        "The RFQ is qualifications-based. Fees and hourly rates are requested during negotiations, not in the response.",
      sources: [],
    },
    scheduleLabel: "FULL SCHEDULE / CENTRAL TIME",
    scheduleNote:
      "Dates after submission are anticipated. Check written addenda; none accompany the initial issue.",
    scheduleSources: [
      {
        sourceId: "rfq",
        page: 6,
        label: "RFQ · schedule, p. 6",
      },
    ],
  },
  deadlines: [
    {
      date: "2026-09-14",
      label: "RFQ issued",
      detail: "Initial issue",
      id: "DATE-0",
      featured: false,
      primary: false,
    },
    {
      date: "2026-09-23",
      label: "Optional information session",
      detail: "10:00 AM CDT",
      id: "DATE-1",
      featured: false,
      primary: false,
    },
    {
      date: "2026-09-30",
      label: "Written questions due",
      detail: "5:00 PM CDT",
      id: "DATE-2",
      featured: true,
      primary: false,
    },
    {
      date: "2026-10-07",
      label: "Final addendum",
      detail: "Anticipated",
      id: "DATE-3",
      featured: false,
      primary: false,
    },
    {
      date: "2026-10-16",
      label: "Qualifications due",
      detail: "2:00 PM CDT",
      primary: true,
      id: "DATE-4",
      featured: true,
    },
    {
      date: "2026-10-30",
      label: "Shortlist notification",
      detail: "Anticipated",
      id: "DATE-5",
      featured: true,
      primary: false,
    },
    {
      date: "2026-11-10",
      label: "Interviews",
      detail: "Anticipated · time to be confirmed",
      id: "DATE-6",
      featured: true,
      primary: false,
    },
    {
      date: "2026-11",
      label: "Negotiations",
      detail: "November–December 2026",
      id: "DATE-7",
      featured: false,
      primary: false,
    },
    {
      date: "2027-01",
      label: "Design mobilization",
      detail: "Anticipated · January 2027",
      id: "DATE-8",
      featured: true,
      primary: false,
    },
  ],
  selection: [
    {
      title: "Comparable public-realm experience and delivery",
      weight: 30,
      position: "Strong",
      detail: "Lead with completed, relevant work.",
    },
    {
      title: "Proposed team, roles and individual experience",
      weight: 25,
      position: "Strong",
      detail: "Prove the named team’s direct project roles.",
    },
    {
      title: "Approach, resilience and engagement",
      weight: 25,
      position: "To develop",
      detail: "Write the project-specific approach.",
    },
    {
      title: "Schedule, availability and delivery capacity",
      weight: 10,
      position: "To confirm",
      detail: "Resolve January commitments.",
    },
    {
      title: "Texas municipal coordination and local context",
      weight: 10,
      position: "Very strong",
      detail: "Show Austin delivery evidence.",
    },
  ],
  selectionSources: [
    {
      sourceId: "rfq",
      page: 4,
      label: "RFQ · evaluation criteria, p. 4",
    },
  ],
  risks: [
    {
      level: "Medium",
      title: "Preferred PM capacity",
      detail:
        "Noah is 91% allocated in the current snapshot. The 60-day forecast improves; January remains unconfirmed.",
      action: "Confirm leadership commitments before finalizing the team.",
      score: "capacity",
    },
    {
      level: "Medium",
      title: "Fee and contract uncertainty",
      detail:
        "No design-fee budget or draft agreement has been supplied. Project gross margin cannot yet be estimated.",
      action: "Clarify scope and commercial terms during negotiations.",
      score: "financial",
    },
    {
      level: "Low · unresolved",
      title: "Specialist consultant coverage",
      detail:
        "Civil, hydraulic, structural and other specialist capabilities require external coverage. No commitments are recorded.",
      action: "Name qualified consultants and confirm their availability.",
      score: "risk",
    },
    {
      level: "Low · monitor",
      title: "Procurement schedule",
      detail:
        "32 days from RFQ issue to submission. Anticipated interviews are November 10; negotiations follow in November–December.",
      action: "Track written addenda and protect proposal production time.",
      score: "risk",
    },
  ],
  experience: {
    evaluatedCount: 164,
    description:
      "Three curated lead precedents, followed by additional candidates from a transparent demo match across location, public realm, municipal work, ecology, engagement and completion status.",
    overviewNote: "164 firm projects evaluated · three lead precedents",
    matchNote: "Similarity percentages are demo judgments, not source facts.",
    callout: {
      title: "Three project sheets are required.",
      detail:
        "The RFQ asks for three projects completed within ten years, including at least one demonstrating public-sector coordination. More candidates do not mean more submission sheets.",
      sources: [
        {
          sourceId: "rfq",
          page: 4,
          label: "RFQ · comparable experience",
        },
      ],
    },
    candidates: [
      {
        projectId: "FW-P001",
        match: 96,
        signals: [
          "Austin",
          "Public realm",
          "Municipal",
          "Resilience / ecology",
          "Engagement",
          "Completed",
        ],
        reason:
          "A 14-acre urban park connecting shaded civic lawns, stormwater gardens and accessible promenades. Fieldwork led landscape design, coordinated municipal reviews and facilitated neighborhood workshops.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P002",
        match: 91,
        signals: [
          "Austin",
          "Public realm",
          "Municipal",
          "Resilience / ecology",
          "Engagement",
          "Completed",
        ],
        reason:
          "A 4.8-mile greenway linking neighborhoods through flood-responsive trail segments and restored planting corridors. Fieldwork coordinated crossings, habitat planting and community access priorities.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P003",
        match: 84,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "A downtown civic plaza with flexible event space, shaded seating and accessible connections to municipal buildings. Fieldwork integrated security, event operations and everyday public use.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P011",
        match: null,
        signals: [
          "Austin",
          "Public realm",
          "Municipal",
          "Engagement",
          "Completed",
        ],
        reason:
          "A corridor public-realm plan coordinating shaded sidewalks, street-tree zones and civic gathering opportunities along South Congress. Fieldwork led stakeholder workshops and developed a phased public-space investment framework.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P013",
        match: null,
        signals: [
          "Austin",
          "Public realm",
          "Municipal",
          "Engagement",
          "Completed",
        ],
        reason:
          "Cedar Hollow Library Plaza provides accessible civic gathering space and durable planting for public use. Fieldwork scope includes landscape design and consultant coordination in Austin.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P109",
        match: null,
        signals: [
          "Austin",
          "Public realm",
          "Municipal",
          "Engagement",
          "Completed",
        ],
        reason:
          "Union Riverwalk provides shaded recreation routes, accessible entries and stormwater planting. Fieldwork scope includes landscape design and consultant coordination in Austin.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P007",
        match: null,
        signals: ["Austin", "Public realm", "Municipal", "Completed"],
        reason:
          "Trail rehabilitation, accessible entries and erosion-control planting along a heavily used creek corridor. Civil engineering and hydraulic analyses were provided by others.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P009",
        match: null,
        signals: ["Austin", "Public realm", "Municipal", "Completed"],
        reason:
          "A downtown street network with shaded sidewalks, integrated furnishing zones and accessible intersections. Fieldwork led streetscape design and coordinated utility and civil interfaces.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P014",
        match: null,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "Dry Creek Community Park provides shaded recreation routes, accessible entries and stormwater planting. Fieldwork scope includes landscape design and consultant coordination in Dallas.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P023",
        match: null,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "Mesa Community Park provides shaded recreation routes, accessible entries and stormwater planting. Fieldwork scope includes landscape design and consultant coordination in Phoenix.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P024",
        match: null,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "North Fork Community Park provides shaded recreation routes, accessible entries and stormwater planting. Fieldwork scope includes landscape design and consultant coordination in Albuquerque.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P030",
        match: null,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "Twin Oaks Community Park provides shaded recreation routes, accessible entries and stormwater planting. Fieldwork scope includes landscape design and consultant coordination in Georgetown.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P032",
        match: null,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "Valley Library Plaza provides accessible civic gathering space and durable planting for public use. Fieldwork scope includes landscape design and consultant coordination in Waco.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P033",
        match: null,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "Walnut Library Plaza provides accessible civic gathering space and durable planting for public use. Fieldwork scope includes landscape design and consultant coordination in Denton.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P035",
        match: null,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "Yaupon Community Park provides shaded recreation routes, accessible entries and stormwater planting. Fieldwork scope includes landscape design and consultant coordination in Phoenix.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P038",
        match: null,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "Brushy Creek Greenway provides shaded recreation routes, accessible entries and stormwater planting. Fieldwork scope includes landscape design and consultant coordination in Dallas.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
      {
        projectId: "FW-P042",
        match: null,
        signals: ["Public realm", "Municipal", "Engagement", "Completed"],
        reason:
          "Flint Greenway provides shaded recreation routes, accessible entries and stormwater planting. Fieldwork scope includes landscape design and consultant coordination in Georgetown.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "qualifications",
            page: 1,
            label: "Fieldwork_Master_Qualifications_2026.pdf",
          },
        ],
      },
    ],
    leadProjectIds: ["FW-P001", "FW-P002", "FW-P003"],
  },
  team: {
    evaluatedCount: 47,
    description:
      "Experience identifies the strongest team. Dated staffing records identify the commitments to resolve.",
    matchNote:
      "Team match percentages are the Product & UX demo scenario. They are not generated by a validated staffing model.",
    capacityNote:
      "Capacity is unallocated time at September 12, 2026—not a staffing commitment.",
    forecastNote:
      "January availability is unconfirmed. Forecast ends December 11, 2026. Current snapshot: September 12.",
    members: [
      {
        personId: "FW-E001",
        role: "Principal-in-Charge",
        match: 96,
        reason:
          "Evaluate documented experience together with the dated capacity records.",
        constrained: false,
        sources: [
          {
            sourceId: "staffing",
            page: 1,
            label: "Fieldwork_Staffing_September_2026.xlsx",
          },
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "resumes",
            page: 1,
            label: "Fieldwork_Staff_Resumes.pdf",
          },
        ],
      },
      {
        personId: "FW-E004",
        role: "Preferred Project Manager",
        match: 93,
        reason:
          "Preferred PM through direct Waterloo Commons and Eastline Greenway delivery. Current allocation requires an explicit staffing decision.",
        constrained: true,
        sources: [
          {
            sourceId: "staffing",
            page: 1,
            label: "Fieldwork_Staffing_September_2026.xlsx",
          },
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "resumes",
            page: 1,
            label: "Fieldwork_Staff_Resumes.pdf",
          },
        ],
      },
      {
        personId: "FW-E005",
        role: "Alternative Project Manager",
        match: 87,
        reason:
          "Alternative PM with greater unallocated capacity. Eastline experience was as Project Designer, not Project Manager.",
        constrained: false,
        sources: [
          {
            sourceId: "staffing",
            page: 1,
            label: "Fieldwork_Staffing_September_2026.xlsx",
          },
          {
            sourceId: "projects",
            page: 1,
            label: "Fieldwork_Project_Database.xlsx",
          },
          {
            sourceId: "resumes",
            page: 1,
            label: "Fieldwork_Staff_Resumes.pdf",
          },
        ],
      },
    ],
    comparison: {
      title: ["A stronger match.", "A tighter calendar."],
      personIds: ["FW-E004", "FW-E005"],
      periodIndices: [0, 2],
      periodLabels: ["Current", "60 days"],
      detail:
        "At the 60-day snapshot, Noah has 37% unallocated capacity and Priya has 46%. Neither figure confirms January availability.",
      dates:
        "Current: Sep 12 · 60 days: Nov 11, 2026. Forecast ends Dec 11, 2026",
      sources: [
        {
          sourceId: "staffing",
          page: 1,
          label: "Staffing · Capacity sheet",
        },
      ],
    },
    disciplines: [
      {
        name: "Landscape architecture",
        status: "Fieldwork experience documented",
      },
      {
        name: "Urban design",
        status: "Fieldwork experience documented",
      },
      {
        name: "Community engagement",
        status: "Fieldwork experience documented",
      },
      {
        name: "Civil engineering",
        status: "Confirm named discipline lead / coverage",
      },
      {
        name: "Hydrology / hydraulics",
        status: "Confirm named discipline lead / coverage",
      },
      {
        name: "Structural engineering",
        status: "Confirm named discipline lead / coverage",
      },
      {
        name: "Ecological restoration",
        status: "Confirm named discipline lead / coverage",
      },
      {
        name: "Lighting",
        status: "Confirm named discipline lead / coverage",
      },
      {
        name: "Cost estimating",
        status: "Confirm named discipline lead / coverage",
      },
    ],
    disciplineNote:
      "No external consultant commitments are recorded in the supplied package. Landscape resilience expertise is not a substitute for hydraulic analysis.",
    disciplineSources: [
      {
        sourceId: "rfq",
        page: 3,
        label: "RFQ · team disciplines, p. 3",
      },
    ],
  },
  financials: {
    title: "A meaningful fee opportunity. An incomplete fee basis.",
    feeRange: {
      low: 1400000,
      high: 2200000,
      label: "$1.4–2.2M",
      basis: "Demo assumption · not validated",
    },
    confidence: "Moderate",
    confidenceNote: "Fee budget is not disclosed",
    note: "The indicative range is part of the curated demo scenario. It is not a disclosed fee or a project margin forecast.",
    callout: {
      title: "Fee not disclosed. Margin not calculable.",
      detail:
        "The $72M construction budget is not a consultant fee. The $1.4M–$2.2M indicative range is an illustrative Product & UX assumption; scope, reimbursables, subconsultant allocations and cost inputs remain unresolved.",
      sources: [
        {
          sourceId: "rfq",
          page: 7,
          label: "RFQ · commercial assumptions, p. 7",
        },
      ],
    },
    comparableProjectIds: ["FW-P001", "FW-P002", "FW-P003"],
    guardrails: [
      "Fees above approximately $500K.",
      "A strong design role and multi-phase work.",
      "Texas / Southwest and strategic portfolio value.",
      "42% target project gross margin—not a forecast for this opportunity.",
    ],
    guardrailSources: [
      {
        sourceId: "strategy",
        page: 3,
        label: "Strategic plan · financial guardrails, p. 3",
      },
    ],
    coverageNote:
      "51 project fees are missing. The three lead precedents have usable fees, but comparable scope and future delivery costs still need review.",
    coverageSources: [
      {
        sourceId: "projects",
        page: 1,
        label: "Project database · Projects sheet",
      },
    ],
  },
  strategy: {
    title: [
      "Fieldwork understands Austin’s public realm",
      "because it has already delivered it.",
    ],
    subtitle:
      "A pursuit position grounded in demonstrated roles, not a claim of guaranteed selection.",
    overviewTitle: "Lead with the work. Prove the team.",
    overview:
      "Waterloo Commons → Eastline Greenway → Trinity Civic Plaza. Build the story around Austin delivery, resilient public space and credible leadership commitments.",
    themes: [
      {
        title: "Austin experience, with proof.",
        detail:
          "Lead with Waterloo Commons and Eastline Greenway. Show comparable scale, municipal coordination and the named team’s actual contribution.",
        sources: [
          {
            sourceId: "projects",
            page: 1,
            label: "Project database",
          },
        ],
      },
      {
        title: "Public realm + resilience.",
        detail:
          "Connect civic-space design with ecology, flood-responsive landscapes and community engagement. Name hydraulic specialists; do not imply that landscape experience covers hydraulic analysis.",
        sources: [
          {
            sourceId: "rfq",
            page: 3,
            label: "RFQ · scope of services",
          },
        ],
      },
      {
        title: "Proven leadership, confirmed capacity.",
        detail:
          "Position Elena and Noah through their shared delivery record. Confirm commitments and keep Priya as the PM alternative before promising January availability.",
        sources: [
          {
            sourceId: "staffing",
            page: 1,
            label: "Staffing and capacity",
          },
        ],
      },
    ],
    projectOrder: [
      {
        projectId: "FW-P001",
        label: "Lead precedent",
      },
      {
        projectId: "FW-P002",
        label: "Municipal + ecological precedent",
      },
      {
        projectId: "FW-P003",
        label: "Civic-space precedent",
      },
    ],
  },
  firmEvidence: {
    projects: [
      {
        sourceId: "projects",
        page: 1,
        label: "Fieldwork_Project_Database.xlsx",
      },
      {
        sourceId: "qualifications",
        page: 1,
        label: "Fieldwork_Master_Qualifications_2026.pdf",
      },
    ],
    people: [
      {
        sourceId: "staffing",
        page: 1,
        label: "Fieldwork_Staffing_September_2026.xlsx",
      },
      {
        sourceId: "projects",
        page: 1,
        label: "Fieldwork_Project_Database.xlsx",
      },
      {
        sourceId: "resumes",
        page: 1,
        label: "Fieldwork_Staff_Resumes.pdf",
      },
    ],
  },
};
