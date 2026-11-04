# WEBSTORE

**Explore. Discover. Connect.**

WEBSTORE is a curated website directory with a clean, premium interface inspired by restrained product design: strong typography, deliberate spacing, minimal decoration and a clear visual hierarchy.

## Open instantly (no terminal)

1. Extract the ZIP file.
2. Open the `WEBSTORE` folder.
3. Double-click **`index.html`**.

The portable edition runs directly from `file://` and does not require Node.js, npm, a server, an account, an API key or a backend. Search, categories, favorites, saved websites, history, collections, comparison, theme preferences and JSON backup/restore work locally in the browser.

An internet connection is only needed to open third-party websites and load remote favicons / the optional web font. The directory itself and its core interactions run locally.

## React + Vite source

The maintainable React, TypeScript and Vite project is in `source/`.

```bash
cd source
npm install
npm run validate:data
npm run dev
```

Create a production bundle with:

```bash
npm run build
npm run preview
```

The React source uses React, React Router, TypeScript, Tailwind CSS and Lucide React. `HashRouter` is used so static hosting does not require server-side route rewrites.

## Included

- 300 curated website records across 12 categories, with the category distribution specified in the build brief.
- Instant global search and Ctrl/Cmd + K shortcut.
- Category, subcategory, pricing, platform and sort filters.
- Featured and editorially curated trending views (not live popularity data).
- Individual website details and deterministic related-site suggestions.
- Favorites, saved websites, recently viewed history and personal collections.
- Side-by-side comparison for up to three entries.
- Light, dark and system themes.
- JSON export/import for personal library data.
- Manual website verification with conservative handling of CORS and ambiguous responses.
- About, Privacy Policy, Terms of Use and Disclaimer pages.
- Responsive layout, keyboard focus states and reduced-motion support.

## Data integrity and verification notes

The bundled dataset has exactly 300 records, 300 unique IDs and 300 unique hostnames. The category counts are: AI & Machine Learning 40; Social Media 20; Games 25; Development 35; Education 25; Design & Media 30; Productivity 25; Entertainment 20; Search & Research 20; Utilities 25; Business & Finance 15; Technology 20.

All records start with `status: "unchecked"`. The structural validator confirms record counts, unique IDs/hosts, required fields, HTTPS URL structure and category distribution. It does **not** claim that all 300 external sites were live-tested; that would require network checks against every provider. A browser verification request can remain inconclusive when a third-party site blocks cross-origin requests. WEBSTORE therefore leaves inconclusive results as Unchecked.

Pricing labels are directory-level guides and may change; confirm current prices on each official website. External site availability, terms and privacy policies are controlled by those third parties.

## Project structure

```text
WEBSTORE/
├── index.html                 # Portable, directly-openable edition
├── styles.css
├── portable-app.js
├── portable-data.js           # 300 records for the portable edition
├── logo.svg
├── favicon.svg
├── README.md
└── source/                    # React + Vite + TypeScript source
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── public/
    └── src/
        ├── components/
        ├── data/
        ├── lib/
        ├── pages/
        ├── styles/
        ├── types/
        ├── App.tsx
        └── main.tsx
```

## Privacy

Personal library data stays in the current browser's local storage unless the user exports a backup. There is no account, server-side profile, or synchronization service.


## Visual refresh 1.1

- Increased typography, navigation sizing, card spacing and detail metadata readability.
- Added a refined light/dark premium visual system, clearer page hierarchy and accessible button motion.
- Improved favicon loading with official-site, DuckDuckGo and Google fallback sources, followed by a clean letter tile when no image can load.
- The portable `index.html` experience remains the recommended way to open WEBSTORE directly without a local server.
