import "./style.css";
import { useState } from 'react';
import ID from './img/id.jpg';
let x = 1;

function Id(){
  return(
    <div className="idd">
      <img class="photo" src= {ID}></img>
      <div className="Name">
        <h2>Sneha Shrestha</h2>
        <h2>22053226</h2>
      </div>
      
    </div>
  );
}
function Message(){
  return(
    <div className="message">
        <h3 id="msg"></h3>
      </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
      document.getElementById("msg").innerHTML= "Fisrt player is Playing this is move no "+ x;
    } else {
      nextSquares[i] = 'O';
      document.getElementById("msg").innerHTML= "Second player is playing this is move no "+x;
    }
    onPlay(nextSquares);
    x++;

  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
    document.getElementById("msg").innerHTML= "Congratulations you have won the game. The winner is "+ winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
   <Id />
   <Message />
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
   
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      const [col, row] = calculateMoveLocation(history[move - 1], squares);
      description = `Go to move #${move} (${col}, ${row})`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className={move === currentMove ? 'selected' : ''}>
          {description}
        </button>
      </li>
    );
  });
  
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateMoveLocation(prevSquares, currentSquares) {
  for (let i = 0; i < prevSquares.length; i++) {
    if (prevSquares[i] !== currentSquares[i]) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      return [col+1, row+1];
    }
  }
  return [null, null];
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}