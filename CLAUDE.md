# Kalabi - Meble na wymiar

## Project Overview
Modern furniture company website built with **Next.js 16** + **Payload CMS 3.80** + **MongoDB**. Inspired by meblebrewczak.pl. Content managed via Payload admin panel. Deployed on VPS via Docker.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Server Components)
- **CMS**: Payload CMS 3.80 (Local API, Lexical rich text)
- **Database**: MongoDB with Mongoose adapter
- **Styling**: Tailwind CSS v4 (CSS-first config, no tailwind.config.js)
- **Animations**: Framer Motion
- **Fonts**: Inter (body) + Playfair Display (headings) via next/font/google
- **Language**: Polish (pl)

## Architecture

### Route Groups
- `(frontend)` - Public-facing pages with shared layout (Header, Footer, PageTransition)
- `(payload)` - Payload CMS admin panel and API routes

### Collections (src/collections/)
Users, Media, Pages, Projects, ProjectCategories, Services, Testimonials, ContactSubmissions

### Globals (src/globals/)
Header, Footer, SiteSettings, HomePage

### Component Structure
```
src/components/
├── layout/    # Header, NavBar, Footer, PageTransition
├── sections/  # Hero, AboutPreview, ServicesGrid, FeaturedProjects, CtaBanner, TestimonialsSlider, ContactForm
├── ui/        # Button, SectionHeading, ProjectCard, ServiceCard, TestimonialCard, ScrollReveal, Container
└── media/     # PayloadImage (next/image wrapper)
```

## Color Palette
| Token      | Hex     | Usage                        |
|------------|---------|------------------------------|
| primary    | #1a1a1a | Dark text, dark backgrounds  |
| secondary  | #6b5b3e | Warm bronze/walnut accent    |
| accent     | #c9a96e | Gold - CTAs, highlights      |
| background | #faf9f6 | Off-white warm background    |
| surface    | #ffffff | Cards, surfaces              |
| muted      | #9a9a9a | Secondary text               |
| border     | #e8e5e0 | Subtle borders               |

Colors defined in `src/app/(frontend)/styles.css` via `@theme`.

## Coding Rules
- **No inline styles** - use Tailwind utility classes exclusively
- **Always use `next/image`** via `PayloadImage` wrapper for CMS media
- **Mobile-first** - write mobile styles first, use `sm:`, `md:`, `lg:` for larger screens
- **Server Components by default** - only add `'use client'` when needed (interactivity, hooks)
- **Payload Local API** - use `getPayload({ config })` for server-side data fetching, no REST calls
- **Polish language** - all user-facing text in Polish

## Commands
- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm generate:types` - Regenerate Payload TypeScript types
- `pnpm generate:importmap` - Regenerate Payload import map
- `docker compose up --build` - Production Docker
- `docker compose -f docker-compose.dev.yml up` - Dev Docker

## Docker
- Production: `docker-compose.yml` (builds from Dockerfile, standalone output)
- Development: `docker-compose.dev.yml` (mounts volume, runs pnpm dev)
- MongoDB: mongo:7

## Session Learnings

### Session 1 (2026-03-26)
- **Default content fallbacks**: All sections use `defaultFooter`, `defaultNavItems`, etc. from `src/lib/defaults.ts` so the site renders fully even with empty CMS
- **Placeholder images**: SVG placeholders in `public/images/` for each section (hero, about, kitchen, wardrobe, bathroom, living, office, cta)
- **Type safety with defaults**: When mixing Payload types with default objects, use `'prop' in obj && obj.prop` pattern to avoid TS errors (e.g., `newTab` property not in defaults)
- **Env var**: Use `DATABASE_URL` everywhere (not `DATABASE_URI`) - matches Payload config
- **Logo**: `/public/logo.png` is the primary logo, `/public/logo.svg` also available
- **Build**: Successful production build with all pages static-rendered. OG image route uses edge runtime (expected warning)
- **Navbar**: Single client component `NavBar.tsx` handles everything (scroll state, logo inversion, desktop nav, full-screen mobile menu). Server component `Header.tsx` fetches data and passes props. No separate MobileMenu/HeaderScroll. Logo uses Tailwind `invert` class toggle, not CSS filters on `data-*` attributes. Mobile menu is full-screen overlay, not a slide-out panel.
- **Social icons**: Footer uses `SocialIcon` component (`src/components/ui/SocialIcon.tsx`) with SVG icons for facebook, instagram, pinterest, linkedin, youtube
