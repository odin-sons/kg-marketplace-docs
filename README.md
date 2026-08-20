# Marketplace and Server NPCs (Revamped) — admin documentation

![Marketplace banner](https://i.imgur.com/CkSehPu.png)

**Marketplace and Server NPCs (Revamped)** adds server-configurable NPCs and mechanics to Valheim — a player-to-player marketplace, shops, quests, dialogue trees, zones, banking, gambling, transmog, and more. Admins configure everything themselves by editing text files, and changes apply live — no server restart needed, see [Hot reload](setup/hot-reload.md).

This documentation covers mod version **9.8.8**, is written for **server admins**, and leads with practical examples rather than bare reference tables — most pages open with a working example you can copy and adapt.

## Installation

The mod needs to be installed on **every client and on the dedicated server** (or the hosting client, if you are hosting from within the game). Pick whichever method matches how you already manage mods:

### Option 1: Hexium (Gale)

1. Open the mod's page: [valheim.hexium.gg/mods/KG/Marketplace_And_Server_NPCs_Revamped](https://valheim.hexium.gg/mods/KG/Marketplace_And_Server_NPCs_Revamped).
2. Click **Install with Gale** — this opens the [Gale mod manager](https://hexium.gg/mod-manager) and adds the mod to your profile automatically. If Gale is not installed yet, the page will prompt you to get it first.
3. Repeat on every client and on the server machine.

### Option 2: Thunderstore Mod Manager / r2modman

1. Open the mod's Thunderstore page: [thunderstore.io/c/valheim/p/KGvalheim/Marketplace_And_Server_NPCs_Revamped](https://thunderstore.io/c/valheim/p/KGvalheim/Marketplace_And_Server_NPCs_Revamped/).
2. Click **Install** to add it to your active profile in the Thunderstore Mod Manager (r2modman's successor) — get the manager itself at [get.thunderstore.io](https://get.thunderstore.io/) if you do not have it yet.
3. Repeat on every client and on the server machine.

### Option 3: Manual install

Download the mod file from [Hexium](https://valheim.hexium.gg/mods/KG/Marketplace_And_Server_NPCs_Revamped) or [Thunderstore](https://thunderstore.io/c/valheim/p/KGvalheim/Marketplace_And_Server_NPCs_Revamped/) and extract it into your `BepInEx/plugins/` folder, the same way as any other BepInEx mod. Requires [BepInEx](https://valheim.hexium.gg/mods/denikson/BepInExPack_Valheim) to already be installed.

### First run

Start the server once after installing. On first run, it creates a `Marketplace` folder under `BepInEx/config/` and fills in the subfolders you will be editing — see [File structure](setup/file-structure.md) for a full map of what gets created and where.

### Updating an existing server

Most updates are a plain drop-in with nothing else to do. A few past versions changed something that needed manual action first — see [Migrations](reference/migrations.md) to check whether the version jump you are making is one of them.

## How content creation works

There is no in-game editor for quests, dialogues, zones, and so on. You create content by editing plain text files in a `Configs/` folder, one subfolder per feature. The mod watches those folders and picks up changes automatically.

NPCs themselves are placed directly in the world, using a build-mode tool (**Marketplace Hammer**) available to players with admin access. When you place an NPC, you give it a **type** (which mechanic it uses) and a **profile** (which config entries it uses) right there in its settings panel.

## Key features

### Core: NPCs, quests, dialogue & factions

- **[NPC system](npc/npc-system.md)** — placeable NPCs: type, appearance, dialogue, map pin, patrol. Placed with the [Marketplace Hammer](npc/marketplace-hammer.md) build tool. Reusable setups: [Saved NPCs](configs/saved-npcs.md). Idle chatter: [Random NPC Speech](configs/random-npc-speech.md).
- **[Quests](configs/quests.md)** — the full quest system, 10 quest types. Assigning quests to an NPC: [Quest Profiles](configs/quest-profiles.md). Scripting what happens on accept/complete/cancel: [Quest Events](configs/quest-events.md). Walkthroughs: [Your first quest](guides/first-quest.md), [Quest chains](guides/quest-chain.md).
- **[Dialogues](configs/dialogues.md)** — branching NPC conversations, with conditions and scripted actions. Attaching extra data to something a dialogue spawns: [Custom Spawn Data](configs/custom-spawn-data.md). Walkthroughs: [A branching dialogue tree](guides/dialogue-tree.md), [Dialogue patterns](guides/dialogue-patterns.md), [Tracking player state](guides/tracking-player-state.md).
- **[Factions](configs/factions.md)** — player factions with shared perks, restricted items, and friendly monsters, joined and checked through the same [Dialogues](configs/dialogues.md)/[Quests](configs/quests.md) commands and conditions above.

### Economy: shops, currency & rewards

- **[Marketplace](setup/server-config.md)** — the player-to-player auction house. Works immediately with no setup; tax and listing-limit settings live in the server config.
- **[Traders](configs/traders.md)** — an NPC shop with a fixed buy/sell list.
- **[Bankers](configs/bankers.md)** — deposit and withdraw currency, with periodic interest.
- **[Gamblers](configs/gamblers.md)** — spend an item, get a randomized reward.
- **[Buffers](configs/buffers.md)** — an Enchanter NPC that sells temporary buffs. Choosing which buffs an NPC offers: [Buffer Profiles](configs/buffer-profiles.md).
- **[Transmogrification](configs/transmogrification.md)** — change how an item looks without changing its stats.

Walkthrough tying these together: [Shops, currency, and taxes](guides/shop-and-economy.md).

### World: zones, travel & server info

- **[Territories](configs/territories.md)** — named zones with behavior flags: PvP rules, healing auras, biome overrides, and more.
- **[Teleporters](configs/teleporters.md)** — a fast-travel hub NPC.
- **[Server Info](configs/server-infos.md)** — rules and announcement boards.

Walkthrough: [Setting up a territory](guides/territory-setup.md).

### Server utilities & extras

- **[Player Tags](configs/player-tags.md)** — name-tag prefixes per player, like `[Admin]` or `[VIP]`.
- **[Synced Localizer](configs/synced-localizer.md)** — server-wide text overrides, sent to every player automatically.

#### UI panels

- **[Mail](setup/server-config.md)** — send items and messages between players. Works immediately; mailbox recipe and timing live in the server config.
- **[Feedback](setup/server-config.md)** — a feedback form that posts to a Discord webhook. Works immediately; the webhook link lives in the server config.
- **[Leaderboard Achievements](configs/leaderboard-achievements.md)** — server-wide leaderboards and achievements.
- **[Distanced UI](configs/distanced-ui.md)** — open shop/quest/mail menus without a nearby NPC.
- **[Chat](setup/client-config.md)** — a replacement chat window. Client-side settings only.

### How to read a config page

Most config pages above follow the same shape:

1. A working example, explained piece by piece.
2. A table of every option/value you can use.
3. Anything that behaves in a way you might not expect.
4. Links to related pages.

Every config example is written with generous spacing (`Key: Value | Key2: Value2` rather than `Key:Value|Key2:Value2`) — spaces around punctuation are always safe to use in your own files and make them much easier to read later.

## Writing config files

A handful of pages cover the syntax and vocabulary shared across many config types — read these once and the rest make a lot more sense:

- [Config file syntax](concepts/config-syntax.md) — comments, sections, separators, and the general shape every config file follows.
- [Profiles](concepts/profiles.md) — how content gets grouped and assigned to an NPC.
- [Conditions](concepts/conditions.md) — the shared requirement language (`HasItem`, `QuestFinished`, and the rest).
- [Commands](concepts/commands.md) — the shared action language (`GiveItem`, `Teleport`, and the rest).
- [Prefabs and text markup](concepts/prefabs-and-assets.md) — referencing items, sounds, images, and dynamic text.
- [Scheduling a config to a time window](concepts/time-windows.md) — limiting a Territory or Trader to specific hours.

## Server administration

- [File structure](setup/file-structure.md) — a map of every folder and file the mod creates.
- [Hot reload](setup/hot-reload.md) — what applies live and what needs a manual refresh.
- [Server config](setup/server-config.md) — the main settings file, every option.
- [Client config](setup/client-config.md) — per-player settings.
- [Console commands](setup/console-commands.md) — admin and debug commands.
- [Discord Webhooks](configs/discord-webhooks.md) — posting server events to a Discord channel.
- [Custom assets](assets/custom-assets.md) — the folders you drop your own sounds, images, models, and video into.

## Tooling

- [Related tooling](tooling/related-tools.md) — editor extensions and other third-party tools.

## For mod developers

- [Integrating with this mod](api/modder-api.md) — what other mods can read and change.

## Reference

- [Localization keys](reference/localization-keys.md)
- [Changelog](reference/changelog.md)
- [Migrations](reference/migrations.md) — what to do when updating across a version with a breaking change
- [Known gaps](reference/known-gaps.md) — current-version quirks and things that look like they should work but do not

## Server, client, or singleplayer

The mod figures out its own role automatically:

- **Server** — a dedicated server, or a client that is also hosting. Reads and applies everything in `Configs/`.
- **Client** — a normal connecting player. Gets everything from the server automatically.
- **Both** — singleplayer, with local mode turned on in [Client config](setup/client-config.md). The game builds and reads its own local copy of the server folders, letting you build and test content offline.

In singleplayer, most modules work fine: Buffer, Distanced UI, Gambler, Dialogues, Trader, Quests, Territories, Teleporters, Transmog, Server Info, Player Tags, Chat. **Not available in singleplayer**: Banker, the player-to-player Marketplace, and Leaderboard — these save their data to the server and have no local equivalent.

## What it looks like

| | |
|---|---|
| ![Marketplace sell panel](https://i.imgur.com/JGXAFxx.png) | ![Marketplace buy panel](https://i.imgur.com/Rm0005s.png) |

More screenshots for a specific module live on that module's own page — see **Key features** above.

## Video guides

- [Mod review by Ruijven](https://youtu.be/zolOZ-rcrGQ) — a walkthrough of what the mod can do
- Tutorial series by Stonedprophet: [part one](https://youtu.be/5fR_9Qygkro) · [part two](https://youtu.be/BthPUGOeaeA) · [part three](https://youtu.be/hUU_bPCwFeE) · [part four](https://youtu.be/ZgoeYVpEcI4) · [part five](https://youtu.be/xdj2CccUYhk) · [part six — Dialogues](https://youtu.be/0COuBKO3Gpg)

## Support the author

If this documentation or the mod itself saved you time, consider supporting KG, the mod's author:

- **Discord:** [discord.gg/QgvSmhkbmy](https://discord.gg/QgvSmhkbmy) — questions, comments, community help
- **Donate:** PayPal — `war3spells@gmail.com`
