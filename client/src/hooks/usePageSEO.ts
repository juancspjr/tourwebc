import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export function usePageSEO({ title, description, keywords }: SEOProps) {
  useEffect(() => {
    const previousTitle = document.title;
    
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";
    
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    const previousKeywords = metaKeywords?.getAttribute("content") || "";
    
    if (keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    const previousOgTitle = ogTitle?.getAttribute("content") || "";
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    const previousOgDescription = ogDescription?.getAttribute("content") || "";
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }
    
    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
      if (metaKeywords && previousKeywords) {
        metaKeywords.setAttribute("content", previousKeywords);
      }
      if (ogTitle) {
        ogTitle.setAttribute("content", previousOgTitle);
      }
      if (ogDescription) {
        ogDescription.setAttribute("content", previousOgDescription);
      }
    };
  }, [title, description, keywords]);
}
