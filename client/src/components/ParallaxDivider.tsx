import { useTranslation } from "react-i18next";

import rio1Image from "@assets/rio1_1764724064822.webp";
import rio3Image from "@assets/rio3_1764724064822.webp";

interface ParallaxDividerProps {
  image?: string;
  title?: string;
  subtitle?: string;
  height?: string;
  overlay?: "light" | "dark" | "gradient";
  showCta?: boolean;
}

export default function ParallaxDivider({
  image = rio3Image,
  title,
  subtitle,
  height = "50vh",
  overlay = "gradient",
  showCta = false,
}: ParallaxDividerProps) {
  const { t } = useTranslation();

  const overlayStyles = {
    light: "bg-black/20",
    dark: "bg-black/50",
    gradient: "bg-gradient-to-b from-black/30 via-black/40 to-black/60",
  };

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ minHeight: height }}
      data-testid="parallax-divider"
    >
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: `url(${image})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        aria-hidden="true"
      />
      
      <div className={`absolute inset-0 ${overlayStyles[overlay]}`} />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 py-16" style={{ minHeight: height }}>
        {title && (
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-4xl drop-shadow-lg">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl drop-shadow-md">
            {subtitle}
          </p>
        )}
        {showCta && (
          <a
            href="https://wa.me/5521983526144"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-md transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            data-testid="parallax-cta"
          >
            {t('hero.bookNow')}
          </a>
        )}
      </div>
    </section>
  );
}
