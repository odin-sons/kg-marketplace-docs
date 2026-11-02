# Spawned NPCs

**Folder:** `Configs/SpawnedNPCs/` (`.yml`/`.yaml` files, one profile per file — the filename becomes the profile's ID)

Lets a player summon a temporary NPC for themselves, through [Distanced UI](distanced-ui.md) — no admin placement involved. Unlike every other NPC on this site, a Spawned NPC isn't placed with [Marketplace Hammer](../npc/marketplace-hammer.md) and isn't shared world state: each player who spawns one gets their own, client-side, and spawning another replaces it. Think a temporary companion or a "preview" NPC, not a persistent fixture.

## Example

`Configs/SpawnedNPCs/village_guide.yml`:

```yaml
Name: Wandering Guide
Type: None
Dialogue: village_guide_greeting
SpawnNearPlayer: false
Condition: QuestFinished, intro_quest
MoveSpeed: 1.5
VisibleToEveryone: false
Fashion:
  RightItem: Torch
  GreetText: Lost? I can point you toward the village.
```

Any player who has finished `intro_quest` can spawn this from their Distanced UI's Spawned NPCs tab. It walks in from a short distance away, carrying a torch, and only its summoner can see it.

## Fields

| Field | Meaning |
|---|---|
| `Name` | Display name. |
| `Type` | One of the [NPC types](../npc/npc-system.md#npc-types) — `Trader`, `Quests`, etc. — if you want this spawned NPC to actually run a shop/quest/etc. `None` for a dialogue-only or purely decorative one. |
| `Profile` | The profile this NPC uses from its Type's own folder, same as any other NPC — omit for `Type: None`. |
| `Prefab` | Model/creature override, same as [Core identity settings](../npc/npc-system.md#core-identity-settings). |
| `Dialogue` | A dialogue ID from [Dialogues](dialogues.md). |
| `SpawnNearPlayer` | `true`: appears right next to the player, facing them, and stays put. `false` (default): appears 15-20m away and walks in toward the player once. |
| `Condition` | A [condition](../concepts/conditions.md) — only players who currently pass it see this profile listed as spawnable at all. To make it available to everyone, set it to an empty string (`Condition: ""`) — safer than leaving the key out of the file entirely, since every other field here tolerates being missing but this one isn't given a fallback in the source if it's absent. |
| `Fashion` | Optional appearance block, same fields as [Appearance settings](../npc/npc-system.md#appearance-settings) (`RightItem`, `GreetText`, and the rest) — everything defaults to none/blank if you skip it. |
| `MoveSpeed` | Walk speed for the walk-in approach when `SpawnNearPlayer` is `false`. `0` (default) uses the normal speed. |
| `VisibleToEveryone` | `false` (default): only the player who spawned it can see it. `true`: every nearby player sees it. |

## Related

- [Distanced UI](distanced-ui.md) — where a player actually triggers a spawn.
- [NPC system](../npc/npc-system.md) — the full field reference this format reuses (type, appearance, dialogue).
- [Conditions](../concepts/conditions.md) — gating which players can spawn a given profile.
- [Hot reload](../setup/hot-reload.md) — editing a file here updates it live.
