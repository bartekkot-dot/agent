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
- [x] M3 — §3b Model Council scroll-scrub (signature moment) — `backlog/M3.md`
      depends: M2
- [x] M4 — §3a Hero scripted Council demo — `backlog/M4.md`
      depends: M2
- [x] M5 — §4 micro-moments (provider-grid connect, research path-draw) — `backlog/M5.md`
      depends: M2
- [x] M6 — Reduced-motion / both-theme / mobile / build final pass — `backlog/M6.md`
      depends: M3, M4, M5
- [x] M7 — Post-ship fix: Council end-state was empty, scrub too fast, restore videos
      depends: M6 (user-reported fix, not part of the original addendum — no prompt file,
      logged here directly)

M3, M4, M5 each only depend on M2 (the static skeleton), not on each other — they touch
different sections (Council / Hero / Provider-grid+Research) and can run in any order
once M2 lands. Still: one item, then stop for review, per the default rule.

## Known open questions

- ~~**ValueSection fate**~~ — resolved in M2: kept, placed between Privacy and Stats, and
  brought in line with Privacy's "no numbering/no eyebrow" fix.
- ~~**Stats were placeholders**~~ — resolved in M2: shipped only the two self-evidently
  true numbers (100% on-device, 0 servers), dropped the two unconfirmed ones rather than
  guess.
- **Still open — Council demo model IDs**: `claude-opus-4-8`, `gpt-5.1`, `gemini-3-pro`,
  `local · llama-4` are the addendum spec's own placeholders, marked TODO by the spec
  itself. They're now visible and *animated* in three places (M3's scroll-scrub, M4's hero
  demo, and implicitly anywhere `councilDemo` is read). **Confirm the real IDs before this
  ships publicly** — this is the one item this backlog could not resolve on its own since
  it requires product information (which models actually ship) that isn't in the repo.

## Full arc summary (M1–M6, all done 2026-08-31)

