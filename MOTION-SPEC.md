# Landing page — motion + reference spec (addendum to CLAUDE-CODE-BRIEF-landing.md)

Attach the three reference screenshots (Oliviera, Layrinth, current "Private by design" section) with this file.

> Note (added when this was turned into a backlog): only the Oliviera and Layrinth
> screenshots actually exist (from the original brief). No third screenshot of the
> current "Private by design" section was ever attached — use the real
> `src/components/privacy-section.tsx` implementation directly instead.

## 0. Read this first — the motion philosophy

The app supports **both light and dark modes.** Every color and every animation below must be defined for both.

We are **bold in exactly three moments**, each of which demonstrates a real capability of the app, and **silent everywhere else.** Do **not** add fade-and-slide-up entrances to sections, and do **not** add hover-lift to cards — that is the generic AI-page default and makes the site feel *less* special. If a section is not one of the three signature moments in §3–§4, it has **zero** entrance animation.

The three animated moments (all tie the blue accent to its one meaning: **blue = live / thinking / active**):
1. **Hero** — a scripted Model Council demo that plays once (§3a).
2. **Model Council section** — a scroll-scrubbed explainer: one prompt fans out into parallel models and converges into one answer (§3b). This is THE signature moment.
3. **Two micro-moments** — the provider grid "connecting," and the Deep Research loop drawing its path (§4).

---

## 1. Theme + accent (both modes)

Define the accent per theme — blue must stay legible on white:

| Token | Dark mode | Light mode |
|---|---|---|
| `--canvas` | `#0A0B0A` | `#FFFFFF` |
| `--surface` | `#12140F` | `#F5F7F3` |
| `--ink` | `#F1F4EE` | `#101512` |
| `--muted` | `#868D80` | `#5B635A` |
| `--live` (accent) | `#60A5FA` (brighter) | `#2563EB` (deeper, for AA contrast on white) |
| `--hairline` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |

**Glow gotcha:** the soft blue glow (hero, active lanes) is an *additive* light bloom on dark mode. On **light mode a glow is invisible** — replace it there with a soft blue tint fill + a subtle drop shadow, never an additive bloom. Test both modes on every blue element.

---

## 2. What to take from each screenshot, section by section

Pull specific, concrete elements — do not clone whole layouts.

- **Hero** — from *Oliviera*: centered two-tone editorial headline (off-white/ink + muted-gray in one clause), huge whitespace, one focal visual. From *Layrinth*: a single soft blue glow behind the focal visual (dark mode only). The focal visual is the §3a Council demo, **not** a static screenshot and **not** an abstract orb.
- **"Every model, one place" section** — from *Oliviera image 1 (right)*: the isometric grid of integration tiles with one lit center tile. Map the outer tiles to model providers (OpenAI, Anthropic, Google, Mistral, local/Ollama, etc.) and the **center tile = the ChatUI mark**. Animate per §4a.
- **Model Council section** — from *Layrinth*: the code-editor / streaming-panel mockups. From *Oliviera*: editorial calm and restraint around it. This is the §3b scroll-scrub.
- **Deep Research section** — from *Layrinth*: alternating left/right feature rows with short checklist bullets and a process visual. Add the §4b path-draw.
- **Private by design section** — fix per §6 (the current version is too templated).
- **Stats** — from *Oliviera*: a few big numbers with small labels — **only real numbers** (e.g. providers supported, "100% local", open source). Do not invent stats.

---

## 3. Signature moment — Model Council

### 3a. Hero: scripted Council demo (plays once on load)

A **canned, deterministic** mini-demo (no live API calls — script the tokens in `content.ts`). Sequence over ~3.5s:
1. A prompt appears (typed-in effect) in a single input bubble.
2. 4 model chips (mono font, e.g. `claude-opus-4-8`, `gpt-…`, `gemini-…`, `local`) appear and each streams 2–3 canned lines in parallel. Each chip glows `--live` while streaming.
3. The four panels collapse into one centered **chair** card that assembles the synthesized answer. Blue fades to `--ink` as it "finishes" (= done, no longer live).
4. Rests on the final state. Do **not** loop. Offer a small "replay" control; replay also fires if the user scrolls away and back.
- **Reduced motion / no-JS:** render the final resting state immediately (prompt → four faded panels → synthesis card). No typing, no streaming.

### 3b. Model Council section: scroll-scrubbed explainer (THE signature)

The section is **pinned** (sticky) for ~1.75× viewport height of scroll. `p` = scroll progress through the pin, 0→1. The visual is driven entirely by `p` (scrubbing back up reverses it):

