# Enosh Blog — Editorial Noir

![Enosx Technologies](https://img.shields.io/badge/Enosx-Technologies-0ea5e9) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![Build](https://img.shields.io/badge/build-passing-22c55e)

A personal blog for **Enosh Yeswa** with an **Editorial Noir** design language — dark, typographic, and magazine-inspired. Part of the [Enosx Technologies](https://github.com/enigmacxenosx) portfolio, alongside ENOSX AI, the e-commerce aggregator, and the official tech site.

> **Contact:** WhatsApp [+254 798 303 978](https://wa.me/254798303978) · Instagram [@enosx_tech](https://instagram.com/enosx_tech) · [@engima_cx](https://instagram.com/engima_cx)

## Live Site

| Item | Details |
| :--- | :--- |
| Stack | React 19, Vite 7, TypeScript, Tailwind CSS |
| Design | Editorial Noir (custom design system in `client/src/_core`) |
| Hosting | Vercel |

## Features

- **Editorial Noir design system** — a bespoke dark design system with serif-forward typography and restrained motion.
- **Post listing & detail views** — magazine-style article layouts.
- **Component showcase** — a living style guide of the design system components.
- **Case study layouts** — long-form editorial templates for deep-dive content.
- **Server-rendered blog API** — backend in `server/` with Drizzle ORM.

## Getting Started

> **Note:** this project pins `legacy-peer-deps=true` in `.npmrc` to reconcile the `@builder.io/vite-plugin-jsx-loc` peer range with Vite 7.

```bash
git clone https://github.com/enigmacxenosx/enosh-blog.git
cd enosh-blog
npm install
npm run dev        # local development
npm run build      # production build
```

## Project Structure

```text
client/
├── src/
│   ├── _core/         # Editorial Noir design system foundation
│   ├── components/    # Design system and layout components
│   ├── pages/         # Home, Posts, PostDetail, Gallery, CaseStudy…
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utilities
server/                # SSR / API backend
shared/                # Shared types and constants
api/                   # API endpoints
drizzle/               # Database migrations
```

## Writing a New Post

1. Add the post data to the shared posts store (`shared/`).
2. Use the `PostDetail` page template for consistent editorial layout.
3. Run `npm run build` to verify the production build stays clean.

## Enosx Portfolio

| Product | URL |
| :--- | :--- |
| ENOSX AI | https://enosxai.vercel.app |
| E-commerce Hub | https://enosxtech-hub.vercel.app |
| Tech Site | https://enosxtech.vercel.app |
| Exlover Coaching | https://exlover.vercel.app |

## License

Proprietary — © 2024–2026 Enosx Technologies. All rights reserved.
