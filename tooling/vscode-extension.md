# VS Code extensions

Extensions that make working with this mod's config files easier inside VS Code. This list will grow over time — if you build one that helps other admins write quests, dialogues, or zones for this mod, it belongs here.

## Syntax highlighting

**[KG Marketplace Syntax](https://github.com/odin-sons/kg-marketplace-syntax)** — a Visual Studio Code extension that adds syntax highlighting to `.cfg` config files for this mod.

It recognizes and colors:

- Comments (`#`)
- Section headers (`[ProfileName]`)
- Quest types (`Kill`, `Collect`, `Talk`, and the rest — see [Quests](../configs/quests.md))
- Dialogue keywords (`Text:`, `Transition:`, `Command:`, `Condition:`, and the rest — see [Dialogues](../configs/dialogues.md))
- Formatting tags (`<color=#RRGGBB>`, `<b>`, `<i>`, `<size=N>`, `<image=path>`)
- `%variable%` placeholders (see [Prefabs and text markup](../concepts/prefabs-and-assets.md#dynamic-text-keyword))
- Numbers, coordinates, and [territory flags](../configs/territories.md#flags)

**Install:** open the Extensions panel in VS Code (Ctrl+Shift+X), search for "KG Marketplace Syntax", and click Install. Once installed, it activates automatically for any `.cfg` file you open. Full setup notes are in the extension's own README, linked above.

Here's everything it highlights in one profile bundle:

```cfg
# A profile bundle demonstrating every highlighted construct

[welcome_banner]
Welcome, <color=#4FD1C5><b>traveler</b></color>! Type <i>help</i> for commands.
<image=banner>
Current bonus: <size=18>%server_bonus%</size>

[weekly_bounty = HiddenAnyCondition]
KillAndCollect
Wolfpack Cull
Thin the wolf packs threatening the herd. Bring me 5 pelts by week's end.
Wolf, 5, 1
Item: Coins, 75 | Skill_EXP: Bows, 30 | RandomItem: loot_pool_common
7
HasItem, Wood, 20 || HasItem, Stone, 20 || QuestFinished, intro_quest
GlobalKey, week_started | !HasQuest, weekly_bounty

[merchant_greet]
Welcome, traveler. What can I do for you today?
@onopen | Command: PlaySound, shop_bell, 0.6
Text: Show me your wares | Command: OpenUI, Trader, merchant_stock
Text: I'm ready for the ritual | Condition: HasItem, RitualCandle, 3 | AlwaysVisible: false | Transition: ritual_start
RandomTransition: farewell_a, farewell_b, farewell_c
Text: I have a quest for you | Condition: !HasQuest, weekly_bounty | Command: GiveQuest, weekly_bounty
Talk, "Village Elder", 1

[weekly_bounty_events]
OnAcceptQuest: GiveItemWithData, TrackingCollar, 1, 3, wolfhunt
OnCompleteQuest: HasAchievement, wolfslayer | GiveItem, Coins, 500
OnCompleteQuest: AddEpicMMOExp, 250 | GuildAddLevel, 1
OnQuestTimeout: SetCustomValue, weekly_failed, true

[market_square@2]
Rectangle
0, 0, 60, 60
120, 180, 120, exp: 1.0, heightbounds: 5-45, TopLeftBottomRight
NoAttack, PeriodicHeal = 2, NoMonsters, NoInteractPortals, OnlyForFaction = merchants
None
```

## Related

- [Coming soon](coming-soon.md) — tools planned but not built yet, including AI-assisted config generation.
- [Config file syntax](../concepts/config-syntax.md) — the format this extension highlights.
