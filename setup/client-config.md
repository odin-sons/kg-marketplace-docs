# Client config

`BepInEx/config/MarketplaceAndServerNPCs.cfg` — the standard per-player settings file, set individually by each player (or by whoever is hosting). This is separate from [Server config](server-config.md) and is never shared between players.

Unlike most of this documentation, this page isn't admin-only — anyone playing on a server using this mod can edit their own copy of this file to change their own keybinds, chat window, and UI, with no server access needed.

## `[General]`

| Setting | Default | What it controls |
|---|---|---|
| `Use Marketplace Locally` | `false` | Turns on singleplayer/local mode — see [Server, client, or singleplayer](installation.md#server-client-or-singleplayer). |
| `Quest Journal Keycode` | `J` | The key that opens/closes the quest journal. |
| `Show Quest Mark` | — | Toggles quest target markers on the map/compass — can also be flipped in-game with the `mquestmarker` command. |
| `DisableMapNPCControl` | — | Turns off the NPC map-control overlay. |
| `Mute Gambler Sounds` | `false` | Mutes gambling roll sound effects. |

## `[Marketplace]`

| Setting | Default | What it controls |
|---|---|---|
| `Market Size` | `Large` | The size of the marketplace window (`Large`, `Medium`, `Small`). |

## `[Territories]`

| Setting | What it controls |
|---|---|
| `Use Map Draw` | Enables map-based zone drawing tools. |
| `Always Show Zone Visualizer` | Keeps zone outlines visible at all times, instead of only when toggled on. |

## `[KG Chat]`

| Setting | Default | What it controls |
|---|---|---|
| `Font Size` | `18` | Chat text size. |
| `Use Type Sound` | `false` | Plays a typing sound as chat messages appear. |
| `Hide Floating Text` | — | Hides floating chat bubbles above characters. |
| `Chat Filter` | — | Word filter setting. |
| `Transparency` | `Two` | Chat window background transparency. |
| `UI_sizeX` / `UI_sizeY` | — | Chat window size. |
| `UI_posX` / `UI_posY` | — | Chat window position. |

## `[Database]`

| Setting | What it controls |
|---|---|
| `Database File Path` | Where the server stores its save data — only matters if you are the server host, has no effect for a regular player. |

## Related

- [Server config](server-config.md) — the separate, server-wide settings file.
- [File structure](file-structure.md), [Server, client, or singleplayer](installation.md#server-client-or-singleplayer).
