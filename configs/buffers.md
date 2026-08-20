# Buffers (buff catalog)

**Folder:** `Configs/Buffers/` (any file name, `.cfg`)

Defines the buffs an Enchanter NPC can sell. This page is the buff **definitions** — which buffs a given NPC actually offers is set separately in [Buffer Profiles](buffer-profiles.md).

## Example

`Configs/Buffers/haste_buff.cfg`:

```
[haste_buff]
Wind Runner's Blessing
300
sprite_haste
Coins, 50
ModifySpeed = 0.3, ModifyStaminaRegen = 0.2
vfx_haste_start
movement_buffs
```

| Line | Content | Meaning |
|---|---|---|
| header | `[haste_buff]` | The buff's unique ID — this is what a Buffer Profile lists to make it available. |
| 1 | `Wind Runner's Blessing` | Display name. |
| 2 | `300` | Duration in seconds. |
| 3 | `sprite_haste` | Icon. |
| 4 | `Coins, 50` | Price — item and amount. |
| 5 | `ModifySpeed = 0.3, ModifyStaminaRegen = 0.2` | What the buff actually does — see below. |
| 6 | `vfx_haste_start` | A visual effect played when the buff is applied. |
| 7 | `movement_buffs` | A group name — see [Buff groups](#buff-groups). |

## What a buff can modify

Each modifier needs a `= number` value:

| Modifier | Effect |
|---|---|
| `ModifyAttack` | Attack damage. |
| `ModifyHealthRegen` | Health regeneration. |
| `ModifyStaminaRegen` | Stamina regeneration. |
| `ModifyRaiseSkills` | Skill gain rate. |
| `ModifySpeed` | Movement speed. |
| `ModifyNoise` | Noise radius (stealth). |
| `ModifyMaxCarryWeight` | Carry weight. |
| `ModifyStealth` | Stealth. |
| `RunStaminaDrain` | Sprint stamina drain. |
| `DamageReduction` | Incoming damage reduction. |

Combine several on one buff: `ModifyAttack = 0.15, DamageReduction = 0.1` gives more damage and less damage taken at once.

## Buff groups

Buffs sharing the same group name (the last line) count as mutually exclusive — buying a new buff in a group replaces whichever one from that group was already active. Use this to stop players from stacking every buff you sell into one overpowered combo; give competing buffs the same group name.

## Related

- [Buffer Profiles](buffer-profiles.md) — which buffs an NPC actually offers.
