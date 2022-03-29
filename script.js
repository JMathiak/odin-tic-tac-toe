//players = factories
const Player = (playerNumber, marker) => {
  // let marker = "";
  // if (playerNumber === 1) {
  //   marker = "X";
  // } else if (playerNumber === 2) {
  //   marker = "O";
  // }
  const getMarker = () => marker;
  const getPlayerNumber = () => playerNumber;

  return { playerNumber, marker };
};

const Counter = (() => {
  let count = 0;
  const incrementTurn = () => (count = count + 1);
  return { count, incrementTurn };
})();

//gameBoard = module

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const markSquare = (index) => {
    let result = "";
    if (board[index] === "") {
      if (Counter.count % 2 === 0) {
        let play = game.getPlayer1();
        board[index] = play.marker;
        Counter.count++;
        console.log("Turn Count: " + Counter.count);
        console.log(board);
        refreshBoard();
      } else if (Counter.count % 2 === 1) {
        let play = game.getPlayer2();
        board[index] = play.marker;
        console.log(board);
        Counter.count++;
        console.log("Turn Count: " + Counter.count);
        refreshBoard();
      }
    }
    if (Counter.count >= 4) {
      game.checkWinner();
      result = game.getWinningMarker();
      if (result === "" && Counter.count === 9) {
        setTimeout(function () {
          alert("The Game is a Tie, Click Reset Board to Play Again");
        }, 0);
        board = ["", "", "", "", "", "", "", "", ""];
        for (let i = 0; i < board.length; i++) {
          board[i] = "";
        }
      }

      if (result !== "") {
        refreshBoard();
        console.log("Winner here");
        setTimeout(function () {
          alert("Winner is " + result + " , Click Reset Board to Play Again");
        }, 0);
        board = ["", "", "", "", "", "", "", "", ""];
        for (let i = 0; i < board.length; i++) {
          board[i] = "";
        }
        Counter.count = 0;
      }
    }
  };
  const refreshBoard = () => {
    const div = document.querySelector(".board");
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }

    renderBoard();
  };
  const renderBoard = () => {
    if (Counter.count % 2 === 0) {
      const turnDiv = document.querySelector(".turnDisplay");
      turnDiv.innerHTML = `Player 1's (X's) Turn`;
    } else {
      const turnDiv = document.querySelector(".turnDisplay");
      turnDiv.innerHTML = `Player 2's (O's) Turn`;
    }

    for (let i = 0; i < board.length; i++) {
      const div = document.querySelector(".board");
      let square = document.createElement("div");
      square.setAttribute("data-key", i);
      square.innerHTML = board[i];
      let className = "game-square";
      square.classList.add(className);
      square.id = "square-" + i;
      div.appendChild(square);
    }

    let squares = document.getElementsByClassName("game-square");
    for (let j = 0; j < squares.length; j++) {
      squares[j].addEventListener("click", (e) => {
        let index = e.target.getAttribute("data-key");
        markSquare(index);
        console.log("test");
      });
    }
  };

  const renderButton = () => {
    const div = document.querySelector(".buttons");
    let resetbutton = document.createElement("button");
    div.appendChild(resetbutton);
    resetbutton.setAttribute("type", "button");
    resetbutton.innerHTML = "Reset Board";
    resetbutton.onclick = function () {
      console.log(board);
      board = ["", "", "", "", "", "", "", "", ""];
      for (let i = 0; i < board.length; i++) {
        board[i] = "";
      }
      Counter.count = 0;
      console.log("here");
      refreshBoard();
    };
  };
  return {
    renderBoard,
    board,
    renderButton,
    getBoard,
  };
})();

//game = module

const game = (() => {
  // const turnCount = makeCounter();
  const p1 = Player(1, "X");
  const p2 = Player(2, "O");
  const getPlayer1 = () => p1;
  const getPlayer2 = () => p2;
  //const getTurns = () => turnCount;
  let winningMarker = "";
  const getWinningMarker = () => winningMarker;
  const playGame = () => {
    gameBoard.renderBoard();
    gameBoard.renderButton();
  };
  const checkWinner = () => {
    let board = gameBoard.getBoard();
    console.log("CW Board: " + board);
    if (
      (board[0] === board[1] && board[2] === board[1]) ||
      (board[0] === board[3] && board[3] === board[6]) ||
      (board[0] === board[4] && board[4] === board[8])
    ) {
      winningMarker = board[0];
      console.log(board);
    }
    if (board[1] === board[4] && board[4] === board[7]) {
      winningMarker = board[1];
      console.log(board);
    }
    if (board[2] === board[4] && board[4] === board[6]) {
      winningMarker = board[2];
      console.log(board);
    }
    if (board[2] === board[5] && board[8] === board[2]) {
      console.log("FUCK YOU");
      winningMarker = board[2];
    }
    if (board[3] === board[4] && board[4] === board[5]) {
      winningMarker = board[3];
      console.log(board);
    }
    if (board[6] === board[7] && board[7] === board[8]) {
      winningMarker = board[6];
      console.log(board);
    }
    console.log("WM: " + winningMarker);
  };
  return { playGame, getPlayer1, getPlayer2, checkWinner, getWinningMarker };
})();
/*On page load/game reset create a grid div with 9 different divs, each representing an array index. 
Will have to add event listeners to each square similar to the library
On click of any of the divs sets the index of the array to whichever 'player' clicked that square.
     Also changes whose turn it is. Check if the square is empty, only allow to play if empty square.
    --> on click get playerNumber and then marker and then set the div to the marker?
In game module, Need to track who's turn it is. Could have a boolean? 
Need a way to check for winner after 3rd turn rotation. Winning cant occur when turn count < 3
    1, 2, 3
    1, 4, 7
    1, 5, 9
    2, 5, 8
    3, 6, 9
    3, 5, 7
    4, 5, 6
    7, 8, 9

    ^ winning combinations, all values -1
Check for a draw after 9 turns
Need a turn count variable in the game module and a turn incrementer method --> DONE
Could determine player by turn % 2, if turn%2 = 1 its player 1's turn else player 2's turn --> DONE

*/
// const p1 = makePlayer(1);
// const p2 = makePlayer(2);
// gameBoard.renderBoard(p1);
game.playGame();
