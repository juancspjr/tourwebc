# Design Guidelines: Rio Tourism Professional Website

## Design Approach
**Reference-Based**: Drawing inspiration from modern travel platforms like Airbnb's visual storytelling, Booking.com's package presentation, and GetYourGuide's activity cards, combined with the vibrant energy of Rio de Janeiro.

## Core Design Principles
1. **Tropical Vibrancy**: Capture Rio's energy through bold visuals and dynamic layouts
2. **Trust & Professionalism**: Clear pricing, detailed information, and social proof
3. **Action-Oriented**: Every section guides toward booking/inquiry
4. **Visual Storytelling**: Let imagery sell the experiences

## Typography System
**Fonts**: Plus Jakarta Sans (primary) via Google Fonts
- **Hero Headlines**: 48px-72px, font-weight: 800, tracking: -0.033em
- **Section Headers**: 32px-40px, font-weight: 700, tracking: -0.015em  
- **Package Titles**: 20px-24px, font-weight: 700
- **Body Text**: 16px-18px, font-weight: 400-500, line-height: 1.6
- **Pricing**: 24px-28px, font-weight: 700
- **CTAs**: 14px-16px, font-weight: 700, uppercase tracking

## Layout System
**Spacing Scale**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Card padding: p-6
- Element gaps: gap-4 to gap-8
- Max content width: max-w-7xl for main content, max-w-3xl for text-focused sections

**Grid Patterns**:
- Package cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Feature highlights: grid-cols-2 lg:grid-cols-4
- Testimonials: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

### Navigation
- Sticky header with backdrop-blur
- Logo + site name on left
- Desktop navigation: horizontal links (Home, Paquetes, Sobre Nosotros, Contacto)
- Right-aligned WhatsApp button + primary CTA ("Reservar Ahora")
- Mobile: hamburger menu

### Hero Section (80vh)
- Full-width background image: Iconic Rio vista (Cristo Redentor or Sugarloaf Mountain)
- Dark gradient overlay (rgba(0,0,0,0.3) to rgba(0,0,0,0.6))
- Centered content: bold headline, subheadline, search/filter bar
- Floating search box with destination dropdown + date pickers

### Package Cards
- Rounded-xl cards with shadow-lg hover:shadow-2xl
- Aspect-ratio image with category badge (top-right corner)
- Card content: package title, duration icon + text, location icon + destinations, price (large, bold), inclusions checklist
- Hover effect: subtle lift (hover:-translate-y-1) + shadow enhancement
- CTA button: "Ver Detalles" or "Reservar Ahora"

### Filter System
- Pill-shaped filter buttons (rounded-full)
- Active state: filled with primary color
- Categories: Todos, Aventura, Playa, Cultural, Trilhas, Paseos en Barco, VIP
- Horizontal scroll on mobile

### Testimonials Section
- 3-column grid of review cards
- Each card: avatar image (rounded-full), name, date, 5-star rating (icon stars), review text
- Background: subtle different from main (bg-gray-50 or similar)

### Contact/Booking Form
- 2-column layout (form + contact info/map)
- Input fields: rounded-lg, border focus states with primary color
- Calendar date picker integration
- WhatsApp quick contact button with distinctive green
- Form fields: Nombre, Email, Teléfono, Paquete de Interés (dropdown), Fecha Preferida, Número de Personas, Mensaje

### Footer
- 4-column grid (desktop), stacked (mobile)
- Columns: About/Logo, Paquetes Quick Links, Contacto, Social Media
- Newsletter signup field
- Trust indicators: "Trusted by 1000+ travelers", payment icons
- Copyright + legal links

## Scroll Animations & Effects
**Subtle Professional Animations**:
- Fade-in-up for cards (opacity + translate-y) on scroll into view
- Parallax effect on hero background (slower scroll than content)
- Smooth scroll behavior for anchor links
- Lazy loading for images with fade-in
- Stagger animation for grid items (sequential reveal)

**Avoid**: Excessive parallax, distracting spin/rotate effects, or anything that slows performance

## Images
**Hero Section**: Large, high-impact image
- Primary option: Aerial view of Rio with Cristo Redentor and beaches
- Alternative: Sugarloaf Mountain at sunset

**Package Cards** (1 image each):
- Day Tour: Cristo Redentor close-up
- Favelas Tour: Colorful favela houses on hillside
- Beach Tour: Ipanema or Copacabana beach vista
- Trekking: Dois Irmãos mountain view
- Boat Tours: Crystal-clear waters of Ilha Grande
- Yacht VIP: Luxury yacht on Copacabana coast
- Helicopter: Aerial view of Rio coastline

**Additional Sections**:
- About section: Team or guide images
- Testimonials: Real customer avatars
- Instagram feed: 6-9 square images in grid

## Interactive Elements
- Icon library: Material Symbols Outlined
- All buttons include hover:scale-105 transform
- Links: hover color transition to accent color
- Form inputs: focus ring in primary color
- Cards: hover shadow + lift effect
- WhatsApp floating button (bottom-right, fixed position)

## Accessibility
- Sufficient color contrast ratios (WCAG AA minimum)
- Focus visible states for keyboard navigation
- Semantic HTML structure (header, nav, main, section, footer)
- Alt text for all images
- Form labels properly associated with inputs

## Responsive Breakpoints
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Single column on mobile, multi-column on tablet+
- Touch-friendly tap targets (min 44px)
- Hamburger menu below md breakpoint