# Territories

**Folder:** `Configs/Territories/` (any file name, `.cfg`)

Territories are named zones you draw on the map with rules attached — PvP-free areas, no-build zones, healing auras, biome overrides, guild-only land, and more. A zone can be a circle, a square, or a rectangle, and zones can overlap and stack.

## A complete example, explained

`Configs/Territories/market_square.cfg`:

```
[market_square@2]
Circle
0, 0, 50
90, 160, 90, exp: 1.0
NoAttack, PeriodicHeal = 1, NoMonsters
None
```

| Line | Content | Meaning |
|---|---|---|
| header | `[market_square@2]` | Zone name, and a priority of `2` — higher-priority zones win where zones overlap. Leave off `@N` for the default priority of `1`. **Never put a space before the `@`** — unlike everywhere else in these config files, it is not stripped, and ends up baked into the zone's actual name (`market_square ` instead of `market_square`). |
| 1 | `Circle` | Shape — `Circle`, `Square`, or `Rectangle`. |
| 2 | `0, 0, 50` | Coordinates — for Circle/Square this is `x, y, radius`; for Rectangle it is `x1, y1, x2, y2` (opposite corners). |
| 3 | `90, 160, 90, exp: 1.0` | Appearance — a green tint here, with a falloff curve. See [Appearance](#appearance). |
| 4 | `NoAttack, PeriodicHeal = 1, NoMonsters` | Behavior flags — no combat, slow healing, no monster spawns. See [Flags](#flags). |
| 5 | `None` | Who is allowed in — `None` means no restriction (open to everyone). |

Unlike every other `[Section]` header in this mod, a zone name is **case-sensitive and keeps internal spaces exactly as written** — `[Market Square]`, `[market square]`, and `[MarketSquare]` are three different zones, not the same one written three ways. Pick one spelling and stay consistent, since nothing will warn you about a mismatch.

## Appearance

The appearance line is a mix of a color and a few optional extras — order does not matter, write whichever pieces you need:

```
255, 0, 0, 0, 255, 0, true, FromCenter, exp: 1.5, heightbounds: 10-40
```

This is a red-to-green gradient (two color triplets), fading from the zone's center outward, with visible water, an exponential falloff curve, and the zone's effect limited to world heights 10 through 40.

| Piece | Meaning |
|---|---|
| `r, g, b` (one or more triplets) | The zone's color. Two or more triplets create a gradient between them. |
| `true` / `false` | Whether water outside the zone edge stays visible. |
| A gradient direction name | `FromCenter`, `ToCenter`, `LeftRight`, `RightLeft`, `TopBottom`, `BottomTop`, or one of the four diagonal combinations (`TopLeftBottomRight`, etc.). |
| `exp: number` | How sharply the gradient falls off. |
| `heightbounds: min-max` | Limits the zone's effect to a height range. |

A minimal appearance line is just a color: `100, 200, 100`.

## Flags

Flags control what actually happens inside the zone. List them comma-separated; some need a value after `=`:

```
NoAttack, PeriodicHeal = 2, ForceBiome = 2, MonstersAddStars = 1
```

### Combat and building

| Flag | Value? | Effect |
|---|---|---|
| `PvpOnly` | — | Only PvP damage is allowed. |
| `PveOnly` | — | Only PvE damage is allowed. |
| `NoAttack` | — | No combat at all. |
| `NoMonsters` | — | Monsters will not spawn. |
| `MonstersAddStars` | number | Monsters spawn with extra star levels. |
| `NoBuild` | — | Building is disabled. |
| `NoBuildDamage` | — | Buildings inside cannot take damage. |
| `NoStructureSupport` | — | Structural support requirements are ignored. |
| `NoPickaxe` | — | Pickaxes cannot be used. |
| `PushAway` | — | Pushes players who try to enter out again. |

### Interaction restrictions

| Flag | Effect |
|---|---|
| `NoInteract` | Blocks all interaction. |
| `NoInteractItems` | Blocks interacting with dropped items. |
| `NoInteractCraftingStation` | Blocks crafting stations. |
| `NoInteractItemStands` | Blocks item stands. |
| `NoInteractChests` | Blocks chests. |
| `NoInteractDoors` | Blocks doors. |
| `NoInteractPortals` | Blocks portals. |
| `NoPortals` | Portals do not function at all inside the zone. |

### Player and environment effects

| Flag | Value? | Effect |
|---|---|---|
| `PeriodicHeal` | number | Heals players over time. |
| `PeriodicHealALL` | number | Same, but heals even at full health (useful with regen-boosting mods). |
| `PeriodicDamage` | number | Damages players over time. |
| `IncreasedPlayerDamage` | number | Multiplies damage players deal. |
| `IncreasedMonsterDamage` | number | Multiplies damage monsters deal. |
| `MoveSpeedMultiplier` | number | Changes movement speed. |
| `NoDeathPenalty` | — | No skill/item loss on death. |
| `InfiniteFuel` | — | Fires/torches never run out of fuel. |
| `CustomEnvironment` | weather name(s) | Forces specific weather. |
| `ForceBiome` | biome number | Makes the zone act like a different biome. |
| `ForceGroundHeight` / `AddGroundHeight` / `LimitZoneHeight` | number | Adjusts terrain height within the zone (only one of these three takes effect if more than one is present). |
| `CustomPaint` | `0`-`3` | Paints the ground: `0` = Paved, `1` = Grass, `2` = Cultivated, `3` = Dirt. |

### Extra flags (a second set, same syntax)

| Flag | Value? | Effect |
|---|---|---|
| `NoItemLoss` | — | No item loss on death. |
| `SnowMask` | — | Removes snow buildup visuals. |
| `NoMist` | — | Removes fog/mist. |
| `InfiniteEitr` | — | Eitr never depletes. |
| `InfiniteStamina` | — | Stamina never depletes. |
| `DropMultiplier` | number | Multiplies loot drops. |
| `ForceWind` | number | Sets a fixed wind strength. |
| `GodMode` | — | Players are invincible. |
| `OnlyForGuild` | guild name | Only members of that guild may enter. |
| `OnlyForFaction` | faction key | Only members of that faction may enter. |
| `JoinOtherServer` | connection info | Sends players who enter to a different server. |
| `RevealOnMap` | — | Reveals this area on the map automatically. |
| `CustomJereSpawner` | spawner name | Attaches a named custom spawner (repeat the flag to add more than one). |

## Who is allowed in

The last line — a comma list of allowed players or roles, or `None` for open access.

## Scheduling a zone to specific hours

Territories can be limited to a real-clock time window using a folder naming trick — see [Scheduling a config to a time window](../concepts/time-windows.md).

## A second, overlapping example

`Configs/Territories/market_vip_lounge.cfg`:

```
[market_vip_lounge@5]
Square
20, 20, 15
255, 215, 0
PeriodicHealALL = 3, MonstersAddStars = 0
OnlyForGuild = MarketGuild
```

Priority `5` beats the `market_square` example above wherever they overlap — inside this smaller square, only `MarketGuild` members may enter, and healing is stronger.

## Related

- [Scheduling a config to a time window](../concepts/time-windows.md).
- [Territory setup guide](../guides/territory-setup.md) — a full worked example combining several zones.
