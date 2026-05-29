/**
 * Accent color theme — change this one value to restyle the site.
 */
export const accentTheme = 'linen' as const;

export type AccentTheme = 'gold' | 'cyan' | 'silver' | 'warm' | 'champagne' | 'blue' | 'violet' | 'linen';

export const site = {
  name: 'Michael Low',
  title: 'Michael Low — Practical AI implementation',
  description:
    'Practical AI systems for messy business workflows. I help small teams turn scattered notes, manual tasks, and repeated admin into systems they can actually use.',
  tagline: 'Messy input in. Clean operating system out.',
  url: 'https://michaellow.dev',
  email: 'hello@michaellow.dev',
  github: 'https://github.com/Libertrade01',
  linkedin: 'https://linkedin.com/in/michaellow',
  availability:
    'Available for selected AI workflow projects, implementation support, and embedded remote roles with small teams.',
  headshot: '/images/headshot.png',
  headshotFallback: '/images/headshot-placeholder.svg',
} as const;

export const about = {
  paragraphs: [
    'I build AI workflows and systems for people who have too much input and not enough structure.',
    'I like messy problems — half-broken processes, too many tabs, scattered notes, and the sense there must be a better way. That is usually where I come in.',
    'I design tools, automations, dashboards, journals, research pipelines, and content systems that turn chaos into something usable on a normal Tuesday.',
    'My work has covered mobile PWAs, CMS-backed websites, content pipelines, voice journals, and internal operating systems. I build systems the way some people build kitchens: for function, not applause.',
  ],
  traits: [
    { label: 'High agency', detail: 'I explore, prototype, ship, and refine — without waiting for perfect specs.' },
    { label: 'Practical systems', detail: 'Pipelines and operating rhythms, not one-off hacks or slide decks.' },
    { label: 'Messy inputs', detail: 'Comfortable starting where information is scattered and processes are half-formed.' },
    { label: 'Works in reality', detail: 'Useful implementation that survives a normal day, not AI theatre.' },
  ],
  personal:
    'Outside of build time, I love to travel — new places, new routines, and seeing how people solve the same messy problems in different ways.',
} as const;

export const hero = {
  role: 'Practical AI Implementation',
  title: 'Make AI useful, not overwhelming.',
  titleLines: ['Make AI useful,', 'not', 'overwhelming.'] as const,
  intro:
    'I design AI-assisted systems that capture information, reason over it, automate the boring parts, and turn it into clean operating workflows.',
  punchline: {
    before: 'Built from ',
    messyWord: 'messy',
    after: ' inputs.',
  },
  terminal: {
    filename: 'workflow.ts',
    lines: [
      { subject: 'inputs', method: 'organise' },
      { subject: 'repeat_tasks', method: 'automate' },
      { subject: 'systems', method: 'build' },
      { subject: 'clean_system', method: 'ready', arrow: true },
    ],
  },
  tagline: 'Messy input in. Clean operating system out.',
  statusLabel: 'Available:',
  statusPill: 'For selected workflow builds' as const,
  statusChips: [
    'For selected workflow builds',
    'Select workflow projects',
    'AI systems · dashboards · automation',
  ] as const,
  cta: {
    label: 'Turn scattered work into clean AI systems.',
    href: '/#help',
  },
} as const;

/** Homepage — help section header */
export const homeHelpLabel = 'Scattered work to working systems' as const;
export const homeHelpTitle = 'Start with the right kind of help.' as const;
export const homeHelpIntro =
  'Most projects start with an audit or a focused build sprint. From there, we can turn the workflow into a system your team can actually run.' as const;

export const homeHelpCta = {
  label: 'Start your workflow audit',
  href: '/contact',
} as const;

