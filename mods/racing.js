var qualification_duration = 120 ;
var race_laps = 4 ;
var positions = ["1st","2nd","3rd"] ;
var collectibles = 1 ;
var time_after_race = 20 ;

var Booster_201 = '{"name":"Booster","level":2,"model":1,"size":1.4,"zoom":1,"designer":"Zerd","specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":180,"speed":[240,240],"rotation":[70,70],"acceleration":[100,100],"dash":{"rate":2,"burst_speed":[250,250],"speed":[330,330],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main1":{"section_segments":12,"offset":{"x":57,"y":-55,"z":-11},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0],"y":[-55,-33,-40,0,10,40,48,66,77,67],"z":[0,0,0,0,0,0,0,0,0,0,0]},"width":[0,6,15,20,14,14,20,20,15,0],"height":[0,6,15,20,14,14,20,20,15,0],"propeller":true,"texture":[4,18,10,63,8,63,11,12,17]},"main2":{"section_segments":12,"offset":{"x":0,"y":0,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-55,-60,-50,-20,10,15,45,75,60],"z":[-7,-7,-5,0,0,0,0,0,0]},"width":[0,8,15,25,25,20,20,14,0],"height":[0,6,10,15,18,18,18,14,0],"propeller":true,"texture":[12,63,10,1,5,8,12,17]},"cockpit":{"section_segments":8,"offset":{"x":0,"y":-48,"z":22},"position":{"x":[0,0,0,0,0,0],"y":[-5,10,30,60],"z":[-20,-8,0,0]},"width":[5,8,12,5],"height":[4,10,10,5],"propeller":false,"texture":[7,9,4,4]},"cannons":{"section_segments":6,"offset":{"x":20,"y":30,"z":15},"position":{"x":[0,0,0,0,0,0],"y":[-60,-70,-30,0,25,30],"z":[0,0,0,0,0,0]},"width":[0,5,6,11,7,0],"height":[0,5,6,11,7,0],"angle":180,"texture":[3,8,10,63]},"cannons2":{"section_segments":6,"offset":{"x":27,"y":0,"z":-5},"position":{"x":[0,0,0,0,0,0],"y":[-70,-80,-35,0,25,30],"z":[0,0,0,0,0,0]},"width":[0,5,6,11,7,0],"height":[0,5,6,11,7,0],"angle":180,"texture":[3,8,10,63]}},"wings":{"main1":{"length":[20,20],"width":[50,30,15],"angle":[-10,-15],"position":[0,-20,-11],"doubleside":true,"offset":{"x":20,"y":-12,"z":5},"bump":{"position":35,"size":15},"texture":[11,63]},"main2":{"length":[30],"width":[33,15],"angle":[-20],"position":[0,20],"doubleside":true,"offset":{"x":65,"y":-33,"z":-9},"bump":{"position":30,"size":15},"texture":[8]}},"typespec":{"name":"Booster","level":2,"model":1,"code":201,"specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":180,"speed":[240,240],"rotation":[70,70],"acceleration":[100,100],"dash":{"rate":2,"burst_speed":[250,250],"speed":[330,330],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[1.683,1.695,1.599,2.939,3.469,3.338,3.195,2.878,2.66,2.459,2.614,2.672,2.63,2.173,2.178,2.122,1.672,1.157,1.252,1.406,1.657,2.073,2.406,2.882,2.85,2.104,2.85,2.882,2.406,2.073,1.657,1.406,1.252,1.157,1.672,2.122,2.178,2.173,2.63,2.672,2.614,2.459,2.66,2.878,3.195,3.338,3.469,2.939,1.599,1.695],"lasers":[],"radius":3.469}}';
var Astral_Accelerator_202 = '{"name":"Astral Accelerator","level":2,"model":2,"size":1.5,"zoom":1.05,"designer":"Finalizer","specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":120,"speed":[270,270],"rotation":[70,70],"acceleration":[70,70],"dash":{"rate":2,"burst_speed":[250,250],"speed":[300,300],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main":{"section_segments":10,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-90,-93,-95,-90,-30,0,50,100,105],"z":[-7,-7,-7,-7,-7,-7,0,0,0]},"width":[20,23,25,27,30,27,30,26,0],"height":[0,6,8,10,15,18,8,10,0],"texture":[17,13,63,1,10,1,10,12]},"stripes":{"section_segments":16,"offset":{"x":15,"y":-40,"z":10},"position":{"x":[-4,-4,-4,11,5,0,0,0],"y":[-92,-30,0,50,100],"z":[1,6,10,3,3,0]},"width":[3,3,3,3,3,3],"height":[1,1,1,1,1],"texture":[63]},"cockpit":{"section_segments":10,"offset":{"x":0,"y":-20,"z":17},"position":{"x":[0,0,0,0,0,0],"y":[10,30,40,70,80],"z":[-2,0,0,0,0]},"width":[7.5,10,10,9.5,0],"height":[3,10,11,10,0],"texture":[9,4,13,4],"propeller":false},"detail":{"section_segments":8,"angle":3,"offset":{"x":26,"y":-50,"z":6},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"y":[0,3,7,11,14,17,21,25,28,31,35,39,42,45,49,53,57],"z":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"width":[1,4,6,4,1,4,6,4,1,4,6,4,1,4,6,4,1],"height":[1,4,6,4,1,4,6,4,1,4,6,4,1,4,6,4,1],"texture":[4,17,17,4,4,17,17,4,4,17,17,4,4,17,17,4]},"engine":{"section_segments":4,"offset":{"x":0,"y":-95,"z":18},"position":{"x":[0,0,0,0],"y":[-18,-15,15,18],"z":[0,0,0,0]},"width":[0,10,10,0],"height":[0,4,4,0],"texture":[18]},"bracings1":{"section_segments":8,"angle":90,"offset":{"x":0,"y":-85,"z":18},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-15,-14,-11.5,-10,-8,0,8,10,11.5,14,15],"z":[-20,-10,-1,1,2,0,2,1,-1,-10,-20]},"width":[4,4,4,4,4,5,4,4,4,4,4],"height":[0,10,4,3,2,3,2,3,4,10,0],"propeller":false,"texture":[13]},"bracings2":{"section_segments":8,"angle":90,"offset":{"x":0,"y":-105,"z":18},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[-15,-14,-11.5,-10,-8,0,8,10,11.5,14,15],"z":[-20,-10,-1,1,2,0,2,1,-1,-10,-20]},"width":[4,4,4,4,4,5,4,4,4,4,4],"height":[0,10,4,3,2,3,2,3,4,10,0],"propeller":false,"texture":[13]},"engines":{"section_segments":12,"offset":{"x":18,"y":0,"z":15},"position":{"x":[0,0,0,0,0,0,0,0],"y":[25,20,25,40,75,70,65],"z":[5,0,0,0,0,0,0,0]},"width":[0,5,7,8,8,6,0],"height":[0,14,15,15,13,10,0],"texture":[13,1,63,10,18,17],"propeller":true}},"wings":{"main":{"length":[46,0,25,-25,20],"width":[100,20,70,0,70,10],"angle":[10,0,110,110,-70],"position":[-30,5,-10,30,-10,20],"texture":[18,11,63],"doubleside":true,"bump":{"position":30,"size":7},"offset":{"x":0,"y":30,"z":0}},"font":{"length":[45],"width":[61,10],"angle":[-6,20],"position":[-60,-100],"texture":[63],"doubleside":true,"bump":{"position":30,"size":20},"offset":{"x":0,"y":-20,"z":5}}},"typespec":{"name":"Astral Accelerator","level":2,"model":2,"code":202,"specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":120,"speed":[270,270],"rotation":[70,70],"acceleration":[70,70],"dash":{"rate":2,"burst_speed":[250,250],"speed":[300,300],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[4.058,4.112,4.016,3.983,1.924,1.681,1.362,1.335,1.111,1.114,1.432,1.413,1.408,1.442,1.495,1.584,1.707,1.9,2.145,2.274,2.14,2.112,2.381,2.366,2.29,1.95,2.29,2.366,2.381,2.112,2.14,2.274,2.145,1.9,1.707,1.584,1.495,1.442,1.41,1.413,1.432,1.114,1.111,1.335,1.362,1.681,1.924,3.983,4.016,4.112],"lasers":[],"radius":4.112}}';
var V1_203 = '{"name":"V1","designer":"Void","level":2,"model":3,"size":1.3,"zoom":0.9,"specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":140,"speed":[260,260],"rotation":[70,70],"acceleration":[80,80],"dash":{"rate":2,"burst_speed":[250,250],"speed":[300,300],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":-10,"z":10},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-90,-75,-20,0,50,105,90],"z":[0,0,0,0,0,0,0]},"width":[0,15,25,25,25,25,0],"height":[0,10,20,20,20,20,0],"propeller":true,"texture":[63,2,2,10,4,17]},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-30,"z":12},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-30,10,30,40],"z":[0,0,0,0,0]},"width":[0,10,15,15,5],"height":[0,18,25,25,5],"propeller":false,"texture":9},"deco":{"section_segments":8,"offset":{"x":23,"y":20,"z":10},"position":{"x":[5,5,10,10,10,10,10],"y":[-52,-50,-20,0,20,70,65],"z":[0,0,0,0,0,0,0]},"width":[0,10,15,15,15,15,0],"height":[0,10,10,10,10,10,0],"angle":0,"propeller":true,"texture":[4,3,4,10,4,17]},"cannons":{"section_segments":12,"offset":{"x":33,"y":40,"z":20},"position":{"x":[0,0,0,0,0,0,0],"y":[-30,-40,-20,0,20,40,42],"z":[0,-5,-1,0,0,0,0]},"width":[0,5,6,10,10,7.5,0],"height":[0,5,5,5,5,5,0],"angle":0,"propeller":false,"texture":[4,4,10,4,63,4]}},"wings":{"main":{"length":[80,40],"width":[80,50,30],"angle":[0,90],"position":[30,50,80],"doubleside":true,"bump":{"position":30,"size":10},"texture":[11,63],"offset":{"x":-10,"y":0,"z":0}}},"typespec":{"name":"V1","level":2,"model":3,"code":203,"specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":140,"speed":[260,260],"rotation":[70,70],"acceleration":[80,80],"dash":{"rate":2,"burst_speed":[250,250],"speed":[300,300],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[2.6,2.449,2.163,1.634,1.337,1.146,1.177,1.259,1.24,1.203,1.187,1.206,1.245,1.258,1.288,1.967,2.129,2.363,2.644,2.913,3.068,2.652,2.586,2.554,2.514,2.475,2.514,2.554,2.586,2.652,3.068,2.913,2.644,2.363,2.129,1.967,1.288,1.258,1.248,1.206,1.187,1.203,1.24,1.259,1.177,1.146,1.337,1.634,2.163,2.449],"lasers":[],"radius":3.068}}';

