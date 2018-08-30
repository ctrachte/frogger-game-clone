// Win or lose Modal, based on an example from https://www.w3schools.com/howto/howto_css_modals.asp

// Get the modals
let winModal = document.getElementById('winModal');
let loseModal = document.getElementById('loseModal');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    winModal.style.display = "none";
    loseModal.style.display = "none";
    scoreBoard.reset(); // and reset the board
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == winModal || event.target == loseModal) {
      winModal.style.display = "none";
      loseModal.style.display = "none";
      scoreBoard.reset(); // and reset the board
    }
}

// Score board class
class Scoreboard {
  constructor(score, lives) {
      // Variables applied to each of our instances go here,
      this.score = score;
      this.lives = lives;
  }
  // Draws the scoreboard on the canvas
  render () {
    ctx.font = '48px Helvetica'; // font style
    ctx.fillStyle = 'white'; // font color
    ctx.fillText(`Lives: ${this.lives}`, 10, 110); // lives position
    ctx.fillText(`Score: ${this.score}`, 315, 110); // score position
    //check if player has won or lost, pop up modal and disable controls if so
    if (this.lives === 0) {
      loseModal.style.display = "block";
      document.removeEventListener('keyup', keyPressHandler);
    } else if (this.score === 9) {
      document.removeEventListener('keyup', keyPressHandler);
      winModal.style.display = "block";
    }
  }
  // resets the scoreboard and keyPressHandler
  reset () {
    this.lives =  3;
    this.score = 0;
    document.addEventListener('keyup', keyPressHandler);
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
            this.speed = 100 + Math.floor(Math.random() * 650);
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

        // Check for player reaching top of canvas and winning points
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

//  Instantiate all Variables.

let allEnemies = [];

let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50);
let enemy;
let score = 0;
let lives = 3;
let scoreBoard = new Scoreboard (score, lives);

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 650));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.keyPress() method. You don't need to modify this... HOWEVER
// I abstracted this listener function so we can call it elsewhere

function keyPressHandler (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.keyPress(allowedKeys[e.keyCode]);
}

document.addEventListener('keyup', keyPressHandler);
