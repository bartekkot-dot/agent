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
- [ ] M2 — Static skeleton, new section order, merged content.ts — `backlog/M2.md`
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
