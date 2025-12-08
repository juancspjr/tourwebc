import { useTranslation } from "react-i18next";
import { Home, ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavProps {
  currentSection?: string;
}

export default function BreadcrumbNav({ currentSection }: BreadcrumbNavProps) {
  const { t } = useTranslation();

  const sectionLabels: Record<string, string> = {
    packages: t('nav.destinations'),
    destinations: t('nav.destinations'),
    info: t('nav.travelInfo'),
    guides: t('nav.guides'),
    testimonials: t('nav.testimonials'),
    contact: t('nav.contact'),
  };

  const currentLabel = currentSection ? sectionLabels[currentSection] : null;

  if (!currentLabel) {
    return null;
  }

  return (
    <nav 
      aria-label="breadcrumb" 
      className="bg-background/80 backdrop-blur-sm border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <Breadcrumb>
          <BreadcrumbList className="text-xs sm:text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/" 
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="breadcrumb-home"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t('nav.home')}</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbSeparator>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage 
                className="text-foreground font-medium"
                data-testid="breadcrumb-current"
              >
                {currentLabel}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  );
}
