import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl = 'https://riotripvibes.com',
  ogImage = 'https://riotripvibes.com/logo.png',
  ogType = 'website',
  noIndex = false,
}: SEOProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'es';

  const defaultTitle = 'Rio Trip Vibes - Tours Profesionales | Río de Janeiro, Egipto y Mundiales';
  const defaultDescription = 'Agencia de viajes profesional. Tours en Río de Janeiro, Egipto y destinos mundiales. +1000 clientes satisfechos. Descuentos grupos 15%. Day Tours, Favelas, Playas, Trekking, Yate VIP y Helicóptero.';
  const defaultKeywords = 'tours río de janeiro, viajes egipto, agencia de viajes, tours profesionales, paquetes turísticos, excursiones brasil';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      <html lang={currentLang} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Rio Trip Vibes" />
      <meta property="og:locale" content={`${currentLang}_${currentLang === 'es' ? 'ES' : currentLang === 'pt' ? 'BR' : 'US'}`} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
