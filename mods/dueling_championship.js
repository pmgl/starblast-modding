/*
STARBLAST DUELING CHAMPIONSHIP (SDC)
* Mod Founder: Thuliux
* Mod Developer: Bhpsngum
* Shipbuilders: Thuliux, Nova, SChickenMan, Nexagon, Admiral Forever, Neuronality and others
* UI Theme designer: ___
* Poster designer: Tournebulle

Season 2 (v2.0) - Main version

Requirements: ES2020 (Chrome & Edge 80, Firefox 74, Opera 67, Safari 13.1, NodeJS v14.0.0, fck IE) and above

Mod code for older browsers that supports ES6 can be found here: https://raw.githubusercontent.com/Bhpsngum/SDC-public/master/sdc_es6.js
*/

let gem_ratio = 1;
let fixed_gems = false;
let arena_radius = 15;
let min_radius_ratio = false;
let fixed_min_radius = 5;
let allow_full_cargo_pickup = true; // allows ships to pick up gems after the crystal cargo is full
let max_item_per_ship_selection_screen = 5;
let shrink_start_time = 1.5; // in minutes
let shrink_end_time = 0.5; // in minutes
let shrink_interval = 10; // in seconds
let edge_dps = 50; // damage per second when standing in the edge of the safe zone
let dps_increase = 25; //dps increase per 10 blocks farther from the safe zone
let duel_countdown = 10; // countdown before duel starts (in seconds)
let duel_duration = 3.5; // in minutes
let game_duration = 30; // in minutes
let nodes_count_per_width = 3; // number of arenas (including lobby): n^2
let TpDelay = 2; // Latency between teleports (in seconds)
let queueWaitingTime = 10; // waiting time when there are enough players in queue (in seconds)
let InvitationTimeOut = 10; // timeout after decline/get declined the invitation (in seconds)
let pendingTpDelay = 5; // GGs after matches is really important. Decide the duration! (in seconds)
let messageHoist = 5; // the duration one single message thread will stay (in seconds)
let max_warns_per_chunk = 3; // maximum warnings can be displayed
let instructor_duration = 2.5; // duration for the instructor saying each sentence in the screen (in seconds)
let buttonsDelay = 0.1; // button delay, in seconds

let invite_columns = 2;
let invite_rows = 16;

let InviteScreen = {
  offsetX: 21,
  offsetY: 16,
  width: 58,
  height: 79,
  margin: { // by percent each
    left: 0,
    right: 0,
    top: 10,
    bottom: 15
  }
}

InviteScreen.position = ["offsetX", "offsetY", "width", "height"].map(t => InviteScreen[t]);
InviteScreen.actualWidthPercentage =  100 - InviteScreen.margin.left - InviteScreen.margin.right;
InviteScreen.actualHeightPercentage = 100 - InviteScreen.margin.top - InviteScreen.margin.bottom;

let introductory_paragraph = [
  "Welcome to Starblast Dueling Championship (SDC)!",
  "Choose your favorite ship and press ready to participate in 1v1 duels and become the champion!",
  "Also, please note that you cannot shoot spectators, and they cannot hurt you!",
  "Good luck and have fun!"
];

