// SRC season II
// Special thanks to Notus, for testing, code review, and big help in developing

"use strict";
var Enum = (desc) => String(desc).split(/\W+/).reduce((en, key, i) => (en[key] = ++i, en), {});
var games = Enum("public_event, championship, free_practice, testing");
var vehicles = Enum("sprint, endurance");

var game_type = games.public_event;
var vehicle_type = vehicles.endurance;

var rotate_tracks = true;
var show_championship_table = true;
var championship_points = [10,8,6,5,4,3,2,1];

var season_race_number = 1;
var max_players = 16;

var qualification_duration = 180; // 180 for public event
var race_laps = 4; //4 for public event
var race_start_delay = 11;
var race_start_countdown = 6;
var race_close_time = 25; //25 for public event

var set_end_times = function() {
  if (rotate_tracks) {
    // Multiple tracks, endless game
    time_after_race = 35;
    end_message_time = 10;
  } else {
    // One track with gameover
    time_after_race = 150;
    end_message_time = 15;
  }
};

var ship_switch_delay = 0.5;

// DRS settings
var enable_drs_on_race_lap = 2;
var drs_max_number = 50;
var drs_check_step = 5;
var drs_alive_step = 620;
var drs_creation_step = 60;
var drs_duplicate_step = 20;
var drs_remove_collectibles = true;
var max_collectibles = 50;


// AFK settings
var afk_timeout = 20;
var afk_speed = 0.25;
var afk_action = function(ship) {
  respawn_ship(ship);
};

var troll_timeout = 75;
// var troll_afk_timeout = afk_timeout / 2;

// Out lap detection settings
var outlap_delay = 2;
var onlap_blink_time = 2.5;
var lap_map_precision = 2;
var lap_map_overlap = 1;

// Messages
var positions = ["1st","2nd","3rd"];
var welcome_message = {
  [games.public_event]: "SRC open championship! There is a standings appear between races. For victory and other high places you get points. At the end of the last race, if you have the most points - you are the champion!",
  [games.championship]: "Welcome to the SRC II! Don't forget that points are played here (10,8,6,5,4,3,2,1, 2 for pole). Race with your real discord nick, good luck!",
  [games.free_practice]: "It's free practice. Good luck, let's study the track!",
  [games.testing]: "\nTesting mode\nsome features disabled\n",
};

// Init some settings
var public_event, map_name;
if (game_type == games.public_event) {
  public_event = true;
  rotate_tracks = true;
  show_championship_table = true;
} else if (game_type == games.championship) {
  map_name = `SRC: Race ${season_race_number}`
} else if (game_type == games.free_practice) {
  map_name = `SRC: Free Practice`
}
var time_after_race, end_message_time;
set_end_times();


// Chat

var vocabulary = [
  { text: "Hello", icon:"\u0045", key:"H" },
  { text: "Bye Bye!", icon:"\u0027", key:"B" },
  { text: "Yes", icon:"\u004c", key:"Y" },
  { text: "No", icon:"\u004d", key:"N" },

  { text: "GG", icon:"\u00a3", key:"G" },
  { text: "Overtake!", icon:"\u00bd", key:"O" },
  { text: "A'm a torpedo!", icon:"\u006a", key:"T" },
  { text: "Thanks", icon:"\u0041", key:"X" },

  { text: "Sorry", icon:"\u00a1", key:"S" },
  { text: "WTF", icon:"\u004b", key:"Q" },
  { text: "No Problem", icon:"\u0047", key:"P" },
  { text: "Wait", icon:"\u0046", key:"W" },
];


// Ships

var Booster_101 = '{"name":"Booster","level":1,"model":1,"size":1.62,"zoom":0.75,"designer":"Zerd","next":[],"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":250,"speed":[290,290],"rotation":[60,60],"acceleration":[120,120],"dash":{"rate":2,"burst_speed":[250,250],"speed":[440,440],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main1":{"section_segments":8,"offset":{"x":60,"y":-55,"z":-9},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-55,-33,-40,0,10,40,48,70,80,70],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,14,20,14,14,20,20,15,0],"height":[0,6,14,20,11,11,15,15,10,0],"propeller":true,"texture":[4,18,10,63,8,63,10,63,17]},"main2":{"section_segments":6,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-55,-60,-50,-20,10,15,45,75,60],"z":[-7,-7,-5,0,0,0,0,0,0]},"width":[0,8,15,25,25,20,20,14,0],"height":[0,5,10,15,18,18,18,14,0],"propeller":true,"texture":[1,63,1,1,5,8,12,17]},"cockpit":{"section_segments":7,"offset":{"x":0,"y":-48,"z":22},"position":{"x":[0,0,0,0,0,0,0],"y":[0,0,20,30,90],"z":[-9,-9,0,0,0]},"width":[0,5,14,14,11],"height":[0,4,5,7,7],"texture":[7,9,9,4]},"cannons":{"section_segments":6,"offset":{"x":20,"y":30,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-60,-70,-30,0,25,30],"z":[0,0,0,0,0,0]},"width":[0,5,6,11,7,0],"height":[0,5,6,11,7,0],"angle":180,"texture":[3,8,10,63]},"cannons2":{"section_segments":6,"offset":{"x":27,"y":0,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-70,-80,-35,0,25,30],"z":[0,0,0,0,0,0]},"width":[0,5,6,11,7,0],"height":[0,5,6,11,7,0],"angle":180,"texture":[3,8,10,63]},"cannons3":{"section_segments":8,"offset":{"x":0,"y":32,"z":-30},"position":{"x":[0,0,0,0,0,0],"y":[-2,-2,-3,0,10,10],"z":[0,0,0,0,0,0]},"width":[0,8,12,16,16,0],"height":[0,8,12,16,16,0],"angle":180,"vertical":true,"texture":[18,17,10,63]},"cannons4":{"section_segments":7,"offset":{"x":20,"y":60,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-5,-6,-5,0,1,-5],"z":[0,0,0,0,0,0]},"width":[7,7,10,10,7,7],"height":[7,7,10,10,7,7],"angle":180,"texture":[3,8,10,63]},"cannons6":{"section_segments":7,"offset":{"x":20,"y":70,"z":10},"position":{"x":[0,0,0,0,0,0],"y":[-5,-6,-5,0,1,-5],"z":[0,0,0,0,0,0]},"width":[7,7,10,10,7,7],"height":[7,7,10,10,7,7],"angle":180,"texture":[3,8,10,63]},"cannons5":{"section_segments":8,"offset":{"x":20,"y":15,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-5,-6,-5,0,1,-5],"z":[0,0,0,0,0,0]},"width":[7,7,12,12,7,7],"height":[7,7,12,12,7,7],"angle":125,"vertical":true,"texture":[3,17,63,63]},"cannons7":{"section_segments":6,"offset":{"x":4,"y":12,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-5,-6,-16,0,1,-5],"z":[0,0,0,0,0,0]},"width":[7,7,12,12,7,7],"height":[7,7,12,12,7,7],"angle":180,"texture":[3,9,15,63]},"cannons8":{"section_segments":6,"offset":{"x":5,"y":-5,"z":18},"position":{"x":[0,0,0,0,0,0],"y":[-10,-15,-14,0,1,-5],"z":[0,0,0,0,0,0]},"width":[7,7,12,12,7,7],"height":[7,7,12,12,7,7],"angle":180,"texture":[3,63,8,63]},"cannons9":{"section_segments":8,"offset":{"x":0,"y":-15,"z":20},"position":{"x":[0,0,0,0,0,0],"y":[-5,-5,-5,0,0,0],"z":[0,0,0,0,0,0]},"width":[10,10,15,15,10,10],"height":[7,7,12,12,7,7],"angle":180,"texture":[63]},"cannons10":{"section_segments":6,"offset":{"x":60,"y":-20,"z":-4},"position":{"x":[0,0,0,0,0,0],"y":[-5,-6,-13,0,1,-5],"z":[0,0,0,0,0,0]},"width":[7,7,12,12,7,7],"height":[7,7,12,12,7,7],"angle":180,"texture":[3,9,8,63]},"cannons11":{"section_segments":6,"offset":{"x":60,"y":-39,"z":-1},"position":{"x":[0,0,0,0,0,0],"y":[-50,-40,-20,2,25,30],"z":[0,0,0,0,0,0]},"width":[0,7,7,7,7,0],"height":[0,7,7,7,7,0],"angle":180,"texture":[3,4,17,4]},"cannons12":{"section_segments":6,"offset":{"x":60,"y":-35,"z":-4},"position":{"x":[0,0,0,0,0,0],"y":[-5,-9,-8,0,1,-5],"z":[0,0,0,0,0,0]},"width":[7,7,12,12,7,7],"height":[7,7,12,12,7,7],"angle":180,"texture":[3,4,4,63]},"cannons13":{"section_segments":14,"offset":{"x":60,"y":-51,"z":-4},"position":{"x":[0,0,0,0,0,0],"y":[-5,-13,-12,4,1,-5],"z":[0,0,0,0,0,0]},"width":[7,7,12,12,7,7],"height":[7,7,12,12,7,7],"angle":180,"texture":[3,4,8,63]}},"wings":{"main1":{"length":[23,23],"width":[50,35,30],"angle":[-10,-30],"position":[-3,-18,-25],"doubleside":true,"offset":{"x":16,"y":-12,"z":5},"bump":{"position":35,"size":15},"texture":[1,63]},"main2":{"length":[35],"width":[37,15],"angle":[-25],"position":[0,15],"doubleside":true,"offset":{"x":65,"y":-34,"z":-9},"bump":{"position":30,"size":15},"texture":[63]}},"typespec":{"name":"Booster","level":1,"model":1,"code":201,"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":250,"speed":[290,290],"rotation":[60,60],"acceleration":[120,120],"dash":{"rate":2,"burst_speed":[250,250],"speed":[440,440],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[1.948,1.957,1.791,1.52,4.06,3.902,3.795,3.437,3.187,3.03,3.249,3.234,3.158,2.612,2.637,2.593,2.198,1.68,1.449,1.627,1.918,2.398,2.784,3.335,3.298,2.435,3.298,3.335,2.784,2.398,1.918,1.627,1.449,1.68,2.198,2.593,2.637,2.612,3.158,3.234,3.249,3.03,3.187,3.437,3.795,3.902,4.06,1.52,1.791,1.957],"lasers":[],"radius":4.06,"next":[]}}';

var Astral_Accelerator_102 = '{"name":"Astral Accelerator","level":1,"model":2,"size":1.54,"zoom":0.72,"designer":"Finalizer","next":[],"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":195,"speed":[310,310],"rotation":[70,70],"acceleration":[90,90],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-90,-93,-95,-90,-30,0,50,100,105,90],"z":[-7,-7,-7,-7,-7,-7,0,0,0]},"width":[20,23,25,27,30,27,30,26,15,0],"height":[0,6,8,10,15,18,8,10,10,0],"texture":[17,13,17,1,10,1,10,12,17],"propeller":true},"stripes":{"section_segments":16,"offset":{"x":15,"y":-40,"z":10},"position":{"x":[-4,-4,-4,11,5,0,0,0],"y":[-92,-30,0,50,100],"z":[1,6,10,3,3,0]},"width":[3,3,3,3,3,3],"height":[1,1,1,1,1],"texture":[63]},"cockpit":{"section_segments":[40,90,180,270,320],"offset":{"x":0,"y":-55,"z":22},"position":{"x":[0,0,0,0,0,0],"y":[15,35,65,85,105],"z":[-1,-4,-5,-6,-2]},"width":[5,11,12,12,5],"height":[0,12,15,15,0],"texture":[8.98,8.98,63]},"detail":{"section_segments":8,"angle":3,"offset":{"x":26,"y":-56,"z":6},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,3,3,11,11,21,21,29,29,39,39,47,47,57,57,65,65],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[1,4,5,5,4,4,5,5,4,4,5,5,4,4,5,5,1],"height":[1,4,6,4,1,4,6,4,1,4,6,4,1,4,6,4,1],"texture":[4,17,17,4,4,17,17,4,4,17,17,4,4,17,17,4]},"engines":{"section_segments":12,"offset":{"x":28,"y":-10,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[25,20,25,55,75,73,70],"z":[5,0,0,0,0,0,0,0]},"width":[0,5,7,8,8,6,0],"height":[0,5,7,8,8,6,0],"texture":[13,3,8,13,18,17],"propeller":true},"hubs1":{"vertical":true,"section_segments":12,"offset":{"x":0,"y":10,"z":90},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,7,7,10,9],"z":[0,0,0,0,0,0,0]},"width":[9,7,6,6,5,0],"height":[9,7,6,6,5,0],"texture":[11,18,17,18,18]},"hubs2":{"vertical":true,"section_segments":12,"offset":{"x":0,"y":10,"z":105},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,7,7,10,9],"z":[0,0,0,0,0,0,0]},"width":[9,7,6,6,5,0],"height":[9,7,6,6,5,0],"texture":[11,18,17,18,18]},"hubs3":{"vertical":true,"section_segments":12,"offset":{"x":0,"y":10,"z":75},"position":{"x":[0,0,0,0,0,0,0],"y":[0,10,7,7,10,9],"z":[0,0,0,0,0,0,0]},"width":[9,7,6,6,5,0],"height":[9,7,6,6,5,0],"texture":[11,18,17,18,18]}},"wings":{"main":{"length":[25,0,5],"width":[40,20,90,20],"angle":[-5,5,25],"position":[-15,5,-10,0],"texture":[1,11,63],"doubleside":true,"bump":{"position":30,"size":20},"offset":{"x":20,"y":30,"z":10}},"font":{"length":[40],"width":[61,10],"angle":[-6,20],"position":[-60,-110],"texture":[63],"doubleside":true,"bump":{"position":30,"size":15},"offset":{"x":5,"y":-20,"z":5}},"shields":{"doubleside":true,"offset":{"x":-20,"y":60,"z":10},"length":[0,30],"width":[65,65,30],"angle":[90,90],"position":[-40,-40,0,10],"texture":[3],"bump":{"position":0,"size":4}},"spoiler":{"length":[20,15,0,5],"width":[25,25,20,30,0],"angle":[0,20,90,90],"position":[60,60,75,75,85],"texture":[4,1,63],"doubleside":true,"bump":{"position":30,"size":5},"offset":{"x":0,"y":-10,"z":30}}},"typespec":{"name":"Astral Accelerator","level":1,"model":2,"code":202,"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":195,"speed":[310,310],"rotation":[70,70],"acceleration":[90,90],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[4.058,4.112,4.235,4.267,1.924,1.754,1.458,1.331,1.542,1.537,1.47,1.431,1.425,1.456,1.513,1.601,1.725,1.905,2.132,2.253,2.37,2.488,2.609,2.329,1.985,1.954,1.985,2.329,2.609,2.488,2.37,2.253,2.132,1.905,1.725,1.601,1.513,1.456,1.425,1.431,1.47,1.537,1.542,1.331,1.458,1.754,1.924,4.267,4.235,4.112],"lasers":[],"radius":4.267,"next":[]}}';

var V2_103 = '{"name":"V2","designer":"Void","level":1,"model":3,"size":1.5,"zoom":0.7,"next":[],"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":210,"speed":[302.5,302.5],"rotation":[70,70],"acceleration":[94,94],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main":{"section_segments":8,"offset":{"x":0,"y":-10,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-90,-75,-20,0,45,76,95,85],"z":[0,0,0,0,0,0,0,0]},"width":[0,15,20,25,25,25,20,0],"height":[0,10,20,20,20,20,15,0],"propeller":true,"texture":[63,2,2,10,2,4,17],"vertical":false},"topDetail":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":48,"z":29.8},"position":{"x":[3,-2,3,-2,4,1,-2],"y":[-30,-10,-10,5,5,15,15],"z":[0,0,0,0,0,0,0]},"width":[0,8,8,9,10,11,0],"height":[0,1,1,1,1,1,0],"propeller":false,"texture":[4],"angle":0,"vertical":false},"hundredpercentlegitname":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":20,"z":29},"position":{"x":[-5,-5,0,0,-5,-5],"y":[-25,-25,-15,15,25,25],"z":[-8,-8,-2,-2,-8,-8]},"width":[0,2,5,5,2,0],"height":[0,3,5,5,3,0],"texture":[4,4,3,4,4],"propeller":false,"angle":90},"hundredpercentlegitname2":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":65,"z":29},"position":{"x":[-5,-5,0,0,-5,-5],"y":[-25,-25,-15,15,25,25],"z":[-8,-8,-2,-2,-8,-8]},"width":[0,2,5,5,2,0],"height":[0,3,5,5,3,0],"texture":[4,4,3,4,4],"propeller":false,"angle":-90},"thingydetailsinbetween_insider":{"section_segments":[45,135,225,315],"offset":{"x":12,"y":42.5,"z":29},"position":{"x":[0,0,0,0,0,0],"y":[-25,-25,-25,20,20,20],"z":[0,0,0,0,0,0]},"width":[0,1,1,1,1,0],"height":[0,1,1,1,1,0],"texture":[3],"propeller":false,"angle":0},"thingydetailsinbetween2_insider":{"section_segments":[45,135,225,315],"offset":{"x":21,"y":45,"z":23.5},"position":{"x":[0,0,0,0,0,0],"y":[-15,-15,-15,20,20,20],"z":[0,0,0,0,0,0]},"width":[0,1,1,1,1,0],"height":[0,1,1,1,1,0],"texture":[3],"propeller":false,"angle":180},"engineDetailTop":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":83.5,"z":30},"position":{"x":[0,0,0,0,0,0],"y":[-4,-4,-4,15,15,15],"z":[-5.5,-5.5,-5.5,0,0,0]},"width":[0,1,1,1,1,0],"height":[0,1,1,1,1,0],"texture":[3],"propeller":false,"angle":180},"engineDetailSides_Far":{"section_segments":[45,135,225,315],"offset":{"x":17,"y":83.5,"z":23.4},"position":{"x":[3,3,3,0,0,0],"y":[-4,-4,-4,17,17,17],"z":[-3,-3,-3,0,0,0]},"width":[0,1,1,1,1,0],"height":[0,1,1,1,1,0],"texture":[3],"propeller":false,"angle":180},"engineDetailSides_Farther":{"section_segments":[45,135,225,315],"offset":{"x":24.8,"y":83.5,"z":10},"position":{"x":[5.5,5.5,5.5,0,0,0],"y":[-4,-4,-4,17,17,17],"z":[0,0,0,0,0,0]},"width":[0,1,1,1,1,0],"height":[0,1,1,1,1,0],"texture":[3],"propeller":false,"angle":180},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-30,"z":18},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-30,10,30,40],"z":[0,0,2,2,2]},"width":[0,10,16,15,5],"height":[0,9,12.5,12.5,2.5],"propeller":false,"texture":9},"deco":{"section_segments":6,"offset":{"x":23,"y":10,"z":10},"position":{"x":[1,1,3,7.5,10,10,10],"y":[-45,-50,-20,0,20,70,65],"z":[0,0,0,0,0,0,0]},"width":[0,7,10,10,15,10,0],"height":[0,7,10,10,10,8,0],"angle":0,"propeller":true,"texture":[4,3,4,10,4,17]},"top_props":{"section_segments":6,"offset":{"x":33,"y":30,"z":20},"position":{"x":[-6,-6,-3,0,0,0,0],"y":[-30,-40,-20,0,30,45,43],"z":[-5,-5,-1,0,0,1,1]},"width":[0,5,6,10,10,7.5,0],"height":[0,5,5,5,5,4,0],"angle":0,"propeller":true,"texture":[4,4,10,4,63,17]},"bottom_props":{"section_segments":6,"offset":{"x":33,"y":30,"z":0},"position":{"x":[-6,-6,-3,0,0,0,0],"y":[-30,-40,-20,0,30,45,43],"z":[5,5,1,0,0,-1,-1]},"width":[0,5,6,10,10,7.5,0],"height":[0,5,5,5,5,4,0],"angle":0,"propeller":true,"texture":[4,4,10,4,63,17]},"disc1":{"section_segments":20,"offset":{"x":33,"y":31.5,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,7,7,7,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[11,11,11,12,12,12,12,11,11,11],"height":[11,11,11,12,12,12,12,11,11,11],"texture":[8]},"disc2":{"section_segments":20,"offset":{"x":33,"y":41.5,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,7,7,7,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[11,11,11,12,12,12,12,11,11,11],"height":[11,11,11,12,12,12,12,11,11,11],"texture":[7]},"disc3":{"section_segments":20,"offset":{"x":33,"y":51.5,"z":15},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,7,7,7,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[11,11,11,12,12,12,12,11,11,11],"height":[11,11,11,12,12,12,12,11,11,11],"texture":[8]},"disc1_1":{"section_segments":8,"offset":{"x":0,"y":81,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,7,7,7,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[19,19,19,20,20,20,20,19,19,19],"height":[14,14,14,15,15,15,15,14,14,14],"texture":[13]},"disc2_2":{"section_segments":8,"offset":{"x":0,"y":88,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,0,0,0,0.2,0.2,0.2,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[19,19,19,20,20,20,20,19,19,19],"height":[14,14,14,15,15,15,15,14,14,14],"texture":[17]}},"wings":{"top":{"length":[50,40],"width":[80,50,30],"angle":[5,120],"position":[30,50,80],"doubleside":true,"bump":{"position":30,"size":7},"texture":[11,63],"offset":{"x":20,"y":-10,"z":10}},"topdetails":{"length":[55],"width":[80,50],"angle":[0],"position":[30,55],"doubleside":true,"bump":{"position":30,"size":5},"texture":[17],"offset":{"x":15,"y":-18,"z":10}},"bottom":{"length":[50,40],"width":[80,50,30],"angle":[-5,-120],"position":[30,50,80],"doubleside":true,"bump":{"position":30,"size":7},"texture":[11,63],"offset":{"x":20,"y":-10,"z":10}},"connectors":{"length":[10],"width":[50,50],"angle":[90],"position":[0,0],"doubleside":true,"bump":{"position":30,"size":6},"texture":[11],"offset":{"x":71,"y":40,"z":6}}},"typespec":{"name":"V2","level":1,"model":3,"code":203,"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":210,"speed":[302.5,302.5],"rotation":[70,70],"acceleration":[94,94],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[3,2.826,2.462,1.711,1.42,1.501,1.433,1.298,1.205,1.14,1.217,1.369,1.589,1.95,2.199,2.29,2.447,2.691,2.888,2.872,2.93,2.956,2.652,2.713,2.694,2.651,2.694,2.713,2.652,2.956,2.93,2.872,2.888,2.691,2.447,2.29,2.199,1.95,1.605,1.369,1.217,1.14,1.205,1.298,1.433,1.501,1.42,1.711,2.462,2.826],"lasers":[],"radius":3,"next":[]}}';

var RAD_Diamond_Lancer_104 = '{"name":"Diamond Lancer","designer":"Uranus","level":1,"model":4,"size":1.98,"zoom":0.69,"next":[],"specs":{\
"shield":{"capacity":[240,400],"reload":[400,400]},"generator":{"capacity":[240,240],"reload":[19,29]},"ship":{"mass":230,"speed":[300,300],"rotation":[80,80],"acceleration":[100,100],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main":{"section_segments":6,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-53,-50,-40,-20,10,40,80,84],"z":[0,0,0,0,0,0,0,0]},"width":[18,25,25,23,23,25,20,0],"height":[0,5,10,10,10,10,7,0],"texture":[1,1,1,1,1,8,3.9],"angle":0},"bumper":{"section_segments":6,"offset":{"x":-1,"y":-100,"z":0},"position":{"x":[1.5,1,0,-5,-5,0,0],"y":[0,10,15,25,27],"z":[0,0,0,0,0,0,0]},"width":[5,5,5,5,0],"height":[5,5,5,5,0],"texture":[3.9,16.9,3.9],"angle":90},"cockpitWindshield":{"section_segments":3,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[-20,0,5,0,-20,0,0],"y":[-20,-10,0,10,20],"z":[-6,-2,0,-2,-6,0,0]},"width":[0,12,12,12,0],"height":[0,5,5,5,0],"texture":[8.6],"angle":90},"cockpitBack":{"section_segments":6,"offset":{"x":0,"y":10,"z":7},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-20,0,20,23],"z":[-2,0,0,0,0,0,0]},"width":[15,15,15,13,0],"height":[0,10,10,10,0],"texture":[4,10,17.9,3.9],"angle":0},"cockpitBackSides":{"section_segments":6,"offset":{"x":13,"y":0,"z":7},"position":{"x":[5,0,0,0,0,0,0],"y":[-20,-10,0,3],"z":[-3,0,0,0,0,0,0]},"width":[0,7,7,0],"height":[0,5,5,0],"texture":[4,17.5,4,3],"angle":0},"enginesTop":{"section_segments":6,"offset":{"x":12,"y":70,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-60,-58,-55,-40,-30,-25,-20,-8,-30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,5,5,8,6,0],"height":[0,5,7,7,5,5,8,6,0],"texture":[3.9,3.9,10.4,63,2.9,2.9,3.9,16.9],"angle":0,"propeller":true},"enginesBottom":{"section_segments":6,"offset":{"x":18,"y":65,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-55,-54,-50,-40,-30,-25,-20,-8,-30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,5,5,8,6,0],"height":[0,5,7,7,5,5,8,6,0],"texture":[3.9,3.9,17.9,63,2.9,2.9,3.9,16.9],"angle":0,"propeller":true},"enginesConnect":{"section_segments":6,"offset":{"x":1,"y":36,"z":0},"position":{"x":[4,-12,0,0,0,0,0],"y":[-20,10],"z":[-5,8,0,0,0,0,0]},"width":[2,2],"height":[2,2],"texture":[1.9],"angle":90},"boostTank":{"section_segments":12,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[-30,-30,-30,-30,-30,-30,-30,-30,-30,-30],"y":[-30,-30,-26,-20,-5,5,20,26,30,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7.5,8,8,8,8,7.5,5,0],"height":[0,5,7.5,8,8,8,8,7.5,5,0],"texture":[63,63,63,13,4,13,63,63,63],"angle":0},"boostTankHolder":{"section_segments":6,"angle":90,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-44,-43,-39,-38,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,8,4,4],"height":[0,4,6,4,4],"texture":[4,63,4,4,4,4,4,63,4]},"boostPipeMain":{"section_segments":6,"offset":{"x":0,"y":-20,"z":11},"position":{"x":[-30,-30,-30,-30,-27,-15,-15,0,0],"y":[-20,-18,-15,30,35,45,48],"z":[-6,-2,0,0,0,0,0,0]},"width":[2,2,2,2,2,2,0],"height":[2,2,2,2,2,2,0],"texture":[63],"angle":0},"boostPipeSide":{"section_segments":6,"offset":{"x":0,"y":-20,"z":9},"position":{"x":[-34,-34,-34,-34,-36,-40,-42,-42,-42],"y":[-20,-18,-15,25,30,33,40,46],"z":[-6,-2,0,0,0,0,0,0]},"width":[2,2,2,2,2,2,2,0],"height":[2,2,2,2,2,2,2,0],"texture":[63],"angle":0},"boostTankEngineHolder":{"section_segments":6,"angle":90,"offset":{"x":0,"y":27,"z":3},"position":{"x":[0,0,0,0,10,0,0,0,0],"y":[-54,-53,-49,-48,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,8,3,3],"height":[0,4,6,3,3],"texture":[4,63,4,4,4,4,4,63,4]},"engineBoostTankOffset":{"section_segments":6,"offset":{"x":0,"y":70,"z":3},"position":{"x":[-42,-42,-42,-42,-42,-42,-42,-42,-42],"y":[-60,-58,-55,-40,-30,-25,-20,-8,-30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,5,5,8,6,0],"height":[0,5,7,7,5,5,8,6,0],"texture":[3.9,3.9,10.4,63,2.9,2.9,3.9,16.9],"angle":0,"propeller":true},"logo1":{"section_segments":4,"offset":{"x":0,"y":-65,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[0,5],"z":[0,0,0,0,0,0,0]},"width":[0,3.2],"height":[0,0],"texture":[4,3,4,3],"angle":0},"logo2":{"section_segments":4,"offset":{"x":0.1,"y":-65,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[0,5],"z":[0,0,0,0,0,0,0]},"width":[0,3.2],"height":[0,0],"texture":[4,3,4,3],"angle":120},"logo3":{"section_segments":4,"offset":{"x":0.1,"y":-65,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[5,15],"z":[0,-3,0,0,0,0,0]},"width":[3.2,0],"height":[0,0],"texture":[4],"angle":60},"logo4":{"section_segments":4,"offset":{"x":0,"y":-65,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[5,15],"z":[0,0,0,0,0,0,0]},"width":[3.2,0],"height":[0,0],"texture":[4],"angle":180},"logoDeco":{"section_segments":4,"offset":{"x":5,"y":-72,"z":9},"position":{"x":[0,0,3,5,8,13,14,15],"y":[-20,-10,2,5,8,14,20,26],"z":[-4,0,-1,-1,-1,-2,-3,-3,0]},"width":[3,3,3,3,3,3,2,0,0],"height":[2,2,2,2,2,1,0,0],"texture":[3.9],"angle":0}},"wings":{"cockpitTop":{"doubleside":false,"offset":{"x":0,"y":-30,"z":15},"length":[10,13],"width":[30,20,4],"angle":[-11,-42],"position":[0,0,11],"texture":[11.5,9],"bump":{"position":20,"size":3}},"cockpitTopBack":{"doubleside":false,"offset":{"x":0,"y":-17,"z":14.8},"length":[10,13],"width":[10,10,20],"angle":[-11,-42],"position":[0,0,10],"texture":[4],"bump":{"position":20,"size":3}},"wingsBackTop":{"doubleside":true,"offset":{"x":14,"y":37,"z":10},"length":[20],"width":[20,7],"angle":[20],"position":[0,20],"texture":[63],"bump":{"position":20,"size":5}},"wingsBackBottom":{"doubleside":true,"offset":{"x":20,"y":31,"z":-8},"length":[30],"width":[16,4],"angle":[-25],"position":[0,20],"texture":[63],"bump":{"position":20,"size":5}}},"typespec":{"name":"Diamond Lancer","level":1,"model":4,"code":104,"specs":{\
"shield":{"capacity":[240,400],"reload":[400,400]},"generator":{"capacity":[240,240],"reload":[19,29]},"ship":{"mass":230,"speed":[300,300],"rotation":[80,80],"acceleration":[100,100],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[4.191,4.186,4.097,2.552,1.844,1.499,1.287,1.14,1.042,0.973,0.913,0.862,0.83,0.814,0.816,0.838,1.041,1.176,1.305,2.81,2.563,2.725,2.441,2.548,2.499,1.795,2.499,2.548,2.441,2.907,3.086,2.967,2.517,2.456,2.419,2.045,1.873,1.516,1.517,1.768,1.855,1.881,1.858,2.061,2.234,2.258,2.11,2.552,4.097,4.186],"lasers":[],"radius":4.191,"next":[]}}';

