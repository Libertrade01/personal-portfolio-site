/**
 * Accent color theme — change this one value to restyle the site.
 *
 * Options:
 * - gold   — warm, editorial, premium operator
 * - cyan   — terminal / systems dashboard
 * - silver — silver / ice, minimal (default)
 * - warm   — warm neutral cream (see design-lab)
 * - champagne — muted champagne (see design-lab)
 * - blue   — clean tech, confident SaaS
 * - violet — modern AI, subtle creative
 */
export const accentTheme = 'warm' as const;

export type AccentTheme = 'gold' | 'cyan' | 'silver' | 'warm' | 'champagne' | 'blue' | 'violet';

export const site = {
  name: 'Michael Low',
  title: 'Michael Low — AI Workflow Builder & Systems Operator',
  description:
    'I build practical AI workflows and operating systems for small teams, creators, and information-heavy work.',
  tagline: 'Messy input in. Clean operating system out.',
  url: 'https://michaellow.dev',
  email: 'hello@michaellow.dev',
  github: 'https://github.com/Libertrade01',
  linkedin: 'https://linkedin.com/in/michaellow',
  availability:
    'Open to remote roles and select workflow implementation projects.',
} as const;

export const hero = {
  role: 'AI Workflow Builder & Systems Operator',
  /** Line 1 — clean sans */
  title: 'Practical AI systems',
  /** Line 2 — only `messyWord` wobbles. Alt: before: 'built from ', after: ' inputs.' */
  punchline: {
    before: 'Built from ',
    messyWord: 'messy',
    after: ' inputs.',
  },
  /** Terminal window title — personal / punchy options in comment */
  terminal: {
    filename: 'workflow.ts',
  },
  tagline: 'Messy input in. Clean operating system out.',
} as const;

export const featuredProjectSlugs = [
  'raiz-life-journal',
  'podcast-knowledge-workflow',
  'book-inmobiliaria',
  'trading-desk',
] as const;

export const nav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Build Log', href: '/build-log' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const workflowPattern = {
  title: 'How I work',
  steps: ['Messy Input', 'Structured Process', 'Useful Output', 'Review Loop'],
  examples: [
    {
      input: 'Podcast / YouTube',
      output: 'Transcript → summary → knowledge base entry',
    },
    {
      input: 'Trade session notes',
      output: 'Review → pattern → next-session protocol',
    },
    {
      input: 'Newsletter feed',
      output: 'Alert → summary → archive',
    },
    {
      input: 'Raw script draft',
      output: 'Voice-ready ElevenLabs output',
    },
  ],
} as const;

export const services = [
  {
    title: 'AI Workflow Setup',
    description:
      'Turn scattered tools and manual steps into a documented, repeatable pipeline.',
  },
  {
    title: 'Content & Research Pipelines',
    description:
      'Podcast, newsletter, and transcript workflows that produce structured, reusable output.',
  },
  {
    title: 'Knowledge Base & SOP Systems',
    description:
      'Internal documentation, review loops, and operating protocols your team can actually use.',
  },
  {
    title: 'Small Web Apps & Tools',
    description:
      'Focused PWAs, dashboards, and operator tools — shipped, not slideware.',
  },
  {
    title: 'Trading & Review Operations',
    description:
      'Session review systems, journals, and process frameworks for disciplined execution.',
  },
] as const;

export const engagementProcess = [
  { step: 'Discovery', detail: 'Understand the messy input, constraints, and desired output.' },
  { step: 'Prototype', detail: 'Build a working slice — script, workflow, or UI — fast.' },
  { step: 'Handoff', detail: 'Documentation, training, and a system your team can maintain.' },
] as const;

export const notOffered = [
  'Vague "AI strategy" decks with no implementation',
  'Black-box automation you cannot audit or maintain',
  'Hype-first consulting without shipped artifacts',
] as const;
