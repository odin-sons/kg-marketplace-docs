# Dialogues

**Folder:** `Configs/Dialogues/` (any file name, `.cfg`)

Dialogues build branching conversations for an NPC — what it says, what the player can say back, and what happens as a result. Every [condition](../concepts/conditions.md) and [command](../concepts/commands.md) in this mod originates here; [Quests](quests.md) and [Quest Events](quest-events.md) reuse the exact same language. Once you have written a dialogue tree here, put its top-level node's ID in **any** NPC's **Dialogue** field to attach it — see [Core identity settings](../npc/npc-system.md#core-identity-settings). Unlike the profile-based modules, this field is independent of the NPC's Type, so even a `None`-type NPC can hold a full conversation. A dialogue can also be opened remotely, without a nearby NPC, by listing its top-level node ID under `Dialogues` in [Distanced UI](distanced-ui.md).

**If an NPC has a Dialogue set, clicking it always opens the dialogue instead of its normal Type-based menu** (Trader, Banker, and so on). Use the `OpenUI` command from inside the dialogue if you still want to give players a way into that menu — see the [interaction triggers example](#silent-triggers-no-visible-reply) below.

## A simple example

`Configs/Dialogues/merchant_greet.cfg`:

```
[merchant_greet]
Welcome, traveler. What can I do for you?
Text: Show me your wares | Command: OpenUI, Trader, merchant_stock
Text: I have a quest for you | Condition: NotHasQuest, supply_run | Command: GiveQuest, supply_run
Text: Goodbye | Transition: merchant_bye

[merchant_bye]
Safe travels.
```

- `[merchant_greet]` is the conversation node's ID. Node IDs are matched case-insensitively but are always lowercased internally — writing them in lowercase in your files avoids any confusion.
- The first line after the header, `Welcome, traveler...`, is what the NPC says.
- Every line after that is one clickable reply for the player, made of `|`-separated pieces.
- `Transition: merchant_bye` moves to another node when clicked — that is how you link nodes into a longer conversation.

Always give a node at least one reply, even a plain `Text: Goodbye` with no `Transition` — a node with zero replies can only be closed with the Escape key, which is a dead end for players who do not know that.

## Reply line fields

Each reply is built from `Key: Value` pieces, separated by `|`. Use as many as you need on one line:

| Field | What you put there |
|---|---|
| `Text` | The text shown for this reply. Use `\n` for a line break. |
| `Transition` | The ID of the next conversation node. |
| `RandomTransition` | Several node IDs, comma-separated — jumps to one picked at random, each with equal odds. List a node more than once to make it more likely. |
| `Command` | One [command](../concepts/commands.md) to run. Add several `Command:` pieces to run more than one. |
| `RandomCommand` | `chance, CommandName, args` — a command with an independent percent chance (0-100) of firing, see [Commands](../concepts/commands.md#random-outcomes). |
| `Condition` | One [condition](../concepts/conditions.md) the player must meet for this reply to appear enabled. Add several `Condition:` pieces to require all of them. |
| `Icon` | An icon to show next to this reply — an image file name (see [Custom assets](../assets/custom-assets.md)) or an existing item/piece prefab's own icon. |
| `AlwaysVisible` | `true` (the default) or `false` — see [When a condition fails](#when-a-condition-fails) below. |
| `Color` | `r, g, b` — a custom text color. |
| `OverrideError` | Custom text to show instead of the default failure reason when a condition fails. |

## When a condition fails

`AlwaysVisible` defaults to `true`, and that default surprises people: **a reply whose condition fails is still shown by default** — just greyed out, unclickable, and with the failure reason appended in red. It is not hidden unless you say so explicitly.

```
Text: I'm ready | Condition: HasItem, RitualCandle, 3 | OverrideError: You need 3 Ritual Candles first. | Transition: ritual_start
```

With no `AlwaysVisible` field, this reply always shows — a player without the candles sees it greyed out with "You need 3 Ritual Candles first." next to it. To hide the reply completely until the condition is met instead, add `AlwaysVisible: false`:

```
Text: I'm ready | Condition: HasItem, RitualCandle, 3 | AlwaysVisible: false | Transition: ritual_start
```

Which behavior you want depends on the reply — showing a locked option with an explanation is often better UX (it tells the player what they are missing) than making them wonder why an option they expect is not there.

## Silent triggers (no visible reply)

Some lines should run automatically instead of appearing as a clickable option — for example, playing a sound the moment the player walks up, or immediately redirecting into the NPC's shop UI instead of showing any text. Prefix the line with one of these:

| Prefix | Fires |
|---|---|
| `@interaction` (or `@onopen`) | Every time this specific node is loaded — whether that is the player's first click on the NPC, or a `Transition` from another node into this one. |
| `@inrange` | Once, when the player walks within about 10 meters of the NPC. |
| `@outrange` | Once, when the player then walks back out past about 12 meters. |

Worked examples: [Dialogue patterns](../guides/dialogue-patterns.md#reacting-to-proximity-without-a-visible-reply) — proximity triggers, handing an NPC's normal menu back to it with `@interaction`, and chaining commands before a risky line.

## Random outcomes

Each `RandomCommand` on a reply rolls its own independent chance — a line with several `RandomCommand` pieces can give the player none, some, or all of them, not exactly one. If you want exactly one of several outcomes instead — never more, never fewer — send the player to a different node per outcome with `RandomTransition`:

```
Text: Open it | RandomTransition: chest_coins, chest_ruby, chest_nothing, chest_nothing, chest_nothing
```

Listing a node more than once (`chest_nothing` three times here) is how you weight a `RandomTransition` — it just becomes more likely to be the one picked, since every entry has an equal chance. Worked example: [Dialogue patterns: independent rolls vs a single random pick](../guides/dialogue-patterns.md#independent-rolls-vs-a-single-random-pick).

## Password gates

`EnterPassword` opens a text-entry popup and transitions to one of two nodes depending on whether the player typed the right word. Anything that should happen on success or failure — granting a key, teleporting, showing more text — goes on a reply *inside* the target node, not inside `EnterPassword` itself. Worked example: [Dialogue patterns: a password-gated door](../guides/dialogue-patterns.md#a-password-gated-door).

## Console commands with spaces

`ConsoleCommand` runs anything you could type into the admin console yourself, with `{playername}` substituted for the local player's name. Since most console commands contain spaces, wrap the whole thing in quotes. Worked example: [Dialogue patterns: quoting console commands](../guides/dialogue-patterns.md#quoting-console-commands-with-spaces).

See the [caution on `ConsoleCommand`](../concepts/commands.md#a-caution-on-consolecommand) before using this in content you did not write yourself.

## Keeping literal spaces

Text that needs a real space where the format would otherwise strip it — a name, a sentence used as a command argument — should be wrapped in double quotes: `"Vault Access"`. See [Config file syntax](../concepts/config-syntax.md#keeping-a-literal-space-names-sentences). Any argument containing a comma should be quoted for the same reason.

## Custom spawn data

For attaching extra values to spawned items/creatures from a dialogue command, see [Custom Spawn Data](custom-spawn-data.md).

## Related

- [Conditions](../concepts/conditions.md), [Commands](../concepts/commands.md) — the full shared vocabulary.
- [Dialogue tree guide](../guides/dialogue-tree.md) — a longer worked example.
- [Dialogue patterns](../guides/dialogue-patterns.md) — proximity triggers, menu handoffs, weighted rewards, password gates, and quoted console commands.
- [Distanced UI](distanced-ui.md) — remote access without a nearby NPC.
