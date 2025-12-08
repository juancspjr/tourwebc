import { useTranslation } from "react-i18next";
import { Instagram, Youtube } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import logoImage from "@assets/Diseño_sin_título_(2)_1764694858372.webp";

import logo_11zon from "@assets/logo_11zon.webp";

import logo1 from "@assets/logo1.webp";

export default function Footer() {
  const yearRange = "2005-2026";
  const { t } = useTranslation();

  const tourPackages = [
    { label: "Day Tour Rio de Janeiro", href: "#packages" },
    { label: "Tour por las Favelas", href: "#packages" },
    { label: "Tour por las Playas", href: "#packages" },
    { label: "Trilhas & Trekking", href: "#packages" },
    { label: "Paseos en Barco", href: "#packages" },
    { label: "Paseo en Yate VIP", href: "#packages" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/brianmachinee/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@BrianMachinee", label: "YouTube" },
    { icon: SiTiktok, href: "https://www.tiktok.com/@brianmachinne", label: "TikTok" },
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
              <img 
                src={logo1} 
                alt="Rio Trip Vibes" 
                className="h-16 w-auto object-contain bg-white/90 rounded-lg p-2"
              />
            </div>
            <p className="text-background/70 text-sm mb-4">
              {t('footer.description')}
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
            <h3 className="font-semibold mb-4">{t('footer.tourPackages')}</h3>
            <ul className="space-y-2">
              {tourPackages.map((link) => (
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
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a 
                  href="https://wa.me/5521983526144" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp: +55 21 98352-6144
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5521965498171" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp 2: +55 21 96549-8171
                </a>
              </li>
              <li>
                <a 
                  href="tel:+5521983526144"
                  className="hover:text-primary transition-colors"
                >
                  Tel: +55 21 98352-6144
                </a>
              </li>
              <li>
                <a 
                  href="tel:+5521965498171"
                  className="hover:text-primary transition-colors"
                >
                  Tel 2: +55 21 96549-8171
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@riotripvibes.com"
                  className="hover:text-primary transition-colors"
                >
                  info@riotripvibes.com
                </a>
              </li>
              <li>Rio de Janeiro, Brasil</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('footer.newAdventures')}</h3>
            <p className="text-sm text-background/70 mb-4">
              {t('footer.comingSoon')}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-background/70">{t('footer.upcomingDestinations')}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              {yearRange} Rio Trip Vibes. {t('footer.allRightsReserved')}
            </p>
            <div className="flex gap-6">
              <button className="text-sm text-background/60 hover:text-background transition-colors">
                {t('footer.termsOfService')}
              </button>
              <button className="text-sm text-background/60 hover:text-background transition-colors">
                {t('footer.privacyPolicy')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