let A_Speedster_601 = '{"name":"A-Speedster","designer":"Neuronality","level":6,"model":1,"size":1.5,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-95,0,0,70,65],"z":[0,0,0,0,0,0]},"width":[0,10,40,20,20,0],"height":[0,5,30,30,15,0],"texture":[6,11,5,63,12],"propeller":true,"laser":{"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"recoil":50,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":10,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,12]},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":45},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"angle":-10,"laser":{"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"angle":-10,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}},"winglets":{"offset":{"x":0,"y":-40,"z":10},"doubleside":true,"length":[45,10],"width":[5,20,30],"angle":[50,-10],"position":[90,80,50],"texture":[4],"bump":{"position":10,"size":30}}},"typespec":{"name":"A-Speedster","level":6,"model":1,"code":601,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"shape":[3,2.914,2.408,1.952,1.675,1.49,1.349,1.263,1.198,1.163,1.146,1.254,1.286,1.689,2.06,2.227,2.362,2.472,2.832,3.082,3.436,3.621,3.481,2.48,2.138,2.104,2.138,2.48,3.481,3.621,3.436,3.082,2.832,2.472,2.362,2.227,2.06,1.689,1.286,1.254,1.146,1.163,1.198,1.263,1.349,1.49,1.675,1.952,2.408,2.914],"lasers":[{"x":0,"y":-3,"z":0,"angle":0,"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"number":1,"spread":0,"error":0,"recoil":50},{"x":1.16,"y":-0.277,"z":1.35,"angle":-10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0},{"x":-1.16,"y":-0.277,"z":1.35,"angle":10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0}],"radius":3.621}}';
let Broly_602 = '{"name":"Broly","level":6,"model":2,"size":1.8,"specs":{"shield":{"capacity":[250,350],"reload":[7,8]},"generator":{"capacity":[90,140],"reload":[25,40]},"ship":{"mass":200,"speed":[80,100],"rotation":[40,60],"acceleration":[80,130]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-6,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-80,-85,-60,0,0,60,75,70],"z":[0,0,0,0,0,0,0,0]},"width":[0,8,18,32,25,18,12,0],"height":[0,6,15,22,22,18,10,0],"texture":[17,10,18,5,11,8,17],"propeller":true,"laser":{"damage":[48,80],"rate":1,"type":2,"speed":[145,180],"recoil":40,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-68,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,0,20,40,60],"z":[-7,-5,0,0,5]},"width":[0,6,9,10,0],"height":[0,8,10,10,0],"texture":[4,9,9,4]},"side_propulsors":{"section_segments":12,"offset":{"x":30,"y":19,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-20,-10,5,15,25,30,40,60,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,14,16,16,12,12,14,10,0],"height":[0,10,15,15,15,10,10,10,8,0],"propeller":true,"texture":[4,4,8,4,5,63,5,4,17]},"cannons":{"section_segments":12,"offset":{"x":14,"y":19,"z":22},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,10,30,30],"z":[0,0,0,0,0,-5,-5]},"width":[0,5,7,10,10,3,0],"height":[0,4,4,5,6,3,0],"laser":{"damage":[15,20],"rate":1.2,"type":1,"speed":[120,150],"number":1,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]},"cannons2":{"section_segments":12,"offset":{"x":28,"y":-6,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,6,8,12,8,8,0],"height":[0,5,7,8,3,5,0],"angle":1.5,"laser":{"damage":[8,13],"rate":1.5,"type":1,"speed":[100,140],"number":1,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"main":{"length":[40],"width":[60,50],"angle":[-10],"position":[0,-35],"doubleside":true,"bump":{"position":30,"size":10},"texture":[63,63],"offset":{"x":0,"y":24,"z":0}}},"typespec":{"name":"Broly","level":6,"model":2,"code":602,"specs":{"shield":{"capacity":[250,350],"reload":[7,8]},"generator":{"capacity":[90,140],"reload":[25,40]},"ship":{"mass":200,"speed":[80,100],"rotation":[40,60],"acceleration":[80,130]}},"shape":[3.282,3.289,2.749,2.251,2.233,2.188,1.913,1.921,1.75,1.616,1.524,1.463,1.453,1.543,1.645,1.749,1.888,2.046,2.138,2.397,2.849,3.188,3.143,2.99,2.521,2.489,2.521,2.99,3.143,3.188,2.849,2.397,2.138,2.046,1.888,1.749,1.645,1.543,1.454,1.463,1.524,1.616,1.75,1.921,1.913,2.188,2.233,2.251,2.749,3.289],"lasers":[{"x":0,"y":-3.276,"z":0,"angle":0,"damage":[48,80],"rate":1,"type":2,"speed":[145,180],"number":1,"spread":0,"error":0,"recoil":40},{"x":0.504,"y":-1.116,"z":0.792,"angle":0,"damage":[15,20],"rate":1.2,"type":1,"speed":[120,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.504,"y":-1.116,"z":0.792,"angle":0,"damage":[15,20],"rate":1.2,"type":1,"speed":[120,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.961,"y":-2.015,"z":0,"angle":1.5,"damage":[8,13],"rate":1.5,"type":1,"speed":[100,140],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.961,"y":-2.015,"z":0,"angle":-1.5,"damage":[8,13],"rate":1.5,"type":1,"speed":[100,140],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.289}}';
let Sparrow_603 = '{"name":"Sparrow","designer":"SChickenMan & ☒☒☒","level":6,"model":3,"size":1.6,"specs":{"shield":{"capacity":[120,200],"reload":[8,9]},"generator":{"capacity":[150,300],"reload":[20,30]},"ship":{"mass":175,"speed":[100,125],"rotation":[40,60],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-80,-85,-80,-50,-10,0,0,40,70,65],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,7,10,21,27,28,20,20,20,0],"height":[0,4,7,16,25,25,20,20,15,0],"texture":[17,63,4,11,3,63,2,63,12],"propeller":true,"laser":{"damage":[30,60],"rate":3.5,"type":2,"speed":[160,200],"number":1}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-70,"z":14},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,8,10,10,0],"height":[0,10,12,12,0],"texture":[9]},"cannons":{"section_segments":8,"offset":{"x":0,"y":30,"z":30},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-60,-20,0,20,40,60],"z":[-10,-10,-5,-5,-4,-5,-12]},"width":[0,6,10,10,12,10,8],"height":[0,5,10,10,10,6,8],"angle":180,"laser":{"damage":[30,50],"rate":0.6,"type":1,"speed":[200,240],"recoil":300,"number":1,"error":0},"propeller":false,"texture":[4,3,11,4,63,2]},"side_propulsors":{"section_segments":8,"offset":{"x":25,"y":10,"z":0},"position":{"x":[-15,-2,-1,-2,0,0,0,0,0,0,0,0],"y":[-90,-20,-15,-8,0,10,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,13,15,20,20,20,20,20,18,18,10,0],"height":[0,10,15,20,20,20,25,20,18,16,10,0],"propeller":true,"texture":[2,4,4,63,3,4,8,5,63,4,17]},"tops":{"section_segments":12,"offset":{"x":15,"y":30,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-40,-25,0,15,40,35],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,13,11,6,0],"height":[0,5,9,8,6,5,0],"propeller":1,"angle":0,"texture":[5,4,10,63,4,17]}},"wings":{"join1":{"offset":{"x":0,"y":5,"z":0},"length":[35],"width":[20,70],"angle":[0],"position":[-90,-5],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":0,"y":35,"z":0},"length":[30],"width":[20,70],"angle":[0],"position":[-95,-10],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}}},"typespec":{"name":"Sparrow","level":6,"model":3,"code":603,"specs":{"shield":{"capacity":[120,200],"reload":[8,9]},"generator":{"capacity":[150,300],"reload":[20,30]},"ship":{"mass":175,"speed":[100,125],"rotation":[40,60],"acceleration":[90,140]}},"shape":[3.206,3.208,2.616,2.174,1.856,1.719,1.63,1.522,1.38,1.273,1.202,1.258,1.339,1.415,1.486,1.549,1.643,1.777,1.973,2.157,2.488,2.866,3.24,3.196,3.095,2.886,3.095,3.196,3.24,2.866,2.488,2.157,1.973,1.777,1.643,1.549,1.486,1.415,1.339,1.258,1.202,1.273,1.38,1.522,1.63,1.719,1.856,2.174,2.616,3.208],"lasers":[{"x":0,"y":-3.2,"z":0,"angle":0,"damage":[30,60],"rate":3.5,"type":2,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":2.88,"z":0.96,"angle":180,"damage":[30,50],"rate":0.6,"type":1,"speed":[200,240],"number":1,"spread":0,"error":0,"recoil":300}],"radius":3.24}}';
let Contraband_604 = '{"name":"Contraband","level":6,"model":4,"size":1.6,"zoom":0.85,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-22,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-80,-20,0,15,20,60,65,80,100,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,24,26,20,20,20,20,25,12,0],"height":[0,5,25,25,20,15,15,15,20,10,0],"texture":[1,2,4,63,5,10,5,63,4,17],"propeller":true,"laser":{"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"recoil":250,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-77,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,5,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":8,"offset":{"x":35,"y":3,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-4,6,15,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,18,18,10,0],"height":[0,15,20,20,20,15,15,18,16,10,0],"propeller":true,"texture":[4,4,63,3,5,8,5,63,4,17]},"cannons":{"section_segments":12,"offset":{"x":18,"y":43,"z":20},"position":{"x":[0,0,0,0,0],"y":[-50,-45,-20,-5,5],"z":[0,0,0,0,0]},"width":[0,5,7,8,0],"height":[0,5,7,8,0],"angle":0,"laser":{"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[6,4,63,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":-2,"z":0},"length":[37,0],"width":[20,70],"angle":[0],"position":[-95,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":25,"y":30,"z":0},"length":[35],"width":[10,10],"angle":[0],"position":[0,0,0,50],"texture":[8],"doubleside":1,"bump":{"position":0,"size":0}},"wing1":{"doubleside":true,"offset":{"x":50,"y":30,"z":-36},"length":[0,30,20,30],"width":[0,0,100,100,0],"angle":[110,70,90,110],"position":[0,0,0,0,0],"texture":[63],"bump":{"position":0,"size":5}}},"typespec":{"name":"Contraband","level":6,"model":4,"code":604,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"shape":[3.424,3.274,2.552,2.215,2.002,1.835,1.725,1.612,1.456,1.35,2.032,2.005,1.991,2.031,2.107,2.229,2.362,2.513,2.737,3.055,3.205,3.163,3.112,2.961,2.525,2.501,2.525,2.961,3.112,3.163,3.205,3.055,2.737,2.513,2.362,2.229,2.107,2.031,1.992,2.005,2.032,1.35,1.456,1.612,1.725,1.835,2.002,2.215,2.552,3.274],"lasers":[{"x":0,"y":-3.264,"z":0,"angle":0,"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"number":1,"spread":0,"error":0,"recoil":250},{"x":0.576,"y":-0.224,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.576,"y":-0.224,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.424}}';
let A_Stasis_605 = '{"name":"A-Stasis","designer":"Thuliux","level":6,"model":5,"size":2.41,"zoom":0.9,"specs":{"shield":{"capacity":[250,320],"reload":[5,8]},"generator":{"capacity":[130,160],"reload":[22,37.5]},"ship":{"mass":190,"speed":[85,110],"rotation":[55,75],"acceleration":[130,140]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":12.5,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-80,-70,-75,-70,-30,-20,20,30,45,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,4.5,7,14,20,15,13,10,0],"height":[0,2.5,4,7.5,12,16,15,13,10,0],"texture":[6,63,63,10,4,2,63,8,17],"propeller":1,"laser":{"damage":[10,15],"rate":1,"type":2,"speed":[190,235],"recoil":10,"number":10,"error":3.5}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-32.5,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-8,0,20,30,60,80],"z":[0,0,0,0,0,0]},"width":[0,4,7,8,8,0],"height":[0,6,10,11,12,0],"propeller":false,"texture":[7,9,4,63,4]},"propulsors":{"section_segments":10,"offset":{"x":15,"y":7.5,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-5,-2,8,20,30,35,45,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,7,10,10,10,8,8,10,8,0],"height":[0,6,10,10,10,8,8,8,6,0],"texture":[4,4,5,10,3,63,4,4,17],"propeller":true},"sides":{"section_segments":12,"offset":{"x":10,"y":-27.5,"z":0},"position":{"x":[0,0,2,4],"y":[-25,-10,5,35],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,6,0],"propeller":1,"angle":5,"texture":[4,2,63,4]}},"wings":{"main":{"length":[12,8],"width":[40,30,30],"angle":[10,0],"position":[30,40,30],"doubleside":true,"bump":{"position":30,"size":5},"texture":[11,63],"offset":{"x":5,"y":-17.5,"z":15}},"winglet":{"length":[38,10],"width":[50,40,30],"angle":[-30,20],"position":[30,50,30],"doubleside":true,"bump":{"position":30,"size":5},"texture":[8,63],"offset":{"x":0,"y":-22.5,"z":10}},"join1":{"offset":{"x":0,"y":20,"z":0},"length":[25],"width":[20,50],"angle":[-10],"position":[-60,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":5}}},"typespec":{"name":"A-Stasis","level":6,"model":5,"code":605,"specs":{"shield":{"capacity":[250,320],"reload":[5,8]},"generator":{"capacity":[130,160],"reload":[22,37.5]},"ship":{"mass":190,"speed":[85,110],"rotation":[55,75],"acceleration":[130,140]}},"shape":[3.254,3.02,2.394,2.039,1.729,1.499,1.303,1.191,1.165,1.165,1.191,2.071,2.054,2.054,2.105,2.189,2.313,2.373,2.476,2.634,2.785,2.627,2.755,2.697,2.813,2.777,2.813,2.697,2.755,2.627,2.785,2.634,2.476,2.373,2.313,2.189,2.105,2.054,2.054,2.071,1.191,1.165,1.165,1.191,1.303,1.499,1.729,2.039,2.394,3.02],"lasers":[{"x":0,"y":-3.254,"z":0,"angle":0,"damage":[10,15],"rate":1,"type":2,"speed":[190,235],"number":10,"spread":0,"error":3.5,"recoil":10}],"radius":3.254}}';
let Tripod_606 = '{"name":"Tripod","designer":"Nova","level":6,"model":6,"size":1.7,"specs":{"shield":{"capacity":[150,250],"reload":[8,10]},"generator":{"capacity":[100,130],"reload":[25,45]},"ship":{"mass":150,"speed":[100,138],"rotation":[47,70],"acceleration":[110,140]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-74,-65,-47,-20,5,17,29,50,60,75,72],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,15,20,18,18,18,20,20,15,0],"height":[0,6,8,10,12,13,14,15,14,10,0],"propeller":true,"texture":[4,63,2,10,63,3,63,4,13,17]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-3,3,18,35,50],"z":[-7,-6,-7,-1,-1]},"width":[0,4,8,8,5],"height":[0,6,11,6,5],"propeller":false,"texture":[4,9,9,4,4]},"cannon_wing_top":{"section_segments":8,"offset":{"x":0,"y":60,"z":18},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-50,-30,-10,0,10,15],"z":[0,0,0,0,0,0,0]},"width":[0,4,6,8,8,6,0],"height":[0,2,4,5,5,4,0],"angle":0,"laser":{"damage":[35,50],"rate":1,"type":1,"speed":[130,180],"number":1,"recoil":10,"angle":0},"propeller":0,"texture":[6,4,10,63,8,3]},"cannon_wings":{"section_segments":8,"offset":{"x":23,"y":50,"z":-3},"position":{"x":[-2,-2,-2,-1,-3,-4,-4,-3,-3],"y":[-70,-80,-62,-50,-40,-30,-15,20,15],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,6,8,9,11,10,10,6,0],"height":[0,6,8,8,8,8,8,6,0],"texture":[13,4,2,63,4,10,4,13],"angle":0,"laser":{"damage":[18,35],"rate":1,"type":2,"speed":[125,165],"number":1,"angle":2,"error":0},"propeller":1}},"wings":{"main":{"length":[40,15],"width":[80,30,25],"angle":[0,40],"position":[10,20,0],"doubleside":true,"texture":[11,63],"offset":{"x":0,"y":13,"z":-5.31},"bump":{"position":10,"size":5}},"winglets":{"length":[14,3],"width":[40,30,59],"angle":[10,30,0],"position":[-15,23,50],"doubleside":true,"texture":[3],"offset":{"x":5,"y":-58,"z":-5},"bump":{"position":30,"size":10}},"winglets_cannon_top_2":{"length":[13,3],"width":[15,15,20],"angle":[30,30,0],"position":[-12,0,-2],"doubleside":true,"texture":[4,13],"offset":{"x":1,"y":65,"z":20},"bump":{"position":10,"size":10}}},"typespec":{"name":"Tripod","level":6,"model":6,"code":606,"specs":{"shield":{"capacity":[150,250],"reload":[8,10]},"generator":{"capacity":[100,130],"reload":[25,45]},"ship":{"mass":150,"speed":[100,138],"rotation":[47,70],"acceleration":[110,140]}},"shape":[3.167,3.081,2.356,1.926,1.616,1.348,1.372,1.279,1.178,1.108,1.063,1.043,1.053,1.765,1.806,1.881,1.954,1.977,2.032,2.124,2.12,2.158,2.539,2.6,2.596,2.555,2.596,2.6,2.539,2.158,2.12,2.124,2.032,1.977,1.954,1.881,1.806,1.765,1.054,1.043,1.063,1.108,1.178,1.279,1.372,1.348,1.616,1.926,2.356,3.081],"lasers":[{"x":0,"y":0.34,"z":0.612,"angle":0,"damage":[35,50],"rate":1,"type":1,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":10},{"x":0.714,"y":-1.02,"z":-0.102,"angle":0,"damage":[18,35],"rate":1,"type":2,"speed":[125,165],"number":1,"spread":2,"error":0,"recoil":0},{"x":-0.714,"y":-1.02,"z":-0.102,"angle":0,"damage":[18,35],"rate":1,"type":2,"speed":[125,165],"number":1,"spread":2,"error":0,"recoil":0}],"radius":3.167}}';
let Streamliner_607 = '{"name":"Streamliner","designer":"Thuliux & ☒☒☒","level":6,"model":7,"size":1.65,"specs":{"shield":{"capacity":[190,220],"reload":[7,9]},"generator":{"capacity":[15,30],"reload":[220,240]},"ship":{"mass":160,"speed":[100,122],"rotation":[50,70],"acceleration":[120,140]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":22,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-110,-100,-100,-70,-40,0,36,60,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,8.5,18,20,20,20,12,0],"height":[0,5,8,15,18,14,12,6,0],"texture":[6,4,2,10,3,63,4,17],"propeller":1},"cannon1":{"section_segments":6,"offset":{"x":0,"y":-25,"z":-10},"position":{"x":[0,0,0,0],"y":[-40,-50,-20],"z":[0,0,0]},"width":[0,5,8],"height":[0,5,8],"angle":0,"laser":{"damage":[20,30],"rate":0.87,"type":1,"speed":[160,200],"number":1,"recoil":150},"propeller":false},"cannon2":{"section_segments":6,"offset":{"x":0,"y":-25,"z":-10},"position":{"x":[0,0,0,0],"y":[-40,-50,-20],"z":[0,0,0]},"width":[0,5,8],"height":[0,5,8],"angle":0,"laser":{"damage":[20,30],"rate":0.87,"type":2,"speed":[160,190],"number":1,"recoil":150,"error":4},"propeller":false},"cannon3":{"section_segments":6,"offset":{"x":0,"y":-25,"z":-10},"position":{"x":[0,0,0,0],"y":[-40,-50,-20],"z":[0,0,0]},"width":[0,5,8],"height":[0,5,8],"angle":0,"laser":{"damage":[20,30],"rate":0.87,"type":2,"speed":[160,180],"number":1,"error":6,"recoil":150},"propeller":false},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-28,"z":18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-15,5,20,48,80,88],"z":[-7,-5,-3,-5,-5,-8,-8]},"width":[0,6,9,10,10,7,0],"height":[0,5,6,8,8,8,0],"texture":[9,9,9,11,63,4,1,2]},"laser2":{"section_segments":10,"offset":{"x":24,"y":2,"z":0},"position":{"x":[-4,-4,-1,0,0,0,0,0,0,0],"y":[-32,-25,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,8,12,12,12,8,8,12,8,0],"height":[0,6,10,10,10,6,6,10,5,0],"texture":[6,4,10,3,4,3,2,4,16.9],"propeller":true}},"wings":{"main":{"length":[20,6,25],"width":[40,40,50,25],"angle":[5,-20,-20],"position":[0,10,18,-5],"doubleside":0,"bump":{"position":10,"size":5},"texture":[4,5,63,11],"offset":{"x":0,"y":22,"z":14}},"winglets":{"length":[26],"width":[38,10],"angle":[10,-10],"position":[-50,-30,-55],"bump":{"position":0,"size":20},"texture":63,"doubleside":true,"offset":{"x":0,"y":-15,"z":0}}},"typespec":{"name":"Streamliner","level":6,"model":7,"code":607,"specs":{"shield":{"capacity":[190,220],"reload":[7,9]},"generator":{"capacity":[15,30],"reload":[220,240]},"ship":{"mass":160,"speed":[100,122],"rotation":[50,70],"acceleration":[120,140]}},"shape":[2.904,2.589,2.251,2.032,1.879,1.576,1.178,1.186,1.153,1.108,1.085,1.089,1.115,1.631,1.671,1.739,1.844,1.889,1.913,1.97,2.088,2.484,2.595,2.521,2.735,2.711,2.735,2.521,2.595,2.484,2.088,1.97,1.913,1.889,1.844,1.739,1.671,1.631,1.118,1.089,1.085,1.108,1.153,1.186,1.178,1.576,1.879,2.032,2.251,2.589],"lasers":[{"x":0,"y":-2.475,"z":-0.33,"angle":0,"damage":[20,30],"rate":0.87,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":150},{"x":0,"y":-2.475,"z":-0.33,"angle":0,"damage":[20,30],"rate":0.87,"type":2,"speed":[160,190],"number":1,"spread":0,"error":4,"recoil":150},{"x":0,"y":-2.475,"z":-0.33,"angle":0,"damage":[20,30],"rate":0.87,"type":2,"speed":[160,180],"number":1,"spread":0,"error":6,"recoil":150}],"radius":2.904}}';
let Mk47_608 = '{"name":"Mk47","level":6,"model":8,"size":1.52,"specs":{"shield":{"capacity":[200,250],"reload":[8,10]},"generator":{"capacity":[105,170],"reload":[30,50]},"ship":{"mass":150,"speed":[70,160],"rotation":[60,75],"acceleration":[100,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-10,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-65,-75,-55,-40,-5,0,30,35,70,65],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,14,18,20,23,20,20,20,0],"height":[0,5,10,11,11,11,10,12,6,0],"texture":[6,4,2,11,5,10,5,18,17],"propeller":true,"laser":{"damage":[6,10],"rate":10,"type":2,"speed":[170,200],"recoil":0,"number":1,"error":2}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-80,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[15,35,60,85,90],"z":[-1,-2,-1,-4,0]},"width":[0,8,10,6,0],"height":[0,8,10,10,0],"texture":[8.98,8.98,4]},"intake":{"section_segments":12,"angle":0,"offset":{"x":15,"y":5,"z":-2},"position":{"x":[6,6,6,-4,0,0,0,0],"y":[-25,-30,-5,30,45,65,60],"z":[-2,-2,-2,0,0,0,0,0]},"width":[0,5,10,10,13,8,0],"height":[0,6,11,12,12,8,0],"texture":[6,4,63,4,63,17],"propeller":1,"laser":{"damage":[6,8],"angle":2,"rate":4,"type":2,"speed":[140,180],"recoil":0,"number":1,"error":5}}},"wings":{"main":{"length":[10,30,20],"width":[0,55,40,20],"angle":[0,-20,0],"position":[20,20,40,15],"texture":[3,11,63],"doubleside":true,"bump":{"position":10,"size":15},"offset":{"x":0,"y":15,"z":1}},"font":{"length":[25],"width":[30,10],"angle":[-10],"position":[0,15],"texture":[63],"doubleside":true,"bump":{"position":10,"size":15},"offset":{"x":5,"y":-65,"z":-7}}},"typespec":{"name":"Mk47","level":6,"model":8,"code":608,"specs":{"shield":{"capacity":[200,250],"reload":[8,10]},"generator":{"capacity":[105,170],"reload":[30,50]},"ship":{"mass":150,"speed":[70,160],"rotation":[60,75],"acceleration":[100,140]}},"shape":[2.589,2.59,2.205,2.04,1.933,1.679,1.097,1.088,1.015,0.968,0.939,0.926,0.941,0.942,0.916,1.902,2.016,2.151,2.199,2.285,2.415,2.559,2.465,2.237,2.166,1.827,2.166,2.237,2.465,2.559,2.415,2.285,2.199,2.151,2.016,1.902,0.916,0.939,0.942,0.926,0.939,0.968,1.015,1.088,1.097,1.679,1.933,2.04,2.205,2.59],"lasers":[{"x":0,"y":-2.584,"z":-0.061,"angle":0,"damage":[6,10],"rate":10,"type":2,"speed":[170,200],"number":1,"spread":0,"error":2,"recoil":0},{"x":0.638,"y":-0.76,"z":-0.061,"angle":0,"damage":[6,8],"rate":4,"type":2,"speed":[140,180],"number":1,"spread":2,"error":5,"recoil":0},{"x":-0.638,"y":-0.76,"z":-0.061,"angle":0,"damage":[6,8],"rate":4,"type":2,"speed":[140,180],"number":1,"spread":2,"error":5,"recoil":0}],"radius":2.59}}';
let R_34_609 = '{"name":"R-34","designer":"☒☒☒","level":6,"model":9,"size":1.84,"specs":{"shield":{"capacity":[200,325],"reload":[4,6]},"generator":{"capacity":[100,180],"reload":[30,36]},"ship":{"mass":255,"speed":[70,95],"rotation":[35,65],"acceleration":[90,130]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-100,-80,-90,-50,0,40,100,90],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,10,20,28,20,16,0],"height":[0,5,10,20,25,15,10,0],"propeller":true,"texture":[6,4,3,11,10,4,17],"laser":{"damage":[90,138],"rate":1,"type":1,"speed":[180,220],"number":1,"recoil":100,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":25},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,7,10,9,0],"height":[0,10,15,12,0],"texture":[9]},"engine":{"section_segments":8,"offset":{"x":0,"y":55,"z":17},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-20,10,30,40],"z":[10,4,0,0,0,0,0]},"width":[0,10,12,10,0],"height":[0,10,13,12,0],"propeller":false,"texture":[2,8,3,3]},"side_propellers":{"section_segments":10,"offset":{"x":25,"y":30,"z":0},"position":{"x":[-5,-5,0,0,-5,-5,-5],"y":[-60,-50,-20,0,20,75,70],"z":[7,3,0,0,0,0,0]},"width":[0,10,15,15,12,10,0],"height":[0,10,15,15,10,5,0],"angle":0,"propeller":true,"texture":[3,63,4,10,3,17]},"cannons":{"section_segments":12,"offset":{"x":40,"y":30,"z":0},"position":{"x":[0,0,0,0,-5,-5,-5],"y":[-50,-45,-20,0,20,50,55],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,10,15,10,0],"height":[0,5,10,10,8,5,0],"angle":1,"propeller":false,"texture":[6,4,10,4,63,4],"laser":{"damage":[6,12],"rate":2.5,"type":1,"speed":[100,150],"number":1,"error":0}}},"wings":{"main":{"length":[55,20],"width":[100,50,30],"angle":[-15,30],"position":[50,70,40],"bump":{"position":-20,"size":10},"offset":{"x":0,"y":0,"z":0},"texture":[11,63],"doubleside":true},"main2":{"length":[15,15,15],"width":[50,50,50,50],"angle":[-10,-40,-15],"position":[30,40,35,50],"doubleside":true,"bump":{"position":10,"size":5},"texture":[11,4,63],"offset":{"x":5,"y":30,"z":24}}},"typespec":{"name":"R-34","level":6,"model":9,"code":609,"specs":{"shield":{"capacity":[200,325],"reload":[4,6]},"generator":{"capacity":[100,180],"reload":[30,36]},"ship":{"mass":255,"speed":[70,95],"rotation":[35,65],"acceleration":[90,130]}},"shape":[3.68,3.332,2.758,2.183,1.794,1.529,1.346,1.305,1.312,1.678,1.719,1.715,1.747,1.811,1.887,2.786,2.954,3.203,3.379,3.569,3.846,4.006,4.215,4.014,3.933,3.687,3.933,4.014,4.215,4.006,3.846,3.569,3.379,3.203,2.954,2.786,1.887,1.811,1.747,1.715,1.719,1.678,1.312,1.305,1.346,1.529,1.794,2.183,2.758,3.332],"lasers":[{"x":0,"y":-3.68,"z":0.368,"angle":0,"damage":[90,138],"rate":1,"type":1,"speed":[180,220],"number":1,"spread":0,"error":0,"recoil":100},{"x":1.44,"y":-0.736,"z":0,"angle":1,"damage":[6,12],"rate":2.5,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.44,"y":-0.736,"z":0,"angle":-1,"damage":[6,12],"rate":2.5,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.215}}';
let F_22_610 = '{"name":"F-22","designer":"Thuliux & Nex & ☒☒☒","level":6,"model":10,"size":0.9,"zoom":0.8,"specs":{"shield":{"capacity":[180,250],"reload":[6,10]},"generator":{"capacity":[300,600],"reload":[40,80]},"ship":{"mass":200,"speed":[120,145],"rotation":[35,55],"acceleration":[150,170]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-17,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-100,-95,-70,-30,0,30,50,85,100],"z":[-13,-10,-5,-5,0,0,0,0,0]},"width":[0,5,23,35,24,23,30,25,20,0],"height":[0,6,12,20,15,10,12,12,10,10],"texture":[4,4,3,4,8,4,13,4]},"wingconnect":{"section_segments":8,"offset":{"x":80,"y":40,"z":-10},"position":{"x":[-10,0,-8,4],"y":[-75,-30,40,70],"z":[0,0,0,0]},"width":[2,12,8,2],"height":[2,10,10,2],"angle":0,"propeller":false,"texture":63},"NUKE":{"section_segments":6,"offset":{"x":0,"y":45,"z":-30},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,3,4,5,5,0],"angle":0,"laser":{"damage":[50,100],"rate":2,"type":1,"speed":[2.5,5],"number":3,"angle":270},"propeller":false},"back":{"section_segments":10,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0],"y":[90,95,100,105,90],"z":[0,0,0,0,0]},"width":[10,15,18,19,2],"height":[3,5,7,8,2],"texture":[63],"propeller":true},"cockpit2":{"section_segments":8,"offset":{"x":0,"y":-86,"z":6},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-20,0,20,30,55,60],"z":[-13,-3,0,0,0,0]},"width":[0,12,15,15,11,0],"height":[0,10,13,12,12,0],"texture":[7,9,63,9,7]},"cockpit":{"section_segments":0,"offset":{"x":0,"y":-86,"z":6},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-13,-5,0,0,0]},"width":[0,10,13,10,0],"height":[0,10,13,12,0],"texture":[7,9,9,7]},"engin":{"section_segments":8,"offset":{"x":30,"y":-30,"z":-5},"position":{"x":[0,0,0,0,-10,0,0,0,0],"y":[0,-15,0,20,60,80,100,60],"z":[0,0,0,0,-5,0,0,0]},"width":[0,12,15,20,20,15,12,0],"height":[0,12,12,18,18,10,5,0],"texture":[4,63,4,8,4,63,4,3,4,3],"propeller":true,"angle":0},"laser2":{"section_segments":12,"offset":{"x":100,"y":25,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-30,-25,-10,20,30,40,50,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,15,20,15,10,10,0],"height":[0,8,10,10,10,8,8,0],"texture":[3,4,8,3],"propeller":0}},"wings":{"top":{"offset":{"x":-11,"y":45,"z":-1},"length":[50],"width":[50,30],"angle":[50],"position":[0,50],"doubleside":true,"texture":[3],"bump":{"position":10,"size":5}},"half":{"offset":{"x":30,"y":20,"z":-7},"length":[40],"width":[70,40],"angle":[8],"position":[0,20],"doubleside":true,"texture":[3],"bump":{"position":10,"size":15}},"mainholyhsit":{"offset":{"x":0,"y":20,"z":-13},"length":[80,0,65],"width":[180,80,80,40],"angle":[0,0,0],"position":[-40,10,30,70],"doubleside":true,"texture":[4,4],"bump":{"position":10,"size":10}},"main2":{"offset":{"x":0,"y":90,"z":-13},"length":[60],"width":[100,30],"angle":[0],"position":[-50,30],"doubleside":true,"texture":[4],"bump":{"position":10,"size":10}}},"typespec":{"name":"F-22","level":6,"model":10,"code":610,"specs":{"shield":{"capacity":[180,250],"reload":[6,10]},"generator":{"capacity":[300,600],"reload":[40,80]},"ship":{"mass":200,"speed":[120,145],"rotation":[35,55],"acceleration":[150,170]}},"shape":[2.106,1.971,1.723,1.481,1.375,1.305,1.263,1.24,1.254,1.441,1.459,1.503,1.978,2.083,2.183,2.341,2.977,3.225,3.276,2.554,2.513,2.536,2.659,2.247,2.008,1.696,2.008,2.247,2.659,2.536,2.513,2.554,3.276,3.225,2.977,2.341,2.183,2.083,1.98,1.503,1.459,1.441,1.254,1.24,1.263,1.305,1.375,1.481,1.723,1.971],"lasers":[{"x":0,"y":-0.09,"z":-0.54,"angle":0,"damage":[50,100],"rate":2,"type":1,"speed":[2.5,5],"number":3,"spread":270,"error":0,"recoil":0}],"radius":3.276}}';
let Phantom_611 = '{"name":"Phantom","designers":"Nex & ☒☒☒","level":6,"model":11,"size":1.55,"zoom":0.8,"specs":{"shield":{"capacity":[130,190],"reload":[8,10]},"generator":{"capacity":[140,210],"reload":[30,43]},"ship":{"mass":150,"speed":[110,140],"rotation":[40,62],"acceleration":[130,150]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-70,-60,-30,0,20,55,75,95,85],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,8,14,17,14,18,14,10,0],"height":[0,5,10,13,15,15,10,8,0],"texture":[1,3,4,3,8,4,8,17],"propeller":true},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-65,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-5,0,20,40,50,70,85],"z":[-7,-5,0,0,3,4,3,5]},"width":[0,5,8,9,9,6,0],"height":[0,8,10,8,8,8,0],"texture":[3,9,9,2,3,4,3,2]},"cannons":{"section_segments":8,"offset":{"x":30,"y":45,"z":-15},"position":{"x":[0,0,0,0,-10,-25],"y":[-75,-70,-53,-25,-10,0],"z":[0,0,0,0,0,0]},"width":[0,5,6,8,10,0],"height":[0,3,5,6,8,0],"angle":1,"laser":{"damage":[5,10],"rate":10,"type":1,"speed":[160,190],"number":1},"propeller":0,"texture":[6,3,3,3,1,3,1,3,1,3]},"cannons2":{"section_segments":8,"offset":{"x":25,"y":33,"z":-15},"position":{"x":[0,0,0,0,-10,-25],"y":[-75,-70,-53,-25,-10,0],"z":[0,0,0,0,0,0]},"width":[0,5,6,8,10,0],"height":[0,3,5,6,8,0],"angle":1,"laser":{"damage":[2,5],"rate":10,"type":1,"speed":[140,160],"number":1},"propeller":0,"texture":[6,3,3,3,1,3,1,3,1,3]},"body":{"section_segments":8,"offset":{"x":20,"y":0,"z":-5},"position":{"x":[-5,-3,0,0,0,0,-3,-5],"y":[-25,-20,-10,0,20,40,60,50],"z":[0,0,0,0,0,0,0,0]},"width":[0,7,10,12,10,12,8,0],"height":[0,4,6,8,9,10,10,0],"texture":[1,3,1,3,4,4,17],"propeller":true}},"wings":{"w":{"offset":{"x":-3,"y":40,"z":0},"length":[12,8,20,10],"width":[90,40,80,70,85],"angle":[10,-15,-10,0],"position":[-30,-60,-60,-10,15],"texture":[4,63,4,63],"bump":{"position":10,"size":10}},"plswork":{"doubleside":true,"offset":{"x":5,"y":-25,"z":4},"length":[20,40],"width":[60,35,15],"angle":[15,-20],"position":[0,45,80],"texture":[63,4],"bump":{"position":10,"size":5}},"top":{"doubleside":true,"offset":{"x":10,"y":30,"z":5},"length":[30],"width":[50,30],"angle":[60],"position":[0,50],"texture":[3],"bump":{"position":10,"size":10}}},"typespec":{"name":"Phantom","level":6,"model":11,"code":611,"specs":{"shield":{"capacity":[130,190],"reload":[8,10]},"generator":{"capacity":[140,210],"reload":[30,43]},"ship":{"mass":150,"speed":[110,140],"rotation":[40,62],"acceleration":[130,150]}},"shape":[2.635,2.448,1.929,1.813,1.568,1.476,1.405,1.304,1.296,1.211,1.155,1.139,1.21,1.313,1.463,1.534,1.633,2.154,2.63,2.727,2.675,3.335,2.501,3.045,2.499,2.485,2.499,3.045,2.501,3.335,2.675,2.727,2.63,2.154,1.633,1.534,1.463,1.313,1.21,1.139,1.155,1.211,1.296,1.304,1.405,1.476,1.568,1.813,1.929,2.448],"lasers":[{"x":0.889,"y":-0.93,"z":-0.465,"angle":1,"damage":[5,10],"rate":10,"type":1,"speed":[160,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.889,"y":-0.93,"z":-0.465,"angle":-1,"damage":[5,10],"rate":10,"type":1,"speed":[160,190],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.734,"y":-1.302,"z":-0.465,"angle":1,"damage":[2,5],"rate":10,"type":1,"speed":[140,160],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.734,"y":-1.302,"z":-0.465,"angle":-1,"damage":[2,5],"rate":10,"type":1,"speed":[140,160],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.335}}';
let Sinistyte_612 = '{"name":"Sinistyte","designer":"Nova","level":6,"model":12,"size":1.25,"specs":{"shield":{"capacity":[150,200],"reload":[7,9]},"generator":{"capacity":[130,160],"reload":[30,38]},"ship":{"mass":200,"speed":[110,120],"rotation":[50,70],"acceleration":[115,125]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-120,"z":-1},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,4,26,41,78,124,132,156,188,207,226,220],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,14,20,29,35,40,43,42,32,25,0],"height":[0,5,12,16.5,24,29,29,25,25,25,20,0],"propeller":true,"texture":[2,3,8,11,63,2,11,2,8,13,17],"laser":{"damage":[90,100],"rate":2,"type":2,"speed":[190,210],"number":1,"error":0}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-65,"z":18.5},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[0,4,42,72,69,96,120,150,155],"z":[0,0,0,0,5,8,8,8,5]},"width":[0,7,15,17,17,17,16,5,0],"height":[0,3,17,20,17,18,14,5,0],"texture":[2,9,11,17,2,3,63]},"strut1":{"section_segments":8,"offset":{"x":55,"y":24,"z":-10},"position":{"x":[0,0,0,0],"y":[-10,8,49,55],"z":[0,0,2,3]},"width":[0,6,7,0],"height":[0,12,14,0],"texture":[63,2,3]},"strut2":{"section_segments":8,"offset":{"x":60,"y":90,"z":28},"position":{"x":[0,0,0,0],"y":[0,8,42,45],"z":[0,0,2,3]},"width":[0,5,6,0],"height":[0,7,8,0],"texture":[63,13,17]},"cannon2":{"section_segments":6,"offset":{"x":53,"y":65,"z":-15},"position":{"x":[0,0,0,0,0,0],"y":[-81,-108,-54,0,27,40.5],"z":[0,0,0,0,0,0]},"width":[0,5.2,11.7,14.3,9.1,0],"height":[0,5,9,11,10,0],"texture":[4,4,10,13,16.9],"laser":{"damage":[5,8],"rate":6,"type":1,"speed":[190,190],"number":1,"angle":2.5},"propeller":1},"cannon":{"section_segments":8,"offset":{"x":20,"y":80,"z":28},"propeller":1,"position":{"x":[0,0,0,0,0,0,0],"y":[-100,-90,-50,-20,20,50,50],"z":[-10,-10,0,0,0,0,0]},"width":[0,4,10,11,10,8,0],"height":[0,5,20,22,23,10,0],"angle":0,"texture":[3,4,10,2,13,17],"laser":{"damage":[10,15],"rate":4,"type":1,"speed":[190,190],"number":1,"error":1}}},"wings":{"bridge1":{"length":[10,23],"width":[20,218,100],"angle":[0,0],"position":[90,30,65],"doubleside":true,"texture":[63,3],"bump":{"position":40,"size":12.3},"offset":{"x":10,"y":-57,"z":5}},"bridge2":{"length":[0,55,0,2,11],"width":[0,122,36,105,105,30],"angle":[0,-30,-20,0,-10],"position":[0,13,35,10,15,30],"doubleside":true,"texture":[1,11,17,63,2],"bump":{"position":17,"size":11},"offset":{"x":18,"y":55,"z":27.2}},"main":{"length":[65],"width":[57,30],"angle":[-10,0],"position":[0,32],"doubleside":true,"texture":[63],"bump":{"position":30,"size":12},"offset":{"x":0,"y":86,"z":39}}},"typespec":{"name":"Sinistyte","level":6,"model":12,"code":612,"specs":{"shield":{"capacity":[150,200],"reload":[7,9]},"generator":{"capacity":[130,160],"reload":[30,38]},"ship":{"mass":200,"speed":[110,120],"rotation":[50,70],"acceleration":[115,125]}},"shape":[3,3.437,3.103,2.442,2.048,1.781,1.61,1.795,1.775,1.672,1.601,1.558,1.549,1.582,1.743,1.873,2.058,2.318,2.69,3.073,3.356,3.691,3.693,3.325,3.308,2.919,3.308,3.325,3.693,3.691,3.356,3.073,2.69,2.318,2.058,1.873,1.743,1.582,1.549,1.558,1.601,1.672,1.775,1.795,1.61,1.781,2.048,2.442,3.103,3.437],"lasers":[{"x":0,"y":-3,"z":-0.025,"angle":0,"damage":[90,100],"rate":2,"type":2,"speed":[190,210],"number":1,"spread":0,"error":0,"recoil":0},{"x":1.325,"y":-1.075,"z":-0.375,"angle":0,"damage":[5,8],"rate":6,"type":1,"speed":[190,190],"number":1,"spread":2.5,"error":0,"recoil":0},{"x":-1.325,"y":-1.075,"z":-0.375,"angle":0,"damage":[5,8],"rate":6,"type":1,"speed":[190,190],"number":1,"spread":2.5,"error":0,"recoil":0},{"x":0.5,"y":-0.5,"z":0.7,"angle":0,"damage":[10,15],"rate":4,"type":1,"speed":[190,190],"number":1,"spread":0,"error":1,"recoil":0},{"x":-0.5,"y":-0.5,"z":0.7,"angle":0,"damage":[10,15],"rate":4,"type":1,"speed":[190,190],"number":1,"spread":0,"error":1,"recoil":0}],"radius":3.693}}';
let Deadshot_613 = '{"name":"Deadshot","level":6,"model":13,"size":1.35,"zoom":1,"specs":{"shield":{"capacity":[200,255],"reload":[7,9]},"generator":{"capacity":[180,215],"reload":[20,45]},"ship":{"mass":185,"speed":[80,108],"rotation":[40,65],"acceleration":[100,130]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":30,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-105,-110,-100,-80,-50,0,30,70,80,75],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,8,14,19,25,25,30,30,20,0],"height":[0,12,18,19,20,20,24,24,20,0],"texture":[17,4,63,3,11,2,3,12,17],"propeller":true,"laser":{"damage":[15,25],"rate":7,"type":1,"speed":[150,180],"number":1,"error":0}},"cannon":{"section_segments":6,"offset":{"x":0,"y":-10,"z":-10},"position":{"x":[0,0,0,0,0,0],"y":[-40,-50,-20,0,20,30],"z":[0,0,0,0,0,20]},"width":[0,5,8,11,7,0],"height":[0,5,8,11,10,0],"angle":0,"laser":{"damage":[8,15],"rate":9,"type":1,"speed":[160,200],"number":1,"error":0}},"side":{"section_segments":8,"offset":{"x":25,"y":0,"z":0},"position":{"x":[-17,-12,-3,0,0,0,0,0,0,0,0],"y":[-70,-60,-30,-5,5,20,35,55,75,90,85],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,10,12,15,15,15,15,15,15,10,0],"height":[0,5,7,10,10,10,10,10,10,7,0],"texture":[3,4,10,3,63,4,11,63,3,4],"propeller":false},"intake":{"section_segments":12,"offset":{"x":25,"y":0,"z":7},"position":{"x":[-10,-3,-2,-2,-2,4,7,0,0,0],"y":[-60,-20,0,35,60,70,85,95,100],"z":[-2,-6,0,0,0,0,0,0,0,0]},"width":[0,9,10,10,17,17,20,5,0],"height":[0,12,10,10,10,10,10,5,0],"texture":[13,4,63,18,2,3,4,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-20,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-45,-20,0,30,50,90,125],"z":[-2,-4,-5,0,0,0,0,0]},"width":[2,12,15,17,17,15,0],"height":[0,12,19,16,15,15,0],"texture":[9,9,9,10,4,63],"propeller":false},"propulsor":{"section_segments":10,"offset":{"x":40,"y":58,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-30,-24,-28,-15,-10,10,30,40,50,60,55],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,6,11,12,13,13,13,11,8,0],"height":[0,4,6,11,12,13,13,13,11,8,0],"texture":[3,4,3,4,11,3,63,4,4,17],"propeller":true},"propulsor2":{"section_segments":12,"offset":{"x":15,"y":68,"z":20},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-60,-54,-48,-35,-20,0,25,40,50,60,55],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,4,6,11,12,13,13,13,11,8,0],"height":[0,4,6,11,12,13,13,13,11,8,0],"texture":[4,63,3,4,63,10,4,3,63,17],"propeller":true}},"wings":{"main":{"doubleside":1,"offset":{"x":0,"y":60,"z":0},"length":[50,20,20],"width":[70,50,50,50],"texture":[3,63,4],"angle":[0,0,0],"position":[-50,30,30,50],"bump":{"position":10,"size":5}},"main2":{"doubleside":true,"offset":{"x":10,"y":-60,"z":-5},"length":[0,20,20],"width":[0,160,140,70],"angle":[0,0,0,0],"position":[0,0,0,50],"texture":[63,3.5,63],"bump":{"position":20,"size":5}},"winglet":{"length":[10,20],"width":[50,50,40],"angle":[25,25],"position":[80,90,120],"texture":[2,4],"bump":{"position":10,"size":10},"offset":{"x":25,"y":-20,"z":25}},"winglet2":{"length":[20,10],"width":[30,30,20],"angle":[20,20],"position":[0,5,20],"texture":[3,4],"bump":{"position":10,"size":5},"offset":{"x":20,"y":-10,"z":5}}},"typespec":{"name":"Deadshot","level":6,"model":13,"code":613,"specs":{"shield":{"capacity":[200,255],"reload":[7,9]},"generator":{"capacity":[180,215],"reload":[20,45]},"ship":{"mass":185,"speed":[80,108],"rotation":[40,65],"acceleration":[100,130]}},"shape":[2.164,3.79,3.637,3.064,2.561,2.211,1.996,1.828,1.662,1.532,1.445,1.394,1.359,1.36,1.391,1.448,1.509,1.577,3.037,3.806,4.381,3.932,3.525,3.439,3.511,3.463,3.511,3.439,3.525,3.932,4.381,3.806,3.037,1.577,1.509,1.448,1.391,1.36,1.359,1.394,1.445,1.532,1.662,1.828,1.996,2.211,2.561,3.064,3.637,3.79],"lasers":[{"x":0,"y":-2.16,"z":0,"angle":0,"damage":[15,25],"rate":7,"type":1,"speed":[150,180],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":-1.62,"z":-0.27,"angle":0,"damage":[8,15],"rate":9,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":4.381}}';
let Chimera_614 = '{"name":"Chimera","level":6,"model":14,"size":1.69,"zoom":0.8,"specs":{"shield":{"capacity":[260,315],"reload":[8,10]},"generator":{"capacity":[190,250],"reload":[30,45]},"ship":{"mass":220,"speed":[90,110],"rotation":[40,62],"acceleration":[90,125]}},"bodies":{"rail1":{"section_segments":8,"offset":{"x":0,"y":0,"z":10},"position":{"x":[-10,-15,-15,0,0,0,0,0],"y":[-117,-105,-60,0,70,105,90],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,5,25,25,15,0],"height":[0,10,15,20,25,15,0],"propeller":false,"texture":[63,3,18,11,3,12]},"side_propulsors":{"section_segments":10,"offset":{"x":22,"y":17,"z":9.8},"position":{"x":[0,0,0,0,0,0,0,0,-5,-5],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,15,18,20,13,15,18,10,0],"height":[0,10,15,18,20,13,15,18,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,12]},"rail2":{"section_segments":8,"offset":{"x":0,"y":0,"z":10},"position":{"x":[10,15,15,0,0,0,0,0],"y":[-117,-105,-60,0,70,105,90],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,5,25,25,15,0],"height":[0,10,15,20,25,15,0],"propeller":true,"texture":[63,3,18,11,3,12]},"gunDeco0":{"vertical":true,"section_segments":24,"offset":{"x":2,"y":-5,"z":101},"position":{"x":[0,10,10,0],"y":[0,10,20,30],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"propeller":false,"texture":[17,17,17,17]},"gunDeco1":{"vertical":true,"section_segments":24,"offset":{"x":2,"y":-5,"z":90},"position":{"x":[0,10,10,0],"y":[0,10,20,30],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"propeller":false,"texture":[17,17,17,17]},"gunDeco2":{"vertical":true,"section_segments":24,"offset":{"x":2,"y":-5,"z":79},"position":{"x":[0,10,10,0],"y":[0,10,20,30],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"propeller":false,"texture":[17,17,17,17]},"gunDeco3":{"vertical":true,"section_segments":24,"offset":{"x":2,"y":-5,"z":68},"position":{"x":[0,10,10,0],"y":[0,10,20,30],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"propeller":false,"texture":[17,17,17,17]},"gunDeco4":{"vertical":true,"section_segments":24,"offset":{"x":2,"y":-5,"z":57},"position":{"x":[0,10,10,0],"y":[0,10,20,30],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"propeller":false,"texture":[17,17,17,17]},"railCells":{"vertical":true,"section_segments":8,"offset":{"x":0,"y":10,"z":35},"position":{"x":[0,0,0,0],"y":[0,0,20,20],"z":[0,0,0,0]},"width":[0,10,10,0],"height":[0,10,10,0],"propeller":false,"texture":[8,8,17,17]},"sparkGuns":{"section_segments":8,"offset":{"x":15,"y":-90,"z":10},"position":{"x":[0,0,0,0],"y":[0,0,10,9],"z":[0,0,0,0]},"width":[0,10,10,0],"height":[0,10,10,0],"angle":90,"propeller":false,"texture":[8,8,17,17],"laser":{"damage":[1,2],"rate":10,"type":2,"speed":[10,20],"number":5,"error":65}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":5,"z":25},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,0,20,45,70],"z":[0,0,0,0,1]},"width":[0,8,12,13,0],"height":[0,12,15,12,0],"propeller":false,"texture":[4,9,9,4]},"cannon":{"section_segments":8,"offset":{"x":0,"y":-10,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-43,-50,-20,0,20,50],"z":[0,0,0,0,0,0]},"width":[0,5,10,10,15,0],"height":[0,5,15,15,10,0],"angle":0,"laser":{"damage":[3,6],"speed":[150,200],"rate":1.69,"type":1,"number":30,"recoil":8,"error":0},"propeller":false,"texture":[17,3,3,3,3,3]},"deco":{"section_segments":8,"offset":{"x":45,"y":50,"z":-10},"position":{"x":[0,0,5,5,0,0],"y":[-52,-50,-20,0,20,25],"z":[0,0,0,0,0,0]},"width":[0,5,10,10,5,0],"height":[0,5,8,10,8,0],"angle":1,"laser":{"damage":[4,8],"rate":5,"type":1,"speed":[100,150],"number":1,"error":0},"texture":10}},"wings":{"main":{"length":[55,15],"width":[70,50,50],"angle":[-10,20],"position":[30,50,70],"doubleside":true,"bump":{"position":30,"size":10},"texture":[18,63],"offset":{"x":0,"y":0,"z":5}},"winglets":{"length":[12,8],"width":[20,15,65],"angle":[10,-10],"position":[-50,-40,-55],"doubleside":true,"bump":{"position":0,"size":30},"texture":63,"offset":{"x":12,"y":0,"z":5}},"stab1":{"length":[40,10],"width":[50,20,20],"angle":[40,30],"position":[70,75,80],"doubleside":true,"texture":63,"bump":{"position":0,"size":20},"offset":{"x":0,"y":0,"z":0}},"stab2":{"length":[40,10],"width":[50,20,20],"angle":[40,30],"position":[70,75,80],"doubleside":true,"texture":63,"bump":{"position":0,"size":20},"offset":{"x":-5,"y":-30,"z":0}},"stab3":{"length":[40,10],"width":[50,20,20],"angle":[40,30],"position":[70,75,80],"doubleside":true,"texture":63,"bump":{"position":0,"size":20},"offset":{"x":-10,"y":-60,"z":0}}},"typespec":{"name":"Railgun","level":6,"model":14,"code":614,"specs":{"shield":{"capacity":[260,315],"reload":[8,10]},"generator":{"capacity":[190,250],"reload":[30,45]},"ship":{"mass":220,"speed":[90,110],"rotation":[40,62],"acceleration":[90,125]}},"shape":[3.509,3.969,3.598,3.146,2.516,1.995,1.675,1.467,1.317,0.915,0.874,0.853,1.66,1.752,1.881,2.076,2.301,2.85,3.163,3.619,3.954,3.116,3.319,3.399,3.585,3.556,3.585,3.399,3.319,3.116,3.954,3.619,3.163,2.85,2.301,2.076,1.881,1.752,1.66,0.853,0.874,0.915,1.317,1.467,1.675,1.995,2.516,3.146,3.598,3.969],"lasers":[{"x":0.507,"y":-3.042,"z":0.338,"angle":90,"damage":[1,2],"rate":10,"type":2,"speed":[10,20],"number":5,"spread":0,"error":65,"recoil":0},{"x":-0.507,"y":-3.042,"z":0.338,"angle":-90,"damage":[1,2],"rate":10,"type":2,"speed":[10,20],"number":5,"spread":0,"error":65,"recoil":0},{"x":0,"y":-2.028,"z":0.338,"angle":0,"damage":[3,6],"rate":1.69,"type":1,"speed":[150,200],"number":30,"spread":0,"error":0,"recoil":8},{"x":1.49,"y":-0.067,"z":-0.338,"angle":1,"damage":[4,8],"rate":5,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-1.49,"y":-0.067,"z":-0.338,"angle":-1,"damage":[4,8],"rate":5,"type":1,"speed":[100,150],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.969}}';
let Vampire_615 = '{"name":"Vampire","designer":"nex","level":6,"model":15,"size":1.5,"specs":{"shield":{"capacity":[230,275],"reload":[6,9]},"generator":{"capacity":[190,225],"reload":[35,50]},"ship":{"mass":170,"speed":[120,130],"rotation":[90,90],"acceleration":[120,120]}},"bodies":{"main_DOESNOTSHOOT":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-35,-45,-15,10,30,45,70,100,90],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,10,15,25,15,15,25,20,0],"height":[0,6,13,17,13,13,17,13,0],"texture":[3,11,1,63,4,3,8,17],"propeller":true},"boris":{"section_segments":8,"offset":{"x":20,"y":30,"z":-5},"position":{"x":[0,0,-1,0,0,0,10,0,0],"y":[-105,-97,-80,-60,-20,0,20,50,40],"z":[-6.6,-10,-10,-10,0,0,0,0,0]},"width":[0,7,10,10,8,14,15,15,0],"height":[0,6,8,12,8,13,13,13,0],"texture":[6,4,1,10,8,4,13,17],"propeller":false,"angle":5,"laser":{"damage":[4,8],"rate":1,"type":2,"speed":[140,180],"number":15,"error":25,"angle":0,"recoil":15}},"propeller":{"section_segments":8,"offset":{"x":24,"y":25,"z":-5},"position":{"x":[0,0],"y":[41,40],"z":[0,0]},"width":[15,0],"height":[11,0],"texture":[69],"propeller":true,"angle":5},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-1,"z":5},"position":{"x":[0,0,0,0,0,0],"y":[-40,-25,-5,20,30,20],"z":[0,0,0,3,0,0]},"width":[0,9,12,17,10,0],"height":[0,8,12,14,13,0],"texture":[3,9,9,4],"propeller":false}},"wings":{"holy_moly_its_goku":{"offset":{"x":29,"y":44,"z":0},"length":[25,30],"width":[60,35,20],"angle":[-30,-20],"position":[0,10,25],"texture":[11,4],"doubleside":true,"bump":{"position":0,"size":10}},"what_no_way":{"offset":{"x":5,"y":45,"z":0},"length":[30,30],"width":[60,35,20],"angle":[30,20],"position":[0,15,35],"texture":[11,4],"doubleside":true,"bump":{"position":0,"size":10}},"teeth":{"offset":{"x":8,"y":-60,"z":-19},"length":[10,-10,25],"width":[15,15,55,25],"angle":[-30,-30,-20],"position":[10,3,-20,10],"texture":[4,13,63],"doubleside":true,"bump":{"position":10,"size":15}},"backteeth":{"offset":{"x":33,"y":60,"z":-10},"length":[30,-10,30],"width":[25,15,55,20],"angle":[-28,-20,-30],"position":[-20,-30,-40,-10],"texture":[4,13,63],"doubleside":true,"bump":{"position":10,"size":15}},"somanyteeth":{"offset":{"x":15,"y":10,"z":-5},"length":[10,-10,25],"width":[15,15,55,20],"angle":[30,30,50],"position":[-10,-20,-30,0],"texture":[4,13,63],"doubleside":true,"bump":{"position":10,"size":15}}},"typespec":{"name":"Vampire","level":6,"model":15,"code":615,"specs":{"shield":{"capacity":[230,275],"reload":[6,9]},"generator":{"capacity":[190,225],"reload":[35,50]},"ship":{"mass":170,"speed":[120,130],"rotation":[90,90],"acceleration":[120,120]}},"shape":[1.829,3.234,2.747,2.384,2.136,1.76,1.481,1.028,0.933,0.896,0.885,1.531,1.62,1.758,1.943,2.226,2.604,2.82,3.244,3.348,3.231,3.146,2.667,3.059,3.054,3.006,3.054,3.059,2.667,3.146,3.231,3.348,3.244,2.82,2.604,2.226,1.943,1.758,1.62,1.531,0.885,0.896,0.933,1.028,1.481,1.76,2.136,2.384,2.747,3.234],"lasers":[{"x":0.325,"y":-2.238,"z":-0.15,"angle":5,"damage":[4,8],"rate":1,"type":2,"speed":[140,180],"number":15,"spread":0,"error":25,"recoil":15},{"x":-0.325,"y":-2.238,"z":-0.15,"angle":-5,"damage":[4,8],"rate":1,"type":2,"speed":[140,180],"number":15,"spread":0,"error":25,"recoil":15}],"radius":3.348}}';

