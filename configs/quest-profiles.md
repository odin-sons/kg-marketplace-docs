# Quest Profiles

**Folder:** `Configs/QuestProfiles/` (any file name, `.cfg`)

This is how you hand your [Quests](quests.md) to an actual NPC. Once you have written a profile here, put its name in a `Quests`-type NPC's **Profile** field — the NPC offers every quest listed under that name here. See [Core identity settings](../npc/npc-system.md#core-identity-settings) for exactly where to enter it. It can also be reached remotely, without a nearby NPC, by listing it under `QuestProfiles` in [Distanced UI](../configs/distanced-ui.md).

## Example

`Configs/QuestProfiles/npcs.cfg`:

```
[village_elder]
kill_10_wolves, timber_run, intro_talk

[blacksmith]
craft_masterwork_axe
```

An NPC set to profile `village_elder` will offer all three quests listed. An NPC set to `blacksmith` offers just the one.

## Format

```
[ProfileName]
questID1, questID2, questID3
```

You can list quest IDs across several lines, or several files, under the same profile name — everything gets combined. For example, `Configs/QuestProfiles/elder-part1.cfg` and `Configs/QuestProfiles/elder-part2.cfg`, shown together here for brevity:

```
[village_elder]
kill_10_wolves, timber_run

[village_elder]
intro_talk, escort_merchant
```

This is the same as writing all four quest IDs on one line — useful for organizing a large NPC's quest list into logical groups across separate files.

## Practical notes

- The order you list quests in does not control anything about how they are offered — it is just for your own organization.
- A quest ID that does not exist anywhere in [Quests](quests.md) is simply ignored — no error, it just never shows up. If a quest is missing in-game, double check the spelling matches exactly.

## Related

- [Quests](quests.md) — the quest definitions this profile lists.
- [Distanced UI](distanced-ui.md) — remote access without a nearby NPC.
- [First quest guide](../guides/first-quest.md).
