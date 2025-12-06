import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PackageCard from "./PackageCard";
import { Button } from "@/components/ui/button";
import { packages, categories, type PackageData } from "@/lib/packages";
import { useStaggeredAnimation } from "@/hooks/useScrollTrigger";
import "@/styles/scroll-animations.css";

export type { PackageData };

interface PackageGridProps {
  onViewDetails?: (pkg: PackageData) => void;
  onBook?: (pkg: PackageData) => void;
}

export default function PackageGrid({ onViewDetails, onBook }: PackageGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const { t } = useTranslation();

  const filteredPackages = activeCategory === "all"
    ? packages
    : packages.filter((pkg) => pkg.category === activeCategory);

  const { containerRef, isItemVisible } = useStaggeredAnimation(filteredPackages.length, 0, 100);

  return (
    <section id="packages" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('packages.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
              data-testid={`filter-${category}`}
            >
              {t(`categories.${category}`)}
            </Button>
          ))}
        </div>

        <div 
          ref={containerRef}
          className="packages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPackages.map((pkg, index) => (
            <div 
              key={pkg.id} 
              className={`package-card motion-scale-in motion-card-hover ${isItemVisible(index) ? 'visible' : ''}`}
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
            <p className="text-muted-foreground">{t('packages.noPackages')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
