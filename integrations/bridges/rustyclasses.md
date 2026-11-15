# RustyClasses bridge

Connects Marketplace to RustyClasses: quests and dialogues can give RustyClasses experience and check the player's level.

This bridge has no download page yet; it will appear here once it is published. Part of the [bridges](../overview.md#bridges).

## What you need

- Marketplace 10.0.9 or newer.
- RustyMods' [Almanac Class System](https://thunderstore.io/c/valheim/p/RustyMods/AlmanacClassSystem/) on Thunderstore (the mod the bridge talks to is its `AlmanacClasses` assembly).
- The bridge installed next to them, on every player's client (the bridge runs on the client, like the [mod API](../api-reference.md) it uses).

No config edits are needed. The names below are spelled exactly as they were when Marketplace handled this mod itself, so existing quest, dialogue and quest-event files work unchanged.

## What it adds

| Kind | Name | What it does |
|---|---|---|
| Quest reward | `RustyClasses_EXP: amount` | Gives the player that much RustyClasses experience when the quest is completed. The quest window shows the reward with this mod's icon. |
| Command | `AddRustyClassesEXP, amount` | Gives RustyClasses experience from a dialogue option or a quest event. |
| Condition | `RustyClassesLevelMore, level` | True when the player's level is at least that number. |
| Condition | `RustyClassesLevelLess, level` | True when the player's level is below that number. |

## Example

```
Reward:   RustyClasses_EXP: 100
Dialogue: Text: Prove yourself | Condition: RustyClassesLevelMore, 10 | Command: AddRustyClassesEXP, 250
```

The first line is a [quest](../../configs/quests.md#reward-types) reward. The second is a [dialogue](../../configs/dialogues.md) option that is visible from level 10 and gives RustyClasses experience when chosen.

## Related

- [Integrations overview](../overview.md), [Migrations](../../reference/migrations.md#updating-to-1009-third-party-integrations-moved-to-bridge-mods).
- [Quests](../../configs/quests.md#reward-types), [Conditions](../../concepts/conditions.md), [Commands](../../concepts/commands.md).
