# Guilds bridge

Connects Marketplace to Guilds: territories can be limited to a guild, quests and dialogues can check and change the player's guild, and KG Chat gets a guild mode.

[Download on Hexium](https://valheim.hexium.gg/mods/KG/Marketplace_Bridge_Guilds). Part of the [bridges](../overview.md#bridges).

## What you need

- Marketplace 10.0.9 or newer.
- blaxxun's Guilds mod.
- The bridge installed next to them, on every player's client (the bridge runs on the client, like the [mod API](../api-reference.md) it uses).

No config edits are needed. The names below are spelled exactly as they were when Marketplace handled this mod itself, so existing quest, dialogue and quest-event files work unchanged.

## What it adds

| Kind | Name | What it does |
|---|---|---|
| Guild provider | `—` | Gives Marketplace the player's guild name, which the `OnlyForGuild` [territory flag](../../configs/territories.md) uses, and tells it when the player joins or leaves a guild. |
| Chat command | `/g` | Switches KG Chat to guild mode and sends guild messages. `/guild` also works. |
| Quest reward | `GuildAddLevel: amount` | Adds guild levels when the quest is completed. |
| Command | `GuildAddLevel, amount` | Adds guild levels from a dialogue option or a quest event. |
| Command | `SetPlayerGuild, guild` | Moves the player into a guild, taking it out of the old one first. `guild` is the guild's name or its numeric id. |
| Command | `SetPlayerGuildRank, rank` | Sets the player's rank in their current guild. `rank` is a Guilds rank name, not case-sensitive. |
| Condition | `HasGuild / NotHasGuild` | The player is in a guild / is not in one. |
| Condition | `HasGuildWithName, name / NotHasGuildWithName, name` | The player's guild has that name / does not. |
| Condition | `GuildLevelMore, level / GuildLevelLess, level` | The guild's level is at least / below that number. A player without a guild fails both. |
| Condition | `GuildHasAchievement, id / GuildNotHasAchievement, id` | The guild has earned / has not earned that Guilds achievement. |

## Example

```
Text: Join the Wolves | Condition: NotHasGuild | Command: SetPlayerGuild, Wolves
Text: Officers only | Condition: HasGuildWithName, Wolves | Command: SetPlayerGuildRank, Officer
```

A territory limited to a guild is set up with the `OnlyForGuild` flag, see [Territories](../../configs/territories.md).

## Config

The bridge's own config file has one option, `CanLeaveGuild` (default `true`). Turn it off to stop players leaving their guild. This option used to live in Marketplace's own config.

## Related

- [Integrations overview](../overview.md), [Migrations](../../reference/migrations.md#updating-to-1009-third-party-integrations-moved-to-bridge-mods).
- [Quests](../../configs/quests.md#reward-types), [Conditions](../../concepts/conditions.md), [Commands](../../concepts/commands.md).
