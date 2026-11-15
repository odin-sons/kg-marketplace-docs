# Bridges for other mods

Since 10.0.9 Marketplace no longer has built-in support for EpicMMO, Cozyheim's leveling system, RustyClasses, Battlepass, or blaxxun's Guilds and Groups. That support now lives in small separate mods called **bridges**. A bridge is a BepInEx plugin that depends on Marketplace and teaches it about one other mod through the [mod API](../api/modder-api.md).

Install the bridge for each mod you use; skip the ones you do not. The names are the same as before, so existing quest, dialogue and quest-event files keep working with no edits. If a bridge is missing, its names stop working — see [Migrations](../reference/migrations.md#updating-to-1009-third-party-integrations-moved-to-bridge-mods).

The bridges register their names on the player's client, so install them wherever players run Marketplace.

## Available bridges

| Bridge | Needs | Download | What it adds |
|---|---|---|---|
| Guilds | Guilds | [Hexium](https://valheim.hexium.gg/mods/KG/Marketplace_Bridge_Guilds) | The player's guild for the `OnlyForGuild` [territory flag](../configs/territories.md), the `/g` chat command, reward and command `GuildAddLevel`, commands `SetPlayerGuild` and `SetPlayerGuildRank`, and the conditions `HasGuild`, `NotHasGuild`, `HasGuildWithName`, `NotHasGuildWithName`, `GuildLevelMore`, `GuildLevelLess`, `GuildHasAchievement` and `GuildNotHasAchievement`. |
| Groups | Groups | [Hexium](https://valheim.hexium.gg/mods/KG/Marketplace_Bridge_Groups) | Who is in the player's party, which makes party kills count for Kill quests (`AllowKillQuestsInParty`) and leaderboards (`AllowLeaderboardKillsInParty`), and the `/p` chat command. |
| EpicMMO | EpicMMO | [Hexium](https://valheim.hexium.gg/mods/KG/Marketplace_Bridge_EpicMMO) | Reward `EpicMMO_EXP`, command `AddEpicMMOExp`, conditions `EpicMMOLevelMore` and `EpicMMOLevelLess`. |

## Other bridges

Bridges for Cozyheim's leveling system, RustyClasses and Battlepass exist in the mod's source, but they have no download page yet. They add the names below once published.

| Bridge | Adds |
|---|---|
| Cozyheim | Reward `Cozyheim_EXP`, command `AddCozyheimExp`, conditions `CozyheimLevelMore` and `CozyheimLevelLess`. |
| RustyClasses | Reward `RustyClasses_EXP`, command `AddRustyClassesEXP`, conditions `RustyClassesLevelMore` and `RustyClassesLevelLess`. |
| Battlepass | Reward and command `Battlepass_EXP`. |

## Using a bridge's names

They work like the built-in ones did:

```
EpicMMO_EXP: 100
```

as a quest reward in [Quests](../configs/quests.md#reward-types), and in dialogues and quests as [conditions](../concepts/conditions.md) such as `HasGuild` or `EpicMMOLevelMore, 10`, and [commands](../concepts/commands.md) such as `AddEpicMMOExp, 100`.

## Related

- [For other mod developers](../api/modder-api.md) — the calls a bridge uses, if you want to write one for another mod.
- [Migrations](../reference/migrations.md).
