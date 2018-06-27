this.options = {
  map_size:30
};

game.removeObject()

var cube = {
  id: "cube",
  obj: "https://raw.githubusercontent.com/pmgl/starblast-modding/master/objects/cube/cube.obj",
  diffuse: "https://raw.githubusercontent.com/pmgl/starblast-modding/master/objects/cube/diffuse.jpg",
  emissive: "https://raw.githubusercontent.com/pmgl/starblast-modding/master/objects/cube/emissive.jpg",
  bump: "https://raw.githubusercontent.com/pmgl/starblast-modding/master/objects/cube/bump.jpg",
  specularColor: 0xFF8040
} ;

for (var i=0;i<4;i++)
{
  for (var j=0;j<4;j++)
  {
    game.setObject({id: "cube"+i+":"+j,
    type: cube,
    position: {x:i*8,y:j*8,z:0},
    rotation: {x:i*Math.PI/2,y:j*Math.PI/2,z:0},
    scale: {x:.02,y:.02,z:.02}
  }) ;

  }
}


this.tick = function(game) {
};
