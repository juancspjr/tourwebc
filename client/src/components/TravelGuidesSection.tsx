import { useEffect, useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Compass,
  Clock,
  ArrowRight,
  User,
  PartyPopper,
  Globe,
  Palmtree,
  Heart,
  Building2
} from "lucide-react";
import { useIntersectionTrigger } from "@/hooks/useScrollTrigger";
import "@/styles/scroll-animations.css";
import { travelGuidesData, type TravelGuideArticle } from "@/lib/travelGuidesData";

const TravelGuideModal = lazy(() => import("@/components/TravelGuideModal"));

function useSEOStructuredData(title: string, description: string, language: string, articles: TravelGuideArticle[]) {
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
      "hasPart": articles.map(article => ({
        "@type": "Article",
        "name": article.id,
        "author": {
          "@type": "Person",
          "name": article.author
        },
        "articleSection": article.category
      })),
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
  }, [mounted, title, description, language, articles]);
}

const categoryIcons: Record<string, typeof Compass> = {
  carnival: PartyPopper,
  world: Globe,
  caribbean: Palmtree,
  rio: Heart,
  agency: Building2
};

export default function TravelGuidesSection() {
  const { t, i18n } = useTranslation();
  const [headerRef, headerVisible] = useIntersectionTrigger({ threshold: 0.2 });
  const [contentRef, contentVisible] = useIntersectionTrigger({ threshold: 0.1, delay: 150 });
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const guides = travelGuidesData;

  useSEOStructuredData(
    t('travelGuides.title'),
    t('travelGuides.subtitle'),
    i18n.language,
    guides
  );

  const handleOpenGuide = (guideId: string) => {
    setSelectedGuideId(guideId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGuideId(null);
  };

  return (
    <>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide, index) => {
                const articleData = t(`travelGuides.articles.${guide.id}`, { returnObjects: true }) as {
                  title: string;
                  excerpt: string;
                  author: string;
                  role: string;
                };
                const CategoryIcon = categoryIcons[guide.category] || Compass;
                
                return (
                  <Card 
                    key={guide.id}
                    onClick={() => handleOpenGuide(guide.id)}
                    className="overflow-visible hover-elevate cursor-pointer group transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-testid={`card-guide-${guide.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <Badge variant="secondary" className="text-xs gap-1">
                          <CategoryIcon className="w-3 h-3" />
                          {t(`travelGuides.articleCategories.${guide.category}`)}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {guide.readTime} {t('travelGuides.readTime')}
                        </span>
                      </div>
                      
                      <h3 
                        className="font-semibold text-lg mb-3 line-clamp-2 text-foreground group-hover:text-primary transition-colors"
                        data-testid={`text-guide-card-title-${guide.id}`}
                      >
                        {articleData.title}
                      </h3>
                      
                      <p 
                        className="text-sm text-muted-foreground mb-4 line-clamp-3"
                        data-testid={`text-guide-excerpt-${guide.id}`}
                      >
                        {articleData.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between gap-2 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span>{t('travelGuides.author')} <strong>{articleData.author}</strong></span>
                        </div>
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
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <TravelGuideModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          guideId={selectedGuideId}
        />
      </Suspense>
    </>
  );
}
