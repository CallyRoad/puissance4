import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
const columns = 7;
const lines = 6;

const grid = [];
/////Grid creation/////
for (let i = 0; i < lines; i++) {
  grid.push(new Array(columns).fill(" tab "));
}
console.log("grille de jeu ---------------",grid)
console.log('-------------------------');
console.log(grid.length);
console.log('-------------------------');

//-Show grid
function showGrid() {
  for (let i = 0; i < lines; i++) {
    console.log(grid[i].join("|"));
    console.log("-".repeat(columns * 3 - 1));
  }
}

//-Place pawn
function placePawn(column, player) {
  for (let line = lines - 1; line >= 0; line--) {
    console.log("ligne : " + line);
    //Verify if the box is empty
    if (grid[line][column] === "  ") {
      grid[line][column] = player;
      return true;
    }
  }
  return false;
}
//placePawn();
//Function pour créer le jeu lui même

//Vérifier si un joueur à gagné
function verifyVictory(player) {
  //--On veut vérifier les lignes
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
  //--On veut vérifier les colonnes
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
  }
  //--On veut vérifier les diagonales
}

function puissance4() {
  console.log("Bienvenue sur le jeu du puissance 4 !");
  let round = 1;
  let currentPlayer = "X";
  //
  while (true) {
    showGrid();
    console.log(`Tour : ${round}`);
    const choice = rl.question("Choisissez une colonne (0-6) : ");
    const column = parseInt(choice);

    //Verifie si le nombre est compris entre 0 et 6 qui correspondent au sept colonnes du jeu, et s'il s'agit bien d'un nombre
    if (!isNaN(column) || column < 0 && column >= columns) {
      console.log("Entre un nombre uniquement, compris entre 0 et 6 compris");
    } else {
      placePawn(column, currentPlayer);
      verifyVictory(currentPlayer);

    }
  }
}
puissance4();
