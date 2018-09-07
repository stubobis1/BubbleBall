///////////////////////////////////////////////
/// GAME VARIABLES
///////////////////////////////////////////////

// TODO: Create game variables
var player;

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
}

// Update game piece positions
function update() {
    // TODO: Write the update function. This updates the internal state of where everything is located
}

// Draw everything
function draw() {
    // TODO: Write the draw function. This handles drawing our content on the canvas
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
    // TODO: handle keydown events for the player movement
};

// Stop moving your player on keyup
document.onkeyup = function(e) {
    // TODO: handle keup events for the player movement
};


///////////////////////////////////////////////
/// GAME INIT
///////////////////////////////////////////////

// set up the canvas
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// init
init();
