//flock def
var IcebergFlock = function IcebergFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 10;

  this.draw = function() {};

  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
	  }
  }

  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Iceberg)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}


//this defines the enemies i.e icebergs
var Iceberg = function Iceberg(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

Iceberg.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

Iceberg.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
  this.board.score++;
}

Iceberg.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
     // this.fireSometimes();
		 
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 1;
    if(this.x > Game.width - Sprites.map.iceberg1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.iceberg1.w) this.flock.hit = 1;
 	 if(this.y > (Game.height - 20) - Sprites.map.iceberg1.h * 2) {
		 Game.callbacks['die'](); //makes the game end if icebergs pass the player
   }
  }
  return true;
}
//not used
	Iceberg.prototype.fireSometimes = function() {
      if(Math.random()*100 < 10) {
        this.board.addSprite('projectile',this.x + this.w/2 - Sprites.map.projectile.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}
//here the player is defined
var Player = function Player(opts) { 
  this.reloading = 0;
  this.frame = 0;
}

Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y,this.frame);
}


Player.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
}

Player.prototype.step = function(dt) {
  if(Game.keys['left']) { this.x -= 100 * dt; }
  if(Game.keys['right']) { this.x += 100 * dt; }
    
  //this is not used, as my ship doesnt move apart from left-right
	//if(Game.keys['up']) { this.y -= 100 * dt; }
  //if(Game.keys['down']) { this.y += 100 * dt; }

  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;
   this.frame = (this.frame+1) % 1;
  this.reloading--;
//these few lines control the rate of fire and how many projectiles to fire. also the reloading speed
  if(Game.keys['fire'] && this.reloading <= 0 && this.board.projectiles < 1) {
    GameAudio.play('fire');
    this.board.addSprite('projectile',
                          this.x + this.w/2 - Sprites.map.projectile.w/2,
                          this.y-this.h,
                          { dy: -200, player: true });
    this.board.projectiles++;
    this.reloading = 3;
  }
  return true;
}
//here the projectile object is defined and its functions related to the gameplay
var Projectile = function Projectile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}

Projectile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'projectile',this.x,this.y + 45);
}

Projectile.prototype.step = function(dt) {
   this.y += this.dy * dt;

   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

Projectile.prototype.die = function() {
  if(this.player) this.board.projectiles--;
  if(this.board.projectiles < 0) this.board.projectiles=0;
   this.board.remove(this);
}
