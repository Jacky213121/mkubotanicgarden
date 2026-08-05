# MKU Botanic Garden

A mobile-first plant information catalogue designed for QR-linked plant labels at the MKU Botanic Garden.

## Current direction

The project no longer depends on videos. Each plant QR code opens a dedicated profile containing:

- the MKU identity and official logo
- a main plant photograph
- optional leaf, bark, flower and fruit photographs
- common, local and botanical names
- plant family
- uses and other approved descriptive text
- planting date, occasion and location
- references and academic review details

## First example

The first implemented profile is:

`/plants/broad-leafed-croton/`

It uses the supplied Broad Leafed Croton record and visibly flags the medicinal claims for academic review before public release.

## Replace the logo

The current file is a clearly labelled placeholder:

`assets/mku-logo-placeholder.svg`

Replace it with the official MKU logo or update the image path in the homepage and plant-page headers.

## Replace the plant images

The current image files are placeholders:

- `assets/images/plant-main-placeholder.svg`
- `assets/images/plant-detail-placeholder.svg`

For production, use compressed WebP or AVIF photographs of the actual MKU specimen. Keep the main image clear and use detail images for leaves, bark, flowers or fruit.

## Add another plant

1. Copy `plants/broad-leafed-croton/` into a new folder.
2. Rename the folder using a short URL slug, such as `plants/meru-oak/`.
3. Replace the titles, botanical record, planting information and image paths.
4. Add the new plant card to `index.html`.
5. Review all botanical and medicinal claims before publication.

## Local testing

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

This is a static website and can be deployed directly from GitHub through Cloudflare Pages. It requires no build command and uses the repository root as the output directory.
