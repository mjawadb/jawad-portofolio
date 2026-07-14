import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');
const componentsDir = path.join(__dirname, 'src', 'components');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else if (fullPath.endsWith('.png')) {
      const webpPath = fullPath.replace(/\.png$/, '.webp');
      console.log(`Compressing ${fullPath} to WebP...`);
      await sharp(fullPath).webp({ quality: 75 }).toFile(webpPath);
      // Delete original PNG
      fs.unlinkSync(fullPath);
    }
  }
}

async function updateCodebase(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await updateCodebase(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('.png')) {
        content = content.replace(/\.png/g, '.webp');
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  }
}

async function run() {
  console.log('Starting compression...');
  await processDirectory(assetsDir);
  console.log('Images converted. Updating codebase...');
  await updateCodebase(componentsDir);
  console.log('Done!');
}

run();
