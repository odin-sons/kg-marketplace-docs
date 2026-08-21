# Console commands

Type these into the in-game console (usually the F5 key). Most require admin access — a Steam ID listed in `OverrideDebug` (see [Server config](server-config.md)) — but not all: anything marked "no" in the table below works for any player, admin or not.

| Command | Arguments | Needs admin access? | What it does |
|---|---|---|---|
| `mreloadsounds` | — | no | Reloads the sounds folder. |
| `mreloadmodels` | — | no | Reloads the models folder. |
| `mreloadimages` | — | no | Reloads the images folder. |
| `mreloadnpcs` | — | no | Reloads [Saved NPC](../configs/saved-npcs.md) templates into the build menu. |
| `mnpcremove` | — | yes | Deletes every mod NPC within 5 meters of you — handy for quickly clearing out a test area. |
| `idm` | — | yes | Shows the currently held weapon's extra data — a debugging aid for item mods. |
| `mpos` | — | no | Prints your current position, useful for filling in exact coordinates in a config. |
| `mfpslimit` | fps | yes | Sets the game's update rate (50-144). |
| `zonevisualizer` | — | yes | Toggles zone outlines on/off in the world, so you can see your [Territories](../configs/territories.md) while editing. |
| `zonevisualizeralpha` | [amount] | set: yes, view: no | Reads or sets how visible the zone outlines are (25-255). |
| `mquestmarker` | — | no | Toggles quest target markers on/off, remembered for next time. |
| `mresetcustomvalues` | — | yes | Clears all of your own [custom values](../concepts/prefabs-and-assets.md#custom-values). |
| `mcustomvalues` | — | no | Prints your own current custom values — useful for checking a reputation/story-flag system while testing. |
| `mclearallquests` | player name | yes | Clears every quest for a named player. |
| `mclearquest` | player name, quest ID | yes | Clears one specific quest for a named player. |
| `maddterritory` | shape, x, z, radius, r, g, b, price | yes | Adds a territory on the fly for quick testing — not the normal way to build zones, use [Territories](../configs/territories.md) files for anything permanent. |
| `mshownpcpath` | — | — | Shows an NPC's patrol path in the world. |
| `mshowhumanoids` | — | — | Lists creature models you can use with the humanoid animation trick — see [Prefabs and text markup](../concepts/prefabs-and-assets.md#model-with-a-different-animation-set). |
| `mmapcontrol` | — | — | Toggles NPC map-control mode. |
| `chatfilter` | word | — | Adds/removes a word from the chat filter. |
| `f` | message | no | Sends a message in faction chat. |

## Related

- [Hot reload](hot-reload.md) — for the manual-reload commands above.
- [Marketplace Hammer](../npc/marketplace-hammer.md) — placing NPCs with admin access.
