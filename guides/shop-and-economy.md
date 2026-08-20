# Guide: shops, currency, and taxes

How the economy pieces fit together — currency, marketplace taxes, a fixed-price trader NPC, and banker interest — with a working example of each.

## Choosing currencies

`PossibleCurrencies`, in the [server config](../setup/server-config.md), lists every item usable as marketplace currency (just `Coins` by default). Add more to support several currencies side by side:

```ini
PossibleCurrencies = Coins, Ruby
```

If you misspell an item name here, it is silently dropped at startup rather than causing an error — double-check the exact item name if a currency you added does not show up.

## Marketplace taxes

Also in `MarketPlace.cfg`:

```ini
MarketTaxes = 5
VIPplayersTaxes = 2
VIPplayersList = 76561198000000001, 76561198000000002
ItemMarketLimit = 20
```

Regular players pay a 5% tax per sale; the two listed VIP players pay only 2%; everyone can list up to 20 items at once.

## A fixed-price NPC shop

`Configs/Traders/general_store.cfg` (full format: [Traders](../configs/traders.md)):

```
[general_store]
Wood, 10, Coins, 5
Coins, 50, SwordIron, 1, 2
Coins, 100, Ruby, 1 = SwordSilver, 1, 3
```

Two simple 1-for-1 trades, plus a multi-item trade: spend 100 Coins **and** 1 Ruby to get a level-3 Silver Sword.

To offer part of the stock only in the evening, put those trades in a scheduled folder instead — see [Scheduling a config to a time window](../concepts/time-windows.md):

```
Configs/Traders/18-00_23-00/evening_specials.cfg
```

## Banker interest

```ini
BankerIncomeTime = 6
BankerIncomeMultiplier = 0.02
BankerVIPIncomeMultiplier = 0.04
BankerInterestItems = Coins, Ruby
```

Every 6 hours, deposited Coins and Ruby earn 2% interest — 4% for VIP players. Set `BankerIncomeTime = 0` to switch off interest payouts entirely, without removing your banker NPCs.

Which items can be banked at all — separate from which ones earn interest — is set per profile in [Bankers](../configs/bankers.md):

`Configs/Bankers/main_bank.cfg`:

```
[main_bank]
Coins
Ruby
Amber
```

## A gamble-your-earnings NPC

`Configs/Gamblers/tavern_dice.cfg` (full format: [Gamblers](../configs/gamblers.md)):

```
[tavern_dice]
Coins, 20, Coins, 10-40, Wood, 20-50, Ruby, 1
```

Costs 20 Coins per roll; wins a random amount of Coins or Wood, or a Ruby.

## Putting it together

A simple economy loop for a server: players earn Coins from quests, sell surplus items to each other on the marketplace (paying tax), deposit savings with a banker for slow interest, and occasionally gamble spare Coins at the tavern dice NPC for a chance at rarer materials like Ruby. Each piece above is independent — turn on only the ones that fit the server you are running.

## Related

- [Server config](../setup/server-config.md), [Traders](../configs/traders.md), [Bankers](../configs/bankers.md), [Gamblers](../configs/gamblers.md), [Scheduling a config to a time window](../concepts/time-windows.md).
