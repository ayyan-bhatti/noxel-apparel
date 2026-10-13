# Noxel Apparel — website

B2B apparel sourcing & manufacturing site. Next.js 15 (App Router), TypeScript, Tailwind CSS v4.

Design: editorial layout after artsyndicates.co in the logo's navy `#102A4B` and cream `#FBF8F1`, with
Noxel's Industrial Amber `#D48C46` as the accent; Fraunces serif headlines, Inter body. Tokens live in
`src/app/globals.css`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run test:e2e     # Playwright (builds must exist; starts `next start` on :3100)
```

To run tests with an already-installed Chromium instead of downloading one, set
`PW_CHROMIUM_PATH` to its executable.

## Content — where to edit

Everything the client must confirm lives in **`src/config/site.ts`**. Any `null` value renders on the
site as a visible "To be confirmed" marker; replacing it with the verified value removes the marker.

| Item | Location | Status |
|---|---|---|
| Contact email, phone, WhatsApp, address, hours | `contact` | To be confirmed |
| Social links | `social` | To be confirmed |
| Company facts (HQ, established, markets, production model) | `companyFacts` | To be confirmed |
| MOQ, sampling, lead time, payment terms, certifications | `commercialTerms` | To be confirmed |
| Product categories & product lists | `categories` | **Confirmed** (5 categories) |
| Customisation options | `src/app/capabilities/page.tsx` → `options` | To be confirmed |
| Approach copy (principles, process, quality approach) | `site.ts`, `src/app/page.tsx` | Draft — needs client sign-off |
| Production domain | `NEXT_PUBLIC_SITE_URL` env | To be set |

## Quote form

`POST /api/quote` validates on the server and sends via [Resend](https://resend.com). Set in `.env.local`
(see `.env.example`):

- `RESEND_API_KEY`
- `QUOTE_TO_EMAIL` — receiving inbox (comma-separate for several)
- `QUOTE_FROM_EMAIL` — sender on a domain verified in Resend

Until all three are set, the API returns `503 not_configured` and the form tells the buyer their request
was **not** sent. There is no fake success state. Optional attachments (≤ 4 MB) are forwarded to Resend.

## Brand assets

- `brand-source/` — original files supplied by the client (logo, palette boards, mockup).
- `public/brand/` — web derivatives cut directly from the official logo (not redrawn): alpha-mask mark,
  wordmark and lockup (tinted via CSS `mask-image`), icons and Open Graph image.

## Photography

`public/images/` holds free Unsplash photos (Unsplash License) as stand-ins — credits in
`photoCredits` in `site.ts`. They do **not** show Noxel facilities and should be replaced with Noxel's own
photography before launch.
