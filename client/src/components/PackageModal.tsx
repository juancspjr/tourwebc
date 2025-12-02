import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Check, Star, X } from "lucide-react";
import type { PackageData } from "./PackageCard";

interface PackageModalProps {
  package: PackageData | null;
  isOpen: boolean;
  onClose: () => void;
  onBook?: (pkg: PackageData) => void;
}

export default function PackageModal({ package: pkg, isOpen, onClose, onBook }: PackageModalProps) {
  if (!pkg) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold">{pkg.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{pkg.category}</Badge>
                {pkg.badge && (
                  <Badge className="bg-chart-2 text-white">{pkg.badge}</Badge>
                )}
                {pkg.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="text-base text-muted-foreground mt-2">
          {pkg.description}
        </DialogDescription>

        <div className="space-y-4 mt-4">
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-medium">Duración:</span>
            <span className="text-muted-foreground">{pkg.duration}</span>
          </div>

          <div className="flex items-start gap-3 text-sm">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Lugares:</span>
              <p className="text-muted-foreground mt-1">
                {pkg.locations.join(" • ")}
              </p>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Incluye:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pkg.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-end justify-between pt-6 mt-6 border-t border-border">
          <div>
            <span className="text-sm text-muted-foreground">Desde</span>
            <p className="text-3xl font-bold text-foreground">
              ${pkg.price}
              <span className="text-base font-normal text-muted-foreground"> USD</span>
            </p>
            {pkg.priceNote && (
              <span className="text-sm text-muted-foreground">{pkg.priceNote}</span>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button onClick={() => {
              onBook?.(pkg);
              onClose();
            }} data-testid="button-book-modal">
              Reservar Ahora
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
