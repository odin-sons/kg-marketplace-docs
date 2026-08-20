# Discord Webhooks

**File:** `Marketplace/DiscordWebhooks/DiscordSettings.cfg` (a single settings file)

Posts server events — marketplace sales, gambler wins, quest completions — to a Discord channel. This is separate from the `SendWebhook` command (see [Commands](../concepts/commands.md)), which you can trigger from any dialogue or quest event; this file only covers a handful of built-in events.

## Example

`Marketplace/DiscordWebhooks/DiscordSettings.cfg`:

```ini
[Webhook Links]
Marketplace Webhook Link = https://discord.com/api/webhooks/XXXX/YYYY
Gambler Webhook Link = https://discord.com/api/webhooks/XXXX/ZZZZ

[Webhook Messages]
Marketplace Webhook Message = **{0}** just listed **x{1} {2}** for **{3} {4}** each!

[Webhook Titles]
Marketplace Webhook Title = Market Alerts
```

## Format

Three sections, each with one setting per event type (`Marketplace`, `Gambler`, `Quest`, `Lootboxes`):

| Section | What it sets |
|---|---|
| `[Webhook Links]` | The Discord webhook address for each event type. Leave the default placeholder in place to disable posting for that event. |
| `[Webhook Messages]` | A message template. `{0}`, `{1}`, etc. get filled in with the relevant details (player name, item, amount, price...). |
| `[Webhook Titles]` | The name shown as the poster of the message in Discord. |

### Message placeholders

| Type | Placeholders |
|---|---|
| `Marketplace` | `{0}` seller, `{1}` count, `{2}` item name, `{3}` price, `{4}` currency name |
| `Gambler` | `{0}` player, `{1}` count, `{2}` item name |
| `Quest` | `{0}` player, `{1}` quest name |
| `Lootboxes` | `{0}` player, `{1}` lootbox name, `{2}` result |

Note: the Lootboxes settings exist here, but the Lootboxes feature itself is not currently functional in this version of the mod — see [Known gaps](../reference/known-gaps.md).

## Related

- `SendWebhook` in [Commands](../concepts/commands.md) — for posting your own custom messages from dialogues/quest events.
