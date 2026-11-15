# API reference

Every call and type in the interface file [API.cs](API.cs), in one place. For a walkthrough with examples, read [Integrate your mod](your-mod.md) first.

All of it lives in the static class `Marketplace_API`. The calls look Marketplace up by reflection, run on the player's client, and do nothing (or return `false`) when Marketplace is not installed.

## Quick reference

| Call | Returns | Purpose |
|---|---|---|
| `IsInstalled()` | `bool` | Whether Marketplace was found. |
| `RegisterQuestReward(name, displayName, give, icon, description)` | | Add a quest reward. |
| `RegisterDialogueCondition(name, check)` | | Add a dialogue and quest condition. |
| `RegisterDialogueCommand(name, command)` | | Add a dialogue and quest-event command. |
| `RegisterGroupHandler(getMembers)` | | Provide the player's party. |
| `RegisterGroupChatCommand(chatCommand)` | | Set the KG Chat command for group mode. |
| `RegisterGuildHandler(chatCommand, getCurrentGuildName, registerOnGuildChanged)` | | Provide the player's guild. |
| `IsPlayerInsideTerritory(out name, out flags, out additionalFlags)` | `bool` | Is the local player inside a territory. |
| `IsObjectInsideTerritoryWithFlag(go, flag, out name, out flags, out additionalFlags)` | `bool` | Is a `GameObject` inside a territory that has the flag. |
| `IsPointInsideTerritoryWithFlag(pos, flag, out name, out flags, out additionalFlags)` | `bool` | Same for a `Vector3`. |
| `ResetTraderItems()` | | Refresh traders' stock. |
| `OpenQuestJournal()` | | Open the quest journal. |
| `zdo.SET_NPC_*(...)`, `zdo.GET_NPC_*()` | | Write and read [NPC settings](#npc-settings). |

## Registering content

Call each registration once, early, in your plugin's `Awake`. Names are case-insensitive. Text from config files arrives with spaces removed and may not contain `,`, `|` or `:`.

### `RegisterQuestReward`

```csharp
void RegisterQuestReward(string name, string displayName, Action<string[]> give,
                         Sprite icon = null, Func<string[], string> description = null)
```

Adds a reward used in quest files as `name: arg1, arg2, ...`.

| Parameter | Meaning |
|---|---|
| `name` | The name admins write. |
| `displayName` | Readable text shown to players instead of `name`. Falls back to `name` when empty. |
| `give` | Receives the arguments (without the name) and runs on the player's client when the quest is completed. |
| `icon` | Optional. Shown in the quest window; a default icon is used otherwise. |
| `description` | Optional. Returns the text for the reward list and tooltip for the given arguments. Falls back to the arguments joined with `, `. |

A reward name that nobody registered shows a red `Wrong reward 'name'` and gives nothing.

### `RegisterDialogueCondition`

```csharp
void RegisterDialogueCondition(string name, Func<string[], (bool met, string error)> check)
```

Adds a condition used as `name, arg1, arg2` in dialogues and quests. `check` receives the arguments (without the name) and returns whether the condition is met, plus the text shown to the player when it is not. A condition nobody registered always fails.

### `RegisterDialogueCommand`

```csharp
void RegisterDialogueCommand(string name, Action<string[]> command)
```

Adds a command used as `name, arg1, arg2` in dialogue options and quest events. `command` receives the arguments (without the name) and runs on the player's client. A command nobody registered is logged and does nothing.

### `RegisterGroupHandler`

```csharp
void RegisterGroupHandler(Func<List<long>> getMembers)
```

`getMembers` returns the peer ids (ZDOMan session ids) of everyone in the local player's group, including the local player. Marketplace uses it to share quest kill progress.

### `RegisterGroupChatCommand`

```csharp
void RegisterGroupChatCommand(string chatCommand)
```

Optional. The chat command that switches KG Chat to group mode and sends group messages, for example `"/p"`. Without it KG Chat uses `/p`.

### `RegisterGuildHandler`

```csharp
void RegisterGuildHandler(string chatCommand, Func<string> getCurrentGuildName,
                          Action<Action> registerOnGuildChanged)
```

| Parameter | Meaning |
|---|---|
| `chatCommand` | The chat command that switches KG Chat to guild mode and sends guild messages, for example `"/g"`. |
| `getCurrentGuildName` | Returns the local player's guild name, or `null` or an empty string when there is none. Used by the `OnlyForGuild` territory flag. |
| `registerOnGuildChanged` | Receives a callback that you must invoke whenever the local player joins or leaves a guild. |

Also invoke that callback when the player's guild is first loaded (after spawn, or after guild data arrives from the server). Otherwise territories cache the "not in a guild" result and guild-only territories stay locked until the next join or leave.

## Territories

```csharp
bool IsPlayerInsideTerritory(out string name, out TerritoryFlags flags,
                             out AdditionalTerritoryFlags additionalFlags)

bool IsObjectInsideTerritoryWithFlag(GameObject go, TerritoryFlags flag, out string name,
                                     out TerritoryFlags flags, out AdditionalTerritoryFlags additionalFlags)
bool IsObjectInsideTerritoryWithFlag(GameObject go, AdditionalTerritoryFlags flag, ...)

bool IsPointInsideTerritoryWithFlag(Vector3 pos, TerritoryFlags flag, ...)
bool IsPointInsideTerritoryWithFlag(Vector3 pos, AdditionalTerritoryFlags flag, ...)
```

All of them return `true` when the player, object or point is inside a territory that has the flag, and report that territory's name and its full flag sets. `IsPlayerInsideTerritory` returns `true` when the player is inside any territory. Each call has an overload for both flag enums.

Both enums are `[Flags]`. The interface file ships a commented-out `HasFlagFast` helper; you can uncomment it, or test with `(flags & flag) != 0`.

### Territory flags

`TerritoryFlags` (see [Territories](../configs/territories.md) for what each does):

| Flag | Bit |
|---|---|
| `PushAway` | 0 |
| `NoBuild` | 1 |
| `NoPickaxe` | 2 |
| `NoInteract` | 3 |
| `NoAttack` | 4 |
| `PvpOnly` | 5 |
| `PveOnly` | 6 |
| `PeriodicHeal` | 7 |
| `PeriodicDamage` | 8 |
| `IncreasedPlayerDamage` | 9 |
| `IncreasedMonsterDamage` | 10 |
| `NoMonsters` | 11 |
| `CustomEnvironment` | 12 |
| `MoveSpeedMultiplier` | 13 |
| `NoDeathPenalty` | 14 |
| `NoPortals` | 15 |
| `PeriodicHealALL` | 16 |
| `ForceGroundHeight` | 17 |
| `ForceBiome` | 18 |
| `AddGroundHeight` | 19 |
| `NoBuildDamage` | 20 |
| `MonstersAddStars` | 21 |
| `InfiniteFuel` | 22 |
| `NoInteractItems` | 23 |
| `NoInteractCraftingStation` | 24 |
| `NoInteractItemStands` | 25 |
| `NoInteractChests` | 26 |
| `NoInteractDoors` | 27 |
| `NoStructureSupport` | 28 |
| `NoInteractPortals` | 29 |
| `CustomPaint` | 30 |
| `LimitZoneHeight` | 31 |

### Additional territory flags

`AdditionalTerritoryFlags`:

| Flag | Bit |
|---|---|
| `NoItemLoss` | 0 |
| `SnowMask` | 1 |
| `NoMist` | 2 |
| `InfiniteEitr` | 3 |
| `InfiniteStamina` | 4 |
| `DropMultiplier` | 5 |
| `ForceWind` | 6 |
| `GodMode` | 7 |
| `OnlyForGuild` | 8 |
| `CustomJereSpawner` | 9 |
| `JoinOtherServer` | 10 |
| `RevealOnMap` | 11 |
| `OnlyForFaction` | 12 |
| `ZoneMusic` | 13 |

## Actions

| Call | Effect |
|---|---|
| `ResetTraderItems()` | Refreshes the stock of traders. |
| `OpenQuestJournal()` | Opens the quest journal. |

## NPC settings

Each NPC setting is stored on the NPC's `ZDO`. The interface file adds an extension method pair for every setting, `SET_NPC_<Setting>` and `GET_NPC_<Setting>`; see [NPC system](../npc/npc-system.md) for what the settings mean.

| Setting | Setter parameter | Getter returns | Meaning |
|---|---|---|---|
| `Type` | `API_NPCType` | `API_NPCType` | The NPC type, see the list below. |
| `Profile` | `string` | `string` | Which profile this NPC uses, from the folder matching its type (default `default`). |
| `Model` | `string` | `string` | Model or prefab override. |
| `Name` | `string` | `string` | Display name override; can be a `$key` localization key. |
| `Dialogue` | `string` | `string` | Dialogue ID. |
| `PatrolData` | `string` | `string` | Patrol route text, see [Patrol routes](../npc/npc-system.md#patrol-routes). |
| `UseNavMesh` | `int` | `Pathfinding.AgentType` | Path-finding agent type (`Pathfinding.AgentType` on read, its integer value on write). |
| `LeftItem` | `string` | `string` | Item worn or held in the left slot (prefab name). |
| `RightItem` | `string` | `string` | Item worn or held in the right slot (prefab name). |
| `HelmetItem` | `string` | `string` | Item worn or held in the helmet slot (prefab name). |
| `ChestItem` | `string` | `string` | Item worn or held in the chest slot (prefab name). |
| `LegsItem` | `string` | `string` | Item worn or held in the legs slot (prefab name). |
| `CapeItem` | `string` | `string` | Item worn or held in the cape slot (prefab name). |
| `HairItem` | `string` | `string` | Hair item (prefab name). |
| `HairColor` | `string` | `string` | Hair colour. |
| `LeftItemBack` | `string` | `string` | Item shown on the NPC's back, left side (prefab name). |
| `RightItemBack` | `string` | `string` | Item shown on the NPC's back, right side (prefab name). |
| `InteractAnimation` | `string` | `string` | Animation played on interaction. |
| `GreetingAnimation` | `string` | `string` | Animation played when a player approaches. |
| `ByeAnimation` | `string` | `string` | Animation played when a player leaves. |
| `GreetingText` | `string` | `string` | Text shown on greeting. |
| `ByeText` | `string` | `string` | Text shown on farewell. |
| `SkinColor` | `string` | `string` | Skin colour. |
| `CraftingAnimation` | `string` | `string` | Animation played while crafting. |
| `BeardItem` | `string` | `string` | Beard item (prefab name). |
| `BeardColor` | `string` | `string` | Beard colour. |
| `InteractSound` | `string` | `string` | Sound played when a player interacts. |
| `TextSize` | `string` | `float` | Size of the floating text (default 3). |
| `TextHeight` | `string` | `float` | Height of the floating text (default 0). |
| `PeriodicAnimation` | `string` | `string` | Animation played on a timer. |
| `PeriodicAnimationTime` | `string` | `float` | Seconds between periodic animations. |
| `PeriodicSound` | `string` | `string` | Sound played on a timer. |
| `PeriodicSoundTime` | `string` | `float` | Seconds between periodic sounds. |
| `NPCScale` | `string` | `float` | NPC scale (default 1). |
| `IsPinned` | `bool` | `bool` | Whether the NPC is pinned on the map. |
| `PinIcon` | `string` | `string` | Map pin icon name; an empty string clears it. |
| `ShowCondition` | `string` | `string` | [Condition](../concepts/conditions.md) that decides whether the NPC is visible. |

Some settings take a `string` when written but return a `float` when read (`TextSize`, `TextHeight`, `NPCScale`, `PeriodicAnimationTime`, `PeriodicSoundTime`). Pass the number as text; a value that does not parse becomes the default.

### NPC types

`API_NPCType`: `None`, `Trader`, `Info`, `Teleporter`, `Feedback`, `Banker`, `Gambler`, `Quests`, `Buffer`, `Transmog`, `Marketplace`, `Mail`. See [NPC types](../npc/npc-system.md#npc-types).

## Related

- [Integrate your mod](your-mod.md), [Integrations overview](overview.md).
