# Enosh Blog

Enosh Blog is a personal publishing platform for **Enosh Yeswa**, designed in an Editorial Noir style: dark, typographic, and magazine-inspired. It is part of the [Enosx Technologies](https://github.com/enigmacxenosx) portfolio.

[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](https://www.typescriptlang.org/) [![Live project](https://img.shields.io/badge/design-Editorial%20Noir-111827)](https://github.com/enigmacxenosx/enosh-blog)

## Features

- Editorial Noir design system with serif-forward typography and restrained motion.
- Magazine-style post listing and detail pages.
- Reusable component showcase and case-study layouts.
- Server-rendered blog API with Drizzle ORM.

## Technology

React 19, Vite 7, TypeScript, Tailwind CSS, Express, and Drizzle ORM. The application is designed for Vercel deployment.

## Getting started

The repository pins `legacy-peer-deps=true` in `.npmrc` for compatibility with the Vite 7 plugin set.

```bash
git clone https://github.com/enigmacxenosx/enosh-blog.git
cd enosh-blog
npm install
npm run dev
npm run build
```

## Project structure

| Path | Purpose |
|---|---|
| `client/src/_core/` | Editorial Noir design foundations |
| `client/src/components/` | Design-system and layout components |
| `client/src/pages/` | Home, posts, gallery, and case-study pages |
| `server/` | Server and API backend |
| `shared/` | Shared types and constants |
| `api/` | API endpoints |
| `drizzle/` | Database migrations |

## Writing a post

Add the post data to the shared posts store, use the `PostDetail` template for the page layout, and run `npm run build` before publishing.

## Portfolio

- [ENOSX AI](https://enosxai.vercel.app)
- [E-commerce Hub](https://enosxtech-hub.vercel.app)
- [Official website](https://enosxtech.vercel.app)

## License

Proprietary — © 2024–2026 Enosx Technologies. All rights reserved.
