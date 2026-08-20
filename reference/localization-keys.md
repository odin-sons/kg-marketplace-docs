# Localization keys

The mod's built-in UI text — menu labels, tooltips, messages — comes from a set of keys, all starting with `mpasn_` (a handful of exceptions are noted below). This list changes as the mod updates, so rather than reproducing it here — where it would quietly go stale the next time a key is added, renamed, or removed — this page shows you how to pull the exact, current list yourself, guaranteed to match whatever version you actually have installed.

## Getting the current key list yourself

The full list lives inside the mod's own file (`kg.Marketplace.dll`, in your `BepInEx/plugins/` folder), as an embedded resource named `translations.English.yml`. Two ways to get it out:

### Option 1: a .NET resource browser (no command line needed)

1. Get a free .NET decompiler with a resource browser — [ILSpy](https://github.com/icsharpcode/ILSpy) is the most common choice and needs no installation (just unzip and run).
2. Open `kg.Marketplace.dll` in it.
3. In the assembly tree, expand **Resources**.
4. Find the entry ending in `translations.English.yml` and save/export it.

You now have the exact file the mod ships with, in the same `key: text` YAML format used everywhere else in this documentation.

### Option 2: a short PowerShell script (Windows, no extra tools)

```powershell
$dll = "C:\Path\To\BepInEx\plugins\...\kg.Marketplace.dll"
$asm = [System.Reflection.Assembly]::LoadFile($dll)
$name = $asm.GetManifestResourceNames() | Where-Object { $_ -like "*translations.English.yml" }
$stream = $asm.GetManifestResourceStream($name)
$reader = New-Object System.IO.StreamReader($stream)
$reader.ReadToEnd() | Out-File "English.yml" -Encoding utf8
```

Replace the `$dll` path with wherever your mod manager installed the mod, then run the script — it writes `English.yml` in your current folder. This is the same method the previous step describes, just scripted instead of clicked through.

Once you have the file, you can translate it directly and use it as your own [local client translation file](#overriding-a-key), or read through it to decide what to override with [Synced Localizer](../configs/synced-localizer.md).

## Overriding a key

Two different ways to change what a key displays:

1. **[Synced Localizer](../configs/synced-localizer.md)** — a server config. Applies to every connected player automatically, with no file needed on their end. This is the normal way for a server admin to retranslate or reword a piece of UI text.
2. **A local client translation file** — a full translation, entirely local to one player's own computer. Create a file named `MarketplaceAndServerNPCs.<Language>.yml` (matching Valheim's own language names — `English`, `Russian`, `German`, etc.) and place it anywhere under your `BepInEx` folder — `BepInEx/config/` is the conventional spot. Whichever player has their game language set to `<Language>` will load it automatically. This is exactly what the extracted file above is for: rename your translated copy to match your target language and drop it in.

Both accept the same `key: replacement text` format.

## How to find which key produced a piece of text you saw in-game

There is no in-game inspector that shows you a key name when you point at something — the practical approach is matching text, in three steps:

1. **Search the file you extracted above for the exact English text you saw.** The text next to each key is exactly what displays in-game (unless you have already overridden it). Searching for a distinctive word or phrase from what you saw is usually enough to find the right key in one try.
2. **If several keys have similar text, use the prefix to narrow it down** — keys are grouped by feature area (see [Key naming](#key-naming) below), so a string you saw on the mail screen will start with `mpasn_CMS_`, one on the leaderboard with `mpasn_Leaderboard_`, and so on.
3. **To confirm you found the right key before rolling a change out to your whole server**, set it to something obviously distinctive with [Synced Localizer](../configs/synced-localizer.md) — e.g. `mpasn_sell: TESTING123` — reload, and check whether `TESTING123` shows up where you expected. Once confirmed, replace the test value with your real text.

## Key naming

Keys read as `mpasn_` followed by a short word or phrase describing what the text is for — `mpasn_searchbyname`, `mpasn_itemname`, and so on. Some keys include `$1`, `$2` placeholders that get filled in with real values when shown (`mpasn_added` reads `Added $1 $2`).

Keys are grouped by feature area through their prefix — for example `mpasn_CMS_*` is the mail system, `mpasn_transmog_*` is the Transmog menu, `mpasn_Leaderboard*` is the leaderboard, `mpasn_faction_*` is faction messages, `mpasn_tooltip_*` is item/UI tooltips, and `mpasn_lootbox*` is Lootbox UI text (present even though the Lootbox feature itself is not currently working, see [Known gaps](known-gaps.md)). The extracted list groups naturally by these prefixes if you sort or search it.

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

A few messages are referenced directly by name rather than through the `mpasn_` prefix — `marketplace_cannotleaveguild`, `msg_noteleport`, plus any custom message key you invent yourself for use with [Synced Localizer](../configs/synced-localizer.md).

## Related

- [Synced Localizer](../configs/synced-localizer.md) — the format for overriding any of these, server-wide.
