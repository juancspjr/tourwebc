import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = './attached_assets';
const TARGET_SIZE_KB = 80; // More aggressive target
const MIN_QUALITY = 30; // Allow lower quality
const START_QUALITY = 60; // Start lower
const MAX_WIDTH = 1280; // Reduce max width

interface CompressionResult {
  file: string;
  originalSize: number;
  compressedSize: number;
  savings: string;
  skipped?: boolean;
}

async function getImageFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      const subFiles = await getImageFiles(fullPath);
      files.push(...subFiles);
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(item.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function compressImage(filePath: string): Promise<CompressionResult> {
  const originalSize = fs.statSync(filePath).size;
  const ext = path.extname(filePath).toLowerCase();
  const filename = path.basename(filePath);
  
  // Skip very small images
  if (originalSize < 50 * 1024) {
    console.log(`Skipping ${filename} - already tiny (${(originalSize / 1024).toFixed(1)} KB)`);
    return {
      file: filename,
      originalSize,
      compressedSize: originalSize,
      savings: '0%',
      skipped: true,
    };
  }

  const tempPath = filePath + '.tmp';
  let quality = START_QUALITY;
  let bestResult: Buffer | null = null;
  
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize to max width
    const needsResize = metadata.width && metadata.width > MAX_WIDTH;
    
    while (quality >= MIN_QUALITY) {
      let pipeline = sharp(filePath);
      
      if (needsResize) {
        pipeline = pipeline.resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside',
        });
      }
      
      // Convert everything to WebP for best compression
      if (ext === '.png' || ext === '.webp') {
        bestResult = await pipeline
          .webp({ quality, effort: 6, alphaQuality: quality })
          .toBuffer();
      } else {
        bestResult = await pipeline
          .jpeg({ quality, mozjpeg: true })
          .toBuffer();
      }
      
      if (bestResult.length <= TARGET_SIZE_KB * 1024 || quality === MIN_QUALITY) {
        break;
      }
      
      quality -= 5;
    }
    
    if (bestResult && bestResult.length < originalSize) {
      fs.writeFileSync(tempPath, bestResult);
      fs.renameSync(tempPath, filePath);
      
      const savings = ((originalSize - bestResult.length) / originalSize * 100).toFixed(1);
      console.log(`Compressed ${filename}: ${(originalSize / 1024).toFixed(1)} KB -> ${(bestResult.length / 1024).toFixed(1)} KB (${savings}% saved, q=${quality})`);
      
      return {
        file: filename,
        originalSize,
        compressedSize: bestResult.length,
        savings: `${savings}%`,
      };
    } else {
      console.log(`Skipping ${filename} - already optimized`);
      return {
        file: filename,
        originalSize,
        compressedSize: originalSize,
        savings: '0%',
        skipped: true,
      };
    }
  } catch (error) {
    console.error(`Error compressing ${filename}:`, error);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    return {
      file: filename,
      originalSize,
      compressedSize: originalSize,
      savings: '0%',
      skipped: true,
    };
  }
}

async function main() {
  console.log('Starting AGGRESSIVE image compression...\n');
  console.log(`Target: ${TARGET_SIZE_KB}KB, Max Width: ${MAX_WIDTH}px, Min Quality: ${MIN_QUALITY}\n`);
  
  const files = await getImageFiles(INPUT_DIR);
  const sortedFiles = files
    .map(f => ({ path: f, size: fs.statSync(f).size }))
    .sort((a, b) => b.size - a.size);
  
  console.log(`Found ${files.length} images. Processing...\n`);
  
  const results: CompressionResult[] = [];
  let totalOriginal = 0;
  let totalCompressed = 0;
  
  for (const { path: filePath, size } of sortedFiles) {
    // Process all images over 50KB
    if (size > 50 * 1024) {
      const result = await compressImage(filePath);
      results.push(result);
      totalOriginal += result.originalSize;
      totalCompressed += result.compressedSize;
    }
  }
  
  console.log('\n=== AGGRESSIVE Compression Summary ===');
  console.log(`Total original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total compressed size: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total savings: ${((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2)} MB (${((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(1)}%)`);
}

main().catch(console.error);
