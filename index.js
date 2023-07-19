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

//-Fonction pour afficher la grille
function showGrid() {
  for (let i = 0; i < lines; i++) {
    console.log(grid[i].join("|"));
    console.log("-".repeat(columns * 3 - 1));
  }
}

//-Fonction pour placer un pion dans une colonne choisie
function placePawn(column, player) {
  for (let line = lines - 1; line >= 0; line--) {
    //Vérifie si la case est vide
    if (grid[line][column] === "  ") {
      grid[line][column] = player;
      return true;
    }
  }
  console.log("Cette colonne est déjà remplie, essaie une autre !");
  return false;
}
//Fonction pour vérifier si un joueur a gagné
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
  return false;
  //--On veut vérifier les diagonales

}

function puissance4() {
  console.log("-----------------------------------------");
  console.log("Bienvenue sur le jeu du puissance 4 !");
  console.log("-----------------------------------------");

  let round = 1;
  let currentPlayer = " X ";

  //Fonction qui lance la partie
  const gameRound = () => {
    console.log(`Tour : ${round}`);
    showGrid();

    rl.question(
      `C'est au tour du joueur ${currentPlayer}. Choisissez une colonne (0-6) : `,
      (column) => {
        column = parseInt(column);
        if (column >= 0 && column < columns) {
          if (placePawn(column, currentPlayer)) {
            if (verifyVictory(currentPlayer)) {
              console.log("                             ");
              console.log("///////////////////////////");
              console.log(`Le joueur ${currentPlayer} a gagné`);
              console.log("///////////////////////////");
              console.log("                             ");

              showGrid();
              console.log("                             ");
              console.log("Félicitation ! ");
              rl.close();
              return;
            }
            //Rajoute un tour
            round++;
            //Changement du joueur
            if (currentPlayer === " X ") {
              currentPlayer = " O ";
            } else {
              currentPlayer = " X ";
            }
            //Rappel la fonction gameRound() pour pouvoir faire le tour suivant
            gameRound();
          } else {
            gameRound();
          }
        } else {
          console.log("                             ");
          console.log(
            "---- Entre seulement un chiffre , compris entre 0 et 6 ----"
          );
          console.log("                             ");
          gameRound();
        }
      }
    );
  };
  gameRound();
}
puissance4();
