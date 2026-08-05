import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'data', 'plants.json');
const templatePath = path.join(root, 'templates', 'plant-page.html');
const homePath = path.join(root, 'index.html');

const requiredFields = [
  'slug',
  'commonName',
  'scientificName',
  'identificationStatus',
  'localName',
  'family',
  'description',
  'foodUses',
  'traditionalUses',
  'otherUses',
  'commemoration',
  'plantedDate',
  'location',
  'mainImage',
  'mainImageAlt',
  'mainImageCaption',
  'identificationNote',
  'medicalNote'
];

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const replaceToken = (source, token, value) => source.replaceAll(`{{${token}}}`, value);

const plants = JSON.parse(await readFile(dataPath, 'utf8'));
const template = await readFile(templatePath, 'utf8');

if (!Array.isArray(plants) || plants.length === 0) {
  throw new Error('data/plants.json must contain at least one plant record.');
}

const slugs = new Set();
for (const plant of plants) {
  for (const field of requiredFields) {
    if (!plant[field] || String(plant[field]).trim() === '') {
      throw new Error(`Plant record is missing required field: ${field}`);
    }
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(plant.slug)) {
    throw new Error(`Invalid slug: ${plant.slug}`);
  }
  if (slugs.has(plant.slug)) {
    throw new Error(`Duplicate plant slug: ${plant.slug}`);
  }
  slugs.add(plant.slug);

  const gallery = Array.isArray(plant.gallery) ? plant.gallery : [];
  const gallerySection = gallery.length > 0
    ? `<section class="record-section" aria-labelledby="gallery-heading">
          <span class="section-kicker">Plant photographs</span>
          <h2 id="gallery-heading">Flower and fruit</h2>
          <div class="gallery-grid">
            ${gallery.map((item) => `<figure><img src="../../${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" loading="lazy"><figcaption>${escapeHtml(item.caption)}</figcaption></figure>`).join('\n            ')}
          </div>
        </section>`
    : '';

  const references = Array.isArray(plant.references) ? plant.references : [];
  const referencesContent = references.length > 0
    ? `<ol class="reference-list">${references.map((reference) => `<li>${escapeHtml(reference)}</li>`).join('')}</ol>`
    : '<p>References, the reviewing department and the date of academic approval will appear here before the page is treated as authoritative.</p>';

  const tokens = {
    COMMON_NAME: escapeHtml(plant.commonName),
    SCIENTIFIC_NAME: escapeHtml(plant.scientificName),
    IDENTIFICATION_STATUS: escapeHtml(plant.identificationStatus),
    LOCAL_NAME: escapeHtml(plant.localName),
    FAMILY: escapeHtml(plant.family),
    DESCRIPTION: escapeHtml(plant.description),
    FOOD_USES: escapeHtml(plant.foodUses),
    TRADITIONAL_USES: escapeHtml(plant.traditionalUses),
    OTHER_USES: escapeHtml(plant.otherUses),
    COMMEMORATION: escapeHtml(plant.commemoration),
    PLANTED_DATE: escapeHtml(plant.plantedDate),
    LOCATION: escapeHtml(plant.location),
    MAIN_IMAGE: escapeHtml(plant.mainImage),
    MAIN_IMAGE_ALT: escapeHtml(plant.mainImageAlt),
    MAIN_IMAGE_CAPTION: escapeHtml(plant.mainImageCaption),
    IDENTIFICATION_NOTE: escapeHtml(plant.identificationNote),
    MEDICAL_NOTE: escapeHtml(plant.medicalNote),
    GALLERY_SECTION: gallerySection,
    REFERENCES_CONTENT: referencesContent
  };

  let page = template;
  for (const [token, value] of Object.entries(tokens)) {
    page = replaceToken(page, token, value);
  }

  const outputDirectory = path.join(root, 'plants', plant.slug);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'index.html'), page, 'utf8');
}

const cards = plants.map((plant) => `          <a class="plant-card plant-card-featured" href="plants/${escapeHtml(plant.slug)}/">
            <div class="plant-card-image">
              <img src="${escapeHtml(plant.mainImage)}" alt="${escapeHtml(plant.mainImageAlt)}" loading="lazy">
            </div>
            <div class="plant-card-copy">
              <span>Plant profile</span>
              <h3>${escapeHtml(plant.commonName)}</h3>
              <p class="latin"><em>${escapeHtml(plant.scientificName)}</em></p>
              <p class="meta">${escapeHtml(plant.localName)} · ${escapeHtml(plant.family)}</p>
            </div>
          </a>`).join('\n');

let homepage = await readFile(homePath, 'utf8');
const startMarker = '<!-- PLANT_CARDS_START -->';
const endMarker = '<!-- PLANT_CARDS_END -->';
const start = homepage.indexOf(startMarker);
const end = homepage.indexOf(endMarker);

if (start === -1 || end === -1 || end < start) {
  throw new Error('index.html is missing the plant card build markers.');
}

homepage = `${homepage.slice(0, start + startMarker.length)}\n${cards}\n        ${homepage.slice(end)}`;
await writeFile(homePath, homepage, 'utf8');

console.log(`Generated ${plants.length} plant page${plants.length === 1 ? '' : 's'}.`);
