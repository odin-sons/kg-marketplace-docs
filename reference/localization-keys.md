# Localization keys

The mod's built-in UI text — menu labels, tooltips, messages — comes from a set of keys, all starting with `mpasn_` (a handful of exceptions are noted below).

**[translations.English.yml](/reference/translations.English.yml)** — the full, current key list, pulled directly from the mod (mod version **9.8.8**). This is a plain copy of the file embedded in the mod's own `kg.Marketplace.dll`, kept here by hand and updated whenever a mod release changes, adds, or removes translation strings. If you're on a different version and notice this is out of date, please [open an issue](https://github.com/odin-sons/kg-marketplace-docs/issues/new?template=doc-correction.yml) — that's exactly the kind of drift this page can't catch on its own.

You can use this file directly as your own [local client translation file](#overriding-a-key) — translate it and drop it in — or read through it to decide what to override with [Synced Localizer](../configs/synced-localizer.md).

## Overriding a key

Two different ways to change what a key displays:

1. **[Synced Localizer](../configs/synced-localizer.md)** — a server config. Applies to every connected player automatically, with no file needed on their end. This is the normal way for a server admin to retranslate or reword a piece of UI text.
2. **A local client translation file** — a full translation, entirely local to one player's own computer. Create a file named `MarketplaceAndServerNPCs.<Language>.yml` (matching Valheim's own language names — `English`, `Russian`, `German`, etc.) and place it anywhere under your `BepInEx` folder — `BepInEx/config/` is the conventional spot. Whichever player has their game language set to `<Language>` will load it automatically. This is exactly what the file above is for: rename your translated copy to match your target language and drop it in.

Both accept the same `key: replacement text` format.

## How to find which key produced a piece of text you saw in-game

There is no in-game inspector that shows you a key name when you point at something — the practical approach is matching text, in three steps:

1. **Search [the file above](/reference/translations.English.yml) for the exact English text you saw.** The text next to each key is exactly what displays in-game (unless you have already overridden it). Searching for a distinctive word or phrase from what you saw is usually enough to find the right key in one try.
2. **If several keys have similar text, use the prefix to narrow it down** — keys are grouped by feature area (see [Key naming](#key-naming) below), so a string you saw on the mail screen will start with `mpasn_CMS_`, one on the leaderboard with `mpasn_Leaderboard_`, and so on.
3. **To confirm you found the right key before rolling a change out to your whole server**, set it to something obviously distinctive with [Synced Localizer](../configs/synced-localizer.md) — e.g. `mpasn_sell: TESTING123` — reload, and check whether `TESTING123` shows up where you expected. Once confirmed, replace the test value with your real text.

## Key naming

Keys read as `mpasn_` followed by a short word or phrase describing what the text is for — `mpasn_searchbyname`, `mpasn_itemname`, and so on. Some keys include `$1`, `$2` placeholders that get filled in with real values when shown (`mpasn_added` reads `Added $1 $2`).

Keys are grouped by feature area through their prefix — for example `mpasn_CMS_*` is the mail system, `mpasn_transmog_*` is the Transmog menu, `mpasn_Leaderboard*` is the leaderboard, `mpasn_faction_*` is faction messages, `mpasn_tooltip_*` is item/UI tooltips, and `mpasn_lootbox*` is Lootbox UI text (present even though the Lootbox feature itself is not currently working, see [Known gaps](known-gaps.md)). [The file above](/reference/translations.English.yml) groups naturally by these prefixes if you sort or search it.

### NPC type labels

Shown as an NPC's type in menus — probably the ones most worth rebranding for your server's theme:

| Key | Default text |
|---|---|
| `mpasn_Banker` | Banker |
| `mpasn_Trader` | Trader |
| `mpasn_Gambler` | Gambler |
| `mpasn_Marketplace` | Marketplace |
| `mpasn_Mail` | Mail |
| `mpasn_Teleporter` | Teleporter |
| `mpasn_Buffer` | Enchanter |
| `mpasn_Info` | Info |
| `mpasn_Quests` | Quests |
| `mpasn_Feedback` | Feedback |
| `mpasn_Transmog` | Transmog |

Example — reskinning the Enchanter NPC as "Rune Master" server-wide, using [Synced Localizer](../configs/synced-localizer.md):

```yaml
mpasn_Buffer: Rune Master
```

A few messages are referenced directly by name rather than through the `mpasn_` prefix — `marketplace_cannotleaveguild`, `kg_banker_putall`, plus any custom message key you invent yourself for use with [Synced Localizer](../configs/synced-localizer.md).

## Related

- [Synced Localizer](../configs/synced-localizer.md) — the format for overriding any of these, server-wide.
