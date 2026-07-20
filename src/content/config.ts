import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  /** Optional second hero paragraph below description (case study pages). */
  descriptionExtra: z.string().optional(),
  date: z.coerce.date(),
  status: z.enum(['Live', 'Built', 'Prototype', 'In Progress', 'Concept']),
  category: z.string(),
  type: z.enum(['product', 'workflow']),
  stack: z.array(z.string()),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  role: z.string().default('Solo builder — design, implementation, deployment'),
  outcomes: z.array(z.string()).default([]),
  audience: z.array(z.enum(['smb', 'employer', 'personal'])).default([]),
  coverImage: z.string().optional(),
  /** Card thumbnail: contain = full UI visible; cover = fill crop (best for designed SVGs). */
  coverFit: z.enum(['cover', 'contain']).optional(),
  coverPosition: z.enum(['center', 'top']).optional(),
  /** Hide the standard hero artifact when a case study provides its own opening-screen composition. */
  showHeroCover: z.boolean().default(true),
  github: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  /** Case study hero CTA label (e.g. View live site, Open live demo). */
  liveLabel: z.string().optional(),
  /** Secondary line under the live URL button on case study heroes. */
  liveCtaNote: z.string().optional(),
  video: z.string().optional(),
  draft: z.boolean().default(false),
});

const buildLogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(true),
});

const nowSchema = z.object({
  title: z.string(),
  updated: z.coerce.date(),
});

export const collections = {
  projects: defineCollection({ type: 'content', schema: projectSchema }),
  'build-log': defineCollection({ type: 'content', schema: buildLogSchema }),
  blog: defineCollection({ type: 'content', schema: blogSchema }),
  now: defineCollection({ type: 'content', schema: nowSchema }),
};
