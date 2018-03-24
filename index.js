
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
let width = 500;
let height = 500;
let cols = 100;
let rows = 100;
let grid = new Grid(rows, cols, width, height);
let startingPoint = grid.at(0, 0);
let endingPoint = grid.at(cols - 1, rows - 1);
let pathFind = new PathFind(grid, startingPoint, endingPoint);
// Set to true to see open/close sets and borders
let showDebug = false;

// Make sure start and end is not a wall
startingPoint.type = null;
endingPoint.type = null;
//initilize canvas
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);
canvas.style.background = 'rgb(255,255,255)';


window.requestAnimationFrame(draw);
function draw() {
    if (pathFind.movesLeft()) {
        pathFind.nextLoop();
    } else {
        if (!pathFind.found) console.log('No Solution')
        return;
    }
    //Clear Canvas
    ctx.clearRect(0, 0, width, height);
    //Draw all grid related items
    grid.draw(ctx);
    //Draw current Path
    if (showDebug) pathFind.drawPath(ctx);
    pathFind.drawLinePath(ctx);
    window.requestAnimationFrame(draw);
}