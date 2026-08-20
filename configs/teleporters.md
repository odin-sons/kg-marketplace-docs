# Teleporters

**Folder:** `Configs/Teleporters/` (any file name, `.cfg`)

Lists fast-travel destinations for a Teleporter NPC. Once you have written a profile here, put its name in a `Teleporter`-type NPC's **Profile** field to make it live — see [Core identity settings](../npc/npc-system.md#core-identity-settings). It can also be reached remotely, without a nearby NPC, by listing it under `TeleporterProfiles` in [Distanced UI](distanced-ui.md).

![Teleporter destination pins on the map](https://i.imgur.com/Hoy6Gg1.png)

## Example

`Configs/Teleporters/hub_main.cfg`:

```
[hub_main]
"Trading Post", 100, 30, 200
"Mountain Outpost<speed=15>", 800, 150, -400, mountain_icon
```

Format: `"Destination Name", x, y, z, [icon]`. The name must be in quotes if it contains a space. The first destination teleports instantly; the second travels at a set speed instead of instantly — see [`<speed=N>`](../concepts/prefabs-and-assets.md#teleporter-travel-speed).

## Sharing destinations between profiles

Instead of repeating a full list, one profile can simply reuse another's:

`Configs/Teleporters/hub_satellite.cfg`:

```
[hub_satellite]
@from: hub_main
```

Any NPC using `hub_satellite` now offers the exact same destinations as `hub_main`.

## Related

- [Prefabs and text markup](../concepts/prefabs-and-assets.md#teleporter-travel-speed) — the `<speed=N>` tag.
- [Server config](../setup/server-config.md) — the `CanTeleportWithOre` toggle.
- [Distanced UI](distanced-ui.md) — remote access without a nearby NPC.