let Spectator_101 = '{"name":"Spectator","level":1,"model":1,"size":0.025,"zoom":0.075,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}';

let modShip = function(ship, handler) {
  typeof handler == "function" && [[],["typespec"]].forEach(i => {
    let param = ship;
    i.forEach(j => (param = param[j]));
    handler(param);
  });
}

let ships = [];
ships.push(A_Speedster_601);
ships.push(Broly_602);
ships.push(Sparrow_603);
ships.push(Contraband_604);
ships.push(A_Stasis_605);
ships.push(Tripod_606);
ships.push(Streamliner_607);
ships.push(Mk47_608);
ships.push(R_34_609);
ships.push(F_22_610);
ships.push(Phantom_611);
ships.push(Sinistyte_612);
ships.push(Deadshot_613);
ships.push(Chimera_614);
ships.push(Vampire_615);

let ships_count = ships.length;
let zeroes = [1e-30, 1e-30];

if (!game.custom.ship_infos) {
  let ship_infos = ships.map(i => {
    let t = JSON.parse(i), clone = JSON.parse(i);
    modShip(clone, function (ship) {
      ship.specs.generator = {
        capacity: zeroes,
        reload: zeroes
      }
      Object.assign(ship.specs.ship, {
        speed: zeroes,
        rotation: zeroes,
        acceleration: zeroes,
      });
      ship.model += ships_count;
      delete ship.specs.ship.dash;
    });
    clone.typespec.code = clone.level * 100 + clone.model;
    ["bodies","wings"].map(i => Object.values(clone[i]||{})).flat().filter(i => i).forEach(body => {
      delete body.laser;
    });
    clone.typespec.lasers = [];
    ships.push(JSON.stringify(clone));
    return {name: t.name, designer: t.designer||"", code: t.level*100 + t.model}
  }),
  codes = ship_infos.map(info => info.code),
  maxNamelength = Math.max(...ship_infos.map(info => info.name.length)),
  maxDesignerlength = Math.max(...ship_infos.map(info => info.designer.length)),
  max_ship_items = Math.max(1, max_item_per_ship_selection_screen) || 1, temp = [];

  while (ship_infos.length > 0) temp.push(ship_infos.splice(0, max_ship_items));

  ship_infos = temp;
  Object.assign(game.custom, {
    ship_infos, codes, maxNamelength, maxDesignerlength, max_ship_items
  })
}

