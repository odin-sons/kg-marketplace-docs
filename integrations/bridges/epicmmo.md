# EpicMMO bridge

Connects Marketplace to EpicMMO: quests and dialogues can give EpicMMO experience and check the player's level.

[Download on Hexium](https://valheim.hexium.gg/mods/KG/Marketplace_Bridge_EpicMMO). Part of the [bridges](../overview.md#bridges).

## What you need

- Marketplace 10.0.9 or newer.
- [EpicMMOSystem](https://thunderstore.io/c/valheim/p/WackyMole/WackyEpicMMOSystem/) on Thunderstore (the maintained WackyEpicMMOSystem fork).
- The bridge installed next to them, on every player's client (the bridge runs on the client, like the [mod API](../api-reference.md) it uses).

No config edits are needed. The names below are spelled exactly as they were when Marketplace handled this mod itself, so existing quest, dialogue and quest-event files work unchanged.

## What it adds

| Kind | Name | What it does |
|---|---|---|
| Quest reward | `EpicMMO_EXP: amount` | Gives the player that much EpicMMO experience when the quest is completed. The quest window shows the reward with this mod's icon. |
| Command | `AddEpicMMOExp, amount` | Gives EpicMMO experience from a dialogue option or a quest event. |
| Condition | `EpicMMOLevelMore, level` | True when the player's level is at least that number. |
| Condition | `EpicMMOLevelLess, level` | True when the player's level is below that number. |

## Example

```
Reward:   EpicMMO_EXP: 100
Dialogue: Text: Prove yourself | Condition: EpicMMOLevelMore, 10 | Command: AddEpicMMOExp, 250
```

The first line is a [quest](../../configs/quests.md#reward-types) reward. The second is a [dialogue](../../configs/dialogues.md) option that is visible from level 10 and gives EpicMMO experience when chosen.

## Related

- [Integrations overview](../overview.md), [Migrations](../../reference/migrations.md#updating-to-1009-third-party-integrations-moved-to-bridge-mods).
- [Quests](../../configs/quests.md#reward-types), [Conditions](../../concepts/conditions.md), [Commands](../../concepts/commands.md).
