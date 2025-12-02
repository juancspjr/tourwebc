import { useState } from "react";
import PackageModal from "../PackageModal";
import { Button } from "@/components/ui/button";
import cristoImage from "@assets/generated_images/cristo_redentor_statue.png";

export default function PackageModalExample() {
  const [isOpen, setIsOpen] = useState(true);

  const samplePackage = {
    id: "day-tour",
    title: "Day Tour Rio de Janeiro",
    description: "Descubre lo mejor de Río en un solo día. Visitamos entre 7 a 9 puntos turísticos, incluyendo Cristo Redentor, Escadaria Selarón, Pão de Açúcar, Mirante do Leblon y mucho más. Transporte con guía local y paradas fotográficas inolvidables.",
    image: cristoImage,
    price: 100,
    duration: "8-10 horas",
    locations: ["Cristo Redentor", "Escadaria Selarón", "Pão de Açúcar", "Mirante do Leblon", "Lapa"],
    highlights: ["Transporte incluido", "Guía local bilingüe", "Paradas fotográficas", "Almuerzo opcional", "Seguro de viaje"],
    category: "City Tour",
    badge: "Más Popular",
    rating: 4.9,
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
      <PackageModal
        package={samplePackage}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onBook={(pkg) => console.log("Book:", pkg.title)}
      />
    </div>
  );
}
