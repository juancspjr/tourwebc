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
import { Phone, Mail, MapPin, Clock, MessageCircle, Calendar } from "lucide-react";
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
    startDate: "",
    endDate: "",
    people: "",
    message: "",
  });

  const [dateError, setDateError] = useState<string | null>(null);

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
  
  const calculateDays = (): number => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const numberOfDays = calculateDays();

  const calculateQuotation = () => {
    if (!currentPackage || numberOfPeople === 0 || numberOfDays === 0) return null;
    
    const pricePerDay = currentPackage.price;
    const baseSubtotal = pricePerDay * numberOfDays * numberOfPeople;
    
    // =====================================================
    // DESCUENTOS POR CANTIDAD DE PERSONAS (APLICAR PRIMERO)
    // Ajusta estos valores según tus necesidades
    // =====================================================
    let groupDiscountPercent = 0;
    if (numberOfPeople >= 6) {
      groupDiscountPercent = 15;
    } else if (numberOfPeople >= 4) {
      groupDiscountPercent = 10;
    } else if (numberOfPeople >= 2) {
      groupDiscountPercent = 5;
    }
    // 1 persona: 0% descuento (precio base)
    
    const groupDiscount = baseSubtotal * (groupDiscountPercent / 100);
    const afterGroupDiscount = baseSubtotal - groupDiscount;
    
    // =====================================================
    // DESCUENTOS POR DURACIÓN EN DÍAS (APLICAR SEGUNDO)
    // Ajusta estos valores según tus necesidades
    // =====================================================
    let durationDiscountPercent = 0;
    if (numberOfDays >= 15) {
      durationDiscountPercent = 25;
    } else if (numberOfDays >= 8) {
      durationDiscountPercent = 15;
    } else if (numberOfDays >= 4) {
      durationDiscountPercent = 8;
    }
    // 1-3 días: 0% descuento adicional
    
    const durationDiscount = afterGroupDiscount * (durationDiscountPercent / 100);
    const total = afterGroupDiscount - durationDiscount;
    
    return {
      pricePerDay,
      numberOfDays,
      numberOfPeople,
      baseSubtotal,
      groupDiscountPercent,
      groupDiscount,
      afterGroupDiscount,
      durationDiscountPercent,
      durationDiscount,
      total,
    };
  };

  const quotation = calculateQuotation();

  const validateDates = (startDate: string, endDate: string): boolean => {
    if (!startDate || !endDate) {
      setDateError(null);
      return true;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end <= start) {
      setDateError("La fecha de finalización debe ser posterior a la fecha de inicio");
      return false;
    }
    
    setDateError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!validateDates(formData.startDate, formData.endDate)) {
      e.preventDefault();
      toast({
        title: "Error en las fechas",
        description: "La fecha de finalización debe ser posterior a la fecha de inicio",
        variant: "destructive",
      });
      return;
    }
    
    // Allow native form submission to FormSubmit.co
    // The form will be submitted via HTTP POST to the formsubmit.co endpoint
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      
      if (field === "startDate" || field === "endDate") {
        const startDate = field === "startDate" ? value : prev.startDate;
        const endDate = field === "endDate" ? value : prev.endDate;
        validateDates(startDate, endDate);
      }
      
      return newData;
    });
    
    if (field === "package") {
      const pkg = getPackageByTitle(value);
      onPackageChange?.(pkg || null);
    }
  };

  const getMinEndDate = (): string => {
    if (!formData.startDate) return "";
    const start = new Date(formData.startDate);
    start.setDate(start.getDate() + 1);
    return start.toISOString().split("T")[0];
  };

  const getTodayDate = (): string => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Reserva Tu Aventura
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Completa el formulario y obtén tu cotización al instante. 
            También puedes escribirnos directamente por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <form 
                  action="https://formsubmit.co/admin@riotripvibes.com" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-5"
                >
                  {/* FormSubmit.co hidden fields */}
                  <input type="hidden" name="_next" value="https://riotripvibes.com" />
                  <input type="hidden" name="_subject" value="Nueva Reserva - Rio Trip Vibes" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      name="name"
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
                      name="email"
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
                      name="phone"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="package">Paquete de Interés</Label>
                    <input type="hidden" name="package" value={formData.package} />
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
                            {pkg.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de Inicio</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      min={getTodayDate()}
                      value={formData.startDate}
                      onChange={(e) => handleChange("startDate", e.target.value)}
                      data-testid="input-start-date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Fecha de Fin</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      min={getMinEndDate() || getTodayDate()}
                      value={formData.endDate}
                      onChange={(e) => handleChange("endDate", e.target.value)}
                      disabled={!formData.startDate}
                      data-testid="input-end-date"
                    />
                  </div>
                </div>
                
                {dateError && (
                  <p className="text-sm text-destructive" data-testid="text-date-error">
                    {dateError}
                  </p>
                )}

                <div className="space-y-2">
                  <Label htmlFor="people">Número de Personas</Label>
                  <input type="hidden" name="people" value={formData.people} />
                  <Select
                    value={formData.people}
                    onValueChange={(value) => handleChange("people", value)}
                  >
                    <SelectTrigger id="people" data-testid="select-people">
                      <SelectValue placeholder="Selecciona cantidad de personas" />
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

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje (Opcional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos sobre tus preferencias, preguntas o requerimientos especiales..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    data-testid="input-message"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg" 
                  data-testid="button-submit-form"
                  disabled={!!dateError}
                >
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
                    href="https://wa.me/5521983526144"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+55 21 98352-6144</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Teléfono</p>
                      <p className="text-sm text-muted-foreground">+55 21 98352-6144</p>
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
                      <p className="text-sm text-muted-foreground">Rio de Janeiro, Brasil</p>
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