let { ship_infos, codes, maxNamelength, maxDesignerlength, max_ship_items } = game.custom;

let ship_infos_flattened = ship_infos.flat();

let getShipsPage = function (ship) {
  let custom = ship?.custom || {}, ship_info = ship_infos[custom.ships_page];
  if (Array.isArray(ship_info)) return {index: +custom.ships_page, list: ship_info};
  custom.ships_page = 0;
  return {index: 0, list: ship_infos[0]}
}

ships.push(Spectator_101);

let map_size = 200, rand = function(num) {
  return Math.floor(Math.random()*num)
}, soundtracks = ["argon","crystals"], n = Math.round(Math.max(nodes_count_per_width,1)), vocabulary = [
  {text: "Duel", icon:"\u00be", key:"D"},
  {text: "Me", icon:"\u004f", key:"E"},
  {text: "$#%!&", icon: "\u{1f92c}", key: "F"},
  {text: "GoodGame", icon:"\u00a3", key:"G"},
  {text: "Hello", icon:"\u0046", key:"H"},
  {text: "Lag", icon:"\u{231B}", key:"I"},
  {text: "Leader", icon:"\u002e", key:"L"},
  {text: "No", icon:"\u004d", key:"N"},
  {text: "You", icon:"\u004e", key:"O"},
  {text: "How?!", icon:"\u004b", key:"Q"},
  {text: "Sorry", icon:"\u00a1", key:"S"},
  {text: "Wait", icon:"\u0048", key:"T"},
  {text: "Lose", icon:"\u{1F948}", key:"U"},
  {text: "Thanks", icon:"\u0041", key:"X"},
  {text: "Yes", icon:"\u004c", key:"Y"},
  {text: "Win", icon:"\u{1F947}", key:"W"},
];

