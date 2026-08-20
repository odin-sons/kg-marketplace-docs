# Synced Localizer

**Folder:** `Configs/SyncedLocalizer/` (`.yml` files)

Lets you override or add translation text server-wide, sent to every connected player, without editing any file on the player's own computer.

## Example

`Configs/SyncedLocalizer/English.yml`:

```yaml
mpasn_Banker: Vault Keeper
marketplace_cannotleaveguild: You cannot abandon your clan right now.
```

Players whose game language is English now see "Vault Keeper" wherever the game would normally show "Banker", and a custom message wherever `marketplace_cannotleaveguild` is used.

## Format

**The file name is the language it applies to** — name it to match the language exactly, the same way Valheim itself names its languages (`English.yml`, `Russian.yml`, etc.). Inside, just list `key: replacement text` pairs.

Any text key can be overridden this way, including this mod's own labels (see [Localization keys](../reference/localization-keys.md)) and any custom key you reference from your own quests or dialogues.

## Related

- [Localization keys](../reference/localization-keys.md) — the mod's built-in labels you can override.