var Vengar_105 = '{"name":"Vengar","designer":"SChickenman","level":1,"model":5,"size":1.6,"zoom":0.72,"next":[],"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":230,"speed":[290,290],"rotation":[95,95],"acceleration":[129,129],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main":{"section_segments":6,"offset":{"x":0,"y":0,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-90,-70,-45,-25,-10,20,35,50,55,50],"z":[-4,-3,-2,-2,-2,0,0,0,0,0,0]},"width":[0,5,10,13,15,15,15,13,9,0],"height":[0,5,10,13,15,15,15,13,9,0],"texture":[1,1,63,63,1,1,63,12,17],"propeller":true},"cockpit":{"section_segments":6,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-25,0,20,45],"z":[-2,-2,0,2,5,8]},"width":[0,5,8,10,8,0],"height":[0,5,8,10,8,0],"texture":[4,9,9,10,4]},"cannon":{"section_segments":8,"offset":{"x":0,"y":-15,"z":-20},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-85,-80,-70,-80,-75,-20,0,20,50],"z":[0,0,0,0,0,0,0,0,10,30]},"width":[0,5,7.5,10,12.5,15,40,35,15],"height":[0,5,7.5,10,12.5,12.5,10,10,0],"angle":0,"propeller":false,"texture":[12,12,17,17,3,3]},"cannons2":{"section_segments":8,"offset":{"x":50,"y":70,"z":5},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-30,-15,-25,-15,-10,0,20,30,25],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7.5,10,10,10,10,7.5,0],"height":[0,5,7.5,10,10,10,10,7.5,0],"texture":[12,17,4,17,4,1,12,17],"propeller":true,"angle":0},"propulsors":{"section_segments":8,"offset":{"x":65,"y":-50,"z":-35},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[30,45,35,45,50,95,100,90,95],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7.5,10,10,10,7.5,0],"height":[0,5,7.5,10,10,10,7.5,0],"texture":[12,17,4,17,63,11,12,17],"propeller":true}},"wings":{"wings1":{"doubleside":true,"offset":{"x":0,"y":20,"z":-13},"length":[0,-10,-30,-20],"width":[50,50,130,80,30],"angle":[100,-20,10,-20],"position":[-10,-10,-50,3,30],"texture":[4,4,4,1],"bump":{"position":50,"size":-5}},"join":{"doubleside":true,"offset":{"x":0,"y":0,"z":-10},"length":[70],"width":[50,30],"angle":[-20],"position":[0,20,0,50],"texture":63,"bump":{"position":10,"size":10}},"side_joins":{"doubleside":true,"offset":{"x":0,"y":30,"z":-3},"length":[20,7.5,20,20],"width":[90,65,55,30],"angle":[10,10,10,10],"position":[-50,-10,10,50],"texture":[8,63,4],"bump":{"position":10,"size":5}},"turbo_boi1":{"doubleside":true,"offset":{"x":0,"y":-80,"z":-20},"length":[10],"width":[30,30],"angle":[0],"position":[0,0],"texture":[4],"bump":{"position":10,"size":10}},"turbo_boi2":{"doubleside":true,"offset":{"x":0,"y":-80,"z":-20},"length":[10],"width":[30,30],"angle":[120],"position":[0,0],"texture":[4],"bump":{"position":10,"size":20}},"turbo_boi3":{"doubleside":true,"offset":{"x":0,"y":-80,"z":-20},"length":[10],"width":[30,30],"angle":[-120],"position":[0,0],"texture":[4],"bump":{"position":10,"size":20}}},"typespec":{"name":"Vengar","level":1,"model":5,"code":205,"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":230,"speed":[290,290],"rotation":[95,95],"acceleration":[129,129],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[3.2,3.057,2.588,2.152,1.877,1.687,1.557,1.464,1.405,1.369,2.181,2.384,2.405,2.419,2.475,2.576,2.734,2.818,2.722,3.009,3.533,3.691,3.536,1.691,1.778,1.763,1.778,1.691,3.536,3.691,3.533,3.009,2.722,2.818,2.734,2.576,2.475,2.419,2.405,2.384,2.181,1.369,1.405,1.464,1.557,1.687,1.877,2.152,2.588,3.057],"lasers":[],"radius":3.691,"next":[]}}';

var Space_Phantom_106 = '{"name":"Space Phantom","level":1,"model":6,"size":1,"designer":"Goldman","zoom":0.8,"next":[],"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[300,300],"reload":[19,29]},"ship":{"mass":185,"speed":[290,290],"rotation":[110,110],"acceleration":[120,120],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"detail1":{"section_segments":[45,135,225,-90,315],"offset":{"x":0,"y":-50,"z":0},"position":{"x":[1,1,1,1,1,1,1,18,23,27,32,32],"y":[-80,-80,-65,-55,-45,-30,20,40,50,60,70,70],"z":[-13,-13,-7,-2,0,0,0,-1,-2,-5,-8,-8]},"width":[0,12,25,27,27,25,25,10,7,6,3,0],"height":[0,3,9,12,11,11,11,11,8,6,3,0],"texture":[1,1,1,1,1,1,1,1,63],"propeller":false,"vertical":false,"angle":0},"detail2":{"section_segments":[45,90,135,225,315],"offset":{"x":0,"y":-50,"z":0},"position":{"x":[-1,-1,-1,-1,-1,-1,-1,-18,-23,-27,-32,-32],"y":[-80,-80,-65,-55,-45,-30,20,40,50,60,70,70],"z":[-13,-13,-7,-2,0,0,0,-1,-2,-5,-8,-8]},"width":[0,12,25,27,27,25,25,10,7,6,3,0],"height":[0,3,9,12,11,11,11,11,8,6,3,0],"texture":[1,1,1,1,1,1,1,1,63],"propeller":false,"vertical":false,"angle":0},"detail3":{"section_segments":[20,60,100,140,180,220,260,300,340,20],"offset":{"x":0,"y":-15,"z":122},"position":{"x":[0,0,0,0,0,0],"y":[-8,-8,-4,2,5,5],"z":[0,0,0,0,-3,-3]},"width":[0,23,23,20,10,0],"height":[0,40,40,35,15,0],"texture":[1,1,63,1],"propeller":false,"vertical":true,"angle":0},"detail4":{"section_segments":[45,135,225,315],"offset":{"x":1,"y":-50,"z":-12},"position":{"x":[0,0,0,0,0,0,0,0,0,20,29,29],"y":[-79,-79,-65,-50,-35,-25,-15,-5,15,42,65,65],"z":[-6,-6,-6,-1,0,0,0,-2,-3.5,2,2,2]},"width":[0,13,31,33,30,26,26,30,32,5,3,0],"height":[0,4,10,22,22,22,25,25,25,15,3,0],"texture":[4],"propeller":false,"vertical":false,"angle":0},"detail5":{"section_segments":[45,90,135,225,315],"offset":{"x":0,"y":40,"z":-10},"position":{"x":[0,0,-2,0,0,0],"y":[-60,-60,-20,15,50,50],"z":[0,0,0,0,0,0]},"width":[0,21,26,20,18,0],"height":[0,24,13,12,12,0],"texture":[4,4,4,1,1,1],"propeller":false,"vertical":false,"angle":0},"detail6":{"section_segments":[45,90,135,225,315],"offset":{"x":0,"y":40,"z":-10},"position":{"x":[0,0,0,-2,0,0],"y":[-50,-50,-15,20,60,60],"z":[0,0,0,0,0,0]},"width":[0,18,20,26,21,0],"height":[0,12,12,13,24,0],"texture":[4,1,4,4,4],"propeller":false,"vertical":false,"angle":180},"detail7":{"section_segments":6,"offset":{"x":1,"y":-100,"z":9},"position":{"x":[-1,-1,-1,-1,-1,13,14,13,13],"y":[-50,-50,-35,-15,5,20,50,70,70],"z":[-25,-25,-23,-9,-2,0,0,-3,-3]},"width":[0,7,15,20,22,6,3,2,0],"height":[0,2,15,12,8,2,2,2,0],"texture":[9,9,9,9,7,4],"propeller":false,"vertical":false,"angle":0},"detail8":{"section_segments":6,"offset":{"x":40,"y":100,"z":-15},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-50,-50,-40,-10,40,50,40,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,12,15,15,15,12,5,0],"height":[0,12,15,15,15,12,5,0],"texture":[4,4,4,4,4,17],"propeller":true,"vertical":false,"angle":0},"detail9":{"section_segments":[45,135,225,315],"offset":{"x":55,"y":-15,"z":-85},"position":{"x":[-7,-7,-3,0,0,-7,-7],"y":[-12,-12,-9,-6,1.5,15,15],"z":[0,0,0,-2,-25,-35,-45]},"width":[0,4,4,4,4,4,0],"height":[0,44,48,49,20,16,0],"texture":[1],"propeller":false,"vertical":true,"angle":0},"detail10":{"section_segments":6,"offset":{"x":49,"y":45,"z":-18},"position":{"x":[-3,-3,0,0,0,0],"y":[-25,-25,-20,20,25,25],"z":[0,0,0,0,0,0]},"width":[0,5,8,8,5,0],"height":[0,5,8,8,5,0],"texture":[1,1,63,1],"propeller":false,"vertical":false,"angle":0},"detail11":{"section_segments":[45,135,225,315],"offset":{"x":45,"y":-15,"z":-18},"position":{"x":[0,0,0,0,0,0,0],"y":[0,0,-41,-40,-28,40,40],"z":[0,0,0,0,0,0,0]},"width":[0,2,2,3.5,3.5,3.5,0],"height":[0,2,2,3.5,3.5,3.5,0],"texture":[4,4,4,17,4],"propeller":false,"vertical":false,"angle":0},"detail12":{"section_segments":6,"offset":{"x":0,"y":95,"z":-50},"position":{"x":[0,0,0,-40,-55,-55],"y":[45,45,55,95,110,110],"z":[24,24,24,0,-8,-8]},"width":[0,35,35,23,18,0],"height":[0,6,6,3,2,0],"texture":[0.2,0.2,0.2,63],"propeller":false,"vertical":false,"angle":90},"detail13":{"section_segments":6,"offset":{"x":0,"y":95,"z":-50},"position":{"x":[0,0,0,40,55,55],"y":[45,45,55,95,110,110],"z":[24,24,24,0,-8,-8]},"width":[0,35,35,23,18,0],"height":[0,6,6,3,2,0],"texture":[0.2,0.2,0.2,63],"propeller":false,"vertical":false,"angle":-90},"detail14":{"section_segments":[20,60,100,140,180,220,260,300,340,20],"offset":{"x":0,"y":0,"z":-110},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-6,-6,-4,2,5,-2,-2,-2],"z":[0,0,0,0,-3,-3,-3,-3,-3]},"width":[0,40,40,35,20,25,16,0],"height":[0,40,40,35,20,25,16,0],"texture":[0.9,0.9,63,0.9,3.9,16.9,3.9],"propeller":false,"vertical":true,"angle":0},"detail15":{"section_segments":6,"offset":{"x":0,"y":140,"z":-18},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-50,-8,15,30,20,20],"z":[0,0,0,0,0,0,0]},"width":[0,25,25,25,18,8,0],"height":[0,16,15,15,12,5,0],"texture":[3.9,3.9,0.9,3.9,16.9],"propeller":true,"vertical":false,"angle":0},"detail16":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-63,"z":4},"position":{"x":[0,0,0,0,0],"y":[-25,-25,-20,30,30],"z":[0,0,0,0,0]},"width":[0,17,17,17,0],"height":[0,6,6,6,0],"texture":[1,1,10.4444,1],"propeller":false,"vertical":false,"angle":0},"detail17":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":10,"z":3},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-30,-20,30,40,70,70],"z":[0,0,0,-8,-8,-8,-8]},"width":[0,12,17,17,10,10,0],"height":[0,6,6,12,6,6,0],"texture":[3,3,8,63,15,3],"propeller":false,"vertical":false,"angle":0},"detail18":{"section_segments":6,"offset":{"x":58,"y":100,"z":-29},"position":{"x":[0,0,0,0,0,0],"y":[-35,-35,-30,30,35,35],"z":[0,0,0,0,0,0]},"width":[0,5,8,8,5,0],"height":[0,5,8,8,5,0],"texture":[3.9,3.9,11,3.9,3.9],"propeller":false,"vertical":false,"angle":0},"detail19":{"section_segments":[45,135,225,315],"offset":{"x":0,"y":-150,"z":-20},"position":{"x":[0,0,0,0,0,0],"y":[-10,-10,-13,-10,15,15],"z":[0,0,0,0,0,0]},"width":[0,5,7,10,10,0],"height":[0,1,2,4,4,0],"texture":[4,4,17,17],"propeller":false,"vertical":false,"angle":0}},"typespec":{"name":"Space Phantom","level":1,"model":6,"code":206,"specs":{\
"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[300,300],"reload":[19,29]},"ship":{"mass":185,"speed":[290,290],"rotation":[110,110],"acceleration":[120,120],"dash":{"rate":2,"burst_speed":[250,250],"speed":[400,400],"acceleration":[100,100],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[3.262,3.138,2.418,1.682,1.217,1.453,1.455,1.302,1.17,1.083,1.019,0.978,0.956,0.957,0.98,1.017,1.275,1.382,1.584,2.817,3.976,3.77,3.165,3.154,3.414,3.407,3.414,3.154,3.165,3.77,3.976,2.817,1.584,1.382,1.275,1.017,0.98,0.957,0.956,0.978,1.019,1.083,1.17,1.302,1.455,1.453,1.217,1.682,2.418,3.138],"lasers":[],"radius":3.976,"next":[]}}';

