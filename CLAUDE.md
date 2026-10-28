# Vision World website

See also [AGENTS.md](AGENTS.md) for dev server commands and Astro doc links.

## Project

Marketing site for **Vision World**, an international trading and investment company based in Tanzania that sources goods mainly from South Korea.

- Mission: take ideas and opportunities from around the world and turn them into something useful for Tanzania.
- Positioning: the bridge between Tanzania and Korea.
- Audience: Tanzanian businesses and individuals buying vehicles and goods. Most visit on phones, often on mobile data.

### Goal

Generate quote requests.

- **Primary CTA:** WhatsApp click-to-chat (`https://wa.me/<number>?text=<prefilled message>`). Prefill the message with context where possible (for example the listing title on a stock item).
- **Secondary CTA:** contact / request-a-quote form.
- Every page should have a clear path to one of these.

### Services: what we can and cannot claim

Shipping and clearing are **future divisions**, not confirmed current services. Until the client confirms otherwise:

- Describe the **buyer journey we support**: Sourcing in Korea > Import > Inspection > Handover.
- Never claim Vision World runs shipping or customs clearing itself.
- The steps live in a data file (`src/data/buyerJourney.ts`) so wording can change without touching components. The How We Work section (home page) and page read from it. There is no separate service strip under the hero.

Korea is the main source, not the only one. Say "from Korea and beyond", never "only from Korea".

### What they trade

Trucks (Scania tractor heads, Samsung and Hyundai trucks), SUVs, spare parts, refrigerators, radios, electronics, used clothes, kitchenware, safari bags, rare used bicycles.

### Future divisions (shown as "Coming soon")

Vision Beauty & Cosmetics, Vision Logistics, Vision Consulting (Asia-Africa trade), Vision Clearing & Forwarding, Vision Mining.

## Sitemap

| Page | Route | Notes |
| --- | --- | --- |
| Home | `/` | Organization JSON-LD lives here |
| About | `/about` | CEO story |
| What We Trade | `/what-we-trade` | Categories from `src/data/categories.ts` |
| Category | `/what-we-trade/[slug]` | Description, examples, listings in that category, WhatsApp CTA |
| Stock | `/stock` | Listings with status: `available` / `sold` / `incoming`, and a price in TZS or "Price on request". Category and status filters, also via `?category=` and `?status=` |
| Listing | `/stock/[slug]` | Gallery, specs table, price, WhatsApp CTA prefilled with the listing name |
| How We Work | `/how-we-work` | Buyer journey: Sourcing in Korea > Import > Inspection > Handover |
| Vision Group | `/vision-group` | Divisions, all "Coming soon" for now |
| Contact / Request a Quote | `/contact` | WhatsApp first, form second |

Plus a styled `404` page. Contact links can preselect the form category with `/contact?category=<slug>`.

Swahili versions live at the same paths under `/sw/` (for example `/sw/about`) once translated.

## Languages (i18n)

- Astro i18n routing: `en` is the default at `/` (no prefix), `sw` at `/sw/`. Configured in `astro.config.mjs`.
- **Only English is built for now.** `publishedLocales` in `src/i18n/config.ts` lists the locales that have pages. Add `'sw'` there when Swahili content is ready.
- Every piece of copy is a `LocalizedString` (`{ en: string; sw?: string }`), the same shape as a Sanity field-level internationalised string. Read it with `t(value, locale)` from `src/i18n/utils.ts`, which falls back to English.
- Chrome copy (button labels, menu text, footer headings) lives in `src/data/ui.ts`, also as `LocalizedString`s.
- Internal links are stored locale-agnostic (`'about'`, not `'/about'`) and turned into URLs with `localizePath(path, locale)`.
- **Page structure:** page bodies go in `src/views/` as components that take a `locale` prop. Route files in `src/pages/` (English) and later `src/pages/sw/` (Swahili) are thin wrappers that render the view. Adding Swahili means adding route files, not refactoring.
- The header language switcher shows `SW` as "coming soon" until `sw` is in `publishedLocales`, then links to the Swahili version of the current page automatically.

## Stack

