# Migrations

Most updates to this mod are safe to install directly. This page lists the exceptions — points in the [changelog](changelog.md) where the mod author explicitly warned that updating requires an extra step, or could break existing server data if you are not careful.

If you are updating across a version not listed here, a plain update is expected to be safe. When in doubt, back up your `Marketplace` folder and save file before updating a live server either way.

## Updating to 9.8.6 or 9.8.7: test quests locally first

Both versions shipped large changes to the quest system. The author's own release notes for both said, verbatim: **"BEFORE INSTALLING THIS VERSION TEST IT FIRST ON LOCAL CLIENT CAUSE LOTS OF QUEST SYSTEM CHANGES. IF YOU HAVE QUESTS ALREADY ON SERVER THEY MAY BREAK."**

If your server has active quests and you are updating from before 9.8.6, install the new version on a local/test copy first, confirm your existing [Quests](../configs/quests.md) still work as expected, and only then update the live server.

## Updating from before 9.4.0: withdraw everything first

In version 9.4.0, the mod changed how it stores player data — moving from individual save files to a single combined database file. The author's release note: **"Before installing this version please revert to old one and withdraw all Trade Post items / Banker items / Mail items. Marketplace moved from using .json data files to one single database file."**

If you are updating a server from a version older than 9.4.0, have every player withdraw their marketplace listings, banked items, and mail attachments **before** you install the update — anything left in those systems at the moment of the switch may not carry over.

This mod version documented here (9.8.8) is well past this change; it only matters if you are jumping to a modern version from something very old.

## General advice for any update

- Read the entries between your current version and the new one in the [changelog](changelog.md) — the author calls out breaking changes there when they happen.
- Back up your `Marketplace` config folder and save data before updating a live server, especially across a large version jump.
- Test on a local or backup copy first if your server has valuable, hard-to-recreate content (long quest chains, custom zones, banked items).

## Related

- [Changelog](changelog.md) — the full version history these warnings are drawn from.
- [Known gaps](known-gaps.md) — current-version quirks, unrelated to updating.
