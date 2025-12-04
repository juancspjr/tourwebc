import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Info,
  HelpCircle,
  BookOpen
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
  const { t } = useTranslation();
  
  const tabs = [
    { id: "pagos", label: t('info.payments'), icon: CreditCard },
    { id: "visados", label: t('info.visas'), icon: Globe },
    { id: "moneda", label: t('info.currency'), icon: Coins },
    { id: "prohibido", label: t('info.important'), icon: ShieldAlert },
    { id: "faq", label: t('info.faq'), icon: HelpCircle },
  ];

  return (
    <section id="info" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">{t('info.travelerGuide')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('info.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('info.subtitle')}
          </p>
        </div>

        <div>
          <Card className="overflow-hidden border-0 shadow-lg">
            <Tabs defaultValue="pagos" className="w-full">
              <div className="bg-muted/50 border-b">
                <TabsList className="w-full h-auto p-0 bg-transparent rounded-none flex flex-wrap">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex-1 min-w-[100px] gap-2 py-4 px-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-none transition-all"
                      data-testid={`tab-trigger-${tab.id}`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <CardContent className="p-6 md:p-8 min-h-[320px]">
                <TabsContent value="pagos" className="mt-0 animate-in fade-in-50 duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{generalInfo.paymentMethods.title}</h3>
                        <p className="text-sm text-muted-foreground">{t('info.flexibleOptions')}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {generalInfo.paymentMethods.methods.map((method, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover-elevate transition-all"
                          data-testid={`payment-method-${index}`}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {paymentIcons[method.icon]}
                          </div>
                          <span className="font-medium">{method.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          {t('info.paymentNote')}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="visados" className="mt-0 animate-in fade-in-50 duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{generalInfo.visaInfo.title}</h3>
                        <p className="text-sm text-muted-foreground">{t('info.entryRequirements')}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {generalInfo.visaInfo.description}
                    </p>
                    
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          {generalInfo.visaInfo.contactNote}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant="default"
                      className="w-full gap-2"
                      onClick={() => window.open("https://wa.me/5521983526144?text=" + encodeURIComponent(t('info.visaWhatsapp')), "_blank")}
                      data-testid="button-visa-contact"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t('info.consultRequirements')}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="moneda" className="mt-0 animate-in fade-in-50 duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Coins className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{generalInfo.currency.title}</h3>
                        <p className="text-sm text-muted-foreground">{t('info.currencyInfo')}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {generalInfo.currency.description}
                    </p>
                    
                    <div className="space-y-2">
                      {generalInfo.currency.currencies.map((currency, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                          data-testid={`currency-item-${index}`}
                        >
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant={currency.primary ? "default" : "secondary"}
                            >
                              {currency.name}
                            </Badge>
                            {currency.primary && (
                              <span className="text-xs text-primary font-medium">{t('info.primary')}</span>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{currency.country}</span>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-sm text-muted-foreground italic text-center pt-2">
                      {t('info.currencyNote')}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="prohibido" className="mt-0 animate-in fade-in-50 duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                        <ShieldAlert className="w-6 h-6 text-destructive" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{generalInfo.prohibitedActivities.title}</h3>
                        <p className="text-sm text-muted-foreground">{t('info.importantRules')}</p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {generalInfo.prohibitedActivities.description}
                    </p>
                    
                    <div className="space-y-3">
                      {generalInfo.prohibitedActivities.items.map((item, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/10"
                          data-testid={`prohibited-item-${index}`}
                        >
                          <Ban className="w-5 h-5 text-destructive flex-shrink-0" />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground text-center">
                        {t('info.violationWarning')}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="faq" className="mt-0 animate-in fade-in-50 duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{t('info.frequentQuestions')}</h3>
                        <p className="text-sm text-muted-foreground">{t('info.commonAnswers')}</p>
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {generalInfo.generalFaqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`} className="border-b border-muted">
                          <AccordionTrigger 
                            className="text-left text-sm font-medium hover:no-underline py-4" 
                            data-testid={`general-faq-trigger-${index}`}
                          >
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('info.notFound')}
                      </p>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => window.open("https://wa.me/5521983526144?text=" + encodeURIComponent(t('info.queryWhatsapp')), "_blank")}
                        data-testid="button-faq-contact"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {t('info.contactAdvisor')}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
}