var Zarion_107 = '{"name":"Zarion","designer":"Interdictor-SD","level":1,"model":7,"size":1.27,"zoom":0.8,"specs":{\
"shield":{"capacity":[66,66],"reload":[400,400]},"generator":{"capacity":[300,300],"reload":[19,29]},"ship":{"mass":230,"speed":[300,300],"rotation":[100,100],"acceleration":[95,95],"dash":{"rate":2,"burst_speed":[150,150],"speed":[440,440],"acceleration":[70,70],"initial_energy":[40,40],"energy":[85,85]}}},"bodies":{"main":{"section_segments":9,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-104,-98,-100,-85,-62.5,-40,20,60,70,68.99,66],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,2,3,10,17,20,26,23,18,15,0],"height":[0,2,3,11,14,19,24,21,17,14,0],"texture":[2,16.9,1.9,1.9,63,10,3,63,3.9,16.9],"propeller":true},"cockpit":{"section_segments":9,"offset":{"x":0,"y":-60,"z":13},"position":{"x":[0,0,0,0,0,0,0],"y":[-12,-4,25,45,50],"z":[-0.5,-3,0,2,7]},"width":[0,7,11,7,0],"height":[0,7,11,9,0],"texture":[3,9,3,3]},"side":{"section_segments":10,"offset":{"x":43,"y":80,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-80,-70,-50,-16,-10,-4,40,35],"z":[0,0,0,0,0,0,0,0]},"width":[0,10,14,19,14,17,11,0],"height":[0,10,16,20,14,19,11,0],"texture":[2,2,8,63,63,3,16.9],"propeller":true,"angle":0},"engineBodyConnect":{"section_segments":6,"offset":{"x":22,"y":34.5,"z":0},"position":{"x":[0,0,0,0,0],"y":[-2,-2,-2,12,12],"z":[0,0,0,0,0]},"width":[0,11,11,11,0],"height":[0,6,6,6,0],"texture":[1.9],"propeller":false,"angle":0},"cannonBack":{"section_segments":12,"offset":{"x":30,"y":-10,"z":-4},"position":{"x":[0,0,0,0,0],"y":[-12,-12,-12,12,12],"z":[0,0,0,0,0]},"width":[0,3,3,3,0],"height":[0,3,3,3,0],"texture":[17,8,8,3],"propeller":false,"angle":3},"cannonCenter":{"section_segments":8,"offset":{"x":29.1,"y":-26,"z":-4.1},"position":{"x":[0,0,0,0,0,0,0,0,0],"y":[-18,-20,-16,-16,-12,-12,-10.4,12,12],"z":[0,0,0,0,0,0,0,0,0]},"width":[0,1.5,1.8,2.5,2.5,2,2,2.8,0],"height":[0,1.5,1.8,2.5,2.5,2,2,2.8,0],"texture":[17,3,17,3,17,3,4],"propeller":false,"angle":3},"cannonConnect":{"section_segments":[45,135,225,315],"offset":{"x":26,"y":-12,"z":-4},"position":{"x":[-11,-11,0,0,0],"y":[-12,-12,-2,12,12],"z":[0,0,0,0,0]},"width":[0,8,8,8,0],"height":[0,2,2,2,0],"texture":[63],"propeller":false,"angle":0.8},"decoBase":{"section_segments":6,"offset":{"x":0,"y":37,"z":16},"position":{"x":[0,0,0,0],"y":[-12,-12,10,10],"z":[0,0,0,0]},"width":[0,14,13,0],"height":[0,8,6.4,0],"texture":[2]},"decoR1":{"section_segments":12,"offset":{"x":0,"y":45,"z":20},"position":{"x":[0,0,0,0],"y":[-2,-2,1,1],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[3]},"decoR2":{"section_segments":12,"offset":{"x":0,"y":28,"z":21},"position":{"x":[0,0,0,0],"y":[-2,-2,1,1],"z":[0,0,0,0]},"width":[0,5,5,0],"height":[0,5,5,0],"texture":[3]},"RMid1":{"section_segments":12,"offset":{"x":0,"y":32.5,"z":21.9},"position":{"x":[0,0,0,0],"y":[-1,-1,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[2]},"RMid2":{"section_segments":12,"offset":{"x":0,"y":36.5,"z":21.7},"position":{"x":[0,0,0,0],"y":[-1,-1,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[2]},"RMid3":{"section_segments":12,"offset":{"x":0,"y":40.5,"z":21.5},"position":{"x":[0,0,0,0],"y":[-1,-1,0,0],"z":[0,0,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[2]},"decoRConnect":{"section_segments":12,"offset":{"x":0,"y":32,"z":22},"position":{"x":[0,0,0,0],"y":[-4,-4,11,11],"z":[1,1,0,0]},"width":[0,2,2,0],"height":[0,2,2,0],"texture":[3]},"decoRConnect2":{"section_segments":12,"offset":{"x":0,"y":32,"z":21},"position":{"x":[0,0,0,0],"y":[-4,-4,11,11],"z":[1,1,0,0]},"width":[0,4,4,0],"height":[0,2,2,0],"texture":[4]},"decoVT1":{"section_segments":6,"offset":{"x":7,"y":11,"z":-40.5},"position":{"x":[0,0,0,0],"y":[-4,-4,11,11],"z":[1,1,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[3.9],"vertical":true},"decoVT1Top":{"section_segments":6,"offset":{"x":7,"y":11.1,"z":-40.5},"position":{"x":[0,0,0,0],"y":[-4,-4,11,11],"z":[1,1,0,0]},"width":[0,2.4,2.4,0],"height":[0,2.4,2.4,0],"texture":[16.9],"vertical":true},"decoVT2":{"section_segments":6,"offset":{"x":8,"y":11,"z":-30},"position":{"x":[0,0,0,0],"y":[-4,-4,11,11],"z":[1,1,0,0]},"width":[0,3,3,0],"height":[0,3,3,0],"texture":[3.9],"vertical":true},"decoVT2Top":{"section_segments":6,"offset":{"x":8,"y":11.1,"z":-30},"position":{"x":[0,0,0,0],"y":[-4,-4,11,11],"z":[1,1,0,0]},"width":[0,2.4,2.4,0],"height":[0,2.4,2.4,0],"texture":[16.9],"vertical":true},"decoVTConnect":{"section_segments":12,"offset":{"x":6.4,"y":32,"z":20.5},"position":{"x":[1.5,1.5,0.2,0.2],"y":[-1,-1,10,10],"z":[0.5,0.5,0.3,0.3]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[3]},"decoVTConnect2":{"section_segments":12,"offset":{"x":6.25,"y":32,"z":20.3},"position":{"x":[1.5,1.5,0.2,0.2],"y":[-1,-1,10,10],"z":[0.5,0.5,0.3,0.3]},"width":[0,1.4,1.4,0],"height":[0,0.7,0.7,0],"texture":[63]},"sidePipeOuter":{"section_segments":12,"offset":{"x":45,"y":81,"z":15.5},"position":{"x":[0,0,0,0],"y":[-1,-1,13,13],"z":[2.5,2.5,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[63],"angle":0},"sidePipeInner":{"section_segments":12,"offset":{"x":41,"y":81,"z":15.5},"position":{"x":[0,0,0,0],"y":[-1,-1,13,13],"z":[2.5,2.5,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[63],"angle":0},"foreblock":{"section_segments":[45,135,225,315],"offset":{"x":43,"y":79,"z":17},"position":{"x":[0,0,0,0],"y":[-3,-1,3,3],"z":[1.7,1,0,0]},"width":[0,6,6,0],"height":[0,3,3,0],"texture":[4],"angle":0},"sidePipeBack":{"section_segments":12,"offset":{"x":43,"y":105.2,"z":13.66},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[2.5,2.5,0,-0.2,-0.5,-0.9,-1.4,-2,-2.7,-3.5,-4.4,-5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[2],"angle":0},"endblock":{"section_segments":[45,135,225,315],"offset":{"x":43,"y":112,"z":10.2},"position":{"x":[0,0,0,0],"y":[-1,-1,3,3],"z":[1.2,1.2,0,0]},"width":[0,7,7,0],"height":[0,3,3,0],"texture":[4],"angle":0},"endPipeInner":{"section_segments":12,"offset":{"x":40,"y":101,"z":11.6},"position":{"x":[0,0,0,0],"y":[-1,-1,13,13],"z":[3,3,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[63],"angle":0},"endPipeOuter":{"section_segments":12,"offset":{"x":46,"y":101,"z":11.6},"position":{"x":[0,0,0,0],"y":[-1,-1,13,13],"z":[3,3,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[63],"angle":0},"emblemBase":{"section_segments":24,"offset":{"x":0,"y":23.5,"z":-8},"position":{"x":[0,0,0,0],"y":[-12,-12,1,1],"z":[0,0,0,0]},"width":[0,8,8,0],"height":[0,8,8,0],"texture":[2],"vertical":true},"emblemRing":{"section_segments":18,"offset":{"x":0,"y":20.63,"z":-8},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-4,-4,-4,4,4,4,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[3.465,3.465,4.62,4.62,4.62,4.62,4.62,3.465,3.465,3.465],"height":[3.465,3.465,4.62,4.62,4.62,4.62,4.62,3.465,3.465,3.465],"texture":[63],"angle":0,"vertical":true},"emblemCenter":{"section_segments":12,"offset":{"x":0,"y":23.7,"z":-8},"position":{"x":[0,0,0,0],"y":[-12,-12,1,1],"z":[0,0,0,0]},"width":[0,2.4,2.4,0],"height":[0,2.4,2.4,0],"texture":[63],"vertical":true},"S1Fore":{"section_segments":[45,135,225,315],"offset":{"x":3.5,"y":4.5,"z":22.5},"position":{"x":[0,0,0,0],"y":[-3,-3,1,1],"z":[0,0,0,0]},"width":[0,0,2.4,0],"height":[0,3,3,0],"texture":[63],"angle":-45},"S1End":{"section_segments":[45,135,225,315],"offset":{"x":3.5,"y":11.5,"z":22.5},"position":{"x":[0,0,0,0],"y":[-3,-3,1,1],"z":[0,0,0,0]},"width":[0,0,2.4,0],"height":[0,3,3,0],"texture":[63],"angle":-135},"D1":{"section_segments":[45,135,225,315],"offset":{"x":2.5,"y":3.5,"z":22.5},"position":{"x":[0,0,0,0],"y":[-2,-2,1,1],"z":[0,0,0,0]},"width":[0,0,1.4,0],"height":[0,3,3,0],"texture":[63],"angle":-35},"D2":{"section_segments":[45,135,225,315],"offset":{"x":4.5,"y":5.5,"z":22.5},"position":{"x":[0,0,0,0],"y":[-2,-2,1,1],"z":[0,0,0,0]},"width":[0,0,1.4,0],"height":[0,3,3,0],"texture":[63],"angle":-55},"D3":{"section_segments":[45,135,225,315],"offset":{"x":2.5,"y":12.5,"z":22.5},"position":{"x":[0,0,0,0],"y":[-2,-2,1,1],"z":[0,0,0,0]},"width":[0,0,1.4,0],"height":[0,3,3,0],"texture":[63],"angle":-145},"D4":{"section_segments":[45,135,225,315],"offset":{"x":4.5,"y":10.5,"z":22.5},"position":{"x":[0,0,0,0],"y":[-2,-2,1,1],"z":[0,0,0,0]},"width":[0,0,1.4,0],"height":[0,3,3,0],"texture":[63],"angle":-125},"cableMain":{"section_segments":12,"offset":{"x":0,"y":0,"z":22.8},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[0.5,0.5,0,-0.2,-0.5,-0.9,-1.4,-2,-2.7,-3.5,-4.4,-5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":180},"cableSides":{"section_segments":12,"offset":{"x":4,"y":3,"z":22.2},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[0.5,0.5,0,-0.2,-0.5,-0.9,-1.4,-2,-2.7,-3.5,-4.4,-5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":180},"cableOffset":{"section_segments":12,"offset":{"x":-1,"y":11,"z":22},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[0.5,0.5,0,-0.2,-0.5,-0.9,-1.4,-2,-2.7,-3.5,-4.4,-5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":90},"cableOffset2":{"section_segments":12,"offset":{"x":-1,"y":9,"z":21.8},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[0.5,0.5,0,-0.2,-0.5,-0.9,-1.4,-2,-2.7,-3.5,-4.4,-5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":90},"cableOffset3":{"section_segments":12,"offset":{"x":-1,"y":7,"z":21.6},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[0.5,0.5,0,-0.2,-0.5,-0.9,-1.4,-2,-2.7,-3.5,-4.4,-5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":90},"cableOffset4":{"section_segments":12,"offset":{"x":-1,"y":5,"z":21.4},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[0.5,0.5,0,-0.2,-0.5,-0.9,-1.4,-2,-2.7,-3.5,-4.4,-5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":90},"cableConnect1":{"section_segments":12,"offset":{"x":15.5,"y":35,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[0.5,0.5,0,-0.2,-0.5,-0.9,-1.4,-2,-2.7,-3.5,-4.4,-5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":90},"cableConnect2":{"section_segments":12,"offset":{"x":14.5,"y":43.5,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[0.5,0.5,0,-0.2,-0.5,-0.9,-1.4,-2,-2.7,-3.5,-4.4,-5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":90},"cableConnect3":{"section_segments":12,"offset":{"x":15.5,"y":35,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[-0.5,-0.5,0,0.2,0.5,0.9,1.4,2,2.7,3.5,4.4,5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":90},"cableConnect4":{"section_segments":12,"offset":{"x":14.5,"y":43.5,"z":-7},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-1,-1,9,9.5,10,10.5,10.95,11.4,11.85,12.3,12.75,13.2],"z":[-0.5,-0.5,0,0.2,0.5,0.9,1.4,2,2.7,3.5,4.4,5.4]},"width":[0,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,1.2,0],"height":[0,1.2,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,0],"texture":[3],"angle":90},"sideDecoVT1":{"section_segments":6,"offset":{"x":43,"y":6.4,"z":-98},"position":{"x":[0,0,0,0],"y":[4,4,11,11],"z":[1,1,0,0]},"width":[0,8,8,0],"height":[0,8,8,0],"texture":[3.9],"vertical":true,"angle":0},"sideDecoVT1Top":{"section_segments":6,"offset":{"x":43,"y":6.5,"z":-98},"position":{"x":[0,0,0,0],"y":[4,4,11,11],"z":[1,1,0,0]},"width":[0,7,7,0],"height":[0,7,7,0],"texture":[16.9],"vertical":true,"angle":0},"noseDecoTop":{"section_segments":9,"offset":{"x":0,"y":-80,"z":8},"position":{"x":[0,0,0,0],"y":[-5,5,18,30],"z":[3,0,0,0]},"width":[0,6,12,0],"height":[0,5,5,0],"texture":[63],"vertical":false,"angle":0},"noseDecoSides":{"section_segments":8,"offset":{"x":10,"y":-80,"z":1.5},"position":{"x":[0,-1,1,6.7],"y":[-5,5,13,17],"z":[0,0,0,1]},"width":[0,5,5,0],"height":[0,7,7,0],"texture":[3],"vertical":false,"angle":0},"ring1":{"section_segments":18,"offset":{"x":0,"y":94,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-6,-4,-4,8,8,11,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[13,13,13,18,18,16,16,12,12,12],"height":[13,13,13,18,18,16,16,12,12,12],"texture":[3,3,63,3,3,3,3,3],"angle":0},"ring2":{"section_segments":9,"offset":{"x":0,"y":75,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-2,-70,-20,-4,-4,2,2,4,-2,-2],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[13,13,25,19,19,18,18,13,13,13],"height":[13,13,23,19,19,18,18,13,13,13],"texture":[3,3,63,3,3,3,63,3],"angle":0},"engineRod0":{"section_segments":14,"offset":{"x":0,"y":72,"z":15},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod1":{"section_segments":14,"offset":{"x":0,"y":72,"z":-15},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod2":{"section_segments":14,"offset":{"x":15,"y":72,"z":0},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod3":{"section_segments":14,"offset":{"x":7.5,"y":72,"z":13},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod4":{"section_segments":14,"offset":{"x":13,"y":72,"z":7.5},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod5":{"section_segments":14,"offset":{"x":7.5,"y":72,"z":-13},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod6":{"section_segments":14,"offset":{"x":13,"y":72,"z":-7.5},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod7":{"section_segments":14,"offset":{"x":3.75,"y":72,"z":14},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod8":{"section_segments":14,"offset":{"x":14,"y":72,"z":3.75},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod9":{"section_segments":14,"offset":{"x":10.5,"y":72,"z":10},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod10":{"section_segments":14,"offset":{"x":3.75,"y":72,"z":-14},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod11":{"section_segments":14,"offset":{"x":14,"y":72,"z":-3.75},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod12":{"section_segments":14,"offset":{"x":10.5,"y":72,"z":-10},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false},"engineRod13":{"section_segments":14,"offset":{"x":10,"y":22,"z":0},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false,"angle":90},"engineRod14":{"section_segments":14,"offset":{"x":10,"y":26,"z":0},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false,"angle":90},"engineRod15":{"section_segments":14,"offset":{"x":10,"y":30,"z":0},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false,"angle":90},"engineRod16":{"section_segments":14,"offset":{"x":10,"y":57,"z":0},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false,"angle":90},"engineRod17":{"section_segments":14,"offset":{"x":10,"y":53,"z":0},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false,"angle":90},"engineRod18":{"section_segments":14,"offset":{"x":10,"y":49,"z":0},"position":{"x":[0,0,0,0],"y":[-10,-10,25,25],"z":[0,0,0,0]},"width":[0,1,1,0],"height":[0,1,1,0],"texture":[3],"propeller":false,"angle":90},"missileBase0":{"section_segments":12,"offset":{"x":64,"y":92,"z":-13.5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-28.560000000000002,-25.840000000000003,-19.040000000000003,-13.600000000000001,-10.88,10.88,13.600000000000001,25.840000000000003,25.16,23.12],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,1.6,4,4.800000000000001,3.6,3.6,4.4,4,3.2,0],"height":[0,1.6,4,4.800000000000001,3.6,3.6,4.4,4,3.2,0],"texture":[2,2,63,2,10,2,63,16,17],"propeller":false},"missileConnect0":{"section_segments":[45,135,225,315],"offset":{"x":64,"y":92,"z":-13.5},"position":{"x":[0,0,0,0],"y":[-11.200000000000001,-11.200000000000001,8,8],"z":[4,4,4,4]},"width":[0,1.6,1.6,0],"height":[0,8,8,0],"texture":[63]},"ionCannonRodOne0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[4.55,4.55,4.55,4.55]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodTwo0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[-4.55,-4.55,-4.55,-4.55]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodThree0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[4.55,4.55,4.55,4.55],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[0,0,0,0]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodFour0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-4.55,-4.55,-4.55,-4.55],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[0,0,0,0]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodFive0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-2.275,-2.275,-2.275,-2.275],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodSix0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[2.275,2.275,2.275,2.275],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodSeven0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[2.275,2.275,2.275,2.275],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[-3.8499999999999996,-3.8499999999999996,-3.8499999999999996,-3.8499999999999996]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodEight0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-2.275,-2.275,-2.275,-2.275],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[-3.8499999999999996,-3.8499999999999996,-3.8499999999999996,-3.8499999999999996]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodNine0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[2.275,2.275,2.275,2.275]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodTen0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-3.8499999999999996,-3.8499999999999996,-3.8499999999999996,-3.8499999999999996],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[2.275,2.275,2.275,2.275]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodEleven0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[-2.275,-2.275,-2.275,-2.275]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRodTwelve0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-3.8499999999999996,-3.8499999999999996,-3.8499999999999996,-3.8499999999999996],"y":[-16.799999999999997,-16.799999999999997,0.35,0.35],"z":[-2.275,-2.275,-2.275,-2.275]},"width":[0,0.7,0.7,0],"height":[0,0.7,0.7,0],"texture":[4],"angle":3},"ionCannonRingOne0":{"section_segments":12,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[0,0,-2.0999999999999996,-1.4,-1.4,2.8,2.8,3.5,0,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[3.8499999999999996,3.8499999999999996,3.8499999999999996,5.25,5.25,5.25,5.25,3.8499999999999996,3.8499999999999996,3.8499999999999996],"height":[3.8499999999999996,3.8499999999999996,3.8499999999999996,5.25,5.25,5.25,5.25,3.8499999999999996,3.8499999999999996,3.8499999999999996],"texture":[4,4,63,4,4,4,4,4],"angle":3},"ionCannonRingTwo0":{"section_segments":12,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-17.5,-17.5,-19.599999999999998,-18.9,-18.9,-16.099999999999998,-16.099999999999998,-15.399999999999999,-17.5,-17.5],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[3.8499999999999996,3.8499999999999996,3.8499999999999996,5.25,5.25,5.25,5.25,3.8499999999999996,3.8499999999999996,3.8499999999999996],"height":[3.8499999999999996,3.8499999999999996,3.8499999999999996,5.25,5.25,5.25,5.25,3.8499999999999996,3.8499999999999996,3.8499999999999996],"texture":[4,4,63,4,4,4,63,4],"angle":3},"ionCannonRingThree0":{"section_segments":12,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-19.25,-19.25,-20.65,-20.65,-20.65,-17.849999999999998,-17.849999999999998,-17.15,-19.25,-19.25],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[2.4499999999999997,2.4499999999999997,2.4499999999999997,3.8499999999999996,3.8499999999999996,4.55,3.8499999999999996,2.4499999999999997,2.4499999999999997,2.4499999999999997],"height":[2.4499999999999997,2.4499999999999997,2.4499999999999997,3.8499999999999996,3.8499999999999996,4.55,3.8499999999999996,2.4499999999999997,2.4499999999999997,2.4499999999999997],"texture":[4,4,17,4,4,4,63,4],"angle":3},"ionCannonRodSec2One0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0],"y":[-35,-31.815,-31.815,-17.15,-17.15],"z":[1.6624999999999999,3.3249999999999997,3.3249999999999997,3.3249999999999997,3.3249999999999997]},"width":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"height":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"texture":[3],"angle":3},"ionCannonRodSec2Two0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0],"y":[-35,-31.815,-31.815,-17.15,-17.15],"z":[-1.6624999999999999,-3.3249999999999997,-3.3249999999999997,-3.3249999999999997,-3.3249999999999997]},"width":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"height":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"texture":[3],"angle":3},"ionCannonRodSec2Three0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[1.6624999999999999,3.3249999999999997,3.3249999999999997,3.3249999999999997,3.3249999999999997],"y":[-35,-31.815,-31.815,-17.15,-17.15],"z":[0,0,0,0,0]},"width":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"height":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"texture":[3],"angle":3},"ionCannonRodSec2Four0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-1.6624999999999999,-3.3249999999999997,-3.3249999999999997,-3.3249999999999997,-3.3249999999999997],"y":[-35,-31.815,-31.815,-17.15,-17.15],"z":[0,0,0,0,0]},"width":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"height":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"texture":[3],"angle":3},"ionCannonRodSec2Five0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0.9624999999999999,2.275,2.275,2.275,2.275],"y":[-35,-31.815,-31.815,-17.15,-17.15],"z":[0.9624999999999999,2.275,2.275,2.275,2.275]},"width":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"height":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"texture":[3],"angle":3},"ionCannonRodSec2Six0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-0.9624999999999999,-2.275,-2.275,-2.275,-2.275],"y":[-35,-31.815,-31.815,-17.15,-17.15],"z":[0.9624999999999999,2.275,2.275,2.275,2.275]},"width":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"height":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"texture":[3],"angle":3},"ionCannonRodSec2Seven0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-0.9624999999999999,-2.275,-2.275,-2.275,-2.275],"y":[-35,-31.815,-31.815,-17.15,-17.15],"z":[-0.9624999999999999,-2.275,-2.275,-2.275,-2.275]},"width":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"height":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"texture":[3],"angle":3},"ionCannonRodSec2Eight0":{"section_segments":6,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0.9624999999999999,2.275,2.275,2.275,2.275],"y":[-35,-31.815,-31.815,-17.15,-17.15],"z":[-0.9624999999999999,-2.275,-2.275,-2.275,-2.275]},"width":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"height":[0,0.48999999999999994,0.48999999999999994,0.48999999999999994,0],"texture":[3],"angle":3},"ionCannonRingFour0":{"section_segments":12,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-22.75,-22.75,-23.45,-23.45,-23.45,-22.049999999999997,-22.049999999999997,-22.049999999999997,-22.75,-22.75],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[3.15,3.15,3.15,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.15,3.15,3.15],"height":[3.15,3.15,3.15,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.15,3.15,3.15],"texture":[4,4,17,4,4,4,17,4],"angle":3},"ionCannonRingFive0":{"section_segments":12,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-25.549999999999997,-25.549999999999997,-26.25,-26.25,-26.25,-24.849999999999998,-24.849999999999998,-24.849999999999998,-25.549999999999997,-25.549999999999997],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[3.15,3.15,3.15,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.15,3.15,3.15],"height":[3.15,3.15,3.15,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.15,3.15,3.15],"texture":[4,4,17,4,4,4,17,4],"angle":3},"ionCannonRingSix0":{"section_segments":12,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-28.349999999999998,-28.349999999999998,-29.049999999999997,-29.049999999999997,-29.049999999999997,-27.65,-27.65,-27.65,-28.349999999999998,-28.349999999999998],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[3.15,3.15,3.15,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.15,3.15,3.15],"height":[3.15,3.15,3.15,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.15,3.15,3.15],"texture":[4,4,17,4,4,4,17,4],"angle":3},"ionCannonRingSeven0":{"section_segments":12,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-31.15,-31.15,-31.849999999999998,-31.849999999999998,-31.849999999999998,-30.45,-30.45,-30.45,-31.15,-31.15],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[3.15,3.15,3.15,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.15,3.15,3.15],"height":[3.15,3.15,3.15,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.8499999999999996,3.15,3.15,3.15],"texture":[4,4,17,4,4,4,17,4],"angle":3},"ionCannonRingEight0":{"section_segments":12,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-34.3,-34.3,-35,-35,-35,-33.599999999999994,-33.599999999999994,-33.599999999999994,-34.3,-34.3],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[1.0499999999999998,1.0499999999999998,1.0499999999999998,1.575,2.4499999999999997,2.4499999999999997,2.4499999999999997,1.0499999999999998,1.0499999999999998,1.0499999999999998],"height":[1.0499999999999998,1.0499999999999998,1.0499999999999998,1.575,2.4499999999999997,2.4499999999999997,2.4499999999999997,1.0499999999999998,1.0499999999999998,1.0499999999999998],"texture":[3,3,17,3,8,3,3,17],"angle":3},"ionCannonRodFrontTop0":{"section_segments":4,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0],"y":[-52.5,-43.75,-43.75,0,0],"z":[1.0499999999999998,1.4,1.4,1.4,1.4]},"width":[0,1.4,1.4,1.75,0],"height":[0,1.0499999999999998,1.0499999999999998,1.0499999999999998,0],"texture":[3.5],"angle":3},"ionCannonRodFrontBottom0":{"section_segments":4,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0],"y":[-52.5,-43.75,-43.75,0,0],"z":[-1.0499999999999998,-1.4,-1.4,-1.4,-1.4]},"width":[0,1.4,1.4,1.75,0],"height":[0,1.0499999999999998,1.0499999999999998,1.0499999999999998,0],"texture":[3.5],"angle":3},"ionCannonRodLeftSideBottom0":{"section_segments":4,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[3.5,3.5,3.5,3.5,3.5],"y":[-49,-33.25,-33.25,-17.5,-17.5],"z":[-0.77,-1.0499999999999998,-1.0499999999999998,-1.0499999999999998,-1.0499999999999998]},"width":[0,1.0499999999999998,1.0499999999999998,1.4,0],"height":[0,0.7,0.7,0.7,0],"texture":[3.5],"angle":3},"ionCannonRodLeftSideTop0":{"section_segments":4,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[3.5,3.5,3.5,3.5,3.5],"y":[-49,-33.25,-33.25,-17.5,-17.5],"z":[0.77,1.0499999999999998,1.0499999999999998,1.0499999999999998,1.0499999999999998]},"width":[0,1.0499999999999998,1.0499999999999998,1.4,0],"height":[0,0.7,0.7,0.7,0],"texture":[3.5],"angle":3},"ionCannonRodRightSideTop0":{"section_segments":4,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-3.5,-3.5,-3.5,-3.5,-3.5],"y":[-49,-33.25,-33.25,-17.5,-17.5],"z":[0.77,1.0499999999999998,1.0499999999999998,1.0499999999999998,1.0499999999999998]},"width":[0,1.0499999999999998,1.0499999999999998,1.4,0],"height":[0,0.7,0.7,0.7,0],"texture":[3.5],"angle":3},"ionCannonRodRightSideBottom0":{"section_segments":4,"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[-3.5,-3.5,-3.5,-3.5,-3.5],"y":[-49,-33.25,-33.25,-17.5,-17.5],"z":[-0.77,-1.0499999999999998,-1.0499999999999998,-1.0499999999999998,-1.0499999999999998]},"width":[0,1.0499999999999998,1.0499999999999998,1.4,0],"height":[0,0.7,0.7,0.7,0],"texture":[3.5],"angle":3},"ionCannonProngRingOne0":{"section_segments":[45,135,225,315],"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-36.75,-36.75,-37.449999999999996,-37.449999999999996,-37.449999999999996,-36.05,-36.05,-36.05,-36.75,-36.75],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[1.0499999999999998,1.0499999999999998,1.0499999999999998,1.75,1.75,1.75,1.75,1.0499999999999998,1.0499999999999998,1.0499999999999998],"height":[1.0499999999999998,1.0499999999999998,1.0499999999999998,2.0999999999999996,2.0999999999999996,2.0999999999999996,2.0999999999999996,1.0499999999999998,1.0499999999999998,1.0499999999999998],"texture":[4,4,17,4,4,4,17,4],"angle":3},"ionCannonProngRingTwo0":{"section_segments":[45,135,225,315],"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-39.199999999999996,-39.199999999999996,-39.9,-39.9,-39.9,-38.5,-38.5,-38.5,-39.199999999999996,-39.199999999999996],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[1.0499999999999998,1.0499999999999998,1.0499999999999998,1.75,1.75,1.75,1.75,1.0499999999999998,1.0499999999999998,1.0499999999999998],"height":[1.0499999999999998,1.0499999999999998,1.0499999999999998,2.0999999999999996,2.0999999999999996,2.0999999999999996,2.0999999999999996,1.0499999999999998,1.0499999999999998,1.0499999999999998],"texture":[4,4,17,4,4,4,17,4],"angle":3},"ionCannonProngRingThree0":{"section_segments":[45,135,225,315],"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-41.65,-41.65,-42.349999999999994,-42.349999999999994,-42.349999999999994,-40.949999999999996,-40.949999999999996,-40.949999999999996,-41.65,-41.65],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[1.0499999999999998,1.0499999999999998,1.0499999999999998,1.75,1.75,1.75,1.75,1.0499999999999998,1.0499999999999998,1.0499999999999998],"height":[1.0499999999999998,1.0499999999999998,1.0499999999999998,2.0999999999999996,2.0999999999999996,2.0999999999999996,2.0999999999999996,1.0499999999999998,1.0499999999999998,1.0499999999999998],"texture":[4,4,17,4,4,4,17,4],"angle":3},"ionCannonProngRingFour0":{"section_segments":[45,135,225,315],"offset":{"x":30.25,"y":0,"z":-4},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-44.099999999999994,-44.099999999999994,-44.8,-44.8,-44.8,-43.4,-43.4,-43.4,-44.099999999999994,-44.099999999999994],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0.875,0.875,0.875,1.575,1.575,1.575,1.575,0.875,0.875,0.875],"height":[1.0499999999999998,1.0499999999999998,1.0499999999999998,2.0999999999999996,2.0999999999999996,2.0999999999999996,2.0999999999999996,1.0499999999999998,1.0499999999999998,1.0499999999999998],"texture":[4,4,17,4,4,4,17,4],"angle":3}},"wings":{"main":{"doubleside":true,"offset":{"x":49,"y":98.1,"z":5},"length":[44,12],"width":[80,45,25],"angle":[-30,30],"position":[-50,5,-10],"texture":[1,63],"bump":{"position":-10,"size":8}},"winglet":{"doubleside":true,"offset":{"x":10,"y":96,"z":10},"length":[23],"width":[40,25],"angle":[60],"position":[-15,-5],"texture":[1],"bump":{"position":5,"size":4}},"front":{"doubleside":true,"offset":{"x":29,"y":-16,"z":-5},"length":[14],"width":[17,9],"angle":[30],"position":[9,5],"texture":[3],"bump":{"position":5,"size":3}},"missileWingOne0":{"doubleside":true,"offset":{"x":64,"y":92,"z":-13.5},"length":[8.8],"width":[9.600000000000001,5.6000000000000005],"angle":[-90],"position":[18.400000000000002,25.6],"texture":[2],"bump":{"position":5,"size":10}},"missileWingTwo0":{"doubleside":true,"offset":{"x":64,"y":92,"z":-13.5},"length":[8.8],"width":[9.600000000000001,5.6000000000000005],"angle":[90],"position":[18.400000000000002,25.6],"texture":[2],"bump":{"position":5,"size":10}},"missileWingThree0":{"doubleside":true,"offset":{"x":64,"y":92,"z":-13.5},"length":[8.8],"width":[9.600000000000001,5.6000000000000005],"angle":[0],"position":[18.400000000000002,25.6],"texture":[2],"bump":{"position":5,"size":10}},"missileWingFour0":{"doubleside":true,"offset":{"x":64,"y":92,"z":-13.5},"length":[8.8],"width":[9.600000000000001,5.6000000000000005],"angle":[180],"position":[18.400000000000002,25.6],"texture":[2],"bump":{"position":5,"size":-10}}},"typespec":{"name":"Zarion","level":1,"model":7,"code":107,"specs":{\
"shield":{"cpacity":[66,66],"reload":[400,400]},"generator":{"capacity":[300,300],"reload":[19,29]},"ship":{"mass":230,"speed":[300,300],"rotation":[100,100],"acceleration":[95,95],"dash":{"rate":2,"burst_speed":[150,150],"speed":[440,440],"acceleration":[70,70],"initial_energy":[40,40],"energy":[85,85]}}},"shape":[2.642,2.381,1.921,1.459,1.504,1.478,1.289,1.156,1.059,1.067,1.116,1.078,0.988,1.249,1.395,1.533,1.814,2.266,3.394,3.692,3.882,3.574,3.364,3.204,2.684,2.672,2.684,3.204,3.364,3.574,3.882,3.692,3.394,2.266,1.814,1.533,1.395,1.249,1.092,1.078,1.116,1.067,1.059,1.156,1.289,1.478,1.504,1.459,1.921,2.381],"lasers":[],"radius":3.882}}';

var ships = {
  Booster_101,
  Astral_Accelerator_102,
  V2_103,
  RAD_Diamond_Lancer_104,
  Vengar_105,
  Space_Phantom_106,
  Zarion_107,
};

var starting_ship = { Vengar_105 };

var ship_params = {
  [vehicles.sprint]: {
    Booster_101:            { dash_speed: 600, dash_acceleration: 100 },
    Astral_Accelerator_102: { dash_speed: 550, dash_acceleration: 100 },
    V2_103:                 { dash_speed: 550, dash_acceleration: 100 },
    RAD_Diamond_Lancer_104: { dash_speed: 550, dash_acceleration: 100 },
    Vengar_105:             { dash_speed: 550, dash_acceleration: 100 },
    Space_Phantom_106:      { dash_speed: 500, dash_acceleration: 150 },
    Zarion_107:             { dash_speed: 550, dash_acceleration: 100 },
  }
};

var ship_levels = {
  [vehicles.sprint]:    1,
  [vehicles.endurance]: 2,
};


// Spectators

var Camera1_191 = '{"name":"Camera1","level":1.9,"model":1,"size":0.1,"zoom":0.11,"next":[],"specs":{\
"shield":{"capacity":[100,100],"reload":[100,100]},"generator":{"capacity":[100,100],"reload":[1e100,1e100]},"ship":{"mass":0,"speed":[700,700],"rotation":[200,200],"acceleration":[50,50],"dash":{"rate":2,"burst_speed":[1300,1300],"speed":[1300,1300],"acceleration":[500,500],"initial_energy":[1,1],"energy":[1,1]}}},"typespec":{"name":"Camera1","level":3,"model":1,"code":301,"specs":{\
"shield":{"capacity":[100,100],"reload":[100,100]},"generator":{"capacity":[100,100],"reload":[1e100,1e100]},"ship":{"mass":0,"speed":[700,700],"rotation":[200,200],"acceleration":[50,50],"dash":{"rate":2,"burst_speed":[1300,1300],"speed":[1300,1300],"acceleration":[500,500],"initial_energy":[1,1],"energy":[1,1]}}},"shape":[0],"lasers":[],"radius":0.01,"next":[]}}';

var Camera2_192 = '{"name":"Camera2","level":1.9,"model":2,"size":0.1,"zoom":0.105,"next":[],"specs":{\
"shield":{"capacity":[100,100],"reload":[100,100]},"generator":{"capacity":[100,100],"reload":[1e100,1e100]},"ship":{"mass":0,"speed":[700,700],"rotation":[200,200],"acceleration":[200,200],"dash":{"rate":2,"burst_speed":[1300,1300],"speed":[1300,1300],"acceleration":[500,500],"initial_energy":[1,1],"energy":[1,1]}}},"typespec":{"name":"Camera2","level":3,"model":2,"code":301,"specs":{\
"shield":{"capacity":[100,100],"reload":[100,100]},"generator":{"capacity":[100,100],"reload":[1e100,1e100]},"ship":{"mass":0,"speed":[700,700],"rotation":[200,200],"acceleration":[200,200],"dash":{"rate":2,"burst_speed":[1300,1300],"speed":[1300,1300],"acceleration":[500,500],"initial_energy":[1,1],"energy":[1,1]}}},"shape":[0],"lasers":[],"radius":0.01,"next":[]}}';

var spectators = {
  Camera1_191,
  Camera2_192,
};

var spectators_level = 1.9;


// Dummy ships

var Dummy_101 = '{"name":"Dummy",\
"level":1,"model":1,"size":1,"next":[],"specs":{"shield":{"capacity":[1,1],"reload":[1,1]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"typespec":{"name":"Dummy",\
"level":1,"model":1,"code":101,"specs":{"shield":{"capacity":[1,1],"reload":[1,1]},"generator":{"capacity":[1,1],"reload":[1,1]},"ship":{"mass":1,"speed":[1,1],"rotation":[1,1],"acceleration":[1,1]}},"shape":[0],"lasers":[],"radius":1,"next":[]}}';

var dummy_ship = { Dummy_101 };


// Tracks

var map_size = 100;

var ChiGP = {
  sname: "CHI",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //20
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"99999999999999999999999999999999999999999999   R   9999999999999999999999999999999999999999999999999\n"+ //4
"999999999999999999999999999999999999999999     R      9999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999       R        99999999999999999999999999999999999999999999\n"+ //6
"999999999999999999999999999999999999999        R         9999999999999999999999999999999999999999999\n"+ //7
"99999999999999999999999999999999999999        999999      999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999  RRR  999999999     999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999      9999999999  D  999999999999999999999999999999999999999999\n"+    //30
"9999999999999999999999999999999999999     9999    999     999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999     999      99  L  999999999999999999999999999999999999999999\n"+ //2
"999999999999999999999999999999999999     999  D     9    9999999999999999999999999999999999999999999\n"+ //3
"999999999999999999999999999999999999  H  999    9       99999999999999999999999999999999999999999999\n"+ //4
"999999999999999999999999999999999999     99    999     999999999999999999999999999999999999999999999\n"+ //5
"99999999999999999999999999999999999     999    99999999999999999999999999999999999999999999999999999\n"+ //6
"99999999999999999999999999999999999     999     9999999999999999999999999999999999999999999999999999\n"+ //7
"99999999999999999999999999999999999     9999 DDDD 99999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999     999999          R                      9999999999999999999999\n"+ 
"9999999999999999999999999999999999     9999999         R                           99999999999999999\n"+    //40
"9999999999999999999999999999999999     99999999        R                       D      99999999999999\n"+ //1
"999999999999999999999999999999999     99999999999      R                               9999999999999\n"+ //2
"999999999999999999999999999999999     99999999999999999999999999999999999999999999     9999999999999\n"+ //3
"999999999999999999999999999999999     9999999999999999999999999999999999999999999999DDD9999999999999\n"+ //4
"99999999999999999999999999999999     99999999999999999999                  L           9999999999999\n"+ //5
"99999999999999999999999999999999     999999999999999999                    L          99999999999999\n"+ //6
"99999999999999999999999999999999     99999999999999999  D                  L       99999999999999999\n"+ //7
"9999999999999999999999999999999     99999999999999999     999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999  H  9999999999999999     9999999999999999999999999999999999999999999\n"+ //9
"999999999999999999999999999999      9999999999999999    99999999999999999999999999999999999999999999\n"+    //50
"99999999999999999999999999999UUUUUU99999999999999999    99999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999       99999999999999999     9999999999999999999999999999999999999999999\n"+ //2
"999999999999999999999999999   I    999999999999999999     999999999999999999999999999999999999999999\n"+ //3
"99999999999999999999999999        99999999999999999999     99999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999    B   9999999999999999999999      999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999  B    999999999999999999999999      99999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999    B 99999999999999999999999999      999999999999999999999          999999\n"+ //7
"9999999999999999999999999  B   999999999999999999999999999 LLL 9999999999999999999             99999\n"+ //8
"99999+999999999999999+999    B 99999999999999999999999999      999999999999999999  R         D  9999\n"+ //9
"999999               9999  B   999999999999999                 99999999999999999       99999     999\n"+    //60
"999999               9999    B 99999999999999                9999999999999999999     99999999    999\n"+ //1
"999999               9999  B   9999999999999               999999999999999999999    9999999999    99\n"+ //2
"999999               9999    B 9999999999999DDDD99999999999999999999999999999999UUUU9999999999    99\n"+ //3
"999999               9999  B   99999999999999    9999999999999999999999999999999    9999999999    99\n"+ //4
"9999999            999999    B 999999999999999    9999999999999999999999999999999   9999999999    99\n"+ //5
"999999999999      9999999  B   9999999999999999        R                             999999999    99\n"+ //6
"9999999999999   999999999    B 9999999999999999        R                              99999999    99\n"+ //7
"99999+99999999   9999+99   B   99999999999999999       R                              9999999     99\n"+ //8
"999999999     RRRRR          B 999999999999999999      R                             9999999      99\n"+ //9
"999999                 UU  B   999999999999999999999999999999999999999999999999999999999999       99\n"+    //70
"9999                          99999999999999999999999999999999999999999999999999999999999        999\n"+ //1
"99         9999999999999999999999999999999999999999999999999999999999999999999999999999 L       9999\n"+ //2
"99     99999999999999999999999999999999999999999999999999999999999999999999999999999    L      99999\n"+ //3
"99                                                                                      L     999999\n"+ //4
"99       U                     L             L                                          L   99999999\n"+ //5
"99       U                    L             L            T                   T          L 9999999999\n"+ //6
"9999     U                     L             L                                          999999999999\n"+ //7
"999999                                                                               999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //80
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //90
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  checkpoints: [
    {x:-200,y:-45,direction:Math.PI*0.5,width:100}, // Start / finish line
    {x:185,y:100,direction:0,width:100}, 
    {x:185,y:-170,direction:0,width:120},
    {x:0,y:-255,direction:Math.PI,width:120} 
  ],
  SpawnX: -360,
  SpawnY: -160,
  Spawn_direction: +45,
  starting_grid: {
    x1: -205,
    x2: -225,
    y1: -49,
    next_y: y => Math.max(-199, y - 10),
  },
  drs : [
  // DRSZONE 1
  { x: -160, y: 40 },
  { x: -153, y: 60 },
  { x: -146, y: 80 },
  { x: -139, y: 100 },
  { x: -132, y: 120 },
  { x: -125, y: 140 },
  // DRSZONE 2
  { x: 250, y: -255 },
  { x: 230, y: -255 },
  { x: 210, y: -255 },
  { x: 190, y: -255 },
  { x: 170, y: -255 },
  { x: 150, y: -255 },
  { x: 130, y: -255 },
  { x: 110, y: -255 },
  { x: 90, y: -255 }
  ]
} ;

