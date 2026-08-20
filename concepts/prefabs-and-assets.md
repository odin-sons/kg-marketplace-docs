# Prefabs, assets, and inline text markup

Shorthand and markup that shows up across many config formats — item names, sound/image references, and dynamic text.

## Item and creature names

Any field asking for an item, creature, or object uses the exact same name you would use with the game's own `spawn` command — the vanilla item/creature name (`Wood`, `Wolf`, `SwordIron`) or an item added by another mod. There is no restricted list — if the game or an installed mod knows the name, you can reference it.

## Model with a different animation set

`Model@AnimationSource` — makes an NPC use one model's appearance but another's movement/animations. Two useful shortcuts:

```
Player@Morgen        # use the player model, animated like Morgen
SomePrefab@humanoid   # shorthand for "use the player's animations"
```

Example, on an NPC's model field: `Haldor@humanoid` gives you Haldor's look, moving like a normal humanoid NPC instead of his usual stiff idle.

## Sound with a custom volume

Add `@number` after a sound name to set its volume (`1` = normal):

```
PlaySound, tavern_bell, 0.5
```

is equivalent to a fashion sound field written as `tavern_bell@0.5`.

## Inline image

`<image=NAME>` inserts a picture wherever it appears — in a quest name or a [Server Info](../configs/server-infos.md) page. `NAME` is the file name (without extension) of an image you dropped into the images folder — see [Custom assets](../assets/custom-assets.md).

```
Welcome to the server!
<image=banner>
Read the rules below.
```

## Teleporter travel speed

Add `<speed=N>` inside a teleport destination's name to make travel take time instead of being instant:

```
"Mountain Outpost<speed=15>", 800, 150, -400
```

Leave it out entirely for an instant teleport (the default).

## Custom values

A simple per-player number you can set and read yourself, for tracking anything you like — reputation, a story flag, a counter. There is no fixed list of custom value names; you invent the key name and use it consistently across your quests/dialogues.

- Set with `SetCustomValue, key, value` or add to it with `AddCustomValue, key, amount` (see [Commands](commands.md)).
- Check with `CustomValueMore` / `CustomValueLess` (see [Conditions](conditions.md)).
- Also usable as a quest reward: `SetCustomValue: key, value` or `AddCustomValue: key, amount`.

Example — a simple reputation counter:

```
# reward line of a quest
SetCustomValue: village_rep, 10

# condition elsewhere, gating a discount
CustomValueMore, village_rep, 50, You need more reputation with the village.
```

Players can check their own current custom values in-game with the `mcustomvalues` command (see [Console commands](../setup/console-commands.md)).

## Dynamic text (`%keyword%`)

A handful of placeholders get replaced automatically wherever greeting/farewell text or webhook messages are shown:

| Placeholder | Becomes |
|---|---|
| `%playername%` | The player's name |
| `%day%` | The current in-game day |
| `%health%` / `%maxhealth%` | Current/max health |
| `%stamina%` / `%maxstamina%` | Current/max stamina |

```
GreetText: Welcome back, %playername%! You've survived %day% days so far.
```

## Custom Spawn Data

A more structured way to attach extra values to something — see the dedicated page: [Custom Spawn Data](../configs/custom-spawn-data.md). Used from `GiveItemWithData`, `SpawnWithData`, `SpawnXYZWithData`, and `SetPlayerData` (see [Commands](commands.md)), and from `PlayerHasAllCustomDataKeys` / `PlayerHasOneOfCustomDataKeys` (see [Conditions](conditions.md)).

## Related

- [Custom assets](../assets/custom-assets.md) — the sound/image/video folders these references point to.
- [Commands](commands.md), [Conditions](conditions.md).
