import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

class Puissance4 {
  constructor(lines, columns) {
    this.lines = lines;
    this.columns = columns;
    this.round = 1;
    this.currentPlayer = " X ";
    this.grid = this.createGrid();
    this.rl = readline.createInterface({ input, output });
  }

  createGrid() {
    const grid = [];
    for (let i = 0; i < this.lines; i++) {
      grid.push(new Array(this.columns).fill("  "));
    }
    return grid;
  }
  showGrid() {
    console.log("-".repeat(this.columns * 3 - 1));
    for (let i = 0; i < this.lines; i++) {
      console.log(this.grid[i].join("|"));
      console.log("-".repeat(this.columns * 3 - 1));
    }
    console.log(" 0  1  2  3  4  5  6");
    console.log("");
  }

  placeSpawn(column, player) {
    for (let line = this.lines - 1; line >= 0; line--) {
      if (this.grid[line][column] === "  ") {
        this.grid[line][column] = player;
        return true;
      }
    }
    console.log("Cette colonne est déjà remplie, essaie une autre !");
    return false;
  }

  verifyVictory() {
    const player = this.currentPlayer;

    //--Check lines
    for (let line = 0; line < this.lines; line++) {
      for (let column = 0; column < this.columns - 3; column++) {
        if (
          this.grid[line][column] === player &&
          this.grid[line][column + 1] === player &&
          this.grid[line][column + 2] === player &&
          this.grid[line][column + 3] === player
        ) {
          return true;
        }
      }
    }

    //--Check columns
    for (let column = 0; column < this.columns; column++) {
      for (let line = 0; line < this.lines - 3; line++) {
        if (
          this.grid[line][column] === player &&
          this.grid[line + 1][column] === player &&
          this.grid[line + 2][column] === player &&
          this.grid[line + 3][column] === player
        ) {
          return true;
        }
      }
    }

    //--Checking rising diagonals

    for (let line = 0; line < this.lines - 3; line++) {
      for (let column = 0; column < this.columns - 3; column++) {
        if (
          this.grid[line][column] === player &&
          this.grid[line + 1][column + 1] === player &&
          this.grid[line + 2][column + 2] === player &&
          this.grid[line + 3][column + 3] === player
        ) {
          return true;
        }
      }
    }

    //--Checking for downward diagonals
    for (let line = 3; line < this.lines; line++) {
      for (let column = 0; column < this.columns - 3; column++) {
        if (
          this.grid[line][column] === player &&
          this.grid[line - 1][column + 1] === player &&
          this.grid[line - 2][column + 2] === player &&
          this.grid[line - 3][column + 3] === player
        ) {
          return true;
        }
      }
    }
    return false;
  }

  play() {
    console.log(`Tour : ${this.round}`);
    this.showGrid();

    // let input;
    // this.rl.question("slt", (userInput) => input = userInput ) 
    this.rl.question(
      `C'est au tour du joueur ${this.currentPlayer}. Choisissez une colonne : 0 étant la plus à gauche, et 6 la plus à droite => `,
      (column) => {
        column = parseInt(column);

        if (column >= 0 && column < this.columns) {
          if (this.placeSpawn(column, this.currentPlayer)) {
            if (this.verifyVictory(this.currentPlayer)) {
              console.log("");
              console.log("///////////////////////////");
              console.log(`Le joueur ${this.currentPlayer} a gagné`);
              console.log("///////////////////////////");
              console.log("");

              this.showGrid();
              console.log("");
              console.log(
                `Félicitation ! Le jeu c'est terminé en ${this.round} tours ! `
              );
              this.rl.close();
              return;
            }
            //Add round
            this.round++;
            //Player change
            if (this.currentPlayer === " X ") {
              this.currentPlayer = " O ";
            } else {
              this.currentPlayer = " X ";
            }
            //Call play()
            this.play();
          } else {
            this.play();
          }
        } else {
          console.log("");
          console.log(
            "---- Entre seulement un chiffre , compris entre 0 et 6 ----"
          );
          console.log("");
          this.play();
        }
      }
    );
  }
}
const game = new Puissance4(6,7);
game.play();
