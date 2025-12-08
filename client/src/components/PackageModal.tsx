import { useTranslation } from "react-i18next";
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
import { Clock, MapPin, Check, Star, HelpCircle, Package, MessageCircle, CalendarCheck } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { PackageData } from "@/lib/packages";
import ImageCarousel from "./ImageCarousel";

interface PackageModalProps {
  package: PackageData | null;
  isOpen: boolean;
  onClose: () => void;
  onBook?: (pkg: PackageData) => void;
}

export default function PackageModal({ package: pkg, isOpen, onClose, onBook }: PackageModalProps) {
  const { t } = useTranslation();
  if (!pkg) return null;

  const title = t(pkg.titleKey);
  const description = t(pkg.descriptionKey);
  const duration = t(pkg.durationKey);
  const locations = pkg.locationKeys.map(key => t(key));
  const badge = pkg.badgeKey ? t(pkg.badgeKey) : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 w-[calc(100vw-2rem)] sm:w-full">
        <div className="p-4 sm:p-6 pb-24 sm:pb-6">
          <DialogHeader className="relative mb-4">
            <ImageCarousel images={pkg.gallery} alt={title} />
            
            <div className="mt-4">
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="secondary">{pkg.category}</Badge>
                {badge && (
                  <Badge className="bg-chart-2 text-white">{badge}</Badge>
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
            {description}
          </DialogDescription>

          <div className="flex flex-wrap gap-4 mt-4 py-4 border-y border-border">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <span className="font-medium">{t('packageModal.duration')}:</span>
                <span className="text-muted-foreground ml-1">{duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <span className="font-medium">{t('packageModal.locations')}:</span>
                <span className="text-muted-foreground ml-1">{locations.length} {t('packageModal.destinations')}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="includes" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="includes" className="gap-2" data-testid="tab-includes">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">{t('packageModal.whatIncludes')}</span>
                <span className="sm:hidden">{t('packageModal.includes')}</span>
              </TabsTrigger>
              <TabsTrigger value="locations" className="gap-2" data-testid="tab-locations">
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">{t('packageModal.destinationsTab')}</span>
                <span className="sm:hidden">{t('packageModal.places')}</span>
              </TabsTrigger>
              <TabsTrigger value="faqs" className="gap-2" data-testid="tab-faqs">
                <HelpCircle className="w-4 h-4" />
                <span>{t('packageModal.faq')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="includes" className="mt-4 space-y-4">
              {pkg.includes.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {t(section.titleKey)}
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 pl-4">
                    {section.itemKeys.map((itemKey, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{t(itemKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="locations" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {locations.map((location, index) => (
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
                      {t(faq.questionKey)}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {t(faq.answerKey)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>

          <div className="hidden sm:flex flex-col gap-4 pt-6 mt-6 border-t border-border">
            <Button 
              variant="outline"
              className="w-full gap-2"
              onClick={() => window.open("https://wa.me/5521983526144?text=" + encodeURIComponent(t('packageModal.whatsappMessage', { title })), "_blank")}
              data-testid="button-contact-advisor"
            >
              <MessageCircle className="w-4 h-4" />
              {t('packageModal.contactAdvisor')}
            </Button>
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={onClose} data-testid="button-close-modal">
                {t('packageModal.close')}
              </Button>
              <Button 
                className="bg-cta hover:bg-cta/90 text-cta-foreground"
                onClick={() => {
                  onBook?.(pkg);
                  onClose();
                }} 
                data-testid="button-book-modal"
              >
                {t('packageModal.bookNow')}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Action Bar - Mobile Only */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-3 flex gap-2">
          <Button 
            variant="outline"
            size="default"
            className="flex-1 gap-2"
            onClick={() => window.open("https://wa.me/5521983526144?text=" + encodeURIComponent(t('packageModal.whatsappMessage', { title })), "_blank")}
            data-testid="button-whatsapp-floating"
          >
            <SiWhatsapp className="w-4 h-4" />
            WhatsApp
          </Button>
          <Button 
            size="default"
            className="flex-1 gap-2 bg-cta hover:bg-cta/90 text-cta-foreground"
            onClick={() => {
              onBook?.(pkg);
              onClose();
            }} 
            data-testid="button-book-floating"
          >
            <CalendarCheck className="w-4 h-4" />
            {t('packageModal.bookNow')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
