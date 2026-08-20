# Custom assets

Five folders on the player's own computer (next to `BepInEx/config/Marketplace/`, see [File structure](../setup/file-structure.md)) let you drop in your own media that configs and NPCs can then reference by file name.

| Folder | What goes here | Referenced by | Refresh command |
|---|---|---|---|
| `Marketplace_Sounds/` | `.mp3` files | File name, in `PlaySound` commands or an NPC's interact sound setting | `mreloadsounds` |
| `Marketplace_Models/` | `.obj` files | File name, as a model/prefab override | `mreloadmodels` |
| `Marketplace_CachedImages/` | `.png` files | File name, in `<image=name>` tags | `mreloadimages` |
| `Marketplace_VideoClips/` | video files | File name, in the `PlayVideo` command | loads automatically at startup |
| `Marketplace_SavedNPCs/` | `.yml` NPC templates | Appears directly in the Hammer build menu | `mreloadnpcs` |
| `Marketplace_KGChat_Emojis/` | a spritesheet image | Replaces the default chat emoji set | loads automatically at startup |

File names must be unique within a folder — subfolders are fine for organizing, but two files with the same name (in different subfolders) will conflict, and whichever loads last wins.

## Related

- [Prefabs and text markup](../concepts/prefabs-and-assets.md) — the `<image=>`, sound-volume, and model-override syntax that references these files.
- [Console commands](../setup/console-commands.md).
