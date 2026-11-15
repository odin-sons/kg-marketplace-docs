# Battlepass bridge

Connects Marketplace to Battlepass: quests and dialogues can give Battlepass experience.

This bridge has no download page yet; it will appear here once it is published. Part of the [bridges](../overview.md#bridges).

## What you need

- Marketplace 10.0.9 or newer.
- The Battlepass mod. It is not a public mod, so there is no download page; ask KG in a private message if you want to know more about it.
- The bridge installed next to them, on every player's client (the bridge runs on the client, like the [mod API](../api-reference.md) it uses).

No config edits are needed. The names below are spelled exactly as they were when Marketplace handled this mod itself, so existing quest, dialogue and quest-event files work unchanged.

## What it adds

| Kind | Name | What it does |
|---|---|---|
| Quest reward | `Battlepass_EXP: amount` | Gives that much Battlepass experience when the quest is completed. |
| Command | `Battlepass_EXP, amount` | Gives Battlepass experience from a dialogue option or a quest event. |

## Example

```
Reward:   Battlepass_EXP: 100
Dialogue: Text: Daily bonus | Command: Battlepass_EXP, 50
```

## Related

- [Integrations overview](../overview.md), [Migrations](../../reference/migrations.md#updating-to-1009-third-party-integrations-moved-to-bridge-mods).
- [Quests](../../configs/quests.md#reward-types), [Conditions](../../concepts/conditions.md), [Commands](../../concepts/commands.md).
