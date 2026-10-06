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

The chat window has its own modes, switched by typing a command into the chat box: `/say`, `/shout`, `/whisper` and `/faction` always; `/group` (or `/party`) when a groups mod is installed; and, since 10.0.3, `/guild` when blaxxun's Guilds mod is installed.

## `[DragUI]`

Since 10.0.3 you can move most of this mod's windows around the screen. With a window open and your mouse cursor free, hold **Left Ctrl + Left Alt** — each draggable window gets a dimmed, framed overlay. Drag it with the left mouse button; **right-click the overlay to put the window back** in its default spot. A window can't be dragged off-screen, and the new position is saved the moment you let go. A short demo is on [Streamable](https://streamable.com/nc56xp).

<p class="video-embed"><iframe src="https://streamable.com/e/nc56xp" title="Dragging the mod's windows with Left Ctrl + Left Alt" loading="lazy" allowfullscreen></iframe></p>

It applies to the Marketplace, Trader, Banker, Gambler, Buffer, Transmogrification, Quest, Dialogue, Server Info, Leaderboard, Feedback and Distanced UI windows and the NPC settings panel. Each one is stored in this file as a pair of `…_DragUI_posX` / `…_DragUI_posY` entries — delete the pair to reset that window by hand. (The chat window keeps its own `UI_posX` / `UI_posY` above.)

## `[Database]`

| Setting | What it controls |
|---|---|
| `Database File Path` | Where the server stores its save data — only matters if you are the server host, has no effect for a regular player. |

## Related

- [Server config](server-config.md) — the separate, server-wide settings file.
- [File structure](file-structure.md), [Server, client, or singleplayer](installation.md#server-client-or-singleplayer).
