import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';

const ASSETS_DIR = './attached_assets';
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 78;

async function getAllImageFiles(dir) {
  const files = [];
  const items = await readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getAllImageFiles(fullPath));
    } else if (/\.(png|jpg|jpeg|webp)$/i.test(item.name)) {
      if (!item.name.includes('lqip') && !item.name.includes('_optimized')) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const stats = await stat(filePath);
  const originalSize = stats.size;
  const ext = extname(filePath).toLowerCase();
  const fileName = basename(filePath, ext);
  const dir = dirname(filePath);
  
  if (originalSize < 50 * 1024) {
    console.log(`SKIP (small): ${filePath} (${(originalSize / 1024).toFixed(1)} KB)`);
    return { skipped: true, saved: 0 };
  }

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    let pipeline = image;
    
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const newPath = join(dir, `${fileName}.webp`);
      await pipeline.webp({ quality: QUALITY }).toFile(newPath);
      
      const newStats = await stat(newPath);
      const saved = originalSize - newStats.size;
      
      console.log(`CONVERTED: ${filePath} -> ${newPath}`);
      console.log(`  ${(originalSize / 1024).toFixed(1)} KB -> ${(newStats.size / 1024).toFixed(1)} KB (saved ${(saved / 1024).toFixed(1)} KB)`);
      
      await unlink(filePath);
      return { skipped: false, saved, converted: true };
    } else if (ext === '.webp') {
      const tempPath = join(dir, `${fileName}_temp.webp`);
      await pipeline.webp({ quality: QUALITY }).toFile(tempPath);
      
      const newStats = await stat(tempPath);
      
      if (newStats.size < originalSize * 0.9) {
        await unlink(filePath);
        await rename(tempPath, filePath);
        const saved = originalSize - newStats.size;
        console.log(`OPTIMIZED: ${filePath}`);
        console.log(`  ${(originalSize / 1024).toFixed(1)} KB -> ${(newStats.size / 1024).toFixed(1)} KB (saved ${(saved / 1024).toFixed(1)} KB)`);
        return { skipped: false, saved };
      } else {
        await unlink(tempPath);
        console.log(`SKIP (already optimal): ${filePath}`);
        return { skipped: true, saved: 0 };
      }
    }
  } catch (error) {
    console.error(`ERROR: ${filePath}: ${error.message}`);
    return { skipped: true, saved: 0, error: true };
  }
  
  return { skipped: true, saved: 0 };
}

async function main() {
  console.log('=== Image Optimization Script ===\n');
  console.log(`Settings: Max ${MAX_WIDTH}x${MAX_HEIGHT}, Quality: ${QUALITY}%\n`);
  
  const files = await getAllImageFiles(ASSETS_DIR);
  console.log(`Found ${files.length} image files to process\n`);
  
  let totalSaved = 0;
  let processed = 0;
  let skipped = 0;
  let converted = 0;

  for (const file of files) {
    const result = await optimizeImage(file);
    if (result.skipped) {
      skipped++;
    } else {
      processed++;
      totalSaved += result.saved;
      if (result.converted) converted++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Processed: ${processed} files`);
  console.log(`Converted to WebP: ${converted} files`);
  console.log(`Skipped: ${skipped} files`);
  console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
