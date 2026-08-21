# Installation

The mod needs to be installed on **every client and on the dedicated server** (or the hosting client, if you are hosting from within the game).

## Option 1: Hexium (Gale)

1. Open the mod's page: [valheim.hexium.gg/mods/KG/Marketplace_And_Server_NPCs_Revamped](https://valheim.hexium.gg/mods/KG/Marketplace_And_Server_NPCs_Revamped).
2. Click **Install with Gale** — this opens the [Gale mod manager](https://hexium.gg/mod-manager) and adds the mod to your profile automatically. If Gale is not installed yet, the page will prompt you to get it first.
3. Repeat on every client and on the server machine.

## Option 2: Manual install

Download the mod file from [Hexium](https://valheim.hexium.gg/mods/KG/Marketplace_And_Server_NPCs_Revamped) and extract it into your `BepInEx/plugins/` folder, the same way as any other BepInEx mod. Requires [BepInEx](https://valheim.hexium.gg/mods/denikson/BepInExPack_Valheim) to already be installed.

## Server, client, or singleplayer

The mod figures out its own role automatically:

- **Server** — a dedicated server, or a client that is also hosting. Reads and applies everything in `Configs/`.
- **Client** — a normal connecting player. Gets everything from the server automatically.
- **Both** — singleplayer, with local mode turned on in [Client config](client-config.md). The game builds and reads its own local copy of the server folders, letting you build and test content offline.

In singleplayer, most modules work fine: Buffer, Distanced UI, Gambler, Dialogues, Trader, Quests, Territories, Teleporters, Transmog, Server Info, Player Tags, Chat. **Not available in singleplayer**: Banker, the player-to-player Marketplace, and Leaderboard — these save their data to the server and have no local equivalent.

## First run

Start the server once after installing. On first run, it creates a `Marketplace` folder under `BepInEx/config/` and fills in the subfolders you will be editing — see [File structure](file-structure.md) for a full map of what gets created and where.

## Updating an existing server

Most updates are a plain drop-in with nothing else to do. A few past versions changed something that needed manual action first — see [Migrations](../reference/migrations.md) to check whether the version jump you are making is one of them.
