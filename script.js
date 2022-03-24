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

  const markSquare = (index) => {
    let result = "";
    if (board[index] === "") {
      if (Counter.count % 2 === 0) {
        let play = game.getPlayer1();
        board[index] = play.marker;
        console.log(play.marker);
        Counter.count++;

        refreshBoard();
      } else if (Counter.count % 2 === 1) {
        let play = game.getPlayer2();
        board[index] = play.marker;
        Counter.count++;
        refreshBoard();
      }
    }
    if (Counter.count >= 3) {
      result = game.checkWinner();
      if (game.checkWinner() === "" && Counter.count === 9) {
        alert("Tie");
      }

      if (game.checkWinner() !== "") {
        console.log("here");
        alert("Winner is " + game.checkWinner());
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

  return {
    renderBoard,
    board,
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
  const playGame = () => {
    gameBoard.renderBoard();
  };

  const checkWinner = () => {
    let winningMarker = "";
    if (
      (gameBoard.board[0] === gameBoard.board[1] &&
        gameBoard.board[2] === gameBoard.board[1]) ||
      (gameBoard.board[0] === gameBoard.board[3] &&
        gameBoard.board[3] === gameBoard.board[6]) ||
      (gameBoard.board[0] === gameBoard.board[4] &&
        gameBoard.board[4] === gameBoard.board[8])
    ) {
      console.log(gameBoard.board[0]);
      winningMarker = gameBoard.board[0];
    } else if (
      gameBoard.board[1] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[7]
    ) {
      winningMarker = gameBoard.board[1];
    } else if (
      (gameBoard.board[2] === gameBoard.board[5] &&
        gameBoard.board[5] === gameBoard.board[8]) ||
      (gameBoard.board[2] === gameBoard.board[4] &&
        gameBoard.board[4] === gameBoard.board[6])
    ) {
      winningMarker = gameBoard.board[2];
    } else if (
      gameBoard.board[3] === gameBoard.board[4] &&
      gameBoard.board[4] === gameBoard.board[5]
    ) {
      winningMarker = gameBoard.board[3];
    } else if (
      gameBoard.board[6] === gameBoard.board[7] &&
      gameBoard.board[7] === gameBoard.board[8]
    ) {
      winningMarker = gameBoard.board[6];
    }
    return winningMarker;
  };
  return { playGame, getPlayer1, getPlayer2, checkWinner };
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