while (codes.length > 5) codes.splice(rand(codes.length),1);

this.options = {
  map_size: map_size,
  custom_map: "",
  starting_ship: 801,
  ships: ships,
  reset_tree: true,
  max_players: (Math.pow(n,2)-1)*4,
  radar_zoom: map_size/arena_radius/2,
  weapons_store: false,
  max_level: 1,
  speed_mod: 1.2,
  choose_ship: codes,
  asteroids_strength: 1e6,
  crystal_value: 0,
  vocabulary: vocabulary,
  soundtrack: soundtracks[rand(soundtracks.length)]+".mp3",
  // anti-cheat features
  mines_self_destroy: true,
  mines_destroy_delay: 0,
  projectile_speed: Number.MAX_VALUE
}
// game components
let modUtils = {
  setTimeout: function(f,time){
    this.jobs.push({f: f,time: game.step+time});
  },
  jobs: [],
  tick: function(){
    let t = game.step;
    for (let i=this.jobs.length-1;i>=0;i--){
      let job = this.jobs[i];
      if (t>=job.time){
        try {
          job.f();
        }
        catch (err){
        }
        this.jobs.splice(i,1);
      }
    }
  }
}, insideRoundCornerCustomLayout = function (h, s, l, custom = [], scale = 1) {
  let fill = `hsla(${h},${s}%,${l}%, 1)`;
  for (let cp of custom) {
    if (!cp.forceCustomColor && (cp.type == "text" || cp.type == "player")) cp.color = fill;
    if (!cp.forceCustomFill) delete cp.fill;
    if (!cp.forceCustomStroke) delete cp.stroke;
    delete cp.forceCustomColor;
    delete cp.forceCustomFill;
    delete cp.forceCustomStroke
  }
  let radius = 20 * scale, diameter = 2 * radius;
  return [
    { type: 'box', position: [0, 0, 100, 100], stroke: fill, fill: `hsla(${h}, ${s}%, ${l}%, ${button_opacity})`, width: 10 * scale },
    { type: 'round', position: [-radius, -radius, diameter, diameter], fill: fill },
    { type: 'round', position: [100-radius, -radius, diameter, diameter], fill: fill },
    { type: 'round', position: [100-radius, 100-radius, diameter, diameter], fill: fill },
    { type: 'round', position: [-radius, 100-radius, diameter, diameter], fill: fill },
    ...custom
  ]
}, buttonCustomUI = function (ship, id, position, visible, clickable, shortcut, custom = [], h, s = 100, l = 50, scale = 1) {
  sendUI(ship, {
    id,
    position,
    visible,
    clickable: clickable ?? visible,
    shortcut,
    components: insideRoundCornerCustomLayout(h, s, l, custom, scale)
  })
}, buttonBasicUI = function (ship, id, position, visible, clickable, shortcut, text, h, s = 100, l = 50, scale = 1) {
  buttonCustomUI(ship, id, position, visible, clickable, shortcut, [
    { type: 'text', position: [0, 20, 100, 30], value: text },
    { type: 'text', position: [0, 50, 100, 30], value: `[${shortcut}]` }
  ], h, s, l, scale)
}, setPicker = function(ship, isActive) {
  isActive = ship.alive && !!isActive;
  let bool = !!ship.custom.spectate
  buttonBasicUI(ship, "spectate", [10,33,10,9], isActive, null, "K", "SPECTATE: "+ (bool?"ON":"OFF"), 180);
  let t = 0, w = 50/n, nearest = ArenaManager.findNearest(ship);
  ArenaManager.list.forEach(arena => {
    let text = arena.lobby ? "Lobby" : ("Arena " + arena.index), i = arena.originalIndex;
    let compo = [
      {type: "text", position: [20,0,60,100], value: text}
    ];
    arena === nearest && compo.push({type: "text", position: [20,0,60,40], value: "You are here"});
    !arena.isAvailable && !arena.lobby && compo.push({type: "text", position: [20,60,60,40], value: "Duel ongoing"});
    buttonCustomUI(ship, "n" + i, [25 + (i%n)*w, 35 + Math.trunc(i/n)*w , w, w], bool&&isActive&&ship.custom.mapped, null, null, compo, 180/(Math.pow(n,2))*(2*i+1))
  });
  let ship_info = getShipsPage(ship).list, wt = Math.PI*2/ship_info.length, br = 21.5;
  ship_info.forEach((info, i) => {
    let nspace = new Array(maxNamelength - info.name.length).fill(" ").join(""), dspace = new Array(maxDesignerlength - info.designer.length).fill(" ").join(""), compo = [
      {type: "text", position: [10,0,80,100], value: nspace + info.name + nspace}
    ];
    (ship.type === info.code) && compo.push({type: "text", position: [10,0,80,40], value: "    ✓    "});
    (info.designer) && compo.push({type: "text", position: [10,60,80,40], value: dspace + "by: " + info.designer + dspace});
    buttonCustomUI(ship, "s" + i, [50 + br*Math.cos(wt*i-Math.PI/2)-5, 50 + br*Math.sin(wt*i-Math.PI/2)-3.5, 10, 9], !bool&&isActive&&ship.custom.shipped, null, null, compo, (180/ship_info.length*(2*i+1)));
  });
  if (ship_info.length < max_ship_items) for (let i = ship_info.length; i < max_ship_items; i++) sendUI(ship, {
    id: "s"+i,
    visible: false
  });
  let multipleShipsPages = ship_infos_flattened.length > max_item_per_ship_selection_screen;
  sendUI(ship, {
    id: "shipview",
    visible: !bool&&isActive&&ship.custom.shipped,
    clickable: false,
    position: [35,35,30,60],
    components: [
      {type: "text", position: [0,65,100,10], value: "Press 7 for previous and 8 for next ship", color: dfl_tcl},
      {type: "round", position: [0,0,100,30/60*100], fill: "hsla(0, 0%, 0%, 0)", width: 1, stroke: dfl_tcl},
      ...(multipleShipsPages ? [{type: "text", position: [0,85,100,10], value: `Page ${ship.custom.ships_page + 1}/${ship_infos.length}`, color: dfl_tcl}] : [])
    ]
  });
  if (multipleShipsPages) {
    buttonBasicUI(ship, "spprev", [25,85,10,8], !bool&&isActive&&ship.custom.shipped, null, "B", "Previous", 0);
    buttonBasicUI(ship, "spnext", [65,85,10,8], !bool&&isActive&&ship.custom.shipped, null, "M", "Next", 0);
  }
  buttonBasicUI(ship, "map", [10,42,10,9], bool&&isActive, null, "M", (ship.custom.mapped?"Hide":"Show") + " Map", 80);
  let inviters = [...ship.custom.inviters.keys()].filter(id => {
    let s = game.findShip(id);
    return s && s != ship && !s.custom.isReady() && !s.custom.inMatch()
  }).length;
  buttonBasicUI(ship, "invite", [10,42,10,9], !bool&&isActive, null, "V", ship.custom.invite_shown ? "Close" : `Invites${inviters > 0 ? (" (" + inviters + ")") : ""}`, 80);
  sendUI(ship, {
    id: "mapview",
    visible: bool&&isActive&&ship.custom.mapped,
    clickable: false,
    position: [30,85,40,10],
    components: [
      {type: "text", position: [0,0,100,100], value: "Press 9 or 0 to toggle between arenas", color: dfl_tcl}
    ]
  });
  ship_infos_flattened.length > 1 && buttonBasicUI(ship, "chooser", [0,33,10,9], isActive, null, "P", ship.custom.shipped ? "Close" : "Change ship", 210);
  buttonBasicUI(ship, "ready", [0,42,10,9], isActive, null, "A", (ship.custom.isReady() ? "" : "Not") + " Ready", (ship.custom.isReady()?120:0));
  let ships_list = [];
  let index = 0;
  for (let id = 0; id <= game.custom.maxID; ++id) {
    let s;
    if (ship.custom.invite_shown && isActive && !bool && (s = game.findShip(id)) != null && s != ship && !s.custom.isReady() && !s.custom.inMatch()) {
      let isInvited = !!ship.custom.inviters.get(id);
      let hasInvite = isInvited || !!ship.custom.inviting.get(id);
      let UIList = JSON.parse(JSON.stringify(InviteButtons));
      UIList[0].visible = !hasInvite;
      UIList[1].visible = hasInvite;
      UIList[2].visible = isInvited;
      ships_list.push({id, UIList});
      ++index
    }
    else for (let jid of ["invite", "accept", "decline"]) sendUI(ship, {id: jid + id, visible: false})
  }
  let total_invite_pages = Math.ceil(ships_list.length / total_invites_per_page);
  let multipleInvitePages = total_invite_pages > 1;
  ship.custom.invite_page = Math.trunc(Math.max(Math.min(ship.custom.invite_page, total_invite_pages), -1)) || 0;
  let ui_list = [];
  if (ship.custom.invite_page == total_invite_pages) ship.custom.invite_page = 0;
  else if (ship.custom.invite_page < 0) ship.custom.invite_page = total_invite_pages - 1;
  ships_list.forEach(({id, UIList}, index) => {
    if (ship.custom.invite_page * total_invites_per_page <= index && index < (ship.custom.invite_page + 1) * total_invites_per_page) {
      index = index % total_invites_per_page;
      let s = game.findShip(id);
      let row = Math.trunc(index / invite_columns), column = (index % invite_columns);
      let offsetX = InviteScreen.offsetX + (column + 1) * actual_width, offsetY = InviteScreen.offsetY + (row * pHeight + 10) * InviteScreen.height / 100;
      for (let ui of UIList) buttonCustomUI(ship, ui.name + id, [offsetX -= ui.visible * actual_height, offsetY, actual_height, actual_height], ui.visible, null, null, [
        {type: "text", position: [0,0,100,100], value: ui.symbol}
      ], ui.hue);
      let actual_position = [InviteScreen.margin.left + column * pWidth, InviteScreen.margin.top + row * pHeight, pWidth - pHeight * UIScale * UIList.filter(ui => ui.visible).length, pHeight];
      let infoHue = (column + row) % 2 == 0 ? 180 : 60;
      ui_list.push(
        {type: "box", position: actual_position, fill: `hsla(${infoHue}, 100%, 50%, ${button_opacity})`, forceCustomFill: true},
        {type: "player", id: id, position: [actual_position[0], actual_position[1] + (pHeight - playerTextHeight) / 2, actual_position[2], playerTextHeight], color: `hsla(${infoHue}, 100%, 50%, 1)`, forceCustomColor: true, align: "left"}
      );
    }
    else for (let jid of ["invite", "accept", "decline"]) sendUI(ship, {id: jid + id, visible: false})
  });
  buttonBasicUI(ship, "invprev", [25,85,10,8], !!ship.custom.invite_shown&&isActive&&!bool&&multipleInvitePages, null, "B", "Previous", 0);
  buttonBasicUI(ship, "invnext", [65,85,10,8], !!ship.custom.invite_shown&&isActive&&!bool&&multipleInvitePages, null, "M", "Next", 0);
  buttonCustomUI(ship, "invite_screen", InviteScreen.position, !!ship.custom.invite_shown&&isActive&&!bool, false, null, [
    {type: "text", position: [InviteScreen.margin.left, 0, InviteScreen.actualWidthPercentage, InviteScreen.margin.top], value: "INVITES"},
    ...(multipleInvitePages ? [{type: "text", position: [InviteScreen.margin.left, 100 + ((10 - textHeight + 1) / 20 - 1) * InviteScreen.margin.bottom, InviteScreen.actualWidthPercentage, InviteScreen.margin.bottom * (textHeight - 1) / 10], value: `Page ${ship.custom.invite_page + 1}/${total_invite_pages}`, color: dfl_tcl}] : []),
    {type: "text", position: [0, 0, pWidth - pHeight * UIScale * 2, playerTextHeight], value: " "}, // player component scale
    ...ui_list
  ], 60, 100, 50, 0.25);
},
InviteButtons = [
  {
    name: "invite",
    symbol: "✉",
    hue: 240,
  },
  {
    name: "decline",
    symbol: "×",
    hue: 0
  },
  {
    name: "accept",
    symbol: '✓',
    hue: 120
  }
],
total_invites_per_page = invite_columns * invite_rows,
pWidth = InviteScreen.actualWidthPercentage / invite_columns,
pHeight = InviteScreen.actualHeightPercentage / invite_rows,
actual_height = pHeight * InviteScreen.height / 100,
actual_width = pWidth * InviteScreen.width / 100,
UIScale = InviteScreen.height / InviteScreen.width,
warn_height = Math.max(0, 100/max_warns_per_chunk) || 100,
spectator = 101,
dfl_tcl = "hsla(210, 50%, 87%, 1)",
lcolor = "hsla(0, 0%, 100%, 1)",
black = "hsla(0, 0%, 0%, 1)",
button_opacity = 0.35,
toTick = min => min*3600 + 60, // precision +1s
r = arena_radius * 10,
d = 2000/n - 2*r,
textHeight = 7,
playerTextHeight = pHeight * textHeight / 10,
offsetY = (100 / 11 - textHeight) / 2,
pos = function(x) {
  return (r + d/2)*(2*x + 1)
}, t = function(x,p) {
  let o = x+map_size*5, zoom = 10/map_size, rsize = p;
  return Math.max(o*zoom-rsize,0) || 0;
}, grids = Array(n).fill(0).map((f,i) => Array(n).fill(0).map((v,j) => [-map_size*5 + pos(j), map_size*5 - pos(i)])).flat(), lobby = Math.trunc((grids.length-1)/2), leaderboard = [], getStat = function(ship, stateName) {
  return +((ship||{}).custom||{})[stateName]||0;
}, updatescoreboard = function (game) {
  leaderboard = game.ships.map(ship => ({
    id: ship.id,
    wins: getStat(ship, "wins"),
    losses: getStat(ship, "losses"),
    draws: getStat(ship, "draws"),
    isLastLost: !!ship.custom.isLastLost,
    lastMatchStep: +ship.custom.lastMatchStep || -1
  })).sort((a,b) => {
    let d01 = Math.max(a.wins,a.losses,a.draws), d02 = Math.max(b.wins,b.losses,b.draws);
    if (d01 == 0 || d02 == 0 && (d01+d02) != 0) return d02 - d01;
    let dwins = b.wins - a.wins;
    if (dwins !== 0) return dwins;
    let dlosses = a.losses - b.losses;
    if (dlosses !== 0) return dlosses;
    let ddraws = b.draws - a.draws;
    if (ddraws !== 0) return ddraws;
    let lastStatusRank = (a.isLastLost != b.isLastLost) ? (a.isLastLost - b.isLastLost) : ((a.isLastLost ? -1 : 1) * (b.lastMatchStep - a.lastMatchStep));
    return isNaN(lastStatusRank) ? (a.id - b.id) : lastStatusRank
  });
  leaderboard.forEach((data, index) => {
    let ship = game.findShip(data.id);
    if (ship != null) {
      ship.custom.rank = index + 1;
      ship.set({score: leaderboard.length - ship.custom.rank})
    }
  })
  let t = ["Wins","Draws","Losses"], c = [120, 60, 0], tcl = [black, black, dfl_tcl], f = leaderboard.slice(0,10), indents = t.map(i => (Math.max(...f.map(x => x[i.toLowerCase()])) || 0).toString().length*textHeight / 2 + textHeight / 2), idn = indents.map((i,j) => 100 - indents.slice(j,3).reduce((a,b)=>a+b,0)), scoreboard = {
    id: "scoreboard",
    visible: true,
    position: [0,0,100,100],
    components: [
      {type: "box", position:[0,0,100,100/11], fill: "hsla(210, 20%, 33%, 1)"},
      {type: "text", position: [0,offsetY,100,textHeight], color: lcolor, value: "Players", align: "left"},
      {type: "text", position: [0,offsetY,100,textHeight], color: lcolor, value: " "}, // player component scale
      ...t.map((field,i) => [
        {type: "box", position:[idn[i],0,indents[i],100/11], fill: "hsla("+c[i]+", 100%, 50%, 1)"},
        {type: "text", position: [idn[i],offsetY,indents[i],textHeight], color: tcl[i], value: field[0]}
      ]).flat(),
      ...f.map((info,i) => [
        {type: "player", position: [0,(i+1)*100/11,idn[0],100/11], id: info.id, color: game.findShip(info.id)?.custom?.isReady?.()?"hsla(120,100%,50%,1)":lcolor, align: "left"},
        ...t.map((stat,j) => [
          {type: "text", position: [idn[j],(i+1)*100/11 + offsetY,indents[j],textHeight], color: lcolor, value: getStat(game.findShip(info.id), stat.toLowerCase()), align: "right"}
        ]).flat()
      ]).flat(),
    ]
  }
  for (let ship of game.ships) {
    let csc = JSON.parse(JSON.stringify(scoreboard)), index = leaderboard.slice(0,10).map(i => i.id).indexOf(ship.id);
    if (index == -1) {
      index = 9;
      csc.components.splice(csc.components.length-4,4,
        {type: "player", position: [0,1000/11,100,100/11], id: ship.id, color: lcolor, align: "left"},
        ...t.map((stat,j) => [
          {type: "text", position: [idn[j],1000/11 + offsetY,indents[j],textHeight], color: dfl_tcl, value: getStat(ship, stat.toLowerCase()), align: "right"}
        ]).flat()
      );
    }
    csc.components.unshift({type:"box",position:[0,(index+1)*100/11,100,100/11],fill:"hsla(210, 24%, 29%, 0.5)"});
    sendUI(ship, csc);
  }
}, dist = function(x1,y1,x2,y2) {
  return Math.sqrt((x1-x2)**2+(y1-y2)**2);
}, max = function(ship, type) {
  if (ship != null) {
    if (ship.custom.spectate) ship.set({type: spectator});
    else {
      if (type != null || (ship.custom.type == spectator && !ship.custom.spectator)) {
        type = type || ship.custom.prevShipCode || ship.custom.type;
        ship.custom.prevShipCode = null;
        ship.custom.type = (ship_infos_flattened.find(info => info.code === type)||ship_infos_flattened[0]).code;
        ship.set({type: ship.custom.type});
      }
    }
    ship.set({stats: 88888888, crystals: 0, shield: 1e5});
  }
}, rekt = function (ship,num){
  if (ship.shield<num){
    let val=ship.crystals + ship.shield;
    if (val < num) ship.set({kill:true});
    else ship.set({crystals:val-num,shield:0});
  }
  else ship.set({shield:ship.shield-num});
}, setBackgroundCard = function(id, src, x, y, scalex, scaley) {
  game.setObject({
    id: id,
    type: {
      id: id,
      obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
      emissive: src,
      diffuse: src,
      emissiveColor: 0xFFFFFF,
      shininess: 0,
      transparent: true
    },
    position: {x: x, y: y, z: 0},
    rotation: {x: Math.PI, y: 0, z: 0},
    scale: {x: scalex, y: scaley, z: 36}
  })
}, announce = function(ship, ...data) {
  sendUI(ship, {
    id: "message",
    position: [25,15,50,50],
    visible: !!ship.custom.instructorHidden,
    components: data.map((j,i) => {
      let text, color;
      if (Array.isArray(j)) {
        text = j[0];
        color = "hsla("+j[1]+",100%,50%,1)";
      }
      else {
        text = j;
        color = dfl_tcl
      }
      return {type:"text",position:[0,10*i,100,10],value:text,color:color}
    })
  });
}, FormatTime = function(time, forced) {
  let array = [Math.floor(time/3600), Math.floor((time%3600)/60)]
  if (forced && array[0] == 0) array.splice(0,1);
  return array.map(i => i<10&&!forced?"0"+i.toString():i).join(":");
}, check = function(game, forced, isGameOver) {
  modUtils.tick();
  for (let ship of game.ships) {
    if (!ship.custom.joined) {
      Radar.set(ship);
      sendUI(ship, {
        id: "block",
        position: [4,3,12,6],
        components:[
          {type:'box',position:[0,0,100,100],fill:dfl_tcl},
          {type: "text", position: [0,0,100,100], value: "We don't use points here.", color: black}
        ]
      });
      sendUI(ship, {
        id: "block2",
        clickable: true,
        shortcut: String.fromCharCode(187),
        position: [65,0,10,10]
      });
      // for steam client when there is a exit button in the bottom left corner
      sendUI(ship, {
        id: "steam_exit_block",
        position:[0,95,20,5],
        clickable: true
      });
      sendUI(ship, {
        id: "sprev",
        visible: false,
        clickable: true,
        shortcut: "7"
      });
      sendUI(ship, {
        id: "snext",
        visible: false,
        clickable: true,
        shortcut: "8"
      });
      sendUI(ship, {
        id: "nprev",
        visible: false,
        clickable: true,
        shortcut: "9"
      });
      sendUI(ship, {
        id: "nnext",
        visible: false,
        clickable: true,
        shortcut: "0"
      });
      clearInds(ship);
      introductory_paragraph.forEach((sentence, i) => modUtils.setTimeout(function(){ship.instructorSays(sentence, "Zoltar")}, i*instructor_duration*60));
      modUtils.setTimeout(function(){
        ship.hideInstructor();
        ship.custom.instructorHidden = true;
      },introductory_paragraph.length*instructor_duration*60);
      ship.custom = {
        ship: ship,
        TpTimestamp: -1,
        pendingTp: -1,
        shipped: false,
        joined: true,
        isLastLost: false,
        arena: ArenaManager.lobby,
        isReady: function() {return (this.ready || this.paired) && !this.spectate && this.ship.alive && this.arena.lobby},
        inMatch: function () {return (!this.arena.lobby && (this.arena.inMatch || this.arena.inCountdown))},
        ships_page: 0,
        inviters: new Map(),
        inviting: new Map(),
        invite_timeout: new Map()
      }
      game.custom.maxID = Math.max(game.custom.maxID, ship.id) || 0;
      if (isGameOver) gameover(ship);
    }
    else if (isGameOver && !ship.custom.exited) gameover(ship, true)
  }
  if (game.step % 30 === 0 || forced) {
    for (let ship of game.ships) {
      let t = ship.custom.arena, tp = ship.custom.TpTimestamp, ptp = ship.custom.pendingTp;
      if (!(t instanceof Arena)) t = ArenaManager.lobby;
      if (typeof tp != "number") {
        tp = -1;
        t = ArenaManager.lobby;
      }
      if (typeof ptp != "number") ptp = -1;
      let grad = t.radius, distance = t.distTo(ship) - (t.lobby?r:grad), text = "Warning: Out of the safe zones!";
      if (distance > 0 && (tp == -1 || t.lobby) && ptp == -1 && !ship.custom.spectate) {
        if (t.lobby) ArenaManager.set(ship, lobby, true);
        else {
          setPicker(ship, false);
          addWarn(ship, text, true);
          game.step % 60 === 0 && rekt(ship, edge_dps + dps_increase*(distance/10))
        }
      }
      else {
        removeWarn(ship, text, true);
        if (t.lobby || ship.custom.spectate) {
          setPicker(ship, true);
          ship.set({invulnerable: 600, idle: false});
          max(ship);
        }
        else setPicker(ship, false)
      };
      // check if user is CONSIDERED as spectating or not
      let isSpectate = !!ship.custom.spectate; // let's see their intention first
      if (!isSpectate) { // oh they don't want to spectate? let's check further
        if (!t.lobby) isSpectate = false; // they don't belong to the lobby, looks like that they're dueling, so not spectating
        else { // or what if they belong to the lobby?
          if (t.distTo(ship) > r) isSpectate = true; // they're out of lobby while not spectating? ok they're spectating
          else isSpectate = false; // and vice versa.
        }
      }
      ship.set({
        collider: !isSpectate
      });
      ship.emptyWeapons();
      ship.custom.arena = t;
      waitnextround(ship);
      let tw = (Array.isArray(ship.custom.warn)?ship.custom.warn:[]).filter(Array.isArray).slice(-max_warns_per_chunk), i = 0;
      while (i<tw.length) {
        let wt = tw[i];
        if (typeof wt[1] == "number" && wt[1] !== -1 && game.step - wt[1] > messageHoist*60) tw.splice(i,1);
        else i++;
      }
      ship.custom.warn = tw;
      warn(ship);
      if (game.step - ptp > pendingTpDelay * 60 && ptp !== -1) {
        ptp = -1;
        tp = game.step
      }
      if (game.step - tp > TpDelay * 60 && tp !== -1) tp = -1;
      ship.custom.TpTimestamp = tp;
      ship.custom.pendingTp = ptp;
      // text announced
      let arenaStatus = ship.custom.arena, announceText = [];
      if (!ArenaManager.isRunning(game)) announceText = ['Game finished!', '', ship.custom.endgameText || ""];
      else if (arenaStatus.lobby) {
        if (!ship.custom.invite_shown) {
          announceText = ["",[("You are "+(ship.custom.isReady()?"":"not ")+"ready").toUpperCase(), ship.custom.isReady()?120:10]];
          let header = ["Welcome to SDC 2.0"], nearest = ArenaManager.findNearest(ship);
          if (ship.custom.spectate && nearest !== ArenaManager.lobby) {
            header = ["Spectating Arena " + nearest.index];
            if (!nearest.isAvailable) {
              if (nearest.inCountdown) header.push('Dueling in countdown: ' + FormatTime(nearest.countdown));
              else if (nearest.inMatch) header.push('Duel ends in: ' + FormatTime(nearest.duration));
              else header.push('Duel finished')
            }
            else header.push('No duels are happening')
          }
          else header.push("");
          announceText.unshift(...header)
        }
      }
      else if (arenaStatus.inCountdown) announceText = ["Ready?","", FormatTime(arenaStatus.countdown,true)];
      announce.call(this, ship, ...announceText);
      // small text
      let smallText = [];
      if (arenaStatus.lobby) smallText = ["Duelers in queue: " + ArenaManager.waiting_count + (ArenaManager.waiting_time > 0 ? ` (${Math.trunc(ArenaManager.waiting_time / 60)})` : "")];
      else if (arenaStatus.inCountdown) smallText = ["Preparing ships..."];
      else smallText = ["Time left: " + FormatTime(arenaStatus.duration)];
      if (!ship.custom.arena.lobby) smallText.push("Arena " + arenaStatus.index);
      setStats(ship, ...smallText)
    }
    updatescoreboard(game);
  }
  if (allow_full_cargo_pickup) for (let ship of game.ships) {
    if (ship.custom.inMatch()) {
      let maxgems = Math.pow(Math.trunc(ship.custom.type/100),2)*20;
      if (ship.crystals == maxgems) ship.set({crystals: maxgems-1})
    }
  }
}, waitnextround = function (ship, forced) {
  if (ship.custom.arena.lobby || forced) {
    let w = "";
    let verbs = ["won","drew","lost"], pstats = ["Win","Draw","Lose"];
    w = "You ";
    for (let i = 0; i < pstats.length; i++) {
      if (ship.custom["just"+pstats[i]]) {
        w+=verbs[i];
        break;
      }
    }
    if (w == "You ") w = "";
    else w+=" in the latest round!";
    if (w) addWarn(ship, w);
  }
}, warn = function (ship) {
  let war = (Array.isArray(ship.custom.warn)?ship.custom.warn:[]).filter(Array.isArray), wh = warn_height*13/97, t = 0;
  sendUI(ship, {
    id: "warn",
    position: [25,3,50,97],
    visible: true,
    clickable: false,
    components: war.map(message => ({type: "text", position: [0,(message[2]!=null)?message[2]:(wh*t++),100,wh], value: message[0], color: "hsla(60,100%,50%,1)"}))
  });
}, clearInds = function(ship) {
  setStates(ship, false, false, false);
  ship.custom.ready = false;
  ship.custom.wait = false;
  ship.custom.warn = [];
  ship.custom.pendingTp = -1;
}, setStats = function(ship, ...stats) {
  sendUI(ship, {
    id: "stat",
    position: [3,28,17,15],
    visible: true,
    components: stats.flat().map((j,i) => ({type: "text",position:[0,33*i,80,33],value:j,color:dfl_tcl}))
  });
}, setStates = function (ship, ...states) {
  let r = ["Win","Lose","Draw"];
  for (let i = 0; i < states.length; i++) ship.custom["just"+r[i]] = states[i];
}, gameover = function (ship, wait) {
  if (ship != null) {
    ship.custom.exited = true;
    modUtils.setTimeout(function(){
      ship.gameover({
        "Wins": getStat(ship, "wins"),
        "Draws": getStat(ship, "draws"),
        "Losses": getStat(ship, "losses"),
        "Rank": +ship.custom.rank ||"Unranked"
      })
    }, wait?300:0)
  }
}, sendUI = function(ship, UI) {
  return ship != null && ship.setUIComponent(parseUI(UI))
}, Radar = {
  UI: {
    id: "radar_background",
    components: []
  },
  update: function (game, needsUpdate) {
    this.UI.components = ArenaManager.list.map(p => {
      let rsize = 10/map_size*p.radius;
      return {type: "round", position:[t(p.x, rsize), t(-p.y, rsize), rsize*2, rsize*2], width: 1, stroke: "hsla(240,100%,50%,1)", fill: "hsla(0, 0%, 0%, 0)"}
    });
    return needsUpdate && this.set(game)
  },
  set: function (ship) {
    return sendUI(ship, this.UI)
  }
}, parseUI = function (UI) {
  try { UI = new Object(JSON.parse(JSON.stringify(UI))) } catch (e) { UI = {} }

  let id;
  try { id = String(UI.id) } catch (e) { id = '' }

  let parsedUI = {
    id: id,
    position: UI.position,
    visible: UI.visible,
    clickable: UI.clickable,
    shortcut: UI.shortcut,
    components: UI.components
  }

  if (parsedUI.visible || parsedUI.visible == null) {
    delete parsedUI.visible;
    let position = parsedUI.position, count = 0;
    for (let i = 0 ; i < 4 ; i++) {
      let pos = (position||{})[i];
      if (pos == null || pos == 100) count++
    }
    if (count == 4) delete parsedUI.position
  }
  else {
    parsedUI.position = [0,0,0,0];
    parsedUI.visible = false;
    delete parsedUI.components
  }

  if (!parsedUI.clickable) {
    delete parsedUI.clickable;
    delete parsedUI.shortcut
  }

  return parsedUI
}, addWarn = function(ship, message, permanent, customY, allowDuplicates) {
  let t = (Array.isArray(ship.custom.warn)?ship.custom.warn:[]).filter(Array.isArray);
  if (!allowDuplicates) {
    let ti;
    while (ti = t.findIndex(u => u[0] == message), ti != -1) t.splice(ti,1);
  }
  let rt = [message,permanent?-1:game.step];
  if (typeof customY == "number" && customY >=0 && customY <= 100) rt.push(customY);
  t.push(rt);
  ship.custom.warn = t.slice(-max_warns_per_chunk);
}, removeWarn = function(ship, message, globalSearch) {
  let t = (Array.isArray(ship.custom.warn)?ship.custom.warn:[]).filter(Array.isArray), ti;
  while (ti = t.findIndex(u => u[0] == message), ti != -1) {
    t.splice(ti,1);
    if (!globalSearch) break;
  }
  ship.custom.warn = t.slice(-max_warns_per_chunk);
}, addPlayerID = function (ship, spec, id) {
  let t = ship.custom[spec];
  t= [...new Set(t.concat(id))].filter(i => game.findShip(i))
}, resetShip = function(ship, resetOpponent) {
  Object.assign(ship.custom, {
    ready: false,
    spectate: false,
    shipped: false,
    mapped: false,
    pendingTp: game.step,
    lastMatchStep: game.step,
    arena: ArenaManager.lobby,
    invite_shown: false
  });
  let pair = game.findShip(ship.custom.paired);
  if (pair) {
    if (resetOpponent) resetShip(pair, !resetOpponent);
    ship.custom.inviters.delete(pair.id);
    ship.custom.inviting.delete(pair.id)
  }
  max(ship, ship.custom.type);
  ship.custom.paired = null;
  removeWarn(ship, "Warning: Arena shrinking!", true)
}