var AzeGP = {
  sname: "AZE",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //20
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999                       L          99\n"+     //30
"999999999999999999   L   99999999999999999999999999999999999999                        L           9\n"+ //1
"99999999999999999    L    9999999999999999999999999999999999999      M              M  L           9\n"+ //2
"9999999999999999     L     999999999999999999999999999999999999                        L           9\n"+ //3
"999999999999999     99     999999999999999999999999999999999999                        L           9\n"+ //4
"99999999999999     9999    999999999999999999999999999999999999     99999999999999999999999999     9\n"+ //5
"9999999999999     99999    999999999999999999999999999999999999    9999999999999999999999999999    9\n"+ //6
"999999999999     9999999   999999999999999999999999999999999999    9999999999999999999999999999    9\n"+ //7
"99999999999DDDDD99999999UUU999999999999999999999999999999999999DDDD9999999999999999999999999999UUUU9\n"+ //8
"9999999999     999999999   999999999999999999999999999999999999    9999999999999999999999999999    9\n"+ //9
"999999999     9999999999   9999999999999999999999999999999999      9999999999999999999999999999    9\n"+    //40
"99999999      99999999999  999999999999999999999  L                9999999999999999999999999999    9\n"+ //1
"9999999      999999999999   9999999999999999999   L             9999999999999999999999999999999    9\n"+ //2
"999999DDDDDDD9999999999999UUU99999999999999999    L           999999999999999999999999999999999    9\n"+ //3
"999999      99999999999999    9999999999999       999999999999999999999999999999999999999999999    9\n"+ //4
"99999      999999999999999    999999999          9999999999999999999999999999999999999999999999    9\n"+ //5
"99999     9999999999999999    999999           999999999999999999999999999999999999999999999999UUUU9\n"+ //6
"99999     9999999999999999       L          99999999999999999999999999999999999999999999999999     9\n"+ //7
"99999    99999999999999999       L       999999999999                                              9\n"+ //8
"99999    999999999999999999      L   999999999999                B B B B B B B B B   R     R       9\n"+ //9
"99999D  D9999999999999999999999999999999999999                                        R     R      9\n"+    //50
"99999 DD 9999999999999999999999999999999999        T          T                    I  R     R      9\n"+ //1
"99999    9999999999999999999999999999999                          B B B B B B B B    R     R       9\n"+ //2
"99999    9999999999999999999999999999                           RRR                               99\n"+ //3
"99999     99999999999999999999999999         99999999+99999999   9999+999999999999999999999999999999\n"+ //4
"99999     9999999999999999999999999       9999999999999999999   999999999999999999999999999999999999\n"+ //5
"99999      99999999999999999999999       9999999999999999999      9999999999999999999999999999999999\n"+ //6
"999999      999999999999999999999       999999999999999            999999999999999999999999999999999\n"+ //7
"999999DDDDDDD9999999999999999999UUUUUUU999999999999999               9999999999999999999999999999999\n"+ //8
"9999999      999999999999999999       9999999999999999               9999999999999999999999999999999\n"+ //9
"99999999      9999999999999999       99999999999999999               9999999999999999999999999999999\n"+    //60
"999999999     999999999999999       999999999999999999               9999999999999999999999999999999\n"+ //1
"9999999999     9999999999999       9999999999999999999               9999999999999999999999999999999\n"+ //2
"99999999999     99999999999       9999999999999999999+999999999999999+999999999999999999999999999999\n"+ //3
"999999999999     999999999       9999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999     9999999       99999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"99999999999999       R         999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"999999999999999      R        9999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999     R       99999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"99999999999999999    R      999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //70
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //80
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //90
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",

  checkpoints: [
    {x:330,y:5,direction:0,width:100}, // Start / finish line
    {x:75,y:85,direction:Math.PI,width:100}, // the 1st third end of track (2nd sector beginning)
    {x:-300,y:-165,direction:0,width:120} // the 2nd third end of track (3rd sector beginning)
  ],
  SpawnX: 120,
  SpawnY: -50,
  Spawn_direction: -45,
  starting_grid: {
    y1: 15,
    y2: -15,
    x1: 309,
    next_x: x => Math.max(149, x - 10),
  },
  drs : [
  // DRSZONE 1
  { x: 30, y: 0 },
  { x: 50, y: 0 },
  { x: 70, y: 0 },
  { x: 90, y: 0 },
  { x: 110, y: 0 },
  // DRSZONE 2
  { x: 205, y: 185 },
  { x: 235, y: 185 },
  { x: 265, y: 185 },
  { x: 295, y: 185 },
  { x: 325, y: 185 }
  ]
};

var AutGP = {
  sname: "AUT",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+   //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+   //20
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"99999       9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"999              R     99999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"99               R               9999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9                R                         999999999999999999999999999999999999999999999999999999999\n"+ //7
"9     999        R     T                         R   99999999999999999999999999999999999999999999999\n"+ //8
"99     9999999999999                         T   R      99999999998999999999999999999999999999999999\n"+ //9
"999     9999999999999999999999                   R        999999999999999999999999999999999999999999\n"+   //30
"9999     9999999999999999999999999999999         R         99999999999999999999999999999999999999999\n"+ //1
"99999     9999999999999999999999999999999999999999          9999999999999999999999999999999999999999\n"+ //2
"999999     9999999999999999999999999999999999999999999      9999999999999999999999999999999999999999\n"+ //3
"999999      9999999999999999999999999999999999999999999     9999999999999999999999999999999999999999\n"+ //4
"999999      9999999999999999999999999999999999999999999DDDDD9999999999999999999999999999999999999999\n"+ //5
"999999       999999999999999999999999999999999999999999     9999999999999999999999999999999999999999\n"+ //6
"9999999      9999999999    L    9999999999999999999999      9999999999999999999999999999999999999999\n"+ //7
"9999999      99999999     L       9999999999999999999      99999999999999999999999999999999999999999\n"+ //8
"9999999      9999999       L       99999999999999999      999999999999999999999999999999999999999999\n"+ //9
"9999999      999999       99        99999999999999       9999999999999999999999999999999999999999999\n"+    //40
"9999999      99999      999999     U  9999999999        99999999999999999999999999999999999999999999\n"+ //1
"9999999       9999DDDDD99999999   U U    9999  L      9999999999999999999999999999999999999999999999\n"+ //2
"9999999       9999     999999999               L    999999999999999999999999999999999999999999999999\n"+ //3
"99999999      9999    999999999999             L  99999999999999999999999999999999999999999999999999\n"+ //4
"99999999UUUUUU9999    999999999999999          99999999999999999999999999999999999999999999999999999\n"+ //5
"99999999      9999    999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"99999999      9999    999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"99999999      9999    999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"99999999      9999    999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"99999999       999    999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+   //50
"999999999      999DDDD999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"999999999      999    999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"999999999      999     99999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"999999999      9999     9999999999999999999999999999999999    R     99999999999999999999999999999999\n"+ //4
"999999999      99999     999999999999999999999999999999       R        99999999999999999999999999999\n"+ //5
"999999999UUUUUU999999      99999999999999999999999999         R           99999999999999999999999999\n"+ //6
"999999999      99999999       99999999999999999999            R             999999999999999999999999\n"+ //7
"999999999       999999999         9999999999999          9999999999999       99999999999999999999999\n"+ //8
"9999999999      99999999999                R          9999999999999999999     9999999999999999999999\n"+ //9
"9999999999      9999999999999              R        9999999999999999999999     999999999999999999999\n"+    //60  
"9999999999      9999999999999999           R      9999999999999999999999999    999999999999999999999\n"+ //1
"9999999999      99999999999999999999       R    999999999999999999999999999    999999999999999999999\n"+ //2
"9999999999      99999999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+ //3
"9999999999      99999999999999999999999999999999999999999999999999999999999DDDD999999999999999999999\n"+ //4
"9999999999       9999999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+ //5
"99999999999      9999999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+ //6
"99999999999      9999999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+ //7
"99999999999      9999999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+ //8
"99999999999      9999999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+ //9
"99999999999      9999999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+    //70
"99999999999      9999999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+ //1
"999999999999UUUUU9999999999999999999999999999999999999999999999999999999999DDDD999999999999999999999\n"+ //2
"9999999999999     999999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+ //3
"99999999999999     99999999999999999999999999999999999999999999999999999999    999999999999999999999\n"+ //4
"999999999999999     999999999999999999999999999999999999999999999999999999    9999999999999999999999\n"+ //5
"9999999999999999     9999999999999999999999999999999999999999999999999999LLLL99999999999999999999999\n"+ //6
"99999999999999999                                 L   L   L                 999999999999999999999999\n"+ //7
"999999999999999999        L                      B B B B B B B B B         9999999999999999999999999\n"+ //8
"9999999999999999999      L   T            T    I                          99999999999999999999999999\n"+ //9
"99999999999999999999      L                       B B B B B B B B        999999999999999999999999999\n"+    //80
"999999999999999999999                             L   L   L          LLL9999999999999999999999999999\n"+ //1
"999999999999999999999999999999999999999999999999999999999999+99999   99999999+9999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999   999999999999999999999999999999\n"+ //3
"99999999999999999999999999999999999999999999999999999999999999999      99999999999999999999999999999\n"+ //4
"999999999999999999999999999999999999999999999999999999999999999            9999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999               999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999               999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999               999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999               999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999               999999999999999999999999\n"+    //90
"999999999999999999999999999999999999999999999999999999999999+9999999999999999+9999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",

  checkpoints: [
    {x:-25,y:-285,direction:Math.PI,width:120}, // Start / finish line
    {x:-405,y:150,direction:Math.PI*0.5,width:100}, // the 1st third end of track (2nd sector beginning)
    {x:-120,y:-95,direction:0,width:120} // the 2nd third end of track (3rd sector beginning)
  ],
  SpawnX: 190,
  SpawnY: -330,
  Spawn_direction: -45,
  starting_grid: {
    y1: -275,
    y2: -295,
    x1: -1,
    next_x: x => Math.min(159, x + 10),
  },
  drs : [
  // DRSZONE 1
  { x: -90, y: -285 },
  { x: -110, y: -285 },
  { x: -130, y: -285 },
  { x: -150, y: -285 },
  { x: -170, y: -285 },
  { x: -190, y: -285 },
  // DRSZONE 2
  { x: -245, y: 220 },
  { x: -215, y: 220 },
  { x: -185, y: 220 },
  { x: -155, y: 220 },
  { x: -125, y: 220 },
  { x: -95, y: 220 },
  { x: -65, y: 220 }
  ]
};


var GBGP = {
  sname: "GB",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"99999999999999999999999999999999999999999999999999999999999  R            99999999999999999999999999\n"+    //20
"999999999999999999999999999999999999999999999999999999999    R               99999999999999999999999\n"+ //1
"99999999999999999999999999999999999999999999999999999999     R                9999999999999999999999\n"+ //2
"999999+9999999999999999+9999999999999999999999999999999      R              DD 999999999999999999999\n"+ //3
"9999999               99999999999999999999999999999999     9999999999999999     99999999999999999999\n"+ //4
"9999999               9999999999999999999999999999999     999999999999999999    99999999999999999999\n"+ //5
"9999999               9999999999999999999999999999999    999999999 L    9999     9999999999999999999\n"+ //6
"9999999               9999999999999999999999999999999 UU 9999999   L     9999    9999999999999999999\n"+ //7
"9999999               9999999999999999999999999999999     9999     L      999     999999999999999999\n"+ //8
"999999999            999999999999999999999999999999999     L   D  9999    9999 DD  99999999999999999\n"+ //9
"9999999999999      999999999999999999999999999999999999    L     99999 UU 9999     99999999999999999\n"+    //30
"99999999999999   999999999999999999999999999999999999999   L    99999     99999     9999999999999999\n"+ //1
"999999+99999999   99999+99999999999999999999999999999999999L  999999     999999     9999999999999999\n"+ //2
"9999999999999RRRR                  999999999999999999999999999999999 RR  9999999     999999999999999\n"+ //3
"99999999999     B B B B B B B B      999999999999999999999999999999     99999999     999999999999999\n"+ //4
"999999999                        I     999999999999999999999999999     9999999999 DD  99999999999999\n"+ //5
"9999999  R     B B B B B B B B B        99999999999999999999999999     99999999999     9999999999999\n"+ //6
"999999   R                               9999999999999999999999999     999999999999     999999999999\n"+ //7
"99999      9999999999999999999999999DDDDDD999999999999999999999999     9999999999999     99999999999\n"+ //8
"9999     999999999999999999999999999      999999999999999999999999     99999999999999     9999999999\n"+ //9
"999     9999999999999999999999999999      999999999999999999999999     999999999999999     999999999\n"+    //40
"99     999999999999999999999999999999     999999999999999999999999     9999999999999999     99999999\n"+ //1
"9     9999999999999999999999999999999      99999999999999999999999     99999999999999999     9999999\n"+ //2
"9    99999999999999999999999999999999      99999999999999999999999     999999999999999999    9999999\n"+ //3
"9UUUU999999999999999999999999999999999     99999999999999999999999     999999999999999999DDDD9999999\n"+ //4
"9    999999999999999999999999999999999DDDDDD9999999999999999999999     999999999999999999    9999999\n"+ //5
"99    99999999999999999999999999999999      9999999999999999999999     99999999999999999     9999999\n"+ //6
"999       99999999999999999999999999999      999999999999999999999  H  9999999999999999      9999999\n"+ //7
"999       99999999999999999999999999999  R      999999999999999999     999999999999999      99999999\n"+ //8
"999999 L  99999999999999999999999999999             99999999999999     99999999999999      999999999\n"+ //9
"999999 L  9999999999999999999999999999999               9999999999     9999999999999      9999999999\n"+    //50
"999999    99999999999999999999999999999999999               999999     999999999999      99999999999\n"+ //1
"999999    999999999999999999999999999999999999999      R     99999     99999999999  DD  999999999999\n"+ //2
"999999    9999999999999999999999999999999999999999999        99999     9999999999      9999999999999\n"+ //3
"999999    99999999999999999999999999999999999999999999999    99999     999999999      99999999999999\n"+ //8
"999999    9999999999999999999999999999999999999999999999     99999     99999999      999999999999999\n"+ //9
"999999    999999999999999999999999999999999999999999999  L  999999     9999999      9999999999999999\n"+    //60
"999999    9999999999999999999999999999999999999999999      9999999  H  999999      99999999999999999\n"+ //1
"999999    999999999999999999999999999999999999999999     999999999     99999      999999999999999999\n"+ //2
"999999UUUU99999999999999999999999999999999999999999    99999999999     9999  DD  9999999999999999999\n"+ //3
"999999    9999999999999999999999999999999999999999    99999999999     9999      99999999999999999999\n"+ //4
"999999    9999999999999999999999999999999999999999                   9999      999999999999999999999\n"+ //5
"999999    9999999999999999999999999999999999999999   R   R   R      99999     9999999999999999999999\n"+ //6
"999999    99999999999999999999999999999999999999999                99999     99999999999999999999999\n"+ //7
"999999   999999999999999999999999999999999999999999999999999999999999999    999999999999999999999999\n"+ //8
"99999    99999999999999999999999999999999999999999999999999999999999999    9999999999999999999999999\n"+ //9
"99999    99999999999999999999999999999999999999999999999999999999999999    9999999999999999999999999\n"+    //70
"99999UUUU99999999999999999999999999999999999999999999999999999 D          99999999999999999999999999\n"+ //1
"99999                                          L  99999999999  D          99999999999999999999999999\n"+ //2
"999999                                         L   999999999   D         999999999999999999999999999\n"+ //3
"9999999                          T         T   L    9999999    9999999999999999999999999999999999999\n"+ //4
"99999999                                       L      99999   99999999999999999999999999999999999999\n"+ //5
"9999999999                                     L        99   999999999999999999999999999999999999999\n"+ //6
"999999999999999999999999999999999999999999999999999          999999999999999999999999999999999999999\n"+ //7
"99999999999999999999999999999999999999999999999999999       9999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999    99999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //80
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //90
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  checkpoints: [
    {x:-165,y:155,direction:0,width:150}, // Start / finish line
    {x:190,y:135,direction:Math.PI*0.5,width:100}, // the 1st third end of track (2nd sector beginning)
    {x:175,y:-175,direction:Math.PI,width:100} // the 2nd third end of track (3rd sector beginning)
  ],
  SpawnX: -350,
  SpawnY: 200,
  Spawn_direction: +45,
  starting_grid: {
    y1: 145,
    y2: 165,
    x1: -188,
    next_x: x => Math.max(-348, x - 10),
  },
  drs : [
  // DRSZONE 1
  { x: 185, y: -55 },
  { x: 185, y: -35 },
  { x: 185, y: -15 },
  { x: 185, y: 5 },
  { x: 185, y: 25 },
  // DRSZONE 2
  { x: -75, y: -195 },
  { x: -95, y: -195 },
  { x: -115, y: -195 },
  { x: -135, y: -195 },
  { x: -155, y: -195 }
  ]
};

var HunGP = {
  sname: "HUN",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //11
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //12
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //13
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //14
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //15
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //16
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //17
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //18
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //19
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //20
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //21
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //22
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //23
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //24
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //25
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //26
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //27
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //28
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //29
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //30
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //31
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //32
"9999999999999999999999999999999999999999999999999999999999999999999999  R  9999999999999999999999999\n"+ //33
"999999999999999999999      99999999999999999999999999999999999999999    R    99999999999999999999999\n"+ //34
"9999999999999999999         99999999999999999999999999999999999999      R      999999999999999999999\n"+ //35
"99999999999999999             99999999999999999999999999999999999     99999     99999999999999999999\n"+ //36
"9999999999999999               999999999999999999999999999999999    99999999    99999999999999999999\n"+ //37
"9999999999999999      9999      9999999999999999999999999999999    999999999    99999999999999999999\n"+ //38
"9999999999999999  H  999999      999999999999999999999999999999    999999999    99999999999999999999\n"+ //39
"9999999999999999     9999999DDDDD99999999999999999999999999999     99999999DDDDD99999999999999999999\n"+     //40
"9999999999999999 U U 9999999     99999999999999999999999999999    999999999    999999999999999999999\n"+ //41
"9999999999999999     9999999     9999999999999999999999999999UUUUU999999999    999999999999999999999\n"+ //42
"9999999999999999     9999999     99999999999999R                  999999999    999999999999999999999\n"+ //43
"9999999999999999 U U 9999999     999999999999  R                 9999999999    999999999999999999999\n"+ //44
"9999999999999999     9999999     9999999999    R                99999999999    999999999999999999999\n"+ //45
"9999999999999999     9999999     999999999     R              9999999999999    999999999999999999999\n"+ //46
"9999999999999999 U U 9999999     99999999      999999999999999999999999999    9999999999999999999999\n"+ //47
"9999999999999999     9999999     99999999    9999999999999999999999999999    99999999999999999999999\n"+ //48
"9999999999999999     9999999     99999999    9999999999999999999999999999  9999999999999999999999999\n"+ //49
"9999999999999999 U U 9999999DDDDD9999999    99999999999999999999999999999    99999999999999999999999\n"+     //50
"9999999999999999     9999999     9999999    999999999999999999999999999999   99999999999999999999999\n"+ //51
"9999999999999999     9999999     999999UUUU999999999999999999999999999999    99999999999999999999999\n"+ //52
"9999999999999999 U U 9999999      9999     99999999999999999999999999999    999999999999999999999999\n"+ //53
"9999999999999999     99999999             99999999999999999999999999999    9999999999999999999999999\n"+ //54
"9999999999999999  H  999999999           99999999999999999999999999999    99999999999999999999999999\n"+ //55
"9999999999999999     99999999999       999999999999999999999999999999    999999999999999999999999999\n"+ //56
"9999999999999999  I  99999999999999999999999999999999999999999999999    9999999999999999999999999999\n"+ //57
"9999999999999999     9999999999999999999999999999999999999999999999    99999999999999999999999999999\n"+ //58
"9999999999999999 B   999999999999999999999999999999999999999999999    999999999999999999999999999999\n"+ //59
"9999999999999999   B 99999999999999999999999999999999999999999999    9999999999999999999999999999999\n"+     //60
"9999999999999999 B   9999999999999999999999999999999999999999999    99999999999999999999999999999999\n"+ //61
"9999999999999999   B 999999999999999999999999999999999999999999    999999999999999999999999999999999\n"+ //62
"9999999999999999 B   99999999999      9999999999999999999999999    999999999999999999999999999999999\n"+ //63
"9999999999999999   B 999999999         999999999999999999999999    999999999999999999999999999999999\n"+ //64
"9999999999999999 B   99999999           999999999999999999999999    99999999999999999999999999999999\n"+ //65
"9999999999999999   B 9999999     999     999999999999999999999999    9999999999999999999999999999999\n"+ //66
"9999999999999999 B   9999999    99999    9999999999999999999999999    999999999999999999999999999999\n"+ //67
"9999999999999999   B 9999999DDDD99999UUUU99999999999999999999999999    99999999999999999999999999999\n"+ //68
"9999999999999999 B   9999999    99999    999999999999999999999999999    9999999999999999999999999999\n"+ //69
"9999999999999999   B 9999999    99999    9999999999999999999999999999    999999999999999999999999999\n"+     //70
"9999999999999999 B   9999999    99999    9999999999999999999999999999    999999999999999999999999999\n"+ //71
"9999999999999999   B 9999999DDDD99999UUUU999999999999999999999999999     999999999999999999999999999\n"+ //72
"9999999999999999 B   9999999    99999    99999999999999999999999999     9999999999999999999999999999\n"+ //73
"9999999999999999   B 999999     99999    9999999999999999999999999     99999999999999999999999999999\n"+ //74
"999999999999     B    9999     999999      999999999999999999999      999999999999999999999999999999\n"+ //75
"99999999999           L       99999999                               9999999999999999999999999999999\n"+ //76
"9+99999999   9999+9   L     999999999999                            99999999999999999999999999999999\n"+ //77
"999999999   999999999 L   9999999999999999                        9999999999999999999999999999999999\n"+ //78
"99999999      999999999999999999999999999999                   9999999999999999999999999999999999999\n"+ //79
"999            9999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+     //80
"99               99999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //81
"99               99999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //82
"99               99999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //83
"99               99999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //84
"99               99999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //85
"9+999999999999999+9999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //86
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //87
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //88
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //89
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+     //90
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //91
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //92
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //93
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //94
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //95
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //96
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //97
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //98
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //99
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",       //100
  checkpoints: [
    {x:-317,y:-64,direction:Math.PI*0.5,width:150}, // Start / finish line
    {x:60,y:60,direction:0,width:100}, // the 1st third end of track (2nd sector beginning)
    {x:32,y:-270,direction:Math.PI,width:100} // the 2nd third end of track (3rd sector beginning)
  ],
  SpawnX: -400,
  SpawnY: -280,
  Spawn_direction: -45,
  starting_grid: {
    x1: -325,
    x2: -305,
    y1: -88,
    next_y: y => Math.max(-248, y - 10),
  },
  drs: [
  // DRSZONE 1
  { x: -315, y: -25 },
  { x: -315, y: 5 },
  { x: -315, y: 35 },
  { x: -315, y: 65 },
  { x: -315, y: 95 },
  ]
};

var BelGP = {
  sname: "BEL",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"999999999999999999999999999999999      R   999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999        R      999999999999999999999999999999999999999999999999999999\n"+ //5
"999999         R                    99999                                           9999999999999999\n"+ //6
"99999          R                  999999999                                           99999999999999\n"+ //7
"9999           R                 99999999999       T                          T        9999999999999\n"+ //8
"999        99999999999999999999999999999999999                                         9999999999999\n"+ //9
"999      9999999999999999999999999999999999999999999999999999999999999999999999999     9999999999999\n"+    //20
"999    9999999999999999999999999999999999999999999999999999999999999999999999999999DDDDD999999999999\n"+ //1
"999UUUU9999999999999999999999999999999999999999999999999999999999999999999999999999          9999999\n"+ //2
"999      999999999999999999999999999999999999999999999999999999999999999999999999999          999999\n"+ //3
"999                                  99999999999999999999999999999999999999999999999999999    999999\n"+ //4
"999         L     B B B B B B B B     9999999999999999999999999999999999999999999999999999    999999\n"+ //5
"9999       L    I                   L  9999999999999999999999999999     L     999999999999    999999\n"+ //6
"99999       L      B B B B B B B B  L  99999999999999999999999999       L      99999999999    999999\n"+ //7
"999999                   L          L  9999999999999999999999999        L        999999999    999999\n"+ //8
"9999999999999+999999   9999999+99999   999999999999999999999999        99999      99999999    999999\n"+ //9
"999999999999999999999   99999999999 U 999999999999999999999999        99999999     9999999    999999\n"+     //30
"9999999999999999999      999999999   9999999999999999999999999  D D  9999999999     999999    999999\n"+ //1
"99999999999999999            99999         L    99999999999999   D   99999999999     99999    999999\n"+ //2
"999999999999999               9999         L      999999999999       999999999999     9999DDDD999999\n"+ //3
"999999999999999               9999         L       999999999999       999999999999    9999    999999\n"+ //4
"999999999999999               99999        L        999999999999       99999999999    9999    999999\n"+ //5
"999999999999999               99999999999999999  H   9999999999999      9999999999    9999    999999\n"+ //6
"999999999999999               999999999999999999     99999999999999      999999999     99     999999\n"+ //7
"9999999999999+9999999999999999+999999999999999999     99999999999999      999999999    L     9999999\n"+ //8
"9999999999999999999999999999999999999999999999999     999999999999999      999999999   L    99999999\n"+ //9
"99999999999999999999999999999999999999999999999999     999999999999999      999999999  L   999999999\n"+    //40
"99999999999999999999999999999999999999999999999999     9999999999999999     999999999999999999999999\n"+ //1
"999999999999999999999999999999999999999999999999999     999999999999999DDDDD999999999999999999999999\n"+ //2
"999999999999999999999999999999999999999999999999999     999999999999999     999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999     99999999999999     999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999     99999999999999     999999999999999999999999\n"+ //5
"99999999999999999999999999999999999999999999999999999     9999999999999     999999999999999999999999\n"+ //6
"99999999999999999999999999999999999999999999999999999     9999999999999     999999999999999999999999\n"+ //7
"999999999999999999999999999999999999999999999999999999     999999999999     999999999999999999999999\n"+ //8
"999999999999999999999999999999999999999999999999999999     999999999999     999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999     999999999999     99999999999999999999999\n"+    //50
"9999999999999999999999999999999999999999999999999999999     9999999999999     9999999999999999999999\n"+ //1
"99999999999999999999999999999999999999999999999999999999     9999999999999     999999999999999999999\n"+ //2
"99999999999999999999999999999999999999999999999999999999  H  99999999999999     99999999999999999999\n"+ //3
"999999999999999999999999999999999999999999999999999999999     99999999999999     9999999999999999999\n"+ //4
"999999999999999999999999999999999999999999999999999999999     999999999999999     999999999999999999\n"+ //5
"999999999999999999999999999999999999999999999999999999999     9999999999999999     99999999999999999\n"+ //6
"999999999999999999999999999999999999999999999999999999999     9999999999999999      9999999999999999\n"+ //7
"999999999999999999999999999999999999999999999999999999999     99999999999999999      999999999999999\n"+ //8
"999999999999999999999999999999999999999999999999999999999     999999999999999999     999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999     99999999999999999     999999999999999\n"+    //60
"9999999999999999999999999999999999999999999999999999999999UUUUU99999999999999999DDDDD999999999999999\n"+ //1
"99999999999999999999999999999999999999999999999999999999999     999999999999999      999999999999999\n"+ //2
"99999999999999999999999999999999999999999999999999999999999     999999999999         999999999999999\n"+ //3
"999999999999999999999999999999999999999999999999999999999999     9999999999          999999999999999\n"+ //4
"999999999999999999999999999999999999999999999999999999999999     9999999999        99999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999     999999999    999999999999999999999\n"+ //6
"99999999999999999999999999999999999999999999999999999999999999     99999999   9999999999999999999999\n"+ //7
"999999999999999999999999999999999999999999999999999999999999999     9999999   9999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999     9999     9999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999       L      9999999999999999999999\n"+    //70
"99999999999999999999999999999999999999999999999999999999999999999      L      9999999999999999999999\n"+ //1
"99999999999999999999999999999999999999999999999999999999999999999      L     99999999999999999999999\n"+ //2
"999999999999999999999999999999999999999999999999999999999999999999     L   9999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //80
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //90
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  checkpoints: [
    {x:-340,y:245,direction:Math.PI,width:120}, // Start / finish line
    {x:420,y:225,direction:Math.PI*1.5,width:80}, // the 1st third end of track (2nd sector beginning)
    {x:95,y:-70,direction:Math.PI*0.5,width:100} // the 2nd third end of track (3rd sector beginning)
  ],
  SpawnX: -270,
  SpawnY: 200,
  Spawn_direction: -45,
  starting_grid: {
    y1: 255,
    y2: 235,
    x1: -311,
    next_x: x => Math.min(-151, x + 10),
  },
  drs : [
  // DRSZONE 1
  { x: 25, y: 330 },
  { x: 75, y: 330 },
  { x: 125, y: 330 },
  { x: 175, y: 330 },
  { x: 225, y: 330 },
  { x: 275, y: 330 },
  // DRSZONE 2
  { x: 75, y: -5 },
  { x: 58, y: 30 },
  { x: 41, y: 65 },
  { x: 24, y: 100 },
  { x: 7, y: 135 },
  ]
} ;

