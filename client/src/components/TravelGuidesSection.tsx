import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Compass,
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useIntersectionTrigger } from "@/hooks/useScrollTrigger";
import "@/styles/scroll-animations.css";

export interface TravelGuide {
  id: string;
  titleKey: string;
  excerptKey: string;
  category: string;
  readTime: number;
  author: string;
  imageUrl?: string;
  slug: string;
}

interface TravelGuidesSectionProps {
  guides?: TravelGuide[];
}

function useSEOStructuredData(title: string, description: string, language: string) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const existingScript = document.getElementById('travel-guides-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const origin = window.location.origin;
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": title,
      "description": description,
      "url": `${origin}/#guides`,
      "inLanguage": language,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Rio Trip Vibes",
        "url": origin
      },
      "about": {
        "@type": "Thing",
        "name": "Travel Guides for Rio de Janeiro"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Rio Trip Vibes",
        "logo": {
          "@type": "ImageObject",
          "url": `${origin}/images/logo-small.png`
        }
      }
    };

    const script = document.createElement('script');
    script.id = 'travel-guides-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('travel-guides-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [mounted, title, description, language]);
}

export default function TravelGuidesSection({ guides = [] }: TravelGuidesSectionProps) {
  const { t, i18n } = useTranslation();
  const [headerRef, headerVisible] = useIntersectionTrigger({ threshold: 0.2 });
  const [contentRef, contentVisible] = useIntersectionTrigger({ threshold: 0.1, delay: 150 });

  const hasGuides = guides.length > 0;

  useSEOStructuredData(
    t('travelGuides.title'),
    t('travelGuides.subtitle'),
    i18n.language
  );

  return (
    <section 
        id="guides" 
        className="py-16 md:py-24 bg-background"
        aria-labelledby="guides-title"
        data-testid="section-travel-guides"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={headerRef}
            className={`text-center mb-12 motion-fade-in ${headerVisible ? 'visible' : ''}`}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Compass className={`w-6 h-6 text-primary motion-bounce-in motion-delay-1 ${headerVisible ? 'visible' : ''}`} />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {t('travelGuides.byOurExperts')}
              </span>
            </div>
            <h2 
              id="guides-title"
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              data-testid="text-guides-title"
            >
              {t('travelGuides.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-guides-subtitle">
              {t('travelGuides.subtitle')}
            </p>
          </div>

          <div 
            ref={contentRef}
            className={`motion-scale-in ${contentVisible ? 'visible' : ''}`}
          >
            {hasGuides ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Card 
                    key={guide.id} 
                    className="overflow-hidden hover-elevate cursor-pointer group"
                    data-testid={`card-guide-${guide.id}`}
                  >
                    {guide.imageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={guide.imageUrl} 
                          alt={t(guide.titleKey)}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {t(`travelGuides.categories.${guide.category}`)}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {guide.readTime} {t('travelGuides.readTime')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {t(guide.titleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {t(guide.excerptKey)}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground" data-testid={`text-author-${guide.id}`}>
                          {t('travelGuides.author')} {guide.author}
                        </span>
                        <span 
                          className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                          data-testid={`link-readmore-${guide.id}`}
                        >
                          {t('travelGuides.readMore')}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2 bg-muted/20" data-testid="card-guides-coming-soon">
                <CardContent className="py-16 px-8">
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <Badge variant="secondary" className="mb-4" data-testid="badge-coming-soon">
                      {t('travelGuides.comingSoon')}
                    </Badge>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {t('travelGuides.stayTuned')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('travelGuides.comingSoonText')}
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                      {Object.entries(t('travelGuides.categories', { returnObjects: true }) as Record<string, string>)
                        .filter(([key]) => key !== 'all')
                        .map(([key, value]) => (
                          <Badge 
                            key={key} 
                            variant="outline" 
                            className="text-xs"
                            data-testid={`badge-category-${key}`}
                          >
                            {value}
                          </Badge>
                        ))
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
  );
}
