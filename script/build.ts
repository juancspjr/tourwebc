import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, writeFile, copyFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { execSync } from "child_process";
import * as cheerio from "cheerio";
import {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  SEO_BY_LANGUAGE,
  OG_LOCALES,
  BASE_URL,
  getHreflangLinks,
  getAllSchemasForLanguage,
  getCanonicalUrl,
} from "../shared/seo-manifest";

const allowlist = [
  "@google/generative-ai",
  "@neondatabase/serverless",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

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
    } else {
      const langHtmlPath = `${distPublicPath}/${lang}.html`;
      await writeFile(langHtmlPath, seoHtml, "utf-8");
      console.log(`    Created: ${lang}.html`);
    }
  }

  console.log("SEO processing complete!");
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("processing SEO...");
  await processHtmlForSEO();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
