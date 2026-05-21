import rss from '@astrojs/rss';
import { getPublishedBuildLogs } from '../../utils/content';
import { site } from '../../config/site';

export async function GET(context) {
  const posts = await getPublishedBuildLogs();
  return rss({
    title: `${site.name} — Build Log`,
    description: 'Build notes and workflow experiments from Michael Low.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/build-log/${post.slug}/`,
    })),
    customData: `<language>en-gb</language>`,
  });
}
