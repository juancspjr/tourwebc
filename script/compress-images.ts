import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_DIR = './attached_assets';
const TARGET_SIZE_KB = 200;
const MIN_QUALITY = 50;
const START_QUALITY = 80;

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
  
  if (originalSize < TARGET_SIZE_KB * 1024) {
    console.log(`Skipping ${filename} - already small (${(originalSize / 1024).toFixed(1)} KB)`);
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
    
    const maxWidth = 1920;
    const needsResize = metadata.width && metadata.width > maxWidth;
    
    while (quality >= MIN_QUALITY) {
      let pipeline = sharp(filePath);
      
      if (needsResize) {
        pipeline = pipeline.resize(maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside',
        });
      }
      
      if (ext === '.webp') {
        bestResult = await pipeline
          .webp({ quality, effort: 6 })
          .toBuffer();
      } else if (ext === '.png') {
        bestResult = await pipeline
          .png({ quality, compressionLevel: 9 })
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
      console.log(`Compressed ${filename}: ${(originalSize / 1024).toFixed(1)} KB -> ${(bestResult.length / 1024).toFixed(1)} KB (${savings}% saved)`);
      
      return {
        file: filename,
        originalSize,
        compressedSize: bestResult.length,
        savings: `${savings}%`,
      };
    } else {
      console.log(`Skipping ${filename} - compression would increase size`);
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
  console.log('Starting image compression...\n');
  console.log('SEO Note: Filenames are preserved for SEO purposes.\n');
  
  const files = await getImageFiles(INPUT_DIR);
  const sortedFiles = files
    .map(f => ({ path: f, size: fs.statSync(f).size }))
    .sort((a, b) => b.size - a.size);
  
  console.log(`Found ${files.length} images. Processing largest files first...\n`);
  
  const results: CompressionResult[] = [];
  let totalOriginal = 0;
  let totalCompressed = 0;
  
  for (const { path: filePath, size } of sortedFiles) {
    if (size > 100 * 1024) {
      const result = await compressImage(filePath);
      results.push(result);
      totalOriginal += result.originalSize;
      totalCompressed += result.compressedSize;
    }
  }
  
  console.log('\n=== Compression Summary ===');
  console.log(`Total original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total compressed size: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total savings: ${((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2)} MB (${((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(1)}%)`);
  console.log('\nFilenames preserved for SEO purposes.');
}

main().catch(console.error);
