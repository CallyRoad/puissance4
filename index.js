import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
const columns = 7;
const lines = 6;

const grid = [];
/////Grid creation/////
for (let i = 0; i < lines; i++) {
  grid.push(new Array(columns).fill("  "));
}

//-Show grid
function showGrid() {
  console.log("-".repeat(columns * 3 - 1));
  for (let i = 0; i < lines; i++) {
    console.log(grid[i].join("|"));
    console.log("-".repeat(columns * 3 - 1));
  }
  console.log(" 0  1  2  3  4  5  6");
  console.log("");
}

//-place a pawn in a selected column
function placePawn(column, player) {
  for (let line = lines - 1; line >= 0; line--) {
    //Check if the square is empty to place a pawn
    if (grid[line][column] === "  ") {
      grid[line][column] = player;
      return true;
    }
  }
  console.log("Cette colonne est déjà remplie, essaie une autre !");
  return false;
}
//Check if a player has won
function verifyVictory(player) {
  //--Check lines
  for (let line = 0; line < lines; line++) {
    for (let column = 0; column < columns - 3; column++) {
      if (
        grid[line][column] === player &&
        grid[line][column + 1] === player &&
        grid[line][column + 2] === player &&
        grid[line][column + 3] === player
      ) {
        return true;
      }
    }
  }
  //--Check columns
  for (let column = 0; column < columns; column++) {
    for (let line = 0; line < lines - 3; line++) {
      if (
        grid[line][column] === player &&
        grid[line + 1][column] === player &&
        grid[line + 2][column] === player &&
        grid[line + 3][column] === player
      ) {
        return true;
      }
    }
    //--Checking rising diagonals
    for (let line = 0; line < lines - 3; line++) {
      for (let column = 0; column < columns - 3; column++) {
        if (
          grid[line][column] === player &&
          grid[line + 1][column + 1] === player &&
          grid[line + 2][column + 2] === player &&
          grid[line + 3][column + 3] === player
        ) {
          return true;
        }
      }
    }
    //--Checking downward diagonals
    for (let line  = 3; line < lines; line++) {
      for (let column = 0; column < columns - 3; column++) {
        if (
          grid[line][column] === player &&
          grid[line - 1][column + 1] === player &&
          grid[line - 2][column + 2] === player &&
          grid[line - 3][column + 3] === player 
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function verifyDraw () {
  //--Will verify if each box is empty, if empty => isn't a draw
  for (let line = 0; line < lines; line++) {
    for (let column = 0; column < columns; column++) {
      if (
        grid[line][column] === "  "
      ) {
        return false;
      }
    }
  }
  return true;
}
//--Starts the game
function puissance4() {
  console.log("");
  console.log("-----------------------------------------");
  console.log("Bienvenue sur le jeu du puissance 4 !");
  console.log("-----------------------------------------");
  console.log("");

  let round = 1;
  let currentPlayer = " X ";

  //--Start the rounds
  const gameRound = () => {
    console.log(`Tour : ${round}`);
    showGrid();

    rl.question(
      `C'est au tour du joueur ${currentPlayer}. Choisissez une colonne : 0 étant la plus à gauche, et 6 la plus à droite => `,
      (column) => {
        column = parseInt(column);
        if (column >= 0 && column < columns) {
          if (placePawn(column, currentPlayer)) {
            if (verifyVictory(currentPlayer)) {
              console.log("");
              console.log("///////////////////////////");
              console.log(`Le joueur ${currentPlayer} a gagné`);
              console.log("///////////////////////////");
              console.log("");

              showGrid();
              console.log("");
              console.log(`Félicitation ! Le jeu c'est terminé en ${round} tours ! `);
              rl.close();
              return;
            } else if (verifyDraw()) {
              console.log("");
              console.log("///////////////////////////");
              console.log(`Égalité ! `);
              console.log("///////////////////////////");
              console.log("");
            }
            //Add round
            round++;
            //Player change
            if (currentPlayer === " X ") {
              currentPlayer = " O ";
            } else {
              currentPlayer = " X ";
            }
            //Call the gameRound() function again to start the next round
            gameRound();
          } else {
            gameRound();
          }
        } else {
          console.log("");
          console.log(
            "---- Entre seulement un chiffre , compris entre 0 et 6 ----"
          );
          console.log("");
          gameRound();
        }
      }
    );
  };
  gameRound();
}

//Call the puissance4() function for start the game
puissance4();
