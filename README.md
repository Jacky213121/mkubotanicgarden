# MKU Botanic Garden — MVP

A mobile-first static website prototype for QR-linked tree videos at the MKU Botanic Garden.

## What already works

- Project homepage
- Permanent-style tree route: `/trees/mugumo/`
- Embedded YouTube player mechanism
- Responsive mobile layout
- Reusable visual structure for additional trees
- Accessible headings, navigation and video title
- Privacy-enhanced YouTube embed using `youtube-nocookie.com`

## Add the Mugumo video

1. Upload the completed video to YouTube.
2. Copy the video ID. For `https://youtu.be/AbCd1234`, the ID is `AbCd1234`.
3. Open `trees/mugumo/index.html`.
4. Replace:

   `data-youtube-id="VIDEO_ID_HERE"`

   with:

   `data-youtube-id="AbCd1234"`

The placeholder automatically becomes an embedded video player.

## Add another tree

1. Copy the entire `trees/mugumo` folder.
2. Rename it using a short URL slug, for example `trees/croton`.
3. Replace the title, names, facts, description and YouTube ID.
4. Add its card to `index.html`.

## Test locally

From this folder, run one of these commands:

```bash
python -m http.server 8080
```

or:

```bash
npx serve .
```

Then open `http://localhost:8080`.

## Deploy to Cloudflare Pages

The site requires no build command. Upload the folder or connect its GitHub repository and set the output directory to the project root.

## Important publishing check

“Mugumo” can refer to culturally significant fig trees, but the exact scientific identity of the specimen must be confirmed from the garden’s records or a botanist. The prototype therefore leaves the scientific name unasserted.

## Planned next phase

- Replace placeholder content with verified Mugumo information
- Add the finished video
- Create a QR code linked to the deployed Mugumo URL
- Add scan analytics
- Introduce a protected content-management dashboard
- Add search, garden map and multilingual content
