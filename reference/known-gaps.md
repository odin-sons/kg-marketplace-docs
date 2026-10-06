# Known gaps and traps

Things in the **current mod version (10.0.3)** that look like they should work based on folder names, in-game text, or their own naming, but do not — or that behave differently from what their name suggests. Every entry below is checked directly against the mod's own source, not guessed. This page is about present-day behavior, not about updating between versions; for that, see [Migrations](migrations.md).

## Several items in one slot: a comma list with spaces gets cut in a Saved NPC template

The 10.0.2 multi-item syntax (`SwordIron, ShieldBlackmetal`) works as written when you type it into the fashion panel of an NPC you've placed. In a [Saved NPC](../configs/saved-npcs.md) template it doesn't: placing a template first picks one random option from every space-separated list, and the space after the comma splits that list in two — so only one of the items is worn, no error shown. Write the group without spaces in a template: `SwordIron,ShieldBlackmetal`. Details on [the NPC system page](../npc/npc-system.md#wearing-several-items-in-one-slot).

## Quest cooldown values other than a number or an `s`/`d` suffix silently become 0

Since 10.0.1 the [cooldown line](../configs/quests.md#cooldown-and-time-limit) of a quest takes a plain number or a number with a `d` (in-game days) or `s` (seconds) suffix. Anything else — `30m`, `2h`, `1.5d`, a typo — is not rejected: the cooldown is silently read as `0`, so the quest just has no cooldown and nothing in the server log says why. The time limit after the comma has the same behaviour and takes plain seconds only. If a quest repeats when it shouldn't, check that line first.

## `IsVIP` / `NotIsVIP` still parse, but never do anything

Since 9.9.2 removed the VIP system (see [Migrations](migrations.md#updating-to-992-the-vip-system-is-gone)), these two [conditions](../concepts/conditions.md) are still valid syntax — they will not error out — but `IsVIP` always evaluates to false and `NotIsVIP` always evaluates to true, regardless of the player. There is no VIP list left to check against. If you're writing new content, use a real condition instead (`HasGuild`/`HasFaction`/a [custom value](../concepts/prefabs-and-assets.md#custom-values) you set yourself) to gate anything that used to be VIP-only.

## Related

- [Conditions](../concepts/conditions.md).
- [Migrations](migrations.md) — for warnings about updating between versions, which is a different topic from this page.
