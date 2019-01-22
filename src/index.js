import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      turnCount: 0,
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      turnCount: this.state.turnCount + 1
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  resetGame = () => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      turnCount: 0,
    });
  }

  render() {
    const winner = checkWinner(this.state.squares);
    let status;
    const { turnCount, xIsNext } = this.state

    // if (winner) {
    //   status = winner + ' has WON!';
    //   turnCount = turnCount
    // } else {
    //   if(turnCount === 9) {
    //     status = 'Draw'
    //   } else {
    //     status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    //     turnCount = turnCount
    //   }
    // }

    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
    if (turnCount > 8 && !winner) status = 'Game is a Draw!'
    if (winner) status = 'Player ' + winner + ' has WON!'

    return (
      <div>
        <div className="status text-center">{status}</div>
        <div className="turnCount text-center mb-3">Turn: {turnCount}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <div className="container text-center">
          <button className="btn btn-primary mt-3" onClick={this.resetGame}>Play Again</button>
        </div>

      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function checkWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