Green "live" accent replacing the prior blue brand color (with a real AA-contrast fix along
the way — the spec's own light-mode green value failed WCAG by a hair, caught by actually
computing contrast rather than trusting the spec's number); Cabinet Grotesk headings; a
full page restructure (Hero → Models → Council → Research → Privacy → Value → Stats →
Download, dropping Showcase/Integrations/FAQ/videos per explicit instruction, PLAN.md's G6
formally superseded not silently violated); three signature motion moments (Council
scroll-scrub, hero scripted demo, two micro-moments) all built around one core lesson
discovered in M3 and reused everywhere after: prefer discrete phase-state + conditional
mount/unmount over continuous motion values for anything that needs to reach and hold an
"off" state, because a real (still not fully root-caused, but reliably reproducible in both
dev and production builds) Framer Motion bug can leave continuous opacity transforms stuck
partway. Mobile got a real layout fix, not just a note: the scroll-scrub's four lanes,
positioned at fixed pixel offsets, completely broke on a 380px viewport (two lanes clipped
off-screen entirely) — replaced with a responsive single-column stack below 640px, sized
against actually-measured card heights rather than guessed spacing.

Against `PLAN.md`'s `Definition of done` (as amended by this addendum): single page, all
copy from `content.ts` (merged, not overwritten — real GitHub release-fetch flow preserved
throughout) ✓; light + dark both readable, AA contrast verified with real numbers, not
assumed ✓; download resolves to the correct OS asset from the real latest release, with
fallback (unchanged, still works — confirmed live in screenshots throughout) ✓; motion is
calm outside the three explicitly-sanctioned signature moments and respects
`prefers-reduced-motion` — verified by code construction (the animated variant of each
moment simply never mounts/never applies under reduced motion, not just "looks static") ✓;
clean `npm run build` at every single stage, deployed target corrected to Cloudflare Pages
in `PLAN.md` ✓. The one item this backlog cannot close by itself: **the four model IDs
need real confirmation before public ship** (see above).

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

### M3 — done 2026-08-31
Built `src/components/council-scrub.tsx`: a `175vh` wrapper with a `sticky top-0` inner
panel, `useScroll({target, offset:["start start","end end"]})` driving four progress-based
stages exactly per the spec's `p` ranges (prompt → 4 lanes spread+stream → settle steady →
converge into chair, green fading to ink). `council-section.tsx` now renders the headline/
sub normally, then `<CouncilScrub />` (no `<Reveal>` wrapper — this section's visibility is
driven by its own scroll math, not the page's generic reveal-on-enter). Installed
`framer-motion` (approved earlier this session).

**Important bug found and worked around — relevant for M4 and M5, which will hit the same
thing**: continuous `useTransform`-driven opacity that needs to fade an element to `0` and
*stay* there for an extended stretch of scroll would intermittently get stuck at a stale
intermediate value (confirmed via a temporary debug readout: Framer's own motion-value
reported `0.000` correctly, but `getComputedStyle` on the actual DOM node showed `~0.64` —
the value computed correctly but didn't reliably apply to that DOM node on every update).
Reproduced identically in both `npm run dev` and a production `vite preview` build, so it
is **not** a React 19 StrictMode dev-only artifact — root cause not fully diagnosed, but
consistently reproducible enough to design around. Also caught and fixed **before** it hit
screenshots: the `laneOpacity`/`x` motion values I computed were correct but had never
actually been wired into `LaneCard`'s `style` prop in the first draft — worth double
checking that every declared motion value is actually consumed somewhere, not just
declared, since a forgotten hookup fails silently (no error, element just doesn't animate).

**Workaround (use this pattern in M4/M5 too):** for any element whose *existence* — not
just its final resting opacity — matters (does it show or not), gate it with a discrete
`phase`/boolean React state (updated via `useMotionValueEvent`) and conditionally mount/
unmount it (`{condition && <motion.div>...}`), rather than trusting a long-running
continuous opacity transform to reach and hold `0`. Reserve continuous `useTransform`
values for animations *within* an already-mounted element's lifetime (position, per-line
reveal, scale) — those never exhibited the bug. This is why `council-scrub.tsx` computes a
`phase: "idle"|"active"|"settled"|"chair"` state and a `captionIndex`/`chairInk` boolean
instead of the more "idiomatic" all-continuous-motion-values approach the spec's prose
suggests — it trades a little crossfade smoothness for guaranteed correctness. Also note:
Framer's pinned-scrub progress reaches `1` at scroll distance `(wrapperHeight -
viewportHeight)`, **not** `wrapperHeight` — got this wrong in my own test script at first
and it produced very confusing false-bug symptoms before I caught it.

Also caught mid-build: the prompt bubble and the lane cards initially shared the same
vertical slot (both absolutely centered in one container), so the mid-transition frames
showed overlapping text. Fixed by giving the prompt its own row above the lane/chair
"stage" — no shared space, no possible overlap regardless of timing.

Verified: `npm run build` clean; both themes; scrolled through at p≈0.05/0.3/0.6/0.9/0.98
via Playwright (screenshots in
`/private/tmp/claude-501/.../scratchpad/m3f-dark-*.png`, `m3g-light-*.png`); reduced-motion
via `page.emulateMedia({reducedMotion:'reduce'})` renders the full static composition
(prompt, four faded lanes, synthesis card, all three captions as plain stacked text)
immediately with zero animation, as the spec requires
(`m3-reduced-reduced.png`). No console errors in any run.

**Still unconfirmed** (per BACKLOG.md's open questions, unchanged by this item): the four
`councilDemo` model IDs are the spec's own placeholders — now visible and *moving* in this
scrub, which makes confirming them before ship more important, not less.

### M4 — done 2026-08-31
Built `src/components/hero-demo.tsx`: a time-based (not scroll-linked) ~3.5s canned
sequence — typed-in prompt (`setInterval`-driven character reveal, ~700ms) → four model
chips mount with a staggered per-line reveal (`framer-motion` `initial`/`animate` +
per-line `delay`, ~1500ms, pulsing `--live` while "streaming") → brief steady-green pause
(300ms) → chips unmount, chair/synthesis card mounts and its text crossfades from `--live`
green to `--ink` via a plain CSS `transition-colors` once the sequence reaches "done"
(1000ms). Rests there, does not loop. Small "Replay" button restarts it
(`content.hero.replayLabel`); re-entering view after scrolling away also replays, via the
existing `useInView` hook (same one `reveal.tsx` uses) tracking view-enter transitions.
Wired into `hero-section.tsx` below the CTAs as the hero's focal visual (deferred there
since M2).

Applied M3's lesson from the start instead of rediscovering it: used discrete `step`
React state (`"typing"|"streaming"|"settled"|"chair"|"done"`) with conditional mount/
unmount for the prompt/chips/chair, rather than continuous opacity transforms trying to
reach and hold `0`. Since this component's animations are time-triggered state changes
(not a continuously-scrubbed value), Framer's `initial`/`animate`/normal enter animations
are the standard, well-trodden path here anyway — did not hit anything resembling M3's bug
in this component.

Skipped adding JetBrains Mono (which the *original* brief, not this addendum, floated for
model-ID chips) — Tailwind's default `font-mono` stack (already used for the model IDs in
M3's scrub) reads cleanly at this size and avoids both a new font dependency and extending
the "mono eyebrow" pattern the addendum explicitly warns against.

Verified: `npm run build` clean; both themes; captured frames through the sequence
(typing, mid-stream with visible per-line stagger, chair) via Playwright — screenshots in
`/private/tmp/claude-501/.../scratchpad/m4b-{dark,light}-t*.png`. Reduced motion
(`page.emulateMedia`) renders the full static end composition immediately, no typing/
streaming (`m4b-reduced-reduced.png`). Replay button tested by clicking it mid-sequence and
confirming the prompt starts retyping from scratch. No console errors.

### M5 — done 2026-08-31
**4a — provider grid connect** (`models-section.tsx`): added a dedicated `useInView`
(separate from the section's own `<Reveal>` — different concern, page-entrance vs. this
micro-moment) that latches a `hasPlayed` boolean true on first intersection and never back
to false. Each outer provider tile gets a `tile-pulse-animate` CSS class (new keyframes in
`index.css`, gated the same way the existing `.council-node-animate`/`.glow-orb-animate`
rules are — inside `@media (prefers-reduced-motion: no-preference)`) with a per-tile
`--pulse-delay` custom property for the outward stagger. Because `hasPlayed` is a one-way
latch and re-applying an unchanged className doesn't restart a CSS animation, "fires once,
never repeats" holds by construction, not just by the timing of my test screenshots — no
extra guard code needed for that requirement. Reduced motion needed **zero** extra
branching: the keyframe class does nothing when motion is reduced, so the outer tiles just
stay in their base unlit state forever and the center tile is unconditionally lit already
in the static markup — exactly the spec's "reduced motion: static, center lit" outcome, for
free.

**4b — Deep Research path draw** (`deep-research-diagram.tsx`, fully rewritten): reconciled
to `content.research.steps` (5 nodes: Plan/Search/Read/Compile/Answer — the old hardcoded
array had 4, "Synthesize" instead of "Compile", no "Answer"). Draw-in uses the *same*
`--dash-length`/keyframe technique the deleted `model-council-diagram.tsx` used (reused the
existing `council-line-draw` keyframe for the connecting lines; added a new
`research-node-lit` keyframe for the node rect/text fill+stroke, correctly targeting SVG
`fill`/`stroke` rather than the HTML `border-color`/`color` I wrote in a first draft and
caught before shipping). Each element's React-rendered attributes are already set to the
"lit" value the instant `hasPlayed`/reduced-motion is true — the CSS animation only
provides the progressive *reveal* transition from muted to lit; if the animation class
never applies (reduced motion), the element still renders correctly lit immediately, same
zero-extra-branching outcome as 4a. Per-node/line `animationDelay` (`0.15s` apart) creates
the left-to-right draw sequence. Final "Answer" node settles to steady green, not ink — this
is deliberately different from M3's chair-card fade, which signals "conversation over"; a
finished checklist item just stays lit.

Verified: `npm run build` clean; both themes; Playwright scroll-into-view tests for both
moments, confirming: not-yet-played state, mid/settled state, a second scroll-away-and-back
visit (models grid — visually identical to first settle, and structurally guaranteed not to
re-fire per the latch argument above), and reduced-motion immediate-lit state for both.
One false alarm caught and resolved during verification: a settled-state screenshot showed
the last provider tile (highest stagger delay) still faintly tinted — traced to my test
waiting less time (900ms) than that tile's own delay+duration budget (~1.28s), not a
component bug; confirmed fully resolved with a longer wait. Screenshots in
`/private/tmp/claude-501/.../scratchpad/m5-{dark,light,reduced}-*.png`.

### M6 — done 2026-08-31
**Reduced-motion sweep**: verified by construction, not just visual inspection, per the
prompt's explicit warning about paused-but-still-scheduled animations. Every animated
moment (M3 scrub, M4 hero demo + replay/re-enter, M5's two micro-moments) renders an
entirely different, simpler component/branch under reduced motion — the JS
timers/`useScroll`/`useMotionValueEvent` subscriptions for the animated variant **never
mount** (conditional `reducedMotion ? <Static/> : <Animated/>`), and the two CSS-only M5
moments have their keyframe rules themselves scoped inside
`@media (prefers-reduced-motion: no-preference)`, so reduced motion means the animation
class does nothing at all, not "runs and immediately finishes." Zero JS loops possible in
either case, by construction.

**Both-theme sweep**: re-verified AA contrast against the *actual shipped* `--live` value
(`#147847` light / `#35C07A` dark — the addendum's `#158A4E` was already replaced in M1
after failing contrast) — light ~5.5:1, dark ~8.4:1, both comfortably over the 4.5:1 floor.
Light-mode glow still reads as an intentional soft tint with M4's hero demo added (more
green elements near it, same glow mechanism, no clash observed). No section reads
unfinished in either theme.

