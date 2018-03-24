class Grid {
    constructor(rows, cols, width, height) {
        let grid = new Array(cols);
        let size = {
            width: width / cols,
            height: height / rows
        };

        for (let i = 0; i < cols; i++) {
            grid[i] = new Array(rows);
            //Generate a spot object in each row
            for (let j = 0; j < rows; j++) {
                grid[i][j] = new Spot(i, j, size);
            }
        }
        this.rows = rows;
        this.cols = cols;
        this.values = grid;
        this.initilizeAllNeighbors();
    }

    // Get a point in the grid
    at(cols, rows) {
        let col = this.values[cols];
        if (!isNaN(rows) && col) {
            //rows was passed so should return the spot object
            return col[rows];
        }
        // Did not pass rows, just return the col array
        return col;
    }
    //Draw the grid to the given context
    draw(ctx) {
        let { cols, rows } = this;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                this.at(i, j).draw(ctx);
            }
        }
    }
    // After the entire grid is constructed
    // find the neighbor of each spot
    initilizeAllNeighbors() {
        let { cols, rows, values } = this;
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                values[i][j].addNeighbors(this);
            }
        }
    }
}