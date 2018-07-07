# Starblast Modding

Starblast Modding interface can be found here: https://starblast.io/modding.html (ECP required)

Starblast Modding interface allows you to create custom mods for Starblast. The interface is made of a code editor window, on the left, and a console window, on the right. The code editor is where you type the JavaScript code for your mod. The console is where you can type commands to start your mod, stop it or interact with it while it is running.

#### Creating your first mod
In the Mod Code window, type the code for your first mod:

```
this.options = {
  root_mode: "survival",
  map_size: 30
};

this.tick = function(game) {
};
```

```this.options``` is a data structure where you can set options for your custom, modded game. These options are used for initializing the game when you start your mod. Changing them while the mod is running does not affect the game. See “Options reference” later in the document.

```this.tick``` is a JavaScript function which is called 60 times per second. In this function’s body, you will be able to code specific actions that your mod needs to take automatically while the game is running. This function can be modified while the modded game is running and the changes will apply automagically.

#### Running and testing a mod

Once your mod code is ready, in the console, start by selecting your preferred region for modding (example: Europe):

```
> region Europe
Region set to Europe
> █
```

*Currently modding is only available in these 3 zones: Europe, America, Asia.*

Then to start running your mod, type command “start”:
```
> start
Mod started
https://starblast.io#1234@12.34.56.78:3000
Use 'test' to open game frame for testing
> █
```
As instructed by the console, you may want to open a test window to join your modded game with a Starblast client. Type “test”:
```
> test
> █
```
You can stop your mod anytime by using command “stop”. Note that this will kill the game and disconnect all connected players:
```
> stop
Mod stopped
> █
```

# Custom ships and custom tree

You can import ships made with Starblast Ship Editor. In the Ship Editor, use “Mod Export” feature to export a JavaScript code snippet for the modding interface. Then paste this snipped in the coding window and add this:

```
var myship_101 = "{ … … <this is your exported ship code> …";

var ships = [myship_101]; // add your ship to an array of ship

this.options = {
  root_mode: "survival",
  ships: ships,         // specifying a list of ships to complement / replace existing ships
  reset_tree: true,     // set to true if you want to remove the original ship tree, false if you just want to replace some of the ships
  map_size: 30
};

this.tick = function(game) {
};
```

Then run your mod. If your ship is set to level=1 model=1, your ship will replace the Fly. You can replace other ships in the tree in a similar way, using reset_tree: false. Or you can remove the original ship tree completely and provide a whole new one using ```reset_tree: true```.

# Asteroids

You can access to the list of moving asteroids through the array ```game.asteroids```

To create an asteroid, use ```game.addAsteroid({ options })```

Accepted options:

|option|value|
|-|-|
|x|X coordinate|
|y|Y coordinate|
|vx|Velocity vector X component|
|vy|Velocity vector Y component|
|size|Size of the asteroid in the range [1,100]|

A new ```Asteroid``` object is immediately added to ```game.asteroids``` ; however it cannot be used before it has been assigned an id (positive integer) by the server.

Setting field/options to live Asteroids is not implemented yet.

# Aliens

You can access to the list of aliens through the array ```game.aliens```

To create an alien, use ```game.addAlien({ options })```

Accepted options:

|option|value|
|-|-|
|x|X coordinate|
|y|Y coordinate|
|vx|Velocity vector X component|
|vy|Velocity vector Y component|
|code|Type of alien, integer in range [10-20]|
|level|Level of the alien, in range [0-X] where X depends of the alien type|
|points|The number of points you earn when you kill this alien|
|crystal_drop|The crystal amount to be dropped when this alien is killed|
|weapon_drop|The code of a collectible weapon to be dropped by this alien when killed|

A new ```Alien``` object is immediately added to game.aliens ; however it cannot be used before it has been assigned an id (positive integer) by the server.

Once an alien is live and has an assigned id, you can set options to it.
Example:

```
> game.aliens[0].set({x:0,y:0});
> █
```

Will move the first alien in the list to the center of the map
Accepted options when using alien.set:

|option|value|
|-|-|
|x|X coordinate|
|y|Y coordinate|
|vx|Velocity vector X component|
|vy|Velocity vector Y component|
|shield|Shield|
|regen|Shield regen|
|damage|Laser damage|
|laser_speed|Laser speed|
|rate|Firing rate|

# Ships
You can access to the list of ships (players) through the array game.ships
You have read access to the ship’s main fields and options:

|field|value|
|-|-|
|ship.x|X coordinate|
|ship.y|Y coordinate|
|ship.vx|Velocity vector X component|
|ship.vy|Velocity vector Y component|
|ship.r|Rotation angle of the ship|
|ship.alive|Whether the ship is alive or destroyed|
|ship.type|Ship type code (e.g. 101)|
|ship.stats|Ship current stats upgrades, compiled into a single integer. Example: 10012301 means the 8 stats upgrade levels are 1,0,0,1,2,3,0 and 1|

You can set different options on the ships.
Example:

```
> game.ships[0].set({x:0,y:0});
> █
```

Will move the first ship in the list to the center of the map
Accepted options when using ship.set:

|option|value|
|-|-|
|x|X coordinate|
|y|Y coordinate|
|vx|Velocity vector X component|
|vy|Velocity vector Y component|
|invulnerable|Use to set the ship invulnerable for X ticks (e.g. 60 for one second invulnerability)|
|type|changes the type of ship (use the ship code, e.g. {type:403} )|

You can send the ship to intermission (a screen with results, offering to respawn). This screen allows you to display custom results information:

```
> game.ships[0].intermission({"Best Achievement":"Managed to run the mod","Score":1234});
> █
```

You can also trigger the gameover screen for any given ship. Here again, you can pass results information to pass on to the player:

```
> game.ships[0].gameover({"Rating":"Can do better","Score":1234});
> █
```

# Custom asteroids maps
You can create a custom map of asteroids. This allows creating a maze for example. The custom map you provide is actually a JavaScript character string which is used to "paint" the map.

Example:
```
var map =
"999999999999999999999999999999\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"999999999999999999999999999999" ;


this.options = {
  custom_map: map,
  map_size: 30
}
```

In the example above, 9 sets the biggest size of asteroid. You can use smaller values for adding smaller asteroids to the grid. Any value other than a digit will be interpreted as no asteroid. If your ```map_size``` is set to 30, make sure to create 30 lines and 30 columns, or you may get unpredictable results.

# Collectibles
You can spawn collectible weapons in the playfield. Here is an example:
```
game.addCollectible({code:10,x:0,y:0});
```
This will add a new collectible pack of rockets to coordinates 0,0
Here is the list of supported codes:

|code|description|
|-|-|
|10|4 rockets pack|
|11|2 missiles pack|
|12|torpedo|
|20|8 light mines pack|
|21|4 heavy mines pack|
|40|Mining pod|
|41|Attack pod|
|42|Defense pod|
|90|Energy refill|
|91|Shield refill|

You can check the number of collectibles still available to collect in the playfield by using: ```game.collectibles.length```


