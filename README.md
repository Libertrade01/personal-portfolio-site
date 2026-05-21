# Michael Low — Portfolio

Personal portfolio site built with Astro, Tailwind CSS, and MDX Content Collections.

## Stack

- [Astro 5](https://astro.build)
- Tailwind CSS 4
- MDX for case studies and build log
- Deployed on Vercel

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

## Content

Add projects in `src/content/projects/` and build log posts in `src/content/build-log/`.

Update current focus in `src/content/now/index.md`.

## Deploy

Push to GitHub and connect to Vercel. Set production domain in `astro.config.mjs` (`site` field).
