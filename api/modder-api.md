# For other mod developers

This mod provides a small integration surface for other mods to hook into — checking whether a player is standing inside a specific zone, reading or changing an NPC's appearance and behavior, and a couple of convenience actions. This page is a plain-language overview of what is possible; if you are building an integration, the mod ships a ready-to-use interface file you can copy into your own project, with the exact calls documented inline.

## What another mod can do

- **Check zone membership.** Ask whether the local player, or any object, is currently standing inside a [Territory](../configs/territories.md), and read which behavior flags that zone has active. Useful for a mod that wants to behave differently inside PvP zones, guild land, and so on.
- **Read and change an NPC's settings.** Every setting on an NPC — its type, profile, model, name, dialogue, and all appearance fields (see [NPC system](../npc/npc-system.md)) — can be read or changed by another mod, the same data this mod's own build tool edits.
- **Add its own quest rewards, dialogue conditions and dialogue commands.** Since 10.0.9 another mod registers a name, and from then on server admins can use it in [Quests](../configs/quests.md#reward-types), [Conditions](../concepts/conditions.md) and [Commands](../concepts/commands.md) like a built-in one — for example a leveling mod offering an experience reward. A quest reward can also supply its own player-facing name, icon and tooltip.
- **Provide groups and guilds.** A group mod tells this mod who is in the local player's party, which is what makes party members' kills count for Kill quests (see `AllowKillQuestsInParty` in [Server config](../setup/server-config.md)). A guild mod tells it the player's guild name (for the `OnlyForGuild` territory flag), its chat command, and when the player joins or leaves a guild — which is what powers the `/guild` chat mode.
- **Trigger a couple of built-in actions.** Refresh a trader's stock, or open the quest journal, from another mod's own code.

## Registration calls

All of these live in the interface file's `Marketplace_API` class, run on the player's client, and do nothing when Marketplace is not installed. Call each once, early.

| Call | What it does |
|---|---|
| `RegisterQuestReward(name, displayName, give, icon, description)` | A quest reward written `name: arg1, arg2` in quest files. `give` receives the arguments as `string[]` when the quest is completed. `displayName`, `icon` and `description` (the text for the reward list and tooltip) are optional. Spaces are removed from the reward line, and arguments cannot contain `,`, `\|` or `:`. |
| `RegisterDialogueCondition(name, check)` | A condition used as `name, arg1, arg2`. `check` returns whether it is met and the text shown to the player when it is not. |
| `RegisterDialogueCommand(name, command)` | A command used as `name, arg1, arg2` in dialogue options and quest events. |
| `RegisterGroupHandler(getMembers)` | Returns the peer ids of everyone in the local player's group, including the player. Powers shared kill progress. |
| `RegisterGroupChatCommand(chatCommand)` | Optional. The chat command that switches KG Chat to group mode, `/p` by default. |
| `RegisterGuildHandler(chatCommand, getCurrentGuildName, registerOnGuildChanged)` | Provides the guild name and the guild chat command, and gets a callback to invoke when the player joins or leaves a guild. Also invoke it when the player's guild is first loaded, otherwise guild-only territories stay locked until the next join or leave. |

## Things worth knowing if you are integrating

- The zone-flag list exposed to other mods covers every flag in [Territories](../configs/territories.md), including `OnlyForGuild`, `OnlyForFaction`, `JoinOtherServer`, `RevealOnMap`, `CustomJereSpawner` and `ZoneMusic`, and the NPC type list includes `Mail`. Before 10.0.9 those were missing from the interface file.
- A reward name that nobody registered shows a red `Wrong reward 'name'` in the quest window and gives nothing.

## What the mod no longer does by itself

Up to 10.0.8 this mod talked to EpicMMO, Cozyheim's leveling system, RustyClasses, Battlepass and blaxxun's Guilds and Groups directly. Since 10.0.9 it does not: it has no built-in knowledge of those mods. The matching commands, conditions and rewards come from separate [bridge mods](../bridges/overview.md), which use the calls above. See [Migrations](../reference/migrations.md#updating-to-1009-third-party-integrations-moved-to-bridge-mods).

## Related

- [Bridges](../bridges/overview.md), [Territories](../configs/territories.md), [NPC system](../npc/npc-system.md).
- [Known gaps](../reference/known-gaps.md).
