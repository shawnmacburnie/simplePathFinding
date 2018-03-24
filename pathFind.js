// A* Implementation
// f(n) = g(n) + h(n)
class PathFind {
    constructor(grid, startingPoint, endingPoint) {
        // open set are things not yet evaluated
        this.openSet = [startingPoint];
        // closed set is everything that does not need to be evaluated
        this.closedSet = [];
        this.path = [];
        this.found = false;
        this.grid = grid;
        this.startingPoint = startingPoint;
        this.endingPoint = endingPoint;
    }

    // Determin if any moves are left
    movesLeft() {
        return !this.found && this.openSet.length > 0;
    }

    // Find smallest f(n) in the open set
    findSmallestFInOpenSet() {
        let { openSet } = this;
        let winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        return openSet[winner];
    }
    // Sets the path from the current spot
    setCurrentPath(current) {
        let path = [];
        var tmp = current;
        path.push(tmp);
        while (tmp.previous) {
            path.push(tmp.previous);
            tmp = tmp.previous;
        }
        this.path = path;
    }

    // A single loop in the A* algorithm
    nextLoop() {
        let { openSet, closedSet, grid, endingPoint } = this;
        let current = this.findSmallestFInOpenSet();
        let neighbors = current.neighbors;

        this.setCurrentPath(current);
        if (current == endingPoint) {
            console.log('Path Found');
            this.found = true;
            return;
        }
        current.type = 'inClosed';
        this.removeFromArray(openSet, current);
        closedSet.push(current);
        for (var i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            // If already in closed set then there must have been a shorter path to get to that point
            if (!closedSet.includes(neighbor) && neighbor.type != 'wall') {
                // distance between currentG and its neightbors is just 1, 
                // could be larger for something more complex system 
                let tmpG = current.g + 1;
                let newPath = false;
                if (openSet.includes(neighbor)) {
                    // If this has been evaluated before, is this newG better?
                    if (tmpG > neighbor.g) {
                        neighbor.g = tmpG;
                        newPath = true;
                    }
                } else { // not in openSet
                    neighbor.g = tmpG;
                    openSet.push(neighbor);
                    neighbor.type = 'inOpen';
                    newPath = true;
                }
                if (newPath) {
                    neighbor.h = this.calcluateHeuristicDistance(neighbor);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }

        }
    }

    // this is h(n) in function and is just distance
    calcluateHeuristicDistance(spot) {
        let { endingPoint } = this;
        //EuclidianDistance
        let distance = Math.sqrt(
            Math.pow(endingPoint.col - spot.col, 2) +
            Math.pow(endingPoint.row - spot.row, 2)
        );
        return distance;
    }

    //remove all reference to element for a given array
    removeFromArray(arr, element) {
        for (var i = arr.length; i >= 0; i--) {
            if (arr[i] == element) {
                arr.splice(i, 1);
            }
        }
    }

    // Draws a box path of the current path
    drawPath(ctx) {
        let { path } = this;
        for (var i = 0; i < path.length; i++) {
            path[i].drawPath(ctx);
        }
    }
    // Draws a line path for the given path
    drawLinePath(ctx) {
        let { path } = this;
        if (path.length) {
            ctx.beginPath();
            ctx.lineWidth = path[0].size.width / 2;
            ctx.lineJoin = 'round';
            ctx.strokeStyle = 'purple';
            ctx.moveTo(
                path[0].col * path[0].size.width + path[0].size.width / 2,
                path[0].row * path[0].size.height + path[0].size.height / 2
            );
            for (var i = 1; i < path.length; i++) {
                let x = path[i].col * path[i].size.width + path[i].size.width / 2;
                let y = path[i].row * path[i].size.height + path[i].size.height / 2;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }
}