# For other mod developers

This mod provides a small integration surface for other mods to hook into — checking whether a player is standing inside a specific zone, reading or changing an NPC's appearance and behavior, and a couple of convenience actions. This page is a plain-language overview of what is possible; if you are building an integration, the mod ships a ready-to-use interface file you can copy into your own project, with the exact calls documented inline.

## What another mod can do

- **Check zone membership.** Ask whether the local player, or any object, is currently standing inside a [Territory](../configs/territories.md), and read which behavior flags that zone has active. Useful for a mod that wants to behave differently inside PvP zones, guild land, and so on.
- **Read and change an NPC's settings.** Every setting on an NPC — its type, profile, model, name, dialogue, and all appearance fields (see [NPC system](../npc/npc-system.md)) — can be read or changed by another mod, the same data this mod's own build tool edits.
- **Add its own quest rewards, dialogue conditions and dialogue commands.** In the development build after 10.0.8 another mod registers a name, and from then on server admins can use it in [Quests](../configs/quests.md#reward-types), [Conditions](../concepts/conditions.md) and [Commands](../concepts/commands.md) like a built-in one — for example a leveling mod offering an experience reward. A quest reward can also supply its own player-facing name, icon and tooltip.
- **Provide groups and guilds.** A group mod tells this mod who is in the local player's party, which is what makes party members' kills count for Kill quests (see `AllowKillQuestsInParty` in [Server config](../setup/server-config.md)). A guild mod tells it the player's guild name (for the `OnlyForGuild` territory flag), its chat command, and when the player joins or leaves a guild — which is what powers the `/guild` chat mode.
- **Trigger a couple of built-in actions.** Refresh a trader's stock, or open the quest journal, from another mod's own code.

## Things worth knowing if you are integrating

- In the development build after 10.0.8 the zone-flag list exposed to other mods covers every flag in [Territories](../configs/territories.md), including `OnlyForGuild`, `OnlyForFaction`, `JoinOtherServer`, `RevealOnMap`, `CustomJereSpawner` and `ZoneMusic`, and the NPC type list includes `Mail`. Before that, those were missing from the interface file.
- The registration calls should be made once, early (in the other mod's startup). They only work on the player's client, and do nothing if this mod is not installed.

## What the mod no longer does by itself

Up to 10.0.8 this mod talked to EpicMMO, Cozyheim's leveling system, RustyClasses, Battlepass and blaxxun's Guilds and Groups directly. In the development build after 10.0.8 it does not: it has no built-in knowledge of those mods, and the matching commands, conditions and rewards are supplied by the mods themselves through the calls above. If a mod you rely on has not been updated to register them, the old names stop working — see [Migrations](../reference/migrations.md#unreleased-third-party-integrations-moved-to-the-mod-api).

## Related

- [Territories](../configs/territories.md), [NPC system](../npc/npc-system.md).
- [Known gaps](../reference/known-gaps.md).
