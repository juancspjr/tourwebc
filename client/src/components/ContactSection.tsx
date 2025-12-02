import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const packages = [
  "Day Tour Rio de Janeiro",
  "Tour por las Favelas",
  "Tour por las Playas",
  "Trilhas & Trekking",
  "Paseos en Barco",
  "Paseo en Yate VIP",
  "Paseo en Helicóptero",
];

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    date: "",
    people: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Solicitud Enviada",
      description: "Nos pondremos en contacto contigo pronto. ¡Gracias por tu interés!",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      package: "",
      date: "",
      people: "",
      message: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Reserva Tu Aventura
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Completa el formulario y te contactaremos para confirmar tu reserva. 
            También puedes escribirnos directamente por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="package">Paquete de Interés</Label>
                    <Select
                      value={formData.package}
                      onValueChange={(value) => handleChange("package", value)}
                    >
                      <SelectTrigger id="package" data-testid="select-package">
                        <SelectValue placeholder="Selecciona un paquete" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg} value={pkg}>
                            {pkg}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha Preferida</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      data-testid="input-date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="people">Número de Personas</Label>
                    <Select
                      value={formData.people}
                      onValueChange={(value) => handleChange("people", value)}
                    >
                      <SelectTrigger id="people" data-testid="select-people">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "10+"].map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} {num === 1 ? "persona" : "personas"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje (Opcional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntanos sobre tus preferencias, preguntas o requerimientos especiales..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    data-testid="input-message"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" data-testid="button-submit-form">
                  Enviar Solicitud
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/5521999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+55 21 99999-9999</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Teléfono</p>
                      <p className="text-sm text-muted-foreground">+55 21 3333-4444</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">info@rioadventures.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Ubicación</p>
                      <p className="text-sm text-muted-foreground">Río de Janeiro, Brasil</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Horario de Atención
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lunes - Viernes</span>
                        <span className="font-medium text-foreground">8:00 AM - 8:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sábado - Domingo</span>
                        <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
