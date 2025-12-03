import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import PackageCard from "./PackageCard";
import { Button } from "@/components/ui/button";
import { packages, categories, type PackageData } from "@/lib/packages";
import { 
  revealVariants, 
  revealFromLeftVariants, 
  cardStaggerContainerVariants, 
  cardItemVariants, 
  reducedMotionVariants 
} from "@/hooks/useRevealAnimation";

export type { PackageData };

interface PackageGridProps {
  onViewDetails?: (pkg: PackageData) => void;
  onBook?: (pkg: PackageData) => void;
}

export default function PackageGrid({ onViewDetails, onBook }: PackageGridProps) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const prefersReducedMotion = useReducedMotion();

  const filteredPackages = activeCategory === "Todos"
    ? packages
    : packages.filter((pkg) => pkg.category === activeCategory);

  const variants = prefersReducedMotion ? reducedMotionVariants : revealVariants;
  const leftVariants = prefersReducedMotion ? reducedMotionVariants : revealFromLeftVariants;
  const containerVariants = prefersReducedMotion ? reducedMotionVariants : cardStaggerContainerVariants;
  const itemVariants = prefersReducedMotion ? reducedMotionVariants : cardItemVariants;

  return (
    <section id="packages" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={variants}
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
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={leftVariants}
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

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPackages.map((pkg) => (
            <motion.div key={pkg.id} variants={itemVariants}>
              <PackageCard
                package={pkg}
                onViewDetails={onViewDetails}
                onBook={onBook}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay paquetes disponibles en esta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
