# Integrate your mod

This page walks you through connecting your own BepInEx mod to Marketplace. You do not need to reference Marketplace's DLL: you copy one small file into your project, and it finds Marketplace at runtime. If Marketplace is not installed, every call quietly does nothing, so your mod keeps working without it.

For the exact signature of every call and type, see the [API reference](api-reference.md).

## What you can do

- **Give quest rewards, check conditions, run commands.** Register a name once, and server admins can write it in [quests](../configs/quests.md#reward-types), [dialogues](../configs/dialogues.md) and [quest events](../configs/quest-events.md) like a built-in one. A leveling mod, for example, can offer an experience reward and a level check.
- **Provide a party or a guild.** A group mod tells Marketplace who is in the player's party (shared kill progress). A guild mod tells it the player's guild (guild-only territories) and gets a chat command in KG Chat.
- **Read the world.** Ask whether the player or any point is inside a [Territory](../configs/territories.md) and which flags it has.
- **Read and change NPCs.** Every setting on an [NPC](../npc/npc-system.md) can be read or written from your code.
- **Trigger actions.** Refresh traders' stock or open the quest journal.

## Step 1: add the interface file

Download [API.cs](API.cs) and add it to your project. It contains one static class, `Marketplace_API`, with typed methods, enums and extension methods. Nothing else is needed. Its dependencies are `BepInEx`, `UnityEngine` and Valheim's own assemblies, which your mod already references.

The file looks Marketplace up by reflection once, the first time it is used. `Marketplace_API.IsInstalled()` tells you whether it was found.

## Step 2: register in `Awake`

Registration calls run on the player's client and should be made **once**, early, in your plugin's `Awake`. Declare a dependency on Marketplace (its plugin GUID is `MarketplaceAndServerNPCs`) so BepInEx loads it first; a soft dependency is enough, and the calls are safe when Marketplace is missing. Here is a small leveling mod that offers a reward, a command and a condition:

```csharp
using BepInEx;

[BepInPlugin("my.mod.marketplacebridge", "My Mod - Marketplace", "1.0.0")]
[BepInDependency("MarketplaceAndServerNPCs", BepInDependency.DependencyFlags.SoftDependency)]
public class MyBridge : BaseUnityPlugin
{
    private void Awake()
    {
        // Quest reward: "MyMod_EXP: 100"
        Marketplace_API.RegisterQuestReward(
            "MyMod_EXP", "My Mod EXP",
            args => MyMod.AddExp(ParseInt(args, 0)),
            description: args => $"+{ParseInt(args, 0)} experience");

        // Dialogue / quest-event command: "AddMyModExp, 100"
        Marketplace_API.RegisterDialogueCommand("AddMyModExp",
            args => MyMod.AddExp(ParseInt(args, 0)));

        // Condition: "MyModLevelMore, 10"
        Marketplace_API.RegisterDialogueCondition("MyModLevelMore", args =>
        {
            int need = ParseInt(args, 0);
            return (MyMod.Level >= need, $"Need level: <color=#00ff00>{need}</color>");
        });
    }

    private static int ParseInt(string[] args, int index) =>
        args.Length > index && int.TryParse(args[index], out int v) ? v : 0;
}
```

Now an admin can write `MyMod_EXP: 100` as a quest reward, `Command: AddMyModExp, 100` in a dialogue option and `Condition: MyModLevelMore, 10` to gate it.

## How names and arguments work

- Names are matched case-insensitively. Pick a distinctive prefix so your names cannot clash with Marketplace's own or another mod's.
- A reward is written `name: arg1, arg2`, a command or condition `name, arg1, arg2`. Your callback gets the arguments as a `string[]`, without the name.
- Spaces are removed from the whole line, so an argument cannot contain a space. An argument also cannot contain `,`, `|` or `:`. Parse defensively: the text comes from a config file.
- Conditions can be combined by the admin with `|` (AND) and `||` (OR), like any other condition.
- A condition returns `(met, error)`. When `met` is false, `error` is the text shown to the player. Colour values with `<color=#00ff00>...</color>` to match the built-in messages.
- A reward can supply `displayName`, an `icon` (a `Sprite`) and a `description` callback that builds the text shown in the quest window from the arguments. All three are optional.

## Parties and guilds

These two are not rewards or conditions but providers: you tell Marketplace something it asks for.

```csharp
// Group mod: who is in my party?
Marketplace_API.RegisterGroupHandler(() => MyGroupMod.GetMemberPeerIds()); // includes the local player
Marketplace_API.RegisterGroupChatCommand("/p");                           // optional, "/p" by default

// Guild mod: which guild am I in, and tell me when it changes
Marketplace_API.RegisterGuildHandler(
    "/g",
    () => MyGuildMod.CurrentGuildName,           // null or "" when not in a guild
    onChanged =>
    {
        MyGuildMod.OnJoined += onChanged;
        MyGuildMod.OnLeft += onChanged;
        // Also call onChanged once the player's guild has loaded (see below).
    });
```

`getMembers` returns the peer ids (the ZDOMan session ids) of everyone in the local player's group, including the player. With it Marketplace can share Kill-quest progress between party members (`AllowKillQuestsInParty` in [Server config](../setup/server-config.md)).

For guilds, invoke the callback you receive not only on join and leave, but **also when the player's guild is first loaded** (after spawn, or after guild data arrives from the server). Otherwise territories cache "not in a guild" and guild-only territories stay locked until the next join or leave.

## Territories

```csharp
if (Marketplace_API.IsPlayerInsideTerritory(out string name, out var flags, out var extra))
{
    if ((flags & Marketplace_API.TerritoryFlags.PvpOnly) != 0) { /* ... */ }
}

// Is this object inside a zone with a given flag?
bool noBuild = Marketplace_API.IsObjectInsideTerritoryWithFlag(
    gameObject, Marketplace_API.TerritoryFlags.NoBuild, out _, out _, out _);
```

Flags come in two enums, `TerritoryFlags` and `AdditionalTerritoryFlags`, and every call has an overload for each. Both are `[Flags]` enums covering every flag in [Territories](../configs/territories.md). The full list is in the [API reference](api-reference.md#territory-flags).

## NPCs

NPC settings live on the NPC's `ZDO`, and the interface file adds typed extension methods for them:

```csharp
ZDO zdo = npcObject.GetComponent<ZNetView>().GetZDO();

zdo.SET_NPC_Type(Marketplace_API.API_NPCType.Trader);
zdo.SET_NPC_Name("Old Merchant");
zdo.SET_NPC_Dialogue("welcome_dialogue");
zdo.SET_NPC_NPCScale("1.2");

string profile = zdo.GET_NPC_Profile();
float scale = zdo.GET_NPC_NPCScale();
```

Setters and getters exist for every field in [NPC system](../npc/npc-system.md). A few setters take a `string` where the matching getter returns a `float`; see [the table](api-reference.md#npc-settings).

## Things to keep in mind

- Everything here is client-side. Registered callbacks run on the player's machine.
- All calls are safe when Marketplace is not installed. Use `Marketplace_API.IsInstalled()` if you want to behave differently.
- If an admin writes a reward name nobody registered, the quest window shows a red `Wrong reward 'name'` and nothing is given. A command nobody registered is logged and does nothing; a condition nobody registered always fails.
- The [bridges](overview.md#bridges) are small real-world examples of everything above.

## Related

- [API reference](api-reference.md), [Integrations overview](overview.md).
- [Territories](../configs/territories.md), [NPC system](../npc/npc-system.md), [Conditions](../concepts/conditions.md), [Commands](../concepts/commands.md).
