import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Check, Star } from "lucide-react";
import type { PackageData } from "@/lib/packages";
import PackageImageCarousel from "./PackageImageCarousel";

export type { PackageData };

interface PackageCardProps {
  package: PackageData;
  onViewDetails?: (pkg: PackageData) => void;
  onBook?: (pkg: PackageData) => void;
}

export default function PackageCard({ package: pkg, onViewDetails, onBook }: PackageCardProps) {
  const hasMultipleImages = pkg.images && pkg.images.length > 1;

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        {hasMultipleImages ? (
          <PackageImageCarousel
            images={pkg.images}
            packageTitle={pkg.title}
            onImageClick={() => onViewDetails?.(pkg)}
          />
        ) : (
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
            onClick={() => onViewDetails?.(pkg)}
          />
        )}
        {pkg.badge && (
          <Badge className="absolute top-3 right-3 bg-chart-2 text-white z-20">
            {pkg.badge}
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
          {pkg.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {pkg.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{pkg.locations.join(", ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.highlights.slice(0, 3).map((highlight, index) => (
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
            Detalles
          </Button>
          <Button
            size="sm"
            className="bg-cta hover:bg-cta/90 text-cta-foreground"
            onClick={() => onBook?.(pkg)}
            data-testid={`button-book-${pkg.id}`}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
