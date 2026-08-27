# Changelog

The mod's own version history, 67 versions from 8.4.0 through 9.8.9.

This documentation covers **9.8.9**, the top entry below. If your server is running an older version, some fields, flags, or quest types described elsewhere may not exist yet for you — check the entry for your version and everything above it.

---


## [9.8.9]

**Bug fixes:**
- `KillAndCollect`'s level field now matches `Kill`'s — see [Migrations](migrations.md).
- `PlayerHasOneOfCustomDataKeys` fixed for bool/int/string — see [Known gaps](known-gaps.md).
- `GiveBuff` duration cap changed from `1`s to `0` — see [Known gaps](known-gaps.md).

## [9.8.8]
- Fixed Saved NPCs model not showing up when building presets with hammer
- UI / UX improvements
- Bugfixes
- Quest Events now may contain conditions similar to Dialogues
- Added RandomNpcSpeech.yml file and system
- Added a new patrol feature to use Navigation Mesh for NPCs
- Now while holding Marketplace Hammer you can press + (= keyboard button) to create spot for NPC to patrol. On pressing Enter to confirm the patrol data will be saved to your clipboard
- Added tooltips for NPC UI
- Added Volume param into PlaySound dialogue command, also now by adding @number to sound in npc fashion UI it will change sound volume
- You can now add @Prefab to NPC prefab override to change its animator to another creature. Example: Player@Morgen will use player model with Morgen animator
- Added autocomplete for some NPC UI features
- Added hotpath cache for ForceBiome

## [9.8.7]
- Added an ability to use specific Territory / Trader configs depending on current server time
- UI / UX improvements
- **BEFORE INSTALLING THIS VERSION TEST IT FIRST ON LOCAL CLIENT CAUSE LOTS OF QUEST SYSTEM CHANGES. IF YOU HAVE QUESTS ALREADY ON SERVER THEY MAY BREAK**

## [9.8.6]
- Microoptimizations + some fancy UI/UX improvements
- You can now cancel quests in quest journal (J)
- Quest Journal can now be closed with same button as opened (J)
- Added two new quest types (in beta)
- **BEFORE INSTALLING THIS VERSION TEST IT FIRST ON LOCAL CLIENT CAUSE LOTS OF QUEST SYSTEM CHANGES. IF YOU HAVE QUESTS ALREADY ON SERVER THEY MAY BREAK**

## [9.8.5]
- Fixed blaxxun's guild mod interactions for quests

## [9.8.3]
- Meh

## [9.8.1]
- Bugfixes

## [9.8.0]
- Faction system bugfix with not being able to shutdown game

## [9.7.9]
- Faction chat (/f) added
- Faction chat added to KGchat as separated /faction toggle
- Added synced option to add X Y offset to faction nameplate
- Added new options to faction .yml, such as remove same faction damage between players
- Bugfixes

## [9.7.8]
- Small bug fix with new faction system

## [9.7.7]
- Added new system: Factions (in test mode rn)
- Bugfixes

## [9.7.6]
- Custom data folder changed
- Guide on website for dialogues updated with new features

## [9.7.5]
- Fixed a bug with not being able to log out of the game

## [9.7.3-9.7.4]
- Bugfixes

## [9.7.2]
- Lots of new features that im too lazy to write about...

## [9.7.1]
- Fixed Quest / ServerInfo <image> tags not working

## [9.7.0]
- New Valheim Update

## [9.6.0]
- Main wiki site updated
- New Dialogue keyword: OverrideError. Allows you to override error on condition fail
- Fixed a bug with trader / quest SkillEXP logout problem

## [9.5.9]
- Fixed Transmog preview UI being behind transmog UI itself
- Fixed talk quest completion also opening UI with same click

## [9.5.8]
- Bugfix

## [9.5.6-9.5.7]
- Chat shout fix

## [9.5.5]
- New Quest Reward: Random Item
- Bugfixes

## [9.5.2-9.5.4]
- Bugfixes (again)

