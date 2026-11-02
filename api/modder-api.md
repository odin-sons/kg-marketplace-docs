# For other mod developers

This mod provides a small integration surface for other mods to hook into — checking whether a player is standing inside a specific zone, reading or changing an NPC's appearance and behavior, and a couple of convenience actions. This page is a plain-language overview of what is possible; if you are building an integration, the mod ships a ready-to-use interface file you can copy into your own project, with the exact calls documented inline.

## What another mod can do

- **Check zone membership.** Ask whether the local player, or any object, is currently standing inside a [Territory](../configs/territories.md), and read which behavior flags that zone has active. Useful for a mod that wants to behave differently inside PvP zones, guild land, and so on.
- **Read and change an NPC's settings.** Every setting on an NPC — its type, profile, model, name, dialogue, and all appearance fields (see [NPC system](../npc/npc-system.md)) — can be read or changed by another mod, the same data this mod's own build tool edits.
- **Trigger a couple of built-in actions.** Refresh a trader's stock, or open the quest journal, from another mod's own code.

## Things worth knowing if you are integrating

- A small number of the newer zone flags are not currently visible through this integration, even though they work correctly when set directly in a [Territories](../configs/territories.md) file — see [Known gaps](../reference/known-gaps.md).
- The NPC type list exposed to other mods is missing the `Mail` type compared to the full list available in-game (see [NPC system](../npc/npc-system.md#npc-types)) — if you need to detect a Mail NPC specifically from another mod, this is a current limitation.

## Related integrations this mod already has

Separately from the above, this mod already talks to a handful of other popular mods on its own — EpicMMO, Cozyheim's leveling system, and RustyClasses all have experience-granting commands and level-check conditions built in (see [Commands](../concepts/commands.md) and [Conditions](../concepts/conditions.md)), and guild-related actions and checks are available the same way if a guild mod is installed.

## Related

- [Territories](../configs/territories.md), [NPC system](../npc/npc-system.md).
- [Known gaps](../reference/known-gaps.md).