# Instructor
You can have the flight instructor send instructions to the player. For this find the players’s ship and use:
```
> ship.instructorSays("Hello!")
> █
```
You can hide the instructor window using:
```
> ship.hideInstructor()
> █
```
You can later show it again using:
```
> ship.showInstructor()
> █
```
A second, optional parameter allows you to choose which one of the instructor characters will talk to the player. Example:
```
> ship.instructorSays("Here is your report, Commander","Maria")
> █
```
#### Available characters
|Lucina|Klaus|Maria|Kan|Zoltar|
|-|-|-|-|-|
|![Lucina](https://starblast.data.neuronality.com/img/tutorial-survival.png)|![Klaus](https://starblast.data.neuronality.com/img/tutorial-battleroyale.png)|![Maria](https://starblast.data.neuronality.com/img/tutorial-team.png)|![Kan](https://starblast.data.neuronality.com/img/tutorial-invasion.png)|![Zoltar](https://starblast.data.neuronality.com/img/tutorial-deathmatch.png)|

# Custom UI components
The mod can create custom UI components that will show up on the player’s screen. This is done by calling setUIComponent on the ship, passing in a component descriptor.

Example:
```
> ship.setUIComponent({
  id:"myid",
  position:[0,0,25,25],
  clickable: true,
  shortcut: "X",
  visible: true,
  components: [
    { type:"box",position:[0,0,100,100],fill:"#456",stroke:"#CDE",width:2},
    { type: "text",position: [0,0,100,50],color: "#FFF",value: "My Text"},
    { type: "player",id: 1, position: [0,0,50,50],color: "#FFF"},
  ]
})
> █
```

|option|value|
|-|-|
|id|a unique identifier for this component, mandatory|
|position|expressed in percentage of the main screen, the position of the component [x,y,width,height]. Example: [45,45,10,10] creates a component in the center of the screen, which width and height are 10% of the screen width and height.|
|clickable|Whether this component can be clicked or not|
|shortcut|When the component is clickable, a keyboard shortcut allowing to trigger the click event|
|visible|Whether the component is visible or not. Resend the same data with visible set to false to hide the component|
|components|gives a list of graphical features to render within the component. Positions of these subcomponents are meant within the main component coordinates.|
|type|currently supported: "round", "text", "box" or "player" (in case of the latter, add the id of the player (ship) which name must be displayed)|


The example below creates a warp button for every player, which can be clicked and results in the ship warping to another random location, also adding 3 seconds invulnerability to it:

Full example: https://github.com/pmgl/starblast-modding/blob/master/examples/warp_button.js
```
var warp_button = {
  id: "warp",
  position: [2,50,8,14],
  clickable: true,
  shortcut: "W",
  visible: true,
  components: [
    { type:"round",position:[0,0,100,100],fill:"#456",stroke:"#CDE",width:2},
    { type: "text",position:[10,35,80,30],value:"WARP",color:"#CDE"},
    { type: "text",position:[20,70,60,20],value:"[W]",color:"#CDE"}
    ]
};

var warpShip = function(ship) {
  x = (Math.random()-.5) * ship.game.options.map_size*10 ;
  y = (Math.random()-.5) * ship.game.options.map_size*10 ;
  ship.set({x:x,y:y,vx:0,vy:0,invulnerable:180}) ;
} ;

this.tick = function(game) {
  if (game.step%60==0) // ensure this is done only once per second
  {
    for (var i=0;i<game.ships.length;i++)
    {
      var ship = game.ships[i] ;
      if (!ship.custom.warp_button_installed)
      {
        ship.custom.warp_button_installed = true; // use ship.custom to store custom values
        ship.setUIComponent(warp_button);
      }
    }
  }
} ;

this.event = function(event,game) {
  switch (event.name)
  {
    case "ui_component_clicked":
      var ship = event.ship ;
      var component = event.id ;
      if (component == "warp") // check that this is our component "warp"
      {
        warpShip(ship);
      }
      break ;
  }
} ;
```

#### Customizing the scoreboard
The built-in scoreboard can be replaced by your own custom scoreboard component. As soon as an UI component with id ```"scoreboard"``` is created, you will be responsible for updating the scoreboard. Your scoreboard component does not have to include a ```position``` because it will automatically fill the area already reserved for the scoreboard.

# Customizing the emote-chat system
The vocabulary used for the emote-chat system can be customized by setting the field ```vocabulary``` in the game option
as follows:

```
var vocabulary = [
      { text: "Hello", icon:"\u0045", key:"O" },
      { text: "Bye", icon:"\u0046", key:"B" },
      { text: "Yes", icon:"\u004c", key:"Y" },
      { text: "No", icon:"\u004d", key:"N" },

      { text: "Flower", icon:"\u{1F33B}", key:"F" },
      { text: "Snowman", icon:"\u26c4", key:"M" },
      { text: "Shark", icon:"\u{1F988}", key:"S" },
      { text: "Ghost", icon:"\u{1F47B}", key:"G" }
    ] ;

this.options = {
  vocabulary: vocabulary,
  (...)
};
```

This allows using Starblast built-in emote icons, which are listed here for reference: https://starblast.io/glyphs.html

You can also use unicode icons, here is a good source for reference: https://unicode.org/emoji/charts/full-emoji-list.html

Note that wide unicode characters (using more than 2 bytes) require a specific Javascript syntax as shown in the example above (example: ```\u{1F47B}```)

# Add 3D objects to the scenery
The mod can create custom, textured 3D objects and add them to the scenery. These objects have
no physics for now (physics is planned in a near future).

Example:
```
var cube = {
  id: "cube",
  obj: "https://raw.githubusercontent.com/pmgl/starblast-modding/master/objects/cube/cube.obj",
  diffuse: "https://raw.githubusercontent.com/pmgl/starblast-modding/master/objects/cube/diffuse.jpg"
} ;

game.setObject({
  id: "cube",
  type: cube,
  position: {x:0,y:0,z:0},
  rotation: {x:0,y:0,z:0},
  scale: {x:1,y:1,z:1}
}) ;
```

#### Object type options
|option|value|
|-|-|
|id|a unique identifier for this object type, mandatory|
|obj|a URL (HTTPS) to the OBJ file|
|diffuse|a URL (HTTPS) to a diffuse texture file (optional)|
|emissive|a URL (HTTPS) to an emissive texture file (optional)|
|specular|a URL (HTTPS) to a specularity texture file (optional)|
|bump|a URL (HTTPS) to a bump texture map (optional)|
|diffuseColor|diffuse color of the object, e.g. 0xFF0000 (for red)|
|emissiveColor|emissive color of the object, e.g. 0x00FFFF (for cyan)|
|specularColor|specular color of the object|
|transparent|whether the object's texture has transparency or not|
|bumpScale|scale for bump mapping (default: 0.1)|

#### Object instance options
|option|value|
|-|-|
|id|a unique identifier for this object instance (mandatory, allows changing the object afterwards)|
|type|the object type definition|
|position|coordinates for placing the object|
|scale|allows to scale the object|
|rotation|allows to rotate the object|

#### changing or moving an object
Use ```game.setObject``` again with the same object instance id.

#### removing an object
```game.removeObject(id)``` removes the object with given id. You can omit the id parameter, which will remove all custom objects in the scene.

Working example, adding cube objects to the scenery: https://github.com/pmgl/starblast-modding/blob/master/examples/adding_cube.js

# Events
Your mod can receive events through the function this.events.

```
this.event = function(event,game) {
  switch (event.name)
  {
    case "ship_spawned":
      if (event.ship != null)
      {
        shipJustSpawned(event.ship) ;
      }
      break ;
  }
} ;
```

#### Available events
|event.name|description|additional event fields|
|-|-|-|
|ship_spawned|A ship just spawned in game or respawned|event.ship|
|ship_destroyed|A ship was just destroyed|event.ship, event.killer|
|alien_destroyed|An alien was just killed|event.alien, event.killer|
|asteroid_destroyed|An asteroid was just destroyed|event.asteroid, event.killer|
|collectible_picked|A ship just picked a collectible item|event.collectible, event.ship|



# Options reference
Most of the options are inherited from the usual custom games. A few more options have been added, specifically for modding (top of the list):

|option|description|
|-|-|
|root_mode|The mod to inherit from: "survival", "team", "invasion", "deathmatch", "battleroyale" (or unspecified)|
|reset_tree|Set to true to remove the original ship tree|
|ships|An array of ships to add to the tree|
|map_size|Size of the map, range from 20 to 200|
|soundtrack|"procedurality.mp3", "argon.mp3" or "crystals.mp3"|
|max_players|From 1 to 120|
|crystal_value|Float, from 0 to 5|
|lives|Number of lives, from 1 to 5|
|max_level|Max level you can reach, from 1 to 7|
|friendly_colors|Serves to define teams ; how many teams (or 0)|
|map_name|Name of the map|
|survival_time|When to trigger survival mode ; 0 or a value in minutes (only for survival-based games)|
|survival_level|Level which triggers survival mode|
|1 to 7 (only for survival-based games)|8 for no trigger
|starting_ship|Enter desired ship code: 101, 201, 404...
|starting_ship_maxed|true or false
|asteroids_strength|0 to 10
|friction_ratio|0 to 2
|speed_mod|0 to 2
|rcs_toggle|true or false
|map_id|Number in the range 0-9999
|weapon_drop|0 to 1 (probability that an asteroid will drop a weapon)
|mines_self_destroy|true or false
|mines_destroy_delay|In minutes
|healing_enabled|true or false
|healing_ratio|0 to 2
|shield_regen_factor|0 to 2
|power_regen_factor|0 to 2
|custom_map|Set to [] will create an empty map (no fixed asteroids)
|weapons_store|Set to false to remove access to the weapon store
|radar_zoom|Set value to 1, 2 or 4
|auto_refill|When set to true, collecting an energy or shield pill immediately refills energy or shield ; the collected pill is not added to the active weapons
|projectile_speed|Affects the speed of rockets, missiles and torpedoes ; use 1 for default speed
|choose_ship|e.g. setting to [301,302,303] will let player choose a ship from these 3 ships before entering the game (only works when no root_mode has been specified)

#### Team mode specific options
|option|description|
|-|-|
|station_regeneration|factor to apply to station shield regen, default value 1|
|station_size|size of the stations ; integer from 1 to 5|
|station_crystal_capacity|factor to apply to the station crystal capacity, range [0.1,10]|
|station_repair_threshold|part of the station crystal capacity that must be refilled to repair a module. In the range [0,1]|