var ItaGP = {
  sname: "ITA",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //20
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"99999999     R    9999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"999999       R      99999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"99999        R       9999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999         R        999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //30
"999  R 999999999999    99999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"99    9999999999999DDDDD9999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"99    99999999999999    9999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"99    99999999999999     999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"99    999999999999999    999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"99    999999999999999     99999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"99    9999999999999999    99999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"99    9999999999999999     9999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"99    99999999999999999    9999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"99    99999999999999999     999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //40
"99    999999999999999999    999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"99UUUU999999999999999999     99999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"99    9999999999999999999    99999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"99    9999999999999999999     9999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"99     9999999999999999999  H  999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"999     999999999999999999      99999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999        999999999999999      9999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999      999999999999999      999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"99999999     9999999999999999      99999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"99999999     99999999999999999      9999999999999999999999999999999999999999999999999999999999999999\n"+    //50
"99999999     999999999999999999      999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"99999999     9999999999999999999      99999999999999999999999999999999999999999999999999999999999999\n"+ //2
"99999999     99999999999999999999      9999999999999999999999999999999999999999999999999999999999999\n"+ //3
"99999999     999999999999999999999      999999999999999999999999999999999999999999999999999999999999\n"+ //4
"99999999     9999999999999999999999      99999999999999999999999999999999999999999999999999999999999\n"+ //5
"99999999     99999999999999999999999      9999999999999999999999999999999999999999999999999999999999\n"+ //6
"99999999UUUUU999999999999999999999999      9999999    9999999999999999999999999999999999999999999999\n"+ //7
"99999999     9999999999999999999999999   H  9999        99999999999999999999999999999999999999999999\n"+ //8
"99999999     99999999999999999999999999      99           999999999999999999999999999999999999999999\n"+ //9
"99999999     999999999999999999999999999   R   U  99   D             R                       9999999\n"+    //60
"99999999     9999999999999999999999999999        99999               R                    D    99999\n"+ //1
"99999999     99999999999999999999999999999      9999999              R                    D     9999\n"+ //2
"99999999     9999999999999999999999999999999999999999999             R                           999\n"+ //3
"999999999     9999999999999999999999999999999999999999999999999999999999999999999999999999999     99\n"+ //4
"999999999     99999999999999999999999999999999999999999999999999999999999999999999999999999999    99\n"+ //5
"9999999999UUUUU9999999999999999999999999999999999999999999999999999999999999999999999999999999DDDD99\n"+ //6
"99999999999     9999999999999999999999    9999999999999999999999999999999999999999999999999999    99\n"+ //7
"99999999999       99999999999999999        99999999999999999999999999999999999999999999999999     99\n"+ //8
"999999999999       9999999999999           9999999999999999999999999999999999999999999999999     999\n"+ //9
"99999999999999        9999999        9999LL99999999999999999999999999999999999999999999999      9999\n"+    //70
"999999999999999          L        9999999  999999999999999999999999999999999999999999999LLLLLLL99999\n"+ //1
"99999999999999999        L     9999999999  U                                                  999999\n"+ //2
"999999999999999999       L  9999999999999  UU   L        B B B B B B B B                    99999999\n"+ //3
"99999999999999999999     L999999999999999      L       I                   T       T      9999999999\n"+ //4
"9999999999999999999999   L 99       9    L      L         B B B B B B B B               999999999999\n"+ //5
"9999999999999999999999999        9     9 LL                                          999999999999999\n"+ //6
"999999999999999999999999999999999999999999999999999999999999999999999999+99 LLLL 9999999+99999999999\n"+ //7
"999999999999999999999999999999999999999999999999999999999999999999999999999999    999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999    99999999999999999\n"+ //9
"99999999999999999999999999999999999999999999999999999999999999999999999999999999      99999999999999\n"+    //80
"999999999999999999999999999999999999999999999999999999999999999999999999999            9999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //6
"999999999999999999999999999999999999999999999999999999999999999999999999+999999999999999+99999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //90
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  checkpoints: [
  {x:60,y:-235,direction:Math.PI,width:100}, // Start / finish line
  {x:-460,y:120,direction:Math.PI*0.5,width:100}, // the 1st third end of track (2nd sector beginning)
  {x:140,y:-110,direction:0,width:120} // the 2nd third end of track (3rd sector beginning)
  ],
  SpawnX: 310,
  SpawnY: -290,
  Spawn_direction: -45,
  starting_grid: {
    y1: -225,
    y2: -245,
    x1: 79,
    next_x: x => Math.min(249, x + 10),
  },
  drs : [
  // DRSZONE 1
  { x: 325, y: -235 },
  { x: 305, y: -235 },
  { x: 285, y: -235 },
  { x: 265, y: -235 },
  // DRSZONE 2
  { x: -210, y: 50 },
  { x: -190, y: 30 },
  { x: -170, y: 10 },
  { x: -150, y: -10 },
  { x: -130, y: -30 },
  { x: -110, y: -50 },
  ]
} ;


var RusGP = {
  sname: "RUS",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"999999999999999999999999999999  R    999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"99999999999999999999999999999   R     99999999999999999999999999999999999999999999999999999999999999\n"+ //11
"9999999999999999999999999999    R      9999999999999999999999999999999999999999999999999999999999999\n"+ //12
"999999999999999999999999999     R       999999999999999999999999999999999999999999999999999999999999\n"+ //13
"99999999999999999999999999     9999      99999999999999999999999999999999999999999999999999999999999\n"+ //14
"9999999999999999999999999    9999999      9999999999999999999999999999999999999999999999999999999999\n"+ //15
"999999999999999999999999    999999999      999999999999999999999999999999999999999999999999999999999\n"+ //16
"999999999999999999999999    9999999999      99999999999999999999999999999999999999999999999999999999\n"+ //17
"999999999999999999999999    99999999999      9999999999999999999999999999999999999999999999999999999\n"+ //18
"999999999999999999999999UUUU999999999999      999999999999999999999999999999999999999999999999999999\n"+ //19
"9999999999999999999999     99999999999999 DDD   9999999999999999999999999999999999999999999999999999\n"+    //20
"99999999999999999999      9999999999999999        99999999999999999999999999999999999999999999999999\n"+ //21
"999999999999999999      99999999999999999999        999999999999999999999999999999999999999999999999\n"+ //22
"9999999    R          9999999         99999999        9999999999999999999999999999999999999999999999\n"+ //23
"999        R        9999999      L      9999999        999999999999999999999999999999999999999999999\n"+ //24
"99         R       999999        L        9999999        9999999999999999999999999999999999999999999\n"+ //25
"9        999999999999999                   99999999        99999999999999999999999999999999999999999\n"+ //26
"9     9999999999999999         99999         99999999        999999999999999999999999999999999999999\n"+ //27
"9    9999999999999999       99999999999       999999999      999999999999999999999999999999999999999\n"+ //28
"9    999999999999999       9999999999999       999999999  H  999999999999999999999999999999999999999\n"+ //29
"9    99999999999999 DDDD 99999999999999999 UUUU 99999999  D  999999999999999999999999999999999999999\n"+    //30
"9    9999999999999      9999999999999999999      9999999     999999999999999999999999999999999999999\n"+ //31
"9    9999999999999      9999999999999999999      9999999     999999999999999999999999999999999999999\n"+ //32
"9    999999999999     99999999999999999999999     999999     999999999999999999999999999999999999999\n"+ //33
"9    99999999999 DDDD 99999999999999999999999 UUUU 99999     999999999999999999999999999999999999999\n"+ //34
"9UUUU99999999999     9999999999999999999999999     99999     999999999999999999999999999999999999999\n"+ //35
"9    9999999999      9999999999999999999999999      9999     999999999999999999999999999999999999999\n"+ //36
"9    9999999999     999999999999999999999999999     9999     999999999999999999999999999999999999999\n"+ //37
"9    9999999999     999999999999999999999999999     9999     999999999999999999999999999999999999999\n"+ //38
"9    9999999999     999999999999999999999999999     9999     999999999999999999999999999999999999999\n"+ //39
"9    9999999999     999999999999999999999999999 UUU 9999     999999999999999999999999999999999999999\n"+    //40
"9    9999999999     999999999999999999999999999     9999     999999999999999999999999999999999999999\n"+ //41
"9    99999999999    999999999999999999999999999    99999     999999999999999999999999999999999999999\n"+ //42
"9UUUU99999999999DDDDD9999999999999999999999999    999999     999999999999999999999999999999999999999\n"+ //43
"99    99999999999    9999999999999999999999999    999999  D  999999999999999999999999999999999999999\n"+ //44
"99     9999999999    9999999999999999999999999    999999  H  999999999         R                 999\n"+ //45
"99         L         9999999999999999999999999    999999      9999999          R                  99\n"+ //46
"999        L         9999999999999999999999999    999999       999999          R                  99\n"+ //47
"999        L         9999999999999999999999999UUUUU9999999      99999    999999999999999999999    99\n"+ //48
"99999      L        99999999999999999999999999       9999999      999UUUU9999999999999999999999DDD99\n"+ //49
"9999999999999999999999999999999999999999999999         9999999     99    9999999999999999999999   99\n"+    //50
"99999999999999999999999999999999999999999999999          9999999    R    9999999999999999999999   99\n"+ //51
"999999999999999999999999999999999999999999999999    T      9999999  R    9999999999999999999999   99\n"+ //52
"99999999999999999999999999999999999999999999999999   L       9999999R   99999999999999999999999   99\n"+ //53
"9999999999999999999999999999999999999999999999999999           99999999999999999999999999999999   99\n"+ //54
"999999999999999999999999999999999999999999999999999999           999999999999999999999999999999   99\n"+ //55
"99999999999999999999999999999999999999999999999999999999     L     999999999999999999999999999 LL 99\n"+ //56
"9999999999999999999999999999999999999999999999999999999999    T          L                        99\n"+ //57
"999999999999999999999999999999999999999999999999999999999999             L     B B B B B B B B    99\n"+ //58
"99999999999999999999999999999999999999999999999999999999999999             I                      99\n"+ //59
"9999999999999999999999999999999999999999999999999999999999999999         L    B B B B B B B B     99\n"+    //60
"999999999999999999999999999999999999999999999999999999999999999999       L    LLLLL              999\n"+ //61
"9999999999999999999999999999999999999999999999999999999999999999999999999999+99999   99999999+999999\n"+
"99999999999999999999999999999999999999999999999999999999999999999999999999999999999   99999999999999\n"+//62
"999999999999999999999999999999999999999999999999999999999999999999999999999999999      9999999999999\n"+ //63
"9999999999999999999999999999999999999999999999999999999999999999999999999999999            999999999\n"+ //64
"99999999999999999999999999999999999999999999999999999999999999999999999999999               99999999\n"+ //65
"99999999999999999999999999999999999999999999999999999999999999999999999999999               99999999\n"+ //66
"99999999999999999999999999999999999999999999999999999999999999999999999999999               99999999\n"+ //67
"99999999999999999999999999999999999999999999999999999999999999999999999999999               99999999\n"+ //68
"99999999999999999999999999999999999999999999999999999999999999999999999999999               99999999\n"+ //69
"9999999999999999999999999999999999999999999999999999999999999999999999999999+9999999999999999+999999\n"+    //70
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //71
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //72
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //73
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //74
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //75
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //76
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //77
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //78
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //79
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //80
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //81
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //81
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //83
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //84
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //85
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //86
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //87
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //88
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //89
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //90
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999", 
  checkpoints: [
    {x:255,y:-85,direction:Math.PI,width:60},// Start / finish line
    {x:-470,y:120,direction:Math.PI*0.5,width:80},
    {x:5,y:265,direction:0,width:80},
    {x:240,y:45,direction:0,width:60}
  ],
  SpawnX: 350,
  SpawnY: -130,
  Spawn_direction: -45,
  starting_grid: {
    y1: -95,
    y2: -75,
    x1: 289,
    next_x: x => Math.min(459, x + 10),
  },
  drs : [
  // DRSZONE 1
  { x: 105, y: -50 },
  { x: 85, y: -40 },
  { x: 65, y: -30 },
  { x: 45, y: -20 },
  // DRSZONE 2
  { x: 85, y: 195 },
  { x: 85, y: 175 },
  { x: 85, y: 155 },
  { x: 85, y: 135 },
  { x: 85, y: 115 },
  { x: 85, y: 95 },
  { x: 85, y: 75 },
  ]
} ;

var JapGP = {
  sname: "JAP",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //20
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"999999999999999999999999999999999999999999999999999999999999999999999999999999999999999   L    99999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999     L      999\n"+ //6
"99999999999999999999999999999999999999999999999999999999999999999999999999999999999       L       99\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999        L        9\n"+ //8
"999999999999999999999999999999999999999999999999999999999999999999999999999999999     9999999999    \n"+ //9
"99999999999999999999999999999999999999999999999999999999999999999999999999999999     999999999999   \n"+    //30
"9999999999999999999999999999999999999999999999999999999999999999999999999999999     9999999999999UUU\n"+ //1
"999999999999999999999999999999999999999999999999999999999999999999999999999999DDDDD9999999999999    \n"+ //2
"99999999999999999999999999999999999999999999999999999999999999999999999999999     9999             9\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999     9999             99\n"+ //4
"999999999999999999999999999999999999999999999999999999999999999999999999999     9999            9999\n"+ //5
"99999999999999999999999999999999999999999999999999999999999999999999999999     9999     999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999     9999     9999999999999\n"+ //7
"999999999999999999999999999999999999999999999999999999999999999999999999     9999     99999999999999\n"+ //8
"99999999999999999999999999999999999999999999999999999999999999999999999     9999     999999999999999\n"+ 
"9999999999999999999999999999999999999999999999999999999999999999999999     99999    9999999999999999\n"+    //40
"999999999999999999999999999999999999999999999999999999999999999999999     999999    9999999999999999\n"+ //1
"99999999999999999999999999999999999999999999999999999999999999999999DDDDD9999999UUUU9999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999     99999999    9999999999999999\n"+ //3
"999999999999999999999999999999999999999999999999999999999        R     R    9999    9999999999999999\n"+ //4
"99999999999999999999999999999999999999999999999999999999        R R   R      999    9999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999        R   R R        99    9999999999999999\n"+ //6
"999999999999999999999999999999999999999999999999999999        R     R         99    9999999999999999\n"+ //7
"99999999999999999999999999999999999999999999999999999     9999     9999999    99    9999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999     9999DDDDD99999999    99    9999999999999999\n"+ //9
"999999999999999999999999999999999999999999999999999     9999     999999999DDDD99UUUU9999999999999999\n"+    //50
"99999999999999999999999999999999999999999999999999UUUUU9999     9999999999    99    9999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999     9999     99999999999    99    9999999999999999\n"+ //2
"999999999999999999999999999999999999999999999999     9999     999999999999          9999999999999999\n"+ //3
"99999999999999999999999999999999999999999999999     9999     9999999999999          9999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999     9999     999999999999999        99999999999999999\n"+ //5
"999999999999999999999999999999999999999999999     9999     99999999999999999      999999999999999999\n"+ //6
"999999999999999999999999999999999999999999999    9999     999999999999999999999999999999999999999999\n"+ //7
"999999999999999999999999999999999999999999999    999     9999999999999999999999999999999999999999999\n"+ //8
"999999999999999999999999999999999999999999999UUUU999DDDD99999999999999999999999999999999999999999999\n"+ //9
"999999999999999999999999999999999999999999999    999    99999999999999999999999999999999999999999999\n"+    //60
"999999999999999999999999999999999999999999999    999    99999999999999999999999999999999999999999999\n"+ //1
"999999999999999999999999999999999999999999999    999    99999999999999999999999999999999999999999999\n"+ //2
"999999999999999999999999999999999999999999999    999    99999999999999999999999999999999999999999999\n"+ //3
"999999999999999999999999999999999999999999999    999    99999999999999999999999999999999999999999999\n"+ //4
"999999999999999999999999999999999999999999999    999    99999999999999999999999999999999999999999999\n"+ //5
"999999999999999999999999999999999    99999999    999    99999999999999999999999999999999999999999999\n"+ //6
"99999999999999999999999999999999       999999    999    99999999999999999999999999999999999999999999\n"+ //7
"99999999999999999      99999999         99999    999    99999999999999999999999999999999999999999999\n"+ //8
"9999999999999999         99999    99     9999    999    99999999999999999999999999999999999999999999\n"+ //9
"9999     999999           999 UUU9999DDDD9999UUUU999DDDD99999999999999999999999999999999999999999999\n"+    //70
"99        9999 UUU 9999 DD       9999     99    9999    99999999999999999999999999999999999999999999\n"+ //1
"9      DDD        999999        999999         99999    99999999999999999999999999999999999999999999\n"+ //2
"     999         99999999      99999999       999999    99999999999999999999999999999999999999999999\n"+ //3
"    99999       9999999999    9999999999     999   L    99999999999999999999999999999999999999999999\n"+ //4
"   999999999999999999999999999999999999999999999   L  9999999999999999999999999999999999999999999999\n"+ //5
"UUU999999999999999999999999999999999999999999999   9999999999999999999999999999999999999999999999999\n"+ //6
"   99999999999999999999999999999999999999999999    9999999999999999999999999999999999999999999999999\n"+ //7
"    999999999999999999999999999999999999999999DDDDD9999999999999999999999999999999999999999999999999\n"+ //8
"     99999999999999999999999999999999999999       99999999999999999999999999999999999999999999999999\n"+ //9
"9     L                       L                  999999999999999999999999999999999999999999999999999\n"+    //80
"99    L      B B B B B B B B  L                 9999999999999999999999999999999999999999999999999999\n"+ //1
"999   L    I                  L T          T   99999999999999999999999999999999999999999999999999999\n"+ //2
"9999  L       B B B B B B B B L              9999999999999999999999999999999999999999999999999999999\n"+ //3
"99999 L                       L            999999999999999999999999999999999999999999999999999999999\n"+ //4
"99999999999999999999999999999999+99999   99999999+99999999999999999999999999999999999999999999999999\n"+ //5
"999999999999999999999999999999999999999   9999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999      999999999999999999999999999999999999999999999999999999999\n"+ //7
"99999999999999999999999999999999999            99999999999999999999999999999999999999999999999999999\n"+ //8
"999999999999999999999999999999999               9999999999999999999999999999999999999999999999999999\n"+ //9
"999999999999999999999999999999999               9999999999999999999999999999999999999999999999999999\n"+    //90
"999999999999999999999999999999999               9999999999999999999999999999999999999999999999999999\n"+ //1
"999999999999999999999999999999999               9999999999999999999999999999999999999999999999999999\n"+ //2
"999999999999999999999999999999999               9999999999999999999999999999999999999999999999999999\n"+ //3
"99999999999999999999999999999999+9999999999999999+99999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  checkpoints: [
    {x:-385,y:-315,direction:Math.PI,width:80},// Start / finish line
    {x:-150,y:-165,direction:0,width:60},
    {x:-30,y:-135,direction:Math.PI*0.5,width:60},
    {x:400,y:160,direction:0,width:60},
    {x:225,y:100,direction:Math.PI*1.5,width:60}
  ],
  SpawnX: -90,
  SpawnY: -360,
  Spawn_direction: -45,
  starting_grid: {
    y1: -305,
    y2: -325,
    x1: -361,
    next_x: x => Math.min(-191, x + 10),
  },
  drs : [
  // DRSZONE 1
  { x: -160, y: -315 },
  { x: -140, y: -315 },
  { x: -120, y: -315 },
  { x: -100, y: -315 },
  { x: -80, y: -315 },
  // DRSZONE 2
  ]
} ;

var USA_S_GP = {
  sname: "USA_S",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //20
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"999999999999999                                                                      999999999999999\n"+ //4
"999999999999                       L                 L                                  999999999999\n"+ //5
"9999999999                        L                 L                                     9999999999\n"+ //6
"99999999                          L                 L       T                 T             99999999\n"+ //7
"9999999                            L                 L                                       9999999\n"+ //8
"999999                                                       L   L   L   L   L                999999\n"+ //9
"99999         999999999999999999999999999999999999999999999999999999999999999999999999         99999\n"+    //30
"99999  D D  9999999999999999999999999999999999999999999999999999999999999999999999999999    U  99999\n"+ //1
"9999    D  999999999999999999999999999999999999999999999999999999999999999999999999999999  U U  9999\n"+ //2
"9999      99999999999999999999999999999999999999999999999999999999999999999999999999999999      9999\n"+ //3
"999       99999999999999999999999999999999999999999999999999999999999999999999999999999999       999\n"+ //4
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //5
"999 D  D 9999999999999999999999999999999999999999999999999999999999999999999999999999999999  UU  999\n"+ //6
"999  DD  9999999999999999999999999999999999999999999999999999999999999999999999999999999999 U  U 999\n"+ //7
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //8
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //9
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+    //40
"999 D  D 9999999999999999999999999999999999999999999999999999999999999999999999999999999999  UU  999\n"+ //1
"999  DD  9999999999999999999999999999999999999999999999999999999999999999999999999999999999 U  U 999\n"+ //2
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //3
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //4
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //5
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //6
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //7
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //8
"999 D  D 9999999999999999999999999999999999999999999999999999999999999999999999999999999999  UU  999\n"+ //9
"999  DD  9999999999999999999999999999999999999999999999999999999999999999999999999999999999 U  U 999\n"+    //50
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //1
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //2
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //3
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //4
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //5
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //6
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //7
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //8
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //9
"999 D  D 9999999999999999999999999999999999999999999999999999999999999999999999999999999999  UU  999\n"+    //60
"999  DD  9999999999999999999999999999999999999999999999999999999999999999999999999999999999 U  U 999\n"+ //1
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //2
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //3
"999      9999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //4
"999 D  D 9999999999999999999999999999999999999999999999999999999999999999999999999999999999  UU  999\n"+ //5
"999  DD  9999999999999999999999999999999999999999999999999999999999999999999999999999999999 U  U 999\n"+ //6
"999       99999999999999999999999999999999999999999999999999999999999999999999999999999999       999\n"+ //7
"9999      99999999999999999999999999999999999999999999999999999999999999999999999999999999      9999\n"+ //8
"9999       999999999999999999999999999999999999999999999999999999999999999999999999999999       9999\n"+ //9
"99999  D D  9999999999999999999999999999999999999999999999999999999999999999999999999999   U   99999\n"+    //70
"99999   D     999999999999999999999999999999999999999999999999999999999999999999999999    U U  99999\n"+ //1
"999999                     R                                    R   R   R   R                 999999\n"+ //2
"9999999                     R           B B B B B B B B                                      9999999\n"+ //3
"99999999                     R                                                              99999999\n"+ //4
"9999999999                   R                          I     T               T           9999999999\n"+ //5
"999999999999                R          B B B B B B B B                                  999999999999\n"+ //6
"999999999999999            R                                     R   R   R   R       999999999999999\n"+ //7
"99999999999999999+9999999   99999+999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"999999999999999999999999   9999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"999999999999999999999      9999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //80
"99999999999999999999           999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"999999999999999999               9999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"999999999999999999               9999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"999999999999999999               9999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"999999999999999999               9999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"999999999999999999               9999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"99999999999999999+999999999999999+999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //90
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  checkpoints: [
  {x:65,y:-240,direction:0,width:150}, // Start / finish line
  {x:330,y:240,direction:Math.PI,width:100}, // the 1st third end of track (2nd sector beginning)
  {x:-320,y:235,direction:Math.PI,width:120} // the 2nd third end of track (3rd sector beginning)
  ],
  SpawnX: -240,
  SpawnY: -290,
  Spawn_direction: -45,
  starting_grid: {
    y1: -225,
    y2: -255,
    x1: 39,
    next_x: x => Math.max(-131, x - 10),
  },
  drs : [
  // DRSZONE 1
  { x: 140, y: -240 },
  { x: 170, y: -240 },
  { x: 200, y: -240 },
  { x: 230, y: -240 },
  { x: 260, y: -240 },
  // DRSZONE 2
  { x: 265, y: 235 },
  { x: 235, y: 235 },
  { x: 205, y: 235 },
  { x: 175, y: 235 },
  { x: 145, y: 235 },
  { x: 115, y: 235 },
  ]
} ;

