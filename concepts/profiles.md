# Profiles

Most content types (Quests, Traders, Bankers, Teleporters, Gamblers, Buffers, Transmogrification, Server Info) are organized into **profiles**: named groups of entries, declared with `[ProfileName]` headers.

## Why this matters day to day

An NPC does not carry its own private list of items or quests. Instead, when you place an NPC, you type a **profile name** into its settings, and the NPC shows whatever is registered under that name across every relevant config file. In practice this means:

- **You can split one profile across several files.** Put the first ten trades for `[blacksmith]` in one file, and add five more later in a second file — they combine automatically, no special linking needed.
- **Many NPCs can share one profile.** Place ten different Trader NPCs around the world, give them all the profile `general_store`, and they all sell the exact same thing. Update the file once, every NPC updates.
- **A typo means "nothing shows up."** If the NPC's profile field says `Blacksmith` and your file says `[black_smith]`, the NPC will just show an empty list — there is no error message for a mismatched profile name, just an empty menu. This is the single most common "why is my NPC empty" problem.
- **A space in a profile name is a trap, specifically because of the NPC's Profile field.** The config header itself strips spaces (`[Village Elder]` and `[villageelder]` are the same profile) — but the **Profile** field you type into on the NPC only lowercases what you enter, it does not strip spaces. Type `Village Elder` there and it is stored with the space, so it will never match a header that got normalized to `villageelder`. Avoid spaces in profile names entirely and this never comes up — every example in this documentation uses `snake_case` or one unbroken word for exactly this reason.

## Example: one trader profile fed by two files

`Configs/Traders/weapons.cfg`:
```
[blacksmith]
Coins, 50, SwordIron, 1, 2
Coins, 100, AxeIron, 1, 2
```

`Configs/Traders/armor.cfg`:
```
[blacksmith]
Coins, 80, HelmetIron, 1
Coins, 120, ChestIron, 1
```

Any NPC set to Trader type with profile `blacksmith` now offers all four trades, regardless of which file they came from.

## Profile header extras

A handful of formats let you attach extra info directly to the `[ProfileName]` header, after `=` or `@`:

| Format | Syntax | Meaning |
|---|---|---|
| Quests | `[quest_id = Autocomplete]` | Special quest behavior tag — see [Quests](../configs/quests.md). |
| Territories | `[zone_name@2]` | Priority number — higher wins where zones overlap. |
| Traders | `[profile = true]` | Only shows trades for items the player has already discovered. |
| Gamblers | `[profile = 3]` | Caps how many rolls can be queued at once. |

Spacing around `=` here is safe either way — write `[quest_id = Autocomplete]` or `[quest_id=Autocomplete]`, both parse identically. **The Territories `@` is the one exception**: unlike everywhere else in these config files, a space before `@` is not stripped and becomes part of the zone's actual name — always write it as `[zone_name@2]`, with no space before the `@`. Territory names are also case-sensitive and keep any other internal spaces literally, unlike every other header type on this page.

## Related

- [Config file syntax](config-syntax.md).
- [NPC system](../npc/npc-system.md) — where you actually type a profile name onto an NPC.