if (game.custom.maxID == null) game.custom.maxID = 0;

let Arena = class {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.members = [];
    this.originalIndex = index;
    this.reset(true);
    switch (true) {
      case index == lobby: this.lobby = true; break;
      case index < lobby: this.index = index + 1; break;
      default: this.index = index; break
    }
    let src, title;
    if (this.lobby) {
      src = "https://raw.githubusercontent.com/bhpsngum/SDC-public/master/img/credits.png";
      title = "credits"
    }
    else {
      title = "logo"+this.originalIndex;
      src = "https://raw.githubusercontent.com/bhpsngum/SDC-public/master/img/logo.png"
    }
    setBackgroundCard(title, src, this.x, this.y, 30, 30)
  }

  getRadius = function () {
    let percentage = ((shrink_start_time - this.duration/3660)/(shrink_start_time - shrink_end_time)) || 1, rad = (min_radius_ratio===false)?(arena_radius-fixed_min_radius):(arena_radius*min_radius_ratio) || 0;
    rad = Math.max(Math.min(rad,arena_radius),0);
    percentage = Math.max(Math.min(percentage,1),0);
    if (!this.started || this.duration < 0) percentage = 0
    return arena_radius - percentage * rad
  }

  assign (ship1, ship2) {
    this.members.splice(0);
    this.members.push(ship1, ship2);
    this.members.forEach((ship, nodeInd) => {
      ship.custom.arena = this;
      ship.custom.spectate = false;
      ship.custom.ready = false;
      ArenaManager.set(ship, this.originalIndex, true, !!nodeInd);
      ship.custom.type = ship.custom.type || ship.type;
      ship.set({idle: true, type: ship.custom.type + ships_count, stats: 88888888, vx: 0, vy: 0});
    });
    this.started = true;
  }

  shrink (game, ignoreRadarUpdate = false) {
    let prad = this.radius, grad = this.getRadius()*10;
    if (prad != grad) {
      this.radius = grad;
      let shrinkSize = arena_radius - grad/10;
      let objrad = 23.5*(arena_radius - shrinkSize), ar = 23.5*arena_radius;
      setBackgroundCard("safeZoneMarker"+this.originalIndex, "https://raw.githubusercontent.com/bhpsngum/SDC-public/master/img/arena.png", this.x, this.y, this.lobby?ar:objrad, this.lobby?ar:objrad);
      Radar.update(game, !ignoreRadarUpdate);
    }
  }

  distTo (ship) {
    return dist(this.x, this.y, ship.x, ship.y)
  }

  reset (init) {
    this.members.splice(0);
    this.duration = this.game_time;
    this.countdown = this.dc_time;
    this.shrink(game, init);
    this.angle = 2*Math.PI*Math.random();
    this.started = false;
  }

  endDuel (timesUp, ship) { // 'ship' lost the match (if any)
    if (timesUp) {
      this.members.forEach(tship => {
        setStates(tship, false, false, true);
        tship.custom.draws = (tship.custom.draws||0) + 1
      })
    }
    else {
      let killer;
      if (this.members.indexOf(ship) != -1 && (killer = this.members.find(sus => sus != ship))) {
        killer.custom.wins = getStat(killer, 'wins') + 1;
        setStates(killer, true, false, false);
        killer.custom.isLastLost = false;
        ship.custom.losses = getStat(ship, 'losses') + 1;
        setStates(ship, false, true, false);
        ship.custom.isLastLost = true;
      }
    }

    this.members.forEach(aship => resetShip(aship, true));

    this.countdown = this.duration = 0;

    modUtils.setTimeout(this.reset.bind(this), pendingTpDelay * 60)
  }


  tick (game) {
    if (this.inCountdown) {
      this.countdown--;
      if (this.inMatch) this.members.forEach(ship => {
        max(ship, ship.custom.type);
        ship.set({idle: false, generator: 1e5, invulnerable: 0, crystals: (gem_ratio === false)?fixed_gems:20*(Math.trunc(ship.custom.type/100)**2)*gem_ratio});
      })
    }
    else if (this.inMatch) {
      let duration = this.duration--;
      if (this.started && !this.ended && duration <= toTick(shrink_start_time) && duration >= toTick(shrink_end_time)) {
        if (game.step % (shrink_interval*60) === 0) this.shrink(game);
        this.members.forEach(ship => addWarn(ship, "Warning: Arena shrinking!", true, 90))
      }
      else this.members.forEach(ship => removeWarn(ship, "Warning: Arena shrinking!", true));
      if (this.ended) this.endDuel(true);
    }
  }

  get inCountdown () {
    return this.started && this.countdown > 0
  }

  get inMatch () {
    return this.started && this.countdown <= 0 && this.duration > 0
  }

  get isAvailable () {
    return !(this.lobby || this.started || this.ended)
  }

  get ended () {
    return this.started && !this.inCountdown && !this.inMatch
  }

  dc_time = toTick(duel_countdown/60);

  game_time = toTick(duel_duration);
}

