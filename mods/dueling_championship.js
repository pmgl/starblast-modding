/*
STARBLAST DUELING CHAMPIONSHIP (SDC)
* Mod Founder: Lexagon and Thuliux (Eggsagon)
* Mod Developer: Bhpsngum
* Shipbuilders: Lexagon, Thuliux (Eggsagon), Nova, SChickenMan and Neuronality

Season 2 - Main version

*/

var gem_ratio = false;
var fixed_gems = 500;
var arena_radius = 15;
var min_radius_ratio = false;
var fixed_min_radius = 5;
var shrink_start_time = 1.5; // in minutes
var shrink_end_time = 0.5; // in minutes
var shrink_interval = 8; // in seconds
var edge_dps = 50; // damage per second when standing in the edge of the safe zone
var dps_increase = 50; //dps increase per 10 blocks farther from the safe zone
var break_interval = 1/2; // in minutes
var duel_countdown = 10; // countdown before duel starts (in seconds)
var duel_duration = 2.5; // in minutes
var game_duration = 30; // in minutes
var nodes_count_per_width = 3; // number of arenas (including lobby): n^2
var TpDelay = 2; // Latency between teleports (in seconds)
var pendingTpDelay = 5; // GGs after matches is really important. Decide the duration! (in seconds)
var messageHoist = 5; // the duration one single message thread will stay (in seconds)
var max_warns_per_chunk = 3; // maximum warnings can be displayed
var instructor_duration = 8; // duration for the instructor stays in the screen (in seconds)

var introductory_paragraph = [
  "Welcome to Starblast Dueling Championship (SDC)!",
  "Choose your favorite ship and press ready to participate in 1v1 duels and become the champion!",
  "Good luck and have fun!"
];