```
p 0.00–0.15   One prompt, centered, monochrome.            caption: "You ask once."
p 0.15–0.45   Prompt splits into 4 lanes that slide apart
              horizontally. Each lane gets a model chip
              header and begins streaming canned tokens.
              Active lanes pulse --live.                    caption: "Every model answers at once."
p 0.45–0.70   Lanes finish on a slight stagger; each lane's
              blue settles to steady as it completes.
p 0.70–1.00   The 4 lanes converge inward and collapse into
              one centered "chair" synthesis card that
              assembles the final answer. Blue → --ink.    caption: "One neutral answer, synthesized."
```

- **End state = reduced-motion static state:** the final composition (prompt at top, four faded lanes behind, synthesis card in front) rendered statically and legibly, with the three captions shown as plain labels. Someone with motion disabled must still understand "many models → one answer" from the static frame.
- Keep it **monochrome except for the live-blue pulse.** No rainbow per-model colors.

---

## 4. Supporting micro-motion (subtle, once, on enter)

Each fires **once** when the element scrolls into view (not scrubbed, not repeated), ~600–800ms, then rests. Each has a static fallback.

### 4a. Provider grid "connect"
Tiles ripple a quick `--live` pulse outward from the center ChatUI mark (as if connecting), then settle to idle monochrome with the center mark softly lit. **Reduced motion:** static, center lit.

### 4b. Deep Research path draw
An SVG path (plan → search → read → compile → answer) draws left-to-right using `pathLength`; each node lights `--live` as the line reaches it, then settles. **Reduced motion:** full path + nodes shown static.

Nothing else on the page animates on enter.

---

## 5. Motion system (implementation)

- **Library:** Framer Motion only (keep deps minimal). Use `useScroll({ target, offset })` + `useTransform` for the §3b scrub; `whileInView` (once: true) for §4; `motion` variants for §3a. If the scrub proves janky, GSAP ScrollTrigger is the fallback — but try Framer first.
- **Perf:** animate **transform and opacity only** (GPU-composited). No animating width/height/top/left, no layout thrash. One scroll subscription per pinned section — not per element.
- **Pin** the Council section with CSS `position: sticky`, not JS scroll math, where possible.
- **`prefers-reduced-motion: reduce`** must be honored globally: every moment above collapses to its defined static end-state.
- Must render sensibly **before JS hydrates** (SSR/static end-states as the default DOM).
- 60fps target; test on a mid-range laptop, both themes.

| Moment | Type | Trigger | Fallback |
|---|---|---|---|
| Hero Council demo | scripted, once | on load | final resting frame |
| Council explainer | scroll-scrub | pinned section | final composition + labels |
| Provider connect | micro, once | in view | center lit, static |
| Research path | micro, once | in view | full path, static |
| Everything else | **none** | — | — |

---

## 6. Fix "Private by design" (both themes)

The current version reads templated. Change:
- **Remove the 01/02/03/04 numbering.** These four points are parallel, not a sequence — numbers imply steps that don't exist. Numbering is only allowed for a real ordered process.
- **Remove the blue underline/eyebrow above each heading.** An accent line above every title is a default tell.
- Keep the copy — it's specific and strong (no telemetry, offline, ZDR, open-source-verifiable). Lay it out as a calm 2×2 separated by `--hairline` dividers, headings in `--ink`, body in `--muted`. Blue appears only if a word is genuinely a live/active state — otherwise no blue here at all.
- Must look intentional in **both** light and dark mode.

---

## 7. Section order

```
Nav → Hero (§3a) → Every-model grid (§4a) → Model Council explainer (§3b)
→ Deep Research (§4b) → Private by design (§6) → Real stats → Download CTA → Footer
```

---

## 8. Technical guardrails (unchanged, still mandatory)

- All copy through **`src/content.ts`** — including the canned demo tokens and every caption. No hardcoded strings.
- All asset paths through **`import.meta.env.BASE_URL`** — hardcoded paths 404 in production (Vite `base` on Cloudflare Pages). Check every image, font, favicon, SVG.
- **Both themes** (light + dark) fully supported for every new element and animation.
- Reuse existing **shadcn/ui** components; match project conventions.
- Respect **`PLAN.md` G1–G7** and **`BUILD-ORDER.md`** phasing; flag anything out-of-phase in the diff instead of proceeding.
- A11y floor: AA contrast (blue-on-white especially), visible focus, reduced-motion, responsive to mobile.
- Download CTA points at a **published** GitHub release `.dmg` (release must be out of Draft).

> Note (added when this was turned into a backlog): there is no `BUILD-ORDER.md` in this
> repo, only `PLAN.md` — same gap as the original brief. `PLAN.md` also currently says the
> deploy target is Vercel, but the actual `vite.config.ts` / `.github/workflows/deploy.yml`
> are built for Cloudflare Pages (with a GitHub Pages fallback path via `VITE_BASE_PATH`).
> M1 corrects that line in `PLAN.md`.

