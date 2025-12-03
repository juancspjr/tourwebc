import { useRef, useEffect, useState, useCallback } from "react";
import TestimonialCard, { type TestimonialData } from "./TestimonialCard";
import avatar1 from "@assets/stock_images/professional_headsho_dc765f4a.jpg";
import avatar2 from "@assets/stock_images/professional_headsho_190f41fe.jpg";
import avatar3 from "@assets/stock_images/professional_headsho_15c8265b.jpg";

const testimonials: TestimonialData[] = [
  {
    id: "1",
    name: "Maria Garcia",
    avatar: avatar1,
    date: "Noviembre 2024",
    rating: 5,
    text: "Una experiencia increible! El guia fue muy profesional y conocedor. El tour al Cristo Redentor y Pan de Azucar supero todas mis expectativas. Recomiendo 100%.",
    tour: "Day Tour Rio de Janeiro",
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    avatar: avatar2,
    date: "Octubre 2024",
    rating: 5,
    text: "El trekking a Pedra da Gavea fue desafiante pero las vistas son impresionantes. El guia nos cuido todo el tiempo y nos enseno sobre la flora local. Volvere por mas aventuras!",
    tour: "Trilhas & Trekking",
  },
  {
    id: "3",
    name: "Ana Martinez",
    avatar: avatar3,
    date: "Septiembre 2024",
    rating: 5,
    text: "El paseo en yate fue espectacular! Vimos el atardecer desde el mar con Copacabana de fondo. Perfecto para celebrar nuestro aniversario. La tripulacion fue muy atenta.",
    tour: "Paseo en Yate VIP",
  },
];

type AnimState = "initial" | "enter" | "exit";

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  const [headerState, setHeaderState] = useState<AnimState>("initial");
  const [gridState, setGridState] = useState<AnimState>("initial");
  const [badgeState, setBadgeState] = useState<AnimState>("initial");

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setHeaderState("enter");
      setGridState("enter");
      setBadgeState("enter");
      return;
    }

    const createObserver = (
      setState: (state: AnimState) => void,
      threshold: number,
      rootMargin: string
    ) => {
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setState("enter");
            } else {
              const boundingRect = entry.boundingClientRect;
              const isAboveViewport = boundingRect.bottom < 0;
              if (isAboveViewport) {
                setState("exit");
              } else {
                setState("initial");
              }
            }
          });
        },
        { threshold, rootMargin }
      );
    };

    const headerObserver = createObserver(setHeaderState, 0.3, "0px 0px -50px 0px");
    const gridObserver = createObserver(setGridState, 0.1, "0px 0px -80px 0px");
    const badgeObserver = createObserver(setBadgeState, 0.5, "0px");

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);
    if (badgeRef.current) badgeObserver.observe(badgeRef.current);

    return () => {
      headerObserver.disconnect();
      gridObserver.disconnect();
      badgeObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  const getStateClass = (state: AnimState, variant: "full" | "soft" = "full") => {
    if (prefersReducedMotion()) return "";
    const baseClass = variant === "full" ? "scroll-item-full" : "scroll-item-soft";
    const stateClass = state === "enter" 
      ? "scroll-item-enter" 
      : state === "exit" 
        ? "scroll-item-exit" 
        : "scroll-item-initial";
    return `${baseClass} ${stateClass}`;
  };

  const getStaggerStyle = (index: number) => {
    if (prefersReducedMotion()) return {};
    return {
      "--stagger-delay": `${index * 0.1}s`,
      transitionDelay: `${index * 0.1}s`,
    } as React.CSSProperties;
  };

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-card scroll-perspective"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12">
          <h2 
            className={`text-3xl sm:text-4xl font-bold text-foreground mb-4 ${getStateClass(headerState)}`}
            style={getStaggerStyle(0)}
          >
            Lo Que Dicen Nuestros Viajeros
          </h2>
          <p 
            className={`text-muted-foreground max-w-2xl mx-auto ${getStateClass(headerState)}`}
            style={getStaggerStyle(1)}
          >
            Historias reales de personas que exploraron Rio con nosotros. 
            Mas de 1,000 viajeros felices nos respaldan.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${getStateClass(gridState)} scroll-card-lift`}
              style={getStaggerStyle(index)}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <div ref={badgeRef} className="text-center mt-12">
          <div 
            className={`inline-flex items-center gap-2 bg-background rounded-full px-6 py-3 shadow-sm ${getStateClass(badgeState)}`}
            style={getStaggerStyle(0)}
          >
            <div className="flex -space-x-2">
              {testimonials.map((t) => (
                <img
                  key={t.id}
                  src={t.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-background"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              +1,000 viajeros satisfechos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
