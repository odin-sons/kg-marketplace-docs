# Known gaps and traps

Things in the **current mod version (9.9.4)** that look like they should work based on folder names, in-game text, or their own naming, but do not — or that behave differently from what their name suggests. Every entry below is checked directly against the mod's own source, not guessed. This page is about present-day behavior, not about updating between versions; for that, see [Migrations](migrations.md).

## `IsVIP` / `NotIsVIP` still parse, but never do anything

Since 9.9.2 removed the VIP system (see [Migrations](migrations.md#updating-to-992-the-vip-system-is-gone)), these two [conditions](../concepts/conditions.md) are still valid syntax — they will not error out — but `IsVIP` always evaluates to false and `NotIsVIP` always evaluates to true, regardless of the player. There is no VIP list left to check against. If you're writing new content, use a real condition instead (`HasGuild`/`HasFaction`/a [custom value](../concepts/prefabs-and-assets.md#custom-values) you set yourself) to gate anything that used to be VIP-only.

## Related

- [Conditions](../concepts/conditions.md).
- [Migrations](migrations.md) — for warnings about updating between versions, which is a different topic from this page.
