import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { TestimonialData } from "@/lib/packages";

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { t } = useTranslation();
  
  const name = t(testimonial.nameKey) || "User";
  const date = t(testimonial.dateKey) || "";
  const text = t(testimonial.textKey) || "";
  const tour = t(testimonial.tourKey) || "";
  
  const initials = name && name !== testimonial.nameKey
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
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
          "{text}"
        </p>

        <p className="text-xs text-primary font-medium">
          {tour}
        </p>
      </CardContent>
    </Card>
  );
}
