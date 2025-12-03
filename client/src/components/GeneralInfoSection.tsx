import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CreditCard, 
  Banknote, 
  Building2, 
  Globe, 
  ShieldAlert, 
  Coins,
  ExternalLink,
  Ban
} from "lucide-react";
import { SiBitcoin, SiPaypal } from "react-icons/si";
import { generalInfo } from "@/lib/packages";

const paymentIcons: Record<string, JSX.Element> = {
  "zelle": <Banknote className="w-5 h-5" />,
  "credit-card": <CreditCard className="w-5 h-5" />,
  "bank": <Building2 className="w-5 h-5" />,
  "cash": <Banknote className="w-5 h-5" />,
  "paypal": <SiPaypal className="w-5 h-5" />,
  "bitcoin": <SiBitcoin className="w-5 h-5" />,
};

export default function GeneralInfoSection() {
  return (
    <section id="info" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Informacion Importante
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas saber antes de viajar. Metodos de pago, requisitos de visa y mas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="w-5 h-5 text-primary" />
                {generalInfo.paymentMethods.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {generalInfo.paymentMethods.methods.map((method, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {paymentIcons[method.icon]}
                    </div>
                    <span className="font-medium text-sm">{method.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-primary" />
                {generalInfo.visaInfo.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {generalInfo.visaInfo.description}
              </p>
              <a 
                href={generalInfo.visaInfo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                data-testid="link-visa-info"
              >
                Ver lista de paises que requieren visa
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-primary" />
                  {generalInfo.currency.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {generalInfo.currency.currencies.map((currency, index) => (
                    <Badge 
                      key={index} 
                      variant={currency.primary ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {currency.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldAlert className="w-5 h-5 text-destructive" />
                {generalInfo.prohibitedActivities.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {generalInfo.prohibitedActivities.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10"
                  >
                    <Ban className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Preguntas Frecuentes Generales</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="best-time">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    Cual es la mejor epoca para visitar Rio de Janeiro?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Rio de Janeiro tiene un clima tropical con temperaturas agradables durante todo el ano. El verano (diciembre-marzo) es ideal para playas, 
                    mientras que el otono e invierno (abril-septiembre) ofrecen temperaturas mas frescas perfectas para trekking y city tours. 
                    Evita el periodo de Carnaval si buscas tranquilidad, o visitalo si quieres vivir la fiesta mas grande del mundo.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="additional-money">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    Necesito llevar dinero adicional durante los tours?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Recomendamos llevar entre $30-100 USD dependiendo del tour para gastos personales como souvenirs, snacks adicionales, 
                    propinas y actividades opcionales. La mayoria de los lugares aceptan tarjetas de credito, pero es util tener algo de efectivo 
                    en reales brasilenOS (BRL) para pequenos comercios.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="children-elderly">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    Pueden viajar ninos o personas de tercera edad?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Si, la mayoria de nuestros tours son aptos para familias y personas mayores. Los City Tours, Tours de Playa y Paseos en Barco 
                    son ideales para todas las edades. Para Trekking, recomendamos rutas faciles o moderadas para ninos mayores de 10 anos y 
                    adultos mayores en buena condicion fisica. Siempre consultanos para adaptar la experiencia a tus necesidades.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cancellation">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    Cual es la politica de cancelacion?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Ofrecemos cancelacion gratuita hasta 48-72 horas antes del tour (varia segun el paquete). Cancelaciones tardias pueden 
                    tener un cargo del 50%. En caso de mal tiempo que impida la actividad, reprogramamos sin costo adicional o reembolsamos 
                    el 100%. Revisa los terminos especificos de cada paquete al momento de reservar.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="language">
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    En que idiomas estan disponibles los tours?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Todos nuestros guias son bilingues y ofrecen tours en espanol y portugues. Tambien contamos con guias que hablan ingles 
                    para algunos paquetes. Al reservar, indica tu preferencia de idioma y asignaremos el guia apropiado.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
