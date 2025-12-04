import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve static assets with proper cache headers
  app.use(express.static(distPath, {
    maxAge: '1y', // Cache static assets for 1 year
    immutable: true, // Assets with hashes are immutable
    etag: true, // Enable ETag for cache validation
    lastModified: true,
    setHeaders: (res, filePath) => {
      // Set Cache-Control headers based on file type
      if (filePath.endsWith('.html')) {
        // HTML should not be cached for long
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$/)) {
        // Static assets can be cached aggressively
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
