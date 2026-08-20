# Guide: setting up a territory

A worked example: a PvP-free market zone, a guild-only VIP area layered on top of it, and an evening-only bonus zone.

## Step 1: a base zone

`Configs/Territories/market.cfg`:

```
[market_square@1]
Circle
0, 0, 60
90, 160, 90, exp: 1.0
NoAttack, PeriodicHeal = 1, NoMonsters
None
```

A 60-radius circle at the world center, tinted green, with no combat, no monster spawns, and slow passive healing. Priority `1` — the baseline layer everything else stacks on top of.

## Step 2: a smaller zone on top

`Configs/Territories/market_vip.cfg`:

```
[market_vip_lounge@5]
Square
20, 20, 15
255, 215, 0
PeriodicHealALL = 3, MonstersAddStars = 0
OnlyForGuild = MarketGuild
```

Priority `5` beats priority `1` — wherever this smaller square overlaps the market zone above, its rules take over instead: stronger healing, and only `MarketGuild` members may enter. See [Territories](../configs/territories.md#flags) for the full flag list.

## Step 3: an evening-only bonus zone

Put a time-scheduled zone in a specially-named folder — see [Scheduling a config to a time window](../concepts/time-windows.md):

`Configs/Territories/18-00_23-00/happy_hour.cfg`:

```
[happy_hour_bonus@3]
Circle
0, 0, 60
255, 255, 150
PeriodicHealALL = 5
None
```

This zone only exists between 18:00 and 23:00 server time — before and after, it is as though this file does not exist. Because its priority (`3`) sits between the base zone (`1`) and the VIP lounge (`5`), during those hours it boosts healing everywhere in the base zone except inside the VIP lounge, where the lounge's own rules still win.

## Checking your work in-game

Turn on zone outlines with the `zonevisualizer` console command (needs admin access) to see the boundaries you just drew directly in the world — much easier than guessing from coordinates alone. Adjust how visible the outlines are with `zonevisualizeralpha`. See [Console commands](../setup/console-commands.md).

## Related

- [Territories](../configs/territories.md) — the full flag reference.
- [Scheduling a config to a time window](../concepts/time-windows.md).
