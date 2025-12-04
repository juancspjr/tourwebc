import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/lib/packages";

export default function InfiniteTestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);
  const { t } = useTranslation();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speed = 0.5;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        positionRef.current += speed;
        
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (positionRef.current >= halfWidth) {
          positionRef.current = 0;
        }
        
        scrollContainer.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
      </div>

      <div 
        className="testimonial-carousel-container relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="testimonial-carousel-mask">
          <div 
            ref={scrollRef}
            className="testimonial-carousel-track flex gap-6 will-change-transform"
            style={{ width: "max-content" }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={`${testimonial.id}-${index}`}
                className="testimonial-carousel-item w-[300px] sm:w-[340px] md:w-[360px] flex-shrink-0"
                data-testid={`testimonial-card-${testimonial.id}-${index}`}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-background rounded-full px-6 py-3 shadow-sm">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 5).map((testimonial) => {
              const name = t(testimonial.nameKey);
              const initials = name && name !== testimonial.nameKey
                ? name.split(" ").map(n => n[0]).join("")
                : "U";
              return (
                <div
                  key={testimonial.id}
                  className="w-8 h-8 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-xs font-medium text-primary"
                >
                  {initials}
                </div>
              );
            })}
            </div>
            <span className="text-sm text-muted-foreground">
              {t('testimonials.satisfied')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
