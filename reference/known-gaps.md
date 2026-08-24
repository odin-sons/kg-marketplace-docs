# Known gaps and traps

Things in the **current mod version (9.8.8)** that look like they should work based on folder names, in-game text, or their own naming, but do not — or that behave differently from what their name suggests. Every entry below is checked directly against the mod's own source, not guessed. This page is about present-day behavior, not about updating between versions; for that, see [Migrations](migrations.md).

## `PlayerHasOneOfCustomDataKeys` does not match its name

This [condition](../concepts/conditions.md) is true when the player's data **differs** from the referenced data set on at least one value — not when the player "has one of" the listed values, despite the name. In the mod's own condition-evaluation code, this check returns true the moment it finds one value that does *not* match, and only reaches `return false` if every value matched. Its sibling, `PlayerHasAllCustomDataKeys` (true only when every value matches), behaves the way its name suggests. Test this one with known values before relying on it for anything important.

## `GiveBuff`'s duration argument is capped at one second

The optional duration you can pass to the `GiveBuff` command is passed straight into `Mathf.Min(1, yourValue)` — so any value of `1` or higher is silently clamped down to `1` (second), and only a value *below* `1` actually applies as written. There is no way to give a longer duration through this argument. If you need a buff to last a specific amount of time, set its duration on the buff itself (see [Buffers](../configs/buffers.md)) and leave the duration argument off the `GiveBuff` command entirely — that path works correctly.

## `ConsoleCommand` can run anything

The `ConsoleCommand` command (see [Commands](../concepts/commands.md)) looks up whatever you pass it directly in Valheim's own console command table and runs it — not a mod-specific whitelist — and briefly force-enables debug mode for the duration of that one call, so even commands that normally require debug mode go through. This includes cheat and world-editing commands. Anyone who can trigger the dialogue reply or quest event containing it effectively gets that admin power for that one action. Only use it in content you trust, and be cautious with any dialogue/quest files sourced from someone else.

## `KillAndCollect`'s star-level field does not match `Kill`'s

Both [Quest](../configs/quests.md) types have a level field on their target line, but they mean different things. On a plain `Kill` target, the number you write is exactly the minimum star count required — the parser adds `+1` internally before comparing against the creature's own level. On a `KillAndCollect` target, that `+1` isn't applied, so the effective minimum star count is **one lower** than the number you write — writing `2` there only requires a 1-star-and-above creature. Write the star count plus one on a `KillAndCollect` target to get the star requirement you actually intended. See [The `Kill` level field](../configs/quests.md#the-kill-level-field).

## Related

- [Quests](../configs/quests.md), [Buffers](../configs/buffers.md), [Commands](../concepts/commands.md), [Conditions](../concepts/conditions.md).
- [Migrations](migrations.md) — for warnings about updating between versions, which is a different topic from this page.
