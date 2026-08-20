# Known gaps and traps

Things in the **current mod version (9.8.8)** that look like they should work based on folder names, in-game text, or their own naming, but do not — or that behave differently from what their name suggests. This page is about present-day behavior, not about updating between versions; for that, see [Migrations](migrations.md).

## Lootboxes do not currently work

A `Configs/Lootboxes/` folder is created automatically, and there is even a Discord webhook message template for it (see [Discord Webhooks](../configs/discord-webhooks.md)) — but nothing actually reads lootbox files in this version of the mod. If you find an old guide describing a Lootbox file format (`[UID]` / `TYPE` / item / description / icon), it does not apply here. **Do not build content around this folder** — it currently does nothing.

If you have first-hand evidence that lootboxes work on a live server running this version, that is worth double-checking and reporting — it would mean this note is out of date.

## `PlayerHasOneOfCustomDataKeys` does not match its name

This [condition](../concepts/conditions.md) is true when the player's data **differs** from the referenced data set on at least one value — not when the player "has one of" the listed values, despite the name. Its sibling, `PlayerHasAllCustomDataKeys` (true only when every value matches), behaves the way its name suggests. Test this one with known values before relying on it for anything important.

## `GiveBuff`'s duration argument is unreliable

The optional duration you can pass to the `GiveBuff` command does not reliably extend a buff beyond about one second. If you need a buff to last a specific amount of time, set its duration on the buff itself (see [Buffers](../configs/buffers.md)) and leave the duration argument off the `GiveBuff` command entirely — that path works correctly.

## `ConsoleCommand` can run anything

The `ConsoleCommand` command (see [Commands](../concepts/commands.md)) can trigger any admin console command, not just mod-specific ones — including cheat and world-editing commands. Anyone who can trigger the dialogue reply or quest event containing it effectively gets that admin power for that one action. Only use it in content you trust, and be cautious with any dialogue/quest files sourced from someone else.

## `KillAndCollect`'s star-level field does not match `Kill`'s

Both [Quest](../configs/quests.md) types have a level field on their target line, but they mean different things. On a plain `Kill` target, the number you write is exactly the minimum star count required. On a `KillAndCollect` target, the effective minimum star count is **one lower** than the number you write — writing `2` there only requires a 1-star-and-above creature. Write the star count plus one on a `KillAndCollect` target to get the star requirement you actually intended. See [The `Kill` level field](../configs/quests.md#the-kill-level-field).

## Transmogrification's old visual-effects option is gone

Older guides for this mod describe a fifth, optional field on a [Transmogrification](../configs/transmogrification.md) line — a numbered visual-effect ID (1 through 20, plus 21 for "player's choice") that added a glowing effect on top of the reskinned item. That field does not exist in the current config format, and there is no effect picker anywhere in the current transmog UI. Two leftover text labels for it ("No Effect" / "Any Effect") still exist in the mod's translation file, but nothing reads them. Only the four documented fields (item, cost item, cost amount, ignore category) do anything in this version.

## Other mods may not see every zone flag

If another mod on your server reads territory data through this mod's public integration, a handful of the newer zone flags (`OnlyForGuild`, `CustomJereSpawner`, `JoinOtherServer`, `RevealOnMap`, `OnlyForFaction`) may not be visible to that other mod, even though they work fine when set directly in a [Territories](../configs/territories.md) file. This only matters if you rely on a second mod reading zone flags — it does not affect the flags working for players in-game.

## Related

- [Quests](../configs/quests.md), [Buffers](../configs/buffers.md), [Commands](../concepts/commands.md), [Conditions](../concepts/conditions.md), [Territories](../configs/territories.md).
- [Migrations](migrations.md) — for warnings about updating between versions, which is a different topic from this page.
