//function to spill out random numbers from 0 to 4
function rnd(){ 
    var x = Math.floor(Math.random() * 5)
    return x;
    }
console.log(rnd());

//position of the icebergs in each level
  var levelData = { 
     1:  [[0,0,0,0,0,0,0,rnd(),0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,rnd(),0,0,rnd(),0,3,0,0],
          [0,0,0,0,0,0,0,0,0,0,1],
          [0,0,0,0,0,0,4,0,0,0,1],
          [0,0,0,0,0,0,0,rnd(),0,0,0],
          [0,rnd(),0,0,0,0,0,0,0,0,0],
          [0,0,rnd(),0,0,rnd(),0,0,0,0,0],
          [0,0,0,0,rnd(),0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0]],
     2:  [[0,0,1,1,0,1,0,3,rnd(),0,0],
          [0,0,1,1,0,0,0,3,3,0,0],
          [0,0,0,0,rnd(),3,rnd(),3,0,0,0],
          [0,3,3,0,2,0,2,0,0,0,0],
          [0,rnd(),1,rnd(),1,rnd(),2,rnd(),3,2,0]
		  [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,rnd(),0,0,rnd()],
          [0,0,rnd(),0,0,0,0,rnd(),0,0,0],
          [0,0,0,0,0,0,rnd(),0,0,0,0],
          [0,0,0,0,rnd(),rnd(),0,0,0,rnd(),0],
          [0,0,rnd(),0,0,0,rnd(),0,0,rnd(),0]],
     3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,rnd(),rnd(),0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [rnd(),0,0,3,3,rnd(),3,rnd(),0,0,0],
          [0,0,2,rnd(),2,2,2,rnd(),2,0,0],
          [0,0,2,2,rnd(),2,rnd(),2,0,0,0],
          [0,0,0,1,1,1,1,1,0,0,0],
          [0,0,0,1,1,rnd(),1,rnd(),0,0,0],
          [0,0,0,1,1,rnd(),1,1,0,0,0],
          [0,0,0,rnd(),rnd(),0,1,0,0,0,0]],
     4:	  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,3,rnd(),0,0,0,0,0],
          [rnd(),0,0,0,0,rnd(),0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,rnd(),0,0,rnd(),0,0,0,0],
          [0,0,rnd(),rnd(),0,rnd(),2,0,0,0,0],
          [0,0,2,2,0,rnd(),0,rnd(),2,0,0],
          [0,0,0,rnd(),1,0,rnd(),0,rnd(),rnd(),0],
          [0,0,0,1,rnd(),0,rnd(),rnd(),1,0,0],
          [0,0,0,1,1,0,1,1,0,0,0],
          [0,0,0,rnd(),rnd(),0,0,0,0,0,0]]
  };
//sprite mappings
  var spriteData = {
    'iceberg1': { sx: 37,  sy: 3,  w: 49, h: 33, cls: Iceberg, frames: 1 },
    'iceberg2': { sx: 76,  sy: 64, w: 48, h: 28, cls: Iceberg, frames: 1 },
    'iceberg3': { sx: 132,  sy: 57, w: 50, h: 37, cls: Iceberg, frames: 1 },
	'iceberg4': { sx: 92,  sy: 23, w: 37, h: 13, cls: Iceberg, frames: 1 },
    'player': { sx: 0,  sy: 45, w: 69, h: 49, cls: Player, frames: 1 },
    'projectile': { sx: 69,  sy: 62, w: 8,  h: 8, cls: Projectile }
  }
//gamescreens
  function startGame() {
     

    var screen = new GameScreen(" ","PRESS ENTER",
                                 function() {
                                      $('#gameboard').css('background-image', 'url("images/bckgr.png")');
									  	Game.loadBoard(new GameBoard(1));
									    GameAudio.play('arr');
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

  function endGame() {
    var screen = new GameScreen("GAME OVER","Press enter to restart!",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }


  function winGame() {
    var screen = new GameScreen("You Win!","(Press Enter to play again!)",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));									 
                                 });
    Game.loadBoard(screen);
  }
//here I put the audio file links 
  $(function() {
    GameAudio.load({ 'fire' : 'media/cannon.ogg', 'die' : 'media/xplode.ogg', 'arr' : 'media/arr.ogg' }, 
                   function() { 
                       Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