- **Astro** (static output) + **Tailwind CSS v4** via `@tailwindcss/vite`. `@astrojs/sitemap` with `site: https://vision-world.vercel.app` (temporary, update at launch).
- **Fonts:** Archivo (headings, 700/800) and Inter (body, 400/500/600) via Astro's built-in fonts API (`fonts` in `astro.config.mjs`, Fontsource provider). Files are downloaded at build time and served from the site. Exposed as Tailwind `font-heading` and `font-sans`.
- **No UI framework.** Use `.astro` components. Add client JS only when unavoidable (for example a mobile nav toggle or stock filter), as small inline scripts. No React/Vue islands unless agreed.
- **Sanity CMS comes later.** Until then all content lives in typed data files under `src/data/`.

### Content model (`src/data/`)

Components never hardcode copy. All text, links, phone numbers and listings come from data files shaped like future Sanity documents, so the swap to Sanity only changes the data loading layer.

- `src/data/types.ts` holds the shared TypeScript types.
- One file per document type: `siteSettings.ts`, `navigation.ts`, `ui.ts`, `buyerJourney.ts`, `categories.ts`, `listings.ts`, `divisions.ts` (add page-level copy files as needed).
- Shape documents the Sanity way: `_id`, `_type`, `slug: { current: string }`, image fields as objects (`{ src, alt }`), rich text kept simple for now. All user-facing text is `LocalizedString`.
- Access data through getter functions in `src/data/index.ts` (for example `getListings()`, `getSiteSettings()`) rather than importing arrays directly. These become the Sanity queries later.
- `siteSettings` holds: company name, CEO name and role, tagline, WhatsApp number, default WhatsApp message, email, phone, address, social links, default SEO (title template, description, OG image) and the `noindex` flag.
- Listing status is a union type: `'available' | 'sold' | 'incoming'`.
- Listing price is a discriminated union: `{ type: 'fixed'; amountTZS: number }` or `{ type: 'onRequest' }`. Format TZS with `Intl.NumberFormat`. Never invent prices; use `onRequest` when unknown.

### Images

- Photos live in `src/assets/images/{category}/` and are rendered with the `Photo` component, which uses Astro's `<Picture>` to output responsive AVIF with a WebP fallback. Always pass a `sizes` hint matching the layout; pass `priority` only for the above-the-fold hero.
- In data files, photo `src` is the full asset path, e.g. `/src/assets/images/trucks/truck-fleet-2.webp`. If the file is missing, `Photo` renders a labelled placeholder instead.
- `public/` holds only site files that must keep fixed URLs: `logo.png`, `og-default.png`, favicons. Original logo sources live in `brand/` (not deployed).
- Real Vision World photos replace placeholders before launch. Stock listings use the `PlaceholderImage` (empty `src`), never a stock photo pretending to be real stock.
- `scripts/fetch-images.mjs` (`npm run fetch-images`) pulls Pixabay photos into `src/assets/images/` with credits in `src/assets/images/credits.json`. It only adds: never overwrites files, and skips IDs in `scripts/pixabay-exclude.json`. The client runs it separately; don't depend on specific files existing.

### Logo

`/public/logo.png` (temporary). The `Logo` component reads its size at build time and falls back to a text wordmark if the file is missing.

## Brand

Serious, trustworthy B2B trading company. Clean, bold, modern. Not flashy.

### Layout

- Preview banner above the header on every page while `siteSettings.previewBanner` is true. When turning it off, also remove the banner allowance in `src/components/home/heroHeight.ts`.
- Home hero: yard photo with navy gradient, dotted globe (Korea and Tanzania highlighted) and a "Now sourcing" split-flap board; each flip sends a pulse along the Korea to Tanzania arc. Fits one phone screen with buttons visible.
- Scroll motion (`ScrollMotion.astro`, styles in `global.css`): blocks below the fold rise in as they enter the screen, list items one after another; route lines draw in; orange progress line on the header; back-to-top button after scrolling; cards lift on hover. Transforms and opacity only (no layout shift), all off for `prefers-reduced-motion`, and nothing is hidden if JavaScript fails.
- Sticky white header: logo, nav (desktop), language switcher, WhatsApp button (desktop). Hamburger menu below `lg`.
- Below `lg`, a fixed bottom bar holds WhatsApp (primary) and Request a quote. The body gets bottom padding so it never covers content.
- Navy footer with contact details and page links.
- Sharp, small corner radius (`rounded-md` at most), silver hairlines, generous white space. Orange only on CTAs and the Korea to Tanzania route accent.

### Colour tokens

Define in `src/styles/global.css` using Tailwind v4 `@theme` (there is no `tailwind.config.js`). Use the tokens, never raw hex values in components.

