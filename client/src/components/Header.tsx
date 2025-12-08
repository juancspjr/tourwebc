import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, Phone, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import LanguageSwitcher from "./LanguageSwitcher";

import logo1 from "@assets/logo1.webp";

const logoImage = "/logo.png";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/brianmachinee/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@BrianMachinee", label: "YouTube" },
  { icon: SiTiktok, href: "https://www.tiktok.com/@brianmachinne", label: "TikTok" },
];

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { label: t('nav.home'), href: "#home" },
    { label: t('nav.destinations'), href: "#packages" },
    { label: t('nav.travelInfo'), href: "#info" },
    { label: t('nav.guides'), href: "#guides" },
    { label: t('nav.testimonials'), href: "#testimonials" },
    { label: t('nav.contact'), href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // Pequeño delay para permitir que el menú se cierre antes de hacer scroll
    setTimeout(() => {
      // Si se navega a home, ir al inicio absoluto de la página y resetear carrusel
      if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.dispatchEvent(new CustomEvent('resetHeroCarousel'));
        return;
      }
      
      if (onNavigate) {
        onNavigate(href);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/40 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <button 
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            data-testid="link-logo-home"
          >
            <img 
              src={logo1} 
              alt="Rio Trip Vibes" 
              className="h-[5.5rem] w-auto object-contain relative -top-[10%]"
            />
          </button>

          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Navegación principal">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open("https://wa.me/5521983526144", "_blank")}
              data-testid="button-whatsapp-header"
            >
              <Phone className="w-4 h-4" />
              {t('header.whatsapp')}
            </Button>
            <Button
              size="sm"
              className="bg-cta hover:bg-cta/90 text-cta-foreground"
              onClick={() => handleNavClick("#contact")}
              data-testid="button-reservar"
            >
              {t('header.bookNow')}
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu-mobile">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-[300px] !bg-background/90 backdrop-blur-xl border-l border-border/20 shadow-2xl">
              <VisuallyHidden>
                <SheetTitle>{t('nav.menuTitle')}</SheetTitle>
                <SheetDescription>{t('nav.menuDescription')}</SheetDescription>
              </VisuallyHidden>
              <div className="flex flex-col gap-6 mt-8">
                <img 
                  src={logoImage} 
                  alt="Rio Trip Vibes" 
                  className="h-16 w-auto object-contain self-start mb-4"
                />
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = item.href;
                      setIsOpen(false);
                      setTimeout(() => {
                        if (targetId === "#home") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          window.dispatchEvent(new CustomEvent('resetHeroCarousel'));
                        } else {
                          const element = document.querySelector(targetId);
                          if (element) {
                            const headerOffset = 100;
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth"
                            });
                          }
                        }
                      }, 300);
                    }}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
                    data-testid={`nav-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <LanguageSwitcher />
                  <Button
                    variant="outline"
                    className="gap-2 w-full"
                    onClick={() => window.open("https://wa.me/5521983526144", "_blank")}
                    data-testid="button-whatsapp-mobile"
                  >
                    <Phone className="w-4 h-4" />
                    {t('header.whatsapp')}
                  </Button>
                  <Button 
                    className="w-full bg-cta hover:bg-cta/90 text-cta-foreground" 
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => {
                        const element = document.querySelector("#contact");
                        if (element) {
                          const headerOffset = 100;
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                          });
                        }
                      }, 300);
                    }}
                    data-testid="button-reservar-mobile"
                  >
                    {t('header.bookNow')}
                  </Button>
                </div>
                
                <div className="flex items-center gap-3 border-t border-border/20 mt-[0px] mb-[0px] pt-[0px] pb-[0px] pl-[45px] pr-[45px]">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={social.label}
                      data-testid={`social-mobile-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
