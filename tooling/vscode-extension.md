# VS Code extensions

Extensions that make working with this mod's config files easier inside VS Code. This list will grow over time — if you build one that helps other admins write quests, dialogues, or zones for this mod, it belongs here.

## Syntax highlighting

**[KG Marketplace Syntax](https://github.com/odin-sons/kg-marketplace-syntax)** — a Visual Studio Code extension that adds syntax highlighting to `.cfg` config files for this mod.

It recognizes and colors:

- Comments (`#`)
- Section headers (`[ProfileName]`)
- Quest types (`Kill`, `Collect`, `Talk`, and the rest — see [Quests](../configs/quests.md))
- Dialogue keywords (`Text:`, `Transition:`, `Command:`, `Condition:`, and the rest — see [Dialogues](../configs/dialogues.md))
- Formatting tags (`<color=#RRGGBB>`, `<b>`, `<i>`, `<size=N>`, `<image=path>`)
- `%variable%` placeholders (see [Prefabs and text markup](../concepts/prefabs-and-assets.md#dynamic-text-keyword))
- Numbers, coordinates, and [territory flags](../configs/territories.md#flags)

**Install:** open the Extensions panel in VS Code (Ctrl+Shift+X), search for "KG Marketplace Syntax", and click Install. Once installed, it activates automatically for any `.cfg` file you open. Full setup notes are in the extension's own README, linked above.

## Related

- [Coming soon](coming-soon.md) — tools planned but not built yet, including AI-assisted config generation.
- [Config file syntax](../concepts/config-syntax.md) — the format this extension highlights.
