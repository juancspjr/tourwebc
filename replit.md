# Rio Trip Vibes - Tourism Website

## Overview

Rio Trip Vibes is a professional tourism website dedicated to booking tours and experiences in Rio de Janeiro, Brazil. It features a variety of travel packages, including day tours, favela tours, beach excursions, trekking, boat trips, VIP yacht experiences, and helicopter tours. The platform emphasizes a tropical aesthetic, builds user trust through transparent pricing and social proof, and employs an action-oriented design to drive bookings and inquiries. The project aims to capture the vibrant essence of Rio while providing a seamless booking experience for travelers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Frameworks & Libraries**: React 18+ with TypeScript, Vite for bundling, Wouter for client-side routing, and shadcn/ui (New York style) built on Radix UI for UI components.
**State Management**: React hooks for local state; TanStack Query v5 for server state, data fetching, and caching.
**Design System**: Features a warm beige tropical theme in light mode with an HSL-based color system, Montserrat font, custom Tailwind CSS configuration, and utilizes custom CSS variables for theming.
**Key Features**: Includes a sticky header, full-width hero section with parallax, filterable package grid with individual cards featuring image carousels, detailed package modals, an infinite testimonial carousel, a general information section with reveal animations, a lead capture contact form with a quotation calculator, and a floating WhatsApp CTA.
**Animations**: Incorporates Framer Motion for cinematic scroll effects (parallax, fade-up reveals, staggered animations) with full `prefers-reduced-motion` accessibility support. A splash screen with user-interaction-based video playback is implemented.
**Performance Optimization**: Critical inline CSS in index.html eliminates black screen flash during initial load by displaying the branded gradient immediately before JavaScript loads. A critical loader element with matching gradient is removed after React mounts via requestAnimationFrame handoff in main.tsx.

### Backend Architecture

**Server**: Express.js with TypeScript on Node.js.
**Data Storage**: Utilizes an abstract `IStorage` interface with an in-memory `MemStorage` implementation, designed for future database integration.
**Development/Production**: Vite for development (HMR), Express serving pre-built static assets for production.
**API**: RESTful API structure planned under `/api`; currently, package data is managed client-side.

### Data Storage Solutions

**Database ORM**: Drizzle ORM for PostgreSQL, using the Neon serverless adapter.
**Schema**: Defined in `shared/schema.ts` with Drizzle table definitions and Zod validation.
**Migrations**: Drizzle Kit manages schema migrations.

## External Dependencies

**Database**: PostgreSQL (via Neon serverless), Drizzle ORM, `connect-pg-simple` (for session storage).
**UI/Styling**: Radix UI, Tailwind CSS, Lucide React, React Icons.
**Forms & Validation**: React Hook Form, Zod, @hookform/resolvers, Drizzle-Zod.
**Internationalization**: `i18next`, `react-i18next`, `i18next-browser-languagedetector` for 5 languages (Spanish, English, Portuguese, French, Italian).
**Third-Party Services**: WhatsApp Business API (via wa.me links), Google Fonts (Montserrat, Material Symbols), FormSubmit.co (for contact form submissions), and social media integrations (Instagram, Facebook, YouTube, TikTok).
**Development Tools**: TypeScript, Vite, esbuild, Replit plugins.

## SEO Implementation

### Build-Time SEO Pipeline
The project implements a comprehensive SEO system for optimal search engine and LLM indexing:

**Centralized SEO Manifest** (`shared/seo-manifest.ts`):
- Language-specific metadata (title, description, keywords) for all 5 supported languages
- Dynamic JSON-LD schema generators for TravelAgency, WebSite, TouristDestination, and ItemList (Tours)
- Hreflang and canonical URL generators
- OpenGraph locale mappings

**Build-Time HTML Processing** (`script/build.ts`):
- Post-processes compiled HTML with Cheerio
- Injects localized SEO tags (meta tags, JSON-LD schemas, hreflang links)
- Generates separate HTML files for each language (en.html, pt.html, fr.html, it.html)
- Automatic `dateModified` timestamps from git log

**Runtime SEO Component** (`client/src/components/SEO.tsx`):
- Uses the manifest for dynamic SEO updates during navigation
- Cleans up stale JSON-LD schemas when language changes at runtime
- Manages React Helmet for meta tag injection

### JSON-LD Schemas
Each language version includes 4 structured data schemas:
1. **TravelAgency** - Organization info, ratings, contact details
2. **WebSite** - Site name, search action, publisher
3. **TouristDestination** - Rio de Janeiro as destination
4. **ItemList** - Available tours with durations and types