**Mobile pass — found and fixed a real bug, not just noted it**: at a 380px viewport,
`council-scrub.tsx`'s four lanes (fixed pixel offsets ±330/±110) badly overflowed — the
outer two lanes were clipped completely out of view by the sticky container's
`overflow-hidden` (confirmed via `getBoundingClientRect`, not just a screenshot: the lane
elements were positioned at x≈-140 and x≈520 against a 380px viewport). Fixed with a
`useIsMobile()` breakpoint hook (max-width: 639px) driving separate mobile/desktop target
arrays for the existing `x`/new `y` motion values. First attempt used a 2x2 grid, which
looked fine at a glance but had 2–10px vertical overlaps between adjacent cards once
actually measured via `getBoundingClientRect` (card height varies with each model's line
count — a fixed grid row height can't fit all of them). Replaced with a single-column
vertical stack instead, spaced `140px` apart center-to-center — enough to clear the tallest
card (~132px) with margin, confirmed via the same bounding-rect measurement technique
rather than trusting a screenshot. Provider grid and every other section already reflowed
correctly on mobile with no changes needed (`grid-cols-2` responsive classes were already
in place from M2/M5). No horizontal overflow anywhere on the full page, either theme,
confirmed via `document.documentElement.scrollWidth` swept across full scroll range.

**Process note for future sessions**: hit a confusing false trail during the mobile fix —
re-reading a screenshot at the *same file path* after a rebuild repeatedly showed a stale
cached image despite the underlying PNG file, build output, and even live
`getBoundingClientRect()` all confirming the fix had taken effect. Writing to a fresh,
never-before-used filename immediately showed the correct result. If a screenshot ever
looks suspiciously identical to a previous one after a code change that should visibly
affect it, verify with `getBoundingClientRect`/`getComputedStyle` or a new filename before
concluding the fix didn't work.

**a11y floor**: all new interactive elements (nav links, nav CTA, Replay buttons) have
visible focus indication — either explicit `focus-visible:ring-*` classes (Replay buttons)
or the project's global `outline-ring/50` base-layer rule (plain `<a>` tags, which keeps the
browser's native focus outline but tints it to match the design system). Decorative SVGs
(`deep-research-diagram.tsx`) already carry `aria-hidden="true"`. Landmark structure
(`<header>`/`<nav>`/`<main>`/`<footer>`) untouched by the section reorder — only the
`<section>` children within `<main>` changed order/content.

`npm run build` clean as the final check. Full arc summary and `Definition of done`
reconciliation recorded above under "Full arc summary." This closes the backlog except for
the one item that needs the user, not more engineering: confirming the real model IDs
before public ship.

### M7 — done 2026-08-31 (post-ship user report)
User reported, with a screenshot, that scrolling to the end of the Council section showed
**only the caption** — no synthesis card, no lanes. Root-caused via direct instrumentation
rather than guessing: a temporary debug readout (`useTransform` combining `p`,
`chairOpacity`, `laneOpacity` into visible text) proved the chair's own opacity math was
correct once mounted, but the **caption's threshold (`captionIndexFor`, flips at p=0.71)
and the chair's opacity ramp (`chairOpacity`, doesn't start until p=0.72 and doesn't finish
until 0.86) were on independent, misaligned timelines** — real momentum-scroll or a page
that runs out of scrollable room could easily land a user in that 0.70–0.86 gap, where the
caption already says "synthesized" but the chair is still transparent. Confirmed this
mechanism, not a Framer bug, by testing single-jump vs. sequential-jump scroll patterns.

