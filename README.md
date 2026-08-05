# MKU Botanic Garden

A mobile-first plant information catalogue designed for QR-linked plant labels at the MKU Botanic Garden.

## Visitor experience

Each plant QR code opens a dedicated page containing:

- the MKU identity and official logo
- one large plant photograph
- one continuous plant record below the photograph
- optional leaf, bark, flower and fruit photographs
- common, local and botanical names
- plant family
- uses and approved descriptive text
- planting date, occasion and location
- references and academic review details

The plant page intentionally avoids a dashboard of separate information cards. Details are presented as one readable article with headings and subtle dividers.

## Data-driven structure

Plant pages are generated from one reusable template. A new layout is not coded for every plant.

- Plant records: `data/plants.json`
- Reusable page template: `templates/plant-page.html`
- Generator: `scripts/build.mjs`
- Generated pages: `plants/<slug>/index.html`

The homepage plant collection is also generated from the same data.

## Add another plant

1. Add one plant object to `data/plants.json`.
2. Add the plant photographs under `assets/images/`.
3. Run:

```bash
npm run build
```

The build creates the permanent plant route and updates the homepage catalogue automatically.

## First example

The first implemented profile is:

`/plants/broad-leafed-croton/`

It uses the supplied Broad Leafed Croton record and visibly flags the medicinal claims for academic review before public release.

## Replace the logo

The current file is a clearly labelled placeholder:

`assets/mku-logo-placeholder.svg`

Replace it with the official MKU logo and keep the same filename, or update the logo path in the homepage and plant template.

## Replace the plant images

The current image files are placeholders:

- `assets/images/plant-main-placeholder.svg`
- `assets/images/plant-detail-placeholder.svg`

For production, use compressed WebP or AVIF photographs of the actual MKU specimen. Use one clear main image and optional detail photographs for leaves, bark, flowers or fruit.

## Local testing

```bash
npm run build
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

The finished output is a static website and does not require backend hosting or a database.

For Cloudflare Pages:

- Build command: `npm run build`
- Build output directory: repository root

## Publication checks

Before producing a permanent QR code, confirm:

- the official logo
- the plant photographs
- spelling and botanical identity
- medicinal and other use claims
- references
- reviewing department or academic reviewer
- final deployed URL
