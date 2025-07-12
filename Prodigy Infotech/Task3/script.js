const board = document.getElementById("board");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      message.textContent = `Player ${gameState[a]} wins! 🎉`;
      return;
    }
  }
  if (!gameState.includes("")) {
    gameActive = false;
    message.textContent = "It's a draw!";
  }
}

function handleClick(index) {
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  document.getElementById(`cell-${index}`).textContent = currentPlayer;

  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  message.textContent = "Player X's turn";
  renderBoard();
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `cell-${index}`;
    cell.textContent = value;
    cell.addEventListener("click", () => handleClick(index));
    board.appendChild(cell);
  });
}

resetBtn.addEventListener("click", resetGame);

// Initialize the game
renderBoard();
