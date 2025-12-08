import { build as viteBuild } from "vite";
import { rm, readFile, writeFile, copyFile, mkdir, readdir } from "fs/promises";
import { existsSync } from "fs";
import { execSync } from "child_process";
import * as cheerio from "cheerio";
import path from "path";
import {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  SEO_BY_LANGUAGE,
  OG_LOCALES,
  getHreflangLinks,
  getAllSchemasForLanguage,
  getCanonicalUrl,
} from "../shared/seo-manifest";

function getDateModified(): string {
  try {
    const date = execSync("git log -1 --pretty=%cI").toString().trim();
    return date || new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function injectSEOForLanguage(
  html: string,
  lang: SupportedLanguage,
  dateModified: string
): string {
  const $ = cheerio.load(html);
  const seo = SEO_BY_LANGUAGE[lang];
  const canonical = getCanonicalUrl(lang);
  const ogLocale = OG_LOCALES[lang];

  $("html").attr("lang", lang);
  $("title").text(seo.title);
  $('meta[name="description"]').attr("content", seo.description);
  $('meta[name="keywords"]').attr("content", seo.keywords);
  $('link[rel="canonical"]').attr("href", canonical);
  $('meta[property="og:title"]').attr("content", seo.title);
  $('meta[property="og:description"]').attr("content", seo.description);
  $('meta[property="og:url"]').attr("content", canonical);
  $('meta[property="og:locale"]').attr("content", ogLocale);
  $('meta[name="twitter:title"]').attr("content", seo.title);
  $('meta[name="twitter:description"]').attr("content", seo.description);

  $('link[rel="alternate"][hreflang]').remove();
  const hreflangLinks = getHreflangLinks();
  const canonicalLink = $('link[rel="canonical"]');
  hreflangLinks.forEach(({ lang: hrefLang, url }) => {
    canonicalLink.after(
      `<link rel="alternate" hreflang="${hrefLang}" href="${url}" />`
    );
  });

  if (!$('meta[property="article:modified_time"]').length) {
    $("head").append(
      `<meta property="article:modified_time" content="${dateModified}" />`
    );
  } else {
    $('meta[property="article:modified_time"]').attr("content", dateModified);
  }

  if (!$('meta[name="last-modified"]').length) {
    $("head").append(`<meta name="last-modified" content="${dateModified}" />`);
  }

  $('script[type="application/ld+json"]').remove();
  const schemas = getAllSchemasForLanguage(lang);
  schemas.forEach((schema) => {
    $("head").append(
      `<script type="application/ld+json">${JSON.stringify(schema, null, 0)}</script>`
    );
  });

  return $.html();
}

async function copyDirectory(src: string, dest: string) {
  if (!existsSync(src)) return;
  
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
}

async function processHtmlForSEO() {
  const distPublicPath = "dist/public";
  const indexPath = `${distPublicPath}/index.html`;

  if (!existsSync(indexPath)) {
    console.log("No index.html found in dist/public, skipping SEO processing");
    return;
  }

  console.log("Processing HTML for multi-language SEO...");
  const dateModified = getDateModified();
  console.log(`Using dateModified: ${dateModified}`);

  const originalHtml = await readFile(indexPath, "utf-8");

  for (const lang of SUPPORTED_LANGUAGES) {
    console.log(`  Generating SEO for language: ${lang}`);
    const seoHtml = injectSEOForLanguage(originalHtml, lang, dateModified);

    if (lang === "es") {
      await writeFile(indexPath, seoHtml, "utf-8");
      console.log(`    Updated: index.html (default Spanish)`);
    }
    
    const langHtmlPath = `${distPublicPath}/${lang}.html`;
    await writeFile(langHtmlPath, seoHtml, "utf-8");
    console.log(`    Created: ${lang}.html`);
  }

  console.log("SEO processing complete!");
}

async function copyStaticSEOPages() {
  const srcPublic = "client/public";
  const distPublic = "dist/public";

  console.log("Copying static SEO pages from client/public...");

  const filesToCopy = [
    "robots.txt",
    "sitemap.xml",
    "ai.txt",
    "favicon.png",
    "logo.png",
  ];

  for (const file of filesToCopy) {
    const srcPath = path.join(srcPublic, file);
    const destPath = path.join(distPublic, file);
    if (existsSync(srcPath)) {
      await copyFile(srcPath, destPath);
      console.log(`  Copied: ${file}`);
    }
  }

  await copyDirectory(path.join(srcPublic, "images"), path.join(distPublic, "images"));
  console.log("  Copied: images/");

  await copyDirectory(path.join(srcPublic, "videos"), path.join(distPublic, "videos"));
  console.log("  Copied: videos/");

  console.log("Static files copy complete!");
}

async function createCloudflareFiles() {
  const distPublic = "dist/public";

  const redirects = `# Cloudflare Pages Redirects
# Language routes - serve the static HTML files
/es    /es.html    200
/en    /en.html    200
/pt    /pt.html    200
/fr    /fr.html    200
/it    /it.html    200

# About pages
/about-es    /about-es.html    200
/about-en    /about-en.html    200
/about-pt    /about-pt.html    200
/about-fr    /about-fr.html    200
/about-it    /about-it.html    200

# Privacy pages
/privacy-es    /privacy-es.html    200
/privacy-en    /privacy-en.html    200
/privacy-pt    /privacy-pt.html    200
/privacy-fr    /privacy-fr.html    200
/privacy-it    /privacy-it.html    200

# SPA fallback - all other routes go to index.html
/*    /index.html    200
`;

  const headers = `# Cloudflare Pages Headers
# SEO and caching headers for Rio Trip Vibes

/*.html
  Cache-Control: public, max-age=3600
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN

/sitemap.xml
  Content-Type: application/xml
  Cache-Control: public, max-age=86400

/robots.txt
  Content-Type: text/plain
  Cache-Control: public, max-age=86400

/ai.txt
  Content-Type: text/plain
  Cache-Control: public, max-age=86400

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=604800

/videos/*
  Cache-Control: public, max-age=604800
`;

  await writeFile(path.join(distPublic, "_redirects"), redirects);
  console.log("Created: _redirects (Cloudflare routing)");

  await writeFile(path.join(distPublic, "_headers"), headers);
  console.log("Created: _headers (Cloudflare caching)");
}

async function copyPrerenderedPages() {
  const srcPublic = "client/public";
  const distPublic = "dist/public";

  console.log("Copying pre-rendered SEO pages...");

  const htmlFiles = [
    "about-es.html", "about-en.html", "about-pt.html", "about-fr.html", "about-it.html",
    "privacy-es.html", "privacy-en.html", "privacy-pt.html", "privacy-fr.html", "privacy-it.html",
  ];

  for (const file of htmlFiles) {
    const srcPath = path.join(srcPublic, file);
    const destPath = path.join(distPublic, file);
    if (existsSync(srcPath)) {
      await copyFile(srcPath, destPath);
      console.log(`  Copied: ${file}`);
    }
  }
}

async function buildStatic() {
  console.log("=".repeat(50));
  console.log("Building Static Site for Cloudflare Pages");
  console.log("=".repeat(50));
  console.log("");

  await rm("dist", { recursive: true, force: true });

  console.log("Step 1: Building client with Vite...");
  await viteBuild();

  console.log("");
  console.log("Step 2: Processing HTML for SEO...");
  await processHtmlForSEO();

  console.log("");
  console.log("Step 3: Copying static SEO assets...");
  await copyStaticSEOPages();

  console.log("");
  console.log("Step 4: Copying pre-rendered pages...");
  await copyPrerenderedPages();

  console.log("");
  console.log("Step 5: Creating Cloudflare configuration files...");
  await createCloudflareFiles();

  console.log("");
  console.log("=".repeat(50));
  console.log("Static build complete!");
  console.log("Output: dist/public/");
  console.log("=".repeat(50));
}

buildStatic().catch((err) => {
  console.error(err);
  process.exit(1);
});
