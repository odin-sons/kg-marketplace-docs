# Random NPC Speech

**File:** `Configs/RandomNpcSpeech.yml` (a single file, created automatically on first server start)

Defines sets of idle barks an NPC cycles through while a player is nearby — ambient flavor text, separate from its actual dialogue tree.

## Example

`Configs/RandomNpcSpeech.yml`:

```yaml
guard_idle:
  RandomTexts:
    bark1:
      Text: "Keep your weapons sheathed here."
    bark2:
      Text: "Move along, traveler."
      OnlyIfLookingAtPlayer: true
  Interval: 25
  InvervalRandomOffset: 8
```

An NPC assigned the `guard_idle` speech set will periodically say one of the two lines above, roughly every 25 seconds (randomly varied by up to 8 seconds either way so multiple NPCs do not all speak in unison).

## Fields

| Field | Meaning |
|---|---|
| `RandomTexts` | A list of lines — each entry needs `Text`, and can optionally include `Animation` (plays an animation with the line) and `OnlyIfLookingAtPlayer` (only says this line if the NPC is facing the player). |
| `Interval` | Seconds between barks (default `18`). |
| `InvervalRandomOffset` | Random variation applied to the interval, plus or minus (default `4`). |

An NPC is assigned a speech set by name through its own settings — see [NPC system](../npc/npc-system.md).

## Related

- [NPC system](../npc/npc-system.md) — assigning a speech set to an NPC.
