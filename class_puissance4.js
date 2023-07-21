class Puissance4 {
    constructor(lines, columns) {
        this.lines = lines;
        this.columns = columns;
        this.round = 1;
        this.currentPlayer = " X ";
        this.grid = [];
    }
}

console.log(new Puissance4(6,7));