var RAD_Diamond_Lancer_204 = '{"name":"RAD Diamond Lancer","designer":"Uranus","level":2,"model":4,"size":2,"specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":150,"speed":[250,250],"rotation":[70,70],"acceleration":[80,80],"dash":{"rate":2,"burst_speed":[250,250],"speed":[300,300],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main":{"section_segments":6,"offset":{"x":0,"y":-50,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-53,-50,-40,-20,10,40,80,84],"z":[0,0,0,0,0,0,0,0]},"width":[18,25,25,23,23,25,20,0],"height":[0,5,10,10,10,10,7,0],"texture":[1,1,1,1,1,8,3.9],"angle":0},"bumper":{"section_segments":6,"offset":{"x":-1,"y":-100,"z":0},"position":{"x":[1.5,1,0,-5,-5,0,0],"y":[0,10,15,25,27],"z":[0,0,0,0,0,0,0]},"width":[5,5,5,5,0],"height":[5,5,5,5,0],"texture":[3.9,16.9,3.9],"angle":90},"cockpitWindshield":{"section_segments":3,"offset":{"x":0,"y":-40,"z":10},"position":{"x":[-20,0,5,0,-20,0,0],"y":[-20,-10,0,10,20],"z":[-6,-2,0,-2,-6,0,0]},"width":[0,12,12,12,0],"height":[0,5,5,5,0],"texture":[8.6],"angle":90},"cockpitBack":{"section_segments":6,"offset":{"x":0,"y":10,"z":7},"position":{"x":[0,0,0,0,0,0,0],"y":[-50,-20,0,20,23],"z":[-2,0,0,0,0,0,0]},"width":[15,15,15,13,0],"height":[0,10,10,10,0],"texture":[4,10,17.9,3.9],"angle":0},"cockpitBackSides":{"section_segments":6,"offset":{"x":13,"y":0,"z":7},"position":{"x":[5,0,0,0,0,0,0],"y":[-20,-10,0,3],"z":[-3,0,0,0,0,0,0]},"width":[0,7,7,0],"height":[0,5,5,0],"texture":[4,17.5,4,3],"angle":0},"enginesTop":{"section_segments":6,"offset":{"x":12,"y":70,"z":7},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-60,-58,-55,-40,-30,-25,-20,-8,-30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,5,5,8,6,0],"height":[0,5,7,7,5,5,8,6,0],"texture":[3.9,3.9,10.4,63,2.9,2.9,3.9,16.9],"angle":0,"propeller":true},"enginesBottom":{"section_segments":6,"offset":{"x":18,"y":65,"z":-5},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-55,-54,-50,-40,-30,-25,-20,-8,-30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,5,5,8,6,0],"height":[0,5,7,7,5,5,8,6,0],"texture":[3.9,3.9,17.9,63,2.9,2.9,3.9,16.9],"angle":0,"propeller":true},"enginesConnect":{"section_segments":6,"offset":{"x":1,"y":36,"z":0},"position":{"x":[4,-12,0,0,0,0,0],"y":[-20,10],"z":[-5,8,0,0,0,0,0]},"width":[2,2],"height":[2,2],"texture":[1.9],"angle":90},"boostTank":{"section_segments":12,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[-30,-30,-30,-30,-30,-30,-30,-30,-30,-30],"y":[-30,-30,-26,-20,-5,5,20,26,30,30],"z":[0,0,0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7.5,8,8,8,8,7.5,5,0],"height":[0,5,7.5,8,8,8,8,7.5,5,0],"texture":[63,63,63,13,4,13,63,63,63],"angle":0},"boostTankHolder":{"section_segments":6,"angle":90,"offset":{"x":0,"y":-15,"z":0},"position":{"x":[0,0,0,0,0,0,0,0,0,0],"y":[-44,-43,-39,-38,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,8,4,4],"height":[0,4,6,4,4],"texture":[4,63,4,4,4,4,4,63,4]},"boostPipeMain":{"section_segments":6,"offset":{"x":0,"y":-20,"z":11},"position":{"x":[-30,-30,-30,-30,-27,-15,-15,0,0],"y":[-20,-18,-15,30,35,45,48],"z":[-6,-2,0,0,0,0,0,0]},"width":[2,2,2,2,2,2,0],"height":[2,2,2,2,2,2,0],"texture":[63],"angle":0},"boostPipeSide":{"section_segments":6,"offset":{"x":0,"y":-20,"z":9},"position":{"x":[-34,-34,-34,-34,-36,-40,-42,-42,-42],"y":[-20,-18,-15,25,30,33,40,46],"z":[-6,-2,0,0,0,0,0,0]},"width":[2,2,2,2,2,2,2,0],"height":[2,2,2,2,2,2,2,0],"texture":[63],"angle":0},"boostTankEngineHolder":{"section_segments":6,"angle":90,"offset":{"x":0,"y":27,"z":3},"position":{"x":[0,0,0,0,10,0,0,0,0],"y":[-54,-53,-49,-48,0],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,6,8,3,3],"height":[0,4,6,3,3],"texture":[4,63,4,4,4,4,4,63,4]},"engineBoostTankOffset":{"section_segments":6,"offset":{"x":0,"y":70,"z":3},"position":{"x":[-42,-42,-42,-42,-42,-42,-42,-42,-42],"y":[-60,-58,-55,-40,-30,-25,-20,-8,-30],"z":[0,0,0,0,0,0,0,0,0,0]},"width":[0,5,7,7,5,5,8,6,0],"height":[0,5,7,7,5,5,8,6,0],"texture":[3.9,3.9,10.4,63,2.9,2.9,3.9,16.9],"angle":0,"propeller":true},"logo1":{"section_segments":4,"offset":{"x":0,"y":-65,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[0,5],"z":[0,0,0,0,0,0,0]},"width":[0,3.2],"height":[0,0],"texture":[4,3,4,3],"angle":0},"logo2":{"section_segments":4,"offset":{"x":0.1,"y":-65,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[0,5],"z":[0,0,0,0,0,0,0]},"width":[0,3.2],"height":[0,0],"texture":[4,3,4,3],"angle":120},"logo3":{"section_segments":4,"offset":{"x":0.1,"y":-65,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[5,15],"z":[0,-3,0,0,0,0,0]},"width":[3.2,0],"height":[0,0],"texture":[4],"angle":60},"logo4":{"section_segments":4,"offset":{"x":0,"y":-65,"z":11},"position":{"x":[0,0,0,0,0,0,0],"y":[5,15],"z":[0,0,0,0,0,0,0]},"width":[3.2,0],"height":[0,0],"texture":[4],"angle":180},"logoDeco":{"section_segments":4,"offset":{"x":5,"y":-72,"z":9},"position":{"x":[0,0,3,5,8,13,14,15],"y":[-20,-10,2,5,8,14,20,26],"z":[-4,0,-1,-1,-1,-2,-3,-3,0]},"width":[3,3,3,3,3,3,2,0,0],"height":[2,2,2,2,2,1,0,0],"texture":[3.9],"angle":0}},"wings":{"cockpitTop":{"doubleside":false,"offset":{"x":0,"y":-30,"z":15},"length":[10,13],"width":[30,20,4],"angle":[-11,-42],"position":[0,0,11],"texture":[11.5,9],"bump":{"position":20,"size":3}},"cockpitTopBack":{"doubleside":false,"offset":{"x":0,"y":-17,"z":14.8},"length":[10,13],"width":[10,10,20],"angle":[-11,-42],"position":[0,0,10],"texture":[4],"bump":{"position":20,"size":3}},"wingsBackTop":{"doubleside":true,"offset":{"x":14,"y":37,"z":10},"length":[20],"width":[20,7],"angle":[20],"position":[0,20],"texture":[63],"bump":{"position":20,"size":5}},"wingsBackBottom":{"doubleside":true,"offset":{"x":20,"y":31,"z":-8},"length":[30],"width":[16,4],"angle":[-25],"position":[0,20],"texture":[63],"bump":{"position":20,"size":5}}},"typespec":{"name":"RAD Diamond Lancer","level":2,"model":4,"code":204,"specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":150,"speed":[250,250],"rotation":[70,70],"acceleration":[80,80],"dash":{"rate":2,"burst_speed":[250,250],"speed":[300,300],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[4.233,4.229,4.139,2.578,1.863,1.514,1.3,1.152,1.053,0.983,0.922,0.87,0.839,0.823,0.825,0.846,1.051,1.188,1.318,2.839,2.589,2.753,2.465,2.574,2.524,1.813,2.524,2.574,2.465,2.936,3.117,2.997,2.542,2.481,2.443,2.066,1.892,1.532,1.532,1.786,1.874,1.9,1.876,2.081,2.256,2.28,2.132,2.578,4.139,4.229],"lasers":[],"radius":4.233}}';
var Vengar_205 = '{"name":"Vengar","designer":"SChickenman","level":2,"model":5,"size":1.5,"zoom":0.9,"specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":150,"speed":[240,240],"rotation":[90,90],"acceleration":[100,100],"dash":{"rate":2,"burst_speed":[250,250],"speed":[300,300],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"bodies":{"main":{"section_segments":12,"offset":{"x":0,"y":0,"z":0},"position":{"x":[0,0,0,0,0,0,0,0],"y":[-72,-70,-45,-25,-10,20,30,45,40],"z":[0,0,0,0,0,0,0,0]},"width":[0,5,10,13,15,15,10,7,0],"height":[0,5,10,13,15,15,10,7,0],"texture":[3,3,63,63,3,11,63,3],"propeller":true},"cockpit":{"section_segments":12,"offset":{"x":0,"y":-15,"z":3},"position":{"x":[0,0,0,0,0,0],"y":[-45,-40,-25,20,45],"z":[0,0,0,10,5,10]},"width":[0,5,8,8,0],"height":[0,5,8,8,0],"texture":[3,3,9,3,3]},"cannon":{"section_segments":12,"offset":{"x":0,"y":-15,"z":-20},"position":{"x":[0,0,0,0,0,0],"y":[-75,-80,-20,0,20,60],"z":[0,0,0,-5,0,20]},"width":[0,10,15,40,35,0],"height":[0,7,10,10,10,0],"angle":0,"propeller":false,"texture":[6,4,4,3]},"cannons2":{"section_segments":12,"offset":{"x":40,"y":70,"z":0},"position":{"x":[0,0,0,0,0],"y":[-30,-20,0,20,30],"z":[0,0,0,0,0]},"width":[2,5,7,10,3],"height":[2,5,7,10,3],"texture":[6,4,63,4],"propeller":true,"angle":0},"propulsors":{"section_segments":8,"offset":{"x":60,"y":-50,"z":-25},"position":{"x":[0,0,0,0,0,0,0,0,0,0,0],"y":[30,55,60,80,95,100,90,95],"z":[0,0,0,0,0,0,0,0]},"width":[7,9,9,5,7,5,0],"height":[1,9,9,5,7,5,0],"texture":[4,63,4,11,63,12],"propeller":true}},"wings":{"wings1":{"doubleside":true,"offset":{"x":0,"y":20,"z":13},"length":[-20,-10,-40],"width":[50,50,130,30],"angle":[100,-20,10],"position":[0,0,-50,0],"texture":[4,4,8,4],"bump":{"position":10,"size":-10}},"join":{"doubleside":true,"offset":{"x":0,"y":10,"z":0},"length":[70],"width":[50,30],"angle":[-20],"position":[0,0,0,50],"texture":63,"bump":{"position":10,"size":15}},"side_joins":{"offset":{"x":0,"y":30,"z":-3},"length":[40],"width":[90,30],"angle":[10],"position":[-50,50],"texture":[4],"bump":{"position":10,"size":10}}},"typespec":{"name":"Vengar","level":2,"model":5,"code":205,"specs":{"shield":{"capacity":[200,400],"reload":[400,400]},"generator":{"capacity":[200,200],"reload":[19,29]},"ship":{"mass":150,"speed":[240,240],"rotation":[90,90],"acceleration":[100,100],"dash":{"rate":2,"burst_speed":[250,250],"speed":[300,300],"acceleration":[70,70],"initial_energy":[50,50],"energy":[100,100]}}},"shape":[2.856,2.866,2.26,1.895,1.659,1.495,1.374,1.294,1.246,1.267,2.098,2.082,2.057,2.086,2.092,2.123,2.253,2.442,2.46,2.141,2.673,3.2,3.266,1.847,1.366,1.353,1.366,1.847,3.266,3.2,2.673,2.141,2.46,2.442,2.253,2.123,2.092,2.086,2.058,2.082,2.098,1.267,1.246,1.294,1.374,1.495,1.659,1.895,2.26,2.866],"lasers":[],"radius":3.266}}';

