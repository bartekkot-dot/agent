export const APP_NAME = "Chat UI"; // TODO: lock the final product name (see PLAN.md).

type Tone = "ink" | "muted";
type Segment = { text: string; tone: Tone };

export const content = {
  nav: {
    links: [
      { label: "Models", href: "#models" },
      { label: "How it works", href: "#council" },
      { label: "Privacy", href: "#privacy" },
    ],
    cta: { label: "Download", href: "#download" },
  },

  // ── Hero (§3a: scripted Council demo is the focal visual, added in M4) ──
  hero: {
    headline: [
      { text: "Ask every model at once. ", tone: "ink" },
      { text: "Get one answer you can trust.", tone: "muted" },
    ] as Segment[],
    sub:
      `${APP_NAME} is a local desktop app that sends your prompt to every ` +
      `AI model you use — at the same time — then has a neutral model combine ` +
      `their answers into one.`,
    // Scrolls to the download section, which does real per-OS asset detection —
    // the hero can't know the visitor's OS before that, so it doesn't claim one.
    primary: { label: "Download", href: "#download" },
    secondary: { label: "See how it works", href: "#council" },
    replayLabel: "Replay",
  },

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
      src: "model-council-demo.mp4",
      poster: "model-council-poster.jpg",
      alt: "Screen recording of Model Council running in the app: one prompt, several models answering in parallel, then a synthesized answer.",
    },
  },

  // ── Deep Research (§4b: path-draw, built in M5) ─────────────────────────
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
    steps: ["Plan", "Search", "Read", "Compile", "Answer"],
    demo: {
      src: "deep-research-demo.mp4",
      poster: "deep-research-poster.jpg",
      alt: "Screen recording of Deep Research running in the app: planning, searching, reading sources, and compiling a sourced answer.",
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
    heading: "Free, open, and pay only for what you use",
    lead:
      "Everything a premium AI app does — Deep Research, Model Council, and every " +
      "feature you'd expect from a modern AI client — with no subscription and no paywall.",
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

  // ── Real stats only ──────────────────────────────────────────────────────
  // The motion spec's "8+ providers" and "MIT license" are unconfirmed — left out
  // rather than shipped as guesses (PLAN.md G6: no fabricated assets). Only the two
  // claims that are self-evidently true from the app's own architecture are kept.
  stats: [
    { value: "100%", label: "On your device" },
    { value: "0", label: "Servers" },
  ],

  // ── Download ─────────────────────────────────────────────────────────────
  download: {
    id: "download",
    headline: [
      { text: "Bring the whole council ", tone: "ink" },
      { text: "to your desktop.", tone: "muted" },
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
