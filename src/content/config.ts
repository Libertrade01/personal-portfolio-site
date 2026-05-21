import { defineCollection, z } from 'astro:content';

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  status: z.enum(['Built', 'Prototype', 'In Progress', 'Concept']),
  category: z.string(),
  type: z.enum(['product', 'workflow']),
  stack: z.array(z.string()),
  featured: z.boolean().default(false),
  order: z.number().default(99),
  role: z.string().default('Solo builder — design, implementation, deployment'),
  outcomes: z.array(z.string()).default([]),
  audience: z.array(z.enum(['smb', 'employer', 'personal'])).default([]),
  coverImage: z.string().optional(),
  github: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
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
