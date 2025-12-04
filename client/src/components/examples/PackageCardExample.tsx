import PackageCard from "../PackageCard";
import cristoImage from "@assets/generated_images/cristo_redentor_statue.webp";

export default function PackageCardExample() {
  const samplePackage = {
    id: "day-tour",
    title: "Day Tour Rio de Janeiro",
    description: "Descubre lo mejor de Río en un solo día. Visitamos entre 7 a 9 puntos turísticos inolvidables.",
    image: cristoImage,
    price: 100,
    duration: "8-10 horas",
    locations: ["Cristo Redentor", "Escadaria Selarón", "Pão de Açúcar"],
    highlights: ["Transporte incluido", "Guía local", "Fotos"],
    category: "City Tour",
    badge: "Más Popular",
    rating: 4.9,
  };

  return (
    <div className="max-w-sm">
      <PackageCard
        package={samplePackage}
        onViewDetails={(pkg) => console.log("View details:", pkg.title)}
        onBook={(pkg) => console.log("Book:", pkg.title)}
      />
    </div>
  );
}