var A_Speedster_601 = '{"name":"A-Speedster","designer":"Neuronality","level":6,"model":1,"size":1.5,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-100,-95,0,0,70,65],"z":[0,0,0,0,0,0]},"width":[0,10,40,20,20,0],"height":[0,5,30,30,15,0],"texture":[6,11,5,63,12],"propeller":true,"laser":{"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"recoil":50,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,10,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":10,"offset":{"x":50,"y":25,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,0,10,20,25,30,40,80,70],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,20,10,0],"height":[0,15,20,20,20,15,15,20,10,0],"propeller":true,"texture":[4,4,2,2,5,63,5,4,12]},"cannons":{"section_segments":12,"offset":{"x":30,"y":40,"z":45},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,5,7,10,3,5,0],"height":[0,5,7,8,3,5,0],"angle":-10,"laser":{"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"angle":-10,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":0,"z":10},"length":[40,0],"width":[10,20],"angle":[-1],"position":[0,30],"texture":[63],"bump":{"position":0,"size":25}},"winglets":{"offset":{"x":0,"y":-40,"z":10},"doubleside":true,"length":[45,10],"width":[5,20,30],"angle":[50,-10],"position":[90,80,50],"texture":[4],"bump":{"position":10,"size":30}}},"typespec":{"name":"A-Speedster","level":6,"model":1,"code":601,"specs":{"shield":{"capacity":[200,300],"reload":[6,8]},"generator":{"capacity":[80,140],"reload":[30,45]},"ship":{"mass":175,"speed":[90,115],"rotation":[60,80],"acceleration":[90,140]}},"shape":[3,2.914,2.408,1.952,1.675,1.49,1.349,1.263,1.198,1.163,1.146,1.254,1.286,1.689,2.06,2.227,2.362,2.472,2.832,3.082,3.436,3.621,3.481,2.48,2.138,2.104,2.138,2.48,3.481,3.621,3.436,3.082,2.832,2.472,2.362,2.227,2.06,1.689,1.286,1.254,1.146,1.163,1.198,1.263,1.349,1.49,1.675,1.952,2.408,2.914],"lasers":[{"x":0,"y":-3,"z":0,"angle":0,"damage":[38,84],"rate":1,"type":2,"speed":[175,230],"number":1,"spread":0,"error":0,"recoil":50},{"x":1.16,"y":-0.277,"z":1.35,"angle":-10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0},{"x":-1.16,"y":-0.277,"z":1.35,"angle":10,"damage":[8,12],"rate":2,"type":1,"speed":[100,130],"number":1,"spread":-10,"error":0,"recoil":0}],"radius":3.621}}';
var Broly_602 = '{"name":"Broly","designer":"Lexagon","level":6,"model":2,"size":1.8,"specs":{"shield":{"capacity":[250,350],"reload":[7,8]},"generator":{"capacity":[90,140],"reload":[25,40]},"ship":{"mass":200,"speed":[80,100],"rotation":[40,60],"acceleration":[80,130]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-6,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-80,-85,-60,0,0,60,75,70],"z":[0,0,0,0,0,0,0,0]},"width":[0,8,18,32,25,18,12,0],"height":[0,6,15,22,22,18,10,0],"texture":[17,10,18,5,11,8,17],"propeller":true,"laser":{"damage":[48,80],"rate":1,"type":2,"speed":[145,180],"recoil":40,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-68,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-15,0,20,40,60],"z":[-7,-5,0,0,5]},"width":[0,6,9,10,0],"height":[0,8,10,10,0],"texture":[4,9,9,4]},"side_propulsors":{"section_segments":12,"offset":{"x":30,"y":19,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-30,-20,-10,5,15,25,30,40,60,50],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,10,14,16,16,12,12,14,10,0],"height":[0,10,15,15,15,10,10,10,8,0],"propeller":true,"texture":[4,4,8,4,5,63,5,4,17]},"cannons":{"section_segments":12,"offset":{"x":14,"y":19,"z":22},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,10,30,30],"z":[0,0,0,0,0,-5,-5]},"width":[0,5,7,10,10,3,0],"height":[0,4,4,5,6,3,0],"laser":{"damage":[15,20],"rate":1.2,"type":1,"speed":[120,150],"number":1,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]},"cannons2":{"section_segments":12,"offset":{"x":28,"y":-6,"z":0},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-45,-20,0,20,30,40],"z":[0,0,0,0,0,0,0]},"width":[0,6,8,12,8,8,0],"height":[0,5,7,8,3,5,0],"angle":1.5,"laser":{"damage":[8,13],"rate":1.5,"type":1,"speed":[100,140],"number":1,"error":0},"propeller":false,"texture":[6,4,10,4,63,4]}},"wings":{"main":{"length":[40],"width":[60,50],"angle":[-10],"position":[0,-35],"doubleside":true,"bump":{"position":30,"size":10},"texture":[63,63],"offset":{"x":0,"y":24,"z":0}}},"typespec":{"name":"Broly","level":6,"model":2,"code":602,"specs":{"shield":{"capacity":[250,350],"reload":[7,8]},"generator":{"capacity":[90,140],"reload":[25,40]},"ship":{"mass":200,"speed":[80,100],"rotation":[40,60],"acceleration":[80,130]}},"shape":[3.282,3.289,2.749,2.251,2.233,2.188,1.913,1.921,1.75,1.616,1.524,1.463,1.453,1.543,1.645,1.749,1.888,2.046,2.138,2.397,2.849,3.188,3.143,2.99,2.521,2.489,2.521,2.99,3.143,3.188,2.849,2.397,2.138,2.046,1.888,1.749,1.645,1.543,1.454,1.463,1.524,1.616,1.75,1.921,1.913,2.188,2.233,2.251,2.749,3.289],"lasers":[{"x":0,"y":-3.276,"z":0,"angle":0,"damage":[48,80],"rate":1,"type":2,"speed":[145,180],"number":1,"spread":0,"error":0,"recoil":40},{"x":0.504,"y":-1.116,"z":0.792,"angle":0,"damage":[15,20],"rate":1.2,"type":1,"speed":[120,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.504,"y":-1.116,"z":0.792,"angle":0,"damage":[15,20],"rate":1.2,"type":1,"speed":[120,150],"number":1,"spread":0,"error":0,"recoil":0},{"x":0.961,"y":-2.015,"z":0,"angle":1.5,"damage":[8,13],"rate":1.5,"type":1,"speed":[100,140],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.961,"y":-2.015,"z":0,"angle":-1.5,"damage":[8,13],"rate":1.5,"type":1,"speed":[100,140],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.289}}';
var Sparrow_603 = '{"name":"Sparrow","designer":"SChickenMan & Lex","level":6,"model":3,"size":1.6,"specs":{"shield":{"capacity":[120,200],"reload":[8,9]},"generator":{"capacity":[150,200],"reload":[20,30]},"ship":{"mass":175,"speed":[100,125],"rotation":[40,60],"acceleration":[90,140]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-80,-85,-80,-50,-10,0,0,40,70,65],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,7,10,21,27,28,20,20,20,0],"height":[0,4,7,16,25,25,20,20,15,0],"texture":[17,63,4,11,3,63,2,63,12],"propeller":true,"laser":{"damage":[30,60],"rate":3.5,"type":1,"speed":[160,200],"number":1}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-70,"z":14},"position":{"x":[0,0,0,0,0,0,0],"y":[-20,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,8,10,10,0],"height":[0,10,12,12,0],"texture":[9]},"cannons":{"section_segments":8,"offset":{"x":0,"y":30,"z":30},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-60,-20,0,20,40,60],"z":[-10,-10,-5,-5,-4,-5,-12]},"width":[0,6,10,10,12,10,8],"height":[0,5,10,10,10,6,8],"angle":180,"laser":{"damage":[30,50],"rate":0.2,"type":2,"speed":[200,240],"recoil":300,"number":1,"error":0},"propeller":false,"texture":[4,3,11,4,63,2]},"side_propulsors":{"section_segments":8,"offset":{"x":25,"y":10,"z":0},"position":{"x":[-15,-2,-1,-2,0,0,0,0,0,0,0,0],"y":[-90,-20,-15,-8,0,10,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,13,15,20,20,20,20,20,18,18,10,0],"height":[0,10,15,20,20,20,25,20,18,16,10,0],"propeller":true,"texture":[2,4,4,63,3,4,8,5,63,4,17]},"tops":{"section_segments":12,"offset":{"x":15,"y":30,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-40,-25,0,15,40,35],"z":[0,0,0,0,0,0,0]},"width":[0,5,10,13,11,6,0],"height":[0,5,9,8,6,5,0],"propeller":1,"angle":0,"texture":[5,4,10,63,4,17]}},"wings":{"join1":{"offset":{"x":0,"y":5,"z":0},"length":[35],"width":[20,70],"angle":[0],"position":[-90,-5],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":0,"y":35,"z":0},"length":[30],"width":[20,70],"angle":[0],"position":[-95,-10],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}}},"typespec":{"name":"Sparrow","level":6,"model":3,"code":603,"specs":{"shield":{"capacity":[120,200],"reload":[8,9]},"generator":{"capacity":[150,200],"reload":[20,30]},"ship":{"mass":175,"speed":[100,125],"rotation":[40,60],"acceleration":[90,140]}},"shape":[3.206,3.208,2.616,2.174,1.856,1.719,1.63,1.522,1.38,1.273,1.202,1.258,1.339,1.415,1.486,1.549,1.643,1.777,1.973,2.157,2.488,2.866,3.24,3.196,3.095,2.886,3.095,3.196,3.24,2.866,2.488,2.157,1.973,1.777,1.643,1.549,1.486,1.415,1.339,1.258,1.202,1.273,1.38,1.522,1.63,1.719,1.856,2.174,2.616,3.208],"lasers":[{"x":0,"y":-3.2,"z":0,"angle":0,"damage":[30,60],"rate":3.5,"type":1,"speed":[160,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":0,"y":2.88,"z":0.96,"angle":180,"damage":[30,50],"rate":0.2,"type":2,"speed":[200,240],"number":1,"spread":0,"error":0,"recoil":300}],"radius":3.24}}';
var Contraband_604 = '{"name":"Contraband","designer":"Lexagon","level":6,"model":4,"size":1.6,"zoom":0.85,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-22,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-75,-80,-20,0,15,20,60,65,80,100,90],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,24,26,20,20,20,20,25,12,0],"height":[0,5,25,25,20,15,15,15,20,10,0],"texture":[1,2,4,63,5,10,5,63,4,17],"propeller":true,"laser":{"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"recoil":250,"number":1,"error":0}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-77,"z":15},"position":{"x":[0,0,0,0,0,0,0],"y":[-10,0,20,40,50],"z":[-7,-5,0,0,0]},"width":[0,5,10,10,0],"height":[0,10,15,12,0],"texture":[9]},"side_propulsors":{"section_segments":8,"offset":{"x":35,"y":3,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-4,6,15,20,35,40,50,85,75],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,15,20,20,20,15,15,18,18,10,0],"height":[0,15,20,20,20,15,15,18,16,10,0],"propeller":true,"texture":[4,4,63,3,5,8,5,63,4,17]},"cannons":{"section_segments":12,"offset":{"x":18,"y":43,"z":20},"position":{"x":[0,0,0,0,0],"y":[-50,-45,-20,-5,5],"z":[0,0,0,0,0]},"width":[0,5,7,8,0],"height":[0,5,7,8,0],"angle":0,"laser":{"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"error":0},"propeller":false,"texture":[6,4,63,4,63,4]}},"wings":{"join":{"offset":{"x":0,"y":-2,"z":0},"length":[37,0],"width":[20,70],"angle":[0],"position":[-95,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":0}},"join2":{"offset":{"x":25,"y":30,"z":0},"length":[35],"width":[10,10],"angle":[0],"position":[0,0,0,50],"texture":[8],"doubleside":1,"bump":{"position":0,"size":0}},"wing1":{"doubleside":true,"offset":{"x":50,"y":30,"z":-36},"length":[0,30,20,30],"width":[0,0,100,100,0],"angle":[110,70,90,110],"position":[0,0,0,0,0],"texture":[63],"bump":{"position":0,"size":5}}},"typespec":{"name":"Contraband","level":6,"model":4,"code":604,"specs":{"shield":{"capacity":[190,275],"reload":[6,8]},"generator":{"capacity":[125,200],"reload":[30,42.5]},"ship":{"mass":150,"speed":[100,125],"rotation":[60,80],"acceleration":[70,120]}},"shape":[3.424,3.274,2.552,2.215,2.002,1.835,1.725,1.612,1.456,1.35,2.032,2.005,1.991,2.031,2.107,2.229,2.362,2.513,2.737,3.055,3.205,3.163,3.112,2.961,2.525,2.501,2.525,2.961,3.112,3.163,3.205,3.055,2.737,2.513,2.362,2.229,2.107,2.031,1.992,2.005,2.032,1.35,1.456,1.612,1.725,1.835,2.002,2.215,2.552,3.274],"lasers":[{"x":0,"y":-3.264,"z":0,"angle":0,"damage":[100,150],"rate":1,"type":2,"speed":[110,150],"number":1,"spread":0,"error":0,"recoil":250},{"x":0.576,"y":-0.224,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0},{"x":-0.576,"y":-0.224,"z":0.64,"angle":0,"damage":[4,8],"rate":4,"type":1,"speed":[150,200],"number":1,"spread":0,"error":0,"recoil":0}],"radius":3.424}}';
var A_Stasis_605 = '{"name":"A-Stasis","designer":"Thuliux & Lex","level":6,"model":5,"size":2.35,"specs":{"shield":{"capacity":[250,320],"reload":[5,8]},"generator":{"capacity":[130,160],"reload":[25,40]},"ship":{"mass":190,"speed":[85,110],"rotation":[55,75],"acceleration":[130,140]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":20,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-80,-70,-75,-70,-30,-20,20,30,45,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,3,4.5,7,14,20,15,13,10,0],"height":[0,2.5,4,7.5,12,16,15,13,10,0],"texture":[6,63,63,10,4,2,63,8,17],"propeller":1,"laser":{"damage":[10,15],"rate":1,"type":2,"speed":[190,235],"recoil":10,"number":10,"error":3.5}},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-25,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[-8,0,20,30,60,80],"z":[0,0,0,0,0,0]},"width":[0,4,7,8,8,0],"height":[0,6,10,11,12,0],"propeller":false,"texture":[7,9,4,63,4]},"propulsors":{"section_segments":10,"offset":{"x":15,"y":15,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-20,-15,-5,-2,8,20,30,35,45,40],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,7,10,10,10,8,8,10,8,0],"height":[0,6,10,10,10,8,8,8,6,0],"texture":[4,4,5,10,3,63,4,4,17],"propeller":true},"sides":{"section_segments":12,"offset":{"x":10,"y":-20,"z":0},"position":{"x":[0,0,2,4],"y":[-25,-10,5,35],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,6,0],"propeller":1,"angle":5,"texture":[4,2,63,4]}},"wings":{"main":{"length":[12,8],"width":[40,30,30],"angle":[10,0],"position":[30,40,30],"doubleside":true,"bump":{"position":30,"size":5},"texture":[11,63],"offset":{"x":5,"y":-10,"z":15}},"winglet":{"length":[38,10],"width":[50,40,30],"angle":[-30,20],"position":[30,50,30],"doubleside":true,"bump":{"position":30,"size":5},"texture":[8,63],"offset":{"x":0,"y":-15,"z":10}},"join1":{"offset":{"x":0,"y":20,"z":0},"length":[25],"width":[20,50],"angle":[-10],"position":[-60,0],"texture":[63],"doubleside":true,"bump":{"position":0,"size":5}}},"typespec":{"name":"A-Stasis","level":6,"model":5,"code":605,"specs":{"shield":{"capacity":[250,320],"reload":[5,8]},"generator":{"capacity":[130,160],"reload":[25,40]},"ship":{"mass":190,"speed":[85,110],"rotation":[55,75],"acceleration":[130,140]}},"shape":[2.82,2.594,2.087,1.775,1.564,1.355,1.213,1.162,1.136,1.136,1.161,1.181,1.166,2.003,2.052,2.134,2.265,2.444,2.55,2.716,2.951,3.012,3.014,2.965,3.091,3.061,3.091,2.965,3.014,3.012,2.951,2.716,2.55,2.444,2.265,2.134,2.052,2.003,1.988,1.181,1.161,1.136,1.136,1.162,1.213,1.355,1.564,1.775,2.087,2.594],"lasers":[{"x":0,"y":-2.82,"z":0,"angle":0,"damage":[10,15],"rate":1,"type":2,"speed":[190,235],"number":10,"spread":0,"error":3.5,"recoil":10}],"radius":3.091}}';
var Tripod_606 = '{"name":"Tripod","designer":"Nova & Lex","level":6,"model":6,"size":1.68,"specs":{"shield":{"capacity":[150,200],"reload":[8,10]},"generator":{"capacity":[100,130],"reload":[25,40]},"ship":{"mass":150,"speed":[100,138],"rotation":[40,60],"acceleration":[100,136]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-74,-65,-47,-20,5,17,29,50,60,75,72],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,8,15,20,18,18,18,20,20,15,0],"height":[0,6,8,10,12,13,14,15,14,10,0],"propeller":true,"texture":[4,63,2,10,63,3,63,4,13,17]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-60,"z":10},"position":{"x":[0,0,0,0,0,0,0],"y":[-3,3,18,35,50],"z":[-7,-6,-7,-1,-1]},"width":[0,4,8,8,5],"height":[0,6,11,6,5],"propeller":false,"texture":[4,9,9,4,4]},"cannon_wing_top":{"section_segments":8,"offset":{"x":0,"y":60,"z":18},"position":{"x":[0,0,0,0,0,0,0],"y":[-45,-50,-30,-10,0,10,15],"z":[0,0,0,0,0,0,0]},"width":[0,4,6,8,8,6,0],"height":[0,2,4,5,5,4,0],"angle":0,"laser":{"damage":[35,50],"rate":1,"type":2,"speed":[130,180],"number":1,"recoil":10,"angle":0},"propeller":0,"texture":[6,4,10,63,8,3]},"cannon_wings":{"section_segments":8,"offset":{"x":23,"y":50,"z":-3},"position":{"x":[-2,-2,-2,-1,-3,-4,-4,-3,-3],"y":[-70,-80,-62,-50,-40,-30,-15,20,15],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,6,8,9,11,10,10,6,0],"height":[0,6,8,8,8,8,8,6,0],"texture":[13,4,2,63,4,10,4,13],"angle":0,"laser":{"damage":[18,35],"rate":0.8,"type":1,"speed":[125,165],"number":1,"angle":2,"error":0},"propeller":1}},"wings":{"main":{"length":[40,15],"width":[80,30,25],"angle":[0,40],"position":[10,20,0],"doubleside":true,"texture":[11,63],"offset":{"x":0,"y":13,"z":-5.31},"bump":{"position":10,"size":5}},"winglets":{"length":[14,3],"width":[40,30,59],"angle":[10,30,0],"position":[-15,23,50],"doubleside":true,"texture":[3],"offset":{"x":5,"y":-58,"z":-5},"bump":{"position":30,"size":10}},"winglets_cannon_top_2":{"length":[13,3],"width":[15,15,20],"angle":[30,30,0],"position":[-12,0,-2],"doubleside":true,"texture":[4,13],"offset":{"x":1,"y":65,"z":20},"bump":{"position":10,"size":10}}},"typespec":{"name":"Tripod","level":6,"model":6,"code":606,"specs":{"shield":{"capacity":[150,200],"reload":[8,10]},"generator":{"capacity":[100,130],"reload":[25,40]},"ship":{"mass":150,"speed":[100,138],"rotation":[40,60],"acceleration":[100,136]}},"shape":[3.129,3.044,2.328,1.904,1.597,1.332,1.356,1.264,1.164,1.095,1.05,1.031,1.041,1.744,1.784,1.859,1.931,1.953,2.008,2.099,2.095,2.132,2.509,2.57,2.565,2.525,2.565,2.57,2.509,2.132,2.095,2.099,2.008,1.953,1.931,1.859,1.784,1.744,1.042,1.031,1.05,1.095,1.164,1.264,1.356,1.332,1.597,1.904,2.328,3.044],"lasers":[{"x":0,"y":0.336,"z":0.605,"angle":0,"damage":[35,50],"rate":1,"type":2,"speed":[130,180],"number":1,"spread":0,"error":0,"recoil":10},{"x":0.706,"y":-1.008,"z":-0.101,"angle":0,"damage":[18,35],"rate":0.8,"type":1,"speed":[125,165],"number":1,"spread":2,"error":0,"recoil":0},{"x":-0.706,"y":-1.008,"z":-0.101,"angle":0,"damage":[18,35],"rate":0.8,"type":1,"speed":[125,165],"number":1,"spread":2,"error":0,"recoil":0}],"radius":3.129}}';
var Streamliner_607 = '{"name":"Streamliner","designer":"Thuliux & Lex","level":6,"model":7,"size":1.6,"specs":{"shield":{"capacity":[190,220],"reload":[7,9]},"generator":{"capacity":[25,35],"reload":[250,300]},"ship":{"mass":160,"speed":[100,128],"rotation":[50,70],"acceleration":[130,150]}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":22,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-125,-110,-115,-70,-40,0,36,60,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,8.5,18,20,20,20,12,0],"height":[0,5,8,15,18,14,12,6,0],"texture":[6,4,2,1,3,63,8,17],"propeller":1},"cannon1":{"section_segments":6,"offset":{"x":0,"y":-28,"z":-10},"position":{"x":[0,0,0,0],"y":[-40,-50,-20],"z":[0,0,0]},"width":[0,5,8],"height":[0,5,8],"angle":0,"laser":{"damage":[25,35],"rate":0.35,"type":2,"speed":[160,180],"number":1,"recoil":100},"propeller":false},"cannon2":{"section_segments":6,"offset":{"x":0,"y":-28,"z":-10},"position":{"x":[0,0,0,0],"y":[-40,-50,-20],"z":[0,0,0]},"width":[0,5,8],"height":[0,5,8],"angle":0,"laser":{"damage":[25,35],"rate":0.35,"type":1,"speed":[160,180],"number":1,"recoil":100,"error":2},"propeller":false},"cannon3":{"section_segments":6,"offset":{"x":0,"y":-28,"z":-10},"position":{"x":[0,0,0,0],"y":[-40,-50,-20],"z":[0,0,0]},"width":[0,5,8],"height":[0,5,8],"angle":0,"laser":{"damage":[25,35],"rate":0.35,"type":1,"speed":[160,180],"number":1,"error":4,"recoil":100},"propeller":false},"air":{"section_segments":10,"offset":{"x":0,"y":22,"z":-10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-60,-80,-30,-10,10,30,50],"z":[0,0,0,0,0,0,0]},"width":[0,25,35,30,30,20,0],"height":[0,8,8,8,10,10,0],"texture":[4,3,2,2,2,3]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-28,"z":18},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-40,-20,0,20,48,80,88],"z":[-7,-5,-3,-5,-5,-8,-8]},"width":[0,6,9.5,10,10,7,0],"height":[0,5,6,8,8,8,0],"texture":[9,9,9,10,63,4,1,2]},"laser2":{"section_segments":10,"offset":{"x":24,"y":2,"z":0},"position":{"x":[-4,-4,-1,0,0,0,0,0,0,0],"y":[-32,-25,0,10,20,25,30,40,70,60],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,8,12,12,12,8,8,12,8,0],"height":[0,6,10,10,10,6,6,10,5,0],"texture":[6,4,10,3,4,3,2,8,16.9],"propeller":true}},"wings":{"main":{"length":[20,8,25],"width":[50,50,50,30],"angle":[5,-20,-20],"position":[0,10,18,0],"doubleside":true,"bump":{"position":0,"size":5},"texture":[4,5,63,11],"offset":{"x":0,"y":22,"z":14}},"winglets":{"length":[30],"width":[35,15],"angle":[10,-10],"position":[-40,-60,-55],"bump":{"position":0,"size":20},"texture":63,"doubleside":true,"offset":{"x":0,"y":-3,"z":0}}},"typespec":{"name":"Streamliner","level":6,"model":7,"code":607,"specs":{"shield":{"capacity":[190,220],"reload":[7,9]},"generator":{"capacity":[25,35],"reload":[250,300]},"ship":{"mass":160,"speed":[100,128],"rotation":[50,70],"acceleration":[130,150]}},"shape":[3.296,2.988,2.283,2.446,2.218,1.595,1.416,1.292,1.207,1.148,1.112,1.096,1.082,1.117,1.682,1.75,1.86,2.015,2.014,2.042,2.106,2.409,2.516,2.445,2.652,2.629,2.652,2.445,2.516,2.409,2.106,2.042,2.014,2.015,1.86,1.75,1.682,1.117,1.084,1.096,1.112,1.148,1.207,1.292,1.416,1.595,2.218,2.446,2.283,2.988],"lasers":[{"x":0,"y":-2.496,"z":-0.32,"angle":0,"damage":[25,35],"rate":0.35,"type":2,"speed":[160,180],"number":1,"spread":0,"error":0,"recoil":100},{"x":0,"y":-2.496,"z":-0.32,"angle":0,"damage":[25,35],"rate":0.35,"type":1,"speed":[160,180],"number":1,"spread":0,"error":2,"recoil":100},{"x":0,"y":-2.496,"z":-0.32,"angle":0,"damage":[25,35],"rate":0.35,"type":1,"speed":[160,180],"number":1,"spread":0,"error":4,"recoil":100}],"radius":3.296}}';
var Mk47_608 = '{"name":"Mk47","designer":"Lexagon","level":6,"model":8,"size":1.5,"specs":{"shield":{"capacity":[200,280],"reload":[8,10]},"generator":{"capacity":[85,160],"reload":[25,40]},"ship":{"mass":160,"speed":[70,125],"rotation":[60,80],"acceleration":[80,130]}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-10,"z":-2},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-65,-75,-55,-40,0,30,40,70,65],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,14,18,23,20,20,20,0],"height":[0,5,10,11,11,10,12,6,0],"texture":[6,4,2,11,10,3,11,17],"propeller":true,"laser":{"damage":[6,8],"rate":10,"type":1,"speed":[170,200],"recoil":0,"number":1,"error":2}},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-80,"z":8},"position":{"x":[0,0,0,0,0,0],"y":[15,35,60,85,90],"z":[-1,-2,-1,-4,0]},"width":[0,8,10,6,0],"height":[0,8,10,10,0],"texture":[8.98,8.98,4]},"intake":{"section_segments":12,"angle":0,"offset":{"x":15,"y":5,"z":-2},"position":{"x":[6,6,6,-4,0,0,0,0],"y":[-25,-30,-5,30,45,65,60],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,10,10,13,8,0],"height":[0,10,11,12,12,8,0],"texture":[6,4,63,4,63,17],"propeller":1,"laser":{"damage":[4,6],"angle":2,"rate":4,"type":1,"speed":[140,180],"recoil":0,"number":1,"error":5}}},"wings":{"main":{"length":[10,30,20],"width":[0,55,40,20],"angle":[0,-20,0],"position":[20,20,40,15],"texture":[3,18,63],"doubleside":true,"bump":{"position":10,"size":15},"offset":{"x":0,"y":15,"z":1}},"font":{"length":[15],"width":[35,10],"angle":[-10],"position":[0,-20],"texture":[63],"doubleside":true,"bump":{"position":10,"size":15},"offset":{"x":15,"y":-40,"z":-7}}},"typespec":{"name":"Mk47","level":6,"model":8,"code":608,"specs":{"shield":{"capacity":[200,280],"reload":[8,10]},"generator":{"capacity":[85,160],"reload":[25,40]},"ship":{"mass":160,"speed":[70,125],"rotation":[60,80],"acceleration":[80,130]}},"shape":[2.555,2.556,2.065,2.145,2.096,1.127,1.082,1.074,1.002,0.955,0.926,0.914,0.929,0.93,0.904,1.877,1.989,2.123,2.17,2.255,2.384,2.525,2.433,2.208,2.138,1.803,2.138,2.208,2.433,2.525,2.384,2.255,2.17,2.123,1.989,1.877,0.904,0.927,0.93,0.914,0.926,0.955,1.002,1.074,1.082,1.127,2.096,2.145,2.065,2.556],"lasers":[{"x":0,"y":-2.55,"z":-0.06,"angle":0,"damage":[6,8],"rate":10,"type":1,"speed":[170,200],"number":1,"spread":0,"error":2,"recoil":0},{"x":0.63,"y":-0.75,"z":-0.06,"angle":0,"damage":[4,6],"rate":4,"type":1,"speed":[140,180],"number":1,"spread":2,"error":5,"recoil":0},{"x":-0.63,"y":-0.75,"z":-0.06,"angle":0,"damage":[4,6],"rate":4,"type":1,"speed":[140,180],"number":1,"spread":2,"error":5,"recoil":0}],"radius":2.556}}';