var track1 = {
  map: ""+
"999999999999999999999999999999\n"+
"99                      L   99\n"+
"9                       L    9\n"+
"9                       L    9\n"+
"9DDD 99999999999999999999    9\n"+
"9   9999999999999999999999   9\n"+
"9    R              999999   9\n"+
"99   R               99999   9\n"+
"999999999999999999   99999   9\n"+
"9999999999      L    99999   9\n"+
"999999999       L   999999   9\n"+
"99999999        L  9999999   9\n"+
"9999999    999999999999999UUU9\n"+
"999999    999999999999999    9\n"+
"99999    999999999999        9\n"+
"9999    999999999999        99\n"+
"999    9999999999999   9999999\n"+
"99    999999999999999   999999\n"+
"9    99999999999999999   99999\n"+
"9   9999999999999999999   9999\n"+
"9DDD99999------999999999   999\n"+
"9   9999--------999999999   99\n"+
"9   9999--------9999999999   9\n"+
"9   99999--------999999999   9\n"+
"9   99999999999DD999999999   9\n"+
"9   999999999999D99999999 UUU9\n"+
"9   R  B B B B B B    R      9\n"+
"9   R              I  R      9\n"+
"99  R B B B B B B     R     99\n"+
"999999999999999999999999999999",
checkpoints: [
  {x:45,y:-125,direction:0,width:60},
  {x:127.97810125950559,y:71.26441618297324,direction:Math.PI/2,width:60},
  {x:-7.025974235117957,y:44.89952816451233,direction:Math.PI,width:60}
]
} ;

