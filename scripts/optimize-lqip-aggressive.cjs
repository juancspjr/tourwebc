const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const lqipDirs = [
  path.join(__dirname, '../public/lqip'),
  path.join(__dirname, '../attached_assets/lqip')
];

async function optimizeLQIP() {
  let totalSaved = 0;
  let filesProcessed = 0;

  for (const lqipDir of lqipDirs) {
    if (!fs.existsSync(lqipDir)) {
      console.log(`Directory not found: ${lqipDir}`);
      continue;
    }

    const files = fs.readdirSync(lqipDir).filter(f => f.endsWith('-lqip.jpg'));
    console.log(`\nProcessing ${files.length} LQIP files in ${lqipDir}...`);

    for (const file of files) {
      const inputPath = path.join(lqipDir, file);
      const tempPath = path.join(lqipDir, `temp_${file}`);
      
      try {
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;

        await sharp(inputPath)
          .resize(10, 10, {
            fit: 'cover',
            withoutEnlargement: false
          })
          .jpeg({
            quality: 15,
            progressive: false,
            mozjpeg: true
          })
          .toFile(tempPath);

        const newStats = fs.statSync(tempPath);
        const newSize = newStats.size;

        if (newSize < originalSize) {
          fs.unlinkSync(inputPath);
          fs.renameSync(tempPath, inputPath);
          const saved = originalSize - newSize;
          totalSaved += saved;
          filesProcessed++;
          console.log(`  ${file}: ${(originalSize / 1024).toFixed(2)}kB → ${(newSize / 1024).toFixed(2)}kB (saved ${(saved / 1024).toFixed(2)}kB)`);
        } else {
          fs.unlinkSync(tempPath);
          console.log(`  ${file}: Already optimized (${(originalSize / 1024).toFixed(2)}kB)`);
        }
      } catch (err) {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
        console.error(`  Error processing ${file}:`, err.message);
      }
    }
  }

  console.log(`\n✅ LQIP Optimization Complete!`);
  console.log(`   Files processed: ${filesProcessed}`);
  console.log(`   Total saved: ${(totalSaved / 1024).toFixed(2)} kB`);
}

optimizeLQIP().catch(console.error);