var Spectator_101 = '{"name":"Spectator","level":1,"model":1,"size":0.025,"zoom":0.075,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"bodies":{"face":{"section_segments":100,"angle":0,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[-2,-2,2,2],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"vertical":true,"texture":[6]}},"typespec":{"name":"Spectator","level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[1e-30,1e-30],"reload":[1000,1000]},"generator":{"capacity":[1e-30,1e-30],"reload":[1,1]},"ship":{"mass":1,"speed":[200,200],"rotation":[1000,1000],"acceleration":[1000,1000]}},"shape":[0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001,0.001],"lasers":[],"radius":0.001}}';

var ships = [];
ships.push(A_Speedster_601);
ships.push(Broly_602);
ships.push(Sparrow_603);
ships.push(Contraband_604);
ships.push(A_Stasis_605);
ships.push(Tripod_606);
ships.push(Streamliner_607);
ships.push(Mk47_608);

var ship_infos = ships.map(i => {
  let t = JSON.parse(i);
  return {name: t.name, designer: t.designer||"Neuronality", code: t.typespec.code}
}), codes = ship_infos.map(info => info.code), maxNamelength = Math.max(...ship_infos.map(info => info.name.length)), maxDesignerlength = Math.max(...ship_infos.map(info => info.designer.length));

ships.push(Spectator_101);

