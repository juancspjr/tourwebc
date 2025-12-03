import { useState, useEffect, useLayoutEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PackageGrid from "@/components/PackageGrid";
import InfiniteTestimonialCarousel from "@/components/InfiniteTestimonialCarousel";
import GeneralInfoSection from "@/components/GeneralInfoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PackageModal from "@/components/PackageModal";
import SplashScreen from "@/components/SplashScreen";
import type { PackageData } from "@/lib/packages";

export default function Home() {
  useScrollAnimation();
  
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
        <SplashScreen onComplete={handleSplashComplete} duration={1800} />
      )}
      <div className="min-h-screen bg-background">
        <Header onNavigate={handleNavigate} />
      
      <main>
        <HeroSection onExploreClick={() => handleNavigate("#packages")} />
        
        <PackageGrid
          onViewDetails={handleViewDetails}
          onBook={handleBook}
        />
        
        <GeneralInfoSection />
        
        <InfiniteTestimonialCarousel />
        
        <ContactSection 
          selectedPackage={bookingPackage}
          onPackageChange={setBookingPackage}
        />
      </main>
      
      <Footer />
      
      <WhatsAppButton />
      
      <PackageModal
        package={selectedPackage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBook={handleBook}
      />
      </div>
    </>
  );
}
