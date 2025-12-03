import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Ban,
  MessageCircle,
  Info
} from "lucide-react";
import { SiBitcoin, SiPaypal } from "react-icons/si";
import { generalInfo } from "@/lib/packages";
import { revealVariants, revealFromLeftVariants, revealFromRightVariants, staggerContainerVariants, reducedMotionVariants } from "@/hooks/useRevealAnimation";

const paymentIcons: Record<string, JSX.Element> = {
  "zelle": <Banknote className="w-5 h-5" />,
  "credit-card": <CreditCard className="w-5 h-5" />,
  "bank": <Building2 className="w-5 h-5" />,
  "cash": <Banknote className="w-5 h-5" />,
  "paypal": <SiPaypal className="w-5 h-5" />,
  "bitcoin": <SiBitcoin className="w-5 h-5" />,
};

export default function GeneralInfoSection() {
  const prefersReducedMotion = useReducedMotion();

  const headerVariants = prefersReducedMotion ? reducedMotionVariants : revealVariants;
  const containerVariants = prefersReducedMotion ? reducedMotionVariants : staggerContainerVariants;
  const leftVariants = prefersReducedMotion ? reducedMotionVariants : revealFromLeftVariants;
  const rightVariants = prefersReducedMotion ? reducedMotionVariants : revealFromRightVariants;

  return (
    <section id="info" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-50px 0px" }}
          variants={headerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Informacion util para tu viaje
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas saber antes de viajar. Metodos de pago, visados, monedas y preguntas frecuentes aplicables a cualquier destino.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1, margin: "-30px 0px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div variants={leftVariants}>
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
          </motion.div>

          <motion.div variants={rightVariants}>
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
                
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {generalInfo.visaInfo.contactNote}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => window.open("https://wa.me/584142823218?text=" + encodeURIComponent("Hola, necesito informacion sobre los requisitos de visa para mi destino."), "_blank")}
                  data-testid="button-visa-contact"
                >
                  <MessageCircle className="w-4 h-4" />
                  Consultar con Asesor
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={leftVariants}>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="w-5 h-5 text-primary" />
                  {generalInfo.currency.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {generalInfo.currency.description}
                </p>
                <div className="space-y-2">
                  {generalInfo.currency.currencies.map((currency, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={currency.primary ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {currency.name}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{currency.country}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic">
                  La moneda aceptada depende del destino. Consulta con tu asesor para mas detalles.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={rightVariants}>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldAlert className="w-5 h-5 text-destructive" />
                  {generalInfo.prohibitedActivities.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {generalInfo.prohibitedActivities.description}
                </p>
                <div className="space-y-2">
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
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1, margin: "-30px 0px" }}
          variants={headerVariants}
          className="mt-8"
        >
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Preguntas Frecuentes Generales</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Informacion aplicable a todos nuestros destinos. Para consultas especificas, contacta a tu asesor.
              </p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {generalInfo.generalFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left text-sm font-medium hover:no-underline" data-testid={`general-faq-trigger-${index}`}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