var map_size = 200, rand = function(num) {
  return Math.floor(Math.random()*num)
}, soundtracks = ["argon","crystals"], n = Math.round(Math.max(nodes_count_per_width,1)), vocabulary = [
  {text: "Duel", icon:"\u00be", key:"D"},
  {text: "Me", icon:"\u004f", key:"E"},
  {text: "$#%!&", icon: "\u{1f92c}", key: "F"},
  {text: "GoodGame", icon:"\u00a3", key:"G"},
  {text: "Hello", icon:"\u0046", key:"H"},
  {text: "Change ship", icon:"\u0061", key:"I"},
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
  map_name: "SDC",
  map_size: map_size,
  custom_map: "",
  starting_ship: 801,
  ships: ships,
  reset_tree: true,
  max_players: (Math.pow(n,2)-1)*2,
  radar_zoom: map_size/arena_radius/2,
  weapons_store: false,
  max_level: 1,
  speed_mod: 1.2,
  choose_ship: codes,
  asteroids_strength: 1e6,
  crystal_value: 0,
  vocabulary: vocabulary,
  soundtrack: soundtracks[rand(soundtracks.length)]+".mp3"
}
// game components
var modUtils = {
  setTimeout: function(f,time){
    this.jobs.push({f: f,time: game.step+time});
  },
  jobs: [],
  tick: function(){
    var t = game.step;
    for (var i=this.jobs.length-1;i>=0;i--){
      var job = this.jobs[i];
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
}, setPicker = function(ship, isActive) {
  isActive = !!isActive;
  let bool = !!ship.custom.spectate
  sendUI(ship, {
    id: "spectate",
    position: [10,33,10,9],
    visible: isActive,
    clickable: isActive,
    shortcut: "K",
    components: [
      { type: "box",position:[0,0,100,100],fill:"hsla(180, 100%, 50%, 1)"},
      { type: "text",position:[0,10,100,40],value:"SPECTATE: "+(bool?"ON":"OFF"),color:black},
      { type: "text",position:[0,50,100,40],value:"[K]",color:black}
    ]
  });
  let t = 0, w = 50/n, pos = grids.map(grid => dist(ship.x, ship.y, ...grid)), min = pos.indexOf(Math.min(...pos));
  grids.forEach((Aqua, i) => {
    let text, hasDuel;
    if (i !== lobby) {
      t++;
      text = "Arena "+t;
      hasDuel = game.ships.filter(ship => ship.custom.currentNode === i).length == 2
    }
    else text = "Lobby";
    let compo = [
      {type: "box", position: [0,0,100,100], fill: "hsla("+(180/(Math.pow(n,2))*(2*i+1))+",100%,50%,1)"},
      {type: "text", position: [10,0,80,100], value: text, color: black}
    ];
    i == min && compo.push({type: "text", position: [10,0,80,40], value: "You are here", color: black});
    hasDuel && compo.push({type: "text", position: [10,60,80,40], value: "Duel ongoing", color: black});
    sendUI(ship, {
      id: "n"+i,
      visible: bool&&isActive&&ship.custom.mapped,
      clickable: bool&&isActive&&ship.custom.mapped,
      position: [25 + (i%n)*w, 35 + Math.trunc(i/n)*w , w, w],
      components: compo
    })
  });
  let wt = Math.PI*2/ship_infos.length, br = 21;
  ship_infos.forEach((info, i) => {
    let nspace = new Array(maxNamelength - info.name.length).fill(" ").join(""), dspace = new Array(maxDesignerlength - info.designer.length).fill(" ").join(""), compo = [
      {type: "box", position: [0,0,100,100], fill: "hsla("+(180/ship_infos.length*(2*i+1))+",100%,50%,1)"},
      {type: "text", position: [10,0,80,100], value: nspace + info.name + nspace, color: black},
      {type: "text", position: [10,60,80,40], value: dspace + "by: " + info.designer + dspace, color: black}
    ];
    (ship.type === info.code) && compo.push({type: "text", position: [10,0,80,40], value: "    ✓    ", color: black});
    sendUI(ship, {
      id: "s"+info.code,
      visible: !bool&&isActive&&ship.custom.shipped,
      clickable: !bool&&isActive&&ship.custom.shipped,
      position: [50 + br*Math.cos(wt*i)-5, 50 + br*Math.sin(wt*i)-4.5, 10, 9],
      components: compo
    })
  });
  sendUI(ship, {
    id: "shipview",
    visible: !bool&&isActive&&ship.custom.shipped,
    clickable: false,
    position: [35,35,30,30],
    components: [
      {type: "round", position: [0,0,100,100], fill: "hsla(0, 0%, 0%, 0)", width: 1, stroke: dfl_tcl}
    ]
  });
  sendUI(ship, {
    id: "map",
    visible: bool&&isActive,
    clickable: bool&&isActive,
    shortcut: "M",
    position: [10,42,10,9],
    components: [
      { type: "box",position:[0,0,100,100],fill:"hsla(80, 100%, 50%, 1)"},
      { type: "text",position:[0,10,100,40],value:(ship.custom.mapped?"Hide":"Show")+" Map",color:black},
      { type: "text",position:[0,50,100,40],value:"[M]",color:black}
    ]
  });
  ship_infos.length > 1 && sendUI(ship, {
    id: "chooser",
    position: [0,33,10,9],
    visible: isActive,
    clickable: isActive,
    shortcut: "P",
    components: [
      { type: "box",position:[0,0,100,100],fill:"hsla(210, 100%, 50%, 1)"},
      { type: "text",position:[0,10,100,40],value:"Change ship",color:black},
      { type: "text",position:[0,50,100,40],value:"[P]",color:black}
    ]
  });
  sendUI(ship, {
    id: "ready",
    position: [0,42,10,9],
    visible: isActive,
    clickable: isActive,
    shortcut: "A",
    components: [
      { type: "box",position:[0,0,100,100],fill:"hsla("+(ship.custom.ready?120:0)+",100%,50%,1)"},
      { type: "text",position:[0,10,100,40],value:(ship.custom.ready?"":"Not")+" Ready",color:ship.custom.ready?black:dfl_tcl},
      { type: "text",position:[0,50,100,40],value:"[A]",color:ship.custom.ready?black:dfl_tcl}
    ]
  });
}, warn_height = (100/max_warns_per_chunk) || 100, spectator = 101, dfl_tcl = "hsla(210, 50%, 87%, 1)", lcolor = "hsla(0, 0%, 100%, 1)", black = "hsla(0, 0%, 0%, 1)", toTick = min => min*3600, r = arena_radius * 10, d = 2000/n - 2*r, pos = function(x) {
  return (r + d/2)*(2*x + 1)
}, t = function(x,p) {
  let o = x+map_size*5, zoom = 10/map_size, rsize = p;
  return Math.max(o*zoom-rsize,0) || 0;
}, grids = Array(n).fill(0).map((f,i) => Array(n).fill(0).map((v,j) => [-map_size*5 + pos(j), map_size*5 - pos(i)])).flat(), lobby = Math.trunc((grids.length-1)/2), leaderboard = [], getStat = function(ship, stateName) {
  return ((ship||{}).custom||{})[stateName]||0;
}, updatescoreboard = function (game) {
  leaderboard = game.ships.map(ship => ({
    id: ship.id,
    wins: getStat(ship, "wins"),
    loses: getStat(ship, "loses"),
    draws: getStat(ship, "draws")
  })).sort((a,b) => {
    let d01 = Math.max(a.wins,a.loses,a.draws), d02 = Math.max(b.wins,b.loses,b.draws);
    if (d01 == 0 || d02 == 0 && (d01+d02) != 0) return d02 - d01;
    let dwins = b.wins - a.wins;
    if (dwins !== 0) return dwins;
    let dloses = a.loses - b.loses;
    if (dloses !== 0) return dloses;
    let ddraws = b.draws - a.draws;
    if (ddraws !== 0) return ddraws;
    return a.id - b.id;
  });
  var t = ["Wins","Loses","Draws"], c = [120, 0, 60], tcl = [black, dfl_tcl, black], f = leaderboard.slice(0,10), indents = t.map(i => (Math.max(...f.map(x => x[i.toLowerCase()])) || 0).toString().length*5 + 2), idn = indents.map((i,j) => 100 - indents.slice(j,3).reduce((a,b)=>a+b,0)), scoreboard = {
    id: "scoreboard",
    visible: true,
    position: [0,0,100,100],
    components: [
      {type: "box", position:[0,0,100,100/11], fill: "hsla(210, 20%, 33%, 1)"},
      {type: "text", position: [0,0,100,100/11], color: lcolor, value: "Players", align: "left"},
      ...t.map((field,i) => [
        {type: "box", position:[idn[i],0,indents[i],100/11], fill: "hsla("+c[i]+", 100%, 50%, 1)"},
        {type: "text", position: [idn[i],0,indents[i],100/11], color: tcl[i], value: field[0]}
      ]).flat(),
      ...f.map((info,i) => [
        {type: "player", position: [0,(i+1)*100/11,idn[0],100/11], id: info.id, color: lcolor, align: "left"},
        ...t.map((stat,j) => [
          {type: "text", position: [idn[j],(i+1)*100/11,indents[j],100/11], color: lcolor, value: getStat(game.findShip(info.id), stat.toLowerCase()), align: "right"}
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
          {type: "text", position: [idn[j],1000/11,indents[j],100/11], color: dfl_tcl, value: getStat(ship, stat.toLowerCase()), align: "right"}
        ]).flat()
      );
    }
    csc.components.unshift({type:"box",position:[0,(index+1)*100/11,100,100/11],fill:"hsla(210, 24%, 29%, 0.5)"});
    ship.setUIComponent(csc);
  }
}, dist = function(x1,y1,x2,y2) {
  return Math.sqrt((x1-x2)**2+(y1-y2)**2);
}, max = function(ship, type) {
  let crystals = (gem_ratio === false)?fixed_gems:20*(Math.trunc(type/100)**2)*gem_ratio;
  ship.set({type:type,crystals: crystals,stats:88888888,shield: 1e4});
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
}, setNode = function(ship, node, reversed) {
  let nodpos = grids[node];
  if (!nodpos) {
    nodpos = grids[lobby];
    node = lobby;
  }
  if (ship != null) {
    if (!ship.custom.spectate) {
      ship.custom.currentNode = node;
      ship.custom.TpTimestamp = game.step;
    }
    if (ship.custom.pendingTp === -1) {
      let angle = 0, distance = 0;
      if (node !== lobby && !ship.custom.spectate) {
        angle = angles[node] || 0;
        if (reversed) angle += Math.PI;
        distance = 2/3*r;
      }
      let [x,y] = nodpos;
      ship.set({x:x+distance*Math.cos(angle),y:y+distance*Math.sin(angle)});
    }
  }
}, announce = function(ship, ...data) {
  if (ship != null) ship.setUIComponent({
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
  var array = [Math.floor(time/3600), Math.floor((time%3600)/60)]
  if (forced && array[0] == 0) array.splice(0,1);
  return array.map(i => i<10&&!forced?"0"+i.toString():i).join(":");
}, check = function(game, forced) {
  modUtils.tick();
  for (let ship of game.ships) {
    if (!ship.custom.joined) {
      shrinkArenas(ship);
      ship.setUIComponent({
        id: "block",
        visible: true,
        clickable: false,
        position: [4,3,12,6],
        components:[
          {type:'box',position:[0,0,100,100],fill:dfl_tcl},
          {type: "text", position: [0,0,100,100], value: "We don't use points here.", color: black}
        ]
      });
      ship.setUIComponent({
        id: "block2",
        visible: true,
        clickable: true,
        shortcut: "»",
        position: [65,0,10,10],
        components: []
      });
      if (ended) gameover(ship);
      clearInds(ship);
      introductory_paragraph.forEach((sentence, i) => modUtils.setTimeout(function(){ship.instructorSays(sentence, "Zoltar")}, i*instructor_duration*60));
      modUtils.setTimeout(function(){
        ship.hideInstructor();
        ship.custom.instructorHidden = true;
      },introductory_paragraph.length*instructor_duration*60);
      ship.custom = {
        TpTimestamp: -1,
        pendingTp: -1,
        shipped: false,
        joined: true
      }
    }
  }
  if (game.step % 30 === 0 || forced) {
    for (let ship of game.ships) {
      let t = ship.custom.currentNode, tp = ship.custom.TpTimestamp, ptp = ship.custom.pendingTp;
      if (grids.map((v,i) => i).indexOf(t) == -1 || !round_started) t = lobby;
      if (typeof tp != "number") {
        tp = -1;
        t = lobby;
      }
      if (typeof ptp != "number") ptp = -1;
      let distance = dist(ship.x, ship.y, ...grids[t]) - ((t===lobby)?r:grad), text = "Warning: Out of the safe zones!";
      if (distance > 0 && (tp == -1 || t === lobby) && ptp == -1 && !ship.custom.spectate) {
        if (t === lobby) setNode(ship, lobby);
        else {
          setPicker(ship, false);
          addWarn(ship, text, true);
          game.step % 60 === 0 && rekt(ship, edge_dps + dps_increase*(distance/10))
        }
      }
      else {
        removeWarn(ship, text, true);
        if (t === lobby || ship.custom.spectate) {
          setPicker(ship, true);
          ship.set({invulnerable: 120});
          if (ship.custom.spectate) ship.set({crystals: 0});
          else max(ship);
        }
        else {
          setPicker(ship, false);
          let maxgems = Math.pow(Math.trunc(ship.type/100),2)*20;
          if (ship.crystals == maxgems) ship.set({crystals: maxgems-1})
        }
      }
      setSpectate(ship, ship.custom.spectate);
      if (!(game_time <= toTick(shrink_start_time) && game_time >= toTick(shrink_end_time)) || ship.custom.currentNode === lobby) removeWarn(ship, "Warning: Arena shrinking!", true);
      ship.set({score: 0});
      ship.custom.currentNode = t;
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
    }
    updatescoreboard(game);
  }
}, waitnextround = function (ship, forced) {
  if (round_started && ship.custom.currentNode === lobby || forced) {
    let w = "";
    if (ship.custom.wait) w = "No opponents found!";
    else {
      let verbs = ["won","lost","drew"], pstats = ["Win","Lose","Draw"];
      w = "You ";
      for (let i = 0; i < pstats.length; i++) {
        if (ship.custom["just"+pstats[i]]) {
          w+=verbs[i];
          break;
        }
      }
      if (w == "You ") w = "";
      else w+=" in the latest round!";
    }
    if (w) addWarn(ship, w);
    announce(ship, "Waiting for the next round","",[("You are "+(ship.custom.ready?"":"not ")+"ready").toUpperCase(), ship.custom.ready?120:10]);
  }
}, warn = function (ship) {
  let war = (Array.isArray(ship.custom.warn)?ship.custom.warn:[]).filter(Array.isArray), wh = warn_height*13/97, t = 0;
  ship.setUIComponent({
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
  ship.setUIComponent({
    id: "stat",
    position: [3,28,17,15],
    visible: true,
    components: stats.flat().map((j,i) => ({type: "text",position:[0,33*i,80,33],value:j,color:dfl_tcl}))
  });
}, setStates = function (ship, ...states) {
  let r = ["Win","Lose","Draw"];
  for (let i = 0; i < states.length; i++) ship.custom["just"+r[i]] = states[i];
}, gameover = function (ship) {
  ship != null && ship.gameover({
    "Wins": getStat(ship, "wins"),
    "Losses": getStat(ship, "loses"),
    "Draws": getStat(ship, "draws"),
    "Rank": ship.custom.rank||"Unranked"
  })
}, setSpectate = function(ship, bool) {
  bool = !!bool;
  ship.custom.spectate = bool;
  if (bool) ship.set({type:spectator, stats: 88888888});
  else ship.type == spectator && max(ship, ship_infos[0].code);
  ship.set({collider: !bool});
}, sendUI = function(ship, UI) {
  // if (ship != null) {
  //   if (UI.visible) ship.setUIComponent(UI);
  //   else ship.setUIComponent({id: UI.id, visible: false})
  // }
  // Optimization failed. Have nothing to say. Blame the Starblast Client
  ship != null && ship.setUIComponent(UI);
}, shrinkArenas = function (ship) {
  let shrinkSize = arena_radius - grad/10;
  if (ship.setObject) {
    let objrad = 23.5*(arena_radius - shrinkSize), ar = 23.5*arena_radius;
    grids.forEach((grid,j) => setBackgroundCard("safeZoneMarker"+j, "https://raw.githubusercontent.com/bhpsngum/SDC-public/master/img/arena.png", grid[0], grid[1], (j===lobby)?ar:objrad, (j===lobby)?ar:objrad));
  }
  let rsize = 10/map_size*(r - shrinkSize*10), orsize = 10/map_size*r;
  ship.setUIComponent({
    id: "radar_background",
    components: grids.map((x,i) => ({type:"round",position:[t(x[0],(i===lobby)?orsize:rsize),t(x[1],(i===lobby)?orsize:rsize),((i===lobby)?orsize:rsize)*2,((i===lobby)?orsize:rsize)*2],width:1,stroke: "hsla(240,100%,50%,1)", fill: "hsla(0, 0%, 0%, 0)"}))
  });
}, getRadius = function () {
  let percentage = ((shrink_start_time - game_time/3660)/(shrink_start_time - shrink_end_time)) || 1, rad = (min_radius_ratio===false)?(arena_radius-fixed_min_radius):(arena_radius*min_radius_ratio) || 0;
  rad = Math.max(Math.min(rad,arena_radius),0);
  percentage = Math.max(Math.min(percentage,1),0);
  if (!round_started || game_time < 0) percentage = 0
  return arena_radius - percentage * rad;
}, resetArenas = function(game) {
  grad = r;
  shrinkArenas(game);
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
}, break_time = toTick(break_interval), game_time = toTick(duel_duration), dc_time = toTick(duel_countdown/60), round_started = false, round_break = false, matches = [], ended = false, angles = [], grad = r;

// game Modules
var initialization = function(game) {
  setBackgroundCard("infoCard","https://raw.githubusercontent.com/bhpsngum/SDC-public/master/img/ShipCardInfo.png", 0, -30, 42*1.5, 25*1.5);
  grids.forEach((grid, j) => {
    if (j === lobby) setBackgroundCard("credits","https://raw.githubusercontent.com/bhpsngum/SDC-public/master/img/credits.png", 0, 0, 30, 30);
    else setBackgroundCard("logo"+j,"https://raw.githubusercontent.com/bhpsngum/SDC-public/master/img/logo.png", grid[0], grid[1], 30, 30)
  });
  resetArenas(game);
  this.tick = waiting;
}, waiting = function(game) {
  check(game);
  let max_time = toTick(game_duration + duel_duration/2);
  if (!game.custom.started && game.step <= max_time || game.step - game.custom.started <= max_time) {
    let pl = 2-game.ships.length;
    if (pl <= 0) {
      break_time = toTick(break_interval);
      round_break = true;
      resetArenas(game);
      this.tick = game_break;
    }
    else game.step % 30 === 0 && game.ships.forEach(ship => announce(ship,"Waiting for more players"+(pl>0?(" ("+pl+" needed)"):"")));
  }
  else {
    game.setOpen(false);
    ended = true;
    check(game, true);
    updatescoreboard(game);
    game.ships.forEach(clearInds);
    let rank = 1, best = leaderboard[0];
    leaderboard.forEach((i,j) => {
      let ship = game.findShip(i.id);
      if (ship != null) {
        let text;
        if (Math.max(i.wins, i.loses, i.draws) == 0) text = "";
        else {
          text = "You";
          if (best.wins != i.wins || best.loses != i.loses || best.draws != i.draws) {
            best = i;
            rank++
          }
          ship.custom.rank = rank;
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
        announce(ship, "Game finished!","",text);
      }
    });
    modUtils.setTimeout(function(){game.ships.forEach(gameover)}, 300);
    this.tick = check;
  }
}, game_break = function (game) {
  check(game);
  if (!game.custom.started) game.custom.started = game.step;
  if ((game.step - game.custom.started > toTick(game_duration + duel_duration/2) && !round_break) || game.ships.length < 2) this.tick = waiting;
  else if (game.step % 30 === 0) {
    if (break_time >= 0) {
      if (game.step % 60 === 0) {
        let readies = game.ships.filter(i => i.custom.ready && !i.custom.spectate).length;
        setStats(game, readies+"/"+game.ships.length+ " players ready");
        for (let ship of game.ships) announce(ship,"New round starts in: "+FormatTime(break_time),"",[("You are "+(ship.custom.ready?"":"not ")+"ready").toUpperCase(), ship.custom.ready?120:10]);
      }
      break_time-=30;
    }
    else {
      let ready = game.ships.filter(ship => ship.custom.ready && ship.alive && !ship.custom.spectate).sort(a => a.custom.wait?-1:1), players = Math.trunc(Math.min(Math.pow(n,2)-1,ready.length/2)), rlist = ready.map(ship => ship.id), lob = grids.map((v,i) => i).filter(i => i!= lobby), index = 0, pairs = [...matches];
      angles = Array(grids.length).fill(0).map(i=>2*Math.PI*Math.random());
      game.ships.forEach(clearInds);
      matches = [];
      for (let j = 0 ; j < players; j++) {
        let u = rlist[index], ship = game.findShip(u), lastoid, i = rand(lob.length);
        for (let ds of pairs) {
          let t = ds.indexOf(u);
          if (t != -1) {
            lastoid = ds[1-t];
            break;
          }
        }
        if (!lastoid) lastoid = 0;
        let opponents = rlist.filter(f => f !== u && f !== lastoid), t = opponents[rand(opponents.length)] || lastoid, oship = game.findShip(t);
        if (ship && oship) {
          [ship,oship].forEach((aship, nodeInd) => {
            setSpectate(ship, false);
            setNode(aship, lob[i], !!nodeInd);
          });
          rlist.splice(index, 1);
          let oindex = rlist.indexOf(t);
          oindex != -1 && rlist.splice(oindex, 1);
          if (!((game.findShip(rlist[index])||{}).custom||{}).wait) index = rand(rlist.length);
          lob.splice(i, 1);
          matches.push([u,t]);
        }
      }
      if (ready.length < 2) {
        game.ships.forEach(ship => addWarn(ship, "Not enough players ready!", true));
        this.tick = waiting;
        return;
      }
      else rlist.forEach(i => ((game.findShip(i)||{}).custom.wait = true));
      dc_time = toTick(duel_countdown/60);
      round_started = true;
      round_break = false;
      resetArenas(game);
      this.tick = countdown;
    }
  }
}, countdown = function (game) {
  check(game);
  if (game.step % 30 === 0) {
    if (dc_time >= 0) {
      if (game.step%60 === 0) {
        for (let ship of game.ships) {
          let node = ship.custom.currentNode, aid = ["Awaiting countdown"];
          if (!ship.custom.wait && ship.custom.currentNode !== lobby) {
            announce(ship, "Ready?","", FormatTime(dc_time,true));
            aid.push("Arena "+(node + Number(node < lobby)));
          }
          setStats(ship, ...aid);
        }
      }
      game.ships.forEach(ship => !ship.custom.wait && ship.custom.currentNode !== lobby && ship.set({generator: 1e5, invulnerable: 60, idle: true, vx: 0, vy: 0}));
      dc_time-=30;
    }
    else {
      game.ships.forEach(ship => {
        ship.set({idle: false});
        (!ship.custom.wait && ship.custom.currentNode !== lobby) && announce(ship, "");
      });
      game_time = toTick(duel_duration);
      this.tick = main_game
    }
  }
}, main_game = function (game) {
  check(game);
  if (game.step % 30 === 0) {
    if (game_time >= 0) {
      if (game.step % 60 === 0) {
        let timer = "Time left: "+FormatTime(game_time);
        game.ships.forEach(ship => {
          let node = ship.custom.currentNode, aid = [timer];
          !ship.custom.spectate && node !== lobby && typeof node == "number" && aid.push("Arena "+(node + Number(node < lobby)));
          setStats(ship,...aid)
        });
        let wtext = "Warning: Arena shrinking!";
        if (game_time <= toTick(shrink_start_time) && game_time >= toTick(shrink_end_time)) {
          if (game.step % (shrink_interval*60) === 0) {
            let prad = grad;
            grad = getRadius()*10;
            if (grad != prad) shrinkArenas(game);
          }
          game.ships.filter(ship => ship.custom.currentNode !== lobby).forEach(ship => addWarn(ship, wtext, true, 90))
        }
      }
      game_time-=30;
    }
    if (game_time < 0 || game.ships.filter(ship => ship.custom.currentNode == lobby).length == game.ships.length) {
      round_started = false;
      setStats(game,"");
      resetArenas(game);
      this.tick = endgame;
    }
  }
}, endgame = function (game) {
  check(game);
  break_time = toTick(break_interval);
  let st = game.ships.filter(ship => ship.custom.currentNode !== lobby), idx = st.map(i => i.custom.currentNode), i = 0;
  while (idx.length > i) {
    let f = idx[i], l = idx.lastIndexOf(f);
    if (i != l && l != -1) for (let d of [l,i]) {
      let dship = st[d];
      setStates(dship, false, false, true);
      dship.custom.draws = (dship.custom.draws||0) + 1;
      dship.custom.pendingTp = game.step;
      setNode(dship, lobby);
      waitnextround(dship, true);
      idx.splice(d,1);
      st.splice(d,1);
    }
    else i++;
  }
  game.ships.forEach(ship => (ship.custom.spectate = false));
  this.tick = waiting;
}
this.tick = initialization;
this.event = function(event, game) {
  let ship = event.ship, killer = event.killer;
  if (ship != null) switch (event.name) {
    case "ui_component_clicked":
      let id = event.id;
      switch (id) {
        case "chooser":
          if (ship.custom.currentNode === lobby) {
            if (!ship.custom.spectate) ship.custom.shipped = !ship.custom.shipped;
            else addWarn(ship, "You can't change ships when you're spectating!")
          }
          break;
        case "ready":
          if (ship.custom.spectate && !ship.custom.ready) addWarn(ship, "You will no longer spectate when you're ready!");
          ship.custom.ready = !ship.custom.ready;
          ship.custom.spectate = false;
          setSpectate(ship, false);
          break;
        case "spectate":
          if (ship.custom.ready && !ship.custom.spectate) addWarn(ship, "You will no longer be ready when you're spectating!");
          ship.custom.ready = false;
          ship.custom.mapped = false;
          ship.custom.shipped = false;
          ship.custom.spectate = !ship.custom.spectate;
          break;
        case "map":
          if (ship.custom.spectate && !ship.custom.ready) ship.custom.mapped = !ship.custom.mapped;
          ship.custom.shipped = false;
          break;
        default:
          if (ship.custom.currentNode === lobby) {
            if (id.match(/^n\d+$/) && ship.custom.spectate && !ship.custom.ready) setNode(ship, Number(id.slice(-id.length+1)));
            if (id.match(/^s\d+$/) && !ship.custom.spectate) {
              max(ship, Number(id.slice(-id.length+1)));
              ship.set({generator: 0});
            }
          }
      }
      break;
    case "ship_destroyed":
      if (round_started && ship.custom.currentNode !== lobby) {
        if (!killer) killer = game.ships.filter(i => i.id !== ship.id && i.custom.currentNode === ship.custom.currentNode && i.custom.currentNode !== lobby)[0];
        if (((killer||{}).custom||{}).currentNode === ship.custom.currentNode) {
          killer.custom.wins = (killer.custom.wins||0) + 1;
          setStates(killer, true, false, false);
          killer.custom.ready = false;
          killer.custom.shipped = false;
          killer.custom.pendingTp = game.step;
          ship.custom.loses = (ship.custom.loses||0) + 1;
          setStates(ship, false, true, false);
          ship.custom.pendingTp = game.step;
          setNode(killer, lobby);
        }
      }
      setNode(ship, lobby);
      ship.custom.ready = false;
      ship.custom.shipped = false;
      break;
    case "ship_spawned":
      ship.custom.pendingTp = -1;
      setNode(ship, lobby);
      max(ship, (ship_infos.find(info => info.code === ship.type)||ship_infos[0]).code);
      break;
    default:
      break;
  }
}
