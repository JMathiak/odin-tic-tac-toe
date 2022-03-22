//players = factories
const makePlayer = (playerNumber) => {
  let marker = "";
  if (playerNumber === 1) {
    marker = "X";
  } else if (playerNumber === 2) {
    marker = "O";
  }
  const getMarker = () => marker;
  const getPlayerNumber = () => playerNumber;

  return { getMarker, getPlayerNumber };
};

//gameBoard = module

const gameBoard = (() => {
  let board = ["", "", "X", "O", "X", "O", "X", "O", "X"];

  const markSquare = (index, player) => {
    if (board[index] === "") {
      board[index] = player.getMarker();
      renderBoard();
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
        markSquare(index, p1);
        console.log("test");
      });
    }
  };

  return {
    renderBoard,
  };
})();

//game = module

const game = (() => {
  let turnCount = 0;
  const p1 = makePlayer(1);
  const p2 = makePlayer(2);
  const incrementTurn = () => (turnCount += 1);
  const playGame = () => {
    gameBoard.renderBoard();
  };
  return { playGame };
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
Need a turn count variable in the game module and a turn incrementer method
Could determine player by turn % 2, if turn%2 = 1 its player 1's turn else player 2's turn

*/
// const p1 = makePlayer(1);
// const p2 = makePlayer(2);
// gameBoard.renderBoard(p1);
game.playGame();
