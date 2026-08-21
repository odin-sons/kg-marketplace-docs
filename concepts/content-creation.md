# Content creation

There is no in-game editor for quests, dialogues, zones, and so on. You create content by editing plain text files in a `Configs/` folder, one subfolder per feature. The mod watches those folders and picks up changes automatically.

NPCs themselves are placed directly in the world, using a build-mode tool (**Marketplace Hammer**) available to players with admin access. When you place an NPC, you give it a **type** (which mechanic it uses) and a **profile** (which config entries it uses) right there in its settings panel.

This page and the ones below describe the shared machinery — the syntax, vocabulary, and grouping rules every config format is built from. If you'd rather learn by doing, skip ahead to [NPC system](../npc/npc-system.md), the first page in Core, and place something — the individual feature pages link back here (usually as "Profiles", "Conditions", or "Commands") wherever you actually need one of these concepts, so nothing here is a prerequisite you have to finish first.

## Writing config files

A handful of pages cover the syntax and vocabulary shared across many config types — read these once and the rest make a lot more sense:

- [Config file syntax](config-syntax.md) — comments, sections, separators, and the general shape every config file follows.
- [Profiles](profiles.md) — how content gets grouped and assigned to an NPC.
- [Conditions](conditions.md) — the shared requirement language (`HasItem`, `QuestFinished`, and the rest).
- [Commands](commands.md) — the shared action language (`GiveItem`, `Teleport`, and the rest).
- [Prefabs and text markup](prefabs-and-assets.md) — referencing items, sounds, images, and dynamic text.
- [Scheduling a config to a time window](time-windows.md) — limiting a Territory or Trader to specific hours.
