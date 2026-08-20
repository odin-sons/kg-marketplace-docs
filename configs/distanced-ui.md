# Distanced UI

**File:** `Marketplace/DistancedUI/DistancedUI.cfg` (a single settings file)

Lets players open shop/quest/mail menus from anywhere, without needing to stand next to the matching NPC — useful for a "phone book" style menu, or one hub NPC that gives access to everything.

## Example

`Marketplace/DistancedUI/DistancedUI.cfg`:

```ini
[DistancedUI]
Enabled = true
CanUseMarketplace = true
CanUseMail = true
CanTakeMailAttachments = false
TraderProfiles = general_store, rare_goods
QuestProfiles = village_elder
BankerProfiles = main_bank
GamblerProfiles =
BufferProfiles =
TeleporterProfiles =
InfoProfiles = default
TransmogrificationProfiles =
Dialogues =
```

This turns on remote access to the marketplace and mail, plus the `general_store`/`rare_goods` trader profiles, the `village_elder` quest profile, the `main_bank` banker profile, and the `default` info page — everything else stays inaccessible remotely (empty list).

## Settings

| Setting | Meaning |
|---|---|
| `Enabled` | Master on/off switch. |
| `CanUseMarketplace` | Allow remote access to the player-to-player marketplace. |
| `CanUseMail` | Allow remote access to mail. |
| `CanTakeMailAttachments` | Allow claiming mail attachments remotely, separate from just reading mail. |
| `TraderProfiles`, `TeleporterProfiles`, `GamblerProfiles`, `BufferProfiles`, `BankerProfiles`, `QuestProfiles`, `InfoProfiles`, `TransmogrificationProfiles`, `Dialogues` | Comma-separated lists of which profiles from each module are remotely accessible. Leave a list empty to keep that module fully local (near-NPC only). |

## Related

- [Traders](traders.md), [Teleporters](teleporters.md), [Gamblers](gamblers.md), [Buffer Profiles](buffer-profiles.md), [Bankers](bankers.md), [Quest Profiles](quest-profiles.md), [Server Info](server-infos.md), [Transmogrification](transmogrification.md), [Dialogues](dialogues.md).
