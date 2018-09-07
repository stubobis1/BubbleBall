///////////////////////////////////////////////
/// GAME VARIABLES
///////////////////////////////////////////////

// TODO: Create game variables

///////////////////////////////////////////////
/// FUNCTIONS
///////////////////////////////////////////////

// Initialize variables when the game starts and draw the first frame
function init() {
    // TODO: Write init function. This will kick off the game
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