## [9.5.1]
- Bugfixes

## [9.5.0]
- New Quest type: Move
- There is now a way to transfer Quest completion from one NPC to another. A.k.a you take Quest from npc A but can only finish it with npc B
- New dialogue feature: RandomTransition
- New Quest Event: OnDeath

## [9.4.7]
- Added %playername% to dialogue text that auto-replaced on Player Name

## [9.4.6]
- DB fixes

## [9.4.5]
- DB fixes

## [9.4.4]
- Fixed Banker withdraw error

## [9.4.3]
- Bugfixes (again)

## [9.4.2]
- Bugfixes (again)

## [9.4.1]
- Bugfixes

## [9.4.0]
- Updated for new valheim patch
- Spawn MarketplaceHammer to place npcs
- **Before installing this version please revert to old one and withdraw all Trade Post items / Banker items / Mail items. Marketplace moved from using .json data files to one single LiteDB file**

## [9.3.3]
- Fixed a bug where marketplace would increase Cooking skill food values

## [9.3.2]
- Please note that all NPC's moved to separated hammer: MarketplaceHammer

## [9.3.1]
- Updated for Ashlands

## [9.2.9]
- Its not a real version. Just a keep alive update for current NON-PTB valheim patch. Waiting for Ashlands to release so i can update one more time with patchnotes

## [9.2.3]
- Added new quest event: OnQuestTimeout
- Now all quest event commands are shareable with dialogue commands
- Added and fixed some commands and mechanics

## [9.1.8 - 9.2.2]
- Fixes

## [9.1.7]
- Added compatibility with AUGA tooltips (quests, traders)
- Added NPC Pin Icon inputfield to NPC UI. Pin Icon can be any item/piece or cachedimages folder file

## [9.1.6]
- Fixed a bug where KGchat would prevent pings from showing on map

## [9.1.5]
- Updated for new Valheim version

## [9.1.4]
- Fixed trader ToBank button
- Fixed Territories owner list not working

## [9.1.3]
- Added MHLevelMore and MHLevelLess condition
- Few fixes

## [9.1.2]
- Fixed small bug with quests conditions

## [9.1.1]
- Added more GuildsAPI methods
- Fixed territories priorities bug
- Added more localization for lootboxes

## [9.1.0]
- Fixed for new Valheim version
- Added new system: Lootboxes
- Added new chat options
- Added trader button to use items directly from banker / to banker
- Removed pinned NPC and added that as UI option
- Added various blaxxun's Guilds API to quest/dialogue conditions and commands
- Added Dialogues to Distanced UI
- Removed battlepass
- Removed any possible "vip list" (distanced ui, IsVip condition, marketplace taxes)

## [9.0.14]
- Fixed Pinned NPC not being displayed on map on dedicated server
- Added new dialogue/quest condition: IronGateStatMore/Less
- CustomValues now may have icons

## [9.0.13]
- Added more info when config not being able to be parsed
- New TerritoryFlag: GodMode

## [9.0.12]
- Fixed Gambler not working
- Added CustomValue to trader exchange

## [9.0.11]
- Fixed Territory data not being updated in runtime
- Added /mmapcontrol command to enable/disable NPC map control in debug mode

## [9.0.10]
- Fixed NPC not being able to place with hammer

## [9.0.9]
- Fixed NPC names showup
- Fixed NPC patrol bugs
- Fixed Teleporter not being synced at first load

## [9.0.8]
- Fixed WackyDB compatibility with modules
- Removed transmogrification VFX's due to non-readable mesh
- Removed all NPC models except default one, will later add skeleton/portal/questboard back as separated mod

## [9.0.7]
- Fixed CLLC compatibility with craft quest hook

## [9.0.6]
- Fixed configs subfolders not working with runtime save

## [9.0.5]
- Fixed compatibility with other PieceManager mods that blocked showing category

## [9.0.4]
- Fixed Groups compatibility