var track2 = {
  map: ""+
"999999999999999999999999999999\n"+
"99          L     999       99\n"+
"9           L      9         9\n"+
"9    99999999999   9         9\n"+
"9   99999999999    9    9    9\n"+
"9DDD9       R      9   999   9\n"+
"9   9       R     99   999   9\n"+
"9   9   99999999999    999   9\n"+
"9   9           L      999   9\n"+
"9   99          L     9999   9\n"+
"9   9999999999999999999999   9\n"+
"9   9999999999999999999999UUU9\n"+
"99    9999999999999999999    9\n"+
"999    999999       R        9\n"+
"9999    9999        R       99\n"+
"9999    9999     9999999999999\n"+
"999    99999        L 99999999\n"+
"99    9999999       L   999999\n"+
"9    9999999999999999    99999\n"+
"9   9999999999999999999   9999\n"+
"9DDD99999------999999999   999\n"+
"9   9999--------999999999   99\n"+
"9   9999--------9999999999   9\n"+
"9   99999--------999999999   9\n"+
"9   99999999999DD999999999UUU9\n"+
"9   999999999999D99999999    9\n"+
"9   R  B B B B B B    R      9\n"+
"9   R              I  R      9\n"+
"99  R B B B B B B     R     99\n"+
"999999999999999999999999999999",
checkpoints: [
  {x:45,y:-125,direction:0,width:60},
  {x:122.41448609285237,y:78.4410061505223,direction:Math.PI/2,width:60},
  {x:-123.88883711242791,y:76.89113382625163,direction:Math.PI*1.5,width:60}
]
} ;

