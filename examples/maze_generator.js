//MIT License
//
//Copyright (c) 2018 rvan-der
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.
//
// Author: rvan-der (rm -rf /)
//
// This file contains a JavaScript tool to generate a maze map for Starblast modding.
// The algorithm used is named 'Hunt and Kill'.
// It does not implement any game or rules. It is just the minimal code to generate the map.
// You can directly run it in the modding interface to make tests and previews.
// To use it, simply copy-paste the code into your own mod file (without the options
// and tick part of course).
// /!\ Beware of variables and functions naming conflicts. /!\
// Use the MAP_SIZE variable at the beginning of the code to indicate the desired size of
// your map and don't forget to pass it to the 'map_size' option.
// The function 'generateMaze()' returns the map (as you can see towards the end of the file),
// which you have to pass to the 'custom_map' option.
// Use and modify at your own will and risks. Have fun! ;)

'use strict'

var MAP_SIZE = 30;
//ensure MAP_SIZE is an even number
MAP_SIZE = Math.floor(MAP_SIZE / 2) * 2
// default to minimum value if too small
if (MAP_SIZE < 20){
  MAP_SIZE = 20;
}

var CELLS = MAP_SIZE / 2;
var DIRECTIONS = ['north', 'south', 'east', 'west'];

function Cell() {
  this.visited = false;
  this.walls = {'north': true, 'south': true, 'east': true, 'west': true};
  this.neighbours = {'north': null, 'south': null, 'east': null, 'west': null};
}

Cell.prototype.carveTo = function(direction){
  this.walls[direction] = false;
  this.neighbours[direction].walls[inverseDirection(direction)] = false;
  this.neighbours[direction].visited = true;
}


function inverseDirection(direction){
  switch (direction){
    case 'north':
      return 'south';
    case 'south':
      return 'north';
    case 'east':
      return 'west';
    case 'west':
      return 'east';
    default:
      return (undefined);
  }
}

//to have the 'correct' behavior for modulo of a negative number
function mod(x, n){
  return ((x % n) + n) % n
}

function initCellMap(){
  var cellMap = [];
  //first fill the map with Cell instances
  for (var i = 0; i < CELLS; i++){
    cellMap[i] = []
    for (var j = 0; j < CELLS; j++){
      cellMap[i].push(new Cell());
    }
  }
  //then set their neighbours
  for (var i = 0; i < CELLS; i++){
    for (var j = 0; j < CELLS; j++){
      cellMap[i][j].neighbours['north'] = cellMap[mod(i - 1, CELLS)][j];
      cellMap[i][j].neighbours['south'] = cellMap[mod(i + 1, CELLS)][j];
      cellMap[i][j].neighbours['east'] = cellMap[i][mod(j + 1, CELLS)];
      cellMap[i][j].neighbours['west'] = cellMap[i][mod(j - 1, CELLS)];
    }
  }
  return (cellMap);
}

function isSurrounded(cell){
  for (var i = 0; i < 4; i++){
    if (!cell.neighbours[DIRECTIONS[i]].visited){
      return (false);
    }
  }
  return (true);
}

function selectRandomDirection(cell){
  // try random direction, if already visited try next one until found unvisited
  var i = Math.floor(Math.random() * 4); // random int from 0 to 3
  var inc = 1;
  if (Math.random() >= 0.5){
    inc = -1;
  }
  while (cell.neighbours[DIRECTIONS[i]].visited){
    i = mod(i + inc, 4);
  }
  return (DIRECTIONS[i]);
}

function walk(start){
  // carve a path until a surrounded cell at most nb_of_cells / 5 long
  var current = start;
  var direction;
  var count = 0;
  while (!isSurrounded(current) && count < (CELLS * CELLS) / 5){
    direction = selectRandomDirection(current);
    current.carveTo(direction);
    current = current.neighbours[direction];
    count++;
  }
}

function selectNewStart(cMap){
  // modes determine the corner of the map the search starts at
  // randomization homogenizes the pattern of the maze
  var modeI = Math.floor(Math.random() * 2); // 0 or 1 <=> bottom or up
  var modeJ = Math.floor(Math.random() * 2); // 0 or 1 <=> left or right
  var incI = 1; // increments
  var incJ = 1; //
  var limI = CELLS; // limits
  var limJ = CELLS; //
  if (modeI){ // negative increment if i starts at bottom
    incI = -1;
    limI = -1;
  }
  if (modeJ){ // negative increment if j starts at right 
    incJ = -1;
    limJ = -1;
  }
  for (var i = modeI * (CELLS - 1); i !== limI; i += incI){
    for (var j = modeJ * (CELLS - 1); j !== limJ; j += incJ){
      if (cMap[i][j].visited && !isSurrounded(cMap[i][j])){
        return (cMap[i][j]);
      }
    }
  }
  return (undefined);
}

function generateMaze(){
  var cellMap;
  var maze = "";
  var line1;
  var line2;
  var start;
  //carve the maze
  cellMap = initCellMap();
  //set center cell of the map to 'visited' so it'll be the first one selected
  cellMap[Math.floor(CELLS / 2)][Math.floor(CELLS / 2)].visited = true;
  while (true){
    start = selectNewStart(cellMap);
    if (start === undefined){
      break;
    }
    walk(start);
  }
  //create the final string for Starblast map
  for (var i = 0; i < CELLS ; i++){
    line1 = "";
    line2 = "";
    for (var j = 0; j < CELLS; j++){
      line1 += " ";
      line1 += cellMap[i][j].walls['east'] ? "9" : " ";
      line2 += cellMap[i][j].walls['south'] ? "9" : " ";
      line2 += "9";
    }
    line1 += "\n";
    if (i < CELLS - 1){
      line2 += "\n";
    }
    maze += line1;
    maze += line2;
  }
  return (maze);
}

var map = generateMaze();

// DON'T COPY THE REST OF THE FILE IF YOU INTEND TO USE THE GENERATOR FOR YOUR OWN MOD:
this.options = {
  // see documentation for options reference
  custom_map: map,
  map_size: MAP_SIZE
};

this.tick = function(game) {
  // do mod stuff here ; see documentation
}
