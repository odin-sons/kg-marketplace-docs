# Guide: a branching dialogue tree

A worked example of a small conversation with a gated reply, a silent trigger, and a random outcome. Full field reference: [Dialogues](../configs/dialogues.md).

## What we are building

```
greet ──"Ask about the ritual"──▶ ritual_info
  │
  └─"I'm ready" (needs 3 Ritual Candles) ──▶ ritual_start ──▶ ritual_success
                                    │
                                    └─(fails)──▶ ritual_denied
```

## The dialogue file

`Configs/Dialogues/greet.cfg`:

```
[greet]
The old priestess looks up as you approach.
Text: Ask about the ritual | Transition: ritual_info
Text: I'm ready | Condition: HasItem, RitualCandle, 3 | OverrideError: You need 3 Ritual Candles first. | Transition: ritual_start
Text: Never mind | Transition: greet_bye

[ritual_info]
The ritual requires three Ritual Candles, gathered from the old shrine.
Text: Back | Transition: greet

[ritual_start]
You light the candles. The air grows still.
Command: RemoveItem, RitualCandle, 3 | Command: PlaySound, ritual_chant, 0.8 | Command: GiveBuff, ritual_blessing | Transition: ritual_success

[ritual_success]
The blessing settles over you.

[greet_bye]
Safe travels.
```

Worth noting:

- The `Condition:` on "I'm ready" does not hide that reply — by default it still shows, greyed out, with the `OverrideError` text appended, until the player has 3 Ritual Candles. Add `AlwaysVisible: false` to the same reply if you would rather it disappear entirely instead. See [Dialogues](../configs/dialogues.md#when-a-condition-fails).
- `ritual_start`'s line has commands and a transition but no `Text:` — it runs its commands and moves on right away, without ever showing as a clickable reply. Any reply line with actions but no visible text behaves this way.

## Running something silently on approach

To play a sound, or run any command, the moment a player opens the conversation or walks into range — without it appearing as a clickable option — prefix the line with `@interaction`, `@inrange`, or `@outrange`:

`Configs/Dialogues/greet.cfg`:

```
[greet]
The old priestess looks up as you approach.
@inrange | Command: PlaySound, ambient_chime, 0.3
Text: Ask about the ritual | Transition: ritual_info
```

See [Dialogues](../configs/dialogues.md#silent-triggers-no-visible-reply).

## Random outcomes

Use `RandomTransition` to jump to one node picked at random, or `RandomCommand` to give a command its own independent percent chance of firing:

```
Text: Search the shrine | RandomCommand: 70, GiveItem, Coins, 5 | RandomCommand: 15, GiveItem, Ruby, 1
```

This is a 70% chance of Coins and a *separate* 15% chance of a Ruby — the two rolls do not exclude each other, so a lucky player can get both. See [Commands](../concepts/commands.md#random-outcomes) for how to get an exactly-one-of-several outcome instead.

## Adding an extra branch

To extend this example with a second path — say, an intimidation option that skips the candle requirement but costs health:

```
Text: "Force the ritual" | Command: Damage, 20 | Transition: ritual_start
```

Add this as another reply under `[greet]`, and now players have two ways to reach the same outcome, one safe and slow, one risky and fast.

## Related

- [Conditions](../concepts/conditions.md), [Commands](../concepts/commands.md) — the full vocabulary used above.
- [Custom Spawn Data](../configs/custom-spawn-data.md) — for attaching extra data to a `GiveItemWithData`/`SpawnWithData` command.
- [Dialogue patterns](dialogue-patterns.md) — more small worked examples: proximity triggers, menu handoffs, weighted rewards, password gates.
