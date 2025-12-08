import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import {
  SEO_BY_LANGUAGE,
  OG_LOCALES,
  BASE_URL,
  getHreflangLinks,
  getCanonicalUrl,
  getAllSchemasForLanguage,
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
} from '@shared/seo-manifest';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

function isValidLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = `${BASE_URL}/logo.png`,
  ogType = 'website',
  noIndex = false,
}: SEOProps) {
  const { i18n } = useTranslation();
  const rawLang = i18n.resolvedLanguage || i18n.language || 'es';
  const currentLang = rawLang.split('-')[0].split('_')[0];
  const validLang: SupportedLanguage = isValidLanguage(currentLang) ? currentLang : 'es';
  const initialLangRef = useRef<string | null>(null);

  const seoData = SEO_BY_LANGUAGE[validLang];
  const ogLocale = OG_LOCALES[validLang];
  const canonical = canonicalUrl || getCanonicalUrl(validLang);
  const hreflangLinks = getHreflangLinks();

  const finalTitle = title || seoData.title;
  const finalDescription = description || seoData.description;
  const finalKeywords = keywords || seoData.keywords;

  useEffect(() => {
    if (initialLangRef.current === null) {
      initialLangRef.current = validLang;
    }

    const languageChanged = initialLangRef.current !== validLang;

    if (languageChanged) {
      const allSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      allSchemas.forEach(el => el.remove());
    } else {
      const dynamicSchemas = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
      dynamicSchemas.forEach(el => el.remove());
    }

    const schemas = getAllSchemasForLanguage(validLang);
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const dynamicSchemas = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
      dynamicSchemas.forEach(el => el.remove());
    };
  }, [validLang]);

  return (
    <Helmet>
      <html lang={validLang} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={canonical} />
      
      {hreflangLinks.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Rio Trip Vibes" />
      <meta property="og:locale" content={ogLocale} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
