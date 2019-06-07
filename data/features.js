const features = [
    {
      image: '1waysafespots',
      title: '1 Way Safe Spots',
      description: 'This will highlight the floor tiles safespots where you can stand and not get hit.',
      link: ''
    },
    {
      image: 'switch',
      title: 'Account Switcher',
      description: 'This will allow you to switch between accounts at the hit of a button.',
      link: 'https://github.com/runelite-extended/runelite/wiki/Account-Switcher'
    },
    {
      image: 'zoom',
      title: 'Alchemical Hydra',
      description: 'This will show you what to pray against the Alchemical Hydra.',
      link: ''
    },
    {
      image: 'zoom',
      title: 'Anti-Drag',
      description: 'Customisable antidrag which does not require you to hold down shift.',
      link: ''
    },
    {
      image: 'aoe',
      title: 'AoE Warnings',
      description: 'This will show you the projectiles of certain enemy attacks.',
      link: 'https://github.com/runelite-extended/runelite/wiki/Aoe-Warnings',
      home: true
    },
    {
      image: 'egg',
      title: 'Barbarian Assault+',
      description: 'Custom barbarian assault plugin, highlight eggs and a lot more.',
      link: 'https://github.com/runelite-extended/runelite/wiki/Barbarian-Assault-',
      home: true
    },
    {
      image: 'cox',
      title: 'Chambers of Xeric',
      description: 'Tick Timer for Olm, Overlays for all special attacks, and Olm Prayer Helper showing you what to pray.',
      link: 'https://github.com/runelite-extended/runelite/wiki/CoX-Helper'
    },
    {
      image: 'zoom',
      title: 'Clan Man Mode',
      description: 'Highlights targets your clan is attacking, and highlights clan members to easily differentiate them.',
      link: ''
    },
    {
      image: 'zoom',
      title: 'Easyscape',
      description: 'Bunch of menu entry swaps to make your life easier, for example 1 click construction.',
      link: ''
    },
    {
        image: 'equipmentinspector',
        title: 'Equipment Inspector',
        description: 'Look up player\'s equipment and show the vaule of the items.',
        link: ''
    },
    {
      image: 'zoom',
      title: 'Fight Cave',
      description: 'Fight cave wave helper, includes Jad helper.',
      link: ''
    },
    {
      image: 'zoom',
      title: 'Freeze Timers',
      description: 'Timers for Ice Barrage, TeleBlock, Vengeance displayed over players or NPCs.',
      link: ''
    },
    {
      image: 'zoom',
      title: 'Grotesque Guardians',
      description: 'Overlays for Grotesque Guardians, showing you where not to stand.',
      link: ''
    },
    {
      image: 'hideprayers',
      title: 'Hide Prayers',
      description: 'Hides certain prayers so you don\'t misclick.',
      link: ''
    },
    {
        image: 'zoom',
        title: 'Hydra Helper',
        description: 'Helps you do hydra by showing what not to stand in, and what to pray.',
        link: ''
    },
    {
        image: 'inventorysetups',
        title: 'Inventory Setups',
        description: 'Saves your inventory setups.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Kept on Death',
        description: 'Reworks the Items Kept on Death interface to be more accurate.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Learn to Click',
        description: 'A few modifications to prevent misclicks.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Lizard Shamans',
        description: 'Timer for lizardmen shaman add spawns.',
        link: ''
    },
    {
        image: 'flinchingtimer',
        title: 'Flinching Timer',
        description: 'Time your attacks while flinching',
        link: ''
    },
    {
        image: 'lootassist',
        title: 'Loot Assist',
        description: 'Creates a tile overlay with a timer that counts down to when the loot will appear to you.',
        link: ''
    },
    {
        image: 'maxhit',
        title: 'Max Hit',
        description: 'Shows you your max hit in equipment screen.',
        link: ''
    },
    {
        image: 'menumodifier',
        title: 'Menu Modifier',
        description: 'Removes unnecessary menu entries.',
        link: ''
    },
    {
        image: 'multilines',
        title: 'Multi-Lines',
        description: 'Shows you where multi-lines start and end for DMM. PVP worlds and the wilderness.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Music Track Customizer',
        description: '',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Player Indicators',
        description: 'Advanced player indicators for PKing.',
        link: ''
    },
    {
        image: 'playerinformation',
        title: 'Player Information',
        description: 'An alternative to the minimap orbs.',
        link: ''
    },
    {
        image: 'pluginorganizer',
        title: 'Plugin Organizer',
        description: 'This is what allows us to sort plugins, and give them color.',
        link: ''
    },
    {
        image: 'prayagainstplayer',
        title: 'Pray Against Player',
        description: 'Shows different prayers to use against players in PvP.',
        link: ''
    },
    {
        image: 'prayeralert',
        title: 'Prayer Alert',
        description: 'Alert the player when the prayer points are low.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Puro-Puro Impling Spawns',
        description: '',
        link: ''
    },
    {
        image: 'zoom',
        title: 'PvP Looting Bag Viewer',
        description: 'Adds an overlay showing the contents of your looting bag.',
        link: ''
    },
    {
        image: 'pvptools',
        title: 'PvP Tools',
        description: 'Enables the PvP tools panel',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Pyramid Plunder',
        description: 'Overlays for Pyramid Plunder.',
        link: ''
    },
    {
        image: 'rememberclan',
        title: 'Remember Clan',
        description: 'Sets a default clan chat to join.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Runedoku Solver',
        description: 'Show solutions for current Runedoku puzzle.',
        link: ''
    },
    {
        image: 'shayzieninfirmary',
        title: 'Shayzien Infirmary',
        description: 'Shows the status of wounded soldiers.',
        link: ''
    },
    {
        image: 'shifttowalk',
        title: 'Shift to Walk',
        description: 'Removes all menu entries allowing you to click anywhere with shift and not interact.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Smelting',
        description: 'Shows you an overview of your current Smelting session (Bars/Actions per hour).',
        link: ''
    },
    {
        image: 'specbar',
        title: 'Spec Bar',
        description: 'Adds a spec bar for every weapon, so you can easily 1 tick swap.',
        link: ''
    },
    {
        image: 'spellbookmodifier',
        title: 'Spellbook Modifier',
        description: 'Modifications to the spellbook, such as reorder, resizer and more.',
        link: ''
    },
    {
        image: 'suppliestracker',
        title: 'Supplies Used Tracker',
        description: 'Track your supplies while pvping or pvming, very useful.',
        link: 'https://github.com/runelite-extended/runelite/wiki/Supplies-tracker',
        home: true
    },
    {
        image: 'zoom',
        title: 'Tarn\'s Lair',
        description: 'Mark tiles and click boxes to help traverse the maze.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Theatre of Blood',
        description: 'Learn Theatre of Blood easily with this plugin showing you where and where not to stand.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Tick Counter',
        description: 'Compare yourself to your team mates by seeing who was in combat the longest.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'ToB Damage Counter',
        description: 'Compare yourself to your team mates by seeing who dealt the most damage during ToB.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Vetion Helper',
        description: 'Tracks Vet’ion’s special attacks so you don\'t have to.',
        link: ''
    },
    {
        image: 'vorkathhelper',
        title: 'Vorkath Helper',
        description: 'Counts Vorkath attacks, and which phases are coming.',
        link: ''
    },
    {
        image: 'warcallingindicators',
        title: 'War Calling Indicators',
        description: 'War War War.',
        link: ''
    },
    {
        image: 'zoom',
        title: 'Whale Watchers',
        description: 'A plugin to save whales in the wild.',
        link: ''
    },
    {
        image: 'wildernesslocation',
        title: 'Wild Locations',
        description: 'Indicates the player\'s current location in the wild and sends it to your current Clan Chat.',
        link: ''
    },
    {
        image: 'zulrahhelper',
        title: 'Zulrah Helper',
        description: 'Kill Zulrah no problem with our zulrah helper. Raise that KC!',
        link: 'https://github.com/runelite-extended/runelite/wiki',
        home: true
    }
]

export default features
