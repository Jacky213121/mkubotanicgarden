import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'data', 'plants.json');
const templatePath = path.join(root, 'templates', 'plant-page.html');

const requiredFields = [
  'slug',
  'commonName',
  'scientificName',
  'localName',
  'family',
  'description',
  'foodUses',
  'traditionalUses',
  'otherUses',
  'commemoration',
  'plantedDate',
  'location',
  'medicalNote'
];

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const replaceToken = (source, token, value) => source.replaceAll(`{{${token}}}`, value);

const validateImages = (images, fieldName, slug, { required = false } = {}) => {
  if (!Array.isArray(images) || (required && images.length === 0)) {
    throw new Error(`${fieldName} must be ${required ? 'a non-empty' : 'an'} array for ${slug}.`);
  }

  for (const [index, item] of images.entries()) {
    if (!item || !item.image || !item.alt) {
      throw new Error(`${fieldName}[${index}] must include image and alt for ${slug}.`);
    }
  }
};

const renderFigure = (item, className, loading = 'lazy') => {
  const caption = item.caption
    ? `<figcaption>${escapeHtml(item.caption)}</figcaption>`
    : '';

  return `<figure class="${className}">
            <img src="../../${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" loading="${loading}">
            ${caption}
          </figure>`;
};

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

  validateImages(plant.heroImages, 'heroImages', plant.slug, { required: true });
  const gallery = Array.isArray(plant.gallery) ? plant.gallery : [];
  validateImages(gallery, 'gallery', plant.slug);

  const heroGallery = `<div class="hero-image-scroller" aria-label="${escapeHtml(plant.commonName)} images">
          ${plant.heroImages.map((item, index) => renderFigure(item, 'hero-image-slide', index === 0 ? 'eager' : 'lazy')).join('\n          ')}
        </div>`;

  const gallerySection = gallery.length > 0
    ? `<section class="record-section" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading">More photographs</h2>
          <div class="gallery-scroller" aria-label="More ${escapeHtml(plant.commonName)} photographs">
            ${gallery.map((item) => renderFigure(item, 'gallery-slide')).join('\n            ')}
          </div>
        </section>`
    : '';

  const tokens = {
    COMMON_NAME: escapeHtml(plant.commonName),
    SCIENTIFIC_NAME: escapeHtml(plant.scientificName),
    LOCAL_NAME: escapeHtml(plant.localName),
    FAMILY: escapeHtml(plant.family),
    DESCRIPTION: escapeHtml(plant.description),
    FOOD_USES: escapeHtml(plant.foodUses),
    TRADITIONAL_USES: escapeHtml(plant.traditionalUses),
    OTHER_USES: escapeHtml(plant.otherUses),
    COMMEMORATION: escapeHtml(plant.commemoration),
    PLANTED_DATE: escapeHtml(plant.plantedDate),
    LOCATION: escapeHtml(plant.location),
    MEDICAL_NOTE: escapeHtml(plant.medicalNote),
    HERO_GALLERY: heroGallery,
    GALLERY_SECTION: gallerySection
  };

  let page = template;
  for (const [token, value] of Object.entries(tokens)) {
    page = replaceToken(page, token, value);
  }

  const outputDirectory = path.join(root, 'plants', plant.slug);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'index.html'), page, 'utf8');
}

console.log(`Generated ${plants.length} plant page${plants.length === 1 ? '' : 's'}.`);
