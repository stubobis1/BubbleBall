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
    gameIsInProgress = false;
    gameOver = false;
    score = 0;
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

    document.getElementById('scoreValue').innerHTML = score;

    draw();

    // set the opening text that displays on the canvas
    ctx.fillStyle = '#f1f1f1';
    ctx.font = '16px monospace';
    ctx.fillText('PRESS THE LEFT OR RIGHT ARROW KEY TO START', 198, 200);
}

// Main game loop
function mainLoop() {          
    // logic for the game to end or not
    if (gameIsInProgress && !gameOver) {
        // draw and update our canvas here
        draw();
        update();
        // Recursively call our loop
        window.requestAnimationFrame(mainLoop);
    } else {
        handleGameOver();
    }
}

// Update game piece positions
function update() {
    if (gameIsInProgress) {
        // Move the player, left key takes priority over right
        if (player.left && player.x > 0 + player.size / 2) {
            player.x -= player.speed;
        } else if (player.right && player.x < canvas.width - player.size / 2) {
            player.x += player.speed;
        };

        // Move the obstacles and check if the player was hit
        for (var i = 0; i < obstacles.length; i++) {
            var obstacle = obstacles[i];
            
            // Handle moving the obstacles left and right (just keep going in the same direction)
            obstacle.x += obstacle.dx;

            // Handle moving the obstacles up and down (bounce on the floor and only bounce up to their set bounce height)
            if ((obstacle.y > canvas.height - obstacle.type.size / 2) || (obstacle.dy === -1 && obstacle.y < obstacle.type.bounceHeight - obstacle.type.size / 2)) {
                obstacle.dy = -obstacle.dy;
            }
            obstacle.y += (obstacle.type.speed * obstacle.dy);

            // Check if the player was hit
            var x = Math.abs(player.x - obstacle.x);
            var y = Math.abs(player.y - obstacle.y);
                    
            // Use pythagorean theorem to find the distance between player and the obstacle
            var hypotenuse = Math.sqrt(( x * x ) + ( y * y ));
            
            // Check to see if they have overlapped
            if (player.size / 2 + obstacle.type.size / 2 >= hypotenuse) {
                gameIsInProgress = false;
                gameOver = true;
            }
        }
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
    score++;
    document.getElementById('scoreValue').innerHTML = score;
}

// Handle logic when the game ends
function handleGameOver() {
    // Clear the timeout
    clearInterval(obstacleGeneratorInterval);
        
    // set the text that displays on the canvas
    ctx.fillStyle = '#f1f1f1';
    ctx.font = '16px monospace';
    ctx.fillText('GAME OVER', 355, 200);

    // update your high score
    if (score > highscore) {
        highscore = score;
        document.getElementById('highscoreValue').innerHTML = highscore;
    }

    // restart the game
    setTimeout(init, 2000);
}

///////////////////////////////////////////////
/// EVENT HANDLERS
///////////////////////////////////////////////

// Move your player on keydown
document.onkeydown = function(e) {
    switch (e.which) {
        // Controls
        case 37: // Left
            if (!gameIsInProgress && !gameOver) {
                gameIsInProgress = true;
                obstacleGeneratorInterval = setInterval(addObstacle, 1000);
                mainLoop();
            }
            player.left = true; // Will take priority over the right key
            break;
        case 39: // Right
            if (!gameIsInProgress && !gameOver) {
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
