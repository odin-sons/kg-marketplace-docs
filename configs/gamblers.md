# Gamblers

**Folder:** `Configs/Gamblers/` (any file name, `.cfg`)

Sets up a gambling NPC's roll table — spend a required item, receive one random item from a prize pool. Once you have written a profile here, put its name in a `Gambler`-type NPC's **Profile** field to make it live — see [Core identity settings](../npc/npc-system.md#core-identity-settings). It can also be reached remotely, without a nearby NPC, by listing it under `GamblerProfiles` in [Distanced UI](distanced-ui.md).

## Example

`Configs/Gamblers/tavern_dice.cfg`:

```
[tavern_dice]
Coins, 20, Coins, 10-40, Wood, 20-50, Ruby, 1
```

Costs 20 Coins per roll. The prize is a random amount of Coins (10-40), a random amount of Wood (20-50), or 1 Ruby.

## Format

The whole line is a flat, comma-separated list of `item, amount` pairs:

```
costItem, costAmount, prizeItem1, amount1, prizeItem2, amount2, ...
```

**The first pair is always the cost.** Everything after it is the prize pool. An amount can be a fixed number (`5`) or a range (`10-40`), rolled fresh each time.

## Limiting simultaneous rolls

Add a number to the header to cap how many rolls a player can queue at once:

`Configs/Gamblers/bronze_gamble.cfg`:

```
[bronze_gamble = 3]
Coins, 10, Coins, 5-15, Wood, 10-30, ArrowFire, 5, Ruby, 1
```

## Important: one line per profile

Only the **last** data line under a `[profile]` header is used — writing two separate roll-table lines under the same profile means the first one is silently thrown away. Always put a profile's entire cost-and-prizes on a single line.

## Related

- [Server config](../setup/server-config.md) — `GamblerEnableWinNotifications`.
- [Distanced UI](distanced-ui.md) — remote access without a nearby NPC.
- [Shop and economy guide](../guides/shop-and-economy.md).
