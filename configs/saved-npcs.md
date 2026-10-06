# Saved NPCs (Hammer templates)

**Folder:** `Marketplace_SavedNPCs/` (`.yml` files — a folder next to `Marketplace/`, on the player's own computer)

Reusable NPC "stamps" — you build and configure an NPC once, save it, and can then place identical copies anywhere, or share the file with other admins. These files are created by [Marketplace Hammer](../npc/marketplace-hammer.md)'s own save feature; you normally do not hand-write them. Not to be confused with [Spawned NPCs](spawned-npcs.md) — those are player-summoned and temporary, not admin-placed.

## Workflow

1. Build and configure an NPC in-game using [Marketplace Hammer](../npc/marketplace-hammer.md).
2. Save it — this writes a file into this folder and captures a preview picture automatically.
3. Run the `mreloadnpcs` command (see [Console commands](../setup/console-commands.md)) to make the saved template available to place again.
4. Place as many copies as you like, anywhere — including on a different server, if you share the file.

## A useful trick: randomized variety

Any appearance field in a saved template — model, item, color, animation — can hold a **space-separated list** of options instead of one value. When you place a copy of the template, one option is picked at random (an even chance for each, first and last included) and stored on that NPC for good, so one saved NPC can produce visually varied instances instead of identical clones.

One catch: for the item, color and animation fields the dice are rolled only for the **first** copy placed after the game starts (or after `mreloadnpcs`) — every later copy gets the same result. Only the model/prefab field is rolled again for each copy. See [Known gaps](../reference/known-gaps.md#a-saved-npc-template-rolls-its-random-picks-only-once-per-session).

Don't confuse this with wearing *several* items in one slot (10.0.2+), which uses commas — see [Wearing several items in one slot](../npc/npc-system.md#wearing-several-items-in-one-slot). The two interact: because the random pick happens first and cuts at spaces, a group in a template must be written without spaces (`SwordIron,ShieldBlackmetal`).

## Related

- [Marketplace Hammer](../npc/marketplace-hammer.md) — the tool that creates and uses these files.
- [NPC system](../npc/npc-system.md) — full list of what an NPC's appearance and identity fields do.
