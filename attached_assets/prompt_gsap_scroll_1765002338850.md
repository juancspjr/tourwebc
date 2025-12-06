# Prompt: Implementar GSAP ScrollTrigger Premium con Optimización Lighthouse 95+

## Objetivo Principal
Elevar el nivel visual de la web de tour de viajes (tourwebc) a nivel **premium enterprise** usando GSAP ScrollTrigger combinado con Intersection Observer nativo, manteniendo **Lighthouse score 95+** en todas las métricas (Performance, Accessibility, Best Practices, SEO).

---

## Contexto del Proyecto

**Stack Actual:**
- React 18.3 + TypeScript
- Vite como bundler
- Tailwind CSS v3.4
- Radix UI components
- Framer Motion (ya incluido)
- Target: Turismo premium / Tour travel website

**Arquitectura:**
- `/client/src/pages/Home.tsx` - Componente principal con lazy loading
- `/client/src/components/` - Componentes específicos (Hero, PackageGrid, ContactSection, etc.)
- `/client/src/index.css` - Estilos base con soporte Light/Dark mode
- Deployed en: `a42a1227.tourwebc.pages.dev`

---

## Estrategia de Animación: Hybrid Approach

### Premisa Clave
**No es GSAP puro vs CSS puro.** Es la **combinación estratégica:**
- ✅ **Intersection Observer nativo** para detectar entradas en viewport
- ✅ **CSS puro** (`transform`, `opacity`, `clip-path`) para animaciones declarativas
- ✅ **GSAP ScrollTrigger** solo para efectos complejos que lo justifiquen (parallax avanzado, timelines coordinadas)
- ✅ **Lazy Loading** de GSAP solo cuando sea necesario (scroll trigger activado)

### Razón Técnica
- Intersection Observer + CSS = cero JavaScript en memoria para anims simples
- GSAP ScrollTrigger lazy-loaded = carga bajo demanda
- Resultado = Performance score 95+ + UX premium

---

## Especificaciones de Implementación

### 1. Instalación y Configuración

```bash
# Agregar GSAP (core + ScrollTrigger plugin)
npm install gsap

# No agregar heavy bundles - solo ScrollTrigger plugin cuando se use
```

**Archivo: `client/src/hooks/useScrollTrigger.ts`**
```typescript
// Hook lazy que inicializa GSAP ScrollTrigger solo cuando es necesario
// - Detecta si el elemento está en viewport antes de cargar GSAP
// - Usa IntersectionObserver para trigger inicial
// - Carga GSAP dinamicamente solo si scroll-trigger es requerido
```

---

### 2. Efectos a Implementar (Priorizado por Impacto Visual)

#### **Nivel 1: Intersection Observer + CSS (0 KB JS)**
*Implementar en: HeroSection, PackageGrid, GeneralInfoSection*

- **Fade-in de secciones:** `opacity 0 → 1` con delay escalonado
- **Slide-up de cards:** `translateY(60px) → 0` + fade
- **Stagger de elementos:** Efecto cascada en listas/grillas
- **Scale-on-scroll:** Hover subtle elevation effect

**CSS Pattern:**
```css
.section-animate {
  opacity: 0;
  transform: translateY(60px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.section-animate.visible {
  opacity: 1;
  transform: translateY(0);
}
```

#### **Nivel 2: GSAP ScrollTrigger (Lazy-Loaded)**
*Implementar en: ImageCarousel, PackageCards (efecto premium)*

- **Parallax de imágenes:** Movimiento vertical diferencial al scroll
- **Reveal con clip-path:** Desenmascarar imágenes progresivamente
- **Stagger coordinado:** Timeline sincronizada de múltiples elementos
- **Number counter animation:** Efecto de contador para estadísticas

**Pattern GSAP:**
```typescript
// Solo cargar GSAP si el elemento visible triggerea scroll effect
gsap.registerPlugin(ScrollTrigger);

gsap.to(".image-parallax", {
  scrollTrigger: {
    trigger: ".image-parallax",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1, // Smooth scrubbing (light performance hit)
    markers: false // Disable in production
  },
  y: -100,
  duration: 1
});
```

---

### 3. Secciones Específicas a Optimizar

#### **Hero Section**
- Background pattern subtle parallax
- Title text fade-in con stagger por letra/palabra
- CTA button scale + glow effect on scroll-into-view
- **Performance:** CSS animations solo