var USA_E_GP = {
  sname: "USA_E",
  map: ""+
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //10
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //20
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999995555555555555555555555555555555555555555555555555999999999999999999999999999999999999999\n"+ //4
"9999999999555555555555555555555555555555555555555555555555555999999999999999999999999999999999999999\n"+ //5
"9999999955555555555555555555555555555555555555555555555555559999999999999999999999999999999999999999\n"+ //6
"99999995555555555555555555555555555555555555555555555555555599999        R   99999999999999999999999\n"+ //7
"9999995555555555555555555555555555555555555555555555555555559999         R     999999999999999999999\n"+ //8
"9999955555555599999999999999999999999999999999999999999999999999         R       9999999999999999999\n"+ //9
"9999955555559999999999999999999999999999999999999999999999999999 RR      R         99999999999999999\n"+    //30
"9999555555599999999999999999999999999999999999999999999999999999     99999999        999999999999999\n"+ //1
"9999555555999999999999999999999999999999999999999999999999999999    99999999999        9999999999999\n"+ //2
"9995555555999999999999999999999999999999999999999999999999999999    9999999999999        99999999999\n"+ //3
"99955555599999999999999999999999999999999999999999999999    9999    999999999999999        999999999\n"+ //4
"9995555559999999999999999999999999999999999999999999999      999UUUU99999999999999999        9999999\n"+ //5
"999555555999999999999999999999999999999999999999999999     D  99    9999999999999999999        99999\n"+ //6
"999555555999999999999999999999999999999999999999999999   99   99    999999999999999999999        999\n"+ //7
"999555555999999999999999999999999999999999999999999999UUU99   99    99999999999999999999999      999\n"+ //8
"999555555999999999999999999999999999999999999999999999   99   99    99999999999999999999999DDDDDD999\n"+ //9
"999555555999999999999999999999999999999999999999999999   99   99    99999999999999999999999      999\n"+    //40
"999555555999999999999999999999999999999999999999999999   99   99    99999999999999999999999      999\n"+ //1
"999555555999999999999999999999999999999999999999999999UUU99 R 99    99999999999999999999999      999\n"+ //2
"999555555999999999999999999999999999999999999999999999   99         99999999999999999999999  DD  999\n"+ //3
"999555555999999999999999999999999999999999999999999999   999       999999999999999999999999 D  D 999\n"+ //4
"999555555999999999999999999999999999999999999999999999   9999     9999999999999999999999999      999\n"+ //5
"99999999999999999999999999999999999999999999999999999 U  9999999999999999999999999999999999      999\n"+ //6
"999999999999999999999999    R   R   R   R   R            9999999999999999999999999999999999      999\n"+ //7
"999999999999999999999                                    9999999999999999999999999999999999      999\n"+ //8
"999      R 999999999                                     9999999999999999999999999999999999  DD  999\n"+ //9
"9        R  99999999  UUU  T                T           99999999999999999999999999999999999 D  D 999\n"+    //50
"9        R   9999999                                  9999999999999999999999999999999999999      999\n"+ //1
"9        R    9999999    999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //2
"9    99999     9999999    99999999999999999999999999999999999999999999999999999999999999999      999\n"+ //3
"9    999999     9999999    9999999999999999999999999999999999999999999999999999999999999999      999\n"+ //4
"9     999999     9999999    999999999999999999999999999999999999999999999999999999999999999      999\n"+ //5
"99     999999     999999    999999999999999999999999999999999999999999999999999999999999999      999\n"+ //6
"99     9999999     99999    999999999999999999999999999999999999999999999999999999999999999      999\n"+ //7
"999UUUUU9999999     9999    999999999999999999999999999999999999999999999999999999999999999      999\n"+ //8
"999     99999999     R      999999999999999999999999999999999999999999999999999999999999999      999\n"+ //9
"9999     99999999    R      999999999999999999999999999999999999999999999999999999999999999  DD  999\n"+    //60
"9999     999999999   R      999999999999999999999999999999999999999999999999999999999999999 D  D 999\n"+ //1
"99999     999999999  R     9999999999999999999999999999999999999999999999999999999999999999      999\n"+ //2
"99999     999999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //3
"999999     99999999999999999999999999999999999999999999999999999999999999999999999999999999      999\n"+ //4
"999999         L    99999999999999999999999999999999999999999999999999999999999999999999999  DD  999\n"+ //5
"999999         L     9999999999999999999999999999999999999999999999999999999999999999999999 D  D 999\n"+ //6
"999999         L      99999999999999999999999999999999999999999999999999999999999999999999       999\n"+ //7
"9999999        L       9999999999999999999999999999999999999999999999999999999999999999999      9999\n"+ //8
"999999999999999999     999999999999999999999999999999999999999999999999999999999999999999       9999\n"+ //9
"999999999999999999UUUUU99999999999999999999999999999999999999999999999999999999999999999   D   99999\n"+    //70
"9999999999999999999     99999999999999999999999999999999999999999999999999999999999999    D D  99999\n"+ //1
"9999999999999999999                                             L   L   L   L                 999999\n"+ //2
"9999999999999999999        L         B B B B B B B B                                         9999999\n"+ //3
"9999999999999999999         L                                                               99999999\n"+ //4
"99999999999999999999        L      I                          T               T           9999999999\n"+ //5
"999999999999999999999      L          B B B B B B B B                                   999999999999\n"+ //6
"99999999999999999999999                                         L   L   L   LLLLL    999999999999999\n"+ //7
"999999999999999999999999999999999999999999999999999999999999999999999999+999999   999999+99999999999\n"+ //8
"99999999999999999999999999999999999999999999999999999999999999999999999999999999   99999999999999999\n"+ //9
"99999999999999999999999999999999999999999999999999999999999999999999999999999999      99999999999999\n"+    //80
"999999999999999999999999999999999999999999999999999999999999999999999999999            9999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999               999999999999\n"+ //6
"999999999999999999999999999999999999999999999999999999999999999999999999+999999999999999+99999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+    //90
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //1
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //2
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //3
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //4
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //5
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //6
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //7
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //8
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999\n"+ //9
"9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
  checkpoints: [
  {x:-145,y:-245,direction:Math.PI,width:150}, // Start / finish line
  {x:0,y:10,direction:0,width:100}, // the 1st third end of track (2nd sector beginning)
  {x:440,y:-45,direction:Math.PI*1.5,width:120} // the 2nd third end of track (3rd sector beginning)
  ],
  SpawnX: 310,
  SpawnY: -290,
  Spawn_direction: -45,
  starting_grid: {
    y1: -225,
    y2: -255,
    x1: -120,
    next_x: x => Math.min(50, x + 10),
  },
  drs : [
  // DRSZONE 1
  { x: 140, y: -240 },
  { x: 170, y: -240 },
  { x: 200, y: -240 },
  { x: 230, y: -240 },
  { x: 260, y: -240 },
  // DRSZONE 2
  { x: -215, y: 10 },
  { x: -185, y: 10 },
  { x: -155, y: 10 },
  { x: -125, y: 10 },
  { x: -95, y: 10 },
  { x: -65, y: 10 },
  ]
} ;



var tracks = [
  ChiGP,
  AzeGP,
  AutGP,
  GBGP,
  HunGP,
  BelGP,
  ItaGP,
  RusGP,
  JapGP,
  USA_S_GP,
  USA_E_GP
];

var current_track = 0;


// Main code

var track, map, checkpoints, map_lines, allow_ship_switch, pinned_ship, starting_grid;
var SpawnX, SpawnY;

var ships_level = ship_levels[vehicle_type];

race_close_time *= 60;
ship_switch_delay *= 60;

var set_starting_grid = function(track) {
  starting_grid = track.starting_grid;
  starting_grid.angle = 180 * track.checkpoints[0].direction / Math.PI;
  if (typeof starting_grid.next_x === "function") {
    var x = starting_grid.x = [];
    x[1] = x[0] = starting_grid.x1;
    starting_grid.next_position = function() {
      x[1] = x[0] = starting_grid.next_x(x[0]);
    };
    starting_grid.y = [starting_grid.y1, starting_grid.y2];
  } else if (typeof starting_grid.next_y === "function") {
    var y = starting_grid.y = [];
    y[1] = y[0] = starting_grid.y1;
    starting_grid.next_position = function() {
      y[1] = y[0] = starting_grid.next_y(y[0]);
    };
    starting_grid.x = [starting_grid.x1, starting_grid.x2];
  } else {
    fatal_error(`Not found starting_grid.next_x / next_y function for track: ${track.sname}`);
  }
};

var setTrack = function(game, trackid) {
  track = tracks[trackid];
  checkpoints = track.checkpoints;
  map = outlap.init_lap_map(track.map);
  game.setCustomMap(map);
  map_lines = map.split("\n");
  SpawnX = tracks[trackid].SpawnX;
  SpawnY = tracks[trackid].SpawnY;
  set_starting_grid(track);
  pinned_ship = track.pinned_ship;
  allow_ship_switch = !pinned_ship;
  if (pinned_ship > 0) {
    // consider shifted level 1 models (because of hidden starting ship 101)
    pinned_ship += ships_level*100 + model_shift;
  }
  prepare_drs(track);
  game.removeObject();
  addObjects(game);
};


var scoreboard = {
  id:"scoreboard",
  visible: true,
  components: [
    { type:"box",position:[0,0,100,100],fill:"#456",stroke:"#CDE",width:2},
    { type: "text",position: [0,0,100,100],color: "#FFF",value: "My Text"}
  ]
};

var lap_info = {
  id:"lap_info",
  visible: true,
  position: [30,90,40,5],
  components: [
    { type: "text",position: [0,0,100,100],color: "#FFF",value: "Race for fastest lap"}
  ]
};

var race_info = {
  id:"race_info",
  visible: true,
  position: [30,5,40,5],
  components: [
    { type: "text",position: [0,0,100,100],color: "#FFF",value: "Qualification"}
  ]
};

var countdown = {
  id: "countdown",
  visible: true,
  position: [20.5,15,75,127.5],
  components: [
    { type:"round",position:[10,0,10,10],fill:"#171717",stroke:"#fff",width:2},
    { type:"round",position:[22,0,10,10],fill:"#171717",stroke:"#fff",width:2},
    { type:"round",position:[34,0,10,10],fill:"#171717",stroke:"#fff",width:2},
    { type:"round",position:[46,0,10,10],fill:"#171717",stroke:"#fff",width:2},
    { type:"round",position:[58,0,10,10],fill:"#171717",stroke:"#fff",width:2},
  ]
};


var change_button = {
  id: "change",
  position: [6,30,8,14],
  clickable: true,
  shortcut: "E",
  visible: true,
  components: [
    { type: "box",position:[0,0,100,100],stroke:"#CDE",width:2},
    { type: "text",position:[10,35,80,30],value:"Switch",color:"#CDE"},
    { type: "text",position:[20,70,60,20],value:"[E]",color:"#CDE"}
  ],
};

var change_button_hidden = {
  id: "change",
  position: [0,0,0,0],
  clickable: false,
  visible: false,
  components: [],
};

// TODO: implement spectator buttons

// var warp_button = {
  // id: "warp",
  // position: [16.4,19.5,8,14],
  // clickable: false,
  // shortcut: "U",
  // visible: true,
  // components: [
    // { type: "text",position:[10,35,80,30],value:"[W]to warp",color:"#CDE"},
  // ],
// };

// var change_camera = {
  // id: "change_camera",
  // position: [16.4,16.8,8,14],
  // clickable: false,
  // shortcut: "U",
  // visible: true,
  // components: [
    // { type: "text",position:[10,35,80,30],value:"[J]c.toggle",color:"#CDE"},
  // ],
// };

// var warpShip = function(ship) {
  // x =;
  // y =;
  // ship.set({x:x,y:y,vx:0,vy:0,invulnerable:180})
// };


// Track background, can be used on map pattern with shortcuts

var DRSMirror = {
  id: "DRSMirror",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive: "https://raw.githubusercontent.com/mrGoldmanus/RACING-/master/drsPS.png"
};

var DRSHoriz = {
  id: "DRSHooriz",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive: "https://raw.githubusercontent.com/mrGoldmanus/RACING-/master/drsPS.png"
};

var DRSZone = {
  id: "DRSZone",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive: "https://raw.githubusercontent.com/mrGoldmanus/RACING-/master/drsPS.png"
};

var startline = {
  id: "startline",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive: "https://starblast.data.neuronality.com/mods/objects/startline.png"
};

var startblock = {
  id: "startblock",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive: "https://starblast.data.neuronality.com/mods/objects/startblock.png"
};

var arrow = {
  id: "arrow",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive: "https://starblast.data.neuronality.com/mods/objects/arrow.png"
};


// Track background without shortcuts

var ShipsGallery = {
  id: "ShipsGallery",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  diffuse: "https://raw.githubusercontent.com/mrGoldmanus/RACING-/master/racingships3.png",
  emissive: "https://raw.githubusercontent.com/mrGoldmanus/RACING-/master/racingships3.png"
};

var AboutESRL = {
  id: "AboutESRL",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  diffuse: "https://raw.githubusercontent.com/GoldmanAerospace/RACING-/master/aboutESRL.png",
  emissive: "https://raw.githubusercontent.com/GoldmanAerospace/RACING-/master/aboutESRL.png"
};

var TrackInfo = {};

for (let track of tracks) {
  TrackInfo[track.sname] = {
    id: "TrackInfo:" + track.sname,
    obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
    diffuse: "https://raw.githubusercontent.com/GoldmanAerospace/RACING-/master/S.3%20track%20info/Info_"+ track.sname +".png",
    emissive: "https://raw.githubusercontent.com/GoldmanAerospace/RACING-/master/S.3%20track%20info/Info_"+ track.sname +".png"
  };
}

var SRCLogo = {
  id: "SRCLogo",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  diffuse: "https://raw.githubusercontent.com/mrGoldmanus/RACING-/master/RacingLOGO2.png",
  emissive: "https://raw.githubusercontent.com/mrGoldmanus/RACING-/master/RacingLOGO2.png"
};

var SpawnAndSwitch = {
  id: "SpawnAndSwitch",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  diffuse: "https://raw.githubusercontent.com/mrGoldmanus/RACING-/master/spawnandswitch.png",
  emissive: "https://raw.githubusercontent.com/mrGoldmanus/RACING-/master/spawnandswitch.png"
};


// Background functions

var addSRCLogo = function(x, y) {
  game.setObject({
    id: `SRCLogo:${x}:${y}`,
    type: SRCLogo,
    position: {x:x,y:y,z:-2.5},
    scale: {x:25,y:25,z:36},
    rotation: {x:600,y:0,z:0}
  });
};

var show_spawn_switch = function(game) {
  if (!game.custom.spawn_switch) {
    game.custom.spawn_switch = true;
    game.setObject({
      id: "SpawnAndSwitch",
      type: SpawnAndSwitch,
      position: {x:SpawnX,y:SpawnY,z:-2.5},
      scale: {x:20,y:20,z:36},
      rotation: {x:600,y:0,z:0}
    });
  }
};

var hide_spawn_switch = function(game) {
  if (game.custom.spawn_switch) {
    game.custom.spawn_switch = false;
    game.removeObject("SpawnAndSwitch");
  }
};

var show_spawn_objects = function(game) {
  if (allow_ship_switch) {
    show_spawn_switch(game);
  }

  game.setObject({
    id: "ShipsGallery",
    type: ShipsGallery,
    position: {x:SpawnX+45,y:SpawnY+track.Spawn_direction,z:-2.5},
    scale: {x:49,y:49,z:36},
    rotation: {x:600,y:0,z:0}
  });

  if (public_event) {
    game.setObject({
      id: "AboutESRL",
      type: AboutESRL,
      position: {x:SpawnX-5,y:SpawnY+track.Spawn_direction,z:-2.5},
      scale: {x:49,y:49,z:36},
      rotation: {x:600,y:0,z:0}
    });
  }
    
  game.setObject({
    id: "TrackInfo:" + track.sname,
    type: TrackInfo[track.sname],
    position: {x:SpawnX-55,y:SpawnY+track.Spawn_direction,z:-2.5},
    scale: {x:49,y:49,z:36},
    rotation: {x:600,y:0,z:0}
  });
};

var hide_spawn_objects = function(game, track) {
  hide_spawn_switch(game);
  game.removeObject("ShipsGallery");
  game.removeObject("AboutMod");
  game.removeObject("TrackInfo:" + track.sname);
};


var addObjects = function(game) {
  show_spawn_objects(game);

  // comment out first logo - it's badly rendering sometimes
  // TODO: check it later
  // var step = 50;
  // addSRCLogo(
    // checkpoints[0].x + step * Math.cos(checkpoints[0].direction),
    // checkpoints[0].y + step * Math.sin(checkpoints[0].direction)
  // );
  for (var i = 1; i < checkpoints.length; i++) {
    addSRCLogo(checkpoints[i].x, checkpoints[i].y);
  }

  for (var y=0;y<map_lines.length;y++)
  {
    var line = map_lines[y];

    for (var x=0;x<line.length;x++)
    {
      var px =  (x+0.5-map_size/2)*10;
      var py =  (map_size-y-1+0.5-map_size/2)*10;

      switch (line.charAt(x))
      {
        case "R":
          game.setObject({id: "R"+px+":"+py,
            type:arrow,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:Math.PI/2}
          });
          break;
        case "U":
         game.setObject({id: "U"+px+":"+py,
            type:arrow,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:Math.PI}
          });
          break;
        case "L":
         game.setObject({id: "L"+px+":"+py,
            type:arrow,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:Math.PI*1.5}
          });
          break;
        case "D":
          game.setObject({id: "D"+px+":"+py,
            type:arrow,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:0}
          });
          break;
        case "I":
          game.setObject({id: "I"+px+":"+py,
            type:startline,
            position: {x:px,y:py,z:-2},
            scale: {x:40,y:40,z:40},
            rotation: {x:0,y:0,z:Math.PI*0.5 + checkpoints[0].direction}
          });
          break;
        case "B":
          game.setObject({id: "B"+px+":"+py,
            type:startblock,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:Math.PI*0.5 + checkpoints[0].direction}
          });
          break;
        case "T":
          game.setObject({id: "T"+px+":"+py,
            type: DRSZone,
            position: {x:px,y:py,z:-2},
            scale: {x:29,y:23,z:26},
            rotation: {x:Math.PI,y:0,z:Math.PI*0.5}
          });
          break;
        case "H":
          game.setObject({id: "H"+px+":"+py,
            type: DRSHoriz,
            position: {x:px,y:py,z:-2},
            scale: {x:33,y:25,z:26},
            rotation: {x:Math.PI,y:0,z:0}
          });
          break;
        case "M":
          game.setObject({id: "M"+px+":"+py,
            type: DRSMirror,
            position: {x:px,y:py,z:-2}, 
            scale: {x:29,y:23,z:26},
            rotation: {x:Math.PI,y:0,z:Math.PI*0.5}
          });
          break;
      }
    }
  }
};

var formatLapTime = function(time) {
  if (!time || time > 10000) {
    return "-";
  }
  time = Math.round(time*1000);
  var cents = time%1000;
  var seconds = Math.floor(time/1000)%60;
  var minutes = Math.floor(time/60000);
  if (cents<10) cents = "0"+cents;
  if (cents<100) cents = "0"+cents;
  if (seconds<10) seconds = "0"+seconds;
  return minutes+":"+seconds+":"+cents;
};

var formatMinutesSeconds = function(time) {
 var seconds = time%60;
 var minutes = Math.floor(time/60);
 if (seconds<10) seconds = "0"+seconds;
 return minutes+":"+seconds;
};


// Tools

var mod_this = this;
var modding = game.modding;
var terminal = game.modding.terminal;

var echo, color_message, color_echo, color_name, color_echo_with_name, fatal_error, error, error_message, style_error;

if (public_event) {
  echo = color_message = color_echo = color_name = color_echo_with_name = fatal_error = error = error_message = style_error = function() {
    return;
  }
} else {
  // Disable debug messages in terminal (tick time & data sent)
  modding.tick = function(t) {
    this.game.tick(t);
    if (this.context.tick != null) {
      this.context.tick(this.game);
    }
  };

  echo = function(...args) {
    terminal.echo(...args);
  };

  // Color terminal output

  color_message = function(message, color, style, background) {
    if (!color) {
      color = "";
    }
    if (!style) {
      style = "";
    }
    if (!background) {
      background = "";
    }
    return `[[${style};${color};${background}]${message}]`;
  };

  color_echo = function(message, color, style, background) {
    echo(color_message(message, color, style, background));
  };

  color_name = function(index, name, color) {
    return color_message(index, color, "b") + color_message(" | ", color) + color_message(name, color, "b");
  };

  color_echo_with_name = function(message, index, name, color) {
    echo(color_message(message + " ", color) + color_name(index, name, color));
  };

  var patch_error = function() {
    if (!terminal.error.old) {
      function error(message, options) {
        var stop;
        if (message instanceof Error) {
          var lines = message.stack.split("\n");
          message = lines[0] + "\n";
          if (lines.length > 1) {
            var position = lines[1].match(/<anonymous>:(\d+):(\d+)\)$/);
            if (position) {
              message += `  at line: ${position[1]}, column: ${position[2]}\n`;
            }
          }
          console.error(message);
          stop = !modding.field_view;
        } else {
          stop = modding.context && modding.context.stop;
        }
        error.old.call(this, message, options);
        if (stop) {
          modding.context = null;
          throw "Mod stopped";
        }
      }
      error.old = terminal.error;
      terminal.error = error;
    }
  };

  patch_error();

  fatal_error = function(message) {
    mod_this.stop = !modding.field_view;
    throw "\nFatal Error: " + message + "\n";
  };

  error = function(message) {
    terminal.error("Error: " + message);
  };

  error_message = function(message) {
    message = "Error: " + message;
    var regex = /(|[\s\S]*?[^\\])(\[\[[^;\[\]]*;[^;\[\]]*;[^;\[\]]*(?:;[^;\[\]]*)?\](?:|[\s\S]*?[^\\])\])/y;
    var match;
    var out = "";
    var last = 0;
    while (match = regex.exec(message)) {
      if (match[1].length > 0) {
        out += `[[;;;error]${match[1]}]${match[2]}`;
      } else {
        out += match[2];
      }
      last = regex.lastIndex;
    }
    var out_last = message.substring(last);
    if (out_last.length > 0) {
      out += `[[;;;error]${out_last}]`;
    }
    return out;
  };

  style_error = function(message, style, background) {
    if (!style) {
      style = "";
    }
    if (!background) {
      background = "";
    }
    return `[[${style};;${background};error]${message}]`;
  };
}

var format_time = function(date) {
  var hh = date.getHours();
  var mi = date.getMinutes();
  var ss = date.getSeconds();
  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mi < 10) {
    mi = "0" + mi;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  return `${hh}:${mi}:${ss}`;
};

// Instructor tools

var hide_race_info = function(ship) {
  if (race_info.forced) {
    return;
  }
  var visible = race_info.visible;
  race_info.visible = false;
  if (ship == null) {
    for (var ship of game.ships) {
      if (ship.alive && !ship.custom.hide_race_info) {
        ship.custom.hide_race_info = true;
        ship.setUIComponent(race_info);
      }
    }
  } else if (!ship.custom.hide_race_info) {
    ship.custom.hide_race_info = true;
    ship.setUIComponent(race_info);
  }
  race_info.visible = visible;
};

var show_race_info = function(ship) {
  if (ship.custom.spectator) {
    return;
  }
  if (ship == null) {
    for (var ship of game.ships) {
      if (ship.alive && ship.custom.hide_race_info) {
        ship.custom.hide_race_info = false;
        ship.setUIComponent(race_info);
      }
    }
  } else if (ship.custom.hide_race_info) {
    ship.custom.hide_race_info = false;
    ship.setUIComponent(race_info);
  }
};

var update_race_info = function(ship, forced, spectators) {
  race_info.forced = !!forced;
  if (ship == null) {
    for (var ship of game.ships) {
      if (!ship.alive || (ship.custom.spectator && !spectators)) {
        continue;
      }
      if (forced || !ship.custom.hide_race_info) {
        ship.setUIComponent(race_info);
      }
    }
  } else if (forced || !ship.custom.hide_race_info) {
    ship.setUIComponent(race_info);
  }
};

var instructor_cleaner = function(message) {
  var newlines = Math.min(5, message.length);
  var i;
  for (i = 0; i < newlines; i++) {
    if (message[message.length - i - 1] != "\n") {
      break;
    }
  }
  return "\n".repeat(newlines - i);
};

// Global commands

var instructor = function(message, time = 15, character = "Lucina", cancel_old_action = false, timeout_action = null) {
  if (typeof message !== "string" && message) {
    message = String(message);
  }
  if (!message || message.length === 0) {
    error("Empty instructor message");
    return;
  }
  clearTimeout(game.custom.instructor_timer);
  for (var ship of game.ships) {
    if (ship.alive) {
      clearTimeout(ship.custom.instructor_timer);
      ship.custom.instructor_timer = 0;
      ship.showInstructor();
      ship.instructorSays(message, character);
    }
  }
  // hide_race_info();
  var cleaner = instructor_cleaner(message);
  game.custom.instructor_func = function() {
    for (var ship of game.ships) {
      if (ship.alive && !ship.custom.instructor_timer) {
        if (cleaner.length > 0) {
          ship.instructorSays(cleaner, character);
        }
        ship.hideInstructor();
        // show_race_info(ship);
      }
    }
    game.custom.instructor_timer = 0;
  };
  game.custom.instructor_timer = setTimeout(game.custom.instructor_func, time * 1000);
  if (cancel_old_action) {
    clearTimeout(game.custom.instructor_action_timer);
  }
  if (typeof timeout_action === "function") {
    game.custom.instructor_action_func = function() {
      timeout_action();
      game.custom.instructor_action_timer = 0;
    };
    game.custom.instructor_action_timer = setTimeout(game.custom.instructor_action_func, time * 1000);
  }
};

var instructor_reset = function() {
  if (game.custom.instructor_timer) {
    game.custom.instructor_func();
    if (game.custom.instructor_action_timer) {
      game.custom.instructor_action_func();
    }
  }
  for (var ship of game.ships) {
    if (ship.alive) {
      ship_instructor_reset(ship);
    }
  }
};

var find_ship = function(ship) {
  var ship_number = -1;
  if (typeof ship === "number") {
    ship_number = ship;
    ship = game.ships[ship-1];
    if (ship == null) {
      error(`Ship ${ship_number} not found`);
    }
  } else if (typeof ship === "object" && ship != null) {
    ship_number = game.ships.indexOf(ship);
    if (ship_number < 0) {
      error(`Ship not found`);
      ship = null;
    } else {
      ship_number++;
    }
  } else {
    error(`Wrong "ship" argument type`);
    ship = null;
  }
  return [ship, ship_number];
};

var ship_instructor = function(ship, message, time = 15, character = "Lucina") {
  [ship] = find_ship(ship);
  if (!ship) {
    return;
  }
  clearTimeout(ship.custom.instructor_timer);
  ship.showInstructor();
  ship.instructorSays(message, character);
  // hide_race_info(ship);
  var cleaner = instructor_cleaner(message);
  ship.custom.instructor_func = function() {
    if (cleaner.length > 0) {
      ship.instructorSays(cleaner, character);
    }
    ship.hideInstructor();
    // show_race_info(ship);
    ship.custom.instructor_timer = 0;
  };
  ship.custom.instructor_timer = setTimeout(ship.custom.instructor_func, time * 1000);
};

var ship_instructor_reset = function(ship) {
  if (ship.custom.instructor_timer) {
    ship.custom.instructor_func();
  }
};

var warnings = [
  "\nWarning! (rule 1)\nDangerous driving!\nIf you continue, you will be removed from leaderboard, then kicked\n",
  "\nWarning! (rule 2)\nTrolling detected!\nContinue - instant kick!\n\n",
];

var warn = function(ship, rule, time = 25, character = "Zoltar") {
  if (rule < 1 || rule > warnings.length) {
    error(`Unknown rule number (should be 1 to ${warnings.length})`);
    return;
  }
  rule--;
  ship_instructor(ship, warnings[rule], time, character);
};

var flags = {
  Y: {
    message: "\n\nYellow flag!\nCation: some problem detected.\nDrive carefully and with respect for others.\n",
    time: 25,
    character: "Maria",
  },
  R: {
    message: "\n\nRed flag!\nRace will be stopped either due to a critical bug or because of huge trolling! :(\nPlease wait for restart",
    time: 40,
    character: "Zoltar",
  },
  G: {
    message: "\n\n\nGreen flag!\nRace continues\n\n",
    time: 15,
    character: "Klaus",
  },
  VSC: {
    message: "\n\n\nVirtual safety car!\nAll ships are immobilized\n(for 10-30 sec)\nI need to kick a troll or there was an incident which I have to fix.",
    time: 30,
    character: "Maria",
    idle: true,
  },
};

var flag = function(flag) {
  var found = false;
  var lc_flag = String(flag).toLowerCase();
  for (var key of Object.keys(flags)) {
    if (key.toLowerCase() === lc_flag) {
      found = true;
      break;
    }
  }
  if (!found) {
    error("Unknown flag: " + flag);
    return;
  }

  function idle_ships() {
    for (var ship of game.ships) {
      if (ship.alive && !ship.custom.spectator) {
        // TODO: change ship.type to fixed/locked ship
        // (maybe don't use idle at all)
        // because other players can join and they won't be idle
        // alt way: set some game flag and check it for newly joined players and set them idle as well
        ship.set({idle:true,vx:0,vy:0});
      }
    }
    afk_check.disable(true);
  }
  function reset_ships() {
    for (var ship of game.ships) {
      if (ship.alive && !ship.custom.spectator) {
        ship.set({idle:false});
      }
    }
    afk_check.enable(true);
  }

  var timeout_action = null;
  if (flags[key].idle) {
    idle_ships();
    timeout_action = reset_ships;
  } else {
    reset_ships();
  }
  instructor(flags[key].message, flags[key].time, flags[key].character, true, timeout_action);
};

var kick_position = 10 * map_size / 2;
kick_position = {x: -kick_position, y: kick_position};

var space = num => " \u2063".repeat(num);
var kick_message = {
  "": "Kick!" + space(46),
  " ":"You were kicked because violated game rules" + space(7)
};
var late_message = {
  "": "You were kicked" + space(35),
  " ":"Sorry, you are late, race is already running" + space(10)
};

var kick = function(ship, message_object) {
  [ship] = find_ship(ship);
  if (!ship) {
    return;
  }
  outlap.clear_outlap(ship);
  clearTimeout(ship.custom.instructor_timer);
  ship.custom.afk_init_step = 0;
  ship.custom.afk_seconds = 0;
  ship.custom.afk = false;
  ship.custom.troll_step = 0;
  ship.custom.troll = false;
  // TODO: fix kill - set infinite shield regen for all ships, make ships vulnerable
  // ship.set({x: kick_position.x, y: kick_position.y, kill: true});
  if (typeof message_object === "object" && message_object !== null) {
    ship.gameover(message_object);
  } else {
    ship.gameover(kick_message);
  }
};

var type = function(ship, type = null) {
  var [ship, ship_number] = find_ship(ship);
  if (!ship) {
    return;
  }

  if (type) {
    if (typeof type !== "number") {
      error(`"type" argument is not a number`);
      return;
    }
    // Shift ship.type for level 1 ships
    // (because of hidden starting ship 101)
    var type_real = type;
    if (type > 99 && type < 200 && ship_codes.includes(type + 1)) {
      type_real = type + 1;
    } else if (!all_ship_codes.includes(type)) {
      error(`Unknown ship type: ${type}`);
      return;
    }
    echo(`Set ship ${ship_number} type to: ${type}`);
    ship.set({type: type_real});
    ship.custom.spectator = spectator_codes.includes(type_real);
  } else {
    type = ship.type;
    // Shift ship.type for level 1 ships
    // (because of hidden starting ship 101)
    if (type > 99 && type < 200 && ship_codes.includes(type)) {
      type--;
    }
    echo(`Ship ${ship_number} type: ${type}`);
  }
};