---

## 9. Build order + don'ts

**Build in this order** so review gates stay small:
1. Theme tokens (both modes) + typography.
2. Static skeleton of every section with real `content.ts` copy — **no animation yet.** Review it. It must already look clean and finished static.
3. Add §3b Council scrub. Review.
4. Add §3a hero demo. Review.
5. Add §4 micro-moments. Review.
6. Reduced-motion + both-theme + mobile pass. Review.

**Don't:**
- Don't add entrance animations or hover-lifts to any section outside §3–§4.
- Don't clone Layrinth's green-on-everything or glassmorphism.
- Don't fabricate stats, logos, testimonials, or screenshots.
- Don't use per-model rainbow colors — monochrome + one blue.
- Don't hardcode copy or asset paths.
- Don't number parallel (non-sequential) content.

---

## Addendum `src/content.ts` (target shape — see M2 for how this merges with the real, working current file)

```ts
// src/content.ts
// Single source of truth for all landing-page copy.
// Conventions:
//  - No copy lives in components. Add/rename keys here, never inline strings.
//  - APP_NAME is still TBD — change it in ONE place below and it propagates.
//  - Two-tone headlines are arrays of segments: tone "ink" = primary, "muted" = gray.
//  - The Council demo (`councilDemo`) is CANNED/deterministic — no live API calls.
//    These are the exact tokens the hero (§3a) and the scroll explainer (§3b) play.
//  - STATS + model IDs + DOWNLOAD_URL are marked TODO — confirm real values before ship.
//  - DOWNLOAD_URL must point at a PUBLISHED GitHub release .dmg (not a Draft release).

export const APP_NAME = "ChatUI"; // TODO: lock the final product name.

// TODO: replace with the published release asset URL (external GitHub — not gated by BASE_URL).
export const DOWNLOAD_URL = "https://github.com/OWNER/REPO/releases/latest/download/ChatUI.dmg";
export const REPO_URL = "https://github.com/OWNER/REPO";

type Tone = "ink" | "muted";
type Segment = { text: string; tone: Tone };

export const content = {
  nav: {
    links: [
      { label: "How it works", href: "#council" },
      { label: "Models", href: "#models" },
      { label: "Privacy", href: "#privacy" },
    ],
    cta: { label: "Download", href: "#download" },
  },

  // ── Hero (§3a: scripted Council demo is the focal visual) ──────────────
  hero: {
    headline: [
      { text: "Ask every model at once. ", tone: "ink" },
      { text: "Get one answer you can trust.", tone: "muted" },
    ] as Segment[],
    sub:
      `${APP_NAME} is a local desktop app that sends your prompt to every ` +
      `AI model you use — at the same time — then has a neutral model combine ` +
      `their answers into one.`,
    primary: { label: "Download for Mac", href: DOWNLOAD_URL },
    secondary: { label: "See how it works", href: "#council" },
    replayLabel: "Replay",
  },

  // ── Canned Council demo script (hero + scroll explainer) ───────────────
  // A prompt where good models genuinely diverge, so the synthesis earns its place.
  councilDemo: {
    prompt: "Should a two-person startup use a monorepo or separate repos?",
    // Streamed in parallel. Keep each to 2–3 short lines. IDs are display labels.
    models: [
      {
        id: "claude-opus-4-8", // TODO: confirm the IDs you actually ship with.
        lines: [
          "Monorepo, for a team this small.",
          "Shared tooling and atomic cross-cutting changes beat the coordination",
          "cost of juggling repos before you have real scale.",
        ],
      },
      {
        id: "gpt-5.1",
        lines: [
          "Agree — but the real question is tooling.",
          "With Turborepo or Nx a monorepo is easy; without them, CI gets slow.",
          "Decide based on whether you'll set that up.",
        ],
      },
      {
        id: "gemini-3-pro",
        lines: [
          "One caveat: split repos if the projects have very different",
          "release cadences, or if one might be open-sourced later.",
          "Otherwise, together.",
        ],
      },
      {
        id: "local · llama-4",
        lines: [
          "Start monorepo. Splitting later is cheap;",
          "merging later is painful. Default to together.",
        ],
      },
    ],
    // The neutral chair reads all four and writes ONE synthesis (no voting, no debate).
    synthesis: {
      id: "council · synthesis",
      lines: [
        "For a two-person team, start with a monorepo — the coordination savings",
        "outweigh the setup, and Turborepo or Nx keep CI manageable. Split a package",
        "out only when its release cadence genuinely diverges or you plan to open-source",
        "it. Reversing later is cheap, so the default should be to keep everything together.",
      ],
    },
  },

  // ── Every model, one place (§4a: provider grid) ────────────────────────
  models: {
    id: "models",
    headline: [
      { text: "Every model, ", tone: "ink" },
      { text: "in one place.", tone: "muted" },
    ] as Segment[],
    sub:
      "Connect the providers you already pay for, plus any local model. " +
      "Switch between them freely — or ask them all at once.",
    // Center tile = APP_NAME mark; outer tiles = providers.
    providers: [
      { name: "OpenAI", kind: "hosted" },
      { name: "Anthropic", kind: "hosted" },
      { name: "Google", kind: "hosted" },
      { name: "Mistral", kind: "hosted" },
      { name: "xAI", kind: "hosted" },
      { name: "DeepSeek", kind: "hosted" },
      { name: "Ollama", kind: "local" },
      { name: "LM Studio", kind: "local" },
    ] as { name: string; kind: "hosted" | "local" }[],
  },

  // ── Model Council (§3b: THE scroll-scrub signature) ────────────────────
  council: {
    id: "council",
    headline: [
      { text: "Ask the whole council. ", tone: "ink" },
      { text: "Let a neutral one decide.", tone: "muted" },
    ] as Segment[],
    sub:
      "Model Council sends your prompt to several models in parallel. Then a neutral " +
      "“chair” model reads every answer and writes a single synthesis — no debate, " +
      "no voting, just the best of all of them.",
    // Captions revealed across scroll progress (see motion spec §3b).
    captions: [
      "You ask once.",
      "Every model answers at once.",
      "One neutral answer, synthesized.",
    ],
  },

  // ── Deep Research (§4b: path-draw) ─────────────────────────────────────
  research: {
    id: "research",
    headline: [
      { text: "Research that ", tone: "ink" },
      { text: "runs itself.", tone: "muted" },
    ] as Segment[],
    sub:
      "Give it a question. Deep Research plans the work, searches, reads, and comes " +
      "back with a sourced answer — an agentic loop that runs on any model you've " +
      "connected, with no extra API keys.",
    bullets: [
      "Plans its own steps",
      "Searches and reads sources",
      "Cites what it used",
      "Runs on any connected model",
    ],
    // Nodes for the drawn path visual, in order.
    steps: ["Plan", "Search", "Read", "Compile", "Answer"],
  },

  // ── Private by design (§6: no numbering, no eyebrow, both themes) ───────
  privacy: {
    id: "privacy",
    headline: "Private by design.",
    sub:
      "There are no servers to leak, because there are none. Everything the app " +
      "does happens on your machine.",
    points: [
      {
        title: "No account, no cloud, no telemetry",
        body:
          "You never sign up and nothing syncs. Your conversations, history, settings, " +
          "and API keys stay on your device — and you can delete any of it anytime.",
      },
      {
        title: "Run models fully offline",
        body:
          "Connect a local model and the app works with no internet at all. Your prompts " +
          "never leave your computer, so there's no network hop for anyone to intercept.",
      },
      {
        title: "Or use zero-data-retention endpoints",
        body:
          "Prefer a powerful hosted model? Point it at a zero-data-retention (ZDR) endpoint " +
          "that processes your request but doesn't log it, store it, or train on it.",
      },
      {
        title: "Private end to end",
        body:
          "With a local or ZDR model, no prompt data is kept by us (we have no servers) or " +
          "by the provider. And because the app is open source, you can read the code and verify it.",
      },
    ],
  },

  // ── Real stats only (§ Oliviera treatment) ─────────────────────────────
  // TODO: confirm each value is true before shipping. Don't invent metrics.
  stats: [
    { value: "100%", label: "On your device" },
    { value: "0", label: "Servers" },
    { value: "8+", label: "Providers supported" }, // TODO: set real count.
    { value: "MIT", label: "Open source" }, // TODO: confirm license.
  ],

  // ── Download ───────────────────────────────────────────────────────────
  download: {
    id: "download",
    headline: [
      { text: "Bring the whole council ", tone: "ink" },
      { text: "to your desktop.", tone: "muted" },
    ] as Segment[],
    sub: "Free and open source. Your models, your machine.",
    primary: { label: "Download for Mac", href: DOWNLOAD_URL },
    secondary: { label: "Build from source", href: REPO_URL },
  },

  footer: {
    tagline: `${APP_NAME} — every model, on your machine.`,
    links: [
      { label: "GitHub", href: REPO_URL },
      { label: "Privacy", href: "#privacy" },
      { label: "How it works", href: "#council" },
    ],
    copyright: `© ${new Date().getFullYear()} ${APP_NAME}`,
  },
} as const;

export type Content = typeof content;
```
