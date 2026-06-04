# Gridiron Brewing

Static brewery website for **Gridiron Brewing**, Hampton, New Brunswick.

- **Live:** [gridironbrewing.com](https://gridironbrewing.com)
- **Stack:** Astro 6 + TypeScript · Sanity CMS · Cloudflare Pages
- **Studio:** [gridiron-brewing.sanity.studio](https://gridiron-brewing.sanity.studio)

## Commands

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Local dev server at `localhost:4321`            |
| `npm run build`   | Build production output to `./dist/`            |
| `npm run preview` | Preview the build locally                       |

## Environment

`SANITY_PROJECT_ID` and `SANITY_DATASET` are required. Set them in `.env` for local dev and in the Cloudflare Pages env vars for production.

## Content

All content (beers, events, community photos) is edited in Sanity Studio. Publishes trigger a Cloudflare Pages build via the configured webhook. See `CLAUDE.md` for editorial conventions and the design system.
