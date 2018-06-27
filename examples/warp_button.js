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
  x = (Math.random()-.5)*ship.game.options.map_size*10 ;
  y = (Math.random()-.5)*ship.game.options.map_size*10 ;
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
