import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const SUPPORTED_LANGUAGES = ['es', 'en', 'pt', 'fr', 'it'] as const;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'client', 'public');

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // SEO Routes: Serve static HTML pages for each language
  // These routes serve pre-rendered HTML for search engine bots
  SUPPORTED_LANGUAGES.forEach(lang => {
    // Route: /es, /en, /pt, /fr, /it -> serve [lang].html
    app.get(`/${lang}`, (_req, res) => {
      const htmlPath = path.join(publicDir, `${lang}.html`);
      if (fs.existsSync(htmlPath)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.sendFile(htmlPath);
      } else {
        res.redirect('/');
      }
    });

    // Route: /about-es, /about-en, etc. -> serve about-[lang].html
    app.get(`/about-${lang}`, (_req, res) => {
      const htmlPath = path.join(publicDir, `about-${lang}.html`);
      if (fs.existsSync(htmlPath)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.sendFile(htmlPath);
      } else {
        res.redirect('/');
      }
    });

    // Route: /privacy-es, /privacy-en, etc. -> serve privacy-[lang].html
    app.get(`/privacy-${lang}`, (_req, res) => {
      const htmlPath = path.join(publicDir, `privacy-${lang}.html`);
      if (fs.existsSync(htmlPath)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.sendFile(htmlPath);
      } else {
        res.redirect('/');
      }
    });
  });

  // Serve robots.txt
  app.get('/robots.txt', (_req, res) => {
    const robotsPath = path.join(publicDir, 'robots.txt');
    res.setHeader('Content-Type', 'text/plain');
    res.sendFile(robotsPath);
  });

  // Serve sitemap.xml
  app.get('/sitemap.xml', (_req, res) => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    res.setHeader('Content-Type', 'application/xml');
    res.sendFile(sitemapPath);
  });

  // Serve ai.txt for AI crawlers
  app.get('/ai.txt', (_req, res) => {
    const aiTxtPath = path.join(publicDir, 'ai.txt');
    if (fs.existsSync(aiTxtPath)) {
      res.setHeader('Content-Type', 'text/plain');
      res.sendFile(aiTxtPath);
    } else {
      res.status(404).send('Not found');
    }
  });

  return httpServer;
}
