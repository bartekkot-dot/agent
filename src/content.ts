export const content = {
  app: {
    name: "Chat UI",
    tagline: "One prompt. Many models. One clear answer.",
    slogan:
      "A more private, cost-efficient, flexible, and easy-to-use AI chat & agent interface.",
    blurb: {
      lead: "A private, local-first desktop app for chatting with AI.",
      detail:
        "Send a single prompt to several models at once, then let a neutral model read every reply and synthesize one balanced answer. Your keys and your data stay on your machine.",
    },
  },
  showcase: [
    {
      src: "/screenshot-diagram.jpg",
      alt: "ChatUI generating a labelled free-body diagram of a crane, showing the full load-supporting path and force equations",
      caption: "Follow its reasoning step by step — not just the final answer",
      width: 1098,
      height: 664,
    },
    {
      src: "/screenshot-connectors.jpg",
      alt: "ChatUI's Connectors settings, showing available integrations including Notion, Linear, Figma, GitHub, and Cloudflare",
      caption: "Connect it to the tools you already use",
      width: 1053,
      height: 645,
    },
    {
      src: "/screenshot-skills.jpg",
      alt: "ChatUI's Skills settings, showing a library of installable skill packs for building apps, writing documents, and more",
      caption: "Install skills that make it great at a specific task",
      width: 1072,
      height: 657,
    },
  ],
  integrations: [
    "Notion",
    "Linear",
    "Figma",
    "GitHub",
    "Jira & Confluence",
    "Zapier",
    "Airtable",
    "Webflow",
    "Vercel",
    "Cloudflare",
    "Sentry",
    "Todoist",
  ],
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
  features: [
    {
      title: "Model Council (discuss mode)",
      description:
        "Your prompt runs across several models at once. Each answers independently — then, in discuss mode, they see each other's replies and refine. A neutral chair model reads everything and synthesizes one balanced answer, giving you the strengths of several models and the blind spots of none.",
      icon: "Users",
      demo: {
        src: "/model-council-demo.mp4",
        poster: "/model-council-poster.jpg",
        name: "Model Council",
        cta: "Watch how it works",
      },
      diagram: true,
      staticDiagram: false,
      diagramCaption: "How Model Council works",
    },
    {
      title: "Deep Research",
      description:
        "An agentic loop that works a question the way a person would: it plans an approach, breaks the problem into steps, searches and reads sources, and synthesizes a structured, referenced answer. Model-agnostic, driven by a simple JSON action protocol.",
      icon: "Telescope",
      demo: {
        src: "/deep-research-demo.mp4",
        poster: "/deep-research-poster.jpg",
        name: "Deep Research",
        cta: "See it in action",
      },
      diagram: false,
      staticDiagram: true,
      diagramCaption: "How Deep Research works",
    },
    {
      title: "Local & private",
      description:
        "A native desktop app with no account and no servers. Your keys, history, and settings live on your machine. Connect a local or Zero-Data-Retention model and nothing is ever stored by anyone.",
      icon: "ShieldCheck",
      demo: null,
      diagram: false,
      staticDiagram: false,
      diagramCaption: null,
    },
    {
      title: "Model-agnostic",
      description:
        "Bring your own keys and switch models freely — mix providers or run entirely offline. Never locked into one vendor or one price.",
      icon: "Shuffle",
      demo: null,
      diagram: false,
      staticDiagram: false,
      diagramCaption: null,
    },
  ],
  privacy: {
    heading: "Private by design",
    lead: "There are no servers to leak, because there are none. Everything the app does happens on your machine.",
    points: [
      {
        title: "No account, no cloud, no telemetry",
        body: "You never sign up and nothing syncs to a server. Your conversations, history, settings, and API keys are stored locally on your device — and you can delete any of it at any time.",
      },
      {
        title: "Run models fully offline",
        body: "Connect a local model and the app works with no internet at all. Your prompts never leave your computer, so there's no network hop for anyone to intercept.",
      },
      {
        title: "Or use Zero-Data-Retention endpoints",
        body: "Prefer a powerful hosted model? Point it at a Zero-Data-Retention (ZDR) endpoint, where the provider processes your request but doesn't log it, store it, or train on it.",
      },
      {
        title: "Private end to end",
        body: "With a local or ZDR model, no prompt data is retained by us (we have no servers) or by the provider. And because the app is open source, you can read the code and verify exactly that.",
      },
    ],
  },
  value: {
    heading: "Free, open, and pay only for what you use",
    lead: "Everything a premium AI app does — Deep Research, Model Council, and every feature you'd expect from a modern AI client — with no subscription and no paywall.",
    points: [
      {
        title: "Free and open source",
        body: "The app itself is completely free. Every feature is included; nothing is gated behind a pro tier. The full source is public, so anyone can inspect it, build on it, or contribute.",
      },
      {
        title: "You pay providers directly, per word",
        body: "Instead of a monthly fee to us, you bring your own API key and pay the model provider for exactly what you use — measured per word the model reads and writes. No markup, no middleman.",
      },
      {
        title: "Nothing when idle, a little when busy",
        body: "A month you don't open the app costs you nothing. A light month costs a few pennies. Only heavy use costs more — and you only ever pay for the words you actually generate.",
      },
      {
        title: "Usually cheaper than a subscription",
        body: "A flat subscription costs the same whether you use it once or a thousand times. Pay-per-word scales with real use, so you never pay for capacity you didn't touch — which for most people is cheaper over a year.",
      },
    ],
  },
  faq: [
    {
      question: "Is it really free?",
      answer:
        "Yes. The app is free and open source — no paid tier, no feature paywall. The only thing you pay for is model usage itself, billed directly by whichever provider you connect.",
    },
    {
      question: "Then what do I actually pay for?",
      answer:
        "Model usage. You bring your own API key and the provider charges you per word the model reads and writes. If you don't use the app, you pay nothing.",
    },
    {
      question: "How is that cheaper than a subscription?",
      answer:
        "A subscription is a fixed monthly cost no matter how much you use it. Pay-per-word scales with actual use — idle months cost nothing, light months cost pennies, and even heavy use is often less than a flat fee, because you never pay for unused capacity.",
    },
    {
      question: "Do I need an API key?",
      answer:
        "For hosted models, yes — you add your own from a provider. Or run a local model and use the app with no key and no internet at all.",
    },
    {
      question: "Is my data private?",
      answer:
        "Everything is stored locally on your device — no account, no cloud, no telemetry. With a local model nothing leaves your machine; with a hosted model, choose a Zero-Data-Retention endpoint and the provider won't store or train on your prompts.",
    },
    {
      question: "What is a Zero-Data-Retention (ZDR) model?",
      answer:
        "A hosted model whose provider processes your request but doesn't log, retain, or train on the content — the power of a large hosted model while keeping your prompts private.",
    },
    {
      question: "What is Model Council?",
      answer:
        "A mode that sends your prompt to several models at once. In discuss mode they see and refine against each other's answers, and a neutral chair model synthesizes them into one balanced response.",
    },
    {
      question: "What is Deep Research?",
      answer:
        "An agentic research mode that plans, searches, reads sources, and synthesizes a structured, referenced answer over multiple steps — rather than replying in a single turn.",
    },
    {
      question: "Which platforms are supported?",
      answer: "macOS, Windows, and Linux — it's a native desktop app.",
    },
    {
      question: "Where's the source code?",
      answer:
        "On GitHub, linked in the header and footer. Because it's open source, you can audit exactly how it handles your data.",
    },
  ],
} as const;
