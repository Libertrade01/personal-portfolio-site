import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export async function getPublishedProjects() {
  const projects = await getCollection('projects');
  return projects
    .filter((p) => !p.data.draft)
    .sort((a, b) => a.data.order - b.data.order || b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getFeaturedProjects() {
  const projects = await getPublishedProjects();
  return projects.filter((p) => p.data.featured);
}

export async function getPublishedBuildLogs() {
  const posts = await getCollection('build-log');
  return posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export type ProjectEntry = CollectionEntry<'projects'>;
