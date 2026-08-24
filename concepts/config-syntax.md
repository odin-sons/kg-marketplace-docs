# Config file syntax

Most config files under `Configs/` (quests, dialogues, territories, traders, bankers, gamblers, buffers, transmog, teleporters, server infos, leaderboard achievements) share the same basic text format. This page covers that shared format once, so the other pages can just show you the specifics.

## The basics

A config file is plain text, one entry per line. A quick example (a Server Info page, but the rules apply everywhere):

`Configs/ServerInfos/welcome.cfg`:

```
# This is a comment, ignored by the game
[welcome]
Welcome to the server!
Please read the rules below.

[rules]
1. No griefing.
2. PvP only in designated zones.
```

- Lines starting with `#` are comments — write yourself notes freely.
- Blank lines are ignored — use them to visually separate blocks.
- A line in `[Brackets]` starts a new **section** — usually a profile name (see [Profiles](profiles.md)).
- The file name itself does not matter — call it whatever helps you stay organized. What matters is which folder it is in, and the `[Section]` headers inside it.
- You can split one config type across as many files as you like, and put files in subfolders — everything in a folder is read together, including subfolders.

## Section names

`[My Profile]`, `[myprofile]`, and `[MyProfile]` are treated as the exact same profile in most formats — spacing and capitalization inside brackets do not matter. The exceptions are [Territories](../configs/territories.md) and [Leaderboard Achievements](../configs/leaderboard-achievements.md), where the header is case-sensitive and keeps spaces exactly as written — see the practical notes on those two pages. Pick a consistent style for your own sake regardless; it makes files easier to read and search.

Any script works in a header name, including Cyrillic and Chinese — none of these formats restrict you to specific characters.

If you write data lines before any `[Section]` header, they land in a profile literally called `default` in most formats — this is intentional and safe to rely on, and several NPC types come pre-set to use the `default` profile in-game. [Dialogues](../configs/dialogues.md) and the quest database (not [Quest Profiles](../configs/quest-profiles.md) — the file where you write `[QuestID]` quests themselves) are the exception: unlabeled lines before the first header there are silently skipped instead of landing anywhere.

## Separators used across formats

Three punctuation marks recur across almost every config type:

| Symbol | Meaning | Example |
|---|---|---|
| `,` | Separates fields within one entry | `Wood, 10, 1` (item, amount, level) |
| `\|` | Separates multiple entries on one line | `Wood, 10 \| Stone, 5` (two targets) |
| `\|\|` | "OR" inside one condition group (only in requirement/condition fields) | `HasItem, Wood, 10 \|\| HasItem, Stone, 10` |

**Write spaces freely around these symbols** — `Wood, 10, 1` and `Wood,10,1` behave identically. Spaces are stripped automatically before the line is read. Use spacing to make your files readable; there is no performance or correctness cost.

## Keeping a literal space (names, sentences)

Because spaces are normally stripped, a field that must contain a real space — an NPC's full name, a sentence, a title — needs to be wrapped in `"double quotes"`:

```
Talk, "John the Smith", 1
```

The quotes themselves are removed once the line is read; only the space inside survives. Use this any time a name or phrase has more than one word.

## If a line does not work

Most config formats fail quietly per-entry, not per-file — a mistake in one quest, one trade line, or one zone usually only breaks that one entry, not the whole file, and gets logged to the server console with the file name and line number. Quests are stricter: a broken reward or wrong number of lines in a quest block skips that entire quest.

Common causes of a "silent" mistake:

- A count or amount left at `0` or negative is usually treated as `1` instead of erroring — worth double-checking if a quest target or trade always shows "1" no matter what you type.
- Wrong number of comma-separated fields for the line's format (see the specific config page for the expected count).
- A typo in a keyword (a condition name, a flag name, a quest type) — these fail silently rather than crashing, so the entry is simply skipped.

When something is not appearing in-game, check the server console output first — most parsing problems are logged there in red.

## Related

- [Profiles](profiles.md) — how `[Section]` headers group content together.
- [Conditions](conditions.md), [Commands](commands.md) — the requirement/action language used inside many of these formats.
