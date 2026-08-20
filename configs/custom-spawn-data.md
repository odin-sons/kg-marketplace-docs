# Custom Spawn Data

**Folder:** `Configs/CustomSpawnData/` (`.yml` files)

Custom Spawn Data lets you attach a named set of extra values to something you spawn or give a player — useful for stamping custom data onto an item (for compatibility with other item mods), or for tracking a condition on the player themselves.

Referenced by name from:
- The `GiveItemWithData`, `SpawnWithData`, `SpawnXYZWithData`, and `SetPlayerData` [commands](../concepts/commands.md).
- The `PlayerHasAllCustomDataKeys` / `PlayerHasOneOfCustomDataKeys` [conditions](../concepts/conditions.md).

## Example

`Configs/CustomSpawnData/blessed_sword.yml`:

```yaml
Ints:
  crafterID: 12345
Floats:
  bonusDamage: 25.0
Strings:
  loreText: "Forged in the ashes of the Bonemass"
```

Used from a dialogue reply:

```
Text: Take the blessed sword | Command: GiveItemWithData, SwordIron, 1, 3, blessed_sword
```

## Format

**One file = one named data set.** The file name (without `.yml`) is the name you reference elsewhere — `blessed_sword.yml` is referenced as `blessed_sword`.

Inside the file, group your values by type — all five groups are optional, include only what you need:

```yaml
Ints:
  someKey: 5
Floats:
  someKey: 1.5
Longs:
  someKey: 100000
Strings:
  someKey: "hello"
Bools:
  someKey: true
```

The key names (`someKey` above) are entirely up to you — invent whatever makes sense for what you are tagging.

## Practical notes

- If one file has a formatting mistake, it can block every other Custom Spawn Data set from updating until it is fixed — double-check indentation and quoting carefully in this format, since small YAML mistakes are easy to make.
- There is no built-in meaning to any of these values — they only matter if something reads them back. `PlayerHasAllCustomDataKeys` reads them back against the player, and other item mods may read matching values off an item if you use the same key names they expect.

## Related

- [Commands](../concepts/commands.md), [Conditions](../concepts/conditions.md).
- [Dialogues](dialogues.md).
- [Tracking player state](../guides/tracking-player-state.md) — worked examples using `SetPlayerData` and `PlayerHasAllCustomDataKeys` together, for puzzles and remembered choices.
