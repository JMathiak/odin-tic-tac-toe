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
};

//gameBoard = module

const gameBoard = (() => {
  let board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];

  const renderBoard = () => {
    for (let i = 0; i < board.length; i++) {
      const div = document.querySelector(".board");
      let square = document.createElement("div");
      //set data attribute
      square.innerHTML = board[i];
      let className = "square-" + i;
      square.classList.add(className);
      div.appendChild(square);
    }
  };

  return {
    renderBoard,
  };
})();

//game = module

const playGame = (() => {
  let turnCount = 0;

  const incrementTurn = () => (turnCount += 1);
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

    ^ winning combinations
Check for a draw after 9 turns
Need a turn count variable in the game module and a turn incrementer method


*/

gameBoard.renderBoard();