var track3 = {
  map: ""+
"999999999999999999999999999999\n"+
"99     L    99999999999     99\n"+
"9      L     99999999        9\n"+
"9    99999    99999         99\n"+
"9   9999999   9999    9     99\n"+
"9   9999999   999    99    999\n"+
"9DDD9999999   99    99    9999\n"+
"9   9999999UUU9    99    99999\n"+
"9   9999999       99    999999\n"+
"9   9999999      99    9999999\n"+
"99   9999999    99    99999999\n"+
"999   99999999999    999999999\n"+
"9999   999999999    9999999999\n"+
"9999   99999999    99999999999\n"+
"9999   9999999     99999999999\n"+
"9999   9999999UUUUU99999999999\n"+
"9999   99999999     9999999999\n"+
"999   99999999999     99999999\n"+
"99   99999999999999     999999\n"+
"9   99999999999999999     9999\n"+
"9DDD99999------99999999     99\n"+
"9   9999--------999999999    9\n"+
"9   9999--------9999999999   9\n"+
"9   99999--------999999999   9\n"+
"9   99999999999DD999999999   9\n"+
"9   999999999999D99999999 UUU9\n"+
"9   R  B B B B B B    R      9\n"+
"9   R              I  R      9\n"+
"99  R B B B B B B     R     99\n"+
"999999999999999999999999999999",
checkpoints: [
  {x:45,y:-125,direction:0,width:60},
  {x:15.556605744889652,y:-3.4338763476575593,direction:Math.PI/2,width:60},
  {x:-73.62606463013782,y:127.25598241974546,direction:Math.PI,width:60}
]
} ;

var tracks = [track1,track2,track3] ;
var current_track = 0 ;

var map = tracks[current_track].map ;
var checkpoints = tracks[current_track].checkpoints ;
var map_lines = map.split("\n");

var setTrack = function(game,trackid) {
  var track = tracks[trackid];
  map = track.map ;
  map_lines = map.split("\n");
  checkpoints = track.checkpoints ;
  game.removeObject() ;
  addObjects(game) ;
  game.setCustomMap(map);
}

var scoreboard = {
  id:"scoreboard",
  visible: true,
  components: [
    { type:"box",position:[0,0,100,100],fill:"#456",stroke:"#CDE",width:2},
    { type: "text",position: [0,0,100,100],color: "#FFF",value: "My Text"}
  ]
} ;

