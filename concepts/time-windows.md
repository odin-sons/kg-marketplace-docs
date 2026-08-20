# Scheduling a config to a time window

[Territories](../configs/territories.md) and [Traders](../configs/traders.md) can be limited to a real-world time-of-day window — a "happy hour" zone, a night-only market — by putting their files in a specially-named folder.

## How to set it up

Create a subfolder named `HH-MM_HH-MM` (24-hour clock) and put your `.cfg` files directly inside it:

```
Configs/Territories/
├─ always_on.cfg              ← no folder trick used, always active
└─ 18-00_23-00/
   └─ evening_market.cfg      ← only active from 18:00 to 23:00
```

Anything **not** inside a folder named this way is simply always active — you only need this for content you want to schedule.

## Example: an evening-only bonus zone

`Configs/Territories/18-00_23-00/happy_hour.cfg`:

```
[happy_hour_zone]
Circle
0, 0, 40
255, 255, 150
PeriodicHealALL = 5
None
```

This zone exists in the world only between 18:00 and 23:00 server time. Before and after that window, it is as if the file does not exist at all.

## Example: a night-market trader

`Configs/Traders/22-00_04-00/night_market.cfg`:

```
[night_market]
Coins, 200, RareGem, 1
```

This trade is only offered between 22:00 and 04:00.

## Things worth knowing

- This checks the **server's real clock**, not the in-game day/night cycle.
- The schedule is checked roughly every 30 seconds, so a boundary (like exactly 18:00) takes effect within about half a minute, not instantly.
- **Windows that cross midnight do not work as written.** `22-00_02-00` will never activate, because the check is a simple "is the current time between the first and second number" — and 22:00 is not less than 2:00. Split an overnight schedule into two folders instead:

```
Configs/Territories/22-00_23-59/night_part1.cfg
Configs/Territories/00-00_02-00/night_part2.cfg
```

Put the same content in both, and together they cover 22:00 through 02:00 without a gap.

## Related

- [Territories](../configs/territories.md), [Traders](../configs/traders.md).
