import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Check, Star } from "lucide-react";
import type { PackageData } from "@/lib/packages";
import PackageImageCarousel from "./PackageImageCarousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getLqipUrl } from "@/lib/lqip";

export type { PackageData };

interface ProgressivePackageImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const ProgressivePackageImage = memo(function ProgressivePackageImage({
  src,
  alt,
  onClick,
}: ProgressivePackageImageProps) {
  const lqipSrc = getLqipUrl(src);

  return (
    <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={onClick}>
      <LazyLoadImage
        src={src}
        alt={alt}
        effect="blur"
        placeholderSrc={lqipSrc || undefined}
        width="100%"
        height="100%"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        wrapperClassName="w-full h-full"
        threshold={200}
      />
    </div>
  );
});

interface PackageCardProps {
  package: PackageData;
  onViewDetails?: (pkg: PackageData) => void;
  onBook?: (pkg: PackageData) => void;
}

export default function PackageCard({ package: pkg, onViewDetails, onBook }: PackageCardProps) {
  const hasMultipleImages = pkg.images && pkg.images.length > 1;
  const { t } = useTranslation();

  const title = t(pkg.titleKey);
  const description = t(pkg.descriptionKey);
  const duration = t(pkg.durationKey);
  const locations = pkg.locationKeys.map(key => t(key));
  const highlights = pkg.highlightKeys.map(key => t(key));
  const badge = pkg.badgeKey ? t(pkg.badgeKey) : undefined;

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        {hasMultipleImages ? (
          <PackageImageCarousel
            images={pkg.images}
            packageTitle={title}
            onImageClick={() => onViewDetails?.(pkg)}
          />
        ) : (
          <ProgressivePackageImage
            src={pkg.image}
            alt={title}
            onClick={() => onViewDetails?.(pkg)}
          />
        )}
        {badge && (
          <Badge className="absolute top-3 right-3 bg-chart-2 text-white z-20">
            {badge}
          </Badge>
        )}
        <div className="absolute top-3 left-3 z-20">
          <Badge variant="secondary" className="bg-black/60 text-white border-0">
            {pkg.category}
          </Badge>
        </div>
        {pkg.rating && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1 z-20">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-white font-medium">{pkg.rating}</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{locations.join(", ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {highlights.slice(0, 3).map((highlight, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground"
            >
              <Check className="w-3 h-3 text-primary" />
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(pkg)}
            data-testid={`button-details-${pkg.id}`}
          >
            {t('packages.details')}
          </Button>
          <Button
            size="sm"
            className="bg-cta hover:bg-cta/90 text-cta-foreground"
            onClick={() => onBook?.(pkg)}
            data-testid={`button-book-${pkg.id}`}
          >
            {t('packages.book')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
