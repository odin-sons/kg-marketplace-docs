# Server config — MarketPlace.cfg

`BepInEx/config/Marketplace/MarketPlace.cfg` — the mod's central settings file, everything under one `[Main]` section. Changes here [reload automatically](hot-reload.md).

## Example

`BepInEx/config/Marketplace/MarketPlace.cfg`:

```ini
[Main]
BankerIncomeTime = 6
BankerIncomeMultiplier = 0.02
ItemMarketLimit = 25
MarketTaxes = 5
MaxAcceptedQuests = 10
UseLeaderboard = true
PossibleCurrencies = Coins, Ruby
OverrideDebug = 76561198000000001, 76561198000000002
```

This example: interest pays out every 6 hours at 2%, players can list 25 items with a 5% marketplace tax, quests cap at 10 active, the leaderboard is enabled, both Coins and Ruby work as currency, and two Steam IDs have admin access.

## Settings

| Setting | Default | What it controls |
|---|---|---|
| `EnableTransmogLog` | `false` | Log transmog actions to the server log. |
| `EnableTraderLog` | `false` | Log trader transactions. |
| `BankerIncomeTime` | `1` | Hours between interest payouts. Set to `0` to turn off interest entirely. |
| `BankerIncomeMultiplier` | `0` | Interest rate per payout. |
| `BankerVIPIncomeMultiplier` | `0` | A separate, usually higher, interest rate for VIP players. |
| `BankerInterestItems` | `All` | Which banked items actually earn interest. |
| <a id="feedback"></a>`FeedbackWebhookLink` | placeholder | Discord webhook for the Feedback NPC. |
| `OrConditionSeparator` | `\|\|` | The symbol used for "OR" in [conditions](../concepts/conditions.md) — change this if `\|\|` conflicts with something else you use, though the default works fine for almost everyone. |
| `ItemMarketLimit` | `15` | Maximum marketplace listing slots per player. |
| `BlockedPlayers` | — | Player IDs blocked from the marketplace. |
| `MarketTaxes` | `0` | Sell tax percentage (0-100). |
| `VIPplayersTaxes` | `0` | Sell tax percentage for VIP players (0-100). |
| `VIPplayersList` | — | Player IDs treated as VIP — affects taxes and anywhere a dialogue/quest checks `IsVIP`. |
| `CanTeleportWithOre` | `true` | Whether players can teleport while carrying ore without needing a special override. |
| `MarketSellBlockedPrefabs` | `Coins, SwordCheat` | Items that cannot be listed on the marketplace. |
| `GamblerEnableWinNotifications` | `false` | Broadcast a server-wide message whenever someone wins a gamble. |
| `AllowMultipleQuestsScore` | `false` | Whether one kill/harvest/craft can count toward more than one matching quest at once. |
| `MaxAcceptedQuests` | `7` | Maximum active quests per player. |
| `AllowKillQuestsInParty` | `true` | Whether a party member's kills count toward your Kill quests. |
| `EnableKGChat` | `true` | Turns the custom chat window on or off. |
| <a id="mail"></a>`MailPostRecipe` | `SwordCheat, 1` | What it costs to craft a mailbox — `item, amount`. |
| `MailPostWaitTime` | `5` | Minutes before sent mail can be picked up. |
| `MailPostExcludeItems` | — | Items that cannot be mailed. |
| `PieceSaverRecipe` | `SwordCheat, 1` | What it costs to craft a Piece Saver Crystal. |
| `UseLeaderboard` | `false` | Turns the leaderboard/achievements system on or off. |
| `OverrideDebug` | — | Steam IDs with admin access — build-mode NPC placement, admin console commands. |
| `BlockedChatUsers` | — | Steam IDs muted from chat. |
| `PossibleCurrencies` | `Coins` | Every item usable as marketplace currency. |
| `CanLeaveGuild` | `true` | Whether players can voluntarily leave their guild. |
| `FactionNameplateOffset` | `0, 0` | Pixel offset for the faction tag shown above player nameplates. |

## Related

- [Client config](client-config.md) — the separate, per-player settings file.
- [Hot reload](hot-reload.md).
- [Conditions](../concepts/conditions.md) — `OrConditionSeparator`, `IsVIP`.
