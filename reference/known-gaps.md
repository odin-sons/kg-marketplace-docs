# Known gaps and traps

Things in the **current mod version (9.8.9)** that look like they should work based on folder names, in-game text, or their own naming, but do not — or that behave differently from what their name suggests. Every entry below is checked directly against the mod's own source, not guessed. This page is about present-day behavior, not about updating between versions; for that, see [Migrations](migrations.md).

## `PlayerHasOneOfCustomDataKeys` doesn't match its name — for float values specifically

As of 9.8.9 this [condition](../concepts/conditions.md) works as named for bool/int/string custom data: true when the player's data has one of the listed values. The float check alone was missed — it's still inverted, true when the player's float value **differs** from the referenced one rather than matches it. Test a float-keyed check with known values before relying on it; bool/int/string checks no longer need that caution.

## `GiveBuff`'s duration argument is effectively always zero

As of 9.8.9 the optional duration you can pass to the `GiveBuff` command is passed into `Mathf.Min(0, yourValue)` — for any ordinary positive duration, that evaluates to `0` every time, so the argument no longer has any real effect (previously it clamped to `1` second instead of `0`; either way, there's still no way to give a longer duration through this argument). If you need a buff to last a specific amount of time, set its duration on the buff itself (see [Buffers](../configs/buffers.md)) and leave the duration argument off the `GiveBuff` command entirely — that path works correctly.

## `ConsoleCommand` can run anything

The `ConsoleCommand` command (see [Commands](../concepts/commands.md)) looks up whatever you pass it directly in Valheim's own console command table and runs it — not a mod-specific whitelist — and briefly force-enables debug mode for the duration of that one call, so even commands that normally require debug mode go through. This includes cheat and world-editing commands. Anyone who can trigger the dialogue reply or quest event containing it effectively gets that admin power for that one action. Only use it in content you trust, and be cautious with any dialogue/quest files sourced from someone else.

## Related

- [Buffers](../configs/buffers.md), [Commands](../concepts/commands.md), [Conditions](../concepts/conditions.md).
- [Migrations](migrations.md) — for warnings about updating between versions, which is a different topic from this page.
