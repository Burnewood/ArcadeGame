// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x=x;
    this.y=y;
    this.speed=speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed *dt;
    // this should reset enemies to starting positions when they go off screen
    if(this.x>600){
      this.x = -75;
      // change speed to introduce unpredictability (uses same setup as creation of enemy)
      this.speed = 100 + Math.floor(Math.random()*512);
    }
    //add in check to see if player and enemy collide
    if(player.x < this.x +50 && player.x +50 > this.x && player.y < this.y +25 && player.y +35 > this.y){
      // remove a life
      player.lives -= 1;
      // add in engame when lives = 0
      if(player.lives==0){
        swal({
          title:'You are out of lives!',
          text:'With a score of '+player.score+' points',
          type:'warning',
          confirmButtonText: 'Play again?'
         }).then(function(confirmed){
           if(confirmed){
             player.score = 0;
             player.lives = 5;
             player.x = 200;
             player.y = 375;
           }
         });
      }
      //reset player to start
      player.x = 200;
      player.y = 375;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //use enemy rendering to produce score and life counters on screen
    ctx.fillStyle = "White";
    ctx.font = "italic 20px Verdana";
    ctx.fillText("SCORE: " + player.score, 125, 75);
    ctx.fillText("LIVES: " + player.lives, 275, 75);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed){
  this.x=x;
  this.y=y;
  // insert score and life counters
  this.score=0;
  this.lives=5;
  this.speed=speed;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  //need to stop player from moving out of canvas and below or above images (causes weird copy effect)
  if (this.x<0){
    this.x=0;
  }
  if (this.x>400){
    this.x=400;
  }
  if (this.y>400){
    this.y=375;
  }
  //change upper barrier to send player to start when they cross the water
  if (this.y<0){
    // add points to score
    this.score +=50;
    this.y=375;
    this.x=200;
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//add ability to control player movement using hangleInput below
Player.prototype.handleInput = function(keyPress){
  switch (keyPress){
      case 'left':
        this.x -= this.speed +50;
        break;
      case 'up':
        this.y -= this.speed +30;
        break;
      case 'right':
        this.x += this.speed +50;
        break;
      case 'down':
        this.y += this.speed +30;
        break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemyPosition=[55,145,225];

var player = new Player(200,375,50);
var enemy;

enemyPosition.forEach(function(posY){
  enemy = new Enemy(0,posY,100 + Math.floor(Math.random()*512));
  allEnemies.push(enemy);
});
//stop keys from scrolling window
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
