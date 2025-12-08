import { useState, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SplashScreenVideo from "@/components/SplashScreenVideo";
import SEO from "@/components/SEO";
import type { PackageData } from "@/lib/packages";

import rio1Image from "@assets/rio1_1764724064822.webp";
import rio3Image from "@assets/rio3_1764724064822.webp";
import rio4Image from "@assets/rio4_1764724064822.webp";
import egipto1Image from "@assets/egipto1_1764724064822.webp";
import egipt2Image from "@assets/egipt2_1764724064822.webp";
import barcoImage from "@assets/barco6_1764997173256.webp";
import cristoParallax from "@assets/cristo_parallax.webp";
import sunsetParallax from "@assets/sunset_parallax.webp";
import boatTourParallax from "@assets/boat_tour_parallax.webp";
import guidesParallax from "@assets/stock_images/travel_map_compass_v_af9c5a22.jpg";

const PackageGrid = lazy(() => import("@/components/PackageGrid"));
const InfiniteTestimonialCarousel = lazy(() => import("@/components/InfiniteTestimonialCarousel"));
const GeneralInfoSection = lazy(() => import("@/components/GeneralInfoSection"));
const TravelGuidesSection = lazy(() => import("@/components/TravelGuidesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const FloatingButtons = lazy(() => import("@/components/FloatingButtons"));
const PackageModal = lazy(() => import("@/components/PackageModal"));
const ParallaxDivider = lazy(() => import("@/components/ParallaxDivider"));

const heroImages = [rio1Image, rio3Image, rio4Image, egipt2Image, egipto1Image];

function SectionSkeleton({ height = "400px" }: { height?: string }) {
  return (
    <div 
      className="w-full bg-muted/30 animate-pulse" 
      style={{ minHeight: height }}
      aria-label="Cargando contenido..."
    />
  );
}

type SplashPhase = 'video' | 'complete';

export default function Home() {
  const [splashPhase, setSplashPhase] = useState<SplashPhase>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('splashShown') ? 'complete' : 'video';
    }
    return 'video';
  });
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [bookingPackage, setBookingPackage] = useState<PackageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showSplash = splashPhase !== 'complete';

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const preloadHeroImages = () => {
      heroImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    preloadHeroImages();
  }, []);

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

  const handleVideoSplashComplete = () => {
    setSplashPhase('complete');
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
      <SEO />
      {splashPhase === 'video' && (
        <SplashScreenVideo 
          videoSrc="/videos/splash.mp4"
          logoUrl="/images/logo-small.png"
          onComplete={handleVideoSplashComplete} 
        />
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
        
        <Suspense fallback={<SectionSkeleton height="250px" />}>
          <ParallaxDivider 
            image={boatTourParallax}
            titleKey="parallax.packages.title"
            subtitleKey="parallax.packages.subtitle"
            height="40vh"
            overlay="gradient"
            showCta={false}
          />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <PackageGrid
            onViewDetails={handleViewDetails}
            onBook={handleBook}
          />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="250px" />}>
          <ParallaxDivider 
            image={cristoParallax}
            titleKey="parallax.experience.title"
            subtitleKey="parallax.experience.subtitle"
            height="40vh"
            overlay="gradient"
            showCta={false}
          />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <GeneralInfoSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="250px" />}>
          <ParallaxDivider 
            image={guidesParallax}
            titleKey="parallax.guides.title"
            subtitleKey="parallax.guides.subtitle"
            height="40vh"
            overlay="gradient"
            showCta={false}
          />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <TravelGuidesSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <InfiniteTestimonialCarousel />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <ParallaxDivider 
            image={sunsetParallax}
            titleKey="parallax.adventure.title"
            subtitleKey="parallax.adventure.subtitle"
            height="45vh"
            overlay="gradient"
            showCta={true}
          />
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
        <FloatingButtons />
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
