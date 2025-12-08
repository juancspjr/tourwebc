#!/bin/bash
# Deploy to Cloudflare Pages
# Adapted for Rio Trip Vibes static site

set -e

echo "================================================"
echo "   Rio Trip Vibes - Cloudflare Pages Deploy"
echo "================================================"

echo ""
echo "Step 1: Installing dependencies..."
npm install

echo ""
echo "Step 2: Building static site..."
npm run build:static

echo ""
echo "Step 3: Verifying build output..."
if [ ! -d "dist/public" ]; then
    echo "Error: dist/public directory not found!"
    exit 1
fi

echo "Build contents:"
ls -la dist/public/

echo ""
echo "Step 4: Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist/public --project-name=riotripvibes --branch=main

echo ""
echo "================================================"
echo "   Deploy completed successfully!"
echo "================================================"
echo ""
echo "Your site should be live at:"
echo "  - https://riotripvibes.pages.dev"
echo "  - https://riotripvibes.com (if custom domain configured)"
echo ""
