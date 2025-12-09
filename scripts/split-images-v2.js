import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../attached_assets');
const outputDir = path.join(__dirname, '../attached_assets');

const imagesToSplit = [
  { 
    input: 'image_1765242822128.png', 
    leftOutput: 'daytour_carnaval_sambadrome.webp',
    rightOutput: 'daytour_catedral_metropolitana.webp',
    splitOffset: 0,
    leftPadding: -5,
    rightPadding: 5
  },
  { 
    input: 'image_1765242924536.png', 
    leftOutput: 'daytour_cristo_redentor_vista.webp',
    rightOutput: 'daytour_favela_vidigal.webp',
    splitOffset: 0,
    leftPadding: -5,
    rightPadding: 5
  },
  { 
    input: 'image_1765242930534.png', 
    leftOutput: 'daytour_morro_urca_sunset.webp',
    rightOutput: 'daytour_vista_corcovado.webp',
    splitOffset: 0,
    leftPadding: -5,
    rightPadding: 5
  },
  { 
    input: 'image_1765242953092.png', 
    leftOutput: 'daytour_rio_noturno_mirante.webp',
    rightOutput: 'daytour_amanhecer_pedra_bonita.webp',
    splitOffset: 0,
    leftPadding: -5,
    rightPadding: 5
  },
  { 
    input: 'image_1765243621941.png', 
    leftOutput: 'playa_atardecer_leblon.webp',
    rightOutput: 'playa_buggy_arraial.webp',
    splitOffset: 0,
    leftPadding: -5,
    rightPadding: 5
  }
];

async function detectSeam(imagePath) {
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  const centerRegion = Math.floor(width * 0.1);
  const startX = Math.floor(width / 2) - centerRegion;
  const endX = Math.floor(width / 2) + centerRegion;
  
  const { data, info } = await sharp(imagePath)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const columnScores = [];
  
  for (let x = startX; x < endX; x++) {
    let score = 0;
    for (let y = 0; y < height; y++) {
      const idx = y * width + x;
      const idxLeft = y * width + (x - 1);
      const idxRight = y * width + (x + 1);
      
      if (x > 0 && x < width - 1) {
        const gradientH = Math.abs(data[idxRight] - data[idxLeft]);
        score += gradientH;
      }
    }
    columnScores.push({ x, score });
  }
  
  columnScores.sort((a, b) => b.score - a.score);
  
  const bestSeam = columnScores[0].x;
  console.log(`  Detected seam at x=${bestSeam} (center was ${Math.floor(width / 2)})`);
  
  return bestSeam;
}

async function splitImage(config) {
  const inputPath = path.join(inputDir, config.input);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    return;
  }

  console.log(`\nProcessing: ${config.input}`);
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  const width = metadata.width;
  const height = metadata.height;
  
  let seamX;
  try {
    seamX = await detectSeam(inputPath);
  } catch (e) {
    console.log(`  Using center split (detection failed)`);
    seamX = Math.floor(width / 2);
  }
  
  seamX += config.splitOffset || 0;
  
  const leftWidth = seamX + (config.leftPadding || 0);
  const rightStart = seamX + (config.rightPadding || 0);
  const rightWidth = width - rightStart;

  await sharp(inputPath)
    .extract({ left: 0, top: 0, width: Math.max(1, leftWidth), height: height })
    .webp({ quality: 85 })
    .toFile(path.join(outputDir, config.leftOutput));
  
  console.log(`  Created: ${config.leftOutput} (width: ${leftWidth}px)`);

  await sharp(inputPath)
    .extract({ left: rightStart, top: 0, width: Math.max(1, rightWidth), height: height })
    .webp({ quality: 85 })
    .toFile(path.join(outputDir, config.rightOutput));
  
  console.log(`  Created: ${config.rightOutput} (width: ${rightWidth}px)`);
}

async function main() {
  console.log('Starting improved image splitting process...');
  console.log('Using seam detection with edge analysis\n');
  
  for (const config of imagesToSplit) {
    try {
      await splitImage(config);
    } catch (error) {
      console.error(`Error processing ${config.input}:`, error.message);
    }
  }
  
  console.log('\n✓ Image splitting complete!');
}

main().catch(console.error);
