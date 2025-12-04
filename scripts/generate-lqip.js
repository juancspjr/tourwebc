import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../attached_assets');
const outputDir = path.join(__dirname, '../attached_assets/lqip');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const imageExtensions = /\.(jpg|jpeg|png|webp)$/i;

async function generateLQIP(filePath, filename) {
  const outputFilename = filename.replace(imageExtensions, '-lqip.jpg');
  const outputPath = path.join(outputDir, outputFilename);
  
  try {
    const info = await sharp(filePath)
      .resize(20, 20, { fit: 'cover' })
      .blur(10)
      .jpeg({ quality: 60 })
      .toFile(outputPath);
    
    console.log(`Done: ${filename} -> ${(info.size / 1024).toFixed(2)}KB`);
    return { success: true, filename, size: info.size };
  } catch (err) {
    console.error(`Error: ${filename}: ${err.message}`);
    return { success: false, filename, error: err.message };
  }
}

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name !== 'lqip') {
        const subResults = await processDirectory(fullPath);
        results.push(...subResults);
      }
    } else if (imageExtensions.test(entry.name)) {
      const result = await generateLQIP(fullPath, entry.name);
      results.push(result);
    }
  }
  
  return results;
}

async function main() {
  console.log('Generating LQIP images...\n');
  console.log(`Source: ${imagesDir}`);
  console.log(`Output: ${outputDir}\n`);
  
  const results = await processDirectory(imagesDir);
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Completed: ${successful.length} images`);
  if (failed.length > 0) {
    console.log(`Failed: ${failed.length} images`);
  }
  
  const totalSize = successful.reduce((acc, r) => acc + r.size, 0);
  console.log(`Total LQIP size: ${(totalSize / 1024).toFixed(2)}KB`);
}

main().catch(console.error);
