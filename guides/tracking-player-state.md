# Guide: tracking player state with Custom Spawn Data

`SetPlayerData` and `PlayerHasAllCustomDataKeys` together give you a small, reusable way to remember something about a specific player and check for it anywhere later — a multi-step puzzle, a remembered story choice, anything that needs to persist without a full [Faction](../configs/factions.md) or a whole new [Quest](../configs/quests.md). Format reference: [Custom Spawn Data](../configs/custom-spawn-data.md).

## Example: a three-trial gate

`SetPlayerData` applies **every** field in a named set directly onto the player, and does not clear any fields left over from a *different* set applied earlier — so you can have several small data sets each stamp one flag, then check for all of them together later. This is a clean way to build a "complete several trials in any order" puzzle:

`Configs/CustomSpawnData/trial_fire_done.yml`:
```yaml
Bools:
  trial_fire: true
```

`Configs/CustomSpawnData/trial_ice_done.yml`:
```yaml
Bools:
  trial_ice: true
```

`Configs/CustomSpawnData/trial_stone_done.yml`:
```yaml
Bools:
  trial_stone: true
```

Each shrine's dialogue stamps its own flag on success:

```
Text: Step onto the fire rune | Command: SetPlayerData, trial_fire_done
```

`Configs/CustomSpawnData/all_trials.yml` lists the same three field names together, all expected `true`:

```yaml
Bools:
  trial_fire: true
  trial_ice: true
  trial_stone: true
```

The final door checks the player against that combined set — `PlayerHasAllCustomDataKeys` only passes once all three shrine flags are present and `true`, regardless of the order the player visited them in. Quote the failure message so its spaces survive — every field in a `Condition:` gets stripped of spaces otherwise, same as everywhere else in these config files:

```
Text: Push open the door | Condition: PlayerHasAllCustomDataKeys, all_trials, "You have not completed every trial yet." | Transition: inner_sanctum
```

## Example: a remembered dialogue choice

`SetPlayerData` is also a lightweight way to remember a one-time story choice without setting up a full [Faction](../configs/factions.md) for it. Say an NPC lets the player commit to one of two paths early on:

`Configs/CustomSpawnData/path_hunter.yml`:
```yaml
Strings:
  chosen_path: hunter
```

`Configs/CustomSpawnData/path_scholar.yml`:
```yaml
Strings:
  chosen_path: scholar
```

`Configs/Dialogues/path_choice.cfg`:

```
[path_choice]
Two roads lie before you. Which calls to you?
Text: The hunter's path | Command: SetPlayerData, path_hunter | Transition: path_confirmed
Text: The scholar's path | Command: SetPlayerData, path_scholar | Transition: path_confirmed
```

Any dialogue anywhere else in the world can now branch on that remembered choice. `PlayerHasAllCustomDataKeys` always needs its trailing message argument — even if you leave it blank, the comma must be there — and `AlwaysVisible: false` keeps the non-matching greeting from showing up greyed out next to the real one:

```
Text: A fellow hunter, then | Condition: PlayerHasAllCustomDataKeys, path_hunter, | AlwaysVisible: false | Transition: hunter_greeting
Text: Ah, a scholar | Condition: PlayerHasAllCustomDataKeys, path_scholar, | AlwaysVisible: false | Transition: scholar_greeting
```

## Related

- [Custom Spawn Data](../configs/custom-spawn-data.md) — the file format used above.
- [Conditions](../concepts/conditions.md), [Commands](../concepts/commands.md).
- [Dialogue tree guide](dialogue-tree.md) — the basics of branching dialogue, if you have not built one yet.
