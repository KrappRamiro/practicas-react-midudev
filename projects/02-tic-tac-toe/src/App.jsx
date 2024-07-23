import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
function App() {
  // La aplicación va a tener dos cosas que van a tener estados que se van a estar actualizando
  // Lo primero, el tablero. vamos a tener una variable para acceder al tablero (board),
  // y una funcion para actualizar el valor del tablero (setBoard).
  // Va a iniciar siendo un Array vacio de tamaño 9.
  const [board, setBoard] = useState(() => {
    // Here, we init the board using the localStorage, if it exists
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage) // If exists, use it
      : Array(9).fill(null); // If it doesnt, just use a empty board
  });

  // Tambien, vamos a necesitar saber el turno actual.
  // En este caso, turn va a tener el valor del turno actual,
  // y vamos a utilizar setTurn para actualizar el valor de turno.
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("currentTurn");
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
  });

  // TODO --> en vez de usar null y false, usar un Enum
  const [winner, setWinner] = useState(null); // Null es que no hay ganador, false es que hay un empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("currentTurn");
  };

  const updateBoard = (index) => {
    // Bloquear el juego si hay un winner
    if (winner) return;

    // No actualizar el tablero si hay algo en esa posicion
    //? (por default, el board es un Array de nulls, que evaluan falsy, a menos que en board[index] halla algo)
    if (board[index]) return;

    //! se usa una newBoard, porque las props y los estados DEBEN SER inmutables
    // No puedo hacer board[index] = turn, porque NO DEBO MODIFICAR board.
    const newBoard = [...board];
    newBoard[index] = turn; // Set the value of the pressed Square to be equal to the current turn

    // Actualizo el tablero
    setBoard(newBoard);
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      setWinner(newWinner);
      console.log(`El ganador es ${newWinner}`);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {/* Renderizamos el tablero */}
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        {/* If you are asking yourself what is isSelected, its quite simple.
				Look, there are two squares, the X square and the O square, their purpose is to represent who should play next.
				isSelected is there to style the component differently based on the current player.
				--------
				If its the X turn:
				X Square --> isSelected = true
				O Square --> isSelected = false
				--------
				If its the O turn:
				X Square --> isSelected = false
				O Square --> isSelected = true
				-------
					*/}
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGameFunction={resetGame} winner={winner}></WinnerModal>
    </main>
  );
}

export default App;
