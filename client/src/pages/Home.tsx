import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PackageGrid from "@/components/PackageGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import GeneralInfoSection from "@/components/GeneralInfoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PackageModal from "@/components/PackageModal";
import type { PackageData } from "@/lib/packages";

export default function Home() {
  useScrollAnimation();
  
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [bookingPackage, setBookingPackage] = useState<PackageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      <main>
        <HeroSection onExploreClick={() => handleNavigate("#packages")} />
        
        <PackageGrid
          onViewDetails={handleViewDetails}
          onBook={handleBook}
        />
        
        <TestimonialsSection />
        
        <GeneralInfoSection />
        
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
  );
}