var spec = function(ship) {
  if (!ship) {
    if (game.ships.length === 0) {
      error("No ships in game");
      return;
    }
    var ship_number = 0;
    var ship = game.ships[0];
    for (var i = 1; i < game.ships.length; i++) {
      var test_ship = game.ships[i];
      if (test_ship.id < ship.id) {
        ship = test_ship;
        ship_number = i;
      }
    }
    ship_number++;
  } else {
    var [ship, ship_number] = find_ship(ship);
    if (!ship) {
      return;
    }
  }
  if (ship.custom.spectator) {
    error(`Ship ${ship_number} is already a spectator`);
    return;
  }
  echo(`Make ship ${ship_number} a spectator`);
  ship.set({vx: 0, vy: 0, type: spectator_codes[0], collider: false});
  ship.custom.spectator = true;
  ship.custom.allow_switch = true;
  // ship.setUIComponent(change_button);
  ship.setUIComponent(change_button_hidden);
  reset_ship(ship);
  ship_instructor_reset(ship);
  var num = Math.ceil(spectators_level);
};

var unspec = function(ship) {
  if (!ship) {
    for (var ship of game.ships) {
      if (ship.custom.spectator) {
        unspec(ship);
      }
    }
    return;
  }
  var [ship, ship_number] = find_ship(ship);
  if (!ship) {
    return;
  }
  if (!ship.custom.spectator) {
    error(`Ship ${ship_number} is already not a spectator`);
    return;
  }
  echo(`Make ship ${ship_number} a regular ship`);
  reset_ship(ship);
  // TODO: remember previous ship choice, revert it here
  ship.set({type: ship_codes[0], collider: true});
  ship.custom.spectator = false;
  ship.custom.allow_switch = false;
  ship.setUIComponent(change_button_hidden);
};

// Add global functions to terminal commands
// Allowed params: strings, numbers, null / false / true

var commands = {
  instructor,
  flag,
  warn,
  kick,
  type,
  spec,
  unspec,
};

var command_function = function(line) {
  line = line.trim();
  var match = line.match(/^([^\s,]+)(?:\s+(\S[\s\S]*)?)?$/);
  if (!match) {
    error(`Can't extract command name from call string:\n"${line}"`);
    return;
  }
  var command = match[1];
  if (typeof commands[command] !== "function") {
    error(`Function is missing in command list: "${command}"`);
    return;
  }

  line = match[2];
  if (!line) {
    commands[command].apply(this);
    return;
  }

  var args = [];

  var replacer = {
    '\\n': '\n',
    '\\"': '"',
  };
  var prep_regex = new RegExp(Object.keys(replacer).join("|"), "g");

  function prepare_string(str) {
    return str.replace(prep_regex, m => replacer[m]);
  }

  function parse_args(args_string) {
    args_string = args_string.trim();
    if (args_string.length > 0) {
      for (var val of args_string.split(/[, ] */)) {
        if (val.length > 0) {
          if (val === "null") {
            val = null;
          } else if (val === "false") {
            val = false;
          } else if (val === "true") {
            val = true;
          } else {
            var num = Number(val);
            if (!isNaN(num) && !isNaN(parseFloat(val))) {
              val = num;
            } else {
              val = prepare_string(val);
            }
          }
        }
        args.push(val);
      }
    }
  }

  var regex = /(|[\s\S]*?[^\\])"(|[\s\S]*?[^\\])"/y;
  var last = 0;
  while (match = regex.exec(line)) {
    if (match[1].length > 0) {
      parse_args(match[1]);
    }
    args.push(prepare_string(match[2]));
    last = regex.lastIndex;
  }
  var last_args = line.substring(last);
  if (last_args.length > 0) {
    parse_args(last_args);
  }

  commands[command].apply(this, args);
};

if (!public_event) {
  for (var [command, func] of Object.entries(commands)) {
    if (typeof func === "function") {
      game.modding.commands[command] = command_function;
    } else {
      error(`Function is missing for command: "${command}"`);
    }
  }
}

// Servicing functions

var announce_lap_record = function(lap_time, player) {
  instructor(`\nNew lap record!\n\n${lap_time} - ${player}\n\n`, 7, "Kan");
};

var troll_warning = "\nStop trolling or messing around on lap! Either stay in spawn-zone, or drive race laps.\nNext time will be kicked!\n";

var warn_troll = function(ship, time = 25, character = "Zoltar") {
  ship_instructor(ship, troll_warning, time, character);
};

// AFK check

var afk_check = {
  state: true,
  disable: function(with_idle = false) {
    if (!this.state) {
      return;
    }
    this.state = false;
    for (var ship of game.ships) {
      if (ship.alive && !ship.custom.spectator) {
        ship.custom.afk_init_step = 0;
        ship.custom.afk_seconds = 0;
        ship.custom.afk = false;
      }
    }
    var message = "AFK check disabled";
    if (with_idle) {
      message = "Ships are idle\n" + message;
    }
    color_echo(message, "Gold");
  },
  enable: function(with_idle = false) {
    if (this.state || game_type === games.testing) {
      return;
    }
    this.state = true;
    var message = "AFK check enabled";
    if (with_idle) {
      message = "Ships are no longer idle\n" + message;
    }
    color_echo(message, "Lime");
  },
  check: function(ship, index) {
    if (this.state && !ship.custom.on_spawn_zone) {
      if (Math.sqrt(Math.pow(ship.vx, 2) + Math.pow(ship.vy, 2)) < afk_speed) {
        if (!ship.custom.afk) {
          if (!ship.custom.afk_init_step) {
            ship.custom.afk_init_step = game.step;
          } else {
            ship.custom.afk_seconds = (game.step - ship.custom.afk_init_step) / 60;
            if (ship.custom.afk_seconds >= afk_timeout) {
              ship.custom.afk = true;
              color_echo_with_name("AFK:", index + 1, ship.name, "DarkOrange");
              afk_action(ship);
            }
          }
        }
      } else {
        ship.custom.afk_init_step = 0;
        ship.custom.afk_seconds = 0;
        if (ship.custom.afk) {
          ship.custom.afk = false;
          color_echo_with_name("No longer AFK:", index + 1, ship.name, "LimeGreen");
        }
      }
    }
  },
};

// Out lap detection

var outlap = {
  lap_map: null,
  spawn_zone: null,
  spawn_zone_map: null,
  lap_map_size: map_size * lap_map_precision,
  outlap_delay: outlap_delay * 1000,
  onlap_blink_time: onlap_blink_time * 60,
  pos_offset: 10 * map_size / 2,
  pos_div: 10 / lap_map_precision,
  init_lap_map: function(map) {
    var new_map = [];
    var map_lines = map.split("\n");
    if (map_lines.length !== map_size) {
      fatal_error("Mismatched map_size and number of custom_map lines");
    }
    this.lap_map = {};
    this.spawn_zone = [];
    this.spawn_zone_map = {};
    var map_y = 0;
    for (var line of map_lines) {
      if (line.length !== map_size) {
        fatal_error("Mismatched map_size and length of custom_map line " + (map_y + 1));
      }
      var spawn_zone_found = false;
      var safe_y_start = map_y * lap_map_precision;
      var safe_y_end = safe_y_start + lap_map_precision;
      var lap_y_start = safe_y_start - lap_map_overlap;
      var lap_y_end = safe_y_end + lap_map_overlap;
      var map_x = 0;
      for (var symbol of line) {
        if (symbol === "+") {
          spawn_zone_found = true;
          this.spawn_zone.push({x: map_x, y: map_y});
        } else if (!/\d/.test(symbol)) {
          var safe_x_start = map_x * lap_map_precision;
          var safe_x_end = safe_x_start + lap_map_precision;
          var lap_x_start = safe_x_start - lap_map_overlap;
          var lap_x_end = safe_x_end + lap_map_overlap;
          for (var y = safe_y_start; y < safe_y_end; y++) {
            if (!this.lap_map[y]) {
              this.lap_map[y] = {};
            }
            for (var x = safe_x_start; x < safe_x_end; x++) {
              this.lap_map[y][x] = 2; // safe zone
            }
          }
          for (var lap_y = lap_y_start; lap_y < lap_y_end; lap_y++) {
            var y = lap_y % this.lap_map_size;
            if (y < 0) {
              y += this.lap_map_size;
            }
            if (!this.lap_map[y]) {
              this.lap_map[y] = {};
            }
            for (var lap_x = lap_x_start; lap_x < lap_x_end; lap_x++) {
              var x = lap_x % this.lap_map_size;
              if (x < 0) {
                x += this.lap_map_size;
              }
              if (!this.lap_map[y][x]) {
                this.lap_map[y][x] = 1; // on lap
              }
            }
          }
        }
        map_x++;
      }
      if (spawn_zone_found) {
        line = line.replace(/\+/g, "9");
      }
      new_map.push(line);
      map_y++;
    }
    var empty_y = {};
    for (var y = 0; y < this.lap_map_size; y++) {
      if (!this.lap_map[y]) {
        this.lap_map[y] = empty_y;
      }
    }
    // TODO: add error handling for spawn_zone square
    var spawn_index = [];
    var spawn_start = this.spawn_zone[0];
    var spawn_end = this.spawn_zone[this.spawn_zone.length-1];
    spawn_start.x = (spawn_start.x + 1) * lap_map_precision - lap_map_overlap;
    spawn_start.y = (spawn_start.y + 1) * lap_map_precision - lap_map_overlap;
    spawn_end.x = spawn_end.x * lap_map_precision + lap_map_overlap;
    spawn_end.y = spawn_end.y * lap_map_precision + lap_map_overlap;
    for (var y = spawn_start.y; y < spawn_end.y; y++) {
      for (var x = spawn_start.x; x < spawn_end.x; x++) {
        var status = this.lap_map[y][x];
        if (status) {
          if (!this.spawn_zone_map[y]) {
            this.spawn_zone_map[y] = {};
          }
          this.spawn_zone_map[y][x] = true;
          if (status === 2) {
            spawn_index.push({x, y});
          }
        }
      }
    }
    for (var y = 0; y < this.lap_map_size; y++) {
      if (!this.spawn_zone_map[y]) {
        this.spawn_zone_map[y] = empty_y;
      }
    }
    this.spawn_zone = spawn_index;
    map = new_map.join("\n");
    return map;
  },
  lap_map_pos: function(ship) {
    var x = Math.trunc((this.pos_offset + ship.x) / this.pos_div) % this.lap_map_size;
    var y = Math.trunc((this.pos_offset - ship.y) / this.pos_div) % this.lap_map_size;
    if (x < 0) {
      x += this.lap_map_size;
    }
    if (y < 0) {
      y += this.lap_map_size;
    }
    return {x, y};
  },
  game_pos: function(position) {
    var x = (position.x + 0.5) * this.pos_div - this.pos_offset;
    var y = this.pos_offset - (position.y + 0.5) * this.pos_div;
    return {x, y};
  },
  bind_outlap: function(outlap, ship) {
    return function() {
      ship.custom.outlap_timer = 0;
      var { on_lap } = outlap.status(ship);
      if (on_lap) {
        ship.set({healing: false});
      } else {
        ship.set({
          x: ship.custom.safe_x,
          y: ship.custom.safe_y,
          vx: 0,
          vy: 0,
          invulnerable: outlap.onlap_blink_time,
          healing: false,
        });
      }
    }
  },
  clear_outlap: function(ship) {
    if (ship.custom.outlap_timer) {
      clearTimeout(ship.custom.outlap_timer);
      ship.custom.outlap_timer = 0;
      ship.set({healing: false});
    }
    // ZZZ: disabled, most probably not needed
    // can cause multiple excessive sets because of ping/lags
    // TODO: check if everything works without it now
    // else if (ship.healing) {
      // ship.set({healing: false});
    // }
  },
  set_safe: function(ship, position) { // = null) {
    // ZZZ: make sure it's ever needed
    // if (!position) {
      // position = this.lap_map_pos(ship);
    // }
    ship.custom.safe_x = ship.x;
    ship.custom.safe_y = ship.y;
    ship.custom.safe_lap_map_pos = position;
  },
  status: function(ship) {
    var position = this.lap_map_pos(ship);
    var status = this.lap_map[position.y][position.x];
    var on_lap = ship.custom.on_lap = !!status;
    var on_safe = ship.custom.on_safe = (status === 2);
    if (on_safe) {
      this.set_safe(ship, position);
    }
    return { position, status, on_lap, on_safe };
  },
  check: function(ship) {
    var { position, on_lap } = this.status(ship);
    // on lap / safe zone
    if (on_lap) {
      this.clear_outlap(ship);
      this.check_spawn_zone(ship, position);
    // out lap
    } else if (!ship.custom.outlap_timer && !ship.healing) {
      // ZZZ: disabled, far from optimal
      // TODO: remove && add one-time checks in other places
      //       and/or set_safe() calls during setTrack/nearby and ship init
      // position = ship.custom.safe_lap_map_pos;
      // if (!position || !this.lap_map[position.y][position.x]) {
        // ship.custom.safe_x = SpawnX;
        // ship.custom.safe_y = SpawnY;
        // ship.custom.safe_lap_map_pos = this.lap_map_pos({ x: SpawnX, y: SpawnY });
      // }
      ship.custom.outlap_timer = setTimeout(this.bind_outlap(this, ship), this.outlap_delay);
      ship.set({vx: 0, vy: 0, healing: true});
      if (ship.custom.allow_switch) {
        ship.custom.allow_switch = false;
        ship.setUIComponent(change_button_hidden);
      }
    }
  },
  check_spawn_zone: function(ship, position) {
    var status = this.spawn_zone_map[position.y][position.x];
    ship.custom.on_spawn_zone = status;

    // ship is in spawn-zone
    if (status) {
      // TODO: replace with "afk_check.reset(ship)" / "troll_check.reset(ship)"
      ship.custom.afk_init_step = 0;
      ship.custom.afk_seconds = 0;
      ship.custom.afk = false;
      ship.custom.troll_step = 0;
      ship.custom.troll = false;
    }

    if (allow_ship_switch && status) {
      if (!ship.custom.allow_switch) {
        ship.custom.allow_switch = true;
        ship.setUIComponent(change_button);
      }
    } else if (ship.custom.allow_switch) {
      ship.custom.allow_switch = false;
      ship.setUIComponent(change_button_hidden);
    }
  },
  clear_spawn_zone: function(ship) {
    ship.custom.on_spawn_zone = false;
    if (ship.custom.allow_switch) {
      ship.custom.allow_switch = false;
      ship.setUIComponent(change_button_hidden);
    }
  },
}

var checkShip = function(ship, index) {
  if (!ship.alive) {
    return;
  }

  if (!ship.custom.init) {
    ship.custom.init = true;
    // TODO: add spectator joining
    // (set ship to spectator for allowed players at game join, when needed)
    if (ship.custom.spectator) {
      spawn_ship(ship);
    } else {
      // reset starting ship from hidden to visible in tree
      if (ship.type === 101) {
        ship.set({type: starting_ship_switch, stats: 0});
      }
      if (game.custom.closed) {
        spawn_ship(ship, true);
        //ship.custom.spectator = true;
        if (rotate_tracks){
          ship_instructor(ship, "\n\nRace is already running,\nplease wait for next race, now you're spectator\n\n", 30, "Maria");
          setTimeout(function() {
            ship_instructor(ship, welcome_message[game_type], 60, "Lucina");
          }, 1000 * 10);
        } else {
          kick(ship, late_message);
        }
      } else {
        if (game.custom.status == "race_start") {
          if (pinned_ship) {
            ship.set({type: pinned_ship});
          }
          put_ship_on_grid(ship, index, true);
        } else if (game.custom.status == "race") {
          if (pinned_ship) {
            ship.set({type: pinned_ship});
          }
          // TODO ?
          // remake to new order of newly added ships during race only,
          // consider if other players still not left starting grid
          put_ship_on_grid(ship, index);
        } else {
          spawn_ship(ship);
        }
        ship_instructor(ship, welcome_message[game_type], 20, "Lucina");
      }
    }
  }

  if (ship.custom.spectator) {
    return;
  }

  afk_check.check(ship, index);
  outlap.check(ship);

  if (ship.custom.current_checkpoint == null)
  {
    ship.custom.current_checkpoint = 0;
    ship.custom.checkpoint_count = 0;
    ship.custom.lap_count = 0;
    ship.custom.checkpoint_time = 0;
    ship.custom.best_lap = 100000;
    if (ship.game.custom.status == "qualification") {
      race_info.components[0].value = "Qualification";
      race_info.visible = true;
      update_race_info(ship);
    }
  }

  if (checkCheckPoint(ship,checkpoints[ship.custom.current_checkpoint]))
  {
    if (ship.game.custom.status != "qualification" && ship.custom.lap_count>race_laps)
    {
    }
    else
    {
      if (checkpoint_times[ship.custom.checkpoint_count] == null)
      {
        checkpoint_times[ship.custom.checkpoint_count] = ship.game.step/60;
        ship.custom.checkpoint_delta = 0;
      }
      else
      {
        ship.custom.checkpoint_delta = Math.round(ship.game.step/60-checkpoint_times[ship.custom.checkpoint_count]);
      }
      ship.custom.checkpoint_count++;
      ship.custom.checkpoint_time = ship.game.step/60/3600;
    }
    if (ship.custom.current_checkpoint == 0)
    {
      ship.custom.lap_count++;
      if (!drs_enabled && ship.custom.lap_count === enable_drs_on_race_lap) {
        enable_drs();
      }
      if (ship.custom.lap_start != null)
      {
        var time = (game.step-ship.custom.lap_start-1+extra_bit)/60;
        if (ship.custom.best_lap == null || time<ship.custom.best_lap)
        {
          ship.custom.best_lap = time;
          if (ship.custom.lap_count <= race_laps)
          {
            var time_formatted = formatLapTime(time);
            lap_info.components[0].value = "Best lap! "+ time_formatted;
            ship.setUIComponent(lap_info);
            if (game.custom.lap_record == null || game.custom.lap_record > time) {
              game.custom.lap_record = time;
              announce_lap_record(time_formatted, ship.name);
            }
          }
        }
        else
        {
          if (ship.custom.lap_count <= race_laps)
          {
            lap_info.components[0].value = "Lap time: "+ formatLapTime(time);
            ship.setUIComponent(lap_info);
          }
        }
      }
      ship.custom.lap_start = game.step-1+extra_bit;
    }
    ship.custom.current_checkpoint = (ship.custom.current_checkpoint+1)%checkpoints.length;
    if (
      ship.custom.checkpoint_count === 2
      && race_info.components[0].value.length > 0
      && game.custom.status === "qualification"
    ) {
      race_info.components[0].value = "";
      race_info.visible = true;
      update_race_info(ship);
    }
    ship.custom.troll_step = 0;
    if (ship.custom.troll) {
      ship.custom.troll = false;
      color_echo_with_name("No longer troll:", index + 1, ship.name, "LimeGreen");
    }
  } else {
    if (!ship.custom.afk && game_type !== games.testing) {
      if (!ship.custom.troll && !ship.custom.on_spawn_zone) {
        if (!ship.custom.troll_step) {
          ship.custom.troll_step = troll_timeout * 60 + game.step;
        } else if (game.step >= ship.custom.troll_step) {
          ship.custom.troll = true;
          color_echo_with_name("Troll:", index + 1, ship.name, "Tomato");
          if (!ship.custom.troll_warning) {
            ship.custom.troll_warning = true;
            warn_troll(ship);
            respawn_ship(ship);
          } else {
            kick(ship);
          }
        }
      }
    } else {
      ship.custom.troll_step = 0;
      if (ship.custom.troll) {
        ship.custom.troll = false;
        // color_echo_with_name("Troll is gonna AFK:", index + 1, ship.name, "Orange");
      }
    }
  }

  if (ship.custom.lap_start != null)
  {
    var seconds = Math.floor((ship.game.step-ship.custom.lap_start-1+extra_bit)/60);
    if ((seconds>=5 || ship.custom.best_lap>10000) && seconds != ship.custom.seconds && ship.game.custom.status != "race_end")
    {
      ship.custom.seconds = seconds;
      var minutes = Math.floor(seconds/60);
      seconds = seconds%60;
      if (seconds<10) seconds = "0"+seconds;
      lap_info.components[0].value = minutes+":"+seconds;
      ship.setUIComponent(lap_info);
    }
  }
  else if (ship.game.custom.status == "qualification")
  {
    if (ship.custom.seconds != "Race for fastest lap")
    {
      ship.custom.seconds = "Race for fastest lap";
      lap_info.components[0].value = "Race for fastest lap";
      ship.setUIComponent(lap_info);
    }
  }
};

var createCheckPoint = function() {
  var x = game.ships[0].x;
  var y = game.ships[0].y;
  var direction = game.ships[0].r;
  // echo("{x:"+x+",y:"+y+",direction:"+direction+"}");
};

var extra_bit = 0;
var checkpoint_times = [];

var checkCheckPoint = function(ship,checkpoint) {
  var vx = Math.cos(checkpoint.direction);
  var vy = Math.sin(checkpoint.direction);
  var dx = ship.x-checkpoint.x;
  var dy = ship.y-checkpoint.y;
  var d = Math.sqrt(dx*dx+dy*dy);
  //echo(ship.y);
  var passed = false;
  if (d<checkpoint.width)
  {
    var projection = vx*dx+vy*dy;
    //echo(projection);
    if (ship.custom.projection != null)
    {
      if (ship.custom.projection<0 && projection>=0)
      {
        passed = true;
        extra_bit = (0-ship.custom.projection)/(projection-ship.custom.projection);
      }
    }
    ship.custom.projection = projection;
  }
  return passed;
};

var updateScoreboard = function(game) {
  scoreboard.components = [];
  var line = 0;
  if (game.custom.status == "qualification")
  {
    scoreboard.components.push({ type: "text",position: [0,line*10+1,100,8],color: "#FFF",value: "Qualification "+formatMinutesSeconds(game.custom.qualification_time)});
    line++;
  }
  else
  {
    scoreboard.components.push({ type: "text",position: [0,line*10+1,100,8],color: "#FFF",value: "Race" });
    line++;
  }
  for (var i=0;i<game.ships.length;i++)
  {
    var ship = game.ships[i];
    if (ship.custom.best_lap == null)
    {
      ship.custom.best_lap = 1000000;
    }
  }

  if (game.custom.status == "qualification")
  {
    game.ships.sort(function(a,b) { 
      if (a.custom.spectator || b.custom.spectator) {
        return !b.custom.spectator - !a.custom.spectator;
      } else {
        return a.custom.best_lap - b.custom.best_lap;
      }
    });
  }
  else
  {
    game.ships.sort(function(a,b) {
      if (a.custom.spectator || b.custom.spectator) {
        return !b.custom.spectator - !a.custom.spectator;
      } else {
        return (b.custom.checkpoint_count*1000-b.custom.checkpoint_time)-(a.custom.checkpoint_count*1000-a.custom.checkpoint_time);
      }
    });
  }

  var score = 10;
  var delta = 0;

  for (var i=0;i<game.ships.length;i++)
  {
    var ship = game.ships[i];
    if (ship.score != score)
    {
      ship.set({score:score});
    }
    score = Math.max(0,score-1);
  }

  for (var i=0;i<game.ships.length;i++)
  {
    if (line>=10)
    {
      break;
    }
    var ship = game.ships[i];
    if (game.custom.status != "qualification")
    {
      if (game.custom.status != "race_end" || ship.custom.lap_count>race_laps)
      {
        scoreboard.components.push({ type: "text", position: [0,line*10+1,14,8],color: "#FFF",align:"right",value:line+"."});
      }
      scoreboard.components.push({ type: "player",id: ship.id, position: [15,line*10+1.5,85,7],color: "#FFF",align:"left"});
      if (ship.custom.checkpoint_delta != null && ship.custom.checkpoint_delta>delta)
      {
        delta = ship.custom.checkpoint_delta;
        scoreboard.components.push({ type: "text",position: [80,line*10+1,18,8],color: "#FFF",value: "+"+delta+"''",align:"right"});
      }
    }
    else
    {
      scoreboard.components.push({ type: "player",id: ship.id, position: [0,line*10+1.5,60,7],color: "#FFF",align:"left"});
      if (ship.custom.best_lap != null)
      {
        scoreboard.components.push({ type: "text",position: [60,line*10+1,38,8],color: "#FFF",value: formatLapTime(ship.custom.best_lap),align:"right"});
      }
    }
    line += 1;
  }
};

var game_reset = function(second) {
  second = Math.trunc(second);
  setTrack(game, current_track);
  game.custom.status = "qualification";
  game.custom.race_end = false;
  game.custom.closed = false;
  game.custom.status_time = second + qualification_duration;
  game.custom.qualification_time = qualification_duration;
  game.custom.lap_record = null;
  enable_drs();
  for (var component of countdown.components) {
    component.fill = "#171717";
  }
  countdown.visible = false;
  game.setUIComponent(countdown);
};

var best_lap_time = function(ship) {
  var best_lap = ship.custom.best_lap;
  if (!best_lap) {
    return "-";
  }
  var best_lap_qual = ship.custom.best_lap_qual;
  if (best_lap_qual && best_lap_qual < best_lap) {
    return formatLapTime(best_lap_qual);
  }
  return formatLapTime(best_lap);
};

// game steps:
var manageGame = function(game,second) {
  if (game.custom.status == null)
  {
    game_reset(second);
  }
  switch (game.custom.status)
  {
    case "qualification":
      var t = Math.max(0,game.custom.status_time-second);
      game.custom.qualification_time = t;
      if (t == 0) {
        game.custom.status = "race_start";
        game.custom.status_time = second+race_start_delay;
        race_info.components[0].value = "Prepare for race!";
        // game.setOpen(false);
        update_race_info(null, true);
        createStartingGrid(game);
        if (show_championship_table) {
          resetTrackResult(current_track);
          var ship = game.ships[0];
          if (ship != null && ship.custom.best_lap < 10000) {
            setQualificationBonus(current_track,ship.id,ship.name,2);
          }
        }
      }
      break;

    case "race_start":
      t = Math.max(0, game.custom.status_time - second);
      if (t <= race_start_countdown) {
        countdown.visible = true;
        game.setUIComponent(countdown);
      }
      if (t == 0) {
        setTimeout(function() {
          countdown.visible = false;
          game.setUIComponent(countdown);
        }, 1000);
        startRace(game);
        game.custom.status = "race";
      } else {
        var num = countdown.components.length;
        if (t <= num) {
          countdown.components[num - t].fill = "#ff0000";
        }
      }
      break;

    case "race":
      if (!game.custom.closed) {
        if (game.step > game.custom.close_step) {
          game.custom.closed = true;
        }
      }
      for (var i=0;i<game.ships.length;i++)
      {
        var ship = game.ships[i];
        if (!ship.alive) {
          continue;
        }
        if (ship.custom.spectator) {
          if (game.custom.race_end) {
            if (!ship.custom.race_end) {
              ship.custom.race_end = true;
              race_info.components[0].value = "Checkered flag!";
              race_info.visible = true;
              update_race_info(ship, true);
            }
          } else {
            var text = game.ships[0].custom.race_info;
            if (text && ship.custom.race_info !== text) {
              ship.custom.race_info = text;
              race_info.components[0].value = text;
              race_info.visible = true;
              update_race_info(ship, true);
            }
          }
          continue;
        }
        if (ship.custom.lap_count>race_laps)
        {
          game.custom.status = "race_end";
          game.custom.race_end = true;
          game.custom.status_time = second+time_after_race;
          lap_info.components[0].value = "Checkered flag!";
          lap_info.visible = true;
          ship.game.setUIComponent(lap_info);
        }
        else
        {
          var pos = (i+1);
          if (i<positions.length)
          {
            pos = positions[i];
          }
          var text = pos+" - Lap "+ship.custom.lap_count+"/"+race_laps;
          if (ship.custom.race_info != text)
          {
            ship.custom.race_info = text;
            race_info.components[0].value = text;
            race_info.visible = true;
            update_race_info(ship);
          }
        }
      }
      break;

    case "race_end":
      t = Math.max(0,game.custom.status_time-second);
      for (var i=0;i<game.ships.length;i++)
      {
        var ship = game.ships[i];
        if (!ship.alive) {
          continue;
        }
        if (ship.custom.spectator && !ship.custom.race_end) {
          ship.custom.race_end = true;
          race_info.components[0].value = "Checkered flag!";
          race_info.visible = true;
          update_race_info(ship, true);
          continue;
        }
        var text;
        if (ship.custom.lap_count>race_laps)
        {
          if (i==0)
          {
            text = "P1, P1! Good job, perfect race!";
          }
          else
          {
            if (i<positions.length)
            {
              text = positions[i]+ " Place! Podium, almost win. Next time, try to take 1st position:)";
            }
            else
            {
              text = "P"+(i+1)+"!"+" Good driving, dude";
            }
          }
          if (!ship.custom.race_end) {
            ship.custom.race_end = true;
            spawn_ship(ship, true);
            var points = championship_points[i] || 0;
            if (show_championship_table) {
              setRacePoints(current_track,ship.id,ship.name,points);
            }
          }
        }
        else
        {
          var pos = (i+1);
          if (i<positions.length)
          {
            pos = positions[i];
          }
          text = pos+" - Lap "+ship.custom.lap_count+"/"+race_laps;
        }
        if (ship.custom.race_info != text)
        {
          ship.custom.race_info = text;
          if (t>30)
          {
            race_info.components[0].value = text;
            race_info.visible = true;
            update_race_info(ship);
          }
          lap_info.components[0].value = text;
          lap_info.visible = true;
          ship.setUIComponent(lap_info);
        }
      }

      if (t == end_message_time) {
        race_info.components[0].value = "Checkered flag, Race End!";
        race_info.visible = true;
        update_race_info(null, true);
        if (show_championship_table) {
          hide_spawn_objects(game, track);
          // DEBUG:
          // echo(JSON.stringify(global_results));
          // echo(JSON.stringify(createResultTable()));
          displayChampionshipTable(createResultTable());
        }
      } else if (rotate_tracks && t == 3) {
        race_info.components[0].value = "Next Race!";
        race_info.visible = true;
        update_race_info();
      } else if (t == 0) {
        if (show_championship_table) {
          hideChampionshipTable();
        }
        if (rotate_tracks) {
          current_track = (current_track+1)%tracks.length;
          game_reset(second);
        }

        instructor_reset();
        var leader_lap = best_lap_time(game.ships[0]);
        for (var i = 0; i < game.ships.length; i++) {
          var ship = game.ships[i];
          var rank = i < positions.length ? positions[i] : ((i+1)+"th");
          var lap = best_lap_time(ship);
          if (rotate_tracks) {
            if (ship.alive) {
              reset_ship(ship);
              spawn_ship(ship);
              if (!ship.custom.spectator) {
                ship.intermission({
                  "Your rank": rank,
                  "Your best lap": lap
                });
              }
            }
          } else {
            if (ship.custom.spectator) {
              ship.gameover({
                "Leader rank": positions[0],
                "Leader best lap": leader_lap
              });
            } else {
              ship.gameover({
                "Your rank": rank,
                "Your best lap": lap
              });
            }
          }
        }
      }
      break;
  }
};

