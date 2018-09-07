///////////////////////////////////////////////
/// GAME VARIABLES
///////////////////////////////////////////////

// TODO: Create game variables
var player;
var gameIsInProgress;

///////////////////////////////////////////////
/// FUNCTIONS
///////////////////////////////////////////////

// Initialize variables when the game starts and draw the first frame
function init() {
    // TODO: Write init function. This will kick off the game
    player = {
        size: 20,
        x: 400,
        y: 390,
        speed: 4,
        left: false,
        right: false,
    };

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
}

// Draw everything
function draw() {
    // TODO: Write the draw function. This handles drawing our content on the canvas
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
}

// Add a new obstacle
function addObstacle() {
    // TODO: Write the addObstacle function. This adds new obstacles to the game
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
                mainLoop();
            }
            player.left = true; // Will take priority over the right key
            break;
        case 39: // Right
            if (!gameIsInProgress) {
                gameIsInProgress = true;
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
