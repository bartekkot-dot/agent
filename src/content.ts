export const APP_NAME = "Chat UI"; // TODO: lock the final product name (see PLAN.md).

type Tone = "ink" | "muted";
type Segment = { text: string; tone: Tone };

export const content = {
  // Section links removed: short single-page site, visitors just scroll.
  nav: {
    cta: { label: "Download", href: "#download" },
  },

  // ── Hero: product identity naming BOTH features, not one feature's mechanic ──
  hero: {
    // Short by design (was a 4-line headline) — the sub-paragraph right below
    // still carries the every-model / agent / free / private detail in full.
    // "Every model, one app." was the default, but it echoes the Providers
    // section's own heading ("Every model, in one place.") too closely for a
    // page this short, so this uses the given fallback instead.
    headline: [
      { text: "One app. Every AI. ", tone: "ink" },
      { text: "Private.", tone: "muted" },
    ] as Segment[],
    sub:
      `${APP_NAME} asks every model you use at once for one answer you can trust — ` +
      `or hands a harder question to an agent that researches on its own and comes ` +
      `back with sources. Free, open source, private by default.`,
    // Scrolls to the download section, which does real per-OS asset detection —
    // the hero can't know the visitor's OS before that, so it doesn't claim one.
    primary: { label: "Download", href: "#download" },
    secondary: { label: "See how it works", href: "#council" },
    replayLabel: "Replay",
    // Hero diagram: the fan-out/converge flow (you -> models -> chair -> answer).
    // Plain-word stage captions so the shape is legible without reading the headline.
    diagram: {
      you: "you",
      chair: "chair",
      answer: "answer",
      captions: ["you ask once", "every model answers", "a neutral chair merges", "one answer"],
    },
  },

  // ── App preview strip (real product screenshots, right after the hero) ──
  // width/height are each screenshot's real pixel size, used to size the
  // slider cards to their native aspect ratio (no cropping, no distortion).
  appPreview: {
    shots: [
      { src: "screenshots/app-chat.png", alt: `${APP_NAME} chat view with the model prompt bar`, width: 1270, height: 798 },
      { src: "screenshots/app-settings-skills.png", alt: `${APP_NAME} settings, Skills tab`, width: 1270, height: 906 },
      { src: "screenshots/app-settings-general.png", alt: `${APP_NAME} settings, General tab`, width: 1282, height: 798 },
    ],
  },

  // ── Three pillars: the whole product in one glance, right after the proof
  // screenshots. One-line versions of the full value.points / privacy.points
  // detail kept further down the page — this is the skim version, not a
  // replacement for it.
  pillars: [
    {
      title: "Every model, in one place",
      body: "OpenAI, Anthropic, Google, local models, and more — switch freely, or ask them all at once.",
    },
    {
      title: "Free, pay only for what you use",
      body: "No subscription. Bring your own provider key and pay per word, same as always.",
    },
    {
      title: "Private by design",
      body: "No account, no cloud, no telemetry — everything happens on your device.",
    },
  ],

  // ── Canned Council demo script (hero §3a + scroll explainer §3b) ────────
  // CANNED/deterministic — no live API calls. Model IDs are placeholders from the
  // motion spec, not yet confirmed against what actually ships — see MOTION-SPEC.md
  // and BACKLOG.md's open questions before shipping this publicly.
  councilDemo: {
    prompt: "Should a two-person startup use a monorepo or separate repos?",
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

  // ── Every model, one place (§4a: provider grid) ─────────────────────────
  // Provider list verified against ChatUI-local/src/lib/builtin-providers.ts —
  // NOT the motion spec's placeholder list, which included unconfirmed names
  // (Mistral, xAI, DeepSeek, LM Studio). Center tile = APP_NAME mark.
  models: {
    id: "models",
    headline: [
      { text: "Every model, ", tone: "ink" },
      { text: "in one place.", tone: "muted" },
    ] as Segment[],
    sub:
      "Connect the providers you already pay for, plus any local model. " +
      "Switch between them freely — or ask them all at once.",
    providers: [
      { name: "OpenAI", kind: "hosted" },
      { name: "Anthropic", kind: "hosted" },
      { name: "Google", kind: "hosted" },
      { name: "Fireworks", kind: "hosted" },
      { name: "DeepInfra", kind: "hosted" },
      { name: "Ollama", kind: "local" },
      { name: "Custom endpoint", kind: "custom" },
    ] as { name: string; kind: "hosted" | "local" | "custom" }[],
  },

  // ── Model Council (§3b: THE scroll-scrub signature, built in M3) ────────
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
    captions: [
      "You ask once.",
      "Every model answers at once.",
      "One neutral answer, synthesized.",
    ],
    demo: {
      // Real recording: idle -> Panel Setup config -> streaming response ->
      // structured Discussion Brief. That progression is the reason this is
      // video, not a static frame — a single frame can only ever show one of
      // those states, never the sequence.
      src: "model-council-demo.mp4",
      poster: "model-council-poster.jpg",
      alt: "Screen recording of Model Council running in the app: panel setup, a streaming response, then a structured discussion brief.",
    },
  },

  // ── Deep Research (§4b: path-draw, built in M5) ─────────────────────────
  research: {
    id: "research",
    // Threads the same session as the Council section above: that debate ended
    // on "use Turborepo or Nx" — Research picks up exactly there, and the
    // question is deliberately comparative (not a how-to) so the payoff is
    // reconciling several sources, not just fetching one answer.
    connective: "Later that day, a related question comes up:",
    headline: [
      { text: "Research that ", tone: "ink" },
      { text: "runs itself.", tone: "muted" },
    ] as Segment[],
    sub:
      "Give it a question. Deep Research plans the work, searches, reads, and comes " +
      "back with a sourced answer — an agentic loop that runs on any model you've " +
      "connected, with no extra API keys.",
    citation: {
      question: "Turborepo vs Nx for a 2-person monorepo in 2026 — which has better remote caching and CI story?",
      sources: [
        {
          domain: "turborepo.com",
          note: "Remote Caching docs — shared cache skips re-running unchanged tasks across every machine and CI run.",
        },
        {
          domain: "nx.dev",
          note: "Nx Cloud docs — distributed task execution plus an affected-graph analysis built for larger, multi-team repos.",
        },
        {
          domain: "github.com/vercel/turborepo",
          note: "Community discussion — Turborepo's setup is simpler; Nx's extra dependency-graph tooling only pays off past ~10 packages.",
        },
      ],
      verdict:
        "For a two-person team, Turborepo wins on simplicity and remote caching alone — revisit Nx only if the monorepo grows past ~10 packages.",
    },
    steps: ["Plan", "Search", "Read", "Compile", "Answer"],
    // The loop is the real shape (search -> read -> refine, repeated), unlike
    // Council's one-shot fan-out. Plain-word label on the return arrow, plus a
    // stage caption row under the three visual clusters (single node / loop / payoff).
    loopLabel: "repeats until it has enough",
    flowCaptions: ["plans the steps", "searches & reads — on repeat", "cited answer"],
    demo: {
      // Real recording: idle -> a live-growing list of "Researched: ..." log
      // entries (the loop actually iterating) -> a structured Research Report
      // with cited sources. The accumulation IS the mechanic being sold here —
      // a static frame can show the report but never the iterating that earns it.
      src: "deep-research-demo.mp4",
      poster: "deep-research-poster.jpg",
      alt: "Screen recording of Deep Research running in the app: research steps accumulating, then a cited research report.",
    },
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

  // ── Free, open, and pay only for what you use (kept from the original brief — ─
  // not in the motion spec's page order, but no explicit approval to drop it either;
  // placed between Privacy and Stats since it's another "why trust/choose this" reason.
  value: {
    id: "value",
    heading: "Everything a premium AI app does. For free.",
    lead:
      "No subscription, no paywall — every feature is included, and nothing is gated " +
      "behind a pro tier. A subscription charges the same flat fee whether you use it " +
      "once or every day; here, you pay a model provider only for what you actually use.",
    points: [
      {
        title: "Free and open source",
        body:
          "The app itself is completely free. Every feature is included; nothing is gated " +
          "behind a pro tier. The full source is public, so anyone can inspect it, build on " +
          "it, or contribute.",
      },
      {
        title: "You pay providers directly, per word",
        body:
          "Instead of a monthly fee to us, you bring your own API key and pay the model " +
          "provider for exactly what you use — measured per word the model reads and writes. " +
          "No markup, no middleman.",
      },
      {
        title: "Nothing when idle, a little when busy",
        body:
          "A month you don't open the app costs you nothing. A light month costs a few " +
          "pennies. Only heavy use costs more — and you only ever pay for the words you " +
          "actually generate.",
      },
      {
        title: "Usually cheaper than a subscription",
        body:
          "A flat subscription costs the same whether you use it once or a thousand times. " +
          "Pay-per-word scales with real use, so you never pay for capacity you didn't " +
          "touch — which for most people is cheaper over a year.",
      },
    ],
  },

  // ── Download ─────────────────────────────────────────────────────────────
  download: {
    id: "download",
    headline: [
      { text: "Every model, ", tone: "ink" },
      { text: "one download away.", tone: "muted" },
    ] as Segment[],
    sub: "Free and open source. Your models, your machine.",
  },

  footer: {
    tagline: `${APP_NAME} — every model, on your machine.`,
    copyright: `© ${new Date().getFullYear()} ${APP_NAME}`,
  },

  // ── Real GitHub wiring (kept from the original brief — the addendum's
  // DOWNLOAD_URL/REPO_URL placeholders are TODO stand-ins, this is the real thing) ──
  github: {
    owner: "tomaszrymaszewski",
    repo: "ChatUI-local",
  },
  links: {
    releases:
      "https://github.com/tomaszrymaszewski/ChatUI-local/releases/latest",
    allReleases: "https://github.com/tomaszrymaszewski/ChatUI-local/releases",
    source: "https://github.com/tomaszrymaszewski/ChatUI-local",
  },
} as const;

export type Content = typeof content;
