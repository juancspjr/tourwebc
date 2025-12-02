import { Facebook, Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Day Tour", href: "#packages" },
    { label: "Tour Favelas", href: "#packages" },
    { label: "Playas", href: "#packages" },
    { label: "Trekking", href: "#packages" },
    { label: "Paseos en Barco", href: "#packages" },
    { label: "Yate VIP", href: "#packages" },
    { label: "Helicóptero", href: "#packages" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { icon: SiTiktok, href: "https://tiktok.com", label: "TikTok" },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold">Rio Adventures</span>
            </div>
            <p className="text-background/70 text-sm mb-4">
              Tu agencia de tours de confianza en Río de Janeiro. 
              Experiencias únicas, guías profesionales y recuerdos inolvidables.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                  data-testid={`social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Paquetes</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a 
                  href="https://wa.me/5521999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp: +55 21 99999-9999
                </a>
              </li>
              <li>
                <a 
                  href="tel:+552133334444"
                  className="hover:text-primary transition-colors"
                >
                  Tel: +55 21 3333-4444
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@rioadventures.com"
                  className="hover:text-primary transition-colors"
                >
                  info@rioadventures.com
                </a>
              </li>
              <li>Río de Janeiro, Brasil</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Próximamente</h3>
            <p className="text-sm text-background/70 mb-4">
              Muy pronto añadiremos experiencias internacionales. 
              ¡Prepárate para explorar el mundo con nosotros!
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-background/70">Nuevos destinos en desarrollo</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © {currentYear} Rio Adventures. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <button className="text-sm text-background/60 hover:text-background transition-colors">
                Términos de Servicio
              </button>
              <button className="text-sm text-background/60 hover:text-background transition-colors">
                Política de Privacidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