var lap_info = {
  id:"lap_info",
  visible: true,
  position: [30,90,40,5],
  components: [
    { type: "text",position: [0,0,100,100],color: "#FFF",value: "Race for fastest lap"}
  ]
} ;

var race_info = {
  id:"race_info",
  visible: true,
  position: [30,5,40,5],
  components: [
    { type: "text",position: [0,0,100,100],color: "#FFF",value: "Qualification"}
  ]
}

var countdown = {
  id:"race_info",
  visible: true,
  position: [40,5,20,10],
  components: [
    { type: "text",position: [0,0,100,100],color: "#FFF",value: "5"}
  ]
}

var changeship = {
  id:"changeship",
  visible: true,
  position: [10,40,10,10],
  clickable: true,
  shortcut: "U",
  components: [
    { type: "text",position: [0,0,100,100],color: "#FFF",value: "CHANGE"}
  ]
}


var startline = {
  id: "startline",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive: "https://starblast.data.neuronality.com/mods/objects/startline.png"
} ;

var startblock = {
  id: "startblock",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive: "https://starblast.data.neuronality.com/mods/objects/startblock.png"
} ;

var arrow = {
  id: "arrow",
  obj: "https://starblast.data.neuronality.com/mods/objects/plane.obj",
  emissive: "https://starblast.data.neuronality.com/mods/objects/arrow.png"
} ;

var map_size = 30 ;

var addObjects = function(game) {
  for (var y=0;y<map_lines.length;y++)
  {
    var line = map_lines[y];

    for (var x=0;x<line.length;x++)
    {
      var px =  (x+.5-map_size/2)*10 ;
      var py =  (map_size-y-1+.5-map_size/2)*10 ;

      switch (line.charAt(x))
      {
        case "R":
          game.setObject({id: "R"+px+":"+py,
            type:arrow,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:Math.PI/2}
          });
          break ;
        case "U":
         game.setObject({id: "U"+px+":"+py,
            type:arrow,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:Math.PI}
          });
          break ;
        case "L":
         game.setObject({id: "L"+px+":"+py,
            type:arrow,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:Math.PI*1.5}
          });
          break ;
        case "D":
          game.setObject({id: "D"+px+":"+py,
            type:arrow,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:0}
          });
          break ;
        case "I":
          game.setObject({id: "I"+px+":"+py,
            type:startline,
            position: {x:px,y:py,z:-2},
            scale: {x:30,y:30,z:30},
            rotation: {x:0,y:0,z:Math.PI*1.5}
          });
          break ;
        case "B":
          game.setObject({id: "B"+px+":"+py,
            type:startblock,
            position: {x:px,y:py,z:-2},
            scale: {x:6,y:6,z:6},
            rotation: {x:0,y:0,z:Math.PI*.5}
          });
          break ;
      }
    }
  }
} ;

addObjects(game);

this.options = {
  map_size: 30,
  weapons_store: false,
  radar_zoom: 1,
  crystal_value: 0,
  ships: [Booster_201,Astral_Accelerator_202,V1_203,RAD_Diamond_Lancer_204,Vengar_205],
  choose_ship:[201,202,203,204,205],
  asteroids_strength: 1000000,
  starting_ship: 403,
  auto_refill: true,
  projectile_speed: 2,
  starting_ship_maxed: true,
  power_regen_factor: 0,
  custom_map: map,
  invulnerable_ships: true,
  max_players: 15,
  mines_destroy_delay: 60*20,
  soundtrack: "crystals.mp3"
};

var popCollectible = function(game) {
  var choice = [10,11,10,11,20,21,90,90,90,90,90,90,90];
  var code = choice[Math.floor(Math.random()*choice.length)];

  var x = Math.floor(Math.random()*game.options.map_size);
  var y = Math.floor(Math.random()*game.options.map_size);
  if (map_lines[y].substring(x,x+1)==" ")
  {
    x = (x+.5-game.options.map_size/2)*10 ;
    y = (game.options.map_size-y-1+.5-game.options.map_size/2)*10 ;
    game.addCollectible({code:code,x:x,y:y}) ;
    //echo("popping collectible");
  }
} ;

var formatLapTime = function(time) {
  if (time>10000)
  {
    return "-" ;
  }
 time = Math.round(time*1000) ;
 var cents = time%1000 ;
 var seconds = Math.floor(time/1000)%60;
 var minutes = Math.floor(time/60000) ;
 if (cents<10) cents = "0"+cents;
 if (cents<100) cents = "0"+cents;
 if (seconds<10) seconds = "0"+seconds;
 return minutes+":"+seconds+":"+cents ;
}

var formatMinutesSeconds = function(time) {
 var seconds = time%60;
 var minutes = Math.floor(time/60) ;
 if (seconds<10) seconds = "0"+seconds;
 return minutes+":"+seconds ;
}