if (!game.custom.ArenaManager) game.custom.ArenaManager = {
  findAvailable: function () { return this.list.find(v => v.isAvailable) },
  waiting_count: 0,
  list: [],
  invites: [],
  lobby: {},
  waiting_time: -1,
  checkPlayers: function(game) {
    let waiting_list = game.ships.filter(ship => ship.custom.isReady());
    if (this.isOpen(game)) {
      let arenaSlot;
      if (this.findAvailable() && waiting_list.length > 1) {
        if (this.waiting_time < 0) this.waiting_time = queueWaitingTime * 60 + 45;
        else --this.waiting_time;
        if (this.waiting_time < 0) {
          while ((arenaSlot = this.findAvailable()) && waiting_list.length > 1) arenaSlot.assign(...Array(2).fill(0).map(p => waiting_list.splice(rand(waiting_list.length), 1)[0]))
        }
      }
      else this.waiting_time = -1;
      while ((arenaSlot = this.findAvailable()) && this.invites.length > 0) arenaSlot.assign(...this.invites.splice(0, 1)[0])
    }
    else this.waiting_time = -1;
    this.waiting_count = waiting_list.length + this.invites.length * 2;
    this.list.forEach(arena => !arena.isAvailable && arena.tick(game))
  },
  isOpen: function (game) { return game.step <= toTick(this.game_duration)},
  isRunning: function (game) {return this.isOpen(game) || this.list.filter(arena => arena.lobby || arena.isAvailable).length != this.list.length },
  set: function(ship, node, forced, reversed) {
    let nodpos = this.list[node] || this.lobby;
    if (ship != null) {
      if (!ship.custom.spectate) {
        ship.custom.arena = nodpos;
        ship.custom.TpTimestamp = game.step;
      }
      if (ship.custom.pendingTp === -1 || forced) {
        ship.custom.pendingTp = -1;
        let angle = 0, distance = 0, noded = !nodpos.lobby && !ship.custom.spectate;
        if (noded) {
          angle = nodpos.angle || 0;
          if (reversed) angle += Math.PI;
          distance = 2/3*r;
        }
        let {x,y} = nodpos, setup = {x:x+distance*Math.cos(angle),y:y+distance*Math.sin(angle)};
        if (noded) setup.angle = 180*((1 + angle/Math.PI)%2);
        ship.set(setup);
      }
    }
  },
  findNearest: function (ship) {
    let t = this.list.map(i => i.distTo(ship)), min = Math.min(...t);
    return this.list[t.indexOf(min)]
  }
}

