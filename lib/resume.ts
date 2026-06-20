/**
 * Résumé content, mirrored from the canonical "fullstack" base variant in the
 * sister `resume-project` generator (`resume.py`). That generator is the source
 * of truth and also produces the downloadable PDF in `public/`; this module is
 * the same content shaped for on-page display. Keep the two in sync when the
 * base résumé changes.
 */

/** A grouped skills row: a category label and its comma-separated items. */
export type SkillGroup = { label: string; items: string }

/** One role in the work history, newest first. */
export type Role = {
  title: string
  company: string
  /** MM/YYYY – MM/YYYY (or "Present"), matching the PDF's date format. */
  dates: string
  bullets: string[]
}

export type Resume = {
  name: string
  /** One-line headline shown under the name. */
  headline: string
  contact: {
    email: string
    /** Display text for the LinkedIn link, e.g. `in/dillon-hamilton`. */
    linkedin: string
    linkedinUrl: string
  }
  /** Filename of the downloadable PDF under `public/`. */
  pdf: string
  summary: string
  skills: SkillGroup[]
  experience: Role[]
  education: { degree: string; school: string }[]
}

export const resume: Resume = {
  name: 'Dillon Ruiz-Hamilton',
  headline: 'Full-Stack Software Engineer · 13 years',
  contact: {
    email: 'dillonrhamilton@gmail.com',
    linkedin: 'in/dillon-hamilton',
    linkedinUrl: 'https://www.linkedin.com/in/dillon-hamilton/',
  },
  pdf: '/Dillon-Ruiz-Hamilton-Resume.pdf',
  summary:
    'Full-stack engineer with 13 years of experience building production systems ' +
    'across React, TypeScript, Java/Spring Boot, and GraphQL. Proven across healthtech, ' +
    'e-commerce, and platform engineering — from patient-facing EHR tools at Memorial Sloan ' +
    'Kettering to loyalty program infrastructure serving 1M+ members at Wayfair. ' +
    'Comfortable owning work end-to-end, from schema design to deployment.',
  skills: [
    {
      label: 'Languages & Frameworks',
      items: 'TypeScript, React, React Native, Next.js, Java, Spring Boot, Python, GraphQL, PHP',
    },
    {
      label: 'API & Data Layer',
      items: 'Apollo Federation, Netflix DGS, REST APIs, GraphQL schema design',
    },
    {
      label: 'AI / ML',
      items:
        'LangChain, Retrieval-Augmented Generation (RAG), Vertex AI, Gemini, Anthropic API, ' +
        'multi-agent orchestration, Model Context Protocol (MCP)',
    },
    {
      label: 'Testing & CI/CD',
      items: 'Playwright, Buildkite, Azure Pipelines, Jenkins, Docker',
    },
    {
      label: 'Observability & Analytics',
      items: 'Grafana, Google Core Web Vitals, A/B testing, D3.js',
    },
    {
      label: 'Cloud & Infrastructure',
      items: 'Azure (primary), AWS (S3, Lambda — in progress)',
    },
  ],
  experience: [
    {
      title: 'Software Engineer',
      company: 'Wayfair (Contract)',
      dates: '01/2025 – Present',
      bullets: [
        'Built a PagerDuty-triggered RAG incident triage bot using Python, Vertex AI, and LangChain ' +
          'with multi-agent orchestration and conversational memory — reducing root-cause identification ' +
          'time by ~70% for on-call engineers across the org.',
        'Built an AI-augmented CI pipeline integrating an Anthropic model with Buildkite to ' +
          'auto-diagnose Playwright test failures and post fixes to a shared Slack channel — reducing ' +
          'manual triage from 5–10 minutes per failure to near-zero and surfacing flakiness targets for rewrite.',
        'Built and deployed a Jira MCP server; drove Model Context Protocol (MCP) adoption within ' +
          'the team, establishing shared guidelines on appropriate use patterns.',
        'Delivered multiple product initiatives for the Wayfair Rewards loyalty program (1M+ members, ' +
          '15%+ of U.S. revenue), including a standalone enrollment purchase flow built across ' +
          'React/TypeScript, Java/Spring Boot, Apollo Federation, and Netflix DGS.',
        'Owned and stabilized the Playwright end-to-end test suite: resolved flaky parallel/serial ' +
          'failures, implemented CI-aware test selection via Buildkite environment variables, and ' +
          'expanded mobile web coverage.',
      ],
    },
    {
      title: 'Staff Solutions Engineer',
      company: 'Walmart (Contract)',
      dates: '06/2022 – 12/2024',
      bullets: [
        "Improved web performance across React and Next.js codebases, achieving a 'Good' Google Core " +
          'Web Vitals rating and a 50% reduction in Interaction to Next Paint (INP).',
        'Built React dashboards for CI/CD pipeline observability — visualizing job health, runtimes, ' +
          'and failure rates — backed by Azure data pipelines.',
        'Led monorepo tooling improvements and build caching initiatives, reducing CI overhead ' +
          "across Walmart's engineering org.",
      ],
    },
    {
      title: 'Software Engineer II',
      company: 'Carbon Health',
      dates: '02/2021 – 06/2022',
      bullets: [
        'Shipped a national COVID-19 clinic locator in Next.js and Google Maps API, supporting ' +
          'routing across 100+ clinic locations in 17 states — part of a network that delivered ' +
          '2.1M+ COVID tests and 1.5M+ vaccines.',
        'Built patient onboarding and sign-up funnel features for the EHR platform across ' +
          'React Native and Next.js, integrated with an A/B testing framework to measure retention.',
      ],
    },
    {
      title: 'Senior Front-End Engineer',
      company: 'Memorial Sloan Kettering Cancer Center',
      dates: '01/2017 – 02/2021',
      bullets: [
        'Built a React-based internal EHR platform serving 1,400+ attending physicians and ' +
          '4,000+ oncology nurses — features included radiology scan viewing, patient charts, ' +
          'lab trend graphs, and high-performance tables over large clinical datasets.',
        'Implemented complex state and data management using RxJS and Redux to streamline ' +
          'clinician workflows across structured clinical data at scale.',
        'Delivered D3.js data visualizations for patient dashboards in close collaboration with ' +
          'clinical, design, and data science teams.',
      ],
    },
  ],
  education: [{ degree: 'BA, Psychology', school: 'New York University' }],
}
