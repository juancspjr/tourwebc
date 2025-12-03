import { motion } from "framer-motion";
import TestimonialCard, { type TestimonialData } from "./TestimonialCard";
import { useRevealAnimation, revealVariants, staggerContainerVariants, fadeInVariants } from "@/hooks/useRevealAnimation";
import avatar1 from "@assets/stock_images/professional_headsho_dc765f4a.jpg";
import avatar2 from "@assets/stock_images/professional_headsho_190f41fe.jpg";
import avatar3 from "@assets/stock_images/professional_headsho_15c8265b.jpg";

const testimonials: TestimonialData[] = [
  {
    id: "1",
    name: "Maria Garcia",
    avatar: avatar1,
    date: "Noviembre 2024",
    rating: 5,
    text: "Una experiencia increible! El guia fue muy profesional y conocedor. El tour al Cristo Redentor y Pan de Azucar supero todas mis expectativas. Recomiendo 100%.",
    tour: "Day Tour Rio de Janeiro",
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    avatar: avatar2,
    date: "Octubre 2024",
    rating: 5,
    text: "El trekking a Pedra da Gavea fue desafiante pero las vistas son impresionantes. El guia nos cuido todo el tiempo y nos enseno sobre la flora local. Volvere por mas aventuras!",
    tour: "Trilhas & Trekking",
  },
  {
    id: "3",
    name: "Ana Martinez",
    avatar: avatar3,
    date: "Septiembre 2024",
    rating: 5,
    text: "El paseo en yate fue espectacular! Vimos el atardecer desde el mar con Copacabana de fondo. Perfecto para celebrar nuestro aniversario. La tripulacion fue muy atenta.",
    tour: "Paseo en Yate VIP",
  },
];

export default function TestimonialsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useRevealAnimation({ threshold: 0.2 });
  const { ref: cardsRef, isVisible: cardsVisible } = useRevealAnimation({ threshold: 0.1 });

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={headerRef}
          initial="hidden"
          animate={headerVisible ? "visible" : "hidden"}
          variants={revealVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Lo Que Dicen Nuestros Viajeros
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Historias reales de personas que exploraron Rio con nosotros. 
            Mas de 1,000 viajeros felices nos respaldan.
          </p>
        </motion.div>

        <motion.div 
          ref={cardsRef}
          initial="hidden"
          animate={cardsVisible ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeInVariants}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={cardsVisible ? "visible" : "hidden"}
          variants={revealVariants}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-background rounded-full px-6 py-3 shadow-sm">
            <div className="flex -space-x-2">
              {testimonials.map((t) => (
                <img
                  key={t.id}
                  src={t.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-background"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              +1,000 viajeros satisfechos
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
