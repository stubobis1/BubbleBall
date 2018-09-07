///////////////////////////////////////////////
/// GAME VARIABLES
///////////////////////////////////////////////

var gameIsInProgress,
    gameOver,
    score,
    highscore = 0,
    player,
    obstacles,
    obstacleGeneratorInterval;

var obstacleTypes = {
    small: {
        color: '#EC9A29',
        size: 10,
        bounceHeight: 300,
        maxStartHeight: 250,
        speed: 4,
    },
    medium: {
        color: '#0F8B8D',
        size: 50,
        bounceHeight: 200,
        maxStartHeight: 150,
        speed: 3,
    },
    large: {
        color: '#ADD8E6',
        size: 100,
        bounceHeight: 100,
        maxStartHeight: 50,
        speed: 2,
    },
};

///////////////////////////////////////////////
/// FUNCTIONS
///////////////////////////////////////////////

// Initialize variables when the game starts and draw the first frame
function init() {
    // TODO: Write init function. This will kick off the game
    gameIsInProgress = false;
    player = {
        size: 20,
        x: 400,
        y: 390,
        speed: 4,
        left: false,
        right: false,
    };
    obstacles = [];
    obstacleGeneratorInterval = undefined;

    draw();

    // set the opening text that displays on the canvas
    ctx.fillStyle = '#f1f1f1';
    ctx.font = '16px monospace';
    ctx.fillText('PRESS THE LEFT OR RIGHT ARROW KEY TO START', 198, 200);
}

// Main game loop
function mainLoop() {          
    // TODO: Write mainLoop function. This is what's looping throughout the game
    draw();
    update();
    // Recursively call our loop
    window.requestAnimationFrame(mainLoop);
}

// Update game piece positions
function update() {
    // TODO: Write the update function. This updates the internal state of where everything is located
    // Move the player, left key takes priority over right
    if (player.left && player.x > 0 + player.size / 2) {
        player.x -= player.speed;
    } else if (player.right && player.x < canvas.width - player.size / 2) {
        player.x += player.speed;
    };

    // Move the obstacles
    for (var i = 0; i < obstacles.length; i++) {
        var obstacle = obstacles[i];
        
        // Handle moving the obstacles left and right (just keep going in the same direction)
        obstacle.x += obstacle.dx;

        // Handle moving the obstacles up and down (bounce on the floor and only bounce up to their set bounce height)
        if ((obstacle.y > canvas.height - obstacle.type.size / 2) || (obstacle.dy === -1 && obstacle.y < obstacle.type.bounceHeight - obstacle.type.size / 2)) {
            obstacle.dy = -obstacle.dy;
        }
        obstacle.y += (obstacle.type.speed * obstacle.dy);
    }
}

// Draw everything
function draw() {
    // Clear the canvas
    ctx.fillStyle = '#143642';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the player
    ctx.beginPath();
    ctx.fillStyle = '#f2f2f2';
    ctx.arc(player.x, player.y, player.size / 2, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();

    // Draw the obstacles
    for (var i = 0; i < obstacles.length; i++) {
        // only draw them if they're in view
        if (obstacles[i].x >= -200 && obstacles[i].x <= canvas.width + 200) {
            ctx.beginPath();
            ctx.fillStyle = obstacles[i].type.color;
            ctx.arc(obstacles[i].x, obstacles[i].y, obstacles[i].type.size / 2, 0, Math.PI * 2);
            ctx.lineWidth = 1;
            ctx.fill();
            ctx.stroke();
        }
    }
}

// Add a new obstacle
function addObstacle() {
    var newObstacleType = Object.keys(obstacleTypes)[Math.floor(Math.random() * Object.keys(obstacleTypes).length)];
    var direction = Math.random() > 0.5 ? 1 : -1;
    obstacles.push({
        type: obstacleTypes[newObstacleType],
        x: direction === 1 ? 0 : canvas.width,
        y: obstacleTypes[newObstacleType].maxStartHeight - Math.floor(Math.random() * obstacleTypes[newObstacleType].maxStartHeight),
        dx: direction,
        dy: 1,
    });
}

// Handle logic when the game ends
function handleGameOver() {
    // TODO: Write the handleGameOver function. This executes any logic for when the game ends
}

///////////////////////////////////////////////
/// EVENT HANDLERS
///////////////////////////////////////////////

// Move your player on keydown
document.onkeydown = function(e) {
    switch (e.which) {
        // Controls
        case 37: // Left
            if (!gameIsInProgress) {
                gameIsInProgress = true;
                obstacleGeneratorInterval = setInterval(addObstacle, 1000);
                mainLoop();
            }
            player.left = true; // Will take priority over the right key
            break;
        case 39: // Right
            if (!gameIsInProgress) {
                gameIsInProgress = true;
                obstacleGeneratorInterval = setInterval(addObstacle, 1000);
                mainLoop();
            }
            player.right = true;
            break;
        default:
            // Do nothing
    };
};

// Stop moving your player on keyup
document.onkeyup = function(e) {
    switch (e.which) {
        // Controls
        case 37: // Left
            player.left = false; // Will take priority over the right key
            break;
        case 39: // Right
            player.right = false;
            break;
        default:
            // Do nothing
    };
};


///////////////////////////////////////////////
/// GAME INIT
///////////////////////////////////////////////

// set up the canvas
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// init
init();
