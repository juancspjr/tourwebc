import TestimonialCard from "../TestimonialCard";
import avatar1 from "@assets/stock_images/professional_headsho_dc765f4a.webp";

export default function TestimonialCardExample() {
  const testimonial = {
    id: "1",
    name: "María García",
    avatar: avatar1,
    date: "Noviembre 2024",
    rating: 5,
    text: "Una experiencia increíble! El guía fue muy profesional y conocedor. El tour al Cristo Redentor y Pan de Azúcar superó todas mis expectativas.",
    tour: "Day Tour Rio de Janeiro",
  };

  return (
    <div className="max-w-sm">
      <TestimonialCard testimonial={testimonial} />
    </div>
  );
}