| Token | Value | Use |
| --- | --- | --- |
| `navy` | `#0B1F73` | Primary brand, headers, dark sections |
| `navy-dark` | `#081757` | Hover state for navy buttons |
| `orange` / `orange-light` | `#F07A1A` / `#F6A35C` | CTAs and highlights only |
| `globe` | `#2A7FC8` | Icons, large link text, accents |
| `globe-dark` | `#1F6AB0` | Body-size link text on white |
| `silver` | `#B8BEC6` | Borders, dividers |
| `mist` | `#F1F3F5` | Subtle section backgrounds (light tint of silver) |
| `ink` | `#0F172A` | Body text on white |

### Contrast rules (WCAG AA, checked)

- `ink` on white: passes. White on `navy`: 14.4:1, passes.
- **White text on orange fails (2.8:1).** Orange buttons use `ink` or `navy` text (6.4:1 / 5.2:1). Orange text on navy is fine (5.2:1, light orange 7.1:1).
- **`globe` on white is 4.2:1**: fine for icons, large text (18px+ bold / 24px+) and UI, not body-size links. Use `globe-dark` (5.6:1) for normal-size links.
- `silver` on white is 1.9:1: decorative only (borders, backgrounds), never text. `silver` text on navy is fine (7.7:1).
- Focus rings: `globe-dark` on light backgrounds, `orange-light` on navy (sections marked `.on-dark`).

## Rules

- **Mobile-first.** Design and build at phone width first, then scale up. Tap targets at least 44px.
- **Fast.** Use `astro:assets` (`<Image>` / `<Picture>`) with WebP/AVIF output, explicit sizes, lazy loading below the fold. Minimal JavaScript. Self-host fonts or use few weights.
- **SEO on every page:** meta title, description, canonical, Open Graph tags and OG image (via a shared `BaseLayout` / `SEO` component fed from data).
- **Organization JSON-LD** on the home page, built from `siteSettings`.
- **Demo phase:** `<meta name="robots" content="noindex">` on every page until launch. Controlled by `siteSettings.noindex`, output once in the `SEO` component.
- **Accessibility:** semantic HTML, one `h1` per page, visible focus states, alt text on all images, form labels.

## To confirm with client

Do not present these as fact on the site until confirmed. Keep the current wording or placeholders until then.

- **Shipping:** whether Vision World arranges shipping itself or through partners (currently a future division; copy avoids claiming it).
- **Clearing:** same as shipping (Vision Clearing & Forwarding is a future division).
- **Inspection:** whether buyers can inspect goods in Tanzania before handover, as the current How We Work copy implies.
- **Handover:** how and where delivery or collection happens in Tanzania.
- **CEO details:** ~~name~~ received: Joseph Makina (in `siteSettings.ceo`). Still needed: story, quote, portrait photo.
- ~~**Contact details**~~ received: phone and WhatsApp +255 680 418 090, info@vision-world.com, Monday to Friday 9am to 5pm, 4th Floor, Noble Center, Makumbusho, Dar es Salaam (all in `siteSettings.contact`).
- **Copy in `[CONFIRM: ...]` brackets:** How We Work step details and FAQ answers (payment, inspection, timelines, documents, who you sell to), category examples, company history.
- **About page values:** the four values are general wording written for review, not supplied by the client.
- **Sample listings:** all nine are placeholders. Replace with real stock.
- **Official company name:** legal or registered name for the footer and Organization JSON-LD.
- **Price display preference:** whether to show TZS prices on listings or always "Price on request".

## Writing style

- Clear, confident, plain English.
- **No em dashes.** Use commas, full stops, or colons.
- **No fake testimonials. No invented numbers** (years in business, units sold, clients served, etc.).
- Where information is missing, use obvious placeholders in square brackets: `[CEO QUOTE]`, `[OFFICE ADDRESS]`, `[YEAR FOUNDED]`. Never fill gaps with plausible-sounding made-up facts.

## Commands

- `npm run dev` (or `astro dev --background`, see AGENTS.md)
- `npm run build` and `npm run preview`
- `npm run check` (astro check) for type checking, including `.astro` files
- `npm run build && npm run check:links` checks every internal link, asset and `#anchor` in `dist/`
- `node scripts/build-globe-data.mjs` regenerates `src/data/geo/globe.json` (hero globe land dots and the Korea and Tanzania shapes, from Natural Earth via `world-atlas`)
