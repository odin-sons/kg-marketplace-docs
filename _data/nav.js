export default [
  {
    title: "Getting started",
    subtitle: "install, files & first settings",
    items: [
      { title: "Installation", href: "/setup/installation/" },
      { title: "File structure", href: "/setup/file-structure/" },
      {
        title: "Server config",
        href: "/setup/server-config/",
        children: [
          { title: "Mail", href: "/setup/server-config/#mail" },
          { title: "Feedback", href: "/setup/server-config/#feedback" },
        ],
      },
      {
        title: "Client config",
        href: "/setup/client-config/",
        children: [{ title: "Chat", href: "/setup/client-config/#kg-chat" }],
      },
    ],
  },
  {
    title: "Content creation",
    subtitle: "syntax, profiles, conditions & commands",
    items: [
      { title: "Content creation", href: "/concepts/content-creation/" },
      {
        title: "Config file syntax",
        href: "/concepts/config-syntax/",
        children: [{ title: "Hot reload", href: "/setup/hot-reload/" }],
      },
      { title: "Profiles", href: "/concepts/profiles/" },
      { title: "Conditions", href: "/concepts/conditions/" },
      { title: "Commands", href: "/concepts/commands/" },
      {
        title: "Prefabs and text markup",
        href: "/concepts/prefabs-and-assets/",
        children: [{ title: "Custom assets", href: "/assets/custom-assets/" }],
      },
      { title: "Scheduled configs", href: "/concepts/time-windows/" },
    ],
  },
  {
    title: "Core",
    subtitle: "NPCs, quests, dialogue & factions",
    items: [
      {
        title: "NPC system",
        href: "/npc/npc-system/",
        children: [
          { title: "Marketplace Hammer", href: "/npc/marketplace-hammer/" },
          { title: "Saved NPCs", href: "/configs/saved-npcs/" },
          { title: "Random NPC Speech", href: "/configs/random-npc-speech/" },
        ],
      },
      {
        title: "Quests",
        href: "/configs/quests/",
        children: [
          { title: "Quest Profiles", href: "/configs/quest-profiles/" },
          { title: "Quest Events", href: "/configs/quest-events/" },
        ],
      },
      {
        title: "Dialogues",
        href: "/configs/dialogues/",
        children: [{ title: "Custom Spawn Data", href: "/configs/custom-spawn-data/" }],
      },
      { title: "Factions", href: "/configs/factions/" },
    ],
  },
  {
    title: "Economy",
    subtitle: "shops, currency & rewards",
    items: [
      { title: "Traders", href: "/configs/traders/" },
      { title: "Bankers", href: "/configs/bankers/" },
      { title: "Gamblers", href: "/configs/gamblers/" },
      {
        title: "Buffers",
        href: "/configs/buffers/",
        children: [{ title: "Buffer Profiles", href: "/configs/buffer-profiles/" }],
      },
      { title: "Transmogrification", href: "/configs/transmogrification/" },
    ],
  },
  {
    title: "World",
    subtitle: "zones, travel & server info",
    items: [
      { title: "Server Info", href: "/configs/server-infos/" },
      { title: "Teleporters", href: "/configs/teleporters/" },
      { title: "Territories", href: "/configs/territories/" },
    ],
  },
  {
    title: "Server utilities & extras",
    subtitle: "tags, webhooks, commands & more",
    items: [
      { title: "Player Tags", href: "/configs/player-tags/" },
      {
        title: "Synced Localizer",
        href: "/configs/synced-localizer/",
        children: [{ title: "Localization keys", href: "/reference/localization-keys/" }],
      },
      { title: "Console commands", href: "/setup/console-commands/" },
      { title: "Distanced UI", href: "/configs/distanced-ui/" },
      { title: "Discord Webhooks", href: "/configs/discord-webhooks/" },
      { title: "Leaderboard Achievements", href: "/configs/leaderboard-achievements/" },
    ],
  },
  {
    title: "Guides",
    subtitle: "walkthroughs & video tutorials",
    items: [
      { title: "Your first quest", href: "/guides/first-quest/" },
      { title: "Quest chains", href: "/guides/quest-chain/" },
      { title: "A branching dialogue tree", href: "/guides/dialogue-tree/" },
      { title: "Dialogue patterns", href: "/guides/dialogue-patterns/" },
      { title: "Tracking player state", href: "/guides/tracking-player-state/" },
      { title: "Shops, currency, and taxes", href: "/guides/shop-and-economy/" },
      { title: "Setting up a territory", href: "/guides/territory-setup/" },
      { title: "Video guides", href: "/guides/video-guides/" },
    ],
  },
  {
    title: "Tooling",
    subtitle: "third-party editors & tools",
    items: [
      { title: "VS Code extensions", href: "/tooling/vscode-extension/" },
      { title: "Coming soon", href: "/tooling/coming-soon/" },
    ],
  },
  {
    title: "For mod developers",
    subtitle: "what other mods can access",
    items: [{ title: "Integrating with this mod", href: "/api/modder-api/" }],
  },
  {
    title: "Reference",
    subtitle: "changelog, migrations & known gaps",
    items: [
      { title: "Changelog", href: "/reference/changelog/" },
      { title: "Migrations", href: "/reference/migrations/" },
      { title: "Known gaps", href: "/reference/known-gaps/" },
    ],
  },
];
