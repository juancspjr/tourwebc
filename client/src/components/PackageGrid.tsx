import { useState } from "react";
import PackageCard from "./PackageCard";
import { Button } from "@/components/ui/button";
import { packages, categories, type PackageData } from "@/lib/packages";
import { useScrollAnimation, getStaggerStyle } from "@/hooks/useScrollAnimation";

export type { PackageData };

interface PackageGridProps {
  onViewDetails?: (pkg: PackageData) => void;
  onBook?: (pkg: PackageData) => void;
}

export default function PackageGrid({ onViewDetails, onBook }: PackageGridProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const [sectionRef, scrollState] = useScrollAnimation<HTMLElement>({
    intensity: "full",
  });

  const filteredPackages = activeCategory === "Todos"
    ? packages
    : packages.filter((pkg) => pkg.category === activeCategory);

  const totalStaggerItems = filteredPackages.length + 3;
  const { prefersReducedMotion, progress } = scrollState;

  return (
    <section 
      id="packages" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-background scroll-perspective"
    >
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={scrollState.containerStyle}
      >
        <div 
          className="text-center mb-12"
          style={scrollState.innerStyle}
        >
          <h2 
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            style={getStaggerStyle(progress, 0, totalStaggerItems, prefersReducedMotion)}
          >
            Nuestros Paquetes Turisticos
          </h2>
          <p 
            className="text-muted-foreground max-w-2xl mx-auto"
            style={getStaggerStyle(progress, 1, totalStaggerItems, prefersReducedMotion)}
          >
            Encuentra la aventura perfecta para ti. Desde city tours hasta experiencias exclusivas en helicoptero.
          </p>
        </div>

        <div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          style={getStaggerStyle(progress, 2, totalStaggerItems, prefersReducedMotion)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="scroll-card-premium"
              style={getStaggerStyle(progress, index + 3, totalStaggerItems, prefersReducedMotion)}
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
