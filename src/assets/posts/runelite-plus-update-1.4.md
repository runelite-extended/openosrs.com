> As always, we appreciate the staff for their efforts this week. Also, a special mention to the following users who have contributed on github this week: Lyzrds, Nagi, Loudpacks, icyredstar, xperiaclash, ocekyled, farhan1666, SRLJustin, sunha7, se7enAte9, and tomcylke. We are delivering a hurtful blow to P2W clients with every update, and every new user.


## RuneLitePlus 1.4

- Impling jar menu entry swapper so you dont open more jars than needed if you have a cluescroll in your bank.
- MenuEntrySwapper has been reworked to look cleaner with grouping.
- Easyscape has been merged into Menu Entry Swapper.
- MenuModifier has been merged into Menu Entry swapper.
- Scammer list Added to highlight in CC and trade chat if they are a known scammer. uses lists from We do Raids, WDR, RuneWatch.
- Freeze timers have been fixed.
- FPS Slider bar has been adjusted to allow you to go down to 1 FPS, previous limit was 10 FPS Minimum.
- [Chamber of Xerics](https://github.com/runelite-extended/runelite/wiki/CoX-Helper) has been re-worked to work with the reduced functionality client.
- Added ability to automatically screenshot friend and cc deaths.
- Debugging has been removed from certain plugins to reduce console spam.
- Added custom client updatecheck mode to easily load from file
- When scrolling through a huge plugin configuration, it now remembers your scrollbar instead of reverting back to the top of the configuration.
- Configuration manager reworked to allow 1 plugin turn off another plugin.
- DC scouter updated to work with new gamepack.
- Config parsing added, advising if you have correctly input the correct method for text field values i.e. construction build/removed.
- Hide prayers has been consolidated into 1 plugin (swap/hide prayers) instead of being in 3 seperate plugins. if you enable a PVM prayer, it will disable every other config option, same with PVP and individual prayers. this is by design and to stop conflict.
- Eternal slayer ring has been added to Menu Entry Swapper
- Player indicators colourized menu turned off by default.
- XP Drop plugin has been fixed to show you the hit next to the XP Drop, this will no longer error upon enabling the plugin.
- Theiving plugin has been re-worked to not trigger farming patches (oops!).
- Fixed a flicker caused by a string option having multiple lines in config.
- [Hydra](https://github.com/runelite-extended/runelite/wiki/Alchemical-Hydra) has been fixed and now works as expected.
- Null point exception error fixed when entering the crypt at barrows.
- Added an option for hiding certain tooltips to the mouse highlight plugin.
- COX had a complete overhaul on the config, allowing for greater customization. it has also had many, many bug fixes. Additional features have been added to, these include: Tekton Tick Tracker, Vanguards Highlight Overlay and HP Counter, and Olm Teleport Targets and Solo Targets (huge shoutout to Ganom on this one).
- Menu entry swapper for Construction is now working correctly (wooo!).
- Additional object indictators configuration options have been added.
- Pker notifier is now turned off by default.
- Highlight friends is now turned off by default.
- Highlight team members is now turned off by default.
- Show clan ranks is now turned off by default.
- Highlight callers is now turned off by default.
- Max Hit plugin has now had its description updated to be more user friendly.
- Zulrah plugin has now had its description updated to be more user friendly.
- Added CLI SOCKS5 proxy support. Usage: --proxy ip:port:user:pass | ip:port.
- Music track unlock indication plugin added, this will add a chat message if you unlock a new music track.
- Theatre of Blood has had a overhaul and is now more effective.
- combat counter added. this will count the amount of perfect combat ticks performed by each player.
- Spawn timer has been added. this will show an NPC'S time since it spawned.
- Pyramid Plunder bug fixes. this plugin now works as expected.

## RuneLite 1.5.24.1
```
Adam (6):
      quest list plugin: fix removing widets on shutdown
      xtea service: fix bulk query returning duplicates
      clanchat plugin: add clan tab chat option
      client: fix spec bar not updating with hide auto retaliate on
      spec counter: ignore non attacakble npcs
      clue plugin: update Hosidius clue hint from rework

Austin Bryant (1):
      cooking plugin: fix wine fermentation timer to begin at appropriate time

Cistoran (1):
      worldmap: update Xeric's Glade teleport location

Hexagon (1):
      clue plugin: add stash unit built status to emote clue overlay

Hydrox6 (2):
      clues: add support for beginner maps
      Fix Hosidius Easy Cryptic clue after rework (#8940)

Jacky Liang (1):
      Add camulet teleport icon to worldmap (#8934)

Jared N (1):
      menu swapper: add Hardwood Grove menu swap option

Jordan Atwood (3):
      PluginManagerTest: Ensure config keyNames are not duplicated
      plugins panel: Add wiki link to name labels
      attack styles: Attach spec bar redraw listener to weapon text

Max Weber (5):
      runelite-api: Correct WallObject documentation
      mixins: Correct WallObject's clickbox
      mixins: Correct DecorativeObject's clickbox
      timetracking: Update farming patches for the Hosidius rework
      timetracking: Don't crash when seeing a garbage varbit value

Tomas Slusny (1):
      Add support for center label to ProgressBarComponent

achencoms (1):
      client: add music list plugin and search filter

osrs-music-map (1):
      chat filter: add options to filter friends and clan members

seandewar (1):
      opponentinfo: add option to show both hp value and percent

xDemoN (1):
      Fix amulet of fury spelling error in ItemMapping.java (#8885)
```
