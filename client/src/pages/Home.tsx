import { useState, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SplashScreen from "@/components/SplashScreen";
import type { PackageData } from "@/lib/packages";

const PackageGrid = lazy(() => import("@/components/PackageGrid"));
const InfiniteTestimonialCarousel = lazy(() => import("@/components/InfiniteTestimonialCarousel"));
const GeneralInfoSection = lazy(() => import("@/components/GeneralInfoSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const PackageModal = lazy(() => import("@/components/PackageModal"));

function SectionSkeleton({ height = "400px" }: { height?: string }) {
  return (
    <div 
      className="w-full bg-muted/30 animate-pulse" 
      style={{ minHeight: height }}
      aria-label="Cargando contenido..."
    />
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('splashShown');
    }
    return true;
  });
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [bookingPackage, setBookingPackage] = useState<PackageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Asegurar posición inicial en el Hero al cargar
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // Prevenir scroll durante el splash y restaurar posición al terminar
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splashShown', 'true');
    }
  };

  const handleViewDetails = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleBook = (pkg: PackageData) => {
    setIsModalOpen(false);
    setBookingPackage(pkg);
    setTimeout(() => {
      const contactSection = document.querySelector("#contact");
      contactSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleNavigate = (section: string) => {
    const element = document.querySelector(section);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} duration={2500} />
      )}
      <div 
        className="min-h-screen bg-background"
        style={{ 
          visibility: showSplash ? 'hidden' : 'visible',
          opacity: showSplash ? 0 : 1,
          transition: 'opacity 300ms ease-out'
        }}
      >
        <Header onNavigate={handleNavigate} />
      
      <main>
        <HeroSection onExploreClick={() => handleNavigate("#packages")} />
        
        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <PackageGrid
            onViewDetails={handleViewDetails}
            onBook={handleBook}
          />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <GeneralInfoSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <InfiniteTestimonialCarousel />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <ContactSection 
            selectedPackage={bookingPackage}
            onPackageChange={setBookingPackage}
          />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      
      <Suspense fallback={null}>
        <PackageModal
          package={selectedPackage}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBook={handleBook}
        />
      </Suspense>
      </div>
    </>
  );
}
