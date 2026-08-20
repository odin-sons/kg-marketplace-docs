# Hot reload

Most config changes apply live, without restarting the server — save the file, and within a moment your NPCs, quests, and zones update for everyone on the server.

## What reloads automatically

Almost everything under `Configs/`, plus `MarketPlace.cfg`, `DistancedUI.cfg`, `PlayerTags.cfg`, and `DiscordSettings.cfg` — edit any of these while the server is running, save, and the change is picked up on its own. The server re-reads the entire relevant folder each time (not just the one file you touched), so if you have several files contributing to one profile, they will all stay in sync.

## What does NOT reload automatically

A few things need a manual nudge — use the matching console command from [Console commands](console-commands.md):

| What | How to refresh it |
|---|---|
| [Saved NPCs](../configs/saved-npcs.md) | `mreloadnpcs` |
| Sounds folder | `mreloadsounds` |
| Models folder | `mreloadmodels` |
| Images folder | `mreloadimages` |

Also worth knowing: your own per-player settings (the client config file — see [Client config](client-config.md)) are local to each player and are never synced between players; there is nothing to "reload" there.

## If a change is not showing up

- Check the server console — most typos and formatting mistakes are logged there, in red, with the file name and line.
- Confirm you edited the file the running server is actually using — double check you are editing the live `BepInEx/config/Marketplace/` folder and not a backup or a copy from an old install.
- For the manual-reload items above, remember to run the matching command after editing.

## Related

- [Console commands](console-commands.md) — the manual reload commands.
- [Config file syntax](../concepts/config-syntax.md) — how to spot a formatting mistake.