#### **Package Grid**
- Card entrance stagger (Intersection Observer)
- Card hover elevation + shadow depth
- Image parallax on scroll (GSAP - lazy load)
- **Performance:** 80% CSS + 20% GSAP lazy

#### **Testimonial Carousel**
- Infinite scroll with smooth opacity transitions
- Rating stars progressive fill animation
- **Performance:** CSS animations + Embla carousel existing logic

#### **General Info Section**
- Section title animation on scroll
- Icon animations (bounce, rotate) - Intersection Observer trigger
- Stats counter (GSAP counter plugin - optional)
- **Performance:** Mix Intersection + CSS

#### **Contact Section**
- Form field entrance animations
- Success message reveal with bounce
- Input focus animations
- **Performance:** CSS transitions + minimal JS

---

### 4. Arquitectura de Componentes

**Patrón React Recomendado:**

```typescript
// Pattern 1: Intersection Observer Hook
export function useIntersectionTrigger(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
}

// Pattern 2: GSAP ScrollTrigger Lazy Hook (Solo cargar si isVisible)
export function useGSAPScrollTrigger(isVisible: boolean, animationFn: () => void) {
  useEffect(() => {
    if (!isVisible) return;

    // Cargar GSAP dinámicamente
    import('gsap/dist/ScrollTrigger').then(({ default: ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      animationFn();
    });
  }, [isVisible, animationFn]);
}
```

---

### 5. Optimizaciones Críticas para Lighthouse 95+

#### **Performance (Core Web Vitals)**

✅ **LCP (Largest Contentful Paint):** < 2.5s
- Lazy load GSAP solo cuando se necesite
- Pre-load críticas imágenes (Hero section)
- Usar `loading="lazy"` en imágenes no-critical
- Implementar image optimization (Sharp ya disponible en stack)

✅ **FID (First Input Delay):** < 100ms
- No bloquear main thread con animaciones
- Usar `will-change: transform` para GPU acceleration
- Debounce scroll listeners

✅ **CLS (Cumulative Layout Shift):** < 0.1
- Reservar espacio para imágenes (aspect-ratio containers)
- Evitar inyección de estilos que reflow el DOM
- Test con DevTools Lighthouse

#### **CSS Optimization**

```css
/* GPU Acceleration - Crítico para 60fps */
.animate-element {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-element {
    animation: none !important;
    transition: none !important;
  }
}

/* Use transform + opacity only (no top/left/width/height changes) */
.parallax {
  transform: translateY(var(--scroll-offset));
}
```

#### **Bundle Size**

- GSAP core: ~32 KB gzipped (lazy load)
- ScrollTrigger plugin: ~12 KB gzipped (lazy load)
- Total impact: ~0 KB initial, +44 KB on demand

#### **JavaScript Optimization**

```typescript
// Debounce scroll handlers
const useThrottledScroll = (callback: () => void, delay = 16) => {
  const lastRun = useRef(Date.now());
  
  useEffect(() => {
    const handler = () => {
      if (Date.now() - lastRun.current >= delay) {
        callback();
        lastRun.current = Date.now();
      }
    };
    
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [callback, delay]);
};
```

---

### 6. Implementation Checklist

**Fase 1: Setup Base (1-2 días)**
- [ ] Instalar GSAP
- [ ] Crear `useIntersectionTrigger` hook
- [ ] Crear `useGSAPScrollTrigger` hook con lazy loading
- [ ] Configurar CSS animations base

**Fase 2: Intersection Observer + CSS (3-4 días)**
- [ ] Implementar en HeroSection
- [ ] Implementar en PackageGrid
- [ ] Implementar en GeneralInfoSection
- [ ] Implementar en ContactSection
- [ ] Test Lighthouse Performance

**Fase 3: GSAP ScrollTrigger (4-5 días)**
- [ ] Parallax en ImageCarousel
- [ ] Clip-path reveals en Package cards
- [ ] Timeline effects en testimonials
- [ ] Counter animations (si aplica)
- [ ] Test LCP/FID/CLS metrics

**Fase 4: Refinement & Polish (2-3 días)**
- [ ] Mobile responsiveness testing
- [ ] Dark mode compatibility
- [ ] Accessibility audit (keyboard nav, focus states)
- [ ] Cross-browser testing
- [ ] Final Lighthouse 95+ validation

