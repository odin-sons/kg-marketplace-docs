# Migrations

Most updates to this mod are safe to install directly. This page lists the exceptions — points in the [changelog](changelog.md) where the mod author explicitly warned that updating requires an extra step, or could break existing server data if you are not careful. A couple of entries below are flagged from source-checking a fix instead (noted as such) rather than an author warning, when the fix itself silently changes existing content's behavior.

If you are updating across a version not listed here, a plain update is expected to be safe. When in doubt, back up your `Marketplace` folder and save file before updating a live server either way.

## Updating to 10.0.1: quest cooldowns now count in seconds too (test first)

The author's warning, from the 10.0.1 notes: **"Since quests cooldown were changed highly recommend to test it on local server first before using it on live server. If you find any bugs please report them to me."**

What actually changed, from the code:

- The cooldown field now accepts a suffix — `60s` for seconds, `1d` for in-game days. A plain number still means in-game days, so existing quest files need no edits.
- Cooldowns are now stored per player as a fractional in-game day instead of a whole day number. Existing saved cooldowns are still read, and by my reading of the code one that was already running ends at the same moment it would have before — but that's exactly the part to test locally.
- The quest list now shows a live countdown (like `01d 02h 03m 04s`) instead of a "days left" number.
- A malformed cooldown used to be a parse error; now an unrecognised suffix is silently read as `0` — see [Known gaps](known-gaps.md#quest-cooldown-values-other-than-a-number-or-an-sd-suffix-silently-become-0).

One correction to earlier versions of this documentation, which described the cooldown as seconds: a plain number has **always** counted in-game days (20 real minutes each by default). If you copied a value like `3600` from an old example believing it was seconds, it was really 3600 days — write `3600s` if you meant seconds.

Separately, 10.0.1 adds the [`AlwaysProgressServerTime`](../setup/server-config.md) option; the author recommends enabling it if you have quests with cooldowns or time limits.

## Updating to 10.0.0: the Valheim 1.0 release (beta at the time)

10.0.0 is the release the author updated for Valheim 1.0 (the changelog says "DN 1.0"), and shipped it as a beta. The author's own warning, verbatim: **"There still can be super many amount of bugs, that's why its beta. Please make backups and test it on local server first before using it on live server. If you find any bugs please report them to me."** The beta label was lifted in 10.0.2 ("Out of beta now" in its notes).

If you are updating a live server from 9.x, back up your `Marketplace` config folder and save data, and try the new version on a local copy first.

One change not flagged by the author: the [Gambler](../configs/gamblers.md#prize-pool-size) prize-pool cap went from 19 to 21 prizes per profile. It only ever raises the limit, so there is nothing to do.

## Updating to 9.9.2: the VIP system is gone

The changelog calls this out as a **breaking change**, and checking the diff confirms it's thorough — this isn't just one setting:

- `VIPplayersList`, `VIPplayersTaxes`, and `BankerVIPIncomeMultiplier` are no longer read from [server config](../setup/server-config.md). Leaving them in your `MarketPlace.cfg` is harmless — they're just ignored — but they no longer do anything: every seller pays `MarketTaxes`, and every banked deposit earns `BankerIncomeMultiplier`, with no VIP-tier exception.
- The `IsVIP` / `NotIsVIP` [conditions](../concepts/conditions.md) still parse without error, but `IsVIP` now always evaluates to false and `NotIsVIP` always evaluates to true — see [Known gaps](known-gaps.md) for the current-version detail. Any dialogue option, quest, or zone flag that used to gate on VIP status needs a different condition now (guild membership, a faction, or a [custom value](../concepts/prefabs-and-assets.md#custom-values) you set yourself).
- `OrConditionSeparator` is also gone in the same pass, unrelated to VIP specifically — the `||` OR-separator in [conditions](../concepts/conditions.md) is hardcoded now, no longer admin-configurable. This only matters if you had actually changed it away from the default `||`; if you never touched that setting, there's nothing to do.

If your server had a VIP tier set up through this mod (taxes, banker interest, or gated content), re-check all three after updating — none of it silently keeps working.

## Updating to 9.8.9: re-check any `KillAndCollect` quest's level field

Not an author-flagged warning — found by checking the fix itself. Before 9.8.9, `KillAndCollect`'s level field required one star *less* than the number written (see the now-removed entry on [Known gaps](known-gaps.md) for past versions), so existing quests written to work around that — e.g. writing `3` to mean "2-star minimum" — now require one star *more* than originally intended, since 9.8.9 makes the field mean exactly what's written (matching plain [`Kill`](../configs/quests.md#the-target-line-by-type)).

If you have any `KillAndCollect` quests already live, check their level field against what you actually want after updating — a quest that used to accept 1-star-and-above creatures at level `2` now requires 2-star-and-above.

## Updating to 9.8.6 or 9.8.7: test quests locally first

Both versions shipped large changes to the quest system. The author's own release notes for both said, verbatim: **"BEFORE INSTALLING THIS VERSION TEST IT FIRST ON LOCAL CLIENT CAUSE LOTS OF QUEST SYSTEM CHANGES. IF YOU HAVE QUESTS ALREADY ON SERVER THEY MAY BREAK."**

If your server has active quests and you are updating from before 9.8.6, install the new version on a local/test copy first, confirm your existing [Quests](../configs/quests.md) still work as expected, and only then update the live server.

## Updating from before 9.4.0: withdraw everything first

In version 9.4.0, the mod changed how it stores player data — moving from individual save files to a single combined database file. The author's release note: **"Before installing this version please revert to old one and withdraw all Trade Post items / Banker items / Mail items. Marketplace moved from using .json data files to one single database file."**

If you are updating a server from a version older than 9.4.0, have every player withdraw their marketplace listings, banked items, and mail attachments **before** you install the update — anything left in those systems at the moment of the switch may not carry over.

This mod version documented here (10.0.3) is well past this change; it only matters if you are jumping to a modern version from something very old.

## Since 9.0.8: Transmogrification's visual-effects field is gone

Versions 8.2.3 through 9.0.7 supported a fifth field on a [Transmogrification](../configs/transmogrification.md) line — a numbered visual-effect ID (1 through 20, plus 21 for "player's choice", added in 8.2.3) that layered a glowing effect on top of the reskinned item. The author's 9.0.8 release note: **"Removed transmogrification VFX's due to non-readable mesh."**

If you're following an old guide or example that includes a fifth field on a Transmogrification line, drop it — it does nothing as of 9.0.8. Only the four documented fields (item, cost item, cost amount, ignore category) apply in this version. Two leftover text labels for it ("No Effect" / "Any Effect") still exist in the mod's translation file, but nothing reads them.

## General advice for any update

- Read the entries between your current version and the new one in the [changelog](changelog.md) — the author calls out breaking changes there when they happen.
- Back up your `Marketplace` config folder and save data before updating a live server, especially across a large version jump.
- Test on a local or backup copy first if your server has valuable, hard-to-recreate content (long quest chains, custom zones, banked items).

## Related

- [Changelog](changelog.md) — the full version history these warnings are drawn from.
- [Known gaps](known-gaps.md) — current-version quirks, unrelated to updating.
