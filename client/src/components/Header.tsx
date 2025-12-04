import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, Phone, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";

import logo1 from "@assets/logo1.webp";

// Use stable URL for logo - preloaded in index.html for faster loading
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

  const navItems = [
    { label: "Inicio", href: "#home" },
    { label: "Destinos", href: "#packages" },
    { label: "Info Viaje", href: "#info" },
    { label: "Testimonios", href: "#testimonials" },
    { label: "Contacto", href: "#contact" },
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
              className="h-20 w-auto object-contain"
            />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 backdrop-blur-md bg-cta/80 border-cta/60 text-cta-foreground hover:bg-cta/90"
              onClick={() => window.open("https://wa.me/5521983526144", "_blank")}
              data-testid="button-whatsapp-header"
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="backdrop-blur-md bg-cta/80 border-cta/60 text-cta-foreground hover:bg-cta/90"
              onClick={() => handleNavClick("#contact")}
              data-testid="button-reservar"
            >
              Reservar Ahora
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-menu-mobile">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] !bg-background/90 backdrop-blur-xl border-l border-border/20 shadow-2xl">
              <VisuallyHidden>
                <SheetTitle>Menú de navegación</SheetTitle>
                <SheetDescription>Navega por las secciones del sitio</SheetDescription>
              </VisuallyHidden>
              <div className="flex flex-col gap-6 mt-8">
                <img 
                  src={logoImage} 
                  alt="Rio Trip Vibes" 
                  className="h-16 w-auto object-contain self-start mb-4"
                />
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
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
                  </button>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="gap-2 w-full backdrop-blur-md bg-cta/80 border-cta/60 text-cta-foreground hover:bg-cta/90"
                    onClick={() => window.open("https://wa.me/5521983526144", "_blank")}
                    data-testid="button-whatsapp-mobile"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full backdrop-blur-md bg-cta/80 border-cta/60 text-cta-foreground hover:bg-cta/90" 
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
                    Reservar Ahora
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
    </header>
  );
}