var checkShip = function(ship) {
  if (ship.custom.current_checkpoint == null)
  {
    ship.custom.current_checkpoint = 0 ;
    ship.custom.checkpoint_count = 0 ;
    ship.custom.lap_count = 0 ;
    ship.custom.checkpoint_time = 0 ;
    ship.custom.best_lap = 100000 ;
    if (ship.game.custom.status == "qualification")
    {
      race_info.components[0].value = "Qualifying session";
      race_info.visible = true ;
      game.setUIComponent(race_info);
    }
    //ship.setUIComponent(changeship);
  }

  if (checkCheckPoint(ship,checkpoints[ship.custom.current_checkpoint]))
  {
    if (ship.game.custom.status != "qualification" && ship.custom.lap_count>race_laps)
    {
      // ship finished race, do not change ranking
    }
    else
    {
      ship.custom.checkpoint_count++ ;
      ship.custom.checkpoint_time = ship.game.step/60/3600 ;
    }
    //echo(ship.name+" passed checkpoint "+ship.custom.current_checkpoint);
    if (ship.custom.current_checkpoint == 0)
    {
      ship.custom.lap_count++ ;
      if (ship.custom.lap_start != null)
      {
        var time = (game.step-ship.custom.lap_start-1+extra_bit)/60 ;
        if (ship.custom.best_lap == null || time<ship.custom.best_lap)
        {
          ship.custom.best_lap = time ;
          if (ship.game.custom.status != "race_end")
          {
            lap_info.components[0].value = "Best lap! "+ formatLapTime(time) ;
            ship.setUIComponent(lap_info);
          }
        }
        else
        {
          if (ship.game.custom.status != "race_end")
          {
            lap_info.components[0].value = "Lap time: "+ formatLapTime(time) ;
            ship.setUIComponent(lap_info);
          }
        }
      }
      ship.custom.lap_start = game.step-1+extra_bit ;
    }
    ship.custom.current_checkpoint = (ship.custom.current_checkpoint+1)%checkpoints.length;
  }

  if (ship.custom.lap_start != null)
  {
    var seconds = Math.floor((ship.game.step-ship.custom.lap_start-1+extra_bit)/60) ;
    if ((seconds>=5 || ship.custom.best_lap>10000) && seconds != ship.custom.seconds && ship.game.custom.status != "race_end")
    {
      ship.custom.seconds = seconds ;
      var minutes = Math.floor(seconds/60);
      seconds = seconds%60 ;
      if (seconds<10) seconds = "0"+seconds;
      lap_info.components[0].value = minutes+":"+seconds ;
      ship.setUIComponent(lap_info);
    }
  }
  else if (ship.game.custom.status == "qualification")
  {
    if (ship.custom.seconds != "Race for fastest lap")
    {
      ship.custom.seconds = "Race for fastest lap" ;
      lap_info.components[0].value = "Race for fastest lap" ;
      ship.setUIComponent(lap_info);
    }
  }
}

createCheckPoint = function() {
  var x = game.ships[0].x;
  var y = game.ships[0].y;
  var direction = game.ships[0].r;
  echo("{x:"+x+",y:"+y+",direction:"+direction+"}");
}

var extra_bit = 0 ;

var checkCheckPoint = function(ship,checkpoint) {
  var vx = Math.cos(checkpoint.direction);
  var vy = Math.sin(checkpoint.direction);
  var dx = ship.x-checkpoint.x;
  var dy = ship.y-checkpoint.y;
  var d = Math.sqrt(dx*dx+dy*dy);
  //echo(ship.y);
  var passed = false ;
  if (d<checkpoint.width)
  {
    var projection = vx*dx+vy*dy;
    //echo(projection);
    if (ship.custom.projection != null)
    {
      if (ship.custom.projection<0 && projection>=0)
      {
        passed = true ;
        extra_bit = (0-ship.custom.projection)/(projection-ship.custom.projection);
      }
    }
    ship.custom.projection = projection ;
  }
  return passed ;
}

var updateScoreboard = function(game) {
  scoreboard.components = [] ;
  var line = 0 ;
  if (game.custom.status == "qualification")
  {
    scoreboard.components.push({ type: "text",position: [0,line*10+1,100,8],color: "#FFF",value: "Qualification "+formatMinutesSeconds(game.custom.qualification_time)});
    line++ ;
  }
  else
  {
    scoreboard.components.push({ type: "text",position: [0,line*10+1,100,8],color: "#FFF",value: "Race" });
    line++ ;
  }
  for (var i=0;i<game.ships.length;i++)
  {
    var ship = game.ships[i];
    if (ship.custom.best_lap == null)
    {
      ship.custom.best_lap = 1000000 ;
    }
  }

  if (game.custom.status == "qualification")
  {
    game.ships.sort(function(a,b) { return a.custom.best_lap-b.custom.best_lap}) ;
  }
  else
  {
    game.ships.sort(function(a,b) {
      return (b.custom.checkpoint_count*1000-b.custom.checkpoint_time)-(a.custom.checkpoint_count*1000-a.custom.checkpoint_time);
    }) ;
  }

  var score = 10 ;

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
      break ;
    }
    var ship = game.ships[i];
    if (game.custom.status != "qualification")
    {
      scoreboard.components.push({ type: "text", position: [0,line*10+1,14,8],color: "#FFF",align:"right",value:line+"."});
      scoreboard.components.push({ type: "player",id: ship.id, position: [15,line*10+1.5,85,7],color: "#FFF",align:"left"});
    }
    else
    {
      scoreboard.components.push({ type: "player",id: ship.id, position: [0,line*10+1.5,60,7],color: "#FFF",align:"left"});
      if (ship.custom.best_lap != null)
      {
        scoreboard.components.push({ type: "text",position: [60,line*10+1,38,8],color: "#FFF",value: formatLapTime(ship.custom.best_lap),align:"right"});
      }
    }
    line += 1 ;
  }
} ;

var updateShipInfo = function(ship) {
  if (ship.game.custom.status == "qualification")
  {
    //lap_info.components[0].text = "Race for fastest lap";
    //ship.setUIComponent(lap_info);
  }
} ;


