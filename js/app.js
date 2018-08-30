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
            this.speed = Math.floor(Math.random() * 700);
        }

        // Check for collision between player and enemies
        if (player.x < this.x + 60 &&
            player.x + 37 > this.x &&
            player.y < this.y + 25 &&
            30 + player.y > this.y) {
            player.x = 200;
            player.y = 380;
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
var rock;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 700));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.keyPress() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.keyPress(allowedKeys[e.keyCode]);
});
