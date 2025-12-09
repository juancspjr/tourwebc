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
    leftAlt: 'Sambódromo Carnaval Rio de Janeiro',
    rightAlt: 'Catedral Metropolitana São Sebastião Rio'
  },
  { 
    input: 'image_1765242924536.png', 
    leftOutput: 'daytour_cristo_redentor_vista.webp',
    rightOutput: 'daytour_favela_vidigal.webp',
    leftAlt: 'Vista Cristo Redentor Pão de Açúcar',
    rightAlt: 'Favela Vidigal vista panorámica Rio'
  },
  { 
    input: 'image_1765242930534.png', 
    leftOutput: 'daytour_morro_urca_sunset.webp',
    rightOutput: 'daytour_vista_corcovado.webp',
    leftAlt: 'Morro da Urca atardecer helipuerto Rio',
    rightAlt: 'Vista Corcovado desde Pedra da Gávea'
  },
  { 
    input: 'image_1765242953092.png', 
    leftOutput: 'daytour_rio_noturno_mirante.webp',
    rightOutput: 'daytour_amanhecer_pedra_bonita.webp',
    leftAlt: 'Rio de Janeiro vista nocturna mirante',
    rightAlt: 'Amanecer Pedra Bonita Rio de Janeiro'
  }
];

async function splitImage(config) {
  const inputPath = path.join(inputDir, config.input);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    return;
  }

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  const width = metadata.width;
  const height = metadata.height;
  const halfWidth = Math.floor(width / 2);

  // Left half
  await sharp(inputPath)
    .extract({ left: 0, top: 0, width: halfWidth, height: height })
    .webp({ quality: 85 })
    .toFile(path.join(outputDir, config.leftOutput));
  
  console.log(`Created: ${config.leftOutput}`);

  // Right half
  await sharp(inputPath)
    .extract({ left: halfWidth, top: 0, width: halfWidth, height: height })
    .webp({ quality: 85 })
    .toFile(path.join(outputDir, config.rightOutput));
  
  console.log(`Created: ${config.rightOutput}`);
}

async function main() {
  console.log('Starting image splitting process...\n');
  
  for (const config of imagesToSplit) {
    try {
      await splitImage(config);
    } catch (error) {
      console.error(`Error processing ${config.input}:`, error.message);
    }
  }
  
  console.log('\nImage splitting complete!');
}

main().catch(console.error);
