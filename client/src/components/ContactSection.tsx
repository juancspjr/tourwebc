import { useState, useEffect } from "react";
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
import { Phone, Mail, MapPin, Clock, MessageCircle, Calculator, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { packages, getPackageByTitle, type PackageData } from "@/lib/packages";

interface ContactSectionProps {
  selectedPackage?: PackageData | null;
  onPackageChange?: (pkg: PackageData | null) => void;
}

export default function ContactSection({ selectedPackage, onPackageChange }: ContactSectionProps) {
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

  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        package: selectedPackage.title,
      }));
    }
  }, [selectedPackage]);

  const currentPackage = formData.package ? getPackageByTitle(formData.package) : null;
  const numberOfPeople = formData.people ? (formData.people === "10+" ? 10 : parseInt(formData.people)) : 0;
  
  const calculateQuotation = () => {
    if (!currentPackage || numberOfPeople === 0) return null;
    
    const subtotal = currentPackage.price * numberOfPeople;
    let discount = 0;
    let discountPercent = 0;
    
    if (numberOfPeople >= 6) {
      discountPercent = 15;
      discount = subtotal * 0.15;
    } else if (numberOfPeople >= 4) {
      discountPercent = 10;
      discount = subtotal * 0.10;
    } else if (numberOfPeople >= 2) {
      discountPercent = 5;
      discount = subtotal * 0.05;
    }
    
    const total = subtotal - discount;
    
    return {
      pricePerPerson: currentPackage.price,
      numberOfPeople,
      subtotal,
      discountPercent,
      discount,
      total,
    };
  };

  const quotation = calculateQuotation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData, "Quotation:", quotation);
    toast({
      title: "Solicitud Enviada",
      description: quotation 
        ? `Tu cotizacion de $${quotation.total.toFixed(2)} USD ha sido enviada. Nos pondremos en contacto contigo pronto.`
        : "Nos pondremos en contacto contigo pronto. Gracias por tu interes!",
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
    onPackageChange?.(null);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (field === "package") {
      const pkg = getPackageByTitle(value);
      onPackageChange?.(pkg || null);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header animate-on-scroll text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Reserva Tu Aventura
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Completa el formulario y obten tu cotizacion al instante. 
            Tambien puedes escribirnos directamente por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="contact-form animate-on-scroll">
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
                    <Label htmlFor="email">Correo Electronico</Label>
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
                    <Label htmlFor="phone">Telefono / WhatsApp</Label>
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
                    <Label htmlFor="package">Paquete de Interes</Label>
                    <Select
                      value={formData.package}
                      onValueChange={(value) => handleChange("package", value)}
                    >
                      <SelectTrigger id="package" data-testid="select-package">
                        <SelectValue placeholder="Selecciona un paquete" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.title}>
                            {pkg.title} - ${pkg.price} USD
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
                    <Label htmlFor="people">Numero de Personas</Label>
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
                    placeholder="Cuentanos sobre tus preferencias, preguntas o requerimientos especiales..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    data-testid="input-message"
                  />
                </div>

                {quotation && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calculator className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-foreground">Tu Cotizacion</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {quotation.numberOfPeople} {quotation.numberOfPeople === 1 ? "persona" : "personas"} x ${quotation.pricePerPerson} USD
                          </span>
                          <span className="text-foreground">${quotation.subtotal.toFixed(2)}</span>
                        </div>
                        {quotation.discountPercent > 0 && (
                          <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span>Descuento grupo ({quotation.discountPercent}%)</span>
                            <span>-${quotation.discount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t border-border pt-2 mt-2">
                          <div className="flex justify-between font-bold text-lg">
                            <span className="text-foreground">Total</span>
                            <span className="text-primary">${quotation.total.toFixed(2)} USD</span>
                          </div>
                        </div>
                        {currentPackage?.priceNote && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Nota: {currentPackage.priceNote}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button type="submit" className="w-full" size="lg" data-testid="button-submit-form">
                  {quotation ? `Solicitar Reserva - $${quotation.total.toFixed(2)} USD` : "Enviar Solicitud"}
                </Button>
              </form>
            </CardContent>
          </Card>
          </div>

          <div className="contact-info animate-on-scroll space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Informacion de Contacto
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/584142823218"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+58 414 282 3218</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Telefono</p>
                      <p className="text-sm text-muted-foreground">+58 414 282 3218</p>
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
                      <p className="font-medium text-foreground">Ubicacion</p>
                      <p className="text-sm text-muted-foreground">Rio de Janeiro, Brasil</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Horario de Atencion
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="flex justify-between gap-2 flex-wrap">
                        <span className="text-muted-foreground">Lunes - Viernes</span>
                        <span className="font-medium text-foreground">8:00 AM - 8:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <div className="flex justify-between gap-2 flex-wrap">
                        <span className="text-muted-foreground">Sabado - Domingo</span>
                        <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Descuentos por Grupo
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2-3 personas</span>
                    <span className="font-medium text-green-600 dark:text-green-400">5% descuento</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">4-5 personas</span>
                    <span className="font-medium text-green-600 dark:text-green-400">10% descuento</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">6+ personas</span>
                    <span className="font-medium text-green-600 dark:text-green-400">15% descuento</span>
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