var changeShip = function(ship) {
  if (
    ship.custom.allow_switch
    && (!ship.custom.next_switch || game.step >= ship.custom.next_switch)
  ) {
    ship.custom.next_switch = game.step + ship_switch_delay;
    var next_type = ship_switch[ship.type];
    if (next_type) {
      ship.set({type: next_type});
    }
  }
};


var spawn_ship = function(ship, idle) {
  // TODO: rewrite whole function
  idle = !!idle;
  if (ship.custom.on_spawn_zone && !ship.custom.spectator) {
    if (pinned_ship) {
      ship.set({vx: 0, vy: 0, idle: idle, collider: !idle, generator: 300, type: pinned_ship});
    } else {
      ship.set({vx: 0, vy: 0, idle: idle, collider: !idle, generator: 300});
    }
    return;
  }
  // get random position on spawn-zone
  function get_spawn_pos() {
    return outlap.spawn_zone[Math.floor(Math.random() * outlap.spawn_zone.length)];
  }
  var spawn_pos;
  spawn_pos = get_spawn_pos();
  
  // if (ship.custom.spectator) {
    // spawn_pos = get_spawn_pos();
  // } else {
    // do {
      // spawn_pos = get_spawn_pos();

      // skip positions taken by other ships
      // ZZZ: disabled - may result in too many loops, wrong logic for spawning multiple ships
      // TODO: remade based on new logic from todo-list

      // for (var test_ship of game.ships) {
        // if (
          // test_ship !== ship
          // && test_ship.alive
          // && test_ship.custom.on_spawn_zone
        // ) {
          // if (
            // test_ship.custom.on_safe
            // || (!test_ship.custom.on_lap && test_ship.custom.safe_lap_map_pos)
          // ) {
            // var { x, y } = test_ship.custom.safe_lap_map_pos;
          // } else {
            // var { x, y } = outlap.lap_map_pos(test_ship);
          // }
          // if (
            // Math.abs(x - spawn_pos.x) < lap_map_precision &&
            // Math.abs(y - spawn_pos.y) < lap_map_precision
          // ) {
            // spawn_pos = null;
            // break;
          // }
        // }
      // }
    // } while (spawn_pos == null);
  // }
  var { x, y } = outlap.game_pos(spawn_pos);
  
  //if (game.custom.closed) {
    //spec(ship();
  //}
  
  if (ship.custom.spectator) {
    ship.set({x: x, y: y, vx: 0, vy: 0});
  } else {
    if (pinned_ship) {
      ship.set({x: x, y: y, vx: 0, vy: 0, idle: idle, collider: !idle, generator: 300, type: pinned_ship});
    } else {
      ship.set({x: x, y: y, vx: 0, vy: 0, idle: idle, collider: !idle, generator: 300});
    }
    ship.custom.on_spawn_zone = true;
    outlap.set_safe(ship, spawn_pos);
    // ZZZ: disabled
    // TODO: implement proper fix for idle here
    // if (idle) {
      // setTimeout(function() {
        // ship.set({vx: 0, vy: 0});
      // }, 1000 * 2);
    // }
  }
};

var respawn_ship = function(ship) {
  spawn_ship(ship);
  if (ship.custom.lap_start != null) {
    ship.custom.lap_start = null;
    if (ship.custom.lap_count > 0) {
      ship.custom.lap_count--;
    }
    ship.custom.checkpoint_count -= ship.custom.current_checkpoint || checkpoints.length;
    if (ship.custom.checkpoint_count < 0) {
      ship.custom.checkpoint_count = 0;
    }
  }
  ship.custom.current_checkpoint = 0;
  ship.custom.checkpoint_delta = 0;
};

var hide_ui = function(ship) {
  ship.custom.race_info = "";
  race_info.components[0].value = "";
  race_info.visible = true;
  update_race_info(ship, true);
  lap_info.components[0].value = "";
  lap_info.visible = true;
  ship.setUIComponent(lap_info);
};

var full_reset_ship = function(ship) {
  hide_ui(ship);
  ship_instructor_reset(ship);
  var spectator = ship.custom.spectator;
  ship.custom = {};
  if (spectator) {
    ship.custom.spectator = true;
  }
  // TODO: add saving of ui_labels
};

var reset_ship = function(ship) {
  ship.custom.current_checkpoint = null;
  ship.custom.checkpoint_count = 0;
  ship.custom.checkpoint_time = 0;
  ship.custom.checkpoint_delta = 0;
  ship.custom.best_lap_qual = null;
  ship.custom.best_lap = 100000;
  ship.custom.lap_start = null;
  ship.custom.lap_count = 0;
  ship.custom.race_end = false;

  outlap.clear_outlap(ship);
  outlap.clear_spawn_zone(ship);

  ship.custom.afk_init_step = 0;
  ship.custom.afk_seconds = 0;
  ship.custom.afk = false;
  ship.custom.troll_step = 0;
  ship.custom.troll = false;

  hide_ui(ship);

  ship.set({idle: false});
};

var put_ship_on_grid = function(ship, index, idle) {
  ship.custom.current_checkpoint = 0;
  ship.custom.lap_count = 0;
  ship.custom.checkpoint_count = 0;
  ship.custom.checkpoint_time = 0;
  ship.custom.lap_start = null;
  ship.custom.checkpoint_delta = 0;
  ship.emptyWeapons();
  index = index % 2;
  ship.set({
    x: starting_grid.x[index],
    y: starting_grid.y[index],
    vx: 0,
    vy: 0,
    idle: !!idle,
    angle: starting_grid.angle,
    generator: 0
  });
  starting_grid.next_position();
};

var createStartingGrid = function(game) {
  disable_drs();
  afk_check.disable(true);
  game.custom.lap_record = null;
  allow_ship_switch = false;
  hide_spawn_switch(game);
  var index = 0;
  for (var ship of game.ships) {
    if (ship.alive && !ship.custom.spectator) {
      put_ship_on_grid(ship, index, true);
      index++;
    }
  }
};

var startRace = function(game) {
  for (var ship of game.ships) {
    if (ship.alive && !ship.custom.spectator) {
      ship.set({idle:false});
      ship.custom.current_checkpoint = 0;
      ship.custom.lap_count = 0;
      ship.custom.checkpoint_count = 0;
      ship.custom.checkpoint_time = 0;
      ship.custom.lap_start = null;
      ship.custom.checkpoint_delta = 0;
      ship.custom.best_lap_qual = ship.custom.best_lap;
      ship.custom.best_lap = 100000;
      ship.custom.race_info = "";
      race_info.components[0].value = "";
      update_race_info(ship, true);
    }
  }
  checkpoint_times = [];
  afk_check.enable(true);
  game.custom.close_step = game.step + race_close_time - 1;
};


// Prepare ships

var generator_params = {
  global: { generator_reload: 1e-300 }
};

var array_specs;
var sort_specs = function(specs, ship_key) {
  // array specs - "spec":[min, max]
  array_specs = {
    dash_speed:        specs.ship.dash.speed,
    dash_acceleration: specs.ship.dash.acceleration,
    generator_reload:  specs.generator.reload,
  };
  // check specs
  for (var [param, spec] of Object.entries(array_specs)) {
    if (!Array.isArray(spec)) {
      fatal_error(
        `Can't find array spec in ship "${ship_key}" for param "${param}"\n` +
        `Check ship code and "sort_specs" function`
      );
    }
  }
};

var unknown_params = {};
var set_params = function (params) {
  if (params) {
    for (var [param, value] of Object.entries(params)) {
      if (value) {
        var spec = array_specs[param];
        if (spec) {
          spec[0] = spec[1] = value;
        } else if (!unknown_params[param]) {
          unknown_params[param] = true;
          error(`Unknown ship param "${param}"`);
        }
      }
    }
  }
};

var game_ships = [];
var levels = {};

var parse_ship = function(key, ship) {
  try {
    return JSON.parse(ship);
  } catch (e) {
    fatal_error(`Can't parse JSON code of ship "${key}"`);
  }
};

var prepare_ships = function(level, ships, params) {
  var ship_entries = Object.entries(ships);
  for (var entry of ship_entries) {
    var [key, ship] = entry;
    if (typeof ship === "string") {
      ship = parse_ship(key, ship);
    }
    // fix typespec if necessary
    // also required for set params below
    ship.typespec.specs = ship.specs;

    if (params && (params[key] || params.global)) {
      sort_specs(ship.specs, key);
      if (params[key]) {
        set_params(params[key]);
      }
      if (params.global) {
        set_params(params.global);
      }
    }

    ship.typespec.level = ship.level = level;
    entry[1] = ship;
  }
  // sort entries by initial ship model
  ship_entries.sort((a, b) => a[1].model - b[1].model);
  return ship_entries;
};

var push_ships = function(ships_meta) {
  for (var {ship, model, code, next} of ships_meta) {
    ship.typespec.model = ship.model = model;
    ship.typespec.code = code;
    if (next) {
      next = [next, next];
    } else {
      next = [];
    }
    ship.typespec.next = ship.next = next;
    ship = JSON.stringify(ship);
    game_ships.push({ ship, code });
  }
};

var add_ships = function(level, ships, params = null, model_shift = 0, repeat = 1) {
  var ships_meta = [];
  var ship_codes = [];
  var ship_switch = {};
  var ship_entries = prepare_ships(level, ships, params);
  var len = ship_entries.length;
  // set "next" only for ships with integer level
  var set_next = Number.isInteger(level);
  var model_step = model_shift;
  for (var i = 0; i < repeat; i++) {
    for (var [key, ship] of ship_entries) {
      var model = ship.model + model_step;
      var code = level * 100 + model;
      ship_codes.push(code);
      // set sequential switch order,
      // set sequential "next" for all ships except the last
      // (by using saved meta of previous ship)
      if (meta) {
        ship_switch[meta.code] = code;
        if (set_next) {
          meta.next = code;
        }
      }
      var meta = { key, ship, level, model, code, next: null };
      ships_meta.push(meta);
    }
    model_step = model;
  }
  ship_switch[code] = ship_codes[0]; // loop switch
  push_ships(ships_meta);
  levels[level] = (levels[level] || 0) + len * repeat;
  return [ship_switch, ship_codes, ships_meta];
};

var add_ship = function(level, model, ship_wrapped, params = null, model_shift = 0, repeat = 1) {
  var [key, ship] = Object.entries(ship_wrapped)[0];
  ship = parse_ship(key, ship);
  ship.model = model;
  ship_wrapped = { [key]: ship };
  var [,,ships_meta] = add_ships(level, ship_wrapped, params, model_shift, repeat);
  return ships_meta[0];
};

var get_first_code = function(ships_meta, search_key) {
  var meta = ships_meta.find(({key, code}) => key == search_key);
  return meta && meta.code;
};

// shift level 1 models (because of hidden starting ship 101)
var model_shift = (ships_level === 1) ? 1 : 0;

var ship_params_final = {...ship_params[vehicle_type], ...generator_params};

var [ship_switch, ship_codes, ships_meta] = add_ships(ships_level, ships, ship_params_final, model_shift);
var [spectator_switch, spectator_codes] = add_ships(spectators_level, spectators);

// Combine switches
Object.assign(ship_switch, spectator_switch);

// Hidden starting ship 101
var {key} = add_ship(1.001, 0.9, starting_ship, ship_params_final);
var starting_ship_switch = get_first_code(ships_meta, key) || ship_codes[0];

// Starblast limitation:
// If we have level 2 ships - we must put level 1 ships as well
if (levels[2] && !levels[1]) {
  // put the same number of dummy ships - for visuality
  add_ships(1, dummy_ship, null, 1, levels[2]);
}

var all_ship_codes = [];

// Sort ships by code
game_ships = game_ships.sort((a, b) => a.code - b.code).map(val => {
  all_ship_codes.push(val.code);
  return val.ship;
});

// DEBUG:
// console.log("game_ships:");
// console.log(game_ships);
// console.log("ship_switch:");
// console.log(ship_switch);
// console.log("ship_codes:");
// console.log(ship_codes);
// console.log("ships_meta:");
// console.log(ships_meta);
// console.log("starting_ship_switch:");
// console.log(starting_ship_switch);
// fatal_error("DEBUG STOP");


this.options = {
  map_name: map_name,
  map_size: map_size,
  weapons_store: false,
  radar_zoom: 1,
  crystal_value: 0,
  ships: game_ships,
  choose_ship: ship_codes,
  reset_tree: true,
  asteroids_strength: 1e10,
  starting_ship: 800,
  healing_enabled: true,
  auto_refill: false,
  projectile_speed: 3,
  speed_mod: 1,
  starting_ship_maxed: true,
  power_regen_factor: 1,
  custom_map: "",
  invulnerable_ships: true,
  max_players: max_players,
  mines_destroy_delay: 60*50,
  soundtrack: "crystals.mp3",
  vocabulary: vocabulary,
};


var tick = function(game) {
  for (var i=0;i<game.ships.length;i++)
  {
    var ship = game.ships[i];
    checkShip(ship, i);
  }
  if (game.step%60 == 0)
  {
    manageGame(game,game.step/60);
    updateScoreboard(game);

   for (var i=0;i<game.ships.length;i++)
    {
      var ship = game.ships[i];
      ship.setUIComponent(scoreboard);
    }
  }
};

this.tick = tick;

this.event = function(event, game) {
  switch (event.name) {
    case "ui_component_clicked":
      var ship = event.ship;
      var component = event.id;
      if (component == "change" && ship != null) {
        changeShip(ship);
      }
      break;
    case "collectible_picked":
      this.collectible_picked(event.collectible);
      break;
  }
};


// Prepare DRS & collectibles

var removed_mitigation = `,\nincrease ${style_error("drs_creation_step", "b")} or disable ${style_error("drs_remove_collectibles", "b")}`;

var collectible_errors = {
  created: error_message("Removed collectible was created" + removed_mitigation),
  picked: error_message("Removed collectible was picked up by player" + removed_mitigation),
  not_created: error_message(`Collectible was not created within ${style_error("drs_creation_step", "b")} ticks`),
};

this.collectible_created = null;

var collectible_created = function(collectible, game) {
  if (collectible) {
    var drs = collectible.custom.drs;
    if (drs) {
      drs.error_step = 0;
      drs.respawn_step = game.step + drs_alive_step;
    }
  } else {
    echo(collectible_errors.created);
  }
};

var patch_collectibles = function() {
  if (!game.collectibleCreated) {
    return false;
  }
  if (!game.collectibleCreated.old) {
    function created(request_id, id) {
      var collectible = null;
      var collectibles = this.collectibles;
      for (var i = collectibles.length - 1; i >= 0; i--) {
        var col = collectibles[i];
        if (col.request_id === request_id) {
          col.id = id;
          collectible = col;
          break;
        }
      }
      var context = this.modding.context;
      if (context.collectible_created) {
        context.collectible_created(collectible, this);
      }
    }
    created.old = game.collectibleCreated;
    game.collectibleCreated = created;
  }
  return true;
};

if (!patch_collectibles()) {
  fatal_error("Unable to patch collectibles system");
}

var remove_collectible = function(collectible) {
  var collectibles = game.collectibles;
  for (var i = 0; i < collectibles.length; i++) {
    if (collectibles[i] === collectible) {
      collectibles.splice(i, 1);
      break;
    }
  }
};

var clear_collectibles = function() {
  game.collectibles = game.collectibles.filter(collectible => !collectible.killed);
};

var drs_set, drs_size, drs;

var prepare_drs = function(track) {
  drs_set = track.drs || drs;

  if (!Array.isArray(drs_set)) {
    drs_set = [];
    drs_size = 0;
    error(`DRS not found for track: ${track.sname}`);
    return;
  }

  drs_size = drs_set.length;
  if (drs_size === 0) {
    return;
  }

  for (var i = 0; i < drs_size; i++) {
    var d = drs_set[i];
    d.code = 90;
    d.index = i;
  }

  for (var i = drs_size; i < drs_max_number; i++) {
    var d = {...drs_set[i % drs_size]};
    d.index = i;
    drs_set.push(d);
  }
};

var respawn_drs = function(drs, clear_collectible) {
  if (clear_collectible && drs.collectible) {
    drs.collectible.killed = true;
  }
  drs.error_step = game.step + drs_creation_step;
  var collectible = game.addCollectible(drs);
  collectible.custom.drs = drs;
  drs.collectible = collectible;
};

var init_collectibles = max_collectibles - drs_max_number;

var drs_clear_tick, drs_clear_set, init_clear_set;
var drs_picked, drs_picked_disable, drs_picked_clear;
if (drs_remove_collectibles) {
  init_clear_set = function() {
    drs_clear_set = [];
    for (var {custom: {drs}} of game.collectibles) {
      if (drs) {
        drs_clear_set.push(drs);
      }
    }
  };
  drs_clear_tick = function(game) {
    if (game.collectibles.length <= init_collectibles) {
      return true;
    }
    var clear = false;
    for (var drs of drs_clear_set) {
      if (drs.error_step) {
        if (game.step >= drs.error_step) {
          clear = drs.killed = drs.collectible.killed = true;
        }
      } else if (drs.respawn_step && game.step >= drs.respawn_step) {
        clear = drs.killed = drs.collectible.killed = true;
      }
    }
    if (clear) {
      clear_collectibles();
      drs_clear_set = drs_clear_set.filter(drs => !drs.killed);
      if (game.collectibles.length <= init_collectibles) {
        return true;
      }
    }
    return false;
  };

  drs_picked = function(drs, collectible) {
    remove_collectible(collectible);
    respawn_drs(drs);
  };
  drs_picked_disable = function(drs, collectible) {
    remove_collectible(collectible);
    drs.error_step = 0;
    drs.respawn_step = 0;
    drs.collectible = null;
  };
  drs_picked_clear = function(drs, collectible) {
    drs_picked_disable(drs, collectible);
    for (var i = 0; i < drs_clear_set.length; i++) {
      if (drs_clear_set[i] === drs) {
        drs_clear_set.splice(i, 1);
        break;
      }
    }
  };
} else {
  drs_clear_tick = function(game) {
    return (game.collectibles.length <= init_collectibles);
  };

  drs_picked = function(drs, collectible) {
    respawn_drs(drs);
  };
  drs_picked_disable = function(drs, collectible) {
    drs.error_step = 0;
    drs.respawn_step = 0;
    drs.collectible = null;
  };
  drs_picked_clear = drs_picked_disable;
}

this.drs_picked = drs_picked_disable;

this.collectible_picked = function(collectible) {};

var collectible_picked = function(collectible) {
  if (collectible) {
    var drs = collectible.custom.drs;
    if (drs) {
      this.drs_picked(drs, collectible);
    }
  } else {
    echo(collectible_errors.picked);
  }
};

var init_drs_set = function() {
  for (var drs of drs_set) {
    drs.error_step = 0;
    drs.respawn_step = 0;
    drs.collectible = null;
  }
};

var drs_init_start = 0;

var drs_init_tick = function(game) {
  var drs_init_end = Math.min(drs_init_start + drs_size, drs_set.length);
  for (var i = drs_init_start; i < drs_init_end; i++) {
    respawn_drs(drs_set[i]);
  }
  if (drs_init_end === drs_set.length) {
    return true;
  }
  drs_init_start = drs_init_end;
  return false;
};

var drs_tick = function(game) {
  if (game.step % drs_check_step === 0) {
    var clear = false;
    for (var drs of drs_set) {
      if (drs.error_step) {
        if (game.step >= drs.error_step) {
          echo(collectible_errors.not_created);
          clear = drs_remove_collectibles;
          respawn_drs(drs, clear);
        }
      } else if (drs.respawn_step && game.step >= drs.respawn_step) {
        clear = drs_remove_collectibles;
        respawn_drs(drs, clear);
      }
    }
    if (clear) {
      clear_collectibles();
    }
  }
};

var game_tick = function(game) {
  drs_tick(game);
  tick(game);
};

var game_clear_tick = function(game) {
  if (game.step % drs_duplicate_step === 0) {
    if (drs_clear_tick(game)) {
      init_drs_set();
      this.drs_picked = drs_picked;
      if (drs_init_tick(game)) {
        this.tick = game_tick;
      } else {
        this.tick = game_init_tick;
      }
      game_tick(game);
      return;
    }
  }
  tick(game);
};

var game_init_tick = function(game) {
  if (game.step % drs_duplicate_step === 0) {
    if (drs_init_tick(game)) {
      this.tick = game_tick;
    }
  }
  game_tick(game);
};

var drs_enabled = false;

var disable_drs = function() {
  if (!drs_enabled) {
    return;
  }
  mod_this.tick = tick;
  mod_this.drs_picked = drs_picked_disable;
  drs_enabled = false;
};

var enable_drs = function() {
  if (init_clear_set) {
    init_clear_set();
  }
  mod_this.tick = game_clear_tick;
  mod_this.collectible_created = collectible_created;
  mod_this.collectible_picked = collectible_picked;
  mod_this.drs_picked = drs_picked_clear;
  drs_init_start = 0;
  drs_enabled = true;
};


// Reset game if mod was edited while running

if (game && game.step > 0) {
  var time = format_time(new Date());
  color_echo(`\n[${time}\\] Mod restart, game reset\n`, "Violet");
  game_reset(game.step / 60);
  instructor_reset();
  if (game_type === games.testing) {
    for (var ship of game.ships) {
      if (ship.alive) {
        if (ship.custom.spectator) {
          full_reset_ship(ship);
        } else {
          reset_ship(ship);
          // prevent "Qualification" label from appearing
          ship.custom.current_checkpoint = 0;
        }
      }
    }
  } else {
    for (var ship of game.ships) {
      if (ship.alive) {
        full_reset_ship(ship);
      }
    }
  }
}

if (game_type === games.testing) {
  if (game_type !== game.custom.last_game_type) {
    color_echo(welcome_message[game_type], "Tomato", "b");
  }
  afk_check.disable();
}

game.custom.last_game_type = game_type;


// ADDTHIS all below is the required functions for circular championship
var global_results = [];

if (show_championship_table) {
  for (var i=0;i<tracks.length;i++) {
    global_results[i] = {};
  }
}

var setPlayerResult = function(track,id,name,type,value) {
  var key = id+name;
  var res = global_results[track][key];
  if (res == null) {
    res = global_results[track][key] = {
      id: id,
      name: name,
    };
  }
  res[type] = value;
};

var setQualificationBonus = function(track,id,name,bonus) {
  setPlayerResult(track,id,name,"bonus",bonus);
};

var setRacePoints = function(track,id,name,points) {
  setPlayerResult(track,id,name,"points",points);
};

var resetTrackResult = function(track) {
  global_results[track] = {};
};

var createResultTable = function() {
  var players = {};
  var table = [];
  var online_ships = [];
  for (var ship of game.ships) {
    if (ship.alive) {
      online_ships.push(ship.id);
    }
  }
  for (var i=0;i<tracks.length;i++)
  {
    var keys = Object.keys(global_results[i]);
    for (var k=0;k<keys.length;k++)
    {
      var key = keys[k];
      var res = global_results[i][key];
      if (!online_ships.includes(res.id)) {
        continue;
      }

      if (players[key] == null)
      {
        players[key] = {
          name: res.name,
          id: res.id,
          points: [],
          bonus: [],
          total: 0
        }
        table.push(players[key]);
      }

      players[key].points[i] = res.points;
      players[key].bonus[i] = res.bonus;
      players[key].total += (res.points || 0) + (res.bonus || 0);
    }
  }


  table.sort(function(a,b) { return b.total-a.total ; });
  return table;
};

var championshipTable = {
  id:"championship_table",
  visible: true,
  position: [20,20,60,60],
  components: []
};

var displayChampionshipTable = function(table) {
  championshipTable.components = [];
  championshipTable.visible = true;
  var line = 0;
  var line_h = 100/17;

  championshipTable.components.push({ type: "text",position: [0,line_h*0.1,100,line_h*1.5],color: "#FFF",value: "CHAMPIONSHIP STANDINGS"});

  line = 2;
  championshipTable.components.push({ type: "box",position: [0,line_h*(line+0.1),100,line_h*0.9],fill:"hsla(200,50%,40%,0.8)"});

  championshipTable.components.push({ type: "text",position: [1,line_h*(line+0.1),38,line_h*0.9],align:"left",fill:"rgba(255,255,255,0.2)",color: "#FFF",value: "PILOT"});
  championshipTable.components.push({ type: "text",position: [40,line_h*(line+0.1),9,line_h*0.9],fill:"rgba(255,255,255,0.2)",color: "#FFF",value: "RACE"});

  var race_w = 40/tracks.length;
  for (var i=0;i<tracks.length;i++)
  {
    var x = 50+i*race_w;
    championshipTable.components.push({ type: "text",position: [x,line_h*(line+0.1),race_w-1,line_h*0.9],fill:"rgba(255,255,255,0.2)",color: "#FFF",value: (i+1)});
  }
  championshipTable.components.push({ type: "text",position: [90,line_h*(line+0.1),10,line_h*0.9],fill:"rgba(255,255,255,0.2)",color: "#FFF",value: "POINTS"});

  for (var p=0;p<Math.min(14,table.length);p++)
  {
    line += 1;
    var player = table[p];
    championshipTable.components.push({ type: "box",position: [0,line_h*(line+0.1),100,line_h*0.9],fill:"hsla(200,50%,20%,0.8)"});
    championshipTable.components.push({ type: "player",id: player.id, position: [1,line_h*(line+0.1),38,line_h*0.9],align:"left",fill:"rgba(255,255,255,0.2)",color: "#FFF",value:player.name});
    for (var i=0;i<tracks.length;i++)
    {
      var x = 50+i*race_w;
      var value = player.bonus[i]>0 ? (player.points[i]||0)+"+"+player.bonus[i] : player.points[i];
      if (value != null) {
        championshipTable.components.push({ type: "text",position: [x,line_h*(line+0.1),race_w-1,line_h*0.9],fill:"rgba(255,255,255,0.2)",color: "#FFF",value: value });
      }
    }
    championshipTable.components.push({ type: "text",position: [90,line_h*(line+0.1),10,line_h*0.9],fill:"rgba(255,255,255,0.2)",color: "#FFF",value: player.total });
  }

  var x = 50+current_track*race_w;
  championshipTable.components.push({ type: "box",position: [x,line_h*2,race_w,line_h*(line-1)],fill:"hsla(200,50%,100%,0.2)"});

  for (var i=0;i<game.ships.length;i++)
  {
    var ship = game.ships[i];
    ship.setUIComponent(championshipTable);
  }
};

var hideChampionshipTable = function(table) {
  championshipTable.components = [];
  championshipTable.visible = false;


    for (var i=0;i<game.ships.length;i++)
    {
      var ship = game.ships[i];
      ship.setUIComponent(championshipTable);
    }
};
