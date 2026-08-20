# Buffer Profiles

**Folder:** `Configs/BufferProfiles/` (any file name, `.cfg`)

Chooses which [buffs](buffers.md) an Enchanter NPC actually offers for sale. Once you have written a profile here, put its name in a `Buffer`-type NPC's **Profile** field to make it live — see [Core identity settings](../npc/npc-system.md#core-identity-settings). It can also be reached remotely, without a nearby NPC, by listing it under `BufferProfiles` in [Distanced UI](../configs/distanced-ui.md).

## Example

`Configs/BufferProfiles/buff_shop.cfg`:

```
[buff_shop]
haste_buff, strength_buff, warmth_buff
```

An NPC set to profile `buff_shop` offers exactly these three buffs, defined in [Buffers](buffers.md).

## Important: one line per profile

Only the first data line under a `[profile]` header is used — a second line under the same header is ignored. List every buff for one profile on a single line.

## Related

- [Buffers](buffers.md) — the buff definitions this profile picks from.
- [Distanced UI](distanced-ui.md) — remote access without a nearby NPC.
