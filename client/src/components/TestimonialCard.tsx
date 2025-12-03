import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { TestimonialData } from "@/lib/packages";

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            {testimonial.avatar && <AvatarImage src={testimonial.avatar} alt={testimonial.name} />}
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.date}</p>
          </div>
        </div>

        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>

        <p className="text-muted-foreground text-sm flex-1 mb-4">
          "{testimonial.text}"
        </p>

        <p className="text-xs text-primary font-medium">
          {testimonial.tour}
        </p>
      </CardContent>
    </Card>
  );
}
