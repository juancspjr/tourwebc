import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, User, X, MessageCircle } from "lucide-react";

interface TravelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideId: string | null;
}

interface GuideContent {
  title: string;
  excerpt?: string;
  author: string;
  role: string;
  intro: string;
  sections: Array<{ title: string; content: string }>;
  conclusion?: { title: string; content: string };
}

const categoryMap: Record<string, string> = {
  'carnival-rio': 'carnival',
  'world-travel': 'world',
  'caribbean-budget': 'caribbean',
  'rio-soul': 'rio',
  'agency-value': 'agency'
};

const readTimeMap: Record<string, number> = {
  'carnival-rio': 8,
  'world-travel': 10,
  'caribbean-budget': 9,
  'rio-soul': 10,
  'agency-value': 8
};

export default function TravelGuideModal({ isOpen, onClose, guideId }: TravelGuideModalProps) {
  const { t } = useTranslation();

  if (!guideId || !isOpen) return null;

  const rawContent = t(`travelGuides.articles.${guideId}`, { returnObjects: true });
  
  const isValidContent = typeof rawContent === 'object' && 
    rawContent !== null && 
    'title' in rawContent &&
    'sections' in rawContent;
  
  const guideContent: GuideContent = isValidContent
    ? rawContent as GuideContent
    : {
        title: t(`travelGuides.articles.${guideId}.title`, ''),
        author: t(`travelGuides.articles.${guideId}.author`, ''),
        role: t(`travelGuides.articles.${guideId}.role`, ''),
        intro: t(`travelGuides.articles.${guideId}.intro`, ''),
        sections: [],
        conclusion: undefined
      };

  const categoryKey = categoryMap[guideId] || 'tips';
  const readTime = readTimeMap[guideId] || 5;
  const sections = Array.isArray(guideContent.sections) ? guideContent.sections : [];

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      t('travelGuides.whatsappMessage', { title: guideContent.title })
    );
    window.open(`https://wa.me/5521964316322?text=${message}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] p-0 overflow-hidden"
        data-testid="modal-travel-guide"
      >
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary" data-testid={`badge-category-${guideId}`}>
                  {t(`travelGuides.articleCategories.${categoryKey}`)}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {readTime} {t('travelGuides.readTime')}
                </span>
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground leading-tight" data-testid={`text-guide-title-${guideId}`}>
                {guideContent.title || 'Loading...'}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {guideContent.excerpt || t('travelGuides.subtitle')}
              </DialogDescription>
              {guideContent.author && (
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{t('travelGuides.author')} <strong>{guideContent.author}</strong></span>
                  {guideContent.role && <span className="text-xs">- {guideContent.role}</span>}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0"
              data-testid="button-close-guide-modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 max-h-[calc(90vh-180px)]">
          <article className="px-6 py-6 prose prose-slate dark:prose-invert max-w-none">
            {guideContent.intro && (
              <p 
                className="text-lg leading-relaxed text-foreground mb-6"
                dangerouslySetInnerHTML={{ __html: guideContent.intro }}
              />
            )}

            {sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-3 border-l-4 border-primary pl-4">
                  {section.title}
                </h3>
                <p 
                  className="text-base leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </section>
            ))}

            {guideContent.conclusion && (
              <section className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {guideContent.conclusion.title}
                </h3>
                <p 
                  className="text-base leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: guideContent.conclusion.content }}
                />
              </section>
            )}
          </article>
        </ScrollArea>

        <div className="sticky bottom-0 bg-background border-t px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button 
              onClick={handleWhatsAppContact}
              className="w-full sm:w-auto gap-2"
              data-testid="button-guide-whatsapp"
            >
              <MessageCircle className="w-4 h-4" />
              {t('travelGuides.contactAdvisor')}
            </Button>
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              {t('travelGuides.ctaText')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