---

### 7. Ejemplos de Código (Copy-Paste Ready)

#### **HeroSection con Intersection Observer**
```typescript
// client/src/components/HeroSection.tsx
import { useIntersectionTrigger } from '@/hooks/useScrollTrigger';

export default function HeroSection({ onExploreClick }: Props) {
  const [titleRef, isTitleVisible] = useIntersectionTrigger({ threshold: 0.5 });
  
  return (
    <section ref={titleRef} className="relative h-screen flex items-center">
      <h1 className={`text-4xl transition-all duration-700 ${
        isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        Explora el Paraíso
      </h1>
    </section>
  );
}
```

#### **PackageCard con Stagger (CSS)**
```css
.package-card {
  opacity: 0;
  transform: translateY(40px);
  animation: slideUp 0.6s ease-out forwards;
}

.package-card:nth-child(1) { animation-delay: 0s; }
.package-card:nth-child(2) { animation-delay: 0.15s; }
.package-card:nth-child(3) { animation-delay: 0.3s; }
.package-card:nth-child(4) { animation-delay: 0.45s; }

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### **Parallax con GSAP (Lazy Load)**
```typescript
import { useGSAPScrollTrigger } from '@/hooks/useScrollTrigger';

export function ParallaxImage() {
  const [ref, isVisible] = useIntersectionTrigger();
  
  useGSAPScrollTrigger(isVisible, () => {
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top center",
        scrub: 1
      },
      y: -100
    });
  });

  return <img ref={ref} src="..." alt="..." />;
}
```

---

### 8. Testing & Metrics

**Lighthouse Targets:**
```
Performance:  95+  (LCP: <2.5s, FID: <100ms, CLS: <0.1)
Accessibility: 95+ (WCAG AA compliance)
Best Practices: 95+
SEO: 95+
```

**Tools:**
- Chrome DevTools Lighthouse
- WebPageTest.org (free tier)
- GTmetrix (advanced)
- Bundle analyzer: `vite-plugin-compression`

**Mobile Testing:**
- Test en Android Chrome + iOS Safari
- Emular throttling (Slow 4G)
- Check touch targets (min 44x44px)

---

### 9. Design Philosophy: "Subtle Premium"

**NO hacer:**
- ❌ Animaciones excesivas o lentas (>0.8s)
- ❌ Efectos que compitan por atención (parallax + fade simultáneo)
- ❌ Transiciones que causen CLS
- ❌ Auto-play que no respete `prefers-reduced-motion`

**SÍ hacer:**
- ✅ Animaciones de 0.6-0.8s (natural)
- ✅ Easing que siga motion principles (ease-out para entrance)
- ✅ Efectos que guíen atención sin distraer
- ✅ Accessibility-first (focus visible, keyboard nav)

---

## Entregables Finales

1. **`client/src/hooks/useScrollTrigger.ts`** - Hooks reutilizables
2. **`client/src/styles/animations.css`** - CSS animations library
3. **Componentes actualizados** con animaciones integradas
4. **README.md** con guía de uso para otros devs
5. **Lighthouse report** validando 95+ en todas las métricas

---

## Referencias & Resources

- **GSAP Docs:** https://gsap.com/docs/
- **ScrollTrigger Guide:** https://gsap.com/docs/plugins/ScrollTrigger/
- **Intersection Observer API:** https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- **Web Vitals:** https://web.dev/vitals/
- **Framer Motion Comparison:** Ya tienes motion library, GSAP es para scroll-specific

---

## Notas Importantes

⚠️ **GSAP Licensing:**
- Version gratuita para efectos ScrollTrigger normales
- No requiere licencia comercial para web pública
- Verificar terms si se usa en producto/SaaS cerrado

⚠️ **Compatibility:**
- Todos los navegadores modernos soportan Intersection Observer
- Fallback automático en GSAP para older browsers
- Test en IE11 si es requisito (unlikely para travel site)

⚠️ **Performance Monitoring:**
- Usar performance.mark() / performance.measure() en desarrollo
- Monitorear PerformanceObserver para animations
- A/B test: with animations vs without (métrica real)

---

**Esta es tu hoja de ruta. ¡Implementa con confianza manteniendo el 95+ de Lighthouse!**
