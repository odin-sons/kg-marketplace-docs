# Server Info

**Folder:** `Configs/ServerInfos/` (any file name, `.cfg`)

Free-text info/rules/announcement pages shown by an Info NPC. Unlike most other config formats, this one is plain prose — write whatever text you want, and it displays as written (rich text formatting works too). Once you have written a profile here, put its name in an `Info`-type NPC's **Profile** field to make it live — see [Core identity settings](../npc/npc-system.md#core-identity-settings). It can also be reached remotely, without a nearby NPC, by listing it under `InfoProfiles` in [Distanced UI](distanced-ui.md).

![Server Info page in-game](https://i.imgur.com/cwOiOsO.png)

## Example

`Configs/ServerInfos/rules.cfg`:

```
[default]
Welcome to the server! Please read the rules below.

[rules]
1. No griefing.
2. PvP only in designated zones.
<image=rules_banner>
Thanks for reading!
```

An Info NPC set to profile `rules` shows the two numbered lines, then the banner image, then the closing line.

## Format

Just write text under a `[ProfileName]` header — multiple lines stay together as one page. Add a picture anywhere with `<image=name>` (see [Prefabs and text markup](../concepts/prefabs-and-assets.md#inline-image)) — everything before and after the image becomes its own text block around it.

Text written before any `[Section]` header goes to the `default` profile automatically — this is what a fresh Info NPC shows before you assign it a specific profile.

## Related

- [Prefabs and text markup](../concepts/prefabs-and-assets.md) — the `<image=>` tag.
- [Distanced UI](distanced-ui.md) — remote access without a nearby NPC.
