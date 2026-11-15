# Groups bridge

Tells Marketplace who is in the player's party. Marketplace uses that to share quest and leaderboard kills between party members and to switch KG Chat to party mode.

[Download on Hexium](https://valheim.hexium.gg/mods/KG/Marketplace_Bridge_Groups). Part of the [bridges](../overview.md#bridges).

## What you need

- Marketplace 10.0.9 or newer.
- [Groups](https://thunderstore.io/c/valheim/p/Smoothbrain/Groups/) on Thunderstore.
- The bridge installed next to them, on every player's client (the bridge runs on the client, like the [mod API](../api-reference.md) it uses).

No config edits are needed. The names below are spelled exactly as they were when Marketplace handled this mod itself, so existing quest, dialogue and quest-event files work unchanged.

## What it adds

| Kind | Name | What it does |
|---|---|---|
| Group provider | `—` | Reports the peer ids of everyone in the local player's group. |
| Chat command | `/p` | Switches KG Chat to group mode and sends party messages. `/group` and `/party` also work. |

## Example

Nothing to write in files. Once the bridge is installed:

- With `AllowKillQuestsInParty` on, a party member's kill counts toward your Kill quests ([Server config](../../setup/server-config.md)).
- With `AllowLeaderboardKillsInParty` on, it also counts for [Leaderboard](../../configs/leaderboard-achievements.md) kill statistics.
- `/p` in KG Chat (see [Client config](../../setup/client-config.md)) writes to the party.

## Related

- [Integrations overview](../overview.md), [Migrations](../../reference/migrations.md#updating-to-1009-third-party-integrations-moved-to-bridge-mods).
- [Quests](../../configs/quests.md#reward-types), [Conditions](../../concepts/conditions.md), [Commands](../../concepts/commands.md).
