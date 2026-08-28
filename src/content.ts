export const content = {
  app: {
    name: "APP_NAME_TBD",
    tagline: "One prompt. Many models. One clear answer.",
    blurb: {
      lead: "A private, local-first desktop app for chatting with AI.",
      detail:
        "Send a single prompt to several models at once, then let a neutral model read every reply and synthesize one balanced answer. Your keys and your data stay on your machine.",
    },
  },
  github: {
    owner: "tomaszrymaszewski",
    repo: "ChatUI-local",
  },
  links: {
    releases:
      "https://github.com/tomaszrymaszewski/ChatUI-local/releases/latest",
    source: "https://github.com/tomaszrymaszewski/ChatUI-local",
  },
  features: [
    {
      title: "Deep Research",
      description:
        "An agentic research loop that plans, gathers from tools, and synthesizes findings — model-agnostic, driven by a simple JSON action protocol.",
      icon: "Telescope",
    },
    {
      title: "Local & private",
      description:
        "A native desktop app. Bring your own API keys; everything runs on your machine.",
      icon: "ShieldCheck",
    },
    {
      title: "Model-agnostic",
      description: "Swap models freely. Not tied to any single provider.",
      icon: "Shuffle",
    },
  ],
} as const;
