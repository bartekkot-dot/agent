# ChatUI landing page — Motion + reference spec — Implementation Backlog

Plan file: `MOTION-SPEC.md` (the addendum spec text, saved verbatim alongside this backlog)

Context: this backlog implements the "Landing page — motion + reference spec" addendum
(a follow-up to the original `CLAUDE-CODE-BRIEF-landing.md`). It supersedes the prior
session's decision to keep every existing section — the user explicitly re-confirmed a
**full swap** to the new section order, approved **Framer Motion** as a new dependency, and
asked for this work to be tracked as a backlog rather than done in one long chat.

Prior session already did a palette/typography pass (green `--brand` accent, Cabinet
Grotesk headings) that this backlog's M1 supersedes with the addendum's more complete
token table — don't be surprised the values change again in M1, that's expected.

## Items

- [x] M1 — Amend PLAN.md + theme tokens (both modes) + typography check — `backlog/M1.md`
      depends: none
- [x] M2 — Static skeleton, new section order, merged content.ts — `backlog/M2.md`
      depends: M1
- [ ] M3 — §3b Model Council scroll-scrub (signature moment) — `backlog/M3.md`
      depends: M2
- [ ] M4 — §3a Hero scripted Council demo — `backlog/M4.md`
      depends: M2
- [ ] M5 — §4 micro-moments (provider-grid connect, research path-draw) — `backlog/M5.md`
      depends: M2
- [ ] M6 — Reduced-motion / both-theme / mobile / build final pass — `backlog/M6.md`
      depends: M3, M4, M5

M3, M4, M5 each only depend on M2 (the static skeleton), not on each other — they touch
different sections (Council / Hero / Provider-grid+Research) and can run in any order
once M2 lands. Still: one item, then stop for review, per the default rule.

## Known open questions (not yet resolved — surfaced inside the relevant item)

- **ValueSection fate** (M2): the addendum's new page order and `content.ts` have no
  pricing/"free and open" section at all, but the user never explicitly approved dropping
  it (only Showcase/Integrations/FAQ + videos were approved). M2 must stop and ask before
  deleting it.
- **Council demo model IDs are placeholders** (M3, M4): `claude-opus-4-8`, `gpt-5.1`,
  `gemini-3-pro`, `local · llama-4` in the addendum's `councilDemo` are marked TODO by the
  spec itself ("confirm the IDs you actually ship with"). Must be confirmed with the user
  before shipping, not silently invented/kept.
- **Stats are placeholders** (M2): `"8+" Providers supported` and `"MIT" Open source` are
  marked TODO in the addendum. Must be confirmed with the user (real provider count, real
  license) before shipping.

## Completion notes

### M1 — done 2026-08-31
`PLAN.md`: fixed 4 "Vercel" mentions (lines 4, 86, 127, 141) to Cloudflare Pages, matching
the actual `vite.config.ts`/`.github/workflows/deploy.yml`. Added a supersession note under
G6 (extension) dated today recording that `MOTION-SPEC.md` retires the two demo videos —
future items shouldn't be flagged against that constraint.

`src/index.css`: mapped the addendum's `--canvas/--surface/--ink/--muted/--live/--hairline`
onto the existing `--background/--card/--foreground/--muted-foreground/--brand/--border`
variables (no parallel token system introduced) — see the table in `backlog/M1.md` Step 3
for exact values. `--sidebar*` left untouched (unused in this project).

**Real finding, not just a formality**: computed actual WCAG contrast rather than trusting
the spec's numbers. The spec's light-mode green `#158A4E` with white button text measures
~4.39:1 — fails AA's 4.5:1 for normal text (near-black text on it does no better, ~4.51:1 —
the color is a "middle brightness" that's borderline against both). Darkened to `#147847`
(~5.52:1 with white text, comfortable margin) and documented the deviation inline in
`index.css`. Dark-mode green (`#35C07A`) re-verified unaffected: ~8.43:1 with near-black
text — confirmed the existing "don't use white text on dark-mode green" trap still holds
(white would be ~2.3:1, fails badly).

Light-mode glow gotcha (Step 4): screenshotted at the new green value — the existing
blur+opacity `.glow-orb` technique already reads as an intentional soft mint tint on white,
not invisible. No mechanism change needed.

`npm run build` clean both times (before and after the contrast fix). Screenshots:
`/private/tmp/claude-501/.../scratchpad/m1-dark.png`, `m1-light.png`.

