import { useState, useRef, useEffect, useCallback } from "react";
import PackageCard from "./PackageCard";
import { Button } from "@/components/ui/button";
import { packages, categories, type PackageData } from "@/lib/packages";

export type { PackageData };

interface PackageGridProps {
  onViewDetails?: (pkg: PackageData) => void;
  onBook?: (pkg: PackageData) => void;
}

type AnimState = "initial" | "enter" | "exit";

export default function PackageGrid({ onViewDetails, onBook }: PackageGridProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [headerState, setHeaderState] = useState<AnimState>("initial");
  const [gridState, setGridState] = useState<AnimState>("initial");

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setHeaderState("enter");
      setGridState("enter");
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

    const headerObserver = createObserver(setHeaderState, 0.2, "0px 0px -50px 0px");
    const gridObserver = createObserver(setGridState, 0.05, "0px 0px -80px 0px");

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (gridRef.current) gridObserver.observe(gridRef.current);

    return () => {
      headerObserver.disconnect();
      gridObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  const filteredPackages = activeCategory === "Todos"
    ? packages
    : packages.filter((pkg) => pkg.category === activeCategory);

  const getHeaderClass = (index: number) => {
    if (prefersReducedMotion()) return "";
    const baseClass = "scroll-item-full";
    const stateClass = headerState === "enter" 
      ? "scroll-item-enter" 
      : headerState === "exit" 
        ? "scroll-item-exit" 
        : "scroll-item-initial";
    return `${baseClass} ${stateClass}`;
  };

  const getGridItemClass = () => {
    if (prefersReducedMotion()) return "";
    const baseClass = "scroll-item-full";
    const stateClass = gridState === "enter" 
      ? "scroll-item-enter" 
      : gridState === "exit" 
        ? "scroll-item-exit" 
        : "scroll-item-initial";
    return `${baseClass} ${stateClass}`;
  };

  const getStaggerStyle = (index: number) => {
    if (prefersReducedMotion()) return {};
    return {
      "--stagger-delay": `${index * 0.08}s`,
      transitionDelay: `${index * 0.08}s`,
    } as React.CSSProperties;
  };

  return (
    <section 
      id="packages" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-background scroll-perspective"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12">
          <h2 
            className={`text-3xl sm:text-4xl font-bold text-foreground mb-4 ${getHeaderClass(0)}`}
            style={getStaggerStyle(0)}
          >
            Nuestros Paquetes Turisticos
          </h2>
          <p 
            className={`text-muted-foreground max-w-2xl mx-auto ${getHeaderClass(1)}`}
            style={getStaggerStyle(1)}
          >
            Encuentra la aventura perfecta para ti. Desde city tours hasta experiencias exclusivas en helicoptero.
          </p>
        </div>

        <div 
          ref={filtersRef}
          className={`flex flex-wrap justify-center gap-2 mb-10 ${getHeaderClass(2)}`}
          style={getStaggerStyle(2)}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
              data-testid={`filter-${category.toLowerCase().replace(" ", "-")}`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`${getGridItemClass()} scroll-card-lift`}
              style={getStaggerStyle(index)}
            >
              <PackageCard
                package={pkg}
                onViewDetails={onViewDetails}
                onBook={onBook}
              />
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay paquetes disponibles en esta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
