# Custom assets

Folders on the player's own computer (next to `BepInEx/config/Marketplace/`, see [File structure](../setup/file-structure.md)) let you drop in your own media that configs and NPCs can then reference by file name. Since 10.0.7 the images, sounds, videos and models can instead live only on the server and are downloaded by players on connect — see [Automatic file sync](#automatic-file-sync).

| Folder | What goes here | Referenced by | Refresh command |
|---|---|---|---|
| `Marketplace_Sounds/` | `.mp3` files | File name, in `PlaySound` commands, an NPC's interact sound setting, or a territory's [`ZoneMusic`](../configs/territories.md) flag | `mreloadsounds` |
| `Marketplace_Models/` | `.obj` files | File name, as a model/prefab override | `mreloadmodels` |
| `Marketplace_CachedImages/` | `.png` files | File name, in `<image=name>` tags | `mreloadimages` |
| `Marketplace_VideoClips/` | video files | File name, in the `PlayVideo` command | loads automatically at startup |
| `Marketplace_SavedNPCs/` | `.yml` NPC templates | Appears directly in the Hammer build menu | `mreloadnpcs` |
| `Marketplace_KGChat_Emojis/` | a spritesheet image | Replaces the default chat emoji set | loads automatically at startup |

File names must be unique within a folder — subfolders are fine for organizing, but two files with the same name (in different subfolders) will conflict, and whichever loads last wins.

## Automatic file sync

Since 10.0.7 players no longer need a resource pack for your custom content. Put the files in the same folders on the **server** (`BepInEx/config/Marketplace_Sounds/` and so on, next to `Marketplace/` — the mod now creates them there too), and every player who connects downloads what they are missing.

- **What syncs:** `Marketplace_CachedImages/` (images), `Marketplace_Sounds/` (sounds), `Marketplace_VideoClips/` (videos) and `Marketplace_Models/` (models), including subfolders. Saved NPC templates and the chat emoji sheet are not synced.
- **Only what changed:** files are compared by hash against the server's copy, so a repeat connection only fetches new or edited files.
- **Progress window:** while files download the player sees a small window with the current file and the overall count (X/Y files). The folders reload by themselves when it finishes — no `mreload…` command needed.
- **Safe on a dropped connection:** each file is written to a temporary name and swapped in when complete, so an interrupted download never leaves a broken asset behind.
- **Speed:** by default files travel through the normal Steam connection, which works everywhere but is slow for large videos. Set [`CustomFileSyncPort`](../setup/server-config.md#file-sync) to an open, forwarded TCP port on the server for a direct transfer.
- **Turn it off:** [`UseAutomaticFileSync`](../setup/server-config.md#file-sync) is on by default; set it to `false` to go back to distributing the files yourself.

## Related

- [Prefabs and text markup](../concepts/prefabs-and-assets.md) — the `<image=>`, sound-volume, and model-override syntax that references these files.
- [Console commands](../setup/console-commands.md).