Fixed by: **redesigning around one rule — caption and visual now share the exact same
phase boundaries** (`phaseFor`/`captionIndexFor` both flip at 0.12/0.85), so there is no
window where one has moved on and the other hasn't. Additionally, per the fix spec, lanes
and the chair card are now **both permanently mounted** (no more conditional mount/unmount
introduced in M3) — lanes settle to a faint `0.2` opacity behind the chair instead of
disappearing, so there's no mount-boundary instant to get caught in even in principle.

Also per the fix spec: pin lengthened 175vh → **300vh**; `scrollYProgress` now wrapped in
`useSpring(stiffness: 80, damping: 26, restDelta: 0.001)` and every transform reads the
spring (`p`), not the raw scroll value, so scrubbing glides; phases re-timed to the spec's
exact ranges (0/0.12/0.35/0.65/0.85/1.0) with streaming (0.35–0.65) as the widest window;
`easeInOut` (imported from `framer-motion`, not the string `"easeInOut"` — that fails
TypeScript's `EasingFunction` type) applied to every positional/opacity transform; the
synthesis card now renders `councilDemo.synthesis.lines` in full, not just the first line.

**Verification note for future sessions**: testing this required distinguishing three
different scroll-timing effects that all look similar from a screenshot alone — (1) native
CSS `scroll-behavior: smooth` intercepting programmatic `scrollTo` (fixed by passing
`{behavior: "instant"}`), (2) the new spring's own settling time after a scroll change
(needs ~1–2s of wait after even an instant scroll, confirmed via a temporary live debug
readout of the spring's value), and (3) a synthetic-test-only artifact where several large
instant jumps in immediate sequence within one Playwright session leave the spring
lagging in a way a real gradual human scroll does not (confirmed via a 60-step gradual-
scroll simulation with only one sub-perceptual transitional frame, vs. the reported bug
which was a sustained, noticeable empty state). Don't assume screenshot A ≠ screenshot B
means "still broken" without checking which of these three is actually in play.

**Fix 3 — videos restored**, not reinvented: recovered the actual deleted assets
(`public/model-council-demo.mp4`, `model-council-poster.jpg`, `deep-research-demo.mp4`,
`deep-research-poster.jpg`) via `git checkout 330194c^ -- <paths>` (the M2 commit that
deleted them) rather than sourcing new ones. Built a new `product-video.tsx` (the old
`demo-video.tsx` was click-to-play; the fix spec wants autoplay/muted/loop) —
lazy-mounted via `useInView` so it never loads until scrolled near, and renders only the
`<img poster>` (no `<video>` element at all) under reduced motion rather than an
autoplaying-then-paused video, per the spec. Placed in both `council-section.tsx` (above
the scrub) and `research-section.tsx` (above the bullets/diagram row) as "proof," with the
existing scrub/diagram kept as the "explainer" — confirmed via the video-vs-scrub roles
rule that these aren't redundant (one is real footage, one is a stylized diagram) so
neither needed to be cut. Verified zero failed `.mp4`/`.jpg` requests and correct
`autoplay`/`muted`/`loop` attributes via direct `page.evaluate` inspection, not just visual
inspection, in both reduced-motion states.

`npm run build` clean; no horizontal overflow on mobile with the added video blocks;
no console/page errors in any test.
