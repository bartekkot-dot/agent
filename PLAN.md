# PLAN.md — Landing Page

A single-page marketing/download site for the desktop app (the local-first
multi-model chat client), deployed on Vercel.

This file is the governing reference. Every prompt executes against it and
references the constraints below by number instead of restating them.

The app name is **not finalized**. Everywhere it would appear, use the token
from `content.ts` so the final name is a one-line change.

---

## Governing constraints (obey in every stage)

**G1 — Stack.** Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui.
No Next.js. No router (single page). No backend.

**G2 — Aesthetic.** Minimalist / Scandinavian. Mostly monochrome, generous
whitespace, one restrained accent color, calm type scale, no decorative
gradients, no stock-photo clutter. It should feel like a well-made tool, not a
SaaS funnel. Restraint over ornament.

**G3 — Single source of copy & config.** All user-facing strings, the app name,
tagline, feature list, section copy, FAQ, repo coordinates, and download/video
config live in `src/content.ts`. Components import from it. No hardcoded copy in
JSX.

**G4 — Theming.** Support light + dark. Set up Tailwind v4 theming correctly:
tokens under `@theme inline`, dark variant wired with
`@custom-variant dark (&:where(.dark, .dark *))`. Verify in BOTH modes that text
and background never collapse to the same value (a known Tailwind v4 failure
mode — text going invisible on a dark background). Test light mode explicitly.

**G5 — Workflow.** Implement ONE stage at a time. After each stage: stop, show
the diff, run `npm run build`, and confirm it compiles before continuing. Do not
batch stages.

**G6 — No fabricated assets.** Do not invent screenshots or logos. Where a visual
is needed, use a labeled placeholder or generate a simple asset with the Canva
skill. Never ship a broken/missing asset.

**G6 (extension) — Demo videos are permanent.** Once the two demo videos
(Model Council and Deep Research) are placed under their features, they are fixed
page content. No later stage may remove, replace, or relocate either video unless
an instruction explicitly names the video and says to change it. All later
visual/motion work is ADDITIVE around them.

**G7 — Motion & delight.** The site may use motion and one interactive moment to
feel crafted and alive, but it stays subservient to G2: calm, premium, restrained
— never flashy or attention-grabbing for its own sake. Every animation MUST
(a) respect `prefers-reduced-motion: reduce` by disabling or reducing to a simple
fade, (b) never block, delay, or shift content — the page is fully readable if all
JS animation fails, and (c) run cheaply (transform/opacity only, no layout thrash,
pause when off-screen). If a motion makes the page feel like a toy rather than a
tool, it's wrong. When in doubt, less.

---

## Page structure (final section order)

Hero → Features → Privacy → Value → Download → FAQ → Footer

- Theme toggle in the header; dark is the intentional default (localStorage wins,
  otherwise default dark).
- Skip-to-content link as the first focusable element (sticky-header aware).
- Max content width ~1100px, centered, comfortable line length for prose; leads
  capped to a readable measure so they don't wrap awkwardly.

---

## content.ts (the spine — build first)

Single typed `content` object holding: `app` (name token, tagline, blurb),
`github` (owner, repo), `links` (releases, source fallbacks), `features[]`
(title, icon name, body, and a `demo` field on Model Council + Deep Research),
`privacy`, `value`, and `faq`. Renaming the app, editing any copy, or swapping a
video is a one-file change here.

---

## Build stages

**Stage 1 — content.ts.** Create the object above with seeded copy.

**Stage 2 — Scaffold + Vercel.** Vite + React 19 + TS + Tailwind v4 + shadcn/ui.
Prefer zero-config Vite deploy (`dist/`, `npm run build`). Confirm dev + build.

**Stage 3 — Layout shell + design tokens.** Section flow above; theming per G4;
header theme toggle (persist to localStorage, default dark); skip-to-content link.

**Stage 4 — Hero + What it is + Features.** Rendered from content.ts. One quiet
lucide icon per feature (muted color, not the accent). Airy hero; primary
"Download" CTA scrolls to the download section, secondary "View on GitHub".

**Stage 5 — Privacy + Value sections.** Prose-forward, styled as a consistent
pair, distinct from the Features icon grid. Four points each in a 2-col (2×2)
grid so nothing is orphaned. No glow. Correct in light + dark (G4).

**Stage 6 — Download section.** On mount, fetch the latest GitHub release via
`content.github` and map Tauri artifacts by OS (macOS `.dmg`, Windows `.msi`,
Linux `.AppImage`/`.deb`). Primary button = detected-OS asset + version; "Other
platforms" lists the rest. Graceful fallback to the releases page on any failure
or if no release exists. Handle loading state. A faint echo of the hero glow may
sit behind the primary button (per G7), fainter than the hero.

**Stage 7 — FAQ.** shadcn Accordion, collapsed by default, all Q&A from
`content.faq`. Correct borders/chevron in both themes (G4).

**Stage 8 — Demo videos.** Place the four files in `public/`
(`deep-research-demo.mp4` + poster, `model-council-demo.mp4` + poster). Add a
`demo` field to the Model Council and Deep Research feature entries and render an
autoplay / muted / loop / playsInline `<video>` (with poster, preload="metadata")
under each. Only play when in view; static poster under prefers-reduced-motion.
These videos are permanent per G6 (extension).

**Stage 9 — Motion & polish.** Quiet scroll-reveal fade-up (one IntersectionObserver
hook); living hero background (slow drift + barely-there glow breathing, pauses
off-screen); one interactive SVG "prompt → several models → chair → one answer"
diagram ADDED beside the Model Council video (never replacing it). All per G7.

**Stage 10 — Assets + meta.** Favicon + OG/Twitter meta and a 1200×630 OG image
via the Canva skill (monochrome + accent, placeholder wordmark). Responsive pass
(~380px / tablet / desktop). Accessibility: landmarks, focus states, alt text,
contrast in both themes. No fabricated screenshots (G6).

**Stage 11 — Deploy.** Push to GitHub, import into Vercel (preset = Vite), deploy.
Verify light + dark readable, download resolves to a real asset or the fallback,
both videos play, motion respects reduced-motion.

---

## Definition of done

- Single page, all copy from `content.ts`, app name changeable in one line.
- Light + dark both readable (G4 verified).
- Download resolves to the correct OS asset from the latest GitHub release, with a
  working fallback.
- Both demo videos present under their features and playing (G6 extension).
- Motion is calm and respects prefers-reduced-motion (G7).
- Clean `npm run build`, deployed on Vercel, aesthetic matches G2.
