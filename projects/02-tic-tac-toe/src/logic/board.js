import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  // Here, we check each one of the winner combos
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    // If in the three positions of the winning combos (a, b & c)
    // exists the same letter, that means there is a winner
    if (
      boardToCheck[a] && // - --> "x" or "o"
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      // We return the winner, "X" or "O"
      return boardToCheck[a];
    }
  }
};

export const checkEndGame = (boardToCheck) => {
  // revisamos si hay un empate
  // si no hay mas espacios vacios
  //en el tablero
  return boardToCheck.every((square) => square !== null);
};
