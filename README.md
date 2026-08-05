# MKU Botanic Garden

A mobile-first plant information catalogue designed for QR-linked plant labels at the MKU Botanic Garden.

## Visitor experience

Each plant QR code opens a dedicated page containing:

- the Mount Kenya University identity and official logo
- a horizontally scrollable image area at the top
- one continuous plant record below the images
- an optional horizontally scrollable image gallery
- common, local and botanical names
- plant family
- food, traditional and other uses
- planting date, occasion and location

## Data-driven structure

Plant pages are generated from one reusable template. A new layout is not coded for every plant.

- Plant records: `data/plants.json`
- Reusable page template: `templates/plant-page.html`
- Generator: `scripts/build.mjs`
- Generated pages: `plants/<slug>/index.html`

The homepage catalogue is generated from the same data.

## Add another plant

1. Add one plant object to `data/plants.json`.
2. Add the plant photographs under `assets/images/`.
3. Run:

```bash
npm run build
```

The build creates the permanent plant route and updates the homepage automatically.

## Rose Apple

The first completed page is:

`/plants/rose-apple/`

Its images are managed in two arrays inside `data/plants.json`:

- `heroImages`: the horizontally scrollable images at the top
- `gallery`: the horizontally scrollable images below the plant details

The first item in `heroImages` is also used on the homepage card.

## Image assets

Current Rose Apple assets:

- `assets/images/rose-apple-tree.svg`
- `assets/images/rose-apple-flower.svg`
- `assets/images/rose-apple-fruit.svg`
- `assets/mku-logo.svg`

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

- botanical identity and local name
- wording of traditional uses
- final photographs
- final deployed URL
