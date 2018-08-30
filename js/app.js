// Win or lose Modal, based on an example from https://www.w3schools.com/howto/howto_css_modals.asp

// Get the modal
var winModal = document.getElementById('winModal');
var loseModal = document.getElementById('loseModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    winModal.style.display = "none";
    loseModal.style.display = "none";
    window.location.reload();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == winModal || event.target == loseModal) {
      winModal.style.display = "none";
      loseModal.style.display = "none";
      window.location.reload();
    }
}

// Score board class
class Scoreboard {
  constructor(score, lives) {
      // Variables applied to each of our instances go here,
      this.score = score;
      this.lives = lives;
  }
  render () {
    ctx.font = '48px Helvetica';
    ctx.fillStyle = 'white';
    ctx.fillText(`Lives: ${this.lives}`, 10, 110);
    ctx.fillText(`Score: ${this.score}`, 315, 110);
    if (this.lives === 0) {
      loseModal.style.display = "block";
      document.removeEventListener('keyup', keyPressHandler);
    } else if (this.score === 9) {
      document.removeEventListener('keyup', keyPressHandler);
      winModal.style.display = "block";
    }
  }
}

// Enemy Class
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // Multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        // when off canvas, reset position of enemy to move across again
        if (this.x > 550) {
            this.x = -100;
            this.speed = 100 + Math.floor(Math.random() * 700);
        }

        // Check for collision between player and enemies
        if (player.x < this.x + 60 &&
            player.x + 37 > this.x &&
            player.y < this.y + 25 &&
            30 + player.y > this.y) {
            player.x = 200;
            player.y = 380;
            scoreBoard.lives--;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player Class
class Player {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-pink-girl.png';
    }

    update() {
        // Prevent player from moving beyond canvas wall boundaries
        if (this.y > 380) {
            this.y = 380;
        }

        if (this.x > 400) {
            this.x = 400;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        // Check for player reaching top of canvas and winning the game
        if (this.y < 0) {
            this.x = 200;
            this.y = 380;
            scoreBoard.score++;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    keyPress(keyPress) {
        switch (keyPress) {
            case 'left':
                this.x -= this.speed + 50;
                break;
            case 'up':
                this.y -= this.speed + 30;
                break;
            case 'right':
                this.x += this.speed + 50;
                break;
            case 'down':
                this.y += this.speed + 30;
                break;
        }
    }
}

// Now instantiate all objects.

var allEnemies = [];

var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;
var score = 0;
var lives = 3;
var scoreBoard = new Scoreboard (score, lives);

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 700));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.keyPress() method. You don't need to modify this.

function keyPressHandler (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.keyPress(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', keyPressHandler);
