# Guide: quest chains

How to link several quests into a story sequence, where each quest only unlocks once the one before it is finished — no special "chain" feature needed, just the ordinary [condition language](../concepts/conditions.md).

## The pattern

Each quest after the first requires `QuestFinished` on the quest before it, in its unlock requirements line. The very first quest in the chain is left with no requirements, so it is available immediately.

`Configs/Quests/chain.cfg`:

```
[chain_1]
Talk
Meet the Elder
Introduce yourself to the village elder.
"Village Elder"
Item: Coins, 10
0

[chain_2]
Kill
Prove Yourself
Kill 5 wolves to prove your worth.
Wolf, 5
Item: Coins, 50
0
QuestFinished, chain_1

[chain_3 = Autocomplete]
Kill
The Final Test
Defeat the pack leader.
AlphaWolf, 1, 3
Item: Coins, 200 | Skill_EXP: Swords, 100
0
QuestFinished, chain_2
```

Here, `chain_2` only unlocks after `chain_1` is turned in, and `chain_3` only after `chain_2`. Any NPC that has all three quests in its profile will show them one at a time, in order, as the player progresses.

## Hiding upcoming links

By default, once `chain_1` is available, `chain_2` and `chain_3` show up too — just greyed out with "locked" text, since the player can see what is coming. If you would rather hide a link entirely until it unlocks, tag its header `HiddenOtherQuestCondition`:

```
[chain_2 = HiddenOtherQuestCondition]
```

Now `chain_2` will not appear in the quest list at all until `chain_1` is complete.

## Ending a chain with a boss fight

Tag the final quest `Autocomplete` (as in `chain_3` above) so it completes the moment its objective is met, without requiring the player to walk back and talk to anyone — good for a chain that ends in defeating a boss where returning to turn in the quest would feel anticlimactic.

## Reacting to each step

Use [Quest Events](../configs/quest-events.md) alongside a chain to script what happens at each transition — spawning the next fight's enemy the moment the previous quest completes, rather than waiting for the next one to be accepted:

`Configs/QuestEvents/chain_2.cfg`:

```
[chain_2]
OnCompleteQuest: Spawn, AlphaWolf, 1, 3
```

## Keeping chains organized

There is no requirement about file order or which file a quest lives in — `QuestFinished` is what actually links them. That said, keeping one chain's quests together in one file, in narrative order, makes them much easier to read and maintain later.

## Related

- [Quests](../configs/quests.md), [Conditions](../concepts/conditions.md), [Quest Events](../configs/quest-events.md).
- [First quest](first-quest.md) — the basics, if you have not built a quest yet.