### M2 — done 2026-08-31
**Ran without stopping for the two flagged decisions** (user explicitly asked not to pause
for confirmation between items) — applied the safest documented fallback for each and
flagged both clearly here rather than guessing silently:
- **ValueSection**: kept, not dropped — no explicit approval existed to delete real,
  non-templated content. Placed between Privacy and Stats in the new order (App.tsx).
  Applied the same §6 fix to it (removed numbering + green eyebrow) since it shares the
  exact template Privacy was fixed for — leaving one fixed and one not would have looked
  inconsistent now that FAQ (the third section with this pattern) is gone.
- **Stats**: shipped only `100% / On your device` and `0 / Servers` — dropped the spec's
  "8+ providers" and "MIT license," both marked TODO/unconfirmed by the spec itself. Do not
  add these back without a real confirmed number/license.

**Found and corrected a factual-accuracy issue the spec didn't flag**: the addendum's
provider list for the "every model" grid (OpenAI, Anthropic, Google, Mistral, xAI,
DeepSeek, Ollama, LM Studio) doesn't match what the app actually implements. Checked
`ChatUI-local/src/lib/builtin-providers.ts` directly — real list is OpenAI, Anthropic
(Claude), Google (Gemini), Fireworks, DeepInfra, Ollama, plus a Custom-endpoint option.
Used the verified list instead (7 provider tiles + center `Chat UI` tile, content.ts
`models.providers`). This is the same category of issue as the M1 contrast finding: the
spec's numbers looked plausible but weren't actually checked against reality.

content.ts: full merge, not overwrite. Kept `github`/`links` and the real per-OS
release-fetch flow (`use-latest-release.ts` → `github-releases.ts`) — confirmed still
working live in the screenshots (real v0.1.2 macOS/Windows assets rendered). Adopted the
addendum's flatter `APP_NAME` const and `headline`/`sub` naming convention throughout
(renamed `privacy.heading/lead` → `privacy.headline/sub` for consistency). Dropped
`DOWNLOAD_URL`/`REPO_URL` consts entirely — redundant with `content.links.source`, and
hero/download buttons use the real dynamic flow instead of a static href.

Deleted: `showcase-section.tsx`, `integrations-strip.tsx`, `faq-section.tsx`,
`features-section.tsx`, `model-council-diagram.tsx` (superseded by M3), `demo-video.tsx`,
and the now-unreferenced `public/` assets (2 demo videos + posters, 3 showcase
screenshots). Also deleted `about-section.tsx` — this was already dead code (unused
before this item too) but its `content.app.name` reference broke `tsc` once `content.app`
was removed, so it had to go rather than stay "untouched."

Kept `deep-research-diagram.tsx` as-is (still hardcodes 4 steps
Plan/Search/Read/Synthesize, not content-driven) — M3/M5's own prompts already say to
reconcile it to `content.research.steps` (5 steps, "Synthesize"→"Compile" + new "Answer")
when adding the path-draw animation, so left untouched here to avoid duplicating that work.

`features-section.tsx`'s other two cards ("Local & private", "Model-agnostic") — "Local &
private" is already fully covered by the Privacy section. "Model-agnostic / bring your own
keys / switch freely" isn't dropped: it's now carried by `content.models.sub` ("Switch
between them freely — or ask them all at once") in the new Models section, which is a
closer fit for that point than Features ever was.

Added: `models-section.tsx`, `council-section.tsx` (static flow: prompt → 4 model chips →
synthesis card, using real `councilDemo` data — model IDs are still the unconfirmed
placeholders, see below), `research-section.tsx`, `stats-section.tsx`. Extended
`site-header.tsx` with real nav links + CTA button (previously just a wordmark + theme
toggle). New `App.tsx` order: Hero → Models → Council → Research → Privacy → Value →
Stats → Download → Footer.

**Still unconfirmed, unchanged from BACKLOG.md's open questions**: `councilDemo`'s four
model IDs (`claude-opus-4-8`, `gpt-5.1`, `gemini-3-pro`, `local · llama-4`) are the spec's
own placeholders, now visible in the static Council section. M3/M4 will build real motion
around these — confirm the real IDs before this ships publicly.

`npm run build` clean. Verified in both themes via full scroll-through screenshots (not
just top-of-page — a single full-page capture is misleading here because every section
uses `IntersectionObserver`-triggered reveal, which never fires for content that was never
actually scrolled into view during a single capture; scrolled step-by-step instead, which
is what a real visitor's browser actually does). Screenshots:
`/private/tmp/claude-501/.../scratchpad/m2-{dark,light}-{0..5}.png`.
