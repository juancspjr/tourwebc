# Rio Trip Vibes - Tourism Website

## Overview

Rio Trip Vibes is a professional tourism website for booking tours and experiences in Rio de Janeiro, Brazil. The platform showcases various travel packages including day tours, favela tours, beach excursions, trekking adventures, boat trips, VIP yacht experiences, and helicopter tours. The website focuses on tropical vibrancy, trust-building through clear pricing and social proof, and action-oriented design to drive bookings and inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**December 2025:**
- Added "Info Viaje" global menu section linking to travel information
- Renamed "Informacion Importante" to "Información útil para tu viaje" with generic multi-destination content
- Updated visa info to be generic with advisor contact button
- Added currency information for multiple destinations (BRL Brazil, USD, EUR Egypt/Europe, EGP Egypt)
- Added 8 generic travel FAQs applicable to any destination
- Added "Contactar Asesor de Viaje" WhatsApp button in package detail modals
- Implemented professional scroll animation system that accounts for fixed 96px navbar height
- The useScrollAnimation hook now calculates section visibility based on the visible area below the navbar
- Updated all WhatsApp contact points to +58 414 282 3218
- Fixed TypeScript type errors in scroll animation hook
- **Cinematic scroll effects implemented (Framer Motion):**
  - useParallax hook: Uses Framer Motion useScroll/useTransform for smooth hero background parallax (y: 0-120px, scale: 1.1-1.18)
  - useRevealAnimation hook: Provides animation variants with whileInView and repeatable triggers (once: false)
  - Section titles with fade-up reveal animations (0.7-0.8s duration, easeOut curves)
  - Alternating left/right reveal on info cards with slide+opacity transitions
  - Staggered fade-in on testimonial cards (0.12s stagger)
  - No animations on package cards, contact form, or fixed menu (prioritizes CTA clarity)
  - Full prefers-reduced-motion accessibility support via useReducedMotion hook

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight React router. Single-page application with smooth scrolling navigation between sections.

**UI Component Library**: shadcn/ui (New York style) built on Radix UI primitives. Components are self-contained in `client/src/components/ui/` and use Tailwind CSS for styling with a custom design system.

**State Management**: React hooks for local state management. TanStack Query (React Query) v5 for server state management, data fetching, and caching.

**Design System**: 
- Typography: Montserrat font family (Google Fonts)
- Color palette: Warm beige travel theme in light mode with HSL-based color system
- Custom CSS variables for theming support
- Tailwind CSS with custom configuration for spacing, colors, and utilities
- Component styling follows a tropical, vibrant aesthetic per design guidelines

**Key Pages & Components**:
- Home page (`client/src/pages/Home.tsx`) - Main landing page orchestrating all sections
- Header - Sticky navigation with responsive mobile menu
- HeroSection - Full-width hero with parallax background and CTA
- PackageGrid - Filterable grid of tour packages with category filters
- PackageModal - Detailed package information dialog
- TestimonialsSection - Customer reviews with avatar cards and staggered animations
- GeneralInfoSection - Travel info with alternating reveal animations
- ContactSection - Lead capture form with package selection and quotation calculator
- Footer - Site links and social media integration
- WhatsAppButton - Floating CTA for direct WhatsApp contact

**Animation Hooks** (`client/src/hooks/`):
- `useParallax.ts` - Subtle parallax effect for hero backgrounds
- `useRevealAnimation.ts` - IntersectionObserver-based reveal animations with multiple variants

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js.

**Server Structure**:
- `server/index.ts` - Application entry point with middleware setup and request logging
- `server/routes.ts` - API route registration (currently minimal, ready for expansion)
- `server/static.ts` - Static file serving for production builds
- `server/vite.ts` - Vite integration for development with HMR support
- `server/storage.ts` - Data access layer with in-memory storage implementation

**Storage Layer**: Abstract storage interface (`IStorage`) with an in-memory implementation (`MemStorage`). Designed to be replaced with a database-backed implementation. Current implementation provides user CRUD operations as a template.

**Development vs Production**:
- Development: Vite dev server with HMR and middleware mode
- Production: Pre-built static assets served by Express
- Build process: Client built with Vite, server bundled with esbuild

**API Design**: RESTful API structure under `/api` prefix (routes to be implemented). Currently uses client-side data from `client/src/lib/packages.ts` for package information.

### Data Storage Solutions

**Database ORM**: Drizzle ORM configured for PostgreSQL with the Neon serverless adapter.

**Schema Location**: `shared/schema.ts` - Contains Drizzle table definitions and Zod validation schemas.

**Current Schema**: Basic user table with username/password authentication ready for expansion.

**Migration Strategy**: Drizzle Kit configured to generate migrations in `migrations/` directory. Uses `drizzle.config.ts` for configuration with PostgreSQL dialect.

**Environment Variables**: `DATABASE_URL` required for database connection.

### External Dependencies

**Database**: 
- PostgreSQL via Neon serverless (`@neondatabase/serverless`)
- Drizzle ORM for type-safe database queries
- Connect-pg-simple for session storage (configured but not yet implemented)

**UI Libraries**:
- Radix UI primitives for accessible components (accordion, dialog, dropdown, etc.)
- Tailwind CSS for utility-first styling
- Lucide React for icons
- React Icons (specifically SiTiktok for social media)

**Forms & Validation**:
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for integration between React Hook Form and Zod
- Drizzle-Zod for database schema validation

**Third-Party Services** (to be integrated):
- WhatsApp Business API - Direct messaging integration via wa.me links
- Google Fonts - Montserrat and Material Symbols fonts
- Social Media - Instagram, Facebook, YouTube, TikTok (links in footer)

**Development Tools**:
- TypeScript for type safety across client and server
- Vite for fast development and optimized builds
- esbuild for server bundling
- Replit plugins for development experience (cartographer, dev banner, runtime error overlay)

**Asset Management**:
- Images stored in `attached_assets/` directory
- Vite alias `@assets` for importing assets
- Generated images for package cards and hero sections
- Stock images for testimonial avatars