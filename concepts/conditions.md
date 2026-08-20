# Conditions

Conditions are how you gate something behind a requirement — "only let the player click this dialogue option if they have 10 Wood", "only unlock this quest after finishing another one". The same condition language works in three places: [Dialogue](../configs/dialogues.md) options, [Quest](../configs/quests.md) unlock requirements, and [Quest Event](../configs/quest-events.md) triggers.

## Quick example

A dialogue option gated behind having 10 Wood and 5 Stone. By default it still shows, greyed out with the reason, until the player has both — see [Dialogues](../configs/dialogues.md#when-a-condition-fails) if you want it hidden instead:

```
Text: Sell your materials | Condition: HasItem, Wood, 10 | Condition: HasItem, Stone, 5 | Transition: sell_confirm
```

A quest that only unlocks after finishing an earlier one in the same chain:

`Configs/Quests/intro_quest.cfg`:

```
[intro_quest]
...
QuestFinished, meet_the_elder
```

## Syntax

`ConditionName, argument1, argument2` — the condition's name first, then its arguments, all comma-separated. Spaces around commas are fine (see [Config file syntax](config-syntax.md)).

**Negating a condition** — put `!` in front to flip it:

```
!HasItem, Wood, 10
```
means "does NOT have 10 Wood". Most conditions also have a ready-made opposite name (`HasItem` / `NotHasItem`) if you prefer that instead of `!`.

## Combining conditions: AND and OR

When a field holds more than one condition, two layers of logic apply:

- `|` between conditions means **AND** — every group must pass.
- `||` between conditions means **OR** — at least one alternative in that group must pass.

```
HasItem, Wood, 10 || HasItem, Stone, 10 | GlobalKey, defeated_bonemass
```

Reads as: **(**has 10 Wood **or** has 10 Stone**) and** has defeated Bonemass. Group your OR-alternatives together between `|`, and stack multiple `|` groups for a chain of AND requirements.

More examples:

```
# Require two separate things, both must be true
SkillMore, WoodCutting, 3 | HasItem, AxeFlint, 1

# Require any ONE of three items (a "pay with whatever you have" gate)
HasItem, Wood, 20 || HasItem, Stone, 20 || HasItem, Coins, 50

# Require finishing an earlier quest AND being a guild member
QuestFinished, chain_step_1 | HasGuild
```

## Reference: all conditions

| Condition | Arguments | What it checks |
|---|---|---|
| `HasItem` / `NotHasItem` | item, amount, [level] | Player has (or lacks) at least that many of an item, optionally at a specific quality level. |
| `HasBuff` / `NotHasBuff` | buff name | Player currently has (or lacks) a specific active buff. |
| `SkillMore` / `SkillLess` | skill, level | Player's skill level compares to a number. |
| `GlobalKey` / `NotGlobalKey` | key name | A world-wide flag is set — the same flags used by boss kills (`defeated_bonemass`, etc.) and other mods. |
| `HasQuest` / `NotHasQuest` | quest ID | Player currently has that quest accepted. |
| `QuestProgressDone` / `QuestProgressNotDone` | quest ID | That quest's objective is complete, whether or not it has been turned in yet. |
| `QuestFinished` / `QuestNotFinished` | quest ID | That quest has been completed and turned in — this is what quest chains use. |
| `EpicMMOLevelMore` / `EpicMMOLevelLess` | level | Player's EpicMMO level compares (only if that mod is installed). |
| `CozyheimLevelMore` / `CozyheimLevelLess` | level | Player's Cozyheim leveling level compares. |
| `RustyClassesLevelMore` / `RustyClassesLevelLess` | level | Player's RustyClasses level compares. |
| `HasAchievement` / `NotHasAchievement` | achievement ID | Player has earned a specific leaderboard achievement. |
| `HasAchievementScore` / `NotHasAchievementScore` | score | Player's total achievement score compares to a number. |
| `CustomValueMore` / `CustomValueLess` | key, value, [custom message] | Compares a [custom value](prefabs-and-assets.md#custom-values) you set yourself elsewhere. The optional third argument replaces the default failure message; use `{current}` and `{value}` inside it to show the numbers. |
| `ModInstalled` / `NotModInstalled` | mod ID | Whether another mod is installed on the server. |
| `IronGateStatMore` / `IronGateStatLess` | stat name, amount | Compares a built-in Valheim player stat. |
| `HasGuild` / `NotHasGuild` | — | Player is (or is not) in a guild. |
| `HasGuildWithName` / `NotHasGuildWithName` | guild name | Player's guild has a specific name. |
| `GuildLevelMore` / `GuildLevelLess` | level | Player's guild level compares. |
| `GuildHasAchievement` / `GuildNotHasAchievement` | achievement ID | Player's guild has earned a specific achievement. |
| `IsVIP` / `NotIsVIP` | — | Player is on the server's VIP list. |
| `HasPlayerKey` / `NotHasPlayerKey` | key name | Player has a personal flag previously set with the `AddPlayerKey` command — useful for tracking one-time story beats per player. |
| `NPCModelEquals` / `NotNPCModelEquals` | model name | The NPC in this dialogue currently uses a specific model. |
| `NPCNameEquals` / `NotNPCNameEquals` | name | The NPC in this dialogue currently has a specific display name. |
| `HasFaction` / `NotHasFaction` | faction key | Player belongs to a specific faction. |
| `HasAnyFaction` / `NotHasAnyFaction` | — | Player belongs to any faction at all. |
| `HealthMore` / `HealthLess`, `MaxHealthMore` / `MaxHealthLess` | value | Player's current/max health compares. |
| `StaminaMore` / `StaminaLess`, `MaxStaminaMore` / `MaxStaminaLess` | value | Player's current/max stamina compares. |
| `EitrMore` / `EitrLess`, `MaxEitrMore` / `MaxEitrLess` | value | Player's current/max eitr compares. |
| `PlayerHasAllCustomDataKeys` | data set name, message | Checks the player against a whole [custom data set](../configs/custom-spawn-data.md) — true only if every value in the set matches the player exactly. |
| `PlayerHasOneOfCustomDataKeys` | data set name, message | Checks the same way, but is true if the player differs from the data set on at least one value — despite the name, this is a "does not fully match" check, not a "has one of" check. Test it before relying on it for something important. |

## Related

- [Commands](commands.md) — what runs when a condition passes.
- [Dialogues](../configs/dialogues.md), [Quests](../configs/quests.md), [Quest Events](../configs/quest-events.md) — where conditions are used.
- [Prefabs and text markup](prefabs-and-assets.md) — custom values referenced above.