var manageGame = function(game,second) {
  if (game.custom.status == null)
  {
    game.custom.status = "qualification" ;
    game.custom.status_time = second+qualification_duration ; // 3 minutes qualification
    var t = game.custom.status_time-second ;
    game.custom.qualification_time = t ;
  }
  switch (game.custom.status)
  {
    case "qualification":
      var t = Math.max(0,game.custom.status_time-second) ;
      game.custom.qualification_time = t ;
      if (t == 0)
      {
        game.custom.status = "race_start" ;
        game.custom.status_time = second+6 ;
        race_info.components[0].value = "Prepare for race!";
        //game.setOpen(false) ;
        game.setUIComponent(race_info);
        createStartingGrid(game);
      }
      else if (race_info.components[0].value != "Qualifying session")
      {
        race_info.components[0].value = "Qualifying session";
        race_info.visible = true ;
        game.setUIComponent(race_info);
      }
      break ;

    case "race_start":
      t = Math.max(0,game.custom.status_time-second) ;
      if (t<=3)
      {
        countdown.components[0].value = t ;
        countdown.visible = true ;
        game.setUIComponent(countdown) ;
      }
      if (t == 0)
      {
        startRace(game) ;
        game.custom.status = "race" ;
      }
      break ;

    case "race":
      if (countdown.visible)
      {
        countdown.visible = false ;
        game.setUIComponent(countdown) ;
      }
      for (var i=0;i<game.ships.length;i++)
      {
        var ship = game.ships[i] ;
        if (ship.custom.lap_count>race_laps)
        {
          game.custom.status = "race_end" ;
          game.custom.status_time = second+time_after_race ;
          lap_info.components[0].value = "End of race" ;
          lap_info.visible = true ;
          ship.game.setUIComponent(lap_info);
        }
        else
        {
          var pos = (i+1)+"th";
          if (i<positions.length)
          {
            pos = positions[i];
          }
          var text = pos+" - Lap "+ship.custom.lap_count+"/"+race_laps ;
          if (ship.custom.race_info != text)
          {
            ship.custom.race_info = text ;
            race_info.components[0].value = text ;
            race_info.visible = true ;
            ship.setUIComponent(race_info);
          }
        }
      }
      break ;

    case "race_end":
      t = Math.max(0,game.custom.status_time-second) ;
      for (var i=0;i<game.ships.length;i++)
      {
        var ship = game.ships[i] ;
        var text ;
        if (ship.custom.lap_count>race_laps)
        {
          if (i==0)
          {
            text = "You win!";
          }
          else
          {
            if (i<positions.length)
            {
              text = "Your rank: "+positions[i];
            }
            else
            {
              text = "Your rank: "+(i+1)+"th" ;
            }
          }
        }
        else
        {
          var pos = (i+1)+"th";
          if (i<positions.length)
          {
            pos = positions[i];
          }
          text = pos+" - Lap "+ship.custom.lap_count+"/"+race_laps ;
        }
        if (ship.custom.race_info != text)
        {
          ship.custom.race_info = text ;
          if (t>3)
          {
            race_info.components[0].value = text ;
            race_info.visible = true ;
            ship.setUIComponent(race_info);
          }
          lap_info.components[0].value = text ;
          lap_info.visible = true ;
          ship.setUIComponent(lap_info);
        }
      }
      if (t == 3)
      {
        race_info.components[0].value = "Next Race!";
        race_info.visible = true ;
        ship.setUIComponent(race_info);
      }
      if (t == 0)
      {
        game.custom.status = "qualification" ;
        game.custom.status_time = second+qualification_duration ;
        game.setOpen(true);
        current_track = (current_track+1)%tracks.length ;
        setTrack(game,current_track);

        for (var i=0;i<game.ships.length;i++)
        {
          var ship = game.ships[i] ;
          ship.custom.current_checkpoint = 0 ;
          ship.custom.lap_count = 0 ;
          ship.custom.checkpoint_count = 0 ;
          ship.custom.checkpoint_time = 0 ;
          ship.custom.lap_start = null ;
          spawnShip(ship);
          var rank = i<positions.length? positions[i] : ((i+1)+"th");
          var lap = formatLapTime(ship.custom.best_lap) ;

          ship.intermission({
            "Your rank": rank,
            "Your best lap": lap
          }) ;
          ship.custom.best_lap = 100000 ;
        }
      }
      break ;
  }
} ;

var spawnShip = function(ship)
{
  var x = -30+40*(Math.random()-.5) ;
  var y = -65+20*(Math.random()-.5) ;
  ship.set({x:x,y:y,vx:0,vy:0,generator:200}) ;
}

var createStartingGrid = function(game) {
  var x = 17 ;

  for (var i=0;i<game.ships.length;i++)
  {
    var ship = game.ships[i];
    ship.custom.current_checkpoint = 0 ;
    ship.custom.lap_count = 0 ;
    ship.custom.checkpoint_count = 0 ;
    ship.custom.checkpoint_time = 0 ;
    ship.custom.lap_start = null ;
    if (i%2 ==0)
    {
      ship.set({x:x,y:-115,vx:0,vy:0,idle:true,angle:0,generator:200}) ;
    }
    else
    {
      ship.set({x:x,y:-135,vx:0,vy:0,idle:true,angle:0,generator:200}) ;
    }
    x = Math.max(-120,x-10) ;
  }
}

var startRace = function(game) {
  for (var i=0;i<game.ships.length;i++)
  {
    var ship = game.ships[i];
    ship.set({idle:false}) ;
    ship.custom.current_checkpoint = 0 ;
    ship.custom.lap_count = 0 ;
    ship.custom.checkpoint_count = 0 ;
    ship.custom.checkpoint_time = 0 ;
    ship.custom.lap_start = null ;
  }
}

this.tick = function(game) {
  if (game.collectibles.length<collectibles)
  {
    popCollectible(game);
  }
  for (var i=0;i<game.ships.length;i++)
  {
    var ship = game.ships[i];
    checkShip(ship);
  }
  if (game.step%60 == 0)
  {
    manageGame(game,game.step/60) ;
    updateScoreboard(game);

    for (var i=0;i<game.ships.length;i++)
    {
      var ship = game.ships[i];
      ship.setUIComponent(scoreboard);
      updateShipInfo(ship);
    }
  }
} ;

this.event = function(event,game) {
  //  echo(event.name);
  switch (event.name)
  {
    case "ship_spawned":
      if (event.ship != null)
      {
        spawnShip(event.ship) ;
      }
      break ;

/*     case "ui_component_clicked":
      var ship = event.ship ;
      var component = event.id ;
      if (component == "changeship") // check that this is our component "warp"
      {
        var model = 201+Math.floor(Math.random()*5);
        ship.set({type:model}) ;
      }
      break ;*/

  }
} ;
