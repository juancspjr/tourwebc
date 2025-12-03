import { useState } from "react";
import { motion } from "framer-motion";
import PackageCard from "./PackageCard";
import { Button } from "@/components/ui/button";
import { packages, categories, type PackageData } from "@/lib/packages";
import { useRevealAnimation, revealVariants, revealFromLeftVariants } from "@/hooks/useRevealAnimation";

export type { PackageData };

interface PackageGridProps {
  onViewDetails?: (pkg: PackageData) => void;
  onBook?: (pkg: PackageData) => void;
}

export default function PackageGrid({ onViewDetails, onBook }: PackageGridProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { ref: headerRef, isVisible: headerVisible } = useRevealAnimation({ threshold: 0.2 });

  const filteredPackages = activeCategory === "Todos"
    ? packages
    : packages.filter((pkg) => pkg.category === activeCategory);

  return (
    <section id="packages" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={headerRef}
          initial="hidden"
          animate={headerVisible ? "visible" : "hidden"}
          variants={revealVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Nuestros Paquetes Turisticos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encuentra la aventura perfecta para ti. Desde city tours hasta experiencias exclusivas en helicoptero.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={headerVisible ? "visible" : "hidden"}
          variants={revealFromLeftVariants}
          className="flex flex-wrap justify-center gap-2 mb-10"
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onViewDetails={onViewDetails}
              onBook={onBook}
            />
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
