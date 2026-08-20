# Guide: dialogue patterns

A handful of small, self-contained patterns for things that come up once you are past a first tree — proximity triggers, handing off to an NPC's normal menu, weighted rewards, a password gate, and quoting console commands. Format reference: [Dialogues](../configs/dialogues.md). If you have not built a tree yet, start with [A branching dialogue tree](dialogue-tree.md).

## Reacting to proximity without a visible reply

`@inrange` and `@outrange` fire once each, without ever showing as a clickable option — useful for ambience that should happen automatically as a player approaches or leaves. See [Silent triggers](../configs/dialogues.md#silent-triggers-no-visible-reply) for the full prefix list.

`Configs/Dialogues/guard_dialogue.cfg`:

```
[guard_dialogue]
Halt! State your business.
@inrange | Command: PlaySound, guard_alert, 0.5
@outrange | Command: PlaySound, guard_relax
Text: Just passing through | Transition: guard_bye
```

## Handing off to an NPC's normal menu

Setting a Dialogue on an NPC makes clicking it always open the dialogue instead of its normal Type-based menu (Trader, Banker, and so on) — see [Dialogues](../configs/dialogues.md). A common way around this: give the NPC a Dialogue purely so `@interaction` can redirect straight into its real menu with `OpenUI`, keeping that menu reachable:

`Configs/Dialogues/shopkeeper_redirect.cfg`:

```
[shopkeeper_redirect]
@interaction | Command: OpenUI, Trader, shopkeeper_stock
```

## Chaining commands before a risky line

`@interaction` can chain more than one command before anything else happens — for example dealing damage before opening a cursed dialogue, so a player who dies from the hit never sees the text at all:

`Configs/Dialogues/cursed_tome.cfg`:

```
[cursed_tome]
@interaction | Command: Damage, 5 | Command: OpenUI, Dialogue, cursed_tome_text
```

## Independent rolls vs a single random pick

Each `RandomCommand` on a reply rolls its own independent chance — this line can give the player none, some, or all three rewards, not exactly one of them:

`Configs/Dialogues/mystery_chest.cfg`:

```
[mystery_chest]
You found a strange chest. Open it?
Text: Open it | RandomCommand: 40, GiveItem, Coins, 10 | RandomCommand: 15, GiveItem, Ruby, 1 | RandomCommand: 5, GiveItem, TrophyWolf, 1
```

If you want exactly one of several outcomes instead — never more, never fewer — send the player to a different node per outcome with `RandomTransition`:

```
Text: Open it | RandomTransition: chest_coins, chest_ruby, chest_nothing, chest_nothing, chest_nothing
```

Listing a node more than once (`chest_nothing` three times here) is how you weight a `RandomTransition` — it becomes more likely to be the one picked, since every entry has an equal chance. See [Reply line fields](../configs/dialogues.md#reply-line-fields).

## A password-gated door

`EnterPassword` opens a text-entry popup and transitions to one of two nodes depending on whether the player typed the right word. Anything that should happen on success or failure — granting a key, teleporting, showing more text — goes on a reply *inside* the target node, not inside `EnterPassword` itself:

`Configs/Dialogues/vault_door.cfg`:

```
[vault_door]
A locked door blocks your path.
Text: Enter code | Command: EnterPassword, "Vault Access", 1234, vault_open, vault_denied

[vault_open]
The door swings open.
Text: Step through | Command: AddPlayerKey, vault_opened | Command: Teleport, 150, 32, 200

[vault_denied]
Incorrect code.
```

## Quoting console commands with spaces

`ConsoleCommand` runs anything you could type into the admin console yourself, with `{playername}` substituted for the local player's name. Since most console commands contain spaces, wrap the whole thing in quotes — see [Keeping literal spaces](../configs/dialogues.md#keeping-literal-spaces):

`Configs/Dialogues/admin_tools.cfg`:

```
[admin_tools]
What would you like me to do?
Text: Spawn a troll near me | Transition: admin_tools | Command: ConsoleCommand, "spawn Troll 1 2"
Text: Announce my arrival | Transition: admin_tools | Command: ConsoleCommand, "say {playername} has arrived!"
```

See the [caution on `ConsoleCommand`](../concepts/commands.md#a-caution-on-consolecommand) before using this in content you did not write yourself.

## Related

- [Dialogues](../configs/dialogues.md) — the full field and syntax reference these patterns build on.
- [Dialogue tree guide](dialogue-tree.md) — start here if you have not built a branching tree yet.
- [Conditions](../concepts/conditions.md), [Commands](../concepts/commands.md).
