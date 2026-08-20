# Factions

**File:** `Configs/Factions.yml` (a single file, created automatically on first server start)

Defines player factions — groups with their own restricted items, friendly monsters, bonus skills, and a shared buff. Players join a faction through dialogue commands, and content can check faction membership through conditions.

## Example

`Configs/Factions.yml`:

```yaml
forest_clan:
  Name: Forest Clan
  Icon: forest_clan_icon
  FriendlyMonsters: [Boar, Deer]
  BonusSkills:
    WoodCutting: 15
    Bows: 10
  Buff: forest_kinship
  CanDamageSameFaction: false

mountain_clan:
  Name: Mountain Clan
  SpecificCraftItems: [FrostArrows]
  BonusSkills:
    Pickaxes: 20
```

Here, `forest_clan` members are friendly with Boars and Deer, get bonus WoodCutting and Bows skill, receive the `forest_kinship` buff, and cannot damage each other. `mountain_clan` members can craft `FrostArrows` (others cannot) and get bonus Pickaxes skill.

## Fields

The faction key (`forest_clan`, `mountain_clan` above) is what you reference from `AddFaction`/`RemoveFaction` commands and `HasFaction` conditions.

| Field | Meaning |
|---|---|
| `Name` | Display name — the only required field. |
| `Icon` | Faction icon. |
| `SpecificUseItems` | Items only this faction's members can use. |
| `BlockPickupItems` | Items this faction cannot pick up. |
| `SpecificBuildings` | Buildings only this faction can build. |
| `SpecificCraftItems` | Items only this faction can craft. |
| `FriendlyMonsters` / `FullFriendlyMonsters` | Creatures that will not attack faction members (two tiers of friendliness). |
| `BonusSkills` | A list of `Skill: bonus level` for passive skill bonuses. |
| `Buff` | A buff (from [Buffers](buffers.md)) applied automatically while a member. |
| `CanDamageSameFaction` | Set to `false` to disable friendly fire within the faction (defaults to `true`, friendly fire on). |

## Managing membership

Players join and leave factions through dialogue or quest event commands — `AddFaction`, `RemoveFaction`, `RemoveAllFactions` (see [Commands](../concepts/commands.md)). A common pattern is a dialogue reply that recruits the player:

```
Text: Join the Forest Clan | Command: AddFaction, forest_clan
```

## Related

- [Buffers](buffers.md) — the `Buff` field references a buff you define there.
- [Conditions](../concepts/conditions.md), [Commands](../concepts/commands.md).
