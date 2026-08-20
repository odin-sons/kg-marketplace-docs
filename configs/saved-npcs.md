# Saved NPCs (Hammer templates)

**Folder:** `Marketplace_SavedNPCs/` (`.yml` files — a folder next to `Marketplace/`, on the player's own computer)

Reusable NPC "stamps" — you build and configure an NPC once, save it, and can then place identical copies anywhere, or share the file with other admins. These files are created by [Marketplace Hammer](../npc/marketplace-hammer.md)'s own save feature; you normally do not hand-write them.

## Workflow

1. Build and configure an NPC in-game using [Marketplace Hammer](../npc/marketplace-hammer.md).
2. Save it — this writes a file into this folder and captures a preview picture automatically.
3. Run the `mreloadnpcs` command (see [Console commands](../setup/console-commands.md)) to make the saved template available to place again.
4. Place as many copies as you like, anywhere — including on a different server, if you share the file.

## A useful trick: randomized variety

Any appearance field in a saved template — model, item, color, animation — can hold a **space-separated list** of options instead of one value. Every time you place a copy of the template, one option is picked at random, so one saved NPC can produce visually varied instances instead of identical clones.

## Related

- [Marketplace Hammer](../npc/marketplace-hammer.md) — the tool that creates and uses these files.
- [NPC system](../npc/npc-system.md) — full list of what an NPC's appearance and identity fields do.