## [9.0.3]
- Fixed QuestEvents breaking config sync
- Added new Dialogue Action: EnterPassword

## [9.0.2]
- Fixed scroll wheel camera in all UI's

## [9.0.1]
- Small hotfix: Fixed player being naked in menu and added new config for adminlist

## [9.0.0]
- Reworked all marketplace folders and how configs applied
- Added Transmog Color choice + Item Preview button
- Now if you have debug mode it allows you to control NPCs from Map window. Left click = Main UI, Right click = Fashion UI
- New territory flags: ForceWind + DropMiltiplier (replaced NoCreaturesDrop), territory optimizations
- Added mclearallquests + mclearquest commands for admins to remove quest data for other player
- Added mcustomvalues command to show custom values saved in player
- Added new dialogue conditions / actions: AddCustomValue, SetCustomValue, CustomValueLess, ModInstalled / More
- Trader now has new feature to add result items directly to bank if there is a posibility for it
- Reworked leaderboard to allow it to be per steamid+_playername instead of just steamid bind
- Reworked NPC Save / Load. Now its done via separated hammer Menu and .cfgs can be shared to other people much easily now. Saved npcs now also contain MAIN data as profile/model/dialogue/name
- Fixed playertags to only affect visual name of player but not actual name (groups / other mods compatibility)
- Battlepass removed due to CustomValue features
- Added some debug tools for F2 menu (mostly for myself but maybe it'll be handy for server admins)
- Serverside MapPins folder was removed, use clientside CachedImages now

## [8.7.0]
- Leaderboard system added with custom Achievements system
- Added players tag system
- Traders now can sell Skill EXP
- Added new folder: AdditionalConfigs with Quests/Dialogues/Territories folders where you can put additional .cfg files for corresponding NPC type (so you don't flood your main config file and split / manage it better)
- Added Color attribute to dialogues
- Added new dialogues commands / conditions
- Added <image=link> tag for server info
- Now if server info tag named [OnPlayerFirstSpawn] it will show UI when player first joins server
- Bugfixes / optimizations
- Transmogrification is now a free feature
- Added Transmog to DistancedUI
- Now you can use ! sign before dialogue condition to simply reverse it
- Added gradients for Territory System colors

## [8.6.3]
- Posted / updated NPC Dialogues + Territory System guides on site
- Added config option to specify banker interest items (All by default)
- Added config option to set mailbox item wait time
- Fixed gambler code
- Now working with wackydb 2.0 (beta) cloned items

## [8.6.0]
- New system added: Mailbox
- Finished NPC Dialogues system
- Bugfixes
- Fixed Banker interest not working
- Now Marketplace can use SOME of its features locally on client (to enable set config option to true on clientside)
- New Quest Restriction - Time: value, allows quest to be time limited
- Added NPC font support for chinese symbols and other languages special symbols

## [8.5.0]
- New system added: NPC Dialogue (guide soon)
- New system added: Item Mocking (guide soon)
- Fixed banker multiplier bug
- Fixed KGchat text overflow

## [8.4.0]
- Player Territories removed. Please do not install this version until you replace Player Territories module on something else (Azumatt wards / e.t.c) (TerritoryDatabase is same and working, just not the players one)
- Added KGchat as part of marketplace. Its enabled by default but you can turn it off in Main config on serverside. You can replace KGchat emojis in BepInEx/Config/MarketplaceEmojis. You will find spritesheet_original.png there, change pics on what you need and rename it to spritesheet.png
- Added 2 new fields to fashion UI: Periodic Sound + Periodic Sound Time
- Added new quest event: NpcText
- Optimized mod by rewriting it almost from scratch. The mod's source is now open for anyone to review.
- Added an integration for territories so other mods may use it.
- NPC's now won't show up in hammer menu if Debug Mode is turned off
- Transmogrification system access has changed (now transmogrification is a separated DLL). If you bought Transmog access before this patch please contact me in discord KG#7777 so i can send you mod to enable Transmog

