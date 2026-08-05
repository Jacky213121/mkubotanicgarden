# Mount Kenya University Plant Catalogue

This repository contains a small, static plant-information site built around direct QR-code links to individual plant pages.

## Current plant

- Rose Apple
- Botanical name: *Syzygium guineense*
- Local name: Zambarau (Kikuyu)
- Family: Myrtaceae
- Mount Kenya University 29th Graduation Commemoration Tree
- Planted on 7 August 2026 at Happy Valley Graduation Pavilion

## Structure

- `data/plants.json` — approved plant content and image lists
- `templates/plant-page.html` — reusable plant-page template
- `scripts/build.mjs` — generator for plant pages
- `plants/rose-apple/` — direct Rose Apple page
- `assets/images/` — plant photographs

The repository root redirects directly to the Rose Apple page. There is no public catalogue homepage.

## Images

The first item in `heroImages` is the main photograph. Additional images can be placed in `gallery`.

After changing plant data or images, run:

```bash
npm run build
```

The generated plant HTML must be committed together with the source changes.
