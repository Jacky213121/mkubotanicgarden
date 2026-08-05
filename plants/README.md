# Plant pages

Each folder in this directory is a generated permanent page for one QR code.

Do not edit generated HTML files directly. Add or change plant information and images in `data/plants.json`, then run `npm run build`.

Each plant can use:

- `heroImages` for the horizontally scrollable images at the top
- `gallery` for the horizontally scrollable images below the details

Keep each URL slug stable after printing its QR code, because changing the folder name changes the public address.
