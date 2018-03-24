// A single grid point from all the 
class Spot {
    constructor(i, j, size) {
        this.col = i;
        this.row = j;
        this.size = size;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = [];
        this.previous = null;
        this.type = null;
        // The spots become walls 40% of the time
        if (Math.random() < 0.4) this.type = 'wall';
    }
    //Draws the given spot on the grid based on the type
    draw(ctx) {
        let { col, row, size, type } = this;
        if (type) {
            ctx.beginPath();
            if (showDebug) {
                let colorAdded = false;
                if (type === 'inClosed') {
                    ctx.fillStyle = 'red';
                    colorAdded = true;
                } else if (type === 'inOpen') {
                    ctx.fillStyle = 'green';
                    colorAdded = true;
                }
                if (colorAdded) {
                    ctx.rect(col * size.width, row * size.height, size.width, size.height);
                    ctx.fill();
                }
            }
            if (type === 'wall') {
                ctx.fillStyle = 'black';
                ctx.arc(
                    col * size.width + size.width / 2,
                    row * size.height + size.height / 2,
                    this.size.width / 2,
                    0, 2 * Math.PI
                );
                ctx.fill();
            }
        }
    }
    //Draws a rectange and fills it at the current spot
    drawPath(ctx) {
        let { col, row, size } = this;
        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.rect(col * size.width, row * size.height, size.width, size.height);
        ctx.fill();
    }
    fill(ctx, color) {
        let { col, row, size } = this;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(col * size.width, row * size.height, size.width, size.height);
        ctx.fill();
    }
    // Adds all neighbors from the current spot from a given grid
    addNeighbors(grid) {
        let { col, row } = this;
        //Main directions
        let left = grid.at(col - 1, row);
        let top = grid.at(col, row - 1);
        let right = grid.at(col + 1, row);
        let bottom = grid.at(col, row + 1);

        //Corners
        let topLeft = grid.at(col - 1, row - 1);
        let topRight = grid.at(col + 1, row - 1);
        let bottomLeft = grid.at(col - 1, row + 1);
        let bottomRight = grid.at(col + 1, row + 1);

        if (left) this.neighbors.push(left);
        if (top) this.neighbors.push(top);
        if (right) this.neighbors.push(right);
        if (bottom) this.neighbors.push(bottom);

        if (topLeft) this.neighbors.push(topLeft);
        if (topRight) this.neighbors.push(topRight);
        if (bottomLeft) this.neighbors.push(bottomLeft);
        if (bottomRight) this.neighbors.push(bottomRight);
    }

}