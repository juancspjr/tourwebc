import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import logoImage from "@assets/fondtrans_1764705052522.png";

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Inicio", href: "#home" },
    { label: "Destinos", href: "#packages" },
    { label: "Testimonios", href: "#testimonials" },
    { label: "Contacto", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <button 
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            data-testid="link-logo-home"
          >
            <img 
              src={logoImage} 
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
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open("https://wa.me/5521999999999", "_blank")}
              data-testid="button-whatsapp-header"
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </Button>
            <Button
              size="sm"
              className="bg-cta hover:bg-cta/90 text-cta-foreground"
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
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                <img 
                  src={logoImage} 
                  alt="Rio Trip Vibes" 
                  className="h-16 w-auto object-contain self-start mb-4"
                />
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
                    data-testid={`nav-mobile-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="gap-2 w-full"
                    onClick={() => window.open("https://wa.me/5521999999999", "_blank")}
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </Button>
                  <Button className="w-full bg-cta hover:bg-cta/90 text-cta-foreground" onClick={() => handleNavClick("#contact")}>
                    Reservar Ahora
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
