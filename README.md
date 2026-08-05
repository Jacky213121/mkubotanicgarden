# MKU Botanic Garden

A mobile-first plant information catalogue designed for QR-linked plant labels at the MKU Botanic Garden.

## Visitor experience

Each plant QR code opens a dedicated page containing:

- the Mount Kenya University identity and official logo
- one large plant photograph
- one continuous plant record below the photograph
- optional leaf, bark, flower and fruit photographs
- common, local and botanical names
- plant family
- food, traditional and other uses
- planting date, occasion and location
- references and academic review details

The plant page intentionally avoids a dashboard of separate information cards. Details are presented as one readable article with headings and subtle dividers.

## Data-driven structure

Plant pages are generated from one reusable template. A new layout is not coded for every plant.

- Plant records: `data/plants.json`
- Reusable page template: `templates/plant-page.html`
- Generator: `scripts/build.mjs`
- Generated pages: `plants/<slug>/index.html`

The homepage plant collection is generated from the same data.

## Add another plant

1. Add one plant object to `data/plants.json`.
2. Add the plant photographs under `assets/images/`.
3. Run:

```bash
npm run build
```

The build creates the permanent plant route and updates the homepage catalogue automatically.

## First plant profile

The first implemented profile is:

`/plants/rose-apple/`

It contains the supplied Rose Apple record, the official MKU logo and the supplied tree, flower and fruit photographs.

The supplied record named the species as `Syzygium guineense`. The photographs are more consistent with `Syzygium jambos`, the species widely known as rose apple. The public page therefore labels the identification as provisional until an MKU botanist confirms the specimen and local name.

## Image assets

Current Rose Apple assets:

- `assets/images/rose-apple-tree.svg`
- `assets/images/rose-apple-flower.svg`
- `assets/images/rose-apple-fruit.svg`
- `assets/mku-logo.svg`

These are web-optimised versions of the supplied files. Higher-resolution production images can replace them later without changing the page address or QR code.

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
- references and academic reviewer
- final deployed URL
