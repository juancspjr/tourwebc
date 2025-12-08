import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CalendarCheck, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";

interface FloatingButtonsProps {
  phoneNumber?: string;
  message?: string;
  onBookClick?: () => void;
}

export default function FloatingButtons({
  phoneNumber = "5521983526144",
  message = "Hola! Me gustaría obtener información sobre los tours en Río de Janeiro.",
  onBookClick,
}: FloatingButtonsProps) {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowButtons(scrollY > 300);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const handleBookClick = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      const contactSection = document.querySelector("#contact");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: prefersReducedMotion ? {} : { scale: 1.05, y: -2 },
    tap: prefersReducedMotion ? {} : { scale: 0.95 }
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {showButtons && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3"
          >
            <AnimatePresence>
              {isExpanded && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        onClick={handleBookClick}
                        className="h-12 px-5 gap-2 bg-gradient-to-r from-cta to-cta/90 hover:from-cta/90 hover:to-cta/80 text-cta-foreground font-semibold shadow-xl shadow-cta/25 rounded-full border-0"
                        data-testid="button-reservar-floating-mobile"
                        aria-label={t('floatingButtons.bookNow')}
                      >
                        <CalendarCheck className="w-5 h-5" />
                        {t('floatingButtons.bookNow')}
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        onClick={handleWhatsAppClick}
                        className="h-12 px-5 gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-xl shadow-green-500/25 rounded-full border-0"
                        data-testid="button-whatsapp-floating-mobile"
                        aria-label="Contactar por WhatsApp"
                      >
                        <SiWhatsapp className="w-5 h-5" />
                        WhatsApp
                      </Button>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2 backdrop-blur-md border-primary-border/50 w-14 h-14 rounded-full shadow-2xl border-0 transition-all duration-300 from-primary via-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground bg-[#22c55e]"
                size="icon"
                data-testid="button-floating-toggle-mobile"
                aria-label={isExpanded ? "Cerrar menú" : "Abrir menú de contacto"}
              >
                {isExpanded ? (
                  <X className="w-6 h-6" />
                ) : (
                  <SiWhatsapp className="w-7 h-7" />
                )}
              </Button>
            </motion.div>

            {!isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"
                aria-hidden="true"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {showButtons && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {isExpanded && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      onClick={handleBookClick}
                      className="h-14 px-6 gap-3 bg-gradient-to-r from-cta to-cta/90 hover:from-cta/90 hover:to-cta/80 text-cta-foreground font-semibold shadow-xl shadow-cta/25 rounded-full border-0"
                      data-testid="button-reservar-floating"
                      aria-label={t('floatingButtons.bookNow')}
                    >
                      <CalendarCheck className="w-5 h-5" />
                      {t('floatingButtons.bookNow')}
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      onClick={handleWhatsAppClick}
                      className="h-14 px-6 gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-xl shadow-green-500/25 rounded-full border-0"
                      data-testid="button-whatsapp-floating"
                      aria-label="Contactar por WhatsApp"
                    >
                      <SiWhatsapp className="w-5 h-5" />
                      WhatsApp
                    </Button>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-16 h-16 rounded-full shadow-2xl border-0 transition-all duration-300 ${
                isExpanded 
                  ? 'bg-muted hover:bg-muted/80 text-foreground' 
                  : 'bg-gradient-to-br from-primary via-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground'
              }`}
              size="icon"
              data-testid="button-floating-toggle"
              aria-label={isExpanded ? "Cerrar menú" : "Abrir menú de contacto"}
            >
              {isExpanded ? (
                <X className="w-7 h-7" />
              ) : (
                <SiWhatsapp className="w-8 h-8" />
              )}
            </Button>
          </motion.div>

          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"
              aria-hidden="true"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
