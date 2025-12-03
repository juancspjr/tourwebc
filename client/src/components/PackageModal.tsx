import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Check, Star, HelpCircle, Package, MessageCircle } from "lucide-react";
import type { PackageData } from "@/lib/packages";
import ImageCarousel from "./ImageCarousel";

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <DialogHeader className="relative mb-4">
            <ImageCarousel images={pkg.gallery} alt={pkg.title} />
            
            <div className="mt-4">
              <DialogTitle className="text-2xl font-bold">{pkg.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
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
          </DialogHeader>

          <DialogDescription className="text-base text-muted-foreground mt-2">
            {pkg.description}
          </DialogDescription>

          <div className="flex flex-wrap gap-4 mt-4 py-4 border-y border-border">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <span className="font-medium">Duración:</span>
                <span className="text-muted-foreground ml-1">{pkg.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <span className="font-medium">Lugares:</span>
                <span className="text-muted-foreground ml-1">{pkg.locations.length} destinos</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="includes" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="includes" className="gap-2" data-testid="tab-includes">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Qué Incluye</span>
                <span className="sm:hidden">Incluye</span>
              </TabsTrigger>
              <TabsTrigger value="locations" className="gap-2" data-testid="tab-locations">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">Destinos</span>
                <span className="sm:hidden">Lugares</span>
              </TabsTrigger>
              <TabsTrigger value="faqs" className="gap-2" data-testid="tab-faqs">
                <HelpCircle className="w-4 h-4" />
                <span>FAQ</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="includes" className="mt-4 space-y-4">
              {pkg.includes.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {section.title}
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 pl-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="locations" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.locations.map((location, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium">{location}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faqs" className="mt-4">
              <Accordion type="single" collapsible className="w-full">
                {pkg.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-sm font-medium hover:no-underline" data-testid={`faq-trigger-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col gap-4 pt-6 mt-6 border-t border-border">
            <Button 
              variant="outline"
              className="w-full gap-2"
              onClick={() => window.open("https://wa.me/584142823218?text=" + encodeURIComponent(`Hola, me interesa el paquete "${pkg.title}" y me gustaría obtener más información.`), "_blank")}
              data-testid="button-contact-advisor"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar Asesor de Viaje
            </Button>
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={onClose} data-testid="button-close-modal">
                Cerrar
              </Button>
              <Button 
                className="bg-cta hover:bg-cta/90 text-cta-foreground"
                onClick={() => {
                  onBook?.(pkg);
                  onClose();
                }} 
                data-testid="button-book-modal"
              >
                Reservar Ahora
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