export const homeHelpAreas = [
  {
    title: 'AI Workflow Audit',
    description:
      'Map your current process, identify where AI and automation actually help, and leave with a clear implementation plan.',
  },
  {
    title: 'Workflow Build Sprint',
    description:
      'Design and build a working version of one workflow: content, research, admin, reporting, or review.',
  },
  {
    title: 'Knowledge Base / SOP System',
    description:
      'Turn scattered docs, notes, and processes into something searchable, usable, and maintainable.',
  },
  {
    title: 'Small Internal Tool',
    description:
      'A lightweight dashboard, portal, form, or app for a workflow that normal software does not quite fit.',
  },
  {
    title: 'Embedded AI Implementation Support',
    description:
      'Ongoing help inside a small team to build, test, document, and improve practical AI systems.',
  },
] as const;

/** Homepage — who this is for (preview lab + future placement) */
export const homeWhoLabel = 'WHO THIS IS FOR' as const;
export const homeWhoTitle = 'For teams buried in scattered work.' as const;
export const homeWhoIntro =
  'Small teams, creators, business owners, and solo operators who rely on information-heavy workflows but do not yet have a clean system for capturing, organising, reviewing, or reusing what matters.' as const;
export const homeWhoPains = [
  'Too many tools that do not connect',
  'Too many tabs, docs, and half-finished systems',
  'Repeated manual work eating up attention',
  'Scattered knowledge that is hard to reuse',
  'No clear process for capturing, reviewing, or handing off information',
] as const;

/** Homepage — why agentic AI matters (between Who and Ways) */
export const homeWhyMattersTitle = 'The shift from answers to systems.' as const;
export const homeWhyMattersBody = [
  'The real shift in AI is the move from one-off answers to systems that can carry work across an entire workflow.',
  'Agentic systems can monitor information, coordinate tools, apply rules, adapt when conditions change, and produce useful outputs without needing a human to manually push every step.',
  'This changes AI from something you consult into something that helps operate.',
] as const;

export const workPage = {
  intro: 'I help small teams turn messy work into practical AI-assisted systems.',
  whoBestFor: {
    lead: 'Small teams, creators, founders, and solo professionals who are buried in information-heavy work.',
    bullets: [
      'Too many tools',
      'Too many tabs',
      'Repeated manual processes',
      'Scattered notes and documents',
      'No clean system for capturing, reviewing, or reusing information',
    ],
    close: 'I help turn that into a workflow your team can actually run.',
  },
  bestFitIf: [
    'You have repeated manual work',
    'Your notes, content, and research are scattered',
    'You know AI could help, but do not know what to implement',
    'You need someone who can design, build, document, and hand off the system',
  ],
  offerings: [
    {
      title: 'AI Workflow Audit',
      description:
        'Map your current process, identify where AI and automation actually help, and leave with a clear implementation plan.',
    },
    {
      title: 'Workflow Build Sprint',
      description:
        'Design and build a working version of one workflow: content, research, admin, reporting, or review.',
    },
    {
      title: 'Knowledge Base / SOP System',
      description:
        'Turn scattered docs, notes, and processes into something searchable, usable, and maintainable.',
    },
    {
      title: 'Small Internal Tool',
      description:
        'A lightweight dashboard, portal, form, or app for a workflow that normal software does not quite fit.',
    },
    {
      title: 'Embedded AI Implementation Support',
      description:
        'Ongoing help inside a small team to build, test, document, and improve practical AI systems.',
    },
  ],
  whatYouGet: [
    'Working system',
    'Documentation',
    'Training / Loom walkthrough',
    'Clear next steps',
  ],
} as const;

export const featuredProjectSlugs = [
  'libertrade-journal-analytics',
  'book-inmobiliaria',
  'raiz-life-journal',
  'trading-knowledge-wiki',
] as const;

export const nav = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Build Log', href: '/build-log' },
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
      input: 'Meeting notes',
      output: 'Capture → summary → action items in one place',
    },
    {
      input: 'Newsletter feed',
      output: 'Alert → summary → archive',
    },
    {
      input: 'Raw script draft',
      output: 'Voice-ready output',
    },
  ],
} as const;

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
