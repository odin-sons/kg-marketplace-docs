# Commands

Commands are the actions side of scripting — give an item, teleport the player, spawn a creature, play a sound. They run inside [Dialogue](../configs/dialogues.md) options and [Quest Event](../configs/quest-events.md) triggers.

## Quick example

A dialogue option that gives the player an item, plays a sound, and moves to the next line of conversation:

```
Text: Take this sword | Command: GiveItem, SwordIron, 1, 2 | Command: PlaySound, sword_clink, 0.8 | Transition: farewell
```

A quest event that spawns a mini-boss the moment the quest is accepted, and cleans it up if the quest times out:

`Configs/QuestEvents/boss_hunt.cfg`:

```
[boss_hunt]
OnAcceptQuest: Spawn, GoblinKing, 1, 3
OnQuestTimeout: RemoveQuest, boss_hunt
```

## Syntax

`CommandName, argument1, argument2` — same comma-separated shape as conditions. You can chain several commands on one line with `|`, and they run in order:

```
Command: GiveItem, Coins, 100 | Command: PlaySound, coin_jingle | Command: Heal, 50
```

## Random outcomes

`RandomCommand` gives a command a percent chance (0-100) of firing. **Each `RandomCommand` on the same line rolls independently** — this is not a single pick split between alternatives, so more than one can fire, or none at all:

```
Text: Open the chest | RandomCommand: 40, GiveItem, Coins, 10 | RandomCommand: 15, GiveItem, Ruby, 1
```

This is a 40% chance of the Coins firing and a *separate* 15% chance of the Ruby firing, checked independently — the player could get both, either, or neither. If you want exactly one of several outcomes to happen (never more, never fewer), use `RandomTransition` to jump to a different node for each outcome instead, since transitions genuinely pick one at random from the list.

## Reference: all commands

| Command | Arguments | What it does |
|---|---|---|
| `OpenUI` | [menu type], [profile] | Opens a shop/menu window. Leave both empty to open whatever menu the current NPC itself offers. |
| `PlaySound` | sound name, [volume] | Plays a sound you dropped into the sounds folder — see [Custom assets](../assets/custom-assets.md). |
| `GiveQuest` | quest ID | Gives the player a quest directly, without them needing to talk to the quest-giving NPC. |
| `RemoveQuest` | quest ID, [count as cancelled?] | Removes an active quest from the player. |
| `FinishQuest` | quest ID | Force-completes a quest immediately. |
| `GiveItem` | item, amount, level | Adds an item to the player's inventory. |
| `GiveItemWithData` | item, amount, level, data set name | Same, but stamps extra custom values onto the item — see [Custom Spawn Data](../configs/custom-spawn-data.md). |
| `RemoveItem` | item, amount | Removes items from the player's inventory. |
| `SetPlayerData` | data set name | Applies a whole [custom data set](../configs/custom-spawn-data.md) directly onto the player. |
| `Spawn` | prefab, amount, level | Spawns creatures/items near the player, scattered randomly. |
| `SpawnWithData` | prefab, amount, level, data set name | Same, with a custom data set applied to each spawn. |
| `SpawnXYZ` | prefab, amount, level, x, y, z, spread | Spawns at an exact world position instead of near the player. |
| `SpawnXYZWithData` | prefab, amount, level, x, y, z, spread, data set name | Combination of the above two. |
| `Teleport` | x, y, z, [allow while carrying ore?] | Teleports the player to a fixed position. |
| `Damage` | amount | Deals flat damage to the player. |
| `Heal` | amount | Heals the player. |
| `GiveBuff` | buff name, [duration] | Applies a buff. Note: the duration argument here is unreliable for anything longer than about a second — if you need a buff to last a specific amount of time, set its duration on the buff itself instead (see [Buffers](../configs/buffers.md)) and leave this argument out. |
| `AddPin` | label, x, y, z | Drops a permanent map pin and centers the map on it. |
| `PingMap` | text, x, y, z | Shows a temporary map ping (like a player ping), not a permanent pin. |
| `AddEpicMMOExp` | amount | Grants EpicMMO experience (only if that mod is installed). |
| `AddCozyheimExp` | amount | Grants Cozyheim leveling experience. |
| `AddRustyClassesEXP` | amount | Grants RustyClasses experience. |
| `PlayAnimation` | animation name | Plays an animation on the NPC. |
| `EnterPassword` | title, password, success command, fail command | Opens a password-entry popup and branches based on the result. |
| `GuildAddLevel` | amount | Adds levels to the player's own guild. |
| `Battlepass_EXP` | amount | Grants Battlepass experience (only if that separate mod is installed). |
| `ConsoleCommand` | command text | Runs any admin console command as if the player had typed it themselves — see the caution note below. |
| `AddCustomValue` / `SetCustomValue` | key, amount / value | Adds to, or sets, a [custom value](prefabs-and-assets.md#custom-values). |
| `PlayVideo` | video name, [speed %] | Plays a clip you dropped into the video folder. |
| `SendWebhook` | webhook address suffix, text | Posts a message to a Discord channel. |
| `AddPlayerKey` / `RemovePlayerKey` | key name | Adds/removes a personal one-time flag on the player — this is what `HasPlayerKey` checks. |
| `SetPlayerGuild` | guild ID or name | Moves the player into a specific guild. |
| `SetPlayerGuildRank` | rank name | Sets the player's rank within their current guild. |
| `SetNPCModelLocal` / `SetNPCModelGlobal` | model name | Changes the current NPC's model — `Local` only for the player who triggered it, `Global` for everyone. |
| `SetNPCNameLocal` / `SetNPCNameGlobal` | name | Same, for the NPC's displayed name. |
| `SetNPCPatrol` | patrol route data | Sets the NPC's patrol path — normally pasted in from a route you recorded, see [Marketplace Hammer](../npc/marketplace-hammer.md). |
| `AddFaction` / `RemoveFaction` | faction key | Adds/removes one faction from the player. |
| `RemoveAllFactions` | — | Clears every faction from the player. |

## A caution on `ConsoleCommand`

`ConsoleCommand` can run **any** admin command, including cheat and world-editing commands — not just mod-specific ones. Anyone who can trigger the dialogue option or quest event that contains it effectively gets that admin access for that one command. Only use it in content you trust, and avoid handing it to untested or community-submitted dialogue/quest files.

## Related

- [Conditions](conditions.md) — gating when a command runs.
- [Dialogues](../configs/dialogues.md), [Quest Events](../configs/quest-events.md) — where commands are used.
- [Custom Spawn Data](../configs/custom-spawn-data.md), [Custom assets](../assets/custom-assets.md).