let ArenaManager = game.custom.ArenaManager;

Object.assign(ArenaManager, {
  Arena,
  game_duration
});

// game Modules
let initialization = function(game) {
  setBackgroundCard("infoCard","https://raw.githubusercontent.com/bhpsngum/SDC-public/master/img/ShipCardInfo.png", 0, -30, 42*1.5, 25*1.5);
  ArenaManager.list = grids.map((v,i) => new ArenaManager.Arena(v[0], v[1], i));
  ArenaManager.lobby = ArenaManager.list.find(arena => arena.lobby);
  Radar.update(game);
  this.tick = main_game;
}, main_game = function(game) {
  check(game);
  if (ArenaManager.isRunning(game)) ArenaManager.checkPlayers(game);
  else {
    game.setOpen(false);
    check(game, true);
    updatescoreboard(game);
    game.ships.forEach(clearInds);
    let lastStand = false;
    leaderboard.forEach((i,j) => {
      let ship = game.findShip(i.id);
      if (ship != null) {
        let text = "";
        if (lastStand || Math.max(i.wins, i.losses, i.draws) == 0) lastStand = true;
        else {
          let rank = ship.custom.rank;
          if (!isNaN(rank)) {
            text = "You";
            if (rank == 1) text += " win";
            else {
              text += "'re ranked "+rank;
              switch(rank%10) {
                case 1: if (Math.trunc(rank/10) != 1) {text+="st";break;}
                case 2: if (Math.trunc(rank/10) != 1) {text+="nd";break;}
                case 3: if (Math.trunc(rank/10) != 1) {text+="rd";break;}
                default: text+="th";break;
              }
            }
            text+="!";
          }
        }
        ship.custom.endgameText = text
      }
    });
    this.tick = forceEndgame;
  }
}, forceEndgame = function (game) {
  check(game, null, true);
}
this.tick = initialization;
this.event = function(event, game) {
  let ship = event.ship, killer = event.killer;
  if (ship != null) switch (event.name) {
    case "ui_component_clicked":
      let id = event.id;
      if (ship.custom.arena.lobby) {
        if (["block2", "steam_exit_block"].indexOf(id) == -1 && (!ship.custom.lastButtonClick || game.step - ship.custom.lastButtonClick > (buttonsDelay * 60))) {
          ship.custom.lastButtonClick = game.step;
          ship.custom.buttons_warned = false;
          switch (id) {
            case "chooser":
              if (!ship.custom.spectate) {
                ship.custom.shipped = !ship.custom.shipped;
                if (ship.custom.shipped) ship.custom.invite_shown = false
              }
              else addWarn(ship, "You can't change ships when you're spectating!")
              break;
            case "ready":
              if (ship.custom.spectate) {
                addWarn(ship, "You can't be ready when you're spectating!");
                ship.custom.ready = false
              }
              else {
                ship.custom.ready = !ship.custom.ready;
                ship.custom.spectate = false;
                max(ship, ship.custom.prevShipCode || ship.custom.type || ship.type)
              }
              ship.custom.invite_shown = false;
              break;
            case "spectate":
              if (ship.custom.isReady()) {
                addWarn(ship, "You can't spectate when you're ready!");
                ship.custom.spectate = false
              }
              else {
                ship.custom.ready = false;
                ship.custom.mapped = false;
                ship.custom.shipped = false;
                ship.custom.invite_shown = false;
                ship.custom.spectate = !ship.custom.spectate;
                if (ship.custom.spectate) ship.custom.prevShipCode = ship.custom.type || ship.type;
                max(ship, ship.custom.prevShipCode || ship.custom.type || ship.type)
              }
              break;
            case "map":
              if (!ship.custom.isReady() && ship.custom.spectate) ship.custom.mapped = !ship.custom.mapped;
              ship.custom.shipped = false;
              break;
            case "invite":
              if (ship.custom.isReady()) {
                addWarn(ship, "You can't invite someone when you are ready!");
                ship.custom.invite_shown = false
              }
              else {
                ship.custom.invite_shown = !ship.custom.invite_shown;
                if (ship.custom.invite_shown) ship.custom.shipped = false
              }
              break;
            case "snext":
              if (ship.custom.shipped && !ship.custom.spectate && ship.custom.shipped) {
                let ship_info = getShipsPage(ship).list;
                max(ship, (ship_info[ship_info.findIndex(t => t.code === ship.custom.type)+1]||ship_info[0]).code)
              }
              break;
            case "sprev":
              if (ship.custom.shipped && !ship.custom.spectate && ship.custom.shipped) {
                let ship_info = getShipsPage(ship).list;
                max(ship, (ship_info[ship_info.findIndex(t => t.code === ship.custom.type)-1]||ship_info[ship_info.length-1]).code)
              }
              break;
            case "invnext":
              if (!ship.custom.isReady() && !ship.custom.spectate && ship.custom.invite_shown) ++ship.custom.invite_page;
              break;
            case "invprev":
              if (!ship.custom.isReady() && !ship.custom.spectate && ship.custom.invite_shown) --ship.custom.invite_page;
              break;
            case "spnext":
              if (ship.custom.shipped && !ship.custom.spectate && ship.custom.shipped) {
                let page = ++ship.custom.ships_page;
                if (page >= ship_infos.length) page = 0;
                ship.custom.ships_page = page
              }
              break;
            case "spprev":
              if (ship.custom.shipped && !ship.custom.spectate && ship.custom.shipped) {
                let page = --ship.custom.ships_page;
                if (page < 0) page = ship_infos.length - 1;
                ship.custom.ships_page = page
              }
              break;
            case "nprev":
              if (ship.custom.mapped && ship.custom.spectate && !ship.custom.isReady()) {
                let node = ArenaManager.findNearest(ship).originalIndex;
                ArenaManager.set(ship, (node>0?node:ArenaManager.list.length)-1, true);
              }
              break;
            case "nnext":
              if (ship.custom.mapped && ship.custom.spectate && !ship.custom.isReady()) {
                let node = ArenaManager.findNearest(ship).originalIndex;
                ArenaManager.set(ship, (node<(ArenaManager.list.length-1)?node:-1)+1, true);
              }
              break;
            default:
              switch (true) {
                case id.match(/^n\d+$/) && ship.custom.spectate && !ship.custom.isReady() && ship.custom.mapped:
                  ArenaManager.set(ship, +id.slice(1), true);
                  break;
                case id.match(/^s\d+$/) && !ship.custom.spectate && ship.custom.shipped: {
                  let shipCode = +id.slice(1), page = getShipsPage(ship).list;
                  max(ship, (page[shipCode] || page[0]).code);
                  break
                }
                case id.match(/^invite\d+$/) && !ship.custom.isReady(): {
                  let Iship = game.findShip(+id.match(/\d+/)[0]);
                  if (!Iship || Iship === ship) addWarn(ship, "Player not found!");
                  else if (Iship.custom.paired || Iship.custom.isReady() || ship.custom.inMatch()) addWarn(ship, "Player is not available right now.");
                  else {
                    let invite_waiting = Math.ceil((InvitationTimeOut * 60 - (game.step - ship.custom.invite_timeout.get(Iship.id))) / 60);
                    if (invite_waiting > 0) addWarn(ship, `Please wait for ${invite_waiting} second${invite_waiting != 1 ? "s" : ""} before you can invite ${Iship.name} again`);
                    else if (!ship.custom.inviters.get(Iship.id)) {
                      Iship.custom.inviters.set(ship.id, game.step);
                      ship.custom.inviting.set(Iship.id, game.step);
                      Iship.custom.invite_timeout.delete(ship.id);
                      ship.custom.invite_timeout.delete(Iship.id);
                      addWarn(ship, `Invitation sent to ${Iship.name}!`);
                      addWarn(Iship, `${ship.name} invited you to a duel!`);
                    }
                  }
                  break
                }
                case id.match(/^accept\d+$/) && !ship.custom.isReady(): {
                  let Iship = game.findShip(+id.match(/\d+/)[0]);
                  if (!Iship || Iship === ship) addWarn(ship, "Player not found!");
                  else if (Iship.custom.paired || Iship.custom.isReady() || ship.custom.inMatch()) addWarn(ship, "Player is not available right now.");
                  else if (ship.custom.inviters.get(Iship.id)) {
                    Iship.custom.paired = ship.id;
                    ship.custom.paired = Iship.id;
                    ArenaManager.invites.push([ship, Iship]);
                    addWarn(Iship, `${ship.name} accepted your invite!`);
                    addWarn(ship, `Accepted invitation from ${Iship.name}!`);
                  }
                  break
                }
                case id.match(/^decline\d+$/) && !ship.custom.isReady(): {
                  let Iship = game.findShip(+id.match(/\d+/)[0]);
                  if (!Iship || Iship === ship) addWarn(ship, "Player not found!");
                  else {
                    let isInviter = !!ship.custom.inviters.get(Iship.id), isInviting = !!ship.custom.inviting.get(Iship.id);
                    if (isInviter) {
                      ship.custom.inviters.delete(Iship.id);
                      Iship.custom.inviting.delete(ship.id);
                      Iship.custom.invite_timeout.set(ship.id, game.step);
                      addWarn(ship, `Declined invitation from ${Iship.name}`);
                      addWarn(Iship, `${ship.name} declined your invite!`)
                    }
                    else if (isInviting) {
                      ship.custom.inviting.delete(Iship.id);
                      ship.custom.invite_timeout.set(Iship.id, game.step);
                      Iship.custom.inviters.delete(ship.id);
                      addWarn(ship, `You removed your invitation to ${Iship.name}`);
                      addWarn(Iship, `${ship.name} removed their invitation`)
                    }
                    let foundIndex;
                    if ((isInviter || isInviting) && (foundIndex = ArenaManager.invites.findIndex(pairs => pairs.indexOf(ship) != -1)) != -1) {
                      let [p1, p2] = ArenaManager.invites.splice(foundIndex, 1)[0];
                      p1.custom.paired = null;
                      p2.custom.paired = null;
                      p1.custom.invite_timeout.set(p2.id, game.step);
                      p2.custom.invite_timeout.set(p1.id, game.step)
                    }
                  }
                  break
                }
              }
          }
        }
        else if (!ship.custom.buttons_warned) {
          ship.custom.buttons_warned = true;
          addWarn(ship, "You are clicking buttons too fast, please hold up for a bit!")
        }
      }
      break;
    case "ship_destroyed":
      if (!ship.custom.arena.lobby && ship.custom.arena.started) ship.custom.arena.endDuel(false, ship);
      else resetShip(ship);
      break;
    case "ship_spawned":
      ship.custom.pendingTp = -1;
      ArenaManager.set(ship, lobby, true);
      break;
    default:
      break;
  }
